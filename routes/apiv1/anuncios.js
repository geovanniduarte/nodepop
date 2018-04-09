'use strict'

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');


const PRICE_SEPARATOR = '-';
const ARRAY_SEPARATOR = ' ';

//router.use(jwtAuth());

router.get('/', async (req, res, next) => {

  const tag = req.query.tag;
  const venta = req.query.venta;
  const nombre = req.query.nombre;
  var precio = req.query.precio;
  const start = parseInt(req.query.start);
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort;
  const includeTotal = req.query.includeTotal;

  const filter = {}

  if (tag) {
    filter.tags = {$in : tag.split(ARRAY_SEPARATOR)};
  }

  if (venta) {
    filter.venta = venta;
  }

  if (nombre) {
    filter.nombre = nombre;//new RegExp('ˆ' + nombre, "i");
  }
  
  if (precio) {
    precio = precio.split(PRICE_SEPARATOR);
    if (precio.length > 1) {
      const rango = {};
      if (precio[0]) {
        rango.$gt = precio[0];
      }
      if (precio[1]) {
        rango.$lt = precio[1];
      }
      filter.precio = rango;
    } else {
      filter.precio = precio;
    }
  }

  console.log(filter);

  const rows = await Anuncio.list(filter, start, limit, sort);
  res.json({success:true, result: rows});
});

router.get('/tags', async (req, res, next) => {
  const tags = await Anuncio.listTags();
  res.json({success: true, result : tags});
});

module.exports = router;