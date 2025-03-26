import useCreateStyle from "../Hooks/useCreateStyle";
import { MessageSection } from "../Types/message";
import { createStyleSheet } from "../Types/style";
import { Theme } from "../Utils/getTheme";

export interface PropsTypes {
  message: MessageSection;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Link = ({ message, onClick }: PropsTypes) => {
  const style = useCreateStyle(themeStyle);

  return (
    <a
      target="_blank"
      href={message.message}
      style={{
        ...style.linkMessage,
        textDecoration: message.caption ? "underline" : "none",
      }}
      onClick={onClick}
    >
      {message.caption || message.message}
    </a>
  );
};
const themeStyle = (theme: Theme) =>
  createStyleSheet({
    linkMessage: {
      fontWeight: "bold",
      color: theme.linkColor,
    },
  });
export default Link;
