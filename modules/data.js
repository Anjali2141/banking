const express = require('express');
const mongoose = require('mongoose');
require('mongoose-type-url');
const validate = require('mongoose-validator');
 
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
console.log('Connected to Bank.....');});

const bhrgschema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    balance: Number,
    city: String,
});

var bhrgmodel = mongoose.model('users', bhrgschema);

// module.exports = dbase;
module.exports = bhrgmodel;

