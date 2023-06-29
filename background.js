
const textToCopy = `Hello world!`;

// When the browser action is clicked, `addToClipboard()` will use an offscreen
// document to write the value of `textToCopy` to the system clipboard.
chrome.action.onClicked.addListener(async () => {
  await addToClipboard(textToCopy);
  await toggleRecording();

});

chrome.runtime.onMessage.addListener(async (request) => {
  // Issue Token
  
  try{
    switch (request.type) {
      case 'toggle':
        await addSpeechRecog(textToCopy);
        await toggleRecording();
        break;

      case 'transcribe':
        
        (async () => {
          try {   
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello", transcript: request.transcript});
            // do something with response here, not outside the function
            console.log(response);
          } catch (error) {
              
          }
        })();

      default:
        //console.warn(`Unexpected message type received: '${message.type}'.`);
    }
  } catch{}
  return
});

let create = true;
let www;
async function addSpeechRecog(value) {
  chrome.windows.create({
    type: 'popup',
    url: 'voice.html',
    width: 1,
    height: 1,
    left: 3000,
    top: 1000,
    focused: false
  },function(window) {
    chrome.windows.update(window.id, { state: 'minimized' });
    www = window.id;   
  });
  
  create = !create;
  
}


let isRecording = false;
async function toggleRecording() {


  isRecording = !isRecording;
  let invertedValue = isRecording;
  
  if(invertedValue){
    chrome.action.setIcon({ path: { "16": "/src/js/images/microphone-hover.png" }});
  }
  else{
    chrome.action.setIcon({ path: { "16": "/src/js/images/microphone.png" }}); 
  }
  
}