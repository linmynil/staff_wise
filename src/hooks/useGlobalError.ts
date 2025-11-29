import events, { eventKeys } from '@utils/helpers/events';
import { useEffect, useState } from 'react';
import '@utils/helpers/handleGlobalError';

const useGlobalError = () => {
  const [error, setError] = useState('');

  const errorHandler = (e: string) => {
    setError(e);
  };

  useEffect(() => {
    events.on(eventKeys.setError, errorHandler);
    return () => {
      events.off(eventKeys.setError);
    };
  }, []);

  return error;
};

export default useGlobalError;
