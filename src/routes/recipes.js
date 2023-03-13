const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,getRecipesById,deleteRecipes,updateRecipes,getRecipesByUserId} = require('../controller/recipes')
const {getCategories} = require('../controller/category')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/uploadPhoto')

router.post('/',protect,upload.single('photo'),inputRecipes)
router.get('/',getRecipes)
router.get('/:id',getRecipesById)
router.get('/category',getCategories)
router.get('/my-recipe',protect,getRecipesByUserId)
router.put('/:id',upload.single('photo'),updateRecipes)
router.delete('/:id',deleteRecipes)

module.exports = router
