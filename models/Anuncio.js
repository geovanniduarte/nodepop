'use strict'

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function (filter, start, limit, sort) {
    const query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio