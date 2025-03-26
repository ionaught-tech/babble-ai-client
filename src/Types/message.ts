export type MessageReceivedType = "received" | "send";

export type MessageSection = {
  type: string;
  message: string;
  caption?: string;
};

export type MessageType = {
  _id: string;
  to: string;
  from: string;
  senderType: string;
  type: MessageReceivedType;
  status: number;
  message: MessageSection[];
  createdAt: string;
};
export type StatusMessageType = {
  _id: string;
  type: "status";
  message: string;
};
export type GenericMessageType = StatusMessageType | MessageType;
