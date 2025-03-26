"use client";
import Chat, { ChatPropsTypes } from "../Components/Chat";
import { ThemeContextProvider } from "../Context";
import { ThemeMode, getTheme } from "../Utils/getTheme";

type PropsTypes = ChatPropsTypes & {
  theme?: ThemeMode;
  primaryColor?: string;
  themeName?: string;
};

export const ChatBox = ({
  theme = "light",
  primaryColor = "hsl( 238, 100%, 69%)",
  ...rest
}: PropsTypes) => {
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
