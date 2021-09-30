 let send = function() {
     var money = parseInt(document.getElementById("amount").value);

     var bal = parseInt(document.getElementById("senderbal").innerHTML);

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
export default send;