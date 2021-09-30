var sendmoney = function() {
     var money = parseInt(document.getElementById("amount").value);
        console.log(money)
     var bal = parseInt(document.getElementById("senderbalance").innerHTML);
        console.log(bal)
     if(money<=0){
         alert("Please enter a real amount");
     }
     else if(money > bal) {
          alert("Insufficient Balance");
     }
      else{
          alert("Transfer Succesfully Done");
      }

     }
    //  export default sendmoney;
// module.exports = function send();