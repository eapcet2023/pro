const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for your users collection
const userSchema = new mongoose.Schema({
    "id": String,
    "first_name": String,
    "last_name": String,
    "email": String,
    "gender": String,
    "income": String,
    "city": String,
    "car": String,
    "quote": String,
    "phone_price": String
});

// Create a model for your users collection
const User = mongoose.model('User', userSchema);

// Define an endpoint that retrieves all users from your database
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
