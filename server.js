const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // välj antingen 'bcrypt' eller 'bcryptjs'
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB-anslutning
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobbportalen';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('🟢 Ansluten till MongoDB');
})
.catch((error) => {
  console.error('🔴 Fel vid MongoDB-anslutning:', error);
});

// Test-rutt
app.get('/', (req, res) => {
  res.send('🚀 Jobbportalen backend är igång!');
});

// Starta servern
app.listen(PORT, () => {
  console.log(`🟢 Servern körs på port ${PORT}`);
});
