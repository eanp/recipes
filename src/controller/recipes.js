const {insertData,getData} = require('./../models/recipes')

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
    }
}

module.exports = RecipesController