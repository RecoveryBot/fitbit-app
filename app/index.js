/*
  Settings
*/
const ALERT_THRESHOLD = 85;

/*
  Modules
*/
import { HeartRateSensor } from 'heart-rate';
import { peerSocket } from 'messaging';
import { vibration } from 'haptics';
import document from 'document';

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

  if (heartRate > ALERT_THRESHOLD) {
    showAlert1();
  } else {
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

function showAlert1() {
  setHeader('hidden');
  moveHrm(48);
  alert.text = 'Your heart rate has dramatically increased. Are you okay?';
  setAlert('visible');
  body.style.fill = 'tomato';
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

main();
setInterval(main, 1000);
