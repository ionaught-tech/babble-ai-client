import { LIVE_AGENT_CONNECTION_STATUS } from "../Config";
import useCreateStyle from "../Hooks/useCreateStyle";
import { LIVE_AGENT_CONNECTION_STATUS_TYPES } from "../Types/liveAgent";
import { createStyleSheet } from "../Types/style";
import { Theme } from "../Utils/getTheme";
interface PropsTypes {
  agentStatus: LIVE_AGENT_CONNECTION_STATUS_TYPES;
  agentName: string | null;
  connectToAgent: () => void;
}
const LiveAgent = ({ agentName, agentStatus, connectToAgent }: PropsTypes) => {
  const style = useCreateStyle(themeStyle);

  const liveAgentLabel = {
    [LIVE_AGENT_CONNECTION_STATUS.Pending]: "Waiting for an agent",
    [LIVE_AGENT_CONNECTION_STATUS.Disconnected]: "Chat with Live Agent",
    [LIVE_AGENT_CONNECTION_STATUS.Connected]: "Connected with " + agentName,
    [LIVE_AGENT_CONNECTION_STATUS.Loading]: "Loading...",
  };

  return (
    <button onClick={connectToAgent} style={style.container}>
      {liveAgentLabel[agentStatus]}
    </button>
  );
};
const themeStyle = (theme: Theme) =>
  createStyleSheet({
    container: {
      border: "none",
      fontWeight: 600,
      cursor: "pointer",
      padding: "0.4rem",
      backgroundColor: theme.chatBg,
      color: theme.linkColor,
    },
  });

export default LiveAgent;
