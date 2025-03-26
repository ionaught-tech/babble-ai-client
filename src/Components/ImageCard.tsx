import { createStyleSheet } from "../Types/style";
import { PropsTypes } from "./Link";

const ImageCard = ({ message }: PropsTypes) => {
  return (
    <div style={imageStyle.imageWrapper}>
      <div
        style={{
          backgroundImage: `url(${message.message})`,
          ...imageStyle.imageCard,
        }}
      />
    </div>
  );
};

const imageStyle = createStyleSheet({
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
    margin: "1rem 0",
  },
  imageCard: {
    position: "absolute",
    top: "-2rem",
    left: "-2rem",
    right: "-2rem",
    bottom: "0",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0.75rem 0.75rem 0 0",
  },
});

export default ImageCard;
