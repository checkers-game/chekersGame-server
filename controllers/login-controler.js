// // Import necessary modules and models
// const User = require('../models/User')
// const jwt = require('jsonwebtoken');

// // Handle user login
// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body)

//   // Find user by email in the database
//   const user = User.findOne({ email });

//   if (user.checkPassword(password, (err, result)=> {
//     if (err){
//         return "Failed Login"
//     }
//     user.generateAuthToken()
//   })) {
//     // Generate JWT token
    

//     // Return the token and user ID
//     res.json({ message: 'Login successful', token, userId: user.id });
//   } else {
//     // Invalid credentials
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// };
