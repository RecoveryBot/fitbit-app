/*
  Modules
*/
import { HeartRateSensor } from 'heart-rate';
import document from 'document';

/*
  Setup
*/
const hrm = new HeartRateSensor();
hrm.start();

/*
  UI
*/
const hrmText = document.getElementById('hrm-data');

/*
  Main
*/
function main() {
  const heartRate = hrm.heartRate ? hrm.heartRate : 0;

  hrmText.text = JSON.stringify(heartRate);
}

main();
setInterval(main, 1000);
