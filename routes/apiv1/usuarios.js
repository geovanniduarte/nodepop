'use strict'

const express = require('express');
const router = express.Router();
const Usuario = require('../../models/Usuario');
const jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth());

router.get('/', async (req, res, next) => {

  const email = req.query.email;
  const nombre = req.query.nombre;
  const sort = req.query.sort;

  const filter = {};
  if (nombre) {
      filter.nombre
  }

  const rows = await Usuario.consultar(filter, sort);
  res.json({success:true, result: rows});
});

router.post('/', (req, res, next) => {
    const user = req.body
    Usuario.guardar(user).then((newUser) => {
        res.json({success: true, result: newUser});
    }).catch((err) => {
        res.json({success: false, error: err.message});
    });
});

module.exports = router;