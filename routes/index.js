var express = require('express');
var fs = require('fs');
var router = express.Router();
var bhrgmodel = require('../modules/data');
var bank = bhrgmodel.find({});
var transmodel = require('../modules/transhistory');
var history = transmodel.find({});
const { InsufficientStorage } = require('http-errors');
// const database = dbase.find({});
// const send = require('send()');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BHRG BANK' });
});

router.get('/allusers', (req, res, next) => {
  
   bank.exec((err,data) => {
 if(err) throw err;
 else
  // bhrgmodel.find({}, (err, data) =>{
  //   if(err) throw err;
  //   else
      res.status(200).render('allusers', {title: 'USERS', records: data});
  });
});

router.get('/allusers/:id', function(req, res) {

  bhrgmodel.findById(req.params.id, (err, data) =>{
    if(err) {
      console.log(err);
                  }
    else{
    res.status(200).render('userdetails', {title: 'DETAILS', customer: data});
    }
  });
}); 


router.get('/transfer', function(req, res, next) {
 bhrgmodel.find({}, (err, data) => {
   if(err) console.log(err);
   else{
     res.status(200).render('transfer', {title: 'TRANSFER', transfers:data});
   }
 });
});

router.post('/transfer', async(req, res) => {
  
  var dataObj = {
    sendername: req.body.sendername,
    senderbalance: req.body.senderbalance,
    receivername: req.body.receivername,
    amount: req.body.amount
    // receiverbalance: req.body.receiverbalance
  }

      console.log(dataObj.sendername);
      console.log(dataObj.senderbalance);
      console.log(dataObj.receivername);
      // console.log(dataObj.recieverbal);
      
      var SenderBalance = parseInt(dataObj.senderbalance);
      var Amount = parseInt(dataObj.amount);
      // console.log(Amount);
      
      
      // var sender = await bhrgmodel.findOne({name: sendername});
      // var SenderBalance = parseInt(sender.balance);
      console.log(SenderBalance);
      
      var receiver = await bhrgmodel.findOne({name: dataObj.receivername});
      var getr = receiver ;
      var ReceiverBalance = parseInt(getr.balance);
      console.log(ReceiverBalance);
      
      console.log(dataObj.amount);
  if(Amount <=0){
    bhrgmodel.find({}, (err, data) => {
    if(err) {console.log(err);
    }
    else {
      res.status(200).render('transfer', {title: 'TRANSFER', transfers: data});
    }
  })
  }  else if(Amount > SenderBalance){
    bhrgmodel.find({}, (err, data) => {
      if(err) {console.log(err);
      }
      else {
        res.status(200).render('transfer', {title: 'TRANSFER', transfers: data});
      }
    })
  }
  else{
    var MoneyDebit = parseInt(SenderBalance) - parseInt(Amount)
    console.log(MoneyDebit);

    var CreditMoney = parseInt(ReceiverBalance) + parseInt(Amount)
    console.log(CreditMoney);

    var transdetails = await new transmodel({
      sendername: req.body.sendername,
      receivername: req.body.receivername,
      amount: parseInt(req.body.amount),
      date: new Date()
    }).save(async(err, data) => {
      if(err) throw err;
     await console.log("Successfully Added..");
    });

  await bhrgmodel.findOneAndUpdate({name: dataObj.sendername}, {balance:MoneyDebit}, (err) => {
    if(err) throw err;
    console.log(`Sender's Data Updated Successfuly!!!`);
  });
  await bhrgmodel.findOneAndUpdate({name: dataObj.receivername}, {balance:CreditMoney}, (err) => {
    if(err) throw err;
    console.log(`Reciever's Data Updated Successfully!!!`);
  });
  history.exec((err, data) => {
    if(err) throw err;
    res.status(200).render('transaction', { title: 'TRANSACTION', transactions: data });
  });
};
 });

//  var mydata = {
//   sendername : req.body.sendername,
//   senderbalance : req.body.senderbalance,
//   receivername : req.body.receivername,
//   amount : req.body.amount
//  //  receiverbalance : req.body.receiverbalance
//  }
// console.log(mydata.sendername)
// console.log(mydata.senderbalance)
// console.log(mydata.receivername)
// // console.log(receiverbalance)

// var senderBalance = parseInt(mydata.senderbalance)
// var Amount = parseInt(mydata.amount)


// var receiverbal = await bhrgmodel.findOne({name: mydata.receivername});
// // console.log(receiverbal)

// var getb = receiverbal;
// // console.log(getb.accbalance)
// var receiverbalance = parseInt(getb.balance);
// console.log(receiverbalance)

// console.log(mydata.amount)
// if(Amount <= 0){
// bhrgmodel.find({}, function(err,data){
//  if(err){
//    console.log(err);
//  } else {
//    res.render('transfer', {title:"TRANSFER", transfers:data});
//  }
// })
// }else if(senderBalance < Amount){
//  bhrgmodel.find({}, function(err,data){
//    if(err){
//      console.log(err);
//    } else {
//      res.render('transfer', {title:"TRANSFER", transfers:data});
//    }
//  })
// }else{
//  var debitmoney = parseInt(senderBalance) - parseInt(Amount)
//  console.log(debitmoney)
//  var creditmoney = parseInt(receiverbalance) + parseInt(Amount)
//  console.log(creditmoney)
//  // var sendername: req.body.sendername
//  // var receivername: req.body.receivername

//  var details = await new transmodel({
//    sendername: req.body.sendername,
//    receivername: req.body.receivername,
//    amount: parseInt(req.body.amount),
//    date: new Date()
//  }).save(async(err,data)=>{
//    if(err) throw err
//    console.log("successfully Inserted")
//  });
 

//   await bhrgmodel.findOneAndUpdate({name: mydata.sendername},{balance:debitmoney},(err)=>{
//    if(err) throw err;
//    console.log("sender Data updated Successfully")
//  })
//   await bhrgmodel.findOneAndUpdate({name: mydata.receivername},{balance:creditmoney},(err)=>{
//    if(err) throw err;
//    console.log("receiver Data updated Successfully")
//  })
//   bank.exec(function(err,data){
//    if(err) throw err;
//    res.status(200).render('transaction', {title: 'TRANSACTION', transactions: data});
//  });
// };

// });


router.get('/transaction', async(req, res, next) => {
  // if(err) throw err ;
  console.log(history.exec());
  await transmodel.find({}, (err, data) => {
    if(err) throw err;
    res.status(200).render('transaction', {title: 'TRANSACTION', transactions: data});
  });    
});
// });
module.exports = router;
// module.exports = send;