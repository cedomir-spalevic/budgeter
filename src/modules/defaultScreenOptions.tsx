import React from "react";
import {
   StackHeaderProps,
   StackNavigationOptions
} from "@react-navigation/stack";
import { Header } from "components";
import { Scene } from "components/Header/types";
import { Route } from "@react-navigation/native";

const getDefaultScrenOptions = (isModal: boolean): StackNavigationOptions => ({
   header: (props: StackHeaderProps) => (
      <Header
         isModal={isModal}
         layout={props.layout}
         mode={props.mode}
         insets={props.insets}
         scene={props.scene as Scene<Route<string>>}
         previous={props.previous as Scene<Route<string>>}
         navigation={props.navigation}
         styleInterpolator={props.styleInterpolator}
      />
   )
});

export default getDefaultScrenOptions;
