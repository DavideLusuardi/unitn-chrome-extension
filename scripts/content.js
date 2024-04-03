
console.log("content script");

if (document.getElementById("tokencode")) {
  console.log("tokencode found");

  chrome.runtime.sendMessage({key: "idpKey"}, function(response) {
    if (response.idpKey) {
      totp = OTP(response.idpKey);
      console.log('totp: ' + totp);
    
      document.getElementById("tokencode").value = totp;
      document.getElementById("btnAccedi").click();
    } else {
      console.log("idpKey not set");
    }
  });
  
} else {
  console.log("tokencode not found");
}

// if (document.getElementById("btnAccedi")) {
//   sleep(2);
//   document.getElementById("btnAccedi").click();
// }

// function sleep (seconds) {
//   var start = new Date().getTime();
//   while (new Date() < start + seconds*1000) {}
//   return 0;
// }


