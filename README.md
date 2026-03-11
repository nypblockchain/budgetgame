# Financial Literacy App - The Budget Game

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Features

- **User Selection**: Students select school (Pei Hwa Secondary School) and admin number (1-24)
- **Budget Game**: 12-week challenge with $1000 starting balance
- **Transactions**: Add income and expenses each week
- **Game Over**: If balance drops below $0
- **Admin Dashboard**: View all student entries and weekly transactions

## File Structure

- `index.html` - Login/selection page
- `game.html` - Budget game interface
- `admin.html` - Admin dashboard
- `server.js` - Backend API server
- `data/gameData.json` - Student data storage

## Game Rules

- Starting balance: $1000
- Duration: 12 weeks
- Goal: Keep balance above $0
- Students make financial decisions each week by adding income and expenses
- Submit week to progress to next week
