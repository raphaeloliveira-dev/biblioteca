import mysql from 'mysql2/promise';

function conectarBanco() {
  const porta = Number(process.env.DB_PORT || process.env.DB_PORTA) || 3306;

  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'biblioteca',
    port: porta,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

export default conectarBanco;