const Pool = require('./../config/db')

const insertData = (data) => {
    let {ingredients,title,photo,users_id} = data
    let time =new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at) VALUES('${title}','${ingredients}','${photo}','${users_id}','${time}')`
  );
}

const getData = (data) => {
  let {searchBy,search,sortBy,sort} = data
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort}`
  );
}

const getDataById = (data) => {
  let {searchBy,search,sortBy,sort,id} = data
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  );
}



module.exports = {insertData,getData,getDataById}