import { TabContent, TabItem, TabList, TabMenu } from "@Components/Tabs";
import UI from "src/UI/index";
import React from "react";
import { CloseBtn } from "@Components/General";
import { DarkmodeDrop, DarkmodeToggle } from "@Components/Darkmode";

export default function Wasa() {

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", true)
        }, 0)
    }, [])

    return (
        <TabMenu default="1" className="w-100 f-col g-2">
            <TabList >
                <TabItem id="1" text="My workspaces" />
                <TabItem id="2" text="Shared with me" />
            </TabList>
            <TabContent id="2" >
                <div className="f-row g-2 f-center">
                    <span className="btn btn-primary br-6"> Primary</span>
                    <span className="btn btn-secondary br-6"> Secondary</span>
                    <span className="btn btn-third br-6"> Third</span>
                    <span className="btn btn-fourth br-6"> Fourth</span>
                </div>
            </TabContent>
            <TabContent id="1" >
                <div className="f-col f-center g-2 mt-3">
                    <div className="f-row f-center g-2">
                        <span className="btn btn-third br-4" onClick={() => UI.toast.show('top-left', {
                            position: 'top-left',
                            noDissapear: true,
                            closeBtn: true,
                            animation: 'custom',
                            animate: {
                                start: {
                                    top: '-1.8rem',
                                    left: '-1.8rem',
                                },
                                end: {
                                    top: '5rem',
                                    left: '5rem',
                                }
                            }
                        })}>
                            top-left
                        </span>
                        <span className="btn btn-third br-4" onClick={() => UI.toast.show('top-center', { position: 'top-center', noDissapear: true })}>
                            top-center
                        </span>
                        <span className="btn btn-third br-4" onClick={() => UI.toast.show('top-right', { position: 'top-right', noDissapear: true })}>
                            top-right
                        </span>
                    </div>
                    <div className="f-row f-center g-2">
                        <span className="btn btn-third br-4" onClick={() => UI.toast.custom(<span>custom</span>, { position: 'bottom-left', noDissapear: true })}>
                            bottom-left
                        </span>
                        <span className="btn btn-third br-4" onClick={() => UI.toast.show('bottom-center', { position: 'bottom-center', noDissapear: true })}>
                            bottom-center
                        </span>
                        <span className="btn btn-third br-4" onClick={() => UI.toast.show('bottom-right', { position: 'bottom-right' })}>
                            bottom-right
                        </span>
                    </div>
                    <span className="btn btn-third br-4" onClick={() => {
                        UI.toast.dismissFirst()
                    }}>
                        Dismiss first
                    </span>
                    <span className="btn btn-third br-4" onClick={() => {
                        UI.Dialog.show({
                            title: 'Dialog title',
                            message: 'Dialog message',
                        })
                    }}>
                        Dialog
                    </span>
                    <CloseBtn />
                    <DarkmodeDrop />
                    <DarkmodeToggle />
                </div>

            </TabContent>
        </TabMenu>
    )
}