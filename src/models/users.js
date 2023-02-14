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
const selectDataById = (by,data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM users WHERE ${by}='${data}'`
  );
}

module.exports = {selectData,insertData,selectDataById}