import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create a database connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tionne02!',
  database: 'signup',
});

// jwt secretkey
const secretKey = process.env.JWT_SECRET;


// Attempt to connect to the database
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQL database');
    connection.release();
  }
});
// Display the signup form
app.get('/signup', (req, res) => {
  // You can render an HTML form for user registration here
  res.send('This is the signup form.'); // Replace with your HTML form
});
app.post('/signup', (req, res) => {
  // Defines my SQL query
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  
  // Extract user data from the request body
  const { name, email, password } = req.body;

  // Define the values to be inserted
  const values = [name, email, password];

  // Execute the SQL query
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while signing up' });
    } else {
      // Query was successful; handle the result or send a success response
      res.json({ success: true });
    }
  });
});

// Google OAuth2 client
const googleClient = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID'); // Replace with your Google Client ID

// Attempt to connect to the database
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQL database');
    connection.release();
  }
});

// Google Sign-In route
app.get('/success', (req, res) => {
  // Render your success page or send a JSON response, as needed
  res.send('Success! You have been redirected to the success page.');
});

app.post('/google-auth', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the email is already registered in your system; if not, you can create a new user account

    // For demonstration purposes, just send a success response
    res.json({ success: true });
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    res.status(500).json({ error: 'Google Sign-In failed' });
  }
});

app.get('/protected', (req, res) => {
  // ... (your protected route)

  jwt.verify(token, secretKey, (err, decoded) => {
    // ... (your protected route logic)
  });
});

app.listen(8800, () => {
  console.log('Connected to the server');
});
