chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const observer = new MutationObserver((mutationsList) => {
        let oneTime = false;
        for(const mutation of mutationsList){
            // detects the presence of both types of modals - "add note" and "how you know the person"
            if (oneTime == false && mutation.target.getAttribute('data-test-modal')===''){
                console.log("About to click Send button");
                // Send for further processing after modal detected
                clickSendButton();
                oneTime = true;
                observer.disconnect();
            }
        }
    });

    function addNoteModal(){
        // this is only to display the name
        // const name = document.querySelector('span.flex-1');
        // const name2 = name.querySelector('strong').textContent;
        // console.log("Name: ", name2);

        const sendButton = document.querySelector('.artdeco-modal__actionbar .artdeco-button--primary');

        if (sendButton) {
            sendButton.click();
        }
    }

    function clickSendButton() {
        const addANote = document.querySelector('button[aria-label="Add a note"]');

        // required for logic to detect which type of modal pops-up on clicking the 'Connect' button
        const workColeagues = document.querySelector('button[aria-label="Work Colleagues"]');
        
        if(workColeagues){
            // To add UI drop-down selection option here.
            const workEvent = document.querySelector('button[aria-label="Met at a work-related event"]');

            const howYouKnow = document.querySelector('button[aria-label="Connect"]');

            let firstClick = false;

            function firstClickHandler(){
                workColeagues.click();
                console.log("clicked work Coleague");
                firstClick = true;
            }

            function secondClickHandler(){
                if(firstClick){
                    setTimeout(()=>{
                        howYouKnow.click();
                        console.log("Clicked send connection");
                    }, 1000);
                }
                else{
                    console.log("Reached else, some issue");
                }
            }

            firstClickHandler();
            secondClickHandler();
        }

        // The add note section is visible always on clicking 'Connect', might not show for everyone Abhishek
        addNoteModal();

    }

    if(message.type == 'start'){
        console.log("start")
        const connectButtons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
        let observerCreated = false;
        let timeDelay = 5000;

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

// To do
// Better function names.
// Add a UI logic and connect to backend
// Write a blog
