import React, { useState, createContext, useContext } from "react";

interface Message {
    message: string;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
    values: Message[];
    addMessage: (message: string) => void;
}

export const MessagesContext = createContext<Context>(undefined!);

const MessagesContainer: React.FC<Props> = (props: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: string) => {
        messages.push({
            message
        })
    }

   return (
      <MessagesContext.Provider value={{ values: messages, addMessage }}>
         {props.children}
      </MessagesContext.Provider>
   )
};

export const useMessages = (): Context => {
    const messages = useContext<Context>(MessagesContext);
    return messages;
}

export default MessagesContainer;