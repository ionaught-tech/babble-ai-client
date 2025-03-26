import { SVGProps } from "react";
import { createStyleSheet } from "../../Types/style";

const Svg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    style={{
      ...style.default,
      ...props.style,
    }}
  />
);

const style = createStyleSheet({
  default: {
    display: "unset",
    verticalAlign: "unset",
  },
});

export default Svg;
