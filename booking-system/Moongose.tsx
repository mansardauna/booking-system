const mongoose = require('mongoose');

// Define the schema for the "User" collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Define the schema for the "Signup" collection
const signupSchema = new mongoose.Schema({
  username: String,
  password: String,
  id: Number,
});

// Define the schema for the "Category" collection
const categorySchema = new mongoose.Schema({
  id: Number,
  title: String,
});

// Define the schema for the "Product" collection
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  rate: Number,
  images: [String],
  videos: [String],
  location: String,
  category: String,
  des: String,
  facilities: [{
    icon: String,
    title: String,
  }],
  booking: [{
    id: String,
    username: String,
    event: String,
    startDate: Date,
    endDate: Date,
    phoneNumber: String,
    calculatedPrice: Number,
  }],
});

// Create models for each collection based on their respective schemas
const User = mongoose.model('User', userSchema);
const Signup = mongoose.model('Signup', signupSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Signup, Category, Product };
