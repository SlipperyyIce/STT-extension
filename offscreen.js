

chrome.runtime.onMessage.addListener(handleMessages);

// This function performs basic filtering and error checking on messages before
// dispatching the
// message to a more specific message handler.
async function handleMessages(message) {
  // Return early if this message isn't meant for the offscreen document.
  if (message.target !== 'offscreen-doc') {
    return;
  }

  // Dispatch the message to an appropriate handler.
  switch (message.type) {
    case 'copy-data-to-clipboard':
      toggleRecording(message.data);
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
  }
}

// We use a <textarea> element for two main reasons:
//  1. preserve the formatting of multiline text,
//  2. select the node's content using this element's `.select()` method.
const textEl = document.querySelector('#text');

let mediaRecorder;
let isRecording = false;
let recordedChunks = [];

async function stopRecording(data) {
  
  mediaRecorder.stop();
    
  let chunk = recordedChunks;
  setTimeout(() => {
    save(chunk)}, 1000);
   
}

async function startRecording(data) {
  try {
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    
    mediaRecorder.addEventListener("dataavailable", (event) => {
      recordedChunks.push(event.data);
      
    });

    // `document.execCommand('copy')` works against the user's selection in a web
    // page. As such, we must insert the string we want to copy to the web page
    // and to select that content in the page before calling `execCommand()`.
    textEl.value = data;
    textEl.select();
    document.execCommand('copy');
  } finally {
   
  }
  
}

async function toggleRecording(data){
  if (isRecording) {
    stopRecording("stp");        
  } else {
    startRecording("go");
  }

  isRecording = !isRecording; 
  
}

async function save(recordedChunks) {
  let downloadLink = document.createElement("a");
  
  downloadLink.href = URL.createObjectURL(recordedChunks[0]);
  downloadLink.download = "recorded_audio.wav";
  downloadLink.click();
  // Job's done! Close the offscreen document.
  window.close();
  
} 
