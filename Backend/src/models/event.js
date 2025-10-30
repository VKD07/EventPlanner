//Models communicate with DB

import con from "../dbConnection/dbConnection.js";

const tableName = "event";

async function getAll() {
  const result = await con.query(`SELECT * FROM ${tableName}`);
  return result.rows;
}

async function create(title, day, month, year, location, description) {
  const result = await con.query(
    `INSERT INTO ${tableName} (title, day, month, year, location, description)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, day, month, year, location, description]
  );
  return result.rows[0];
}

export default { getAll, create };
