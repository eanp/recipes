const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,getRecipesById} = require('../controller/recipes')
const {protect} = require('../middleware/auth')

router.get('/',protect,getRecipes)
router.post('/',protect,inputRecipes)
router.get('/my-recipe',protect,getRecipesById)

module.exports = router
