import { createStyleSheet } from "../Types/style";
import { getTimeLabel } from "../Utils/time";
import { MessageType } from "../Types/message";
import { useTheme } from "../Context";
import BotIcon from "./Images/BotIcon";
import UserIcon from "./Images/UserIcon";
import TimeWaiting from "./Images/TimeWaiting";
import DoubleTick from "./Images/DoubleTick";
import SingleTick from "./Images/SingleTick";

interface PropsTypes {
  isSend: boolean;
  message: MessageType;
}
const MessageFooter = ({ isSend, message }: PropsTypes) => {
  const { Theme } = useTheme();

  const getSenderClass = () => {
    if (message.senderType === "4") {
      return <BotIcon color={Theme.incoming} />;
    }
    return <UserIcon color={Theme.incoming} />;
  };
  const getReceiptClass = () => {
    return (
      [
        <TimeWaiting color={Theme.text} />,
        <SingleTick color={Theme.text} />,
        <DoubleTick color={Theme.deliveredReceipt} />,
        <DoubleTick color="hsla(238,100%,50%,1)" />,
      ][message.status] || <TimeWaiting color={Theme.text} />
    );
  };
  return (
    <span
      style={{
        ...style.messageSpan,
        color: isSend ? Theme.outGoing : Theme.incoming,
      }}
    >
      {isSend && getReceiptClass()}
      {getTimeLabel(message.createdAt)}
      {!isSend && getSenderClass()}
    </span>
  );
};
const style = createStyleSheet({
  messageSpan: {
    paddingLeft: "16px",
    fontSize: "11.2px",
    whiteSpace: "nowrap",
    float: "right",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
});

export default MessageFooter;
