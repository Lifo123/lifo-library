import { TabContent, TabItem, TabList, TabMenu } from "@Components/Tabs";
import { ButtonPromise } from "@Components/General";
import UI from "src/UI/index";
import { Dropdown } from "@Components/Dropdown";
import { Icon } from "@Components/Icons";


export default function Wasa() {
    return (
        <TabMenu default="1" className="w-100 f-col g-2">
            <TabList >
                <TabItem id="1" text="My workspaces" />
                <TabItem id="2" text="Shared with me" />
            </TabList>
            <TabContent id="1" >
                <Dropdown custom={<Icon icon="setting" />}
                    margin={4}
                    items={[
                        [{ text: "Hello" }, {
                            text: "World",
                            onClick: async () => {
                                await UI.Loading.promise(async () => await new Promise((res) => setTimeout(res, 1000)), "card_loading")
                            }
                        }],
                        [{ text: "Other" }, {
                            text: "Thing",
                            onClick: async () => {
                                await UI.Loading.promise(async () => await new Promise((res) => setTimeout(res, 1000)), "card_loading")
                            }
                        }],
                        [{ text: "Log out", icon: "setting" }]
                    ]} />
            </TabContent>
            <TabContent id="2" >
                <ButtonPromise text="Create new workspace" onClick={async () => {
                    await UI.Loading.promise(async () => await new Promise((res) => setTimeout(res, 1000)), "card_loading")
                }} />
            </TabContent>
        </TabMenu>
    )
}