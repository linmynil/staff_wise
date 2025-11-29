import Text from '../../core/text';
import View from '../../core/view';
import React, { createContext, useContext, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import colors from '@utils/constants/colors';
import { width } from '@utils/helpers/dimension';

type ModalDataType = {
  title: string;
  content: any;
  button1?: any;
  button2?: any;
  row?: any;
};

const ModalContext = createContext<{
  isOpen: boolean;
  modalControl: ModalControl;
}>({
  isOpen: false,
  modalControl: {
    open: (_: ModalDataType) => {},
    close: () => {},
  },
});

type ModalControl = { open: (_: ModalDataType) => void; close: any } | null;

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: any) => {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<ModalDataType>({
    title: 'Modal',
    content: <Text>This is a modal</Text>,
  });

  const modalRef = useRef<ModalControl>({
    open: (_data: ModalDataType) => {
      setData(_data);
      setOpen(true);
    },
    close: () => setOpen(false),
  });

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalControl: modalRef.current,
      }}
    >
      {children}
      {isOpen && (
        <View style={styles.modalWrapper}>
          <Pressable
            style={styles.modalBlanket}
            onPress={() => {
              setOpen(false);
            }}
          />
          <View style={styles.container}>
            {data.title && (
              <Text
                weight={600}
                size={16}
                color={colors.neutral.c900}
                marginBottom={16}
                align="center"
              >
                {data.title}
              </Text>
            )}
            <View>{data.content}</View>

            <View
              marginTop={24}
              gap={8}
              style={
                data.row
                  ? { flexDirection: 'row', justifyContent: 'space-evenly' }
                  : {}
              }
            >
              {data.button1}
              {data.button2}
            </View>
          </View>
        </View>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

const styles = StyleSheet.create({
  modalWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBlanket: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    zIndex: 0,
    backgroundColor: colors.blanket,
  },
  modalContainer: {
    padding: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  container: {
    backgroundColor: colors.white,
    zIndex: 1000,
    borderRadius: 8,
    padding: 24,
    maxWidth: width - 32,
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
