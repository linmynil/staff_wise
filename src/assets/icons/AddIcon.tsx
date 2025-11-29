import colors from '@utils/constants/colors';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AddIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" viewBox="0 0 30 30" {...props}>
    <Path
      fill={props?.fill || colors.white}
      d="M23.75 16.25h-7.5v7.5h-2.5v-7.5h-7.5v-2.5h7.5v-7.5h2.5v7.5h7.5v2.5Z"
    />
  </Svg>
);
export default AddIcon;
