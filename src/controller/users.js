const {selectData,insertData,selectDataById} = require('./../models/users')

let data = {
    users: [{
        id: 1,
        name: "fauzan"
    },
    {
        id:2,
        name: "bayu"
    }]
}

const UsersController = {
    getDetail: async (req,res,next)=>{
        let id = req.params.id
        let foundUser = null
    
        data.users.map(item =>{
            if( item.id == id){
                foundUser = item
            }
        } )
    
        console.log(foundUser)
    
        if(foundUser){
            res.status(200).json({status:200,message:`data user :  ${foundUser.name}`})
        } else {
            res.status(400).json({status:400,message:`data user not found`})
        }
    },
    getData: async (req,res,next)=>{
        let showUser = await selectData()
        if(!showUser){
            res.status(400).json({status:400,message:`data user not found`})
        }
        
        res.status(200).json({status:200,message:`data found`,data:showUser.rows})
    },
    postData: async (req,res,next)=>{
        let body = req.body
        let input = await insertData(body.name)

        if(!input){
            res.status(401).json({status:400,message:`data not input`})
        }

        let checkData = await selectDataById('name',body.name)

        if(!checkData){
            res.status(404).json({status:404,message:`data input not found`})
        }

        res.status(200).json({status:200,message:`data found`,data:checkData.rows})
    },
}

module.exports = UsersController