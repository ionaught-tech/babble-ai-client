import { isStatusCard } from ".";
import { MESSAGE_STATUS } from "../Config";
import { GenericMessageType } from "../Types/message";
import { User } from "../Types/user";

export const isMessageStatusUptoDate = (
  message: GenericMessageType,
  user: User,
  screenOpen: boolean,
  isDashboard?: boolean,
) => {
  if (isStatusCard(message)) return true;
  if (message.from === user?._id && !isDashboard) return true;
  if (message.from !== user?._id && isDashboard) return true;
  if (!screenOpen && message.status >= MESSAGE_STATUS.Received) return true;
  if (message.status >= MESSAGE_STATUS.Read) return true;
  return false;
};
