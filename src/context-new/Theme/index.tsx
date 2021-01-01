import React, { createContext, useContext, useState } from "react";
import { StyleSheet } from "react-native";

const lightTheme: Palette = {
    primary: "#1883C4",
    secondary: "#ededed"
}

const darkTheme: Palette = {
    primary: "#1883C4",
    secondary: "#000"
}

interface Palette {
    primary: string;
    secondary: string;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
    pallette: Palette;
}

export const ThemeContext = createContext<Context>(undefined!);

const ThemeProvider: React.FC<Props & any> = (props: Props) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{ pallette: (isDarkTheme ? darkTheme : lightTheme)  }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = (): Context => useContext<Context>(ThemeContext);

type MakeStylesFunc<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>> = (palette: Palette) => T;

// <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(styles: T | StyleSheet.NamedStyles<T>): T
// type MakeStylesFunc = (palette: Palette) => StyleSheet.NamedStyles;
export const makeStyles = (makeSylesFunc: MakeStylesFunc<any>): StyleSheet.NamedStyles<any> => {
    const theme = useTheme();
    return makeSylesFunc(theme.pallette);
};

export default ThemeProvider;