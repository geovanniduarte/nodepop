import { throws } from 'assert';

'use strict'

const express = require('express');
const router = express.router
const CustomError = require('../../lib/CustomError');

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const clave = req.body.clave;

    if (email && clave) {
        filter = {name,clave}
        const usuario = Usuario.findOne(filter)
    } 
});