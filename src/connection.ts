import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Configure dotenv

import pg from 'pg'; // Import pg
const { Pool } = pg; // Destructure Pool from pg

// Create a new Pool object with the database credentials
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Create a function to connect to the database
const connectToDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}

// Export the pool and connectToDB function
export { pool, connectToDB };