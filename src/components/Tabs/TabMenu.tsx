'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface TabMenuProps extends BaseComponentProps {
    defaultTab?: string;
    children?: React.ReactNode;
    customize?: {
        item?: BaseComponentProps;
        contentItem?: BaseComponentProps;
        indicator?: BaseComponentProps;
    }
}

export const TabContext = React.createContext<{
    select: string;
    setSelect: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    customize?: {
        item?: BaseComponentProps;
        content?: BaseComponentProps;
        indicator?: BaseComponentProps;
    };
}>({
    select: "",
    isOpen: false,
    setIsOpen: () => { },
    setSelect: () => { },
});


export default function TabMenu({ children, ...props }: TabMenuProps) {
    const [select, setSelect] = React.useState<string>(props.defaultTab || "");
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <TabContext.Provider value={{
            select, setSelect,
            isOpen, setIsOpen,
            customize: props.customize
        }}>
            <section
                className={'tab-menu ' + (props.className || 'tab-container f-col mt-4 g-2') + ' relative'}
                style={props.style}
                data-tabmenu={'true'}
            >
                {children}
            </section>
        </TabContext.Provider >
    )
}