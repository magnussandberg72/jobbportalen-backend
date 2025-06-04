const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dinhemliga_jwt_nyckel';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'din-mongodb-connection-string-här';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB ansluten'))
  .catch(err => console.error('MongoDB fel:', err));

// Scheman
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String,
});

const User = mongoose.model('User', UserSchema);

// Register
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'Fyll i alla fält' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Användare finns redan' });

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  res.json({ message: 'Registrering lyckades' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Fel e-post eller lösenord' });

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Fel e-post eller lösenord' });

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
});
