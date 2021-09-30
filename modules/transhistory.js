const express = require("express");
const mongoose = require('mongoose');
require('mongoose-type-url');
const validate = require('mongoose-validator');

// connecting to database 
mongoose.connect('mongodb://localhost/bhrgbank', {useNewUrlParser: true, useUnifiedTopology: true});
//connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')).once('open', function() {
console.log('Connected to history.....');});

const transchema = new mongoose.Schema({
    sendername: String,
    receivername: String,
    amount: Number,
    date: String,
    // senderbalance: Number,
    // receiverbalance: Number
});

var transmodel = mongoose.model('transactions', transchema);

module.exports = db;
module.exports = transmodel;

