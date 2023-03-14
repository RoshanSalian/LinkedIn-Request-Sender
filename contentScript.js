chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script loaded successfully.");
    console.log("Message: ", message)
    console.log("default note: ", message.note);
    console.log("selected: ", message.selected);
    let note = message.note;
    let selected = message.selected;

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
        const divTag = document.querySelector('span.flex-1');
        let name = divTag.querySelector('strong').textContent;
        console.log("Name: ", name)

        // works perfectly
        updatedNote = note.replace(/\${name}/g, name);
        console.log(updatedNote);

        //reference to the 'Add a note' button
        const button = document.querySelector('button[aria-label="Add a note"]');

        if(updatedNote){
            // to write logic for the second modal
        }

        const sendButton = document.querySelector('.artdeco-modal__actionbar .artdeco-button--primary');

        if (sendButton) {
            // commenting for testing
            sendButton.click();
        }
    }

    function clickSendButton() {
        const addANote = document.querySelector('button[aria-label="Add a note"]');

        // required for logic to detect which type of modal pops-up on clicking the 'Connect' button
        const workColeagues = document.querySelector('button[aria-label="Work Colleagues"]');
        const classMate = document.querySelector('button[aria-label="Classmates"]')
        const workRelatedEvent = document.querySelector('button[aria-label="Met at a work-related event"]')

        const howYouKnow = document.querySelector('button[aria-label="Connect"]');

        let firstClick = false;

        // this is to check if the second type modal is loaded
        // need to search a better way to do it
        if(workColeagues){
            function firstClickHandler(){
                // workColeagues.click();
                if(selected == "workColleague"){
                    workColeagues.click();
                }else if(selected == "classmaste"){
                    classMate.click();
                }else{
                    workRelatedEvent.click();
                }
                console.log("clicked: ", selected);
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

    if(message.action == 'start'){
        console.log("start")
        const connectButtons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
        let observerCreated = false;
        let timeDelay = 6000;

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

        console.log("Reached end of line control");
    }
})

// To do

// Make the UI logic work.
// Add a spinner when the code is running and should disappear on reaching end
// Write a blog
