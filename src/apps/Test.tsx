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
            UI.Loading.setKey("page_load", true)
        }, 10)
    }, [])

    return (
        <main className="f-row g-3 w-100 f-center">
            <TabMenu className="f-row g-2">
                <div className="f-col g-2">
                    <TabList className="f-col g-2 p-3" style={{ zIndex: 1501}}>
                        <TabItem id="first">
                            <span>icon</span>
                            First
                        </TabItem>
                        <TabItem id="second">Second</TabItem>
                    </TabList>
                    <TabContent animate={{
                        start: {
                            left: '-15rem',
                        },
                        end: {
                            left: '85.44px',
                        },
                        duration: 350
                    }} style={{ zIndex: 1500 }}>

                        <TabContentItem id="first"></TabContentItem>
                        <TabContentItem id="second" ></TabContentItem>
                    </TabContent>
                </div>
            </TabMenu>

            <section className="f-col ">
                <div>
                    Info of User
                </div>
                <TabMenu defaultTab="first" className="f-col g-2">
                    <TabList className="f-row g-2" style={{ zIndex: 1000}}>
                        <TabItem id="first" disabled>
                            <span>icon</span>
                            First
                        </TabItem>
                        <TabItem id="second">Second</TabItem>
                        <TabItem id="third">Third</TabItem>
                    </TabList>
                    <TabContent style={{ zIndex: 999 }}>
                        <TabContentItem id="first"></TabContentItem>
                        <TabContentItem id="second" ></TabContentItem>
                        <TabContentItem id="third" ></TabContentItem>
                    </TabContent>
                </TabMenu >
            </section>
        </main>
    )
}