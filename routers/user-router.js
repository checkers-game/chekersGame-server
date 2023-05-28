const router = require('express').Router()
const userController = require('../controllers/user-controler')

router.post('/register',userController.register)
console.log('here router')


// Define routes
router.post('/login',userController.login);




module.exports = router;
