import { LIVE_AGENT_CONNECTION_STATUS } from "../Config";

export type LiveAgentType = {
  status: boolean;
  dataCollectEnabled: boolean;
  type: number;
  url?: string;
};
type KeysOfConnectionStatus = keyof typeof LIVE_AGENT_CONNECTION_STATUS;
export type LIVE_AGENT_CONNECTION_STATUS_TYPES =
  (typeof LIVE_AGENT_CONNECTION_STATUS)[KeysOfConnectionStatus];
