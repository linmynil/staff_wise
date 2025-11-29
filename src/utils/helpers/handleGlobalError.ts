import events, { eventKeys } from './events';

// const defaultErrorHandler = ErrorUtils.getGlobalHandler();
const customErrorHandler = (error: Error, isFatal?: boolean | undefined) => {
  console.log('ERRRRRR', error, isFatal);
  if (isFatal) {
    events.emit(eventKeys.setError, error?.toString());
  }
  // Call the default handler afterwards
  // defaultErrorHandler(error, isFatal);
};

ErrorUtils.setGlobalHandler(customErrorHandler);

export default this;
