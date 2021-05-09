import React from "react";
import {
   StackHeaderProps,
   StackNavigationOptions
} from "@react-navigation/stack";
import { Header } from "components";

const getDefaultScrenOptions = (isModal: boolean): StackNavigationOptions => ({
   header: (props: StackHeaderProps) => (
      <Header
         isModal={isModal}
         layout={props.layout}
         mode={props.mode}
         insets={props.insets}
         scene={props.scene}
         previous={props.previous}
         navigation={props.navigation}
         styleInterpolator={props.styleInterpolator}
      />
   )
});

export default getDefaultScrenOptions;
