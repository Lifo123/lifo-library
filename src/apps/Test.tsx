import { useStore } from "@nanostores/react"
import { $preferences } from "../Stores/Preferences.Store"
import { $user } from "../Stores/User.Store"
import { CircleLoading, DarkmodeDrop, TabContent, TabItem, TabMenu } from "../components/index"
import { UI } from "../UI/index"
import React from "react"
import TabList from "../components/Tabs/TabList"
import TabContentItem from "../components/Tabs/TabContentItem"


export default function Test() {
    const PREFERENCES = useStore($preferences)
    const USER = useStore($user)

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 500)
    }, [])

    return (
        <main className="f-row g-3 w-100 f-center">
            <section className="f-col ">
                <div>
                    Info of User
                </div>
                <TabMenu defaultTab="first" className="f-col g-2" customize={{

                    indicator: {
                        className: 'pr-btn active br-6'
                    }
                }}> 
                    <TabList className="f-row" style={{ zIndex: 1000}} indicatorTransition={0}>
                        <TabItem id="first">
                            <span>icon</span>
                            First
                        </TabItem>
                        <TabItem id="second">Second</TabItem>
                        <TabItem id="third">Third</TabItem>
                    </TabList>
                    <TabContent style={{ zIndex: 999 }}>
                        <TabContentItem id="first">
                            <span className="btn btn-third br-6" onClick={() => {
                                UI.toast.success("Clicked", {
                                    
                                })
                            }}>top-center</span>
                        </TabContentItem>
                        <TabContentItem id="second" ></TabContentItem>
                        <TabContentItem id="third" ></TabContentItem>
                    </TabContent>
                </TabMenu >
            </section>
        </main>
    )
}