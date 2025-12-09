import React from 'react';
import BouncyCheckbox, {
  BouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import colors from '../../../utils/constants/colors';
import View from '../../core/view';
import Text from '@components/core/text';

interface IProps extends BouncyCheckboxProps {
  label?: string | React.ReactNode;
  checked: boolean;
  onChange?: Function;
  size?: number;
  borderRadius?: number;
  borderWidth?: number;
}

const CheckBox = ({
  label,
  onChange,
  checked,
  size,
  borderRadius,
  borderWidth,
  style,
  ...props
}: IProps) => {
  const iconStyle = {
    borderRadius: borderRadius || 2,
  };
  const innerIconStyle = {
    borderWidth: borderWidth || 1,
    borderRadius: borderRadius || 2,
    borderColor: checked ? colors.primary.default : colors.neutral.c700,
  };
  return (
    <View row width={'100%'} verticalCenter>
      <View paddingVertical={4}>
        <BouncyCheckbox
          size={size || 16}
          style={[style, size ? { width: size, height: size } : null]}
          isChecked={checked}
          fillColor={colors.primary.default}
          unFillColor={colors.white}
          iconStyle={iconStyle}
          innerIconStyle={innerIconStyle}
          onPress={(isChecked: boolean) => {
            if (onChange) {
              onChange(isChecked.toString());
            }
          }}
          textComponent={
            typeof label === 'string' ? (
              <Text
                paddingLeft={8}
                size={14}
                color={colors.neutral.c700}
                maxWidth={'98%'}
              >
                {label}
              </Text>
            ) : undefined
          }
          {...props}
        />
      </View>

      {typeof label !== 'string' && label}
    </View>
  );
};

export default CheckBox;
