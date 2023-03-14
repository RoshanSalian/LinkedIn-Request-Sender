chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script loaded successfully.");

    let note = message.note;
    let selected = message.selected;

    // Mutation observer to wathch for changes in the page, this is detect the appearace of modal after hitting the Connect button
    const observer = new MutationObserver((mutationsList) => {
        let oneTime = false;
        for(const mutation of mutationsList){
            // detects the presence of both types of modals - "add note" and "how you know the person"
            if (oneTime == false && mutation.target.getAttribute('data-test-modal')===''){
                // Send for further processing after modal detected
                clickSendButton();
                oneTime = true;
                observer.disconnect();
            }
        }
    });

    // To process the modal that gives two options 'Send note' or 'Send' buttons
    function addNoteModal(){
        
        //extract the name of the profile currently being processed
        const divTag = document.querySelector('span.flex-1');
        let name = divTag.querySelector('strong').textContent;

        // Add the profile name in salutaion to user-defined note in the extension
        updatedNote = note.replace(/\${name}/g, name);
        console.log(updatedNote);

        // reference to the 'Add a note' button
        const button = document.querySelector('button[aria-label="Add a note"]');

        if(updatedNote){
            // to write logic for the second modal
            // clicking 'Add note' opens a new modal, inside which the updatedNote is to be added and sent.
        }

        // Reference to the send button without the note. 
        const sendButton = document.querySelector('.artdeco-modal__actionbar .artdeco-button--primary');

        if (sendButton) {
            // commenting for testing
            sendButton.click();
        }
    }


    function clickSendButton() {

        // required for logic to detect which type of modal pops-up on clicking the 'Connect' button
        // Depending on users network, 2 different modals can show-up after clicking the 'Connect' button in the profile.
        const workColeagues = document.querySelector('button[aria-label="Work Colleagues"]');
        const classMate = document.querySelector('button[aria-label="Classmates"]')
        const workRelatedEvent = document.querySelector('button[aria-label="Met at a work-related event"]')

        const howYouKnow = document.querySelector('button[aria-label="Connect"]');

        let firstClick = false;

        // this is to check if the second type modal is loaded
        // need to search a better way to do it
        if(workColeagues){
            // To select the relation with the profile
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
            
            // to click the send button after the connection relation button is selected.
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

        
        // If the 'How you know this person?' modal does not show, process the other modal 
        addNoteModal();

    }

    // Listen for 'start' message sent from the background.js on 'Start' button click in the extension
    if(message.action == 'start'){
        console.log("start")
        // get reference to all the connect button in the page.
        const connectButtons = document.querySelectorAll('button.artdeco-button span.artdeco-button__text');
        let observerCreated = false;
        // delay between consequtive clicks
        let timeDelay = 6000;

        // Process each of the 'Connect' button visible in the page.
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

