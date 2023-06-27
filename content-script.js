var greeting = "hosla, ";
var button = document.getElementById("start");

//document.body.style.backgroundColor = "orange";
//alert(greeting + ".");

console.log("mem");

// contentScript.js
var button = document.createElement("button");
button.textContent = "Create A";

// Function to create an 'A' element
function createA() {
  //const stream = navigator.mediaDevices.getUserMedia({ audio: true });
  //console.log(stream);
  console.log("Yo")
  chrome.runtime.sendMessage(chrome.runtime.id,{})
}

// Add click event listener to the button
button.addEventListener("click", createA);


// Create a new div element
const div = document.createElement('div');

// Create a new heading element
const heading = document.createElement('h1');
heading.textContent = 'Hello from Chrome Extension!';

// Append the heading to the div
div.appendChild(heading);


div.appendChild(button);

// Apply some CSS styles to the div
div.style.backgroundColor = 'lightgray';
div.style.padding = '10px';
div.style.position = 'fixed';
div.style.top = '10%';
div.style.left = '50%';
div.style.zIndex = '9999';
div.style.opacity = 0.5;
div.style.transform = 'translate(-50%, 0%)';
div.style.pointerEvents = 'none';

// Append the div to the body of the current tab
document.body.appendChild(div);




let isRecording = false;
  let recordedChunks = [];
  let mediaRecorder;

  
const startRecording = async () => {


  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  
  mediaRecorder.addEventListener("dataavailable", (event) => {
    recordedChunks.push(event.data);
    
  });
}

