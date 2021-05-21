// ==UserScript==
// @name         WhatsApp Web Spammer
// @namespace    graphen
// @version      1.0.0
// @description  Adds a button to repeatedly send the same message in a certain interval.
// @author       Richaansh™#𝙍𝙚𝙐𝙉𝙞𝙏𝙚𝘿🇮🇳
// @match        https://web.whatsapp.com/*
// @icon         https://i.imgur.com/S8HNXsB.png
// @grant        none
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
  'use strict';

// auxiliary function for element insertion into dom tree
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let repeatingSpamFunction = null;
let message = '';

document.addEventListener("click", createSpamButton);
document.addEventListener("keyup", editSpamButton);

function getInput() {
    var input = document.querySelector('._2A8P4 ._2_1wd');
    if (!input) {
        //console.log("WA Spam: 'input' not found.");
        return false;
    }
    else {
        return input;
    }
}

function getSpamButton() {
    let spamButton = document.getElementById('spamButton');
    if (spamButton) {
        return spamButton;
    }
    else {
        //console.log("#spamButton not found.");
        return false;
    }
}

function createSpamButton() {
  if (getSpamButton()) {
    //console.log("WA Spam: #spamButton already present.");
    return;
  }
  let composeBar = document.querySelector('._2A8P4');
  if (!composeBar) {
    //console.log("WA Spam: composeBar not found.");
    return;
  }

  let spamButton = document.createElement('button');
  spamButton.setAttribute("id", "spamButton");
  spamButton.innerHTML = 'SPAM';
  spamButton.style.fontSize = '100%';
  spamButton.style.padding = '10px 0';
  spamButton.style.margin = '0px 3px 5px 3px';
  //insertAfter(spamButton, composeBar.lastChild.previousSibling);
  insertAfter(spamButton, composeBar);

  editSpamButton();
}

function editSpamButton() {
  let spamButton = getSpamButton();
  let input = getInput();

  if (input.innerText.trim() === '' && message === '') {
    spamButton.style.cursor = 'not-allowed';
    spamButton.style.color = '#1f2428';
    spamButton.onclick = void(0);
  } else {
    spamButton.style.cursor = 'pointer';
    spamButton.style.color = '#039be5';
    spamButton.onclick = function() {
      doSpam(this);
    };
  }
}

function doSpam(spamButton) {
  let input = getInput();
  if (spamButton.innerHTML === 'SPAM') {
    if (input.innerText === '') {
      window.alert('Please enter a text to be spammed before using the spam button.');
      return;
    }
    let interval = 1000 * parseInt(prompt('Please enter spam-interval in seconds:', 'Richaansh™#𝙍𝙚𝙐𝙉𝙞𝙏𝙚𝘿🇮🇳'));
    if (!interval) {
      spamButton.innerHTML = 'SPAM';
      //console.log('WA Spam: Interval input cancelled.');
      return;
    }
    message = input.innerHTML;
    spamButton.innerHTML = 'STOP';
    sendMessage(); // start immediately
      //console.log("started spamming");
    repeatingSpamFunction = window.setInterval(function(){
      //console.log("started repeated spamming");
      sendMessage();
    }, interval);
  } else {
    window.clearInterval(repeatingSpamFunction);
    message= '';
    spamButton.innerHTML = 'SPAM';
  }
  editSpamButton();
}

function sendMessage() {
  let input = getInput();
  let evt = new Event('input', {
    bubbles: true
  });
  input.innerHTML = message;
  input.dispatchEvent(evt);

  document.getElementsByClassName('_1E0Oz')[0].click(); // click send button
}
})();
