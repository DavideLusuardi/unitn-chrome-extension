
function errNotif(msg) {
  document.getElementById('errorMsg').innerHTML = msg;
  document.getElementById('errorMsg').style.visibility = 'visible';
  setTimeout(function(){ document.getElementById('errorMsg').style.visibility = 'hidden'; }, 3000);
}

function setUnsetIdpKey() {
  if (document.getElementById('setUnsetIdpKey').value == 'SET') {
    var key = isBase32(document.getElementById('idpKey').value);
    if (key == null) {
      errNotif('Wrong key format');
      return ;
    }
    
    chrome.storage.local.set({'idpKey': key}).then(() => {
      console.log("idp key is set");
    });
  
    document.getElementById('setUnsetIdpKey').value = 'DEL';
    document.getElementById('idpKey').style.visibility = 'hidden';
  
  } else {
    chrome.storage.local.remove('idpKey').then(() => {
      console.log("idp key removed");
    });
  
    document.getElementById('setUnsetIdpKey').value = 'SET';
    document.getElementById('idpKey').style.visibility = 'visible';
  }
  updatePopup();
}

function updatePopup() {
  chrome.storage.local.get(["idpKey"]).then((result) => {
    if (result.idpKey) {
      document.getElementById('setUnsetIdpKey').value = 'DEL';
      document.getElementById('idpKey').style.visibility = 'hidden';
      document.getElementById('myProgress').style.visibility = 'visible';
      generateOTP();
      updateProgressBar();
    } else {
      document.getElementById('myProgress').style.visibility = 'hidden';
      document.getElementById('totpa').innerHTML = "---";
      document.getElementById('totpb').innerHTML = "---";
    }
  });
}

function updateProgressBar() {
  var epoch = Math.round(new Date().getTime() / 1000.0);
  var progressVal = Math.trunc(((epoch % 30) * 100) / 30);
  document.getElementById("progressBar").style.width = progressVal + '%';
  if (progressVal > 90) document.getElementById("progressBar").style.backgroundColor = '#EA4335';
  else if (progressVal > 70) document.getElementById("progressBar").style.backgroundColor = '#FBBC05';
  else document.getElementById("progressBar").style.backgroundColor = '#63bf63';
  if (epoch % 30 == 0) generateOTP();
}

function generateOTP() {
  chrome.storage.local.get(["idpKey"]).then((result) => {
    if (result.idpKey) {
      var otp = OTP(result.idpKey);
      var p1 = otp.substring(0, 3);
      var p2 = otp.substring(3);
      document.getElementById('totpa').innerHTML = p1;
      document.getElementById('totpb').innerHTML = p2;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('setUnsetIdpKey').addEventListener("click", setUnsetIdpKey);
  updatePopup();
  setInterval(updateProgressBar, 1000);
});

console.log("popup");
