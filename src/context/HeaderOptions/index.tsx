import React, { createContext, useContext, useState } from "react";

interface HeaderOptions {
    leftActions?: JSX.Element;
    rightActions?: JSX.Element;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
    options: HeaderOptions;
    setOptions: (options: HeaderOptions) => void;
}

export const HeaderOptionsContext = createContext<Context>(undefined!);

const HeaderOptionsProvider: React.FC<Props & any> = (props: Props) => {
    const [options, setOptions] = useState<HeaderOptions>({});

    const set = (o: HeaderOptions) => {
        // if(o !== options)
        //     setOptions(o);
    }
    
    return (
        <HeaderOptionsContext.Provider value={{ options, setOptions: set }}>
            {props.children}
        </HeaderOptionsContext.Provider>
    )
};

export const useHeaderOptions = (): Context => useContext<Context>(HeaderOptionsContext);

export default HeaderOptionsProvider;