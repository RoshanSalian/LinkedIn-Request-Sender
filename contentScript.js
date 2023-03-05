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
        const name = document.querySelector('span.flex-1');
        const name2 = name.querySelector('strong').textContent;
        // print the Name
        console.log("Name: ", name2);
        if (sendButton) {
            sendButton.click();
            //clicks successfully but messesup when searchign the next 'Connect' button
        }
    }

    if(message.type == 'start'){
        console.log("start")
        const connectButtons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
        let observerCreated = false;
        let timeDelay = 5000;

        // runs on a infinite for loop in the ClickButton function()
        // There is a thrid type of pop-up that asks, where did u meet this person, code has no way to deal with that

        function clickButton(){
            connectButtons.forEach(button => {
                observerCreated = false;
                if(button.outerText.trim() == 'Connect'){
                    
                    button.click();
                    if(!observerCreated){
                        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
                        observerCreated = true;
                    }
                    setTimeout(clickButton, timeDelay);
                }
            });
        }
        clickButton();
    }
})


// setTimeout(() => {
//     //the statement
// }, 3000);
