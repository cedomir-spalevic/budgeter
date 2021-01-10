import { Dimensions } from "react-native";

export interface Size {
    pagePadding: number;
}

export const size: Size = {
    pagePadding: Dimensions.get("screen").width * 0.05
}