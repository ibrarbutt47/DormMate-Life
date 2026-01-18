import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err.message);
  } else {
    console.log('MySQL Database connected successfully!');
  }
});

export default connection;









// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// dotenv.config();

// let connection;

// try {
//   connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//   });

//   console.log('MySQL Database connected successfully!');
// } catch (err) {
//   console.error('❌ Failed to connect to MySQL:', err.message);
// }

// export default connection;
