document.addEventListener('DOMContentLoaded', function () {



  const sendMessage = (action) => {
    // Check if browser is Edge
    if (typeof browser !== "undefined" && browser.runtime) {
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { action });
      });
    }
    // Check if browser is Firefox
    else if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action });
      });
    }
    // Check if browser is Brave
    else if (typeof chrome !== "undefined" && chrome.br.runtime) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action });
      });
    }
    // Assume Chrome if not Edge, Firefox, or Brave
    else {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action });
      });
    }
  };


    // Function to send a message to content script
   
    // Function to update the speed display
    const updateSpeedDisplay = (speed) => {
      document.getElementById('speedDisplay').innerText = `Current Speed: ${speed}x`;
    };
  
    // Speed up button click event
    document.getElementById('speedUp').addEventListener('click', function () {
      sendMessage('speedUp');
    });
  
    // Speed down button click event
    document.getElementById('speedDown').addEventListener('click', function () {
      sendMessage('speedDown');
    });
  
    // Get current speed button click event
    document.getElementById('getCurrentSpeed').addEventListener('click', function () {
      sendMessage('getCurrentSpeed');
    });
  
    // Listen for speed changes from content script
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === 'updateSpeedDisplay') {
        updateSpeedDisplay(request.speed);
      }
    });
  });
  
