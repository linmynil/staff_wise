import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardStatus = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isOpen;
};
