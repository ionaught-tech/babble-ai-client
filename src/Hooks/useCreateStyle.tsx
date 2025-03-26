import { useMemo } from "react";
import { useTheme } from "../Context";
import { Theme } from "../Utils/getTheme";

const useCreateStyle = <T,>(themeStyle: (theme: Theme) => T) => {
  const { Theme } = useTheme();
  const style = useMemo(() => themeStyle(Theme), [Theme]);
  return style;
};

export default useCreateStyle;
