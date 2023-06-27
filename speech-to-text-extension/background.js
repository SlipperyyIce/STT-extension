let isRecording = false;
let recordedChunks = [];
let mediaRecorder;





function toggleRecording() {

  isRecording = !isRecording;
  
  let invertedValue = isRecording;
  
  
  if(invertedValue){
    chrome.action.setIcon({ path: { "16": "/src/js/images/microphone-hover.png" }});
    
    //startRecording();
    
  }
  else{
    chrome.action.setIcon({ path: { "16": "/src/js/images/microphone.png" }}); 
    //stopRecording()
  }
}


chrome.runtime.onMessage.addListener(
  (request, message, sendResponse) => {
    // Issue Token
    console.log("MESSAGE RECIVED");
    toggleRecording();
    return
  }
);

