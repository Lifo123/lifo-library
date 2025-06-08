'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface TabMenuProps extends BaseComponentProps {
    children: React.ReactNode;
    default?: string;
}

export const TabContext = React.createContext<{
    select: string;
    setSelect: (id: string) => void;
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    setActiveClassName: (c?: string) => void;
    setActiveStyle: (s?: React.CSSProperties) => void;
}>({
    select: "",
    setSelect: () => { },
    setActiveClassName: () => { },
    setActiveStyle: () => { },
});


export default function TabMenu({ children, ...props }: TabMenuProps) {
    const [select, setSelect] = React.useState<string>(props.default || "");
    const [activeClassName, setActiveClassName] = React.useState<string>();
    const [activeStyle, setActiveStyle] = React.useState<React.CSSProperties>();

    return (
        <TabContext.Provider value={{
            select, setSelect,
            activeClassName, setActiveClassName,
            activeStyle, setActiveStyle
        }}>
            <section className={props.className || `tab-container f-col mt-4 g-2`} style={props.style}>
                {children}
            </section>
        </TabContext.Provider>
    )
}