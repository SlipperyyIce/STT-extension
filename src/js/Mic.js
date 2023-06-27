
window.onload = () => {

  let isRecording = false;
  let recordedChunks = [];
  let mediaRecorder;

  chrome.runtime.sendMessage(chrome.runtime.id,{})

  

  //Opens settings page to get mic access if not allowed
  navigator.permissions.query({ name: 'microphone' })
    .then(function(permissionStatus) {
      if (permissionStatus.state === 'granted') {
        
      } else {
        setting = "chrome-extension://" + chrome.runtime.id + "/src/settings.html"
        chrome.tabs.create({ url: setting });
      }
  });
 


  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    
    mediaRecorder.addEventListener("dataavailable", (event) => {
      recordedChunks.push(event.data);
      
    });
  }

  const stopRecording = async () => {
    mediaRecorder.stop();
    
    let chunk = recordedChunks;
    setTimeout(() => {
      save(chunk)}, 1000);
  } 

  async function save(recordedChunks) {
    let downloadLink = document.createElement("a");
    
    
    downloadLink.href = URL.createObjectURL(recordedChunks[0]);
    downloadLink.download = "recorded_audio.wav";
    downloadLink.click();
    
  } 
    
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
      
      
    } else {
      startRecording();
    }

    isRecording = !isRecording; 
    
    microphoneImage.src = isRecording ? "js/images/microphone-hover.png" : "js/images/microphone.png"; 
    
  };
  
  const microphoneImage = document.getElementById("microphone-image");
  const $startButton = document.querySelector('.start');
  $startButton.addEventListener("click", toggleRecording);

  $startButton.addEventListener('mouseenter', function() {
    microphoneImage.src ="js/images/microphone-hover.png";
  });
  
  $startButton.addEventListener('mouseleave', function() {
    microphoneImage.src = isRecording ? "js/images/microphone-hover.png" : "js/images/microphone.png"; 
  });
}