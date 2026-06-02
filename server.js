require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const app = express();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later' }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'data', 'gameData.json');
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD environment variable is required');
const adminTokens = new Set();

function validateStudentInput(school, adminNumber) {
  if (!school || !adminNumber) {
    const err = new Error('school and adminNumber are required');
    err.status = 400;
    throw err;
  }
}

async function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.promises.writeFile(DATA_FILE, JSON.stringify({ students: {} }));
    }
    const raw = await fs.promises.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read data:', err);
    throw Object.assign(new Error('Data read failed'), { status: 500 });
  }
}

async function writeData(data) {
  try {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write data:', err);
    throw Object.assign(new Error('Data write failed'), { status: 500 });
  }
}

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    adminTokens.add(token);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && adminTokens.has(token)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/api/start-game', async (req, res, next) => {
  try {
    const { school, adminNumber } = req.body;
    validateStudentInput(school, adminNumber);
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;

    if (!data.students[studentId]) {
      data.students[studentId] = {
        school,
        adminNumber,
        startingBalance: 0,
        currentBalance: 0,
        currentWeek: 1,
        weeks: [],
        usedOneTimeOptions: [],
        profile: null
      };
      await writeData(data);
    }

    res.json(data.students[studentId]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/save-profile', async (req, res, next) => {
  try {
    const { school, adminNumber, profile } = req.body;
    validateStudentInput(school, adminNumber);
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;

    if (data.students[studentId]) {
      data.students[studentId].profile = profile;
      await writeData(data);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/api/student/:school/:adminNumber', async (req, res, next) => {
  try {
    const { school, adminNumber } = req.params;
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;
    res.json(data.students[studentId] || null);
  } catch (err) {
    next(err);
  }
});

app.post('/api/submit-week', async (req, res, next) => {
  try {
    const { school, adminNumber, week, transactions, balance } = req.body;
    validateStudentInput(school, adminNumber);
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: 'transactions must be an array' });
    }
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;

    if (data.students[studentId]) {
      const student = data.students[studentId];
      if (student.weeks.some(w => w.week === week)) {
        return res.status(409).json({ error: `Week ${week} already submitted` });
      }

      const oneTimeIds = transactions.filter(t => t.oneTime).map(t => t.id);

      student.weeks.push({ week, transactions, endBalance: balance, timestamp: new Date().toISOString() });
      student.currentBalance = balance;
      student.currentWeek = week + 1;

      if (!student.usedOneTimeOptions) student.usedOneTimeOptions = [];
      student.usedOneTimeOptions.push(...oneTimeIds);

      await writeData(data);
      res.json({ success: true, data: student });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/api/admin/all-students', verifyAdmin, async (_req, res, next) => {
  try {
    const data = await readData();
    res.json(data.students);
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/reset-student', verifyAdmin, async (req, res, next) => {
  try {
    const { school, adminNumber, startingBalance } = req.body;
    validateStudentInput(school, adminNumber);
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;

    if (data.students[studentId]) {
      const balance = startingBalance !== undefined ? startingBalance : 0;
      const existingProfile = data.students[studentId].profile;
      data.students[studentId] = {
        school,
        adminNumber,
        startingBalance: balance,
        currentBalance: balance,
        currentWeek: 1,
        weeks: [],
        usedOneTimeOptions: [],
        profile: existingProfile
      };
      await writeData(data);
      res.json({ success: true, message: 'Student reset successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/reset-all', verifyAdmin, async (req, res, next) => {
  try {
    const { startingBalance } = req.body;
    const data = await readData();
    const balance = startingBalance !== undefined ? startingBalance : 0;

    Object.keys(data.students).forEach(studentId => {
      const student = data.students[studentId];
      data.students[studentId] = {
        school: student.school,
        adminNumber: student.adminNumber,
        startingBalance: balance,
        currentBalance: balance,
        currentWeek: 1,
        weeks: [],
        usedOneTimeOptions: [],
        profile: student.profile
      };
    });

    await writeData(data);
    res.json({ success: true, message: 'All students reset successfully' });
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/set-balance', verifyAdmin, async (req, res, next) => {
  try {
    const { school, adminNumber, startingBalance } = req.body;
    validateStudentInput(school, adminNumber);
    if (startingBalance === undefined) {
      return res.status(400).json({ error: 'startingBalance is required' });
    }
    const data = await readData();
    const studentId = `${school}_${adminNumber}`;

    if (data.students[studentId]) {
      data.students[studentId].startingBalance = startingBalance;
      data.students[studentId].currentBalance = startingBalance;
      await writeData(data);
      res.json({ success: true, message: 'Starting balance updated' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/admin/set-all-balance', verifyAdmin, async (req, res, next) => {
  try {
    const { startingBalance } = req.body;
    if (startingBalance === undefined) {
      return res.status(400).json({ error: 'startingBalance is required' });
    }
    const data = await readData();

    Object.keys(data.students).forEach(studentId => {
      data.students[studentId].startingBalance = startingBalance;
      data.students[studentId].currentBalance = startingBalance;
    });

    await writeData(data);
    res.json({ success: true, message: 'All starting balances updated' });
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
