//פונקציה לוגין 
// fun register הרשמה 
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const register = async (req, res) => {
  // Validate input
  const { name, email, password } = req.body;
  console.log(req.body)
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  console.log('controller')


  let user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      name: name,
      email: email,
      password: password
    });
    console.log(newUser);

    newUser.save();
    res.status(201).send(newUser);
  } else {
    return res.status(400).json({ message: 'User already exists' });
  }

};



const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  // Find user by email in the database
  const user = await User.findOne({ email });
  const comparePass = await user.checkPassword(password)

  if (comparePass) {
    // Generate JWT token
    // const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    // Return the token and user ID
    const token = await user.generateAuthToken()

    res.json({ message: 'Login successful', token, userId: user.id });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
  }
};


const me = (req, res) => {
  const token = req.headers.authorization

}
module.exports = { register, login }