window.onload = () => {
  
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    // Get the audio track from the stream
    const audioTrack = stream.getAudioTracks()[0];

    // Stop the audio track
    audioTrack.stop();

    
  });
}