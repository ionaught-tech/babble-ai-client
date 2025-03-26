import { useEffect } from "react";
import useMessageList, {
  ConnectionStatus,
  MessageData,
} from "../Hooks/useMessageList";
import { createStyleSheet } from "../Types/style";
import { isStatusCard } from "../Utils";
import MessageCard, { OnLinkClick } from "./MessageCard";
import MessageInput from "./MessageInput";
import LiveAgent from "./LiveAgent";
import { LiveAgentType } from "../Types/liveAgent";
import SkeletonCard from "./SkeletonCard";
import SuggestionMessages from "./SuggestionMessages";
import Typing from "./Images/Typing";
import useCreateStyle from "../Hooks/useCreateStyle";
import { Theme } from "../Utils/getTheme";
import FreeTierPromotion from "./FreeTierPromotion";

export type ChatPropsTypes = {
  apiUrl: string;
  socketUrl: string;
  canConnect?: boolean | null;
  tokenKey: string;
  screenOpen?: boolean;
  onLinkOnClick?: OnLinkClick;
  customMessageHandler?: (data: MessageData) => void;
  onConnectionStatusChange?: (status: ConnectionStatus) => void;
  liveAgent?: LiveAgentType;
  onLiveAgentDataCollect?: (arg: any, connect: () => Promise<void>) => void;
  activeUser?: string;
  disclaimerUrl?: string;
  freeTier?: boolean;
};

const Chat = ({
  apiUrl,
  socketUrl,
  canConnect = true,
  screenOpen = true,
  tokenKey,
  onLinkOnClick,
  customMessageHandler,
  onConnectionStatusChange,
  onLiveAgentDataCollect,
  liveAgent = {
    status: false,
    dataCollectEnabled: false,
    type: 1,
    url: "",
  },
  activeUser,
  disclaimerUrl,
  freeTier,
}: ChatPropsTypes) => {
  const style = useCreateStyle(themeStyle);

  const {
    connectionStatus,
    messageList,
    sendMessage,
    user,
    messageBoxRef,
    agentName,
    onConnectToLiveAgent,
    agentStatus,
    onScroll,
    suggestedMessages,
  } = useMessageList(
    apiUrl,
    socketUrl,
    canConnect,
    screenOpen,
    tokenKey,
    liveAgent,
    onLiveAgentDataCollect,
    customMessageHandler,
    activeUser,
  );

  useEffect(() => {
    onConnectionStatusChange?.(connectionStatus);
  }, [connectionStatus]);
  if (!screenOpen) return <></>;
  return (
    <div style={style.messageSection}>
      <div
        style={style.messageSectionBody}
        ref={messageBoxRef}
        onScroll={onScroll}
      >
        {!messageList && connectionStatus !== "typing" && (
          <SkeletonCard width={1000} height={500} />
        )}
        {messageList?.map(
          (message) =>
            user && (
              <MessageCard
                key={message._id}
                type={
                  !isStatusCard(message) &&
                  ((activeUser && message.from !== user._id) ||
                    (!activeUser && message.from === user._id))
                    ? "send"
                    : "received"
                }
                message={message}
                linkOnClick={async (e, url) => {
                  const response = await onLinkOnClick?.(
                    e,
                    url,
                    onConnectToLiveAgent,
                  );
                  return response || false;
                }}
              />
            ),
        )}
        {connectionStatus === "typing" && <Typing />}
      </div>
      <SuggestionMessages
        suggestedMessages={suggestedMessages}
        sendMessage={sendMessage}
      />
      <div style={style.messageFooter}>
        <MessageInput canType={true} sendMessage={sendMessage} />
        {liveAgent?.status ? (
          <LiveAgent
            agentStatus={agentStatus}
            agentName={agentName}
            connectToAgent={onConnectToLiveAgent}
          />
        ) : disclaimerUrl ? (
          <button
            onClick={() => {
              window.open(disclaimerUrl, "_blank");
            }}
            style={{
              ...style.container,
            }}
          >
            Disclaimer
          </button>
        ) : (
          freeTier && <FreeTierPromotion />
        )}
      </div>
    </div>
  );
};
const themeStyle = (theme: Theme) =>
  createStyleSheet({
    messageSection: {
      borderRadius: "0 0 16px 16px",
      display: "grid",
      overflow: "hidden",
      position: "relative",
      gridTemplateRows: "1fr auto",
      maxHeight: "100%",
      maxWidth: "100%",
      backgroundColor: theme.chatBg,
      height: "100%",
    },
    messageSectionBody: {
      boxSizing: "border-box",
      padding: "32px 16px 30px",
      overflowY: "auto",
      display: "grid",
      gap: "24px",
      marginBottom: "auto",
      maxHeight: "100%",
    },
    container: {
      border: "none",
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "underline",
      padding: "0.5rem",
      backgroundColor: theme.chatBg,
      color: theme.disclaimerColor,
    },
    messageFooter: {
      display: "grid",
      minHeight: "80px",
    },
  });
export default Chat;
