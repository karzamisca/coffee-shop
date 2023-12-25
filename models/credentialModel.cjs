const mongoose = require("mongoose");

// Define the Credential schema
const credentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the Credential model
const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
