"use strict";

var express = require('express');

var router = express.Router();

var bhrgmodel = require('../modules/data');

var bank = bhrgmodel.find({});

var transmodel = require('../modules/transhistory');

var history = transmodel.find({});

var _require = require('http-errors'),
    InsufficientStorage = _require.InsufficientStorage; // const database = dbase.find({});

/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'BHRG BANK'
  });
});
router.get('/allusers', function (req, res, next) {
  bank.exec(function (err, data) {
    if (err) throw err;else // bhrgmodel.find({}, (err, data) =>{
      //   if(err) throw err;
      //   else
      res.render('allusers', {
        title: 'USERS',
        records: data
      });
  });
});
router.get('/allusers/userdetails', function (req, res, next) {
  bhrgmodel.findById(req.params.id, function (err, data) {
    if (err) throw err;else res.render('userdetails', {
      title: 'DETAILS',
      users: data
    });
  });
});
router.get('/transfer', function (req, res, next) {
  res.render('transfer', {
    transfers: data
  });
});
module.exports = router;