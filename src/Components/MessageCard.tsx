import { isStatusCard } from "../Utils";
import { GenericMessageType, MessageReceivedType } from "../Types/message";
import { createStyleSheet } from "../Types/style";
import Link from "./Link";
import TextMessage from "./TextMessage";
import MessageFooter from "./MessageFooter";
import useCreateStyle from "../Hooks/useCreateStyle";
import { Theme } from "../Utils/getTheme";
import ImageCard from "./ImageCard";

export type OnLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  url: string,
  connectToLiveAgent?: () => any,
) => Promise<boolean>;

type MessageCardPropsTypes = {
  type: MessageReceivedType;
  linkOnClick?: OnLinkClick;
  message: GenericMessageType;
};

const MessageCard = ({ type, linkOnClick, message }: MessageCardPropsTypes) => {
  const style = useCreateStyle(themeStyle);

  if (isStatusCard(message)) {
    return (
      <div style={style.statusMessageContainer}>
        <div style={style.statusMessage}>{message.message}</div>
      </div>
    );
  }

  const containerClass = {
    received: style.messageIncoming,
    send: style.messageOutgoing,
  };

  return (
    <div style={{ ...style.message, ...containerClass[type] }}>
      {message.message.map((m, _i) => {
        if (m.type === "link") {
          return (
            <Link
              key={m.message + message._id}
              message={m}
              onClick={(e) => linkOnClick?.(e, m.message)}
            />
          );
        }
        if (m.type === "image") {
          return <ImageCard key={m.message + message._id} message={m} />;
        }
        return <TextMessage message={m} key={m.message + message._id} />;
      })}
      <MessageFooter isSend={type === "send"} message={message} />
    </div>
  );
};

const themeStyle = (theme: Theme) =>
  createStyleSheet({
    message: {
      borderRadius: "19.2px",
      padding: "16px 16px 8px 16px",
      wordWrap: "break-word",
      maxWidth: "80%",
      overflow: "hidden",
      fontSize: "16px",
      lineHeight: "20px",
    },
    messageIncoming: {
      marginRight: "auto",
      borderBottomLeftRadius: "0",
      backgroundColor: theme.incomingBg,
      color: theme.incoming,
    },
    messageOutgoing: {
      marginLeft: "auto",
      borderBottomRightRadius: "0",
      backgroundColor: theme.outgoingBg,
      color: theme.outGoing,
    },
    statusMessageContainer: {
      display: "flex",
      justifyContent: "center",
      color: theme.statusMessage,
    },
    statusMessage: {
      fontSize: "11px",
      padding: "5px 10px",
      textAlign: "center",
      borderRadius: "5px",
      backgroundColor: theme.incomingBg,
    },
  });

export default MessageCard;
