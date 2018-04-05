'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true},
    clave: String
});


userSchema.statics.guardar = function(usuarioData) {
    return new Promise((resolve, reject) => {
        const usuario = new Usuario(usuarioData);
        usuario.save((err, newUsuario) => {
            if (err) {
                const err = new CustomError('ERR_NO_SAVED');
                reject(err);
            }
            resolve(newUsuario);
        });
    });
}

userSchema.statics.consultar = function(filter, limit, sort) {
    const query = Usuario.find(filter);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
}

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;