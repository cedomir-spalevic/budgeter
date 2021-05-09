import {
   StackNavigationProp,
   StackHeaderStyleInterpolator
} from "@react-navigation/stack";
import {
   NavigationProp,
   ParamListBase,
   Route,
   StackNavigationState
} from "@react-navigation/native";
import {
   Layout,
   StackNavigationOptions
} from "@react-navigation/stack/lib/typescript/src/types";
import { EdgeInsets } from "react-native-safe-area-context";
import { Animated, StyleProp, ViewStyle } from "react-native";

export interface ExtraNavigationProps {
   containerBackground?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

export type StackDescriptor = {
   render(): JSX.Element;
   options: ExtraNavigationProps & StackNavigationOptions;
   navigation: NavigationProp<
      Record<string, Record<string, unknown> | undefined>,
      string,
      StackNavigationState,
      StackNavigationOptions,
      Record<
         string,
         {
            data?: string | number | boolean;
            canPreventDefault?: boolean | undefined;
         }
      >
   >;
};

export type Scene<T> = {
   route: T;
   descriptor: StackDescriptor;
   progress: {
      current: Animated.AnimatedInterpolation;
      next?: Animated.AnimatedInterpolation;
      previous?: Animated.AnimatedInterpolation;
   };
};

export type StackHeaderProps = {
   mode: "float" | "screen";
   layout: Layout;
   insets: EdgeInsets;
   scene: Scene<Route<string>>;
   previous?: Scene<Route<string>>;
   navigation: StackNavigationProp<ParamListBase>;
   styleInterpolator: StackHeaderStyleInterpolator;
};