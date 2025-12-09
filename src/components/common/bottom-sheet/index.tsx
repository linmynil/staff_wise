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
  onChange?: (v: any) => void;
  closeCallback?: () => void;
};

const BottomSheetContext = createContext<{
  bottomSheetModalRef: any;
  onChangeRef: any;
  onUpdateStatusRef: any;
  closeCallbackRef: any;
  isOpen: boolean;
  setOpen: () => void;
  bottomSheetHeight: number;
  openBottomSheet: (payload: PresentPayload) => void;
  closeBottomSheet: () => void;
}>({} as any);

export const useBottomSheetContext = () => useContext(BottomSheetContext);

const DEFAULT_HEIGHTS = [height * 0.6, height * 0.9];

const BottomSheetProvider = ({ children }: { children: any }) => {
  const snapPoints = DEFAULT_HEIGHTS;
  const openIndex = 0;

  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const onChangeRef = useRef<any>(null);
  const onUpdateStatusRef = useRef<any>(null);
  const closeCallbackRef = useRef<any>(null);

  const [sheetContent, setSheetContent] = useState<React.ReactNode>(null);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

  const isOpenKeyboard = useKeyboardStatus();
  const isOpen = bottomSheetHeight > 0;

  const setOpen = () => {
    bottomSheetModalRef.current?.present();
    setBottomSheetHeight(snapPoints[openIndex]);
  };

  const openBottomSheet = (payload: PresentPayload) => {
    if (payload?.content) setSheetContent(payload.content);
    if (payload?.onChange) onChangeRef.current = payload.onChange;
    if (payload?.closeCallback)
      closeCallbackRef.current = payload.closeCallback;

    requestAnimationFrame(() => {
      bottomSheetModalRef.current?.present();
      setBottomSheetHeight(snapPoints[openIndex]);
    });
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    closeCallbackRef.current?.();
    setBottomSheetHeight(0);
  };

  const handleSheetChanges = (i: number) => {
    if (i === -1) {
      closeBottomSheet();
      return;
    }
    setBottomSheetHeight(snapPoints[i]);
  };

  useEffect(() => {
    if (isOpen && isOpenKeyboard) {
      bottomSheetModalRef.current?.snapToIndex(1);
    }
  }, [isOpenKeyboard, isOpen]);

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetModalRef,
        isOpen,
        onChangeRef,
        onUpdateStatusRef,
        closeCallbackRef,
        setOpen,
        bottomSheetHeight,
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      <BottomSheetModalProvider>
        {children}

        <View
          pointerEvents={isOpen ? 'auto' : 'none'}
          style={styles.bottomSheetWrapper}
        >
          {isOpen && (
            <Pressable style={styles.blur} onPress={closeBottomSheet} />
          )}

          <BottomSheetModal
            ref={bottomSheetModalRef}
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
              {sheetContent}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;

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
