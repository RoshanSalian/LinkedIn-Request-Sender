// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   chrome.tabs.sendMessage(tabId, {type: 'start'});
// })

// Reading for message from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.message === "startFromPopup") {
    //control reaches here.

    const currentTab = chrome.tabs.query({currentWindow: true, active: true}, function(){});
    console.log(currentTab);
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log(tabs)
      let tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabs[0].id, {action: "start"});  
    });
  }
});


