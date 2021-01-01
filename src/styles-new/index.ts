export const lightTheme: Palette = {
    primary: "#1883C4",
    secondary: "#ededed",
    textColor: "#000",
    darkBlue: "#B3BBC6",
    gray: "#ccc",
    error: "#bb0000",
    success: "#00ad56",
}

export const darkTheme: Palette = {
    primary: "#1883C4",
    secondary: "#000",
    textColor: "#fff",
    darkBlue: "#B3BBC6",
    gray: "#ccc",
    error: "#bb0000",
    success: "#00ad56",
}

export interface Palette {
    primary: string;
    secondary: string;
    textColor: string;
    darkBlue: string;
    gray: string;
    error: string;
    success: string;
}