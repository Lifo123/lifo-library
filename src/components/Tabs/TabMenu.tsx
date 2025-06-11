'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface TabMenuProps extends BaseComponentProps {
    children?: React.ReactNode;
    default?: string;
    customize?: {
        item?: BaseComponentProps;
        activeItem?: BaseComponentProps;
        content?: BaseComponentProps;
    }
}

export const TabContext = React.createContext<{
    select: string;
    setSelect: (id: string) => void;
    customize?: {
        content?: BaseComponentProps;
        item?: BaseComponentProps;
        activeItem?: BaseComponentProps;
    };
}>({
    select: "",
    setSelect: () => { },
});


export default function TabMenu({ children, ...props }: TabMenuProps) {
    const [select, setSelect] = React.useState<string>(props.default || "");

    return (
        <TabContext.Provider value={{
            select, setSelect,
            customize: props.customize
        }}>
            <section className={props.className || `tab-container f-col mt-4 g-2`} style={props.style}>
                {children}
            </section>
        </TabContext.Provider>
    )
}