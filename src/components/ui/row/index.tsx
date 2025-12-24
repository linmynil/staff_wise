import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import React from 'react';
import { TextStyle } from 'react-native';

interface IProps {
  title?: string;
  value?: string | number | null;
  valueHighlight?: boolean;
  valueStyle?: TextStyle;
}

const Row = ({ title, value, valueHighlight, valueStyle }: IProps) => {
  return (
    <View>
      <View row space_between padding={12}>
        <Text
          weight={600}
          size={13}
          color={colors.neutral.c500}
          align={'left'}
          maxWidth={valueHighlight ? '50%' : '40%'}
        >
          {title || 'Title'}
        </Text>
        <Text
          size={13}
          color={valueHighlight ? colors.primary.default : colors.neutral.c900}
          weight={valueHighlight ? 600 : 400}
          align={'right'}
          maxWidth={valueHighlight ? '50%' : '60%'}
          style={valueStyle}
        >
          {value || '...'}
        </Text>
      </View>
    </View>
  );
};

export default Row;
