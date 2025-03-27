import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import { GenericMessageType, MessageType } from "../Types/message";
import {
  LIVE_AGENT_CONNECTION_STATUS,
  LIVE_AGENT_OPTION_TYPES,
  MESSAGE_STATUS,
  USER_TYPES,
} from "../Config";
import { generateId } from "../Utils/id";
import extractUrl from "../Utils/extractUrl";
import { User } from "../Types/user";
import { isMessageStatusUptoDate } from "../Utils/message";
import {
  LIVE_AGENT_CONNECTION_STATUS_TYPES,
  LiveAgentType,
} from "../Types/liveAgent";
import {
  connectToAgentCall,
  getMessageHistory,
  getRequiredFields,
} from "../Services/api";
import useFetch from "./useFetch";

export type ConnectionStatus = "online" | "offline" | "typing";
export type MessageData = {
  action: string;
  message: any;
  id: string;
};
type MessageHistory = {
  messages: MessageType[];
  user: User;
};
const useMessageList = (
  apiUrl: string,
  socketUrl: string,
  canConnect: boolean | null,
  screenOpen: boolean,
  liveAgent: LiveAgentType,
  onLiveAgentDataCollect?: (
    arg: any,
    connect: (data?: any) => Promise<void>,
  ) => void,
  customMessageHandler?: (data: MessageData) => void,
  activeUser?: string,
) => {
  const tokenKey = "chat-bot-token";
  const socketRef = useSocket(canConnect, tokenKey, socketUrl);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("online");
  const [messageList, setMessageList] = useState<GenericMessageType[] | null>(
    null,
  );
  const [suggestedMessages, setSuggestedMessages] = useState<string[] | null>(
    null,
  );
  const [agentStatus, setAgentStatus] =
    useState<LIVE_AGENT_CONNECTION_STATUS_TYPES>(
      LIVE_AGENT_CONNECTION_STATUS.Disconnected,
    );
  const [agentName, setAgentName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const loadingPageRef = useRef(false);
  type _MessageData = MessageData & {
    action: keyof typeof messageHandlers;
  };

  type MessageHandlers<T extends string> = {
    [action in T]: (data: MessageData) => void;
  };
  const {
    data: messageHistory,
    setData: setMessageHistory,
    loading,
  } = useFetch<MessageHistory>(
    getMessageHistory(activeUser || "", pageNumber),

    {
      notLoad: !activeUser,
      token: `${localStorage.getItem(tokenKey)}`,
      paginationMergeFunction(response, data) {
        if (
          response.data &&
          (!isLastPage || response?.data?._id !== activeUser) &&
          !data?.messages.find(
            (message: GenericMessageType) =>
              response.data.messages?.[0]?._id === message._id,
          )
        ) {
          if (response.data.isLastPage) setIsLastPage(response.data.isLastPage);
          const newMessageList: GenericMessageType[] = [
            ...response.data.messages,
            ...(data?.messages || []),
          ];
          return {
            ...response.data,
            messages: newMessageList.filter(
              (message, i) =>
                newMessageList.findIndex((m) => message._id === m._id) === i,
            ),
          };
        }
        return data;
      },
    },
    apiUrl,
  );
  useEffect(() => {
    if (messageHistory) {
      setMessageList(messageHistory.messages);
      scrollDown(pageNumber !== 1);
      setUser(messageHistory.user);
      setConnectionStatus(messageHistory.user.online ? "online" : "offline");
    }
  }, [messageHistory]);
  useEffect(() => {
    setMessageHistory(null);
    setUser(null);
    setMessageList(null);
    setPageNumber(1);
    setIsLastPage(false);
  }, [activeUser]);
  const createHandlers = <T extends string>(
    handler: MessageHandlers<T>,
  ): MessageHandlers<T> => {
    return handler;
  };

  const messageHandlers = createHandlers({
    typing() {
      setConnectionStatus("typing");
      scrollDown();
    },
    messageList(data) {
      setMessageList(data.message);
      scrollDown();
    },

    newMessage(data) {
      if (activeUser) {
        if (
          data.message.from === activeUser ||
          data.message.to === activeUser
        ) {
          addNewMessage(data.message);
        }
      } else {
        addNewMessage(data.message);
        // suggestionReload();
      }
    },
    send(data) {
      changeStatus(data.id, MESSAGE_STATUS.Send, data.message);
    },
    received(data) {
      changeStatus(data.id, MESSAGE_STATUS.Received);
    },
    read(data) {
      changeStatus(data.id, MESSAGE_STATUS.Read);
    },
    acceptChat(data) {
      addNewMessage({
        type: "status",
        message: `Connected with ${data.message.name}`,
        _id: generateId(),
      });
      setAgentName(data.message.name);
      setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Connected);
    },
    endChat(data) {
      addNewMessage({
        type: "status",
        message: `${data.message.name} has disconnected`,
        _id: generateId(),
      });
      setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Disconnected);
      setAgentName("");
    },
    userData(data) {
      if (data?.message?.agentConnection) {
        setAgentStatus(data?.message?.agentConnection);
        if (data?.message?.agentName) setAgentName(data?.message?.agentName);
      }
      setUser(data.message);
    },
    suggestedQuestions(data) {
      setSuggestedMessages(data.message);
    },
  });

  const changeStatus = (messageId: string, status: number, newId?: string) => {
    setMessageList((prev) =>
      (prev || []).map((d) => {
        if (d._id === messageId) {
          return {
            ...d,
            status,
            _id: newId || d._id,
          };
        }
        return d;
      }),
    );
  };

  const addNewMessage = (message: GenericMessageType) => {
    setMessageList((prev) => [...(prev || []), message]);
    scrollDown();
  };
  useEffect(() => {
    if (!socketRef.current) return;
    const messageHandler = (data: _MessageData) => {
      setConnectionStatus("online");
      messageHandlers[data.action]?.(data);
      customMessageHandler?.(data);
    };
    socketRef.current.on("message", messageHandler);

    socketRef.current.on("connect_error", () => {
      if (window.navigator.onLine) localStorage.removeItem(tokenKey);
    });

    return () => {
      socketRef.current?.off("message", messageHandler);
    };
  }, [socketRef.current, activeUser]);

  useEffect(() => {
    if (socketRef.current && messageList?.length && user) {
      if (
        messageList.reduce((a, m) => {
          if (isMessageStatusUptoDate(m, user, screenOpen, !!activeUser))
            return a;
          return true;
        }, false)
      )
        setMessageList((prev) =>
          (prev || []).map((m) => {
            if (isMessageStatusUptoDate(m, user, screenOpen, !!activeUser))
              return m;
            socketRef.current?.emit("message", {
              id: m._id,
              action: screenOpen ? "read" : "delivered",
            });
            return {
              ...m,
              status: screenOpen
                ? MESSAGE_STATUS.Read
                : MESSAGE_STATUS.Received,
            };
          }),
        );
    }
  }, [screenOpen, socketRef.current, messageList]);

  const scrollDown = (correction?: boolean) => {
    setTimeout(
      () => {
        if (
          correction &&
          messageBoxRef.current &&
          messageBoxRef.current?.scrollTop > 100
        )
          return;
        messageBoxRef.current?.scrollTo({
          top: correction ? 300 : messageBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      },
      correction ? 200 : 100,
    );
  };

  const onScroll = () => {
    if (
      !loading &&
      !loadingPageRef.current &&
      !isLastPage &&
      messageBoxRef?.current &&
      messageBoxRef?.current?.scrollTop < 300
    ) {
      loadingPageRef.current = true;
      setTimeout(() => {
        if (messageBoxRef?.current && messageBoxRef?.current?.scrollTop < 300) {
          setPageNumber((prev) => prev + 1);
        }
        loadingPageRef.current = false;
      }, 200);
    }
  };

  const sendMessage = (message: string) => {
    if (!user) return;
    const id = generateId();
    socketRef.current?.emit("message", {
      message: message,
      id,
      to: activeUser ? user._id : user.chatBot || "",
      action: "newMessage",
    });

    addNewMessage({
      _id: id,
      to: activeUser || user.chatBot || "",
      from: activeUser ? user.chatBot || "" : user._id,
      message: extractUrl(message),
      createdAt: new Date().toISOString(),
      senderType: USER_TYPES.Organization + "",
      status: 0,
      type: "send",
    });
    setSuggestedMessages(null);
  };

  const connectToLiveAgent = async (data?: any) => {
    setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Loading);
    await connectToAgentCall(
      apiUrl,
      data,
      localStorage.getItem(tokenKey) || "",
    );
    setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Pending);
    addNewMessage({
      type: "status",
      message: "Waiting for Live Agent",
      _id: generateId(),
    });
  };

  const onConnectToLiveAgent = async () => {
    if (LIVE_AGENT_OPTION_TYPES.redirect === liveAgent.type)
      return window.open(liveAgent.url, "_blank");
    if (
      liveAgent.type !== LIVE_AGENT_OPTION_TYPES.chat ||
      agentStatus !== LIVE_AGENT_CONNECTION_STATUS.Disconnected
    )
      return;
    if (liveAgent.dataCollectEnabled) {
      setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Loading);
      const response = await getRequiredFields(
        localStorage.getItem(tokenKey) || "",
        apiUrl,
      );
      setAgentStatus(LIVE_AGENT_CONNECTION_STATUS.Disconnected);
      if (Object.values(response.data).some((value) => value))
        return onLiveAgentDataCollect?.(response.data, connectToLiveAgent);
    }
    connectToLiveAgent();
  };

  return {
    connectionStatus,
    messageList,
    user,
    sendMessage,
    messageBoxRef,
    onConnectToLiveAgent,
    connectToLiveAgent,
    agentName,
    agentStatus,
    onScroll,
    suggestedMessages,
  };
};

export default useMessageList;
