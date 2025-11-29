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

const BottomSheetContext = createContext<{
  onChangeRef: { current: any };
  bottomSheetModalRef: { current: BottomSheetModal | null };
  isOpen: boolean;
  setOpen: (v: any) => void;
  bottomSheetHeight: number;
  onUpdateDataRef: { current: any };
  onUpdateStatusRef: { current: any };
  closeCallbackRef: { current: any };
}>({
  bottomSheetModalRef: {
    current: null,
  },
  onChangeRef: {
    current: null,
  },
  isOpen: false,
  setOpen: () => {},
  bottomSheetHeight: 0,
  onUpdateDataRef: { current: null },
  onUpdateStatusRef: { current: null },
  closeCallbackRef: { current: null },
});

export const useBottomSheetContext = () => useContext(BottomSheetContext);

const BottomSheetProvider = ({ children }: { children: any }) => {
  const heights = [height * 0.55, height * 0.9];
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const onChangeRef = useRef<any>(() => {});
  const onUpdateDataRef = useRef<any>(() => {});
  const onUpdateStatusRef = useRef<any>(() => {});
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const snapPoints = heights;
  const openIndex = 0;
  const isOpenKeyboard = useKeyboardStatus();
  const closeCallbackRef = useRef<any>(null);

  const isOpen = bottomSheetHeight > 0;
  const setOpen = () => {
    setBottomSheetHeight(heights[openIndex]);
  };

  const handleSheetChanges = (i: number) => {
    setBottomSheetHeight(heights[i]);
  };

  useEffect(() => {
    if (isOpenKeyboard) {
      bottomSheetModalRef.current?.snapToIndex(1);
    }
  }, [isOpenKeyboard]);

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetModalRef,
        isOpen,
        onChangeRef,
        onUpdateDataRef,
        onUpdateStatusRef,
        setOpen,
        bottomSheetHeight,
        closeCallbackRef,
      }}
    >
      <BottomSheetModalProvider>
        {children}

        <View
          pointerEvents={isOpen ? 'auto' : 'none'}
          style={styles.bottomSheetWrapper}
        >
          {isOpen && (
            <>
              <Pressable
                style={styles.blur}
                onPress={() => {
                  bottomSheetModalRef.current?.close();
                  setBottomSheetHeight(0);
                }}
              />
            </>
          )}
          <BottomSheetModal
            enableContentPanningGesture={false}
            ref={bottomSheetModalRef}
            index={openIndex}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleStyle={{
              backgroundColor: colors.neutral.c100,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            {({ data }: any) => {
              onChangeRef.current = data.onChange;
              if (data.closeCallback) {
                closeCallbackRef.current = data.closeCallback;
              }
              return (
                <BottomSheetView style={styles.contentContainer}>
                  {data.content}
                </BottomSheetView>
              );
            }}
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
  container: {
    width: '100%',
    maxHeight: 80,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral.c700,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    fontWeight: '400',
    color: colors.neutral.c900,
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.red.c600,
  },
  disabled: {
    opacity: 0.5,
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
