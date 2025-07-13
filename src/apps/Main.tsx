import React from "react"
import { UI } from "../UI/index"
import ToastShow from "./comps/ToastShow";
import DarkmodeShow from "./comps/DarkmodeShow";
import { TabContent, TabContentItem, TabItem, TabList, TabMenu } from "../components";
import Icons, { typeIcons } from "../components/Icons/Icons";


interface Props {
    children?: React.ReactNode;
}

export default function Test({ children }: Props) {


    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])


    return (
        <div className="f-col f-center gap-2 ">
            <TabMenu defaultTab="darkmode" className="f-col gap-4 w-full max-w-5xl">
                <TabList className="f-row">
                    <TabItem id="darkmode">Darkmode</TabItem>
                    <TabItem id="toast">Toast</TabItem>
                    <TabItem id="dialoger">Dialoger</TabItem>
                    <TabItem id="dropdown">Dropdown</TabItem>
                    <TabItem id="general">General</TabItem>
                    <TabItem id="icons">Icons</TabItem>
                    <TabItem id="loading">Loading</TabItem>
                    <TabItem id="tabs">Tabs</TabItem>
                    <TabItem id="select">Select</TabItem>
                </TabList>
                <TabContent className="f-col f-center">
                    <TabContentItem id="darkmode" children={<DarkmodeShow />} />
                    <TabContentItem id="toast" children={<ToastShow />} />
                    <TabContentItem id="dialoger" />
                    <TabContentItem id="dropdown" />
                    <TabContentItem id="general" />
                    <TabContentItem id="icons" className="tab-content-item p-3 f-row f-wrap gap-3 f-center h-full w-full rounded-lg" >
                        {
                            Object.keys(typeIcons).map(icon => (
                                <Icons key={icon} icon={icon as keyof typeof typeIcons} size={28} />
                            ))
                        }
                    </TabContentItem>
                    <TabContentItem id="loading" />
                    <TabContentItem id="tabs" />
                    <TabContentItem id="select" />
                </TabContent>
            </TabMenu>
        </div >
    )
}
