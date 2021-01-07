export const lightTheme: Palette = {
    primary: "#1883C4",
    secondary: "#ededed",
    cardColor: "#fff",
    tabBarColor: "#fff",
    textColor: "#000",
    darkBlue: "#B3BBC6",
    gray: "#ccc",
    error: "#bb0000",
    success: "#00ad56",
}

export const darkTheme: Palette = {
    primary: "#1883C4",
    secondary: "#000",
    cardColor: "#21262D",
    tabBarColor: "#000",
    textColor: "#fff",
    darkBlue: "#B3BBC6",
    gray: "#ccc",
    error: "#bb0000",
    success: "#00ad56",
}

export interface Palette {
    primary: string;
    secondary: string;
    cardColor: string;
    tabBarColor: string;
    textColor: string;
    darkBlue: string;
    gray: string;
    error: string;
    success: string;
}