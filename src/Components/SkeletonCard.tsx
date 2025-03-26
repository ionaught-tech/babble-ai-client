import { useTheme } from "../Context";
import Svg from "./Images/Svg";

interface PropsType {
  width: number;
  height: number;
  rounded?: boolean;
}

const SkeletonCard = ({ width, height }: PropsType) => {
  const { Theme } = useTheme();
  return (
    <Svg aria-labelledby="hjosjuk-aria" role="img">
      <title id="hjosjuk-aria">Loading...</title>
      <rect
        role="presentation"
        x="0"
        y="0"
        rx="10"
        ry="10"
        width="100%"
        height="100%"
        clipPath="url(#hjosjuk-diff)"
        style={{ fill: 'url("#hjosjuk-animated-diff")' }}
      ></rect>
      <defs>
        <rect
          x="30"
          y="15"
          rx="10"
          ry="10"
          width={width}
          height={height}
        ></rect>
        <linearGradient id="hjosjuk-animated-diff">
          <stop offset="0%" stopColor={Theme.skeltonColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="50%" stopColor={Theme.secondaryColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="100%" stopColor={Theme.skeltonColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default SkeletonCard;
