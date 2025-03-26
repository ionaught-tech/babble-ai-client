import { useTheme } from "../../Context";
import AnimationCircle from "../AnimationCircle";
import Svg from "./Svg";

const Typing = () => {
  const { Theme } = useTheme();
  return (
    <Svg
      version="1.1"
      id="L5"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 40 10"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      width="40px"
      height="56px"
    >
      <AnimationCircle
        color={Theme.typingColor}
        cx="6"
        values="0 1 ; 0 -14; 0 14"
        begin="0.1"
      />
      <AnimationCircle
        color={Theme.typingColor}
        cx="18"
        values="0 10 ; 0 -13; 0 13"
        begin="0.2"
      />
      <AnimationCircle
        color={Theme.typingColor}
        cx="30"
        values="0 5 ; 0 -10; 0 10"
        begin="0.3"
      />
    </Svg>
  );
};

export default Typing;
