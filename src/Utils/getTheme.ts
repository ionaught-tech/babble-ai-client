export type ThemeMode = "dark" | "light";

const getHSL = (color: string) => {
  const matches = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*\)/);
  if (matches) {
    return {
      h: parseInt(matches[1]),
      s: parseInt(matches[2]),
      l: parseInt(matches[3]),
    };
  } else {
    return {
      h: 0,
      s: 0,
      l: 0,
    };
  }
};

export const getTheme = (primaryColor: string, mode: ThemeMode) => {
  const { h, s, l } = getHSL(primaryColor);

  const getColor = (l: number, a?: number, _h?: number, _s?: number) =>
    `hsla(${_h || h},${_s || s}%,${l}%,${a || "1"})`;

  const lightLight = {
    white: 100,
    black: 0,
    primaryColor: l,
    secondaryColor: l > 50 ? 5 : 95,
    primaryContrast: l > 50 ? 5 : 95,
    link: 50,
    lightGray: 98,
    mediumLight: 92,
    gray: 50,
    transparentLightGray: 68,
    transparentMediumGray: 80,
  };

  const lightOpacity = {
    transparentLightGray: 0.1,
    transparentMediumGray: 0.1,
  };

  const darkLight = {
    white: 10,
    black: 100,
    primaryColor: l,
    secondaryColor: l > 50 ? 0 : 100,
    link: 65,
    lightGray: 5,
    mediumLight: 20,
    gray: 50,
    transparentLightGray: 70,
    transparentMediumGray: 60,
  };

  const darkOpacity = {
    transparentLightGray: 0.15,
    transparentMediumGray: 0.15,
  };

  const darkHue = {
    link: h > 200 && h < 240 ? 110 : 230,
  };

  const darkSaturation = {
    link: 60,
    mediumLight: s > 40 ? 40 : s,
  };

  const isDarkMode = mode === "dark";

  const colors: Record<keyof typeof lightLight, string> = Object.entries(
    isDarkMode ? darkLight : lightLight,
  ).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]: getColor(
        value,
        (isDarkMode ? darkOpacity : lightOpacity)[
          key as keyof typeof darkOpacity
        ],
        isDarkMode ? darkHue[key as keyof typeof darkHue] : undefined,
        isDarkMode
          ? darkSaturation[key as keyof typeof darkSaturation]
          : undefined,
      ),
    }),
    {} as Record<keyof typeof lightLight, string>,
  );

  return {
    chatBg: colors.lightGray, //light gray 1
    outgoingBg: colors.mediumLight, //medium light grey 2
    outGoing: colors.black, //high dark gray
    incomingBg: colors.white, // white 3
    incoming: colors.black, // black 4
    inputBackground: colors.white, // white
    linkColor: colors.link, // blue 5
    text: colors.black, // black
    button: colors.primaryColor, // blue
    statusMessage: colors.gray, // gray
    // readReceipt: colors.primaryColor, // blue
    sendIcon: colors.secondaryColor, // white
    deliveredReceipt: colors.black, // black
    skeltonColor: colors.transparentLightGray, //transparent light gray 7
    secondaryColor: colors.transparentMediumGray, //transparent medium gray 8
    typingColor: colors.black, //black
    disclaimerColor: colors.link, // blue
    mode: mode,
  };
};

export type Theme = ReturnType<typeof getTheme>;
