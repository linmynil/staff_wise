import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const AnnualIcon = (props: SvgProps) => (
  <Svg
   viewBox="0 0 17 19" {...props}
    width={17}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill={props?.color || '#000'}
      fillOpacity={0.4}
      d="M3.63 9.076h1.815v1.815H3.63V9.076ZM16.336 3.63v12.706a1.815 1.815 0 0 1-1.815 1.815H1.815A1.815 1.815 0 0 1 0 16.336V3.63a1.815 1.815 0 0 1 1.815-1.815h.908V0h1.815v1.815h7.26V0h1.815v1.815h.908a1.815 1.815 0 0 1 1.815 1.815ZM1.816 5.445H14.52V3.63H1.815v1.815ZM14.52 16.336V7.261H1.815v9.075h12.706Zm-3.63-5.445V9.076h1.815v1.815H10.89Zm-3.63 0V9.076h1.815v1.815H7.26Zm-3.63 1.815h1.814v1.815H3.63v-1.815Zm7.26 1.815v-1.815h1.815v1.815H10.89Zm-3.63 0v-1.815h1.815v1.815H7.26Z"
    />
  </Svg>
)
export default AnnualIcon
