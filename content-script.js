
// Create a new heading element
const txt = document.createElement('p');
txt.textContent = 'Yo this is a test message to';

const styleElement = document.createElement('style');
styleElement.textContent = `
    /* Your CSS styles go here */
    .root-class {
      justify-content: center;
      display: flex;
      width: -webkit-fill-available;
      max-width: 700px;
      text-align: center;
      background-color: aliceblue;
      border-radius: 10px;
      padding: 10px;
      position: fixed;
      top: 10%;
      left: 50%;
      z-index: 9999;
      opacity: 0.7;
      transform: translate(-50%,0%);
      pointer-events: none;
  }
  .txt{
    color: black !important;
    opacity: 1 !important;
    font-size: 22px;
  }
  .invisible{
    display: none !important;
  }
  
`;

const hostEle = document.createElement('div');
hostEle.className = 'STT-shadow';
    
document.body.appendChild(hostEle);

//Using Shadow Root
var host = document.querySelector('.STT-shadow');
var root = host.attachShadow({mode: 'open'}); // Create a Shadow Root
var div = document.createElement('div');
div.className = 'div root-class';
setInvis();
txt.className = 'txt';


div.appendChild(styleElement);
div.appendChild(txt);
root.appendChild(div);

let delayTimeout;

function retriggerDelay(delay) {
  clearTimeout(delayTimeout);
  div.classList.remove("invisible");
  delayTimeout = setTimeout(function() {
    setInvis();
    addInput(txt.textContent);
  }, delay);
 
}
function setInvis(){
  div.classList.add("invisible");
}

function addInput(transcript){
  var currentElement = document.activeElement;
  
  if (currentElement.tagName === 'INPUT' || currentElement.tagName === 'TEXTAREA') {
  if (currentElement.value.length > 0) {
    currentElement.value += ' ';
  }
  currentElement.value += transcript;
  } else if (currentElement.tagName === 'IFRAME') {
    const iframeDocument = currentElement.contentDocument || currentElement.contentWindow.document;
    iframeDocument.body.textContent += transcript;
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    
    txt.textContent = request.transcript;
    retriggerDelay(2000);
    
    sendResponse({farewell: "goodbye"});
    
  }
);
