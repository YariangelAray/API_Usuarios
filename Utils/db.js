import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "Yari04",
  password: "0421",
  database: "api_bd"
});

export default connection;