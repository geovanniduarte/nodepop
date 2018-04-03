'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true},
    clave: String
});

const Usuario = mongoose.model('Usuario', userSchema);



module.exports = Usuario;