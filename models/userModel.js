const mongoose = require("mongoose");
const { db } = require("../utils/db");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

const userModel = db.model("user", userSchema);

module.exports = {
    userSchema,
    userModel
};