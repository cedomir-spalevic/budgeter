import React from "react";
import { makeStyles, useTheme } from "context";
import {
    Menu as RNMenu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
  const { Popover } = renderers;

const useStyles = makeStyles(theme => ({
    menuContainer: {
        backgroundColor: theme.palette.cardColor,
        borderRadius: 10
    },
    menuOptionText: {
        fontFamily: theme.font.fontFamily,
        fontSize: theme.font.regularSize,
        color: theme.palette.textColor,
        padding: 10
    },
    menuOption: {
        marginHorizontal: 5
    },
    menuOptionBorder: {
        borderBottomColor: theme.palette.gray,
        borderBottomWidth: 1
    }
}))

interface Props {
    children: React.ReactNode;
    options: { text: string; onSelect: () => void }[]
}

const Menu: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <RNMenu renderer={Popover} rendererProps={{ placement: "bottom" }}>
            <MenuTrigger>
                {props.children}
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsContainer: styles.menuContainer }}>
                {props.options.map((x, i) => {
                    const menuOptionWrapper = [styles.menuOption]
                    if(i !== props.options.length-1) {
                        menuOptionWrapper.push(styles.menuOptionBorder)
                    }
                    return (
                        <MenuOption
                            onSelect={x.onSelect}
                            text={x.text}
                            customStyles={{
                                optionText: styles.menuOptionText,
                                optionWrapper: menuOptionWrapper
                            }}
                        />
                    )        
                })}
            </MenuOptions>
        </RNMenu>
    )
}

export default Menu;