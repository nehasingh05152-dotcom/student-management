const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phase: String
});

module.exports = mongoose.model("Profile", profileSchema);