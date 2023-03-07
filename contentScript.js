chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const observer = new MutationObserver((mutationsList) => {
        let oneTime = false;
        for(const mutation of mutationsList){
            // data-test-modal is a div that covers the entire div in the 'Add a note'  div
            // need to add one more div with the 'where u know' modal, has the same data-test-modal
            if (oneTime == false && mutation.target.getAttribute('data-test-modal')===''){
                console.log("About to click Send button");
                clickSendButton();
                oneTime = true;
                observer.disconnect();
            }
        }
    });

    function addNoteModal(){
        console.log("In the note function, Regular");

        //this is only to display the name
        const name = document.querySelector('span.flex-1');
        const name2 = name.querySelector('strong').textContent;
        console.log("Name: ", name2);

        const sendButton = document.querySelector('.artdeco-modal__actionbar .artdeco-button--primary');

        if (sendButton) {
            sendButton.click();
        }
    }

    function clickSendButton() {
        const addANote = document.querySelector('button[aria-label="Add a note"]');

        

        //Collecting the tag for 'How u know?' modal
        // write logic to check in below button is null or not null and based on that make logic 
        const workColeagues = document.querySelector('button[aria-label="Work Colleagues"]');

        // if(addANote){
        //     addNoteModal();
        // }
        
        if(workColeagues){
            console.log("In the 'How u know' section, hard One");

            // add the same school button
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
            // Need to handle the Send note section again here. 
            // Work coleague selection is successful here
        }

        addNoteModal();

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
