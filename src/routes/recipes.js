const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,getRecipesById,deleteRecipes,updateRecipes} = require('../controller/recipes')
const {getCategories} = require('../controller/category')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/uploadPhoto')

router.post('/',upload.single('photo'),inputRecipes)
router.get('/',getRecipes)
router.get('/category',getCategories)
router.get('/my-recipe',protect,getRecipesById)
router.put('/:id',upload.single('photo'),updateRecipes)
router.delete('/:id',deleteRecipes)

module.exports = router
