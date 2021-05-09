import React, { createContext, useContext, useRef, useState } from "react";
import {
   NativeScrollEvent,
   NativeSyntheticEvent,
   ScrollView
} from "react-native";

interface Props {
   children: React.ReactNode;
}

interface Context {
   to: (y: number) => void;
   setRef: (ref: React.MutableRefObject<ScrollView>) => void;
   isSwiping: boolean;
   setIsSwiping: (s: boolean) => void;
   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
   scrollEvent: NativeSyntheticEvent<NativeScrollEvent>;
}

const ScrollContext = createContext<Context>(undefined!);

const ScrollProvider: React.FC<Props> = (props: Props) => {
   const scrollViewRef = useRef<ScrollView>();
   const [isSwiping, setIsSwiping] = useState<boolean>(false);
   const [scrollEvent, setScrolLEvent] = useState<
      NativeSyntheticEvent<NativeScrollEvent>
   >();

   const to = (y: number) => {
      if (y < 200 || !scrollViewRef.current) return;
      scrollViewRef.current.scrollTo({ y, animated: true });
   };

   const setRef = (ref: React.MutableRefObject<ScrollView>) => {
      scrollViewRef.current = ref.current;
   };

   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      event.persist();
      setScrolLEvent(event);
   };

   return (
      <ScrollContext.Provider
         value={{ to, setRef, isSwiping, setIsSwiping, onScroll, scrollEvent }}
      >
         {props.children}
      </ScrollContext.Provider>
   );
};

export const useScroll = (): Context => useContext<Context>(ScrollContext);

export default ScrollProvider;
