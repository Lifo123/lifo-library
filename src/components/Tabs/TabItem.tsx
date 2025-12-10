'use client'
import { composeRenderProps, SelectionIndicator, Tab, TabProps } from "react-aria-components"


export function TabItem({ ...props }: TabProps) {
    return (
        <Tab {...props}>
            {composeRenderProps(props.children, (children) => (
                <>
                    {children}
                    <SelectionIndicator />
                </>
            ))}
        </Tab>
    );
}