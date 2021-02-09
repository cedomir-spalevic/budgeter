/**
 * NOTE: All these colors should stay in rgb format for consistency 
 * There are pieces in place that require rgb format. This is to save your own time
 */
export const light: Palette = {
    primary: "rgb(24,130,196)",
    textColor: "rgb(0,0,0)",
    systemGray: "rgb(142,142,147)",
    systemGray2: "rgb(174,174,178)",
    systemGray3: "rgb(199,199,204)",
    systemGray4: "rgb(209,209,214)",
    systemGray5: "rgb(229,229,234)",
    systemGray6: "rgb(242,242,247)",
    appBackground: "rgb(237,237,237)",
    secondaryBackground: "rgb(255,255,255)",
    tabBarBackground: "rgb(255,255,255)",
    searchBoxContainer: "rgb(225, 226, 227)",
    searchBoxText: "rgb(158,159,164)",
    red: "rgb(255,59,48)",
    green: "rgb(52,199,89)",
    white: "rgb(255,255,255)",
    black: "rgb(0,0,0)"
}

export const dark: Palette = {
    primary: "rgb(24,130,196)",
    textColor: "rgb(255,255,255)",
    systemGray: "rgb(142,142,147)",
    systemGray2: "rgb(99,99,102)",
    systemGray3: "rgb(72,72,74)",
    systemGray4: "rgb(58,58,60)",
    systemGray5: "rgb(44,44,46)",
    systemGray6: "rgb(28,28,30",
    appBackground: "rgb(0,0,0)",
    secondaryBackground: "rgb(28,28,30)",
    tabBarBackground: "rgb(0,0,0)",
    searchBoxContainer: "rgb(28,28,30)",
    searchBoxText: "rgb(22,21,25)",
    red: "rgb(255,69,58)",
    green: "rgb(48,209,88)",
    white: "rgb(255,255,255)",
    black: "rgb(0,0,0)"
}

export interface Palette {
    primary: string;
    textColor: string;
    appBackground: string;
    secondaryBackground: string;
    tabBarBackground: string;
    searchBoxContainer: string;
    searchBoxText: string;
    systemGray: string;
    systemGray2: string;
    systemGray3: string;
    systemGray4: string;
    systemGray5: string;
    systemGray6: string;
    red: string;
    green: string;
    white: string;
    black: string;
}