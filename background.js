chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // if(changeInfo.status == 'complete' && tab.url && tab.url.includes("linkedin.com/search/results/people/")){
  //   // chrome.scripting.executeScript(tabId, {file: 'content.js'});
  //   chrome.scripting.executeScript({
  //     target: {tabId: tabId},
  //     files: ['contentScript.js']
  //   }, ()=>{
  //     console.log('Script Executed');
  //   });
  // }
  chrome.tabs.sendMessage(tabId, {type: 'start'});
})

  