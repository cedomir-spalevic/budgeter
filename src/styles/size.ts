import { Dimensions } from "react-native";

export interface Size {
    pagePadding: number;
    spacerHeight: number;
}

export const size: Size = {
    pagePadding: Dimensions.get("screen").width * 0.05,
    spacerHeight: 20
}