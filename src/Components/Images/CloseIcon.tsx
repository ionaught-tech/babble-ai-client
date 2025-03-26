import Svg from "./Svg";
interface PropsType {
  color: string;
}

const CloseIcon = ({ color }: PropsType) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 8 8"
      fill={color}
    >
      <path
        d="M3.99937 3.11125L7.11062 0L8 0.889378L4.88875 4.00063L8 7.11188L7.11062 8.00063L3.99937 4.88938L0.888121 8.00063L0 7.11125L3.11125 4L0 0.888749L0.888121 0.00125698L3.99937 3.11251V3.11125Z"
        fill={color}
      />
    </Svg>
  );
};
export default CloseIcon;
