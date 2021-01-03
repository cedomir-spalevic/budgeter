import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, StyleSheet } from "react-native";
import { darkTheme, lightTheme, Palette } from "styles-new";

type Theme = "auto" | "light" | "dark";

interface Props {
   children: React.ReactNode;
}

interface Context {
    pallette: Palette;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<Context>(undefined!);

const ThemeProvider: React.FC<Props & any> = (props: Props) => {
    const [theme, setTheme] = useState<Theme>("auto");

    let pallette = lightTheme;
    if(theme === "dark" || (theme === "auto" && Appearance.getColorScheme() === "dark"))
        pallette = darkTheme;

    return (
        <ThemeContext.Provider value={{ pallette, theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = (): Context => useContext<Context>(ThemeContext);

type MakeStylesHook<T> = () => StyleSheet.NamedStyles<T>;
type MakeStylesFuncParam<T> = (palette: Palette) => T | StyleSheet.NamedStyles<T>;
export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(makeStylesFunc: MakeStylesFuncParam<T>): MakeStylesHook<T> {
    return () => {
        const theme = useTheme();
        return makeStylesFunc(theme.pallette);
    }
}

export default ThemeProvider;