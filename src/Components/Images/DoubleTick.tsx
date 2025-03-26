import Svg from "./Svg";

interface PropsType {
  color: string;
}
const DoubleTick = ({ color }: PropsType) => {
  return (
    <Svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="m1.75 9.75 2.5 2.5m3.5-4 2.5-2.5m-4.5 4 2.5 2.5 6-6.5" />
    </Svg>
  );
};

export default DoubleTick;
