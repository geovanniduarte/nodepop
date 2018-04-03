'use strict'

const mongoose = require('mongoose');

const conn = mongoose.connection

conn.on('open', () => {
    console.log(`conectado a mongo en ${mongoose.connection.name}`);
});

mongoose.connect('mongodb://localhost/nodepop', {

});

module.exports = conn;