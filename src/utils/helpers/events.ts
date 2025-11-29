import { EventRegister } from 'react-native-event-listeners';

export enum eventKeys {
  resetToken = 'resetToken',
  setError = 'setError',
  checkAPIVersion = 'checkAPIVersion',
}

// declare again event emiter
const events = {
  emit: (eventName: eventKeys | string, ...args: any[]) => EventRegister.emit(eventName, ...args),
  on: (eventName: eventKeys | string, listener: (...args: any[]) => void) =>
    EventRegister.addEventListener(eventName, listener),
  off: (sub: any) => EventRegister.removeEventListener(sub),
  keys: eventKeys,
};

export default events;
