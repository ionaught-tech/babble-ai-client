"use client";
import { useEffect } from "react";
import Chat, { ChatPropsTypes } from "../Components/Chat";
import { ThemeContextProvider } from "../Context";
import useFetch from "../Hooks/useFetch";
import { createUserCall, getToken } from "../Services/api";
import { ThemeMode, getTheme } from "../Utils/getTheme";

type PropsTypes = ChatPropsTypes & {
  theme?: ThemeMode;
  primaryColor?: string;
  themeName?: string;
  id: string;
};

type Datatype = {
  token: string;
};

export const ChatBox = ({
  theme = "light",
  primaryColor = "hsl( 238, 100%, 69%)",
  id,
  ...rest
}: PropsTypes) => {
  console.log("id", id);
  const { data } = useFetch<Datatype>(getToken(id));
  console.log("data", data);

  useEffect(() => {
    if (!data?.token) return;
    console.log(data.token, "token");
    (async () => {
      const res = await createUserCall("", {}, data.token);
      if (res.status) {
        localStorage.setItem("chat-bot-token", res.data.token);
      }
    })();
  }, [data]);
  const Theme = getTheme(primaryColor, theme);

  return (
    <ThemeContextProvider
      value={{
        Theme: Theme,
      }}
    >
      <Chat {...rest} />
    </ThemeContextProvider>
  );
};
