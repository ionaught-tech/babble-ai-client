interface Props {
  color?: string;
  cx: string;
  values: string;
  begin: string;
}
const AnimationCircle = ({ color, cx, values, begin }: Props) => {
  return (
    <circle fill="none" stroke={color} strokeWidth="1" cx={cx} cy="2" r="3">
      <animateTransform
        attributeName="transform"
        dur="1s"
        type="translate"
        values={values}
        repeatCount="indefinite"
        begin={begin}
      />
    </circle>
  );
};

export default AnimationCircle;
