const Pool = require('./../config/db')

const getData = () => {
    return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM category`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
  }

  module.exports = {getData}