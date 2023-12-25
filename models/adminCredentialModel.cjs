const mongoose = require("mongoose");

// Define the AdminCredential schema
const adminCredentialSchema = new mongoose.Schema({
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

// Create the AdminCredential model
const AdminCredential = mongoose.model(
  "AdminCredential",
  adminCredentialSchema
);

module.exports = AdminCredential;
