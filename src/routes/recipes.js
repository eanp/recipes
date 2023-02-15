const express = require('express')
const router = express.Router()
const {inputRecipes} = require('../controller/recipes')

// router.get('/',getData)
router.post('/',inputRecipes)

module.exports = router
