const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(
      `SELECT * FROM users`
    );
  };

const insertData = data => {
  console.log(data)
  return Pool.query(
    `INSERT INTO users(name) VALUES('${data}')`
  );
}
const selectUserById = (id) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE id='${id}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const updateData = (id,data) => {
  console.log(data)
  return Pool.query(
    `UPDATE users SET name='${data}' WHERE id=${id}`
  );
}

const deleteUser = (id) => {
  console.log(id)
  return Pool.query(
    `DELETE FROM users WHERE id=${id}`
  );
}

const findUser = (email) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE email='${email}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const createUser = (data) => {
  const {email,fullname,password,id,otp} = data
  console.log(data)
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO users(id,email,fullname,password,otp) VALUES('${id}','${email}','${fullname}','${password}','${otp}')`,(err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const verifyUser = (id) => {
  return Pool.query(
    `UPDATE users SET verif=1 WHERE id='${id}'`
  );
}

module.exports = {selectData,insertData,selectUserById,updateData,deleteUser,findUser,createUser,verifyUser}