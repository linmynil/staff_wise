import React from 'react';
import Text from '../../core/text';
import View from '../../core/view';
import colors from '../../../utils/constants/colors';
import { StyleProp, TextStyle } from 'react-native';

interface DividerProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  color?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
}

const Divider = ({
  text,
  textStyle,
  height,
  margin,
  color,
  marginTop,
  marginBottom,
}: DividerProps) => {
  const divider: {} = {
    flex: 1,
    height: height || 1,
    borderColor: color || colors.neutral.c200,
    borderTopWidth: 1,
  };
  return (
    <View
      row
      center
      gap={12}
      marginHorizontal={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <View style={divider} />
      {text && (
        <React.Fragment>
          <Text size={12} color={color || colors.neutral.c500} style={textStyle}>
            {text}
          </Text>
          <View style={divider} />
        </React.Fragment>
      )}
    </View>
  );
};

export default Divider;
