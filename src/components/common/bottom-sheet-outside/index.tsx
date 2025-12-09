import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useKeyboardStatus } from '@hooks/useKeyboardStatus';
import { height } from '@utils/helpers/dimension';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import colors from '../../../utils/constants/colors';

type OpenPayload2 = {
  content: React.ReactNode;
  snapPoints?: number[];
  fixSnapPoints?: boolean;
};

const BottomSheetContext2 = createContext<{
  openBottomSheet2: (payload: OpenPayload2) => void;
  closeBottomSheet2: () => void;
  isOpen2: boolean;
}>({} as any);

export const useBottomSheetContext2 = () => useContext(BottomSheetContext2);

const DEFAULT_SNAP_POINTS = [height * 0.5, height * 0.9];

const BottomSheetProvider2 = ({ children }: { children: any }) => {
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  const [snapPoints, setSnapPoints] = useState<number[]>(DEFAULT_SNAP_POINTS);
  const [sheetContent2, setSheetContent2] = useState<React.ReactNode>(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const [enableDynamicSizing, setEnableDynamicSizing] = useState(true);

  const isOpenKeyboard = useKeyboardStatus();

  const openBottomSheet2 = (payload: OpenPayload2) => {
    if (payload.snapPoints) {
      setSnapPoints(payload.snapPoints);
    }

    if (payload.fixSnapPoints === true) {
      setEnableDynamicSizing(false);
    } else {
      setEnableDynamicSizing(true);
    }

    setSheetContent2(payload.content);

    requestAnimationFrame(() => {
      bottomSheetModalRef2.current?.present();
      setIsOpen2(true);
    });
  };

  const closeBottomSheet2 = () => {
    bottomSheetModalRef2.current?.dismiss();
  };

  const handleSheetChanges = (i: number) => {
    if (i === -1) {
      setIsOpen2(false);
    }
  };

  useEffect(() => {
    if (!isOpen2) return;

    if (isOpenKeyboard) {
      bottomSheetModalRef2.current?.snapToIndex(1);
    } else {
      bottomSheetModalRef2.current?.snapToIndex(0);
    }
  }, [isOpenKeyboard, isOpen2]);

  return (
    <BottomSheetContext2.Provider
      value={{
        openBottomSheet2,
        closeBottomSheet2,
        isOpen2,
      }}
    >
      <BottomSheetModalProvider>
        {children}

        {isOpen2 && (
          <Pressable style={styles.blur} onPress={closeBottomSheet2} />
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef2}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
          enableDynamicSizing={enableDynamicSizing}
          handleStyle={{
            backgroundColor: colors.neutral.c100,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            {sheetContent2}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </BottomSheetContext2.Provider>
  );
};

export default BottomSheetProvider2;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
