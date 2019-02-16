/*
  Modules
*/
import { peerSocket } from 'messaging';
import { settingsStorage } from 'settings';

/*
  Messaging
*/
let userId = JSON.parse(settingsStorage.getItem('email')).name;

peerSocket.onmessage = event => {
  console.log(event.data);
  console.log(userId);
};

/*
  Settings Change
*/
settingsStorage.onchange = event => {
  if (event.key === 'email') {
    userId = JSON.parse(event.newValue).name;
  }
}
