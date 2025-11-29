import { View } from '@components';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import colors from '../../../utils/constants/colors';
import { useKeyboardStatus } from '@hooks/useKeyboardStatus';
import { height } from '@utils/helpers/dimension';

const BottomSheetContext2 = createContext<{
  onChangeRef2: { current: any };
  bottomSheetModalRef2: { current: BottomSheetModal | null };
  isOpen2: boolean;
  setOpen2: (v: any) => void;
  bottomSheetHeight2: number;
  setSnapPoints: (v: any) => void;
}>({
  bottomSheetModalRef2: {
    current: null,
  },
  onChangeRef2: {
    current: null,
  },
  isOpen2: false,
  setOpen2: () => {},
  bottomSheetHeight2: 0,
  setSnapPoints: () => {},
});

export const useBottomSheetContext2 = () => useContext(BottomSheetContext2);

const BottomSheetProvider2 = ({ children }: { children: any }) => {
  const heights = [height * 0.5, height * 0.9];
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const onChangeRef2 = useRef<any>(() => {});
  const [bottomSheetHeight2, setBottomSheetHeight2] = useState(0);
  const [snapPoints, setSnapPoints] = useState(heights);
  // const snapPoints = heights;
  const openIndex = 0;
  const isOpenKeyboard = useKeyboardStatus();

  const isOpen2 = bottomSheetHeight2 > 0;
  const setOpen2 = () => {
    setBottomSheetHeight2(heights[openIndex]);
  };

  const handleSheetChanges = (i: number) => {
    setBottomSheetHeight2(heights[i]);
  };

  useEffect(() => {
    if (isOpenKeyboard) {
      bottomSheetModalRef2.current?.snapToIndex(1);
      return;
    }
    bottomSheetModalRef2.current?.snapToIndex(0);
  }, [isOpenKeyboard]);

  return (
    <BottomSheetContext2.Provider
      value={{
        bottomSheetModalRef2,
        isOpen2,
        onChangeRef2,
        setOpen2,
        bottomSheetHeight2,
        setSnapPoints,
      }}
    >
      <BottomSheetModalProvider>
        {children}

        <View
          pointerEvents={isOpen2 ? 'auto' : 'none'}
          style={styles.bottomSheetWrapper}
        >
          {isOpen2 && (
            <>
              <Pressable
                style={styles.blur}
                onPress={() => {
                  bottomSheetModalRef2.current?.close();
                  setBottomSheetHeight2(0);
                }}
              >
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </Pressable>
            </>
          )}
          <BottomSheetModal
            enableContentPanningGesture={false}
            ref={bottomSheetModalRef2}
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
              onChangeRef2.current = data.onChange;
              return (
                <BottomSheetView style={styles.contentContainer}>
                  {data.content}
                </BottomSheetView>
              );
            }}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </BottomSheetContext2.Provider>
  );
};

export default BottomSheetProvider2;

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
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
