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

/*
// Define an endpoint that retrieves all users from your database
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: 5 },
      car: { $in: ['BMW', 'Mercedes'] }
    });
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Endpoint for male users with phone price > $10,000 USD
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      gender: 'Male',
      'phone.price': { $gt: 10000 }
    });
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint for users with last name starting with "M" and quote character length > 15
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      lastName: /^M/,
      $expr: {
        $gt: [{ $strLenCP: '$quote' }, 15]
      },
      email: { $regex: /^.*M.*$/ }
    });
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint for users with BMW, Mercedes, or Audi car and email doesn't contain digits
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $not: { $regex: /\d/ } }
    });
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
*/
// Endpoint for top 10 cities with highest number of users and their average income
app.get('/users', async (req, res) => {
  try {
    const cities = await User.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 },
          avgIncome: { $avg: '$income' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    res.json(cities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
