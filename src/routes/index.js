const express = require('express')
const router = express.Router()
const Users =   require('./users')
const Recipes =   require('./recipes')
const Auth =   require('./auth')

router.use('/auth',Auth)
router.use('/users',Users)
router.use('/recipes',Recipes)

module.exports = router
