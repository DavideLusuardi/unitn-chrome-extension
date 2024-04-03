
console.log("service worker");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.key === "idpKey") {
      chrome.storage.local.get(["idpKey"]).then((result) => {
        sendResponse({idpKey: result.idpKey});
      });
      // Indicate that the response will be sent asynchronously
      return true;
    }
  }
);
