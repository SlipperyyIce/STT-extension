
window.onload = () => {


  

  //Opens settings page to get mic access if not allowed
  navigator.permissions.query({ name: 'microphone' })
    .then(function(permissionStatus) {
      if (permissionStatus.state === 'granted') {
        chrome.runtime.sendMessage(chrome.runtime.id,{ type:"toggle"})
        window.close();
        
        
      } else {
        setting = "chrome-extension://" + chrome.runtime.id + "/src/settings.html"
        chrome.tabs.create({ url: setting });
        
 
      }
  });

  
}