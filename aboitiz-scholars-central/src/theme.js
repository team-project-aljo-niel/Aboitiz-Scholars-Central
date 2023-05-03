import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// Color Palette
export const themeColors = (mode) => ({
  ...(mode === "light"
    ? {
        grey: {
          100: "#303030",
          200: "#606060",
          300: "#8f8f8f",
          400: "#bfbfbf",
          500: "#efefef",
          600: "#f2f2f2",
          700: "#f5f5f5",
          800: "#f9f9f9",
          900: "#fcfcfc",
        },
        primary: {
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#cccccc",
          500: "#ffffff",
          600: "#ffffff",
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff",
        },
        redAccent: {
          100: "#330000",
          200: "#660000",
          300: "#990000",
          400: "#cc0000",
          500: "#ff0000",
          600: "#ff3333",
          700: "#ff6666",
          800: "#ff9999",
          900: "#ffcccc",
        },
        blackAccent: {
          100: "#070707",
          200: "#0e0e0e",
          300: "#141414",
          400: "#1b1b1b",
          500: "#222222",
          600: "#4e4e4e",
          700: "#7a7a7a",
          800: "#a7a7a7",
          900: "#d3d3d3",
        },
        black: {
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#000000",
          600: "#333333",
          700: "#666666",
          800: "#999999",
          900: "#cccccc",
        },
      }
    : {
        grey: {
          100: "#fcfcfc",
          200: "#f9f9f9",
          300: "#f5f5f5",
          400: "#660000",
          500: "#121212",
          600: "#bfbfbf",
          700: "#8f8f8f",
          800: "#606060",
          900: "#303030",
        },
        primary: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ff0000",
          500: "#330000",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333",
        },
        redAccent: {
          100: "#ffcccc",
          200: "#ff9999",
          300: "#ff6666",
          400: "#ff3333",
          500: "#ff0000",
          600: "#cc0000",
          700: "#990000",
          800: "#660000",
          900: "#330000",
        },
        blackAccent: {
          100: "#d3d3d3",
          200: "#a7a7a7",
          300: "#7a7a7a",
          400: "#4e4e4e",
          500: "#222222",
          600: "#1b1b1b",
          700: "#141414",
          800: "#0e0e0e",
          900: "#070707",
        },
        black: {
          100: "#cccccc",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#ffffff",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      }),
});

// Material UI Theme
export const themeSettings = (mode) => {
  const colors = themeColors(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: colors.black[500],
            },
            secondary: {
              main: colors.redAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[500],
            },
          }
        : {
            primary: {
              main: colors.redAccent[500],
            },
            secondary: {
              main: colors.redAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
