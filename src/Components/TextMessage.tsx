import { MessageSection } from "../Types/message";
import { createStyleSheet } from "../Types/style";
interface PropsTypes {
  message: MessageSection;
}

const TextMessage = ({ message }: PropsTypes) => {
  return <p style={style.textMessage}>{message.message}</p>;
};
const style = createStyleSheet({
  textMessage: {
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "inherit",
  },
});

export default TextMessage;
