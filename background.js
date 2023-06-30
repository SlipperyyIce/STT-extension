chrome.runtime.onMessage.addListener(async (request) => {
  // Issue Token
  try{
    switch (request.type) {
      case 'reload':
        loadPopup();
        break;
      case 'toggle':
        await addSpeechRecog();
        break;

      case 'transcribe':
        
        (async () => {
          try {   
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello", transcript: request.transcript});
            // do something with response here, not outside the function
            //console.log(response);
          } catch (error) {
              
          }
        })();

      default:
        //console.warn(`Unexpected message type received: '${message.type}'.`);
    }
  } catch{}
  return
});

var windowId = -1;
var canClose = false;
async function addSpeechRecog() {
  if (windowId !== -1) {
    canClose = true;
    chrome.windows.remove(windowId);
    chrome.action.setIcon({ path: { "16": "/src/js/images/microphone.png" }}); 
    
  }
  else{
    canClose = false;
    loadPopup();
  }
}

async function loadPopup()
{
  chrome.windows.create({
  type: 'popup',
  url: 'voice.html',
  width: 1,
  height: 1,
  left: 3000,
  top: 1000,
  focused: false
  },function(window) {
    windowId = window.id;
    
    chrome.windows.update(window.id, { state: 'minimized' });
    chrome.windows.onRemoved.addListener(function(closedWindowId) {
      if (closedWindowId === window.id) {
        windowId = -1;
        chrome.action.setIcon({ path: { "16": "/src/js/images/microphone.png" }});   
        if(!canClose)loadPopup(); 
             
      }
    });
  });
  chrome.action.setIcon({ path: { "16": "/src/js/images/microphone-hover.png" }});
}
