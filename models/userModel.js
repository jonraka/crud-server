const mongoose = require("mongoose");
const {
    db
} = require("../utils/db");
const {
    validateEmail
} = require('../utils/validators')

// Vartotojas turi turėti tokias savybes: 
// Vartotojo vardas = simbolių darinys 
// Vartotojo amžius = skaičius. 
// Vartotojo paštas = simbolių darinys. 
// Vartotojo slaptažodis = simbolių darinys. 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Įveskite tinkama el. paštą'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
})

const userModel = db.model("user", userSchema);

module.exports = {
    userSchema,
    userModel
};