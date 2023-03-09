const Pool = require('./../config/db')

const insertData = (data) => {
    let {ingredients,title,photo,users_id,category_id} = data
    let time =new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at,category_id) VALUES('${title}','${ingredients}','${photo}','${users_id}','${time}',${category_id})`
  );
}

const updateData = (data) => {
    let {ingredients,title,photo,category_id,id} = data
    let time =new Date().toISOString()
    return new Promise((resolve,reject)=>
    Pool.query(`UPDATE recipes SET title='${title}', ingredients='${ingredients}', photo='${photo}', updated_at='${time}', category_id=${category_id} WHERE id=${id} RETURNING *`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const deleteData = (id) => {
  console.log(id)
  let time =new Date().toISOString()
  return Pool.query(
    `UPDATE recipes SET deleted_at='${time}' WHERE id=${id}`
  );
}

const getData = (data) => {
  let {searchBy,search,sortBy,sort} = data
  return Pool.query(
    `SELECT recipes.id,recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort}`
  );
}

const getDataByUserId = (data) => {
  let {searchBy,search,sortBy,sort,id} = data
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  );
}

const getDataById = (id) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM recipes WHERE id='${id}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}


module.exports = {insertData,getData,getDataById,updateData,deleteData,getDataByUserId}