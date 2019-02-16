/*
  Modules
*/
import { peerSocket } from 'messaging';

/*
  Messaging
*/
peerSocket.onmessage = event => {
  console.log(event.data);
};
