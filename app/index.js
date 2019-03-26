/*
  Modules
*/
import { HeartRateSensor } from 'heart-rate';
import { peerSocket } from 'messaging';
import { vibration } from 'haptics';
import document from 'document';
import { config } from '../config';
const SECONDS = 1000;

/*
  Setup
*/
const hrm = new HeartRateSensor();
hrm.start();

/*
  UI
*/
const body = document.getElementById('body');
const logo = document.getElementById('logo');
const title = document.getElementById('title');
const hrmLabel = document.getElementById('hrm-label');
const hrmText = document.getElementById('hrm-data');
const alert = document.getElementById('alert');
const alertButtons = document.getElementById('alert-buttons');
const yesButton = document.getElementById('btn-y');
const noButton = document.getElementById('btn-n');

/*
  Globals
*/
let alertNo = 0;
let alertStop = 0;
let alertStay = 0;

/*
  Main
*/
function main() {
  const heartRate = hrm.heartRate ? hrm.heartRate : 0;

  hrmText.text = JSON.stringify(heartRate);

  if (peerSocket.readyState === peerSocket.OPEN) {
    // Send the data to peer as a message.
    peerSocket.send(heartRate);
  }

  if (heartRate > config.alert_threshold) {
    if (alertStay > 0) {
      alertStay -= 1 * SECONDS;
      if (alertStay <= 0) {
        alertNo = 0;
        alertStop = 30 * SECONDS;
        showInitial();
      } else {
        showAlert();
      }
    } else if (alertStop === 0) {
      showAlert();
    } else {
      alertNo = 0;
      alertStop -= 1 * SECONDS;
    }
  } else {
    alertNo = 0;
    showInitial();
  }
}

function showInitial() {
  setHeader('visible');
  moveHrm(192);
  setAlert('hidden');
  body.style.fill = 'lightskyblue';
  vibration.stop();
}

function showAlert() {
  setHeader('hidden');
  moveHrm(48);
  switch(alertNo) {
    case 0:
      alert.text = 'Your heart rate has dramatically increased. Are you okay?';
      break;
    case 1:
      alert.text = 'Would you like to reach one of your contacts?';
      break;
    case 2:
      alert.text = 'Message sent!';
      break;
  }
  if (alertNo !== 2) {
    setAlert('visible');
  }
  body.style.fill = alertNo === 2 ? 'yellowgreen' : 'tomato';
  vibration.start('alert');
}

function setHeader(visibility) {
  logo.style.visibility = visibility;
  title.style.visibility = visibility;
}

function setAlert(visibility) {
  alert.style.visibility = visibility;
  alertButtons.style.visibility = visibility;
}

function moveHrm(posY) {
  hrmLabel.y = posY;
  hrmText.y = posY + 24;
}

function disableAlert() {
  alertStop = 10 * SECONDS;
  showInitial();
}

function sendText() {
  if (peerSocket.readyState === peerSocket.OPEN) {
    // Send the data to peer as a message.
    peerSocket.send('tx');
  }
  alertNo = 2;
  alertButtons.style.visibility = 'hidden';
  alertStay = 5 * SECONDS;
}

yesButton.onclick = event => {
  if (alertNo === 0) {
    disableAlert();
  } else if (alertNo === 1) {
    sendText();
  }
};

noButton.onclick = event => {
  if (alertNo === 0) {
    alertNo = 1;
  } else if (alertNo === 1) {
    alertNo = 0;
    disableAlert();
  }
};

main();
setInterval(main, 1 * SECONDS);
