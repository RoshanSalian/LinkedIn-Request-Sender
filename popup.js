// adding a new bookmark row to the popup
const startButton = document.getElementById('start-button');
const textArea = document.getElementById('send_note');
const selectElement = document.getElementById("howKnowSelect");

startButton.addEventListener("click", ()=>{
    console.log("Popup clicked");
    const note = textArea.value;
    const selectedValue = selectElement.value;

    console.log("from popup.js:" , note)
    chrome.runtime.sendMessage({message: "startFromPopup", note: note, selected: selectedValue});
});
