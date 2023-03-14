// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   chrome.tabs.sendMessage(tabId, {type: 'start'});
// })

// Reading for message from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.message === "startFromPopup") {
    //control reaches here.
    console.log("Inside the background.js")

    const currentTab = chrome.tabs.query({currentWindow: true, active: true}, function(){});
    console.log(currentTab);

    const note = request.note;
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log(tabs)
      console.log("Note in background: ", note)
      // need to send note here
      chrome.tabs.sendMessage(tabs[0].id, {action: "start", note: note, selected: request.selected});  
      console.log("Start sent");
    });
  }
});


