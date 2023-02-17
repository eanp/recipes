const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes} = require('../controller/recipes')

router.get('/',getRecipes)
router.post('/',inputRecipes)

module.exports = router
