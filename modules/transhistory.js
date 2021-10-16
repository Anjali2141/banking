const express = require("express");
const mongoose = require('mongoose');
require('mongoose-type-url');
const validate = require('mongoose-validator');

// connecting to database 
const db = 'mongodb+srv://Anjali:Anjali2141@cluster0.jt82p.mongodb.net/bhrgbank?retryWrites=true&w=majority';

// connecting to database userdata

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false
});
//connected
var dbase = mongoose.connection;
dbase.on('error', console.error.bind(console, 'connection error:')).once('open', function() {
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

// module.exports = db;
module.exports = transmodel;

