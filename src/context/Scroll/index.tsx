import React, { createContext, useContext } from "react";
import { LayoutChangeEvent, ScrollView } from "react-native";

interface Props {
    scrollView: React.MutableRefObject<ScrollView>;
    children: React.ReactNode;
}

interface Context {
    to: (event: LayoutChangeEvent) => void;
}

export const ScrollContext = createContext<Context>(undefined!);

const ScrollProvider: React.FC<Props> = (props: Props) => {

    const to = (event: LayoutChangeEvent) => {
        console.log(event);
        alert("here")
        props.scrollView.current.scrollTo({ y: event.nativeEvent.layout.y, animated: true })
    }

    return (
        <ScrollContext.Provider value={{ to }}>
            {props.children}
        </ScrollContext.Provider>
    )
};

export const useScroll = (): Context => useContext<Context>(ScrollContext);

export default ScrollProvider;