import Text from '../../core/text';
import View from '../../core/view';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Button from '../button';
import Toast from 'react-native-toast-message';
import { CloseIcon, ErrorCircleIcon, InfoCircleIcon } from '@assets';
import colors from '@utils/constants/colors';

enum Type {
  info = 'info',
  error = 'error',
}

const IconMap: Record<Type, ReactNode> = {
  [Type.info]: <InfoCircleIcon />,
  [Type.error]: <ErrorCircleIcon />,
  // [Type.success]: <InfoCircleIcon />,
  // [Type.warning]: <InfoCircleIcon />,
};

const Message = ({
  type = Type.info,
  text1,
}: {
  type: Type;
  text1: string;
}) => {
  const Icon = IconMap[type];
  const containerStyle = [styles.messageContainer, styles[type]];

  return (
    <View style={containerStyle}>
      <View row width={'100%'} gap={8}>
        {Icon}
        <View flex={1}>
          <Text>{text1}</Text>
        </View>

        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: colors.neutral.c200,
            paddingLeft: 8,
          }}
        >
          <Button.IconButton
            icon={<CloseIcon />}
            onPress={() => Toast.hide()}
          />
        </View>
      </View>
    </View>
  );
};

Message.Type = Type;

const styles = StyleSheet.create({
  messageContainer: {
    minHeight: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 8,
    borderLeftColor: colors.blue.c600,
    maxWidth: '90%',
    // overflow: 'hidden',
  },
  [Type.info]: {
    borderLeftWidth: 8,
    borderLeftColor: colors.blue.c600,
  },
  [Type.error]: {
    borderLeftWidth: 8,
    borderLeftColor: colors.red.c600,
  },
  // [Type.warning]: {
  //   borderLeftWidth: 8,
  //   borderLeftColor: colors.blue.c600,
  // },
  // [Type.success]: {
  //   borderLeftWidth: 8,
  //   borderLeftColor: colors.blue.c600,
  // },
});

export default Message;
