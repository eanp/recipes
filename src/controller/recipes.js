const {insertData,getData,getDataById,deleteData,updateData,getDataByUserId} = require('./../models/recipes')
const cloudinary = require("../config/photo")

const RecipesController = {
    inputRecipes: async (req,res,next)=>{
        if(!req.isFileValid){
            return res.status(404).json({status:404,message:`${req.isFileValidMessage || `tipe file salah`}`})
        }

        const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})

        console.log('imageUrl', imageUrl)

        if(!imageUrl){
            return res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
        }

        let data = {}
        data.title = req.body.title
        data.photo = imageUrl.secure_url
        data.users_id = req.payload.id
        data.ingredients = req.body.ingredients
        data.category_id = req.body.category_id
        
        let result = await insertData(data)

        if(!result){
            return res.status(404).json({status:404,message:`input data failed`})
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
            return res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },
    getRecipesByUserId: async (req,res,next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC',
            id: req.payload.id
        }

        let result = await getDataByUserId(data)

        if(!result){
            return res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },
    deleteRecipes:async(req,res,next) => {
        let id = req.params.id
        let result = await deleteData(id)
        if(!result){
            return res.status(404).json({status:404,message:`delete data failed`})
        }

        res.status(200).json({status:200,message:`delete data success `})
    },
    getRecipesById:async(req,res,next) => {
        let id = req.params.id
        let result = await getDataById(id)
        if(!result){
            return res.status(404).json({status:404,message:`get data failed`})
        }
        if(result.rows[0].deleted_at !== null){
            return res.status(404).json({status:404,message:`data has been deleted`,})
        }

        res.status(200).json({status:200,message:`get data success`,data:result.rows[0]})
    },
    updateRecipes:async(req,res,next)=>{
        let id = req.params.id
        let {rows:[recipes]} = await getDataById(id)
        
        if(!recipes){
            return res.status(404).json({status:404,message:`data not found`})
        }
        
        let data = {}
        data.id = parseInt(id)
        data.title = req.body.title || recipes.title
        data.ingredients = req.body.ingredients || recipes.ingredients
        data.category_id = req.body.category_id || recipes.category_id
        
        let photoFile = req.file
        if(photoFile){
            console.log("input with photo")
            console.log(photoFile)
            const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})
            data.photo = imageUrl.secure_url
            console.log('imageUrl', imageUrl)
            if(!imageUrl){
                return res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
            }    
            let {rows:[users]} = await updateData(data)
            res.status(200).json({status:200,message:`update data success `,data:users})
        }
        
        if(!photoFile){
            console.log("input no photo")
            data.photo = recipes.photo
            let {rows:[users]} = await updateData(data)
            res.status(200).json({status:200,message:`update data success `,data:users})
        }

    }
}

module.exports = RecipesController