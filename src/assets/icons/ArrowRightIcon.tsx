import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ArrowRightIcon = (props: SvgProps) => (
   <Svg
    viewBox="0 0 11 11" {...props}
    width={11}
    height={11}
    fill="none"
    {...props}
  >
    <Path
     fill={props?.color || '#00AFB9'}
      d="M0 4.613v1.334h8L4.333 9.613l.947.947 5.28-5.28L5.28 0l-.947.947L8 4.613H0Z"
    />
  </Svg>
)
export default ArrowRightIcon

