

window.onload = () => {
  //
  function sendTranscript(transcript) {
    if (transcript !== "") {
      chrome.runtime.sendMessage(chrome.runtime.id, { type: "transcribe", transcript: transcript });
    }
  }

  function startRecognition(){
    if ('webkitSpeechRecognition' in window) {
      // Create a new SpeechRecognition object
      
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      
      const recognition = new SpeechRecognition();
      
      // Set the parameters
      recognition.lang = "en-US";
      recognition.continuous = true; // Keep listening for speech until stopped
      recognition.interimResults = true; // Get interim results as the user speaks
      
      // Event handler for when speech is recognized
      
      recognition.onresult = function(event) {
        try{        
          if (event.results[0].isFinal) {
            var transcript = event.results[event.results.length-1][0].transcript;
            //console.log("END:"+ event.results[event.results.length-1][0].transcript);
            recognition.stop();
            sendTranscript(transcript);
            startRecognition();}
          else {
            var transcript = event.results[event.results.length - 2][0].transcript;
            console.log(transcript);
            sendTranscript(transcript);
            
            
          }
        } catch{}

      };

      // Event handler for errors
      recognition.onerror = function(event) {
        
        switch (event.error) {
          case 'no-speech':
            startRecognition();
            break;

          case 'aborted':
            window.close();
            break;

          default:
            console.error(event.error);
            break;
        }              
      };

      // Start speech recognition
      recognition.start();
      
    } else {
      console.error('Speech recognition is not supported in this browser.');
    }
  }
  startRecognition();
  
}
