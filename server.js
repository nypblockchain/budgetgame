const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const DATA_FILE = path.join(__dirname, 'data', 'gameData.json');
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'aplm@finance';
const adminTokens = new Set();

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ students: {} }));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    adminTokens.add(token);
    res.json({ success: true, token });
  } else {
    res.json({ success: false });
  }
});

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization;
  if (adminTokens.has(token)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/api/start-game', (req, res) => {
  const { school, adminNumber } = req.body;
  const data = readData();
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
    writeData(data);
  }
  
  res.json(data.students[studentId]);
});

app.post('/api/save-profile', (req, res) => {
  const { school, adminNumber, profile } = req.body;
  const data = readData();
  const studentId = `${school}_${adminNumber}`;
  
  if (data.students[studentId]) {
    data.students[studentId].profile = profile;
    writeData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.get('/api/student/:school/:adminNumber', (req, res) => {
  const { school, adminNumber } = req.params;
  const data = readData();
  const studentId = `${school}_${adminNumber}`;
  res.json(data.students[studentId] || null);
});

app.post('/api/submit-week', (req, res) => {
  const { school, adminNumber, week, transactions, balance } = req.body;
  const data = readData();
  const studentId = `${school}_${adminNumber}`;
  
  if (data.students[studentId]) {
    const oneTimeIds = transactions
      .filter(t => t.oneTime)
      .map(t => t.id);
    
    data.students[studentId].weeks.push({
      week,
      transactions,
      endBalance: balance,
      timestamp: new Date().toISOString()
    });
    data.students[studentId].currentBalance = balance;
    data.students[studentId].currentWeek = week + 1;
    
    if (!data.students[studentId].usedOneTimeOptions) {
      data.students[studentId].usedOneTimeOptions = [];
    }
    data.students[studentId].usedOneTimeOptions.push(...oneTimeIds);
    
    writeData(data);
    res.json({ success: true, data: data.students[studentId] });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.get('/api/admin/all-students', verifyAdmin, (req, res) => {
  const data = readData();
  res.json(data.students);
});

app.post('/api/admin/reset-student', verifyAdmin, (req, res) => {
  const { school, adminNumber, startingBalance } = req.body;
  const data = readData();
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
    writeData(data);
    res.json({ success: true, message: 'Student reset successfully' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.post('/api/admin/reset-all', verifyAdmin, (req, res) => {
  const { startingBalance } = req.body;
  const data = readData();
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
  
  writeData(data);
  res.json({ success: true, message: 'All students reset successfully' });
});

app.post('/api/admin/set-balance', verifyAdmin, (req, res) => {
  const { school, adminNumber, startingBalance } = req.body;
  const data = readData();
  const studentId = `${school}_${adminNumber}`;
  
  if (data.students[studentId]) {
    data.students[studentId].startingBalance = startingBalance;
    data.students[studentId].currentBalance = startingBalance;
    writeData(data);
    res.json({ success: true, message: 'Starting balance updated' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.post('/api/admin/set-all-balance', verifyAdmin, (req, res) => {
  const { startingBalance } = req.body;
  const data = readData();
  
  Object.keys(data.students).forEach(studentId => {
    data.students[studentId].startingBalance = startingBalance;
    data.students[studentId].currentBalance = startingBalance;
  });
  
  writeData(data);
  res.json({ success: true, message: 'All starting balances updated' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
