'use strict'

const express = require('express');
const router = express.Router();
const CustomError = require('../../lib/CustomError');
const jsw = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const clave = req.body.clave;
    console.log('creds', email, clave);
    if (email && clave) {
        const filter = {name,clave}
        //const usuario = Usuario.findOne(filter)
        const usuario = {_id: 'fadga'};
        if (usuario) {
            jsw.sign({user_id: usuario._id}, process.env.SECRET, {expiresIn: process.env.EXPIRES_IN}, (err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({success:true, token});
            })
        } else {
            const noFoundError = new CustomError('ERR_USER_NOT_FOUND');
        }
    } else {
        const err = new CustomError('ERR_NOT_CREDENTIALS', 2);
        next(err);
    }
});

module.exports = router;