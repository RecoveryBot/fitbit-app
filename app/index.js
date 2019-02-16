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
const hrmText = document.getElementById('hrm-data');

/*
  Main
*/
function main() {
  body.style.fill = "black";
  vibration.stop();

  const heartRate = hrm.heartRate ? hrm.heartRate : 0;

  hrmText.text = JSON.stringify(heartRate);

  if (peerSocket.readyState === peerSocket.OPEN) {
    // Send the data to peer as a message.
    peerSocket.send(heartRate);
  }

  if (heartRate > ALERT_THRESHOLD) {
    body.style.fill = "red";
    vibration.start('alert');
  }
}

main();
setInterval(main, 1000);
