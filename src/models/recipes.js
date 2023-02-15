const Pool = require('./../config/db')

const insertData = (data) => {
    let {ingredients,title,photo,users_id} = data
    let time =new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at) VALUES('${title}','${ingredients}','${photo}',${users_id},'${time}')`
  );
}

module.exports = {insertData}