const express = require('express');
const mongoose = require('mongoose');
require('mongoose-type-url');
const validate = require('mongoose-validator');

// connecting to database userdata

mongoose.connect('mongodb://localhost/bhrgbank', {useNewUrlParser: true, useUnifiedTopology: true});
//connected

var dbase = mongoose.connection;
dbase.on('error', console.error.bind(console, 'connection error:')).once('open', function() {
console.log('Connected to Bank.....');});

const bhrgschema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    balance: Number,
    city: String,
});

var bhrgmodel = mongoose.model('users', bhrgschema);

module.exports = dbase;
module.exports = bhrgmodel;

