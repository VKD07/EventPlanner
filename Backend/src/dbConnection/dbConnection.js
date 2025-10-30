import postgres from "pg";

const { Client } = postgres;

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Seleven717",
  database: "icoc",
});

await con.connect();
console.log("Connected to PostgreSQL Db");

export default con;