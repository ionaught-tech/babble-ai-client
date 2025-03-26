import { GenericMessageType, StatusMessageType } from "../Types/message";

export const isStatusCard = (
  obj: GenericMessageType,
): obj is StatusMessageType => "type" in obj && obj.type === "status";
