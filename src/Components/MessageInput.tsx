import { SyntheticEvent, useState } from "react";
import { createStyleSheet } from "../Types/style";
import SendIcon from "./Images/SendIcon";
import useCreateStyle from "../Hooks/useCreateStyle";
import { Theme } from "../Utils/getTheme";
interface PropsTypes {
  canType: boolean;
  sendMessage: (message: string) => void;
}

export type UserData = {
  _id: string;
  name: string;
  icon: string;
};

const MessageInput = ({ canType, sendMessage }: PropsTypes) => {
  const [value, setValue] = useState("");
  const onSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (!canType) return;
    if (!value) return;
    sendMessage(value);
    setValue("");
  };
  const style = useCreateStyle(themeStyle);

  return (
    <div style={style.container}>
      <form style={style.messageSectionInput} onSubmit={onSubmit}>
        <textarea
          style={style.textarea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onSubmit(e);
            }
          }}
          placeholder="Ask me..."
        />
        <div style={style.button} title="send" onClick={onSubmit}>
          <SendIcon />
        </div>
      </form>
    </div>
  );
};

const themeStyle = (theme: Theme) =>
  createStyleSheet({
    container: {
      padding: "2px 20px 0px 20px",
    },
    messageSectionInput: {
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1fr 40px",
      gap: "16px",
      borderRadius: "16px",
      padding: "8px 8px 8px 16px",
      alignItems: "center",
      backgroundColor: theme.inputBackground,
    },
    textarea: {
      resize: "none",
      border: "none",
      backgroundColor: "transparent",
      outline: "none",
      boxSizing: "border-box",
      padding: "5px",
      height: "32px",
      fontSize: "17.6px",
      overflow: "hidden",
      color: theme.text,
    },
    button: {
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "60% 20%",
      backgroundSize: "75%",
      backgroundColor: theme.button,
    },
  });

export default MessageInput;
