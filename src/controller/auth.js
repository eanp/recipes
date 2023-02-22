const {findUser,createUser} = require('./../models/users')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');

const UsersController = {
    registerUser: async (req,res,next)=>{
        if(!req.body.email || !req.body.password || !req.body.name){
            return res.status(404).json({status:404,message:`masukan data yang benar`})
        }

        console.log(req.body.email)

        let {rows:[users]} =await findUser(req.body.email)

        if(users){
            return res.status(401).json({status:401,message:`email sudah terdaftar silakan login`})
        }

        let data = {
            id: uuidv4(),
            email: req.body.email,
            password: await argon2.hash(req.body.password),
            fullname: req.body.name
        }

        let register = await createUser(data)
        
        if(!register){
            return res.status(401).json({status:401,message:`register gagal`})
        }

        return res.status(201).json({status:201,message:`register berhasil`})                
    },
    loginUser: async (req,res,next)=>{

        if(!req.body.email || !req.body.password){
            return res.status(404).json({status:404,message:`masukan data yang benar`})
        }

        let {rows:[users]} =await findUser(req.body.email)

        let verifyPassword = await argon2.verify(users.password,req.body.password)

        if(verifyPassword){
            delete users.password
            delete users.otp
            delete users.verif
            delete users.created_at
            return res.status(200).json({status:200,message:`login berhasil`,data:users})        
        }

        return res.status(404).json({status:404,message:`login gagal`})       

    }
}

module.exports = UsersController