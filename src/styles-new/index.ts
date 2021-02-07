import { font, Font } from "./font";
import { Palette, light, dark } from "./palette";
import { size, Size } from "./size";

export interface Theme {
    palette: Palette;   
    size: Size;
    font: Font;
}

export const lightTheme: Theme = {
    palette: light,
    size: size,
    font: font
}

export const darkTheme: Theme = {
    palette: dark,
    size: size,
    font: font
}