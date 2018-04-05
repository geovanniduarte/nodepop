'use strict'

const express = require('express');
const router = express.Router();
const CustomError = require('../../lib/CustomError');
const jsw = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const encrypt = require('../../lib/encrypt');

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    var clave = req.body.clave;
    if (email && clave) {
        const filter = {nombre}
        var usuario = await Usuario.consultar(filter);
        
        if (usuario.length == 0) {
            const noFoundError = new CustomError('ERR_USER_NOT_FOUND');
            return next(noFoundError);
        }
        usuario = usuario[0];
        const claveBD = usuario.clave;
        clave = encrypt.encrypt(clave);
        console.log(claveBD, clave);
        
        if (claveBD === clave) {
            jsw.sign({user_id: usuario._id}, process.env.SECRET, {expiresIn: process.env.EXPIRES_IN}, (err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({success:true, token, usuario});
            })
        } else {
            return next(new CustomError('ERR_INVALID_PASS'));
        }
    } else {
        const err = new CustomError('ERR_NOT_CREDENTIALS', 2);
        next(err);
    }
});

module.exports = router;