const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,getRecipesById} = require('../controller/recipes')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/uploadPhoto')

router.post('/',protect,upload.single('photo'),inputRecipes)
router.get('/',getRecipes)
router.get('/my-recipe',protect,getRecipesById)

module.exports = router
