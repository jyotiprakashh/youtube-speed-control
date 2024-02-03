chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'speedUp') {
      speedUp();
    } else if (request.action === 'speedDown') {
      speedDown();
    } else if (request.action === 'getCurrentSpeed') {
      getCurrentSpeed();
    }
  });
  
  function speedUp() {
    const video = document.querySelector('video');
    if (video) {
      const currentSpeed = video.playbackRate;
      video.playbackRate = Math.min(currentSpeed + 0.1, 10);
      updateSpeedDisplay(video.playbackRate);
    }
  }
  
  function speedDown() {
    const video = document.querySelector('video');
    if (video) {
      const currentSpeed = video.playbackRate;
      video.playbackRate = Math.max(currentSpeed - 0.1, 0.1);
      updateSpeedDisplay(video.playbackRate);
    }
  }
  
  function getCurrentSpeed() {
    const video = document.querySelector('video');
    if (video) {
      const currentSpeed = video.playbackRate;
      updateSpeedDisplay(currentSpeed);
    }
  }
  
  function updateSpeedDisplay(speed) {
    chrome.runtime.sendMessage({ action: 'updateSpeedDisplay', speed });
  }
  