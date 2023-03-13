const {getData} = require('./../models/category')

const categoryController = {getCategories: async (req,res,next) => {
    let result = await getData()
    if(!result){
        return res.status(404).json({status:404,message:`get data failed`})
    }
    console.log(result)
    res.status(200).json({status:200,message:`get data success `,data:result.rows})
},
}
module.exports = categoryController