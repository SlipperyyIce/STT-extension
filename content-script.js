
// Create a new div element
const div = document.createElement('div');

// Create a new heading element
const txt2 = document.createElement('p');
txt2.textContent = '';

// Append the heading to the div
div.appendChild(txt2);

// Create a new heading element
const txt = document.createElement('p');
txt.textContent = 'Yo this is a test message to';

// Append the heading to the div
div.appendChild(txt2);

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
`;

txt.classList.add("text");
div.classList.add("container");


const hostEle = document.createElement('div');
hostEle.className = 'STT-shadow';
    
document.body.appendChild(hostEle);

//Using Shadow Root
var host = document.querySelector('.STT-shadow');
var root = host.attachShadow({mode: 'open'}); // Create a Shadow Root
var div2 = document.createElement('div');
div2.className = 'div root-class';
txt.className = 'txt';


div2.appendChild(styleElement);
div2.appendChild(txt);
root.appendChild(div2);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    console.log(request.transcript)
    txt.textContent = request.transcript;
    
    sendResponse({farewell: "goodbye"});
    
  }
);
