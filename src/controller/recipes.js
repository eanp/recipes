const {insertData} = require('./../models/recipes')

const RecipesController = {
    inputRecipes: async (req,res,next)=>{
        let data = {}
        data.title = req.body.title
        data.photo = req.body.photo
        data.users_id = req.body.users_id
        data.ingredients = req.body.ingredients
        
        let result = await insertData(data)

        if(!result){
            res.status(404).json({status:404,message:`input data failed`})
        }

        res.status(200).json({status:200,message:`input data success `})

    }
}

module.exports = RecipesController