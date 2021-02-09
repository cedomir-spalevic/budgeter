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
        backgroundColor: theme.palette.secondaryBackground,
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
        borderBottomColor: theme.palette.systemGray,
        borderBottomWidth: 1
    },
    menuAnchor: {
        backgroundColor: theme.palette.secondaryBackground
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
        <RNMenu renderer={Popover} rendererProps={{ placement: "bottom", anchorStyle: styles.menuAnchor }}>
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