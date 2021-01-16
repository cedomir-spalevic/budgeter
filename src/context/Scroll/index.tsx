import React, { createContext, useContext, useRef } from "react";
import { ScrollView } from "react-native";

interface Props {
    children: React.ReactNode;
}

interface Context {
    to: (y: number) => void;
    setRef: (ref: React.MutableRefObject<ScrollView>) => void;
}

export const ScrollContext = createContext<Context>(undefined!);

const ScrollProvider: React.FC<Props> = (props: Props) => {
    const scrollViewRef = useRef<ScrollView>();

    const to = (y: number) => {
        if(y < 200 || !scrollViewRef.current)
            return;
        scrollViewRef.current.scrollTo({ y: y, animated: true })
    }

    const setRef = (ref: React.MutableRefObject<ScrollView>) => {
        scrollViewRef.current = ref.current;
    }

    return (
        <ScrollContext.Provider value={{ to, setRef }}>
            {props.children}
        </ScrollContext.Provider>
    )
};

export const useScroll = (): Context => useContext<Context>(ScrollContext);

export default ScrollProvider;