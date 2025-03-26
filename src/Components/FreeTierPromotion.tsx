import { getAssetUrl } from "../Services/api";
import { useTheme } from "../Context";
import { createStyleSheet } from "../Types/style";
import useCreateStyle from "../Hooks/useCreateStyle";
const FreeTierPromotion = () => {
  const style = useCreateStyle(themeStyle);
  const theme = useTheme();
  const imageSrc =
    theme.Theme.mode === "dark"
      ? getAssetUrl("Assets/Images/babble-ai-white.svg")
      : getAssetUrl("Assets/Images/babble-ai-blue.svg");

  return (
    <div style={style.container}>
      <span style={style.label}>Powered By</span>
      <a href="https://www.babble-ai.com" target="_blank">
        <img style={style.image} src={imageSrc} alt="Babble AI" />
      </a>
    </div>
  );
};
const themeStyle = () =>
  createStyleSheet({
    container: {
      display: "flex",
      gap: "3px",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem",
    },
    label: {
      fontSize: "14px",
      color: "#949494",
      fontWeight: 600,
    },
    image: {
      width: "100px",
      height: "auto",
    },
  });
export default FreeTierPromotion;
