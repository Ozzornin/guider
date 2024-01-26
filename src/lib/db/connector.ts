import mysql from "mysql2/promise";

export default async function Connect() {
  let connection;
  try {
    connection = await mysql.createPool({
      connectionLimit: process.env.NEXT_PUBLIC_MYSQL_POOL_LIMIT as
        | number
        | undefined,
      host: process.env.NEXT_PUBLIC_MYSQL_HOST,
      user: process.env.NEXT_PUBLIC_MYSQL_USER,
      password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
      database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    });
  } catch (e) {
    console.log("here");
  }

  return connection;
}
