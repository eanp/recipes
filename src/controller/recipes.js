const {insertData,getData,getDataById} = require('./../models/recipes')
const cloudinary = require("../config/photo")

const RecipesController = {
    inputRecipes: async (req,res,next)=>{
        const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})

        console.log('imageUrl', imageUrl)

        if(!imageUrl){
            res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
        }

        let data = {}
        data.title = req.body.title
        data.photo = imageUrl.secure_url
        data.users_id = req.payload.id
        data.ingredients = req.body.ingredients
        data.category_id = req.body.category_id
        
        let result = await insertData(data)

        if(!result){
            res.status(404).json({status:404,message:`input data failed`})
        }

        res.status(200).json({status:200,message:`input data success `})

    },
    getRecipes: async (req,res,next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC'
        }

        let result = await getData(data)

        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },
    getRecipesById: async (req,res,next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC',
            id: req.payload.id
        }

        let result = await getDataById(data)

        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    }
}

module.exports = RecipesController