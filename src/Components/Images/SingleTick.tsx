import Svg from "./Svg";

interface PropsType {
  color: string;
}
const SingleTick = ({ color }: PropsType) => {
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
      <polyline points="2.75 8.75,6.25 12.25,13.25 4.75" />
    </Svg>
  );
};

export default SingleTick;
