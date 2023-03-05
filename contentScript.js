// (() => {
    
//     buttons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
//     buttons.forEach(button => {
//         if(button.outerText.trim() == 'Connect'){
//             console.log(button.outerText)
//         }
//     });
// })();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const observer = new MutationObserver((mutationsList) => {
        let oneTime = false;
        for(const mutation of mutationsList){
            if (oneTime == false && mutation.target.getAttribute('data-test-modal')===''){
                console.log("About to click Send button");
                clickSendButton();
                oneTime = true;
                observer.disconnect();
            }
        }
    });

    function clickSendButton() {
        const sendButton = document.querySelector('.artdeco-modal__actionbar .artdeco-button--primary');
        if (sendButton) {
            sendButton.click();
        }
    }

    if(message.type == 'start'){
        console.log("start")
        const connectButtons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
        let observerCreated = false;
        connectButtons.forEach(button => {
            if(button.outerText.trim() == 'Follow'){
                console.log(button)
                console.log(button.outerText)
                console.log("Got in, fuck the warning")
                //works
                button.click();
                // if(!observerCreated){
                //     observer.observe(document.body, { attributes: true, childList: true, subtree: true });
                //     observerCreated = true;
                // }
            }
        });
    }
})
