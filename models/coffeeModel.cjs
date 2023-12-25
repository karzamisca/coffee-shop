const mongoose = require("mongoose");

// Define the Coffee schema
const coffeeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantityInStorage: {
    type: Number,
    required: true,
  },
});

// Create the Coffee model
const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
