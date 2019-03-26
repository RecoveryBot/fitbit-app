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
const storage = JSON.parse(settingsStorage.getItem('email'));
let userId = storage ? storage.name : '';

peerSocket.onmessage = event => {
  const data = event.data;
  if (data === 'tx') {
    console.log('Calling alert');
    if (userId) {
      sendToTwilio(userId);
    }
  } else {
    console.log('Heart Rate: ' + data);
    console.log('User ID: ' + userId);
    if (userId) {
      sendToServer(userId, data);
    }
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

const sendToTwilio = (userId) => {
  return fetch(`${url}/alert?userId=${userId}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit'
  })
  .then(res => {
    console.log('Sent to server.');
  })
  .catch(err => console.error(err));
};
