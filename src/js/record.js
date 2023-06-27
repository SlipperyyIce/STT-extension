(function() {
  'use strict';

  self.addEventListener('message', function(event) {
    console.log("SECURE");
    let recordedChunks = [];
    let mediaRecorder;

    const constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.addEventListener("dataavailable", function(event) {
          recordedChunks.push(event.data);
        });
      })
      .catch(function(error) {
        console.error("Error accessing user media:", error);
      });
  });
})();