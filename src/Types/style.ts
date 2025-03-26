import { CSSProperties } from "react";

type StyleSheet<T extends string> = {
  [style in T]: CSSProperties;
};

export const createStyleSheet = <T extends string>(
  styles: StyleSheet<T>,
): StyleSheet<T> => {
  return styles;
};
