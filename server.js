const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
 // OBS: bcryptjs, inte bcrypt
require('dotenv').config(); // om du använder .env (kan tas bort annars)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB-anslutning
mongoose.connect('mongodb+srv://magnuskalix:Delirium240@jobbportalen-cluster.vbimvqb.mongodb.net/?retryWrites=true&w=majority&appName=jobbportalen-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('🟢 Ansluten till MongoDB');
}).catch((error) => {
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

