window.onload = () => {
  const $startButton = document.querySelector('.settingsLink');

  $startButton.onclick = () => {
    // Get active tab
    chrome.tabs.create({ url: 'chrome-extension://settings.html' });
  };
}