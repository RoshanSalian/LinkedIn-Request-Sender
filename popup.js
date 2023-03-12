// adding a new bookmark row to the popup
const startButton = document.getElementById('start-button');

startButton.addEventListener("click", ()=>{
    console.log("Popup clicked");
    chrome.runtime.sendMessage({message: "startFromPopup"});
})

console.log("Before")
