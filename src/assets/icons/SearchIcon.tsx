import colors from '@utils/constants/colors';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SearchIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill={props.color || colors.primary.default}
      fillRule="evenodd"
      d="M8.83545 1.62305C5.03849 1.62305 1.96045 4.70109 1.96045 8.49805C1.96045 12.295 5.03849 15.373 8.83545 15.373C10.5089 15.373 12.0427 14.7752 13.2349 13.7813L18.3935 18.94C18.6376 19.1841 19.0333 19.1841 19.2774 18.94C19.5215 18.6959 19.5215 18.3002 19.2774 18.0561L14.1187 12.8975C15.1126 11.7053 15.7104 10.1715 15.7104 8.49805C15.7104 4.70109 12.6324 1.62305 8.83545 1.62305ZM3.21045 8.49805C3.21045 5.39145 5.72885 2.87305 8.83545 2.87305C11.9421 2.87305 14.4604 5.39145 14.4604 8.49805C14.4604 11.6046 11.9421 14.123 8.83545 14.123C5.72885 14.123 3.21045 11.6046 3.21045 8.49805Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SearchIcon;
