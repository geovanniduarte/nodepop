'use strict'

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => {
  const rows =   await Anuncio.list();
  res.json({success:true, result: rows});
});

module.exports = router;