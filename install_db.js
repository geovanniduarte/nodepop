'use strict'

const mongoose = require('mongoose');
const async = require('async');
const db = require('./lib/connectMongoose');
const fs = require('fs');

//cargo schemas
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');

db.on('open', () => {
    console.log('conectado para inits');
    //borrar anuncios
    initAnuncios()
    .then(cargarAnunciosFile)
    .then(cargarAnunciosBD)
    .catch((err) => {
        console.log(':( ' + err);
    })
    //borrar
});

function initAnuncios() {
    return new Promise((resolve, reject) => {
        anuncio.remove({}, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('eliminados anuncio');
                //cargar anuncios
                const file = './anuncios.json';
                resolve(file);
            }
        });
    });
}

function initUsuarios() {

}

function cargarAnunciosFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                //fichero leido.
                resolve(data);
            }
        });
    });
}

async function cargarAnunciosBD(data) {
    return new Promise((resolve, reject) => {
        const anunciosJSON = JSON.parse(data).anuncios
        const anunciosCount = anunciosJSON.length;
        const aSavePromises = [];
        for (var i = 0; i < anunciosCount; i++) {
            aSavePromises[i] = new Anuncio(anunciosJSON[i]).save();
        }
        Promise.all(aSavePromises).then(() => {
            console.log('anuncios :)');
            resolve();
        }).catch(() => {
            console.log('anuncios :(');
            reject(new Error('anuncios :('));
        })
    }); 
}



