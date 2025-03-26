import { useContext, createContext } from "react";
import { Theme, getTheme } from "../Utils/getTheme";

type ThemeType = {
  Theme: Theme;
};

const ThemeContext = createContext<ThemeType>({
  Theme: getTheme("hsl( 238, 100%, 69%)", "light"),
});

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export const ThemeContextProvider = ThemeContext.Provider;
