const router = require('express')()
const { createUser, loginUser } = require('../controllers/userController')

//Users
router.post('/create',createUser)
router.post('/login', loginUser)

module.exports = router