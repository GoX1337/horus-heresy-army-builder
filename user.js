const mongoose = require("mongoose");
module.exports = mongoose.model("User", mongoose.Schema({
    username: String,
    email: String,
    password: String
}));