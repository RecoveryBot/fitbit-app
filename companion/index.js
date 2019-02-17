/*
  Modules
*/
import { me } from 'companion';
import { peerSocket } from 'messaging';
import { settingsStorage } from 'settings';

// Wake up Companion every 5 minute.
me.wakeInterval = 300000;

/*
  Messaging
*/
let userId = JSON.parse(settingsStorage.getItem('email')).name;

peerSocket.onmessage = event => {
  const heartRate = event.data;
  console.log('Heart Rate: ' + heartRate);
  console.log('User ID: ' + userId);
  if (userId) {
    sendToServer(userId, heartRate);
  }
};

/*
  Settings
*/
settingsStorage.onchange = event => {
  if (event.key === 'email') {
    userId = JSON.parse(event.newValue).name;
  }
}

/*
  POST to Server
*/
const url = 'https://treehacks2019-server.azurewebsites.net';
const sendToServer = (userId, heartRate) => {
  return fetch(`${url}/bpm?userId=${userId}&heartRate=${heartRate}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit'
  })
  .then(res => {
    console.log('Sent to server.');
  })
  .catch(err => console.error(err));
};
