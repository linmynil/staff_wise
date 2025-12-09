import View from '../../core/view';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { height } from '@utils/helpers/dimension';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import colors from '@utils/constants/colors';
import { useKeyboardStatus } from '@hooks';

type PresentPayload = {
  content: React.ReactNode;
  onChange?: (item: any, action: 'add' | 'remove') => void;
  closeCallback?: () => void;
};

const BottomSheetContext3 = createContext<{
  bottomSheetModalRef3: any;
  onChangeRef3: any;
  onUpdateStatusRef3: any;
  closeCallbackRef3: any;
  isOpen3: boolean;
  setOpen3: () => void;
  bottomSheetHeight3: number;
  openBottomSheet3: (payload: PresentPayload) => void;
  closeBottomSheet3: () => void;
}>({} as any);

export const useBottomSheetContext3 = () => useContext(BottomSheetContext3);

const DEFAULT_HEIGHTS = [height * 0.65, height * 0.9];

const BottomSheetProvider3 = ({ children }: { children: any }) => {
  const snapPoints = DEFAULT_HEIGHTS;
  const openIndex = 0;

  const bottomSheetModalRef3 = useRef<BottomSheetModal | null>(null);
  const onChangeRef3 = useRef<any>(null);
  const onUpdateStatusRef3 = useRef<any>(null);
  const closeCallbackRef3 = useRef<any>(null);

  const [sheetContent3, setSheetContent3] = useState<React.ReactNode>(null);
  const [bottomSheetHeight3, setBottomSheetHeight3] = useState(0);

  const isOpenKeyboard = useKeyboardStatus();
  const isOpen3 = bottomSheetHeight3 > 0;

  const setOpen3 = () => {
    bottomSheetModalRef3.current?.present();
    setBottomSheetHeight3(snapPoints[openIndex]);
  };

  const openBottomSheet3 = (payload: PresentPayload) => {
    if (payload?.content) setSheetContent3(payload.content);
    if (payload?.onChange) onChangeRef3.current = payload.onChange;
    if (payload?.closeCallback)
      closeCallbackRef3.current = payload.closeCallback;

    requestAnimationFrame(() => {
      bottomSheetModalRef3.current?.present();
      setBottomSheetHeight3(snapPoints[openIndex]);
    });
  };

  const closeBottomSheet3 = () => {
    bottomSheetModalRef3.current?.dismiss();
    closeCallbackRef3.current?.();
    setBottomSheetHeight3(0);
  };

  const handleSheetChanges = (i: number) => {
    if (i === -1) {
      closeBottomSheet3();
      return;
    }
    setBottomSheetHeight3(snapPoints[i]);
  };

  useEffect(() => {
    if (isOpen3 && isOpenKeyboard) {
      bottomSheetModalRef3.current?.snapToIndex(1);
    }
  }, [isOpenKeyboard, isOpen3]);

  return (
    <BottomSheetContext3.Provider
      value={{
        bottomSheetModalRef3,
        isOpen3,
        onChangeRef3,
        onUpdateStatusRef3,
        closeCallbackRef3,
        setOpen3,
        bottomSheetHeight3,
        openBottomSheet3,
        closeBottomSheet3,
      }}
    >
      <BottomSheetModalProvider>
        {children}

        <View
          pointerEvents={isOpen3 ? 'auto' : 'none'}
          style={styles.bottomSheetWrapper}
        >
          {isOpen3 && (
            <Pressable style={styles.blur} onPress={closeBottomSheet3} />
          )}

          <BottomSheetModal
            ref={bottomSheetModalRef3}
            index={openIndex}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableContentPanningGesture={false}
            handleStyle={{
              backgroundColor: colors.neutral.c100,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
              {sheetContent3}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </BottomSheetContext3.Provider>
  );
};

export default BottomSheetProvider3;

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: colors.neutral.c100,
  },
  blur: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
