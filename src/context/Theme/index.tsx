import React, { createContext, useContext, useState } from "react";
import { Appearance, StyleSheet } from "react-native";
import { Theme, lightTheme, darkTheme } from "styles-new";

type Kind = "auto" | "light" | "dark";

interface Props {
   children: React.ReactNode;
}

interface Context {
    value: Theme;
    kind: Kind;
    setKind: (kind: Kind) => void;
}

const ThemeContext = createContext<Context>(undefined!);

const ThemeProvider: React.FC<Props & any> = (props: Props) => {
    const [kind, setKind] = useState<Kind>("auto");

    let theme = lightTheme;
    if(kind === "dark" || (kind === "auto" && Appearance.getColorScheme() === "dark"))
        theme = darkTheme;

    return (
        <ThemeContext.Provider value={{ value: theme, kind, setKind }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = (): Context => useContext<Context>(ThemeContext);

type MakeStylesHook<T> = () => StyleSheet.NamedStyles<T>;
type MakeStylesFuncParam<T> = (theme: Theme) => T | StyleSheet.NamedStyles<T>;
export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(makeStylesFunc: MakeStylesFuncParam<T>): MakeStylesHook<T> {
    return () => {
        const theme = useTheme();
        return makeStylesFunc(theme.value);
    }
}

export default ThemeProvider;