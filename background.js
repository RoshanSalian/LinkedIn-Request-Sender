// Reading for message from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.message === "startFromPopup") {
    const currentTab = chrome.tabs.query({currentWindow: true, active: true}, function(){});

    const note = request.note;
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      // need to send note here
      chrome.tabs.sendMessage(tabs[0].id, {action: "start", note: note, selected: request.selected});  
    });
  }
});


