import { DarkmodeDrop } from "@Components/Darkmode";
import { ButtonPromise, Skeleton } from "@Components/General";
import { Icon } from "@Components/Icons";
import TabContent from "@Components/Tabs/TabContent";
import TabItem from "@Components/Tabs/TabItem";
import TabList from "@Components/Tabs/TabList";
import TabMenu from "@Components/Tabs/TabMenu";

//Darkmode GOOD
//Dialog GOOD
//Dropdown GOOD
//General GOOD
//Icons GOOD
//Resizer FIX
//Select FIX
//Toast GOOD


export default function Test() {

    return (
        <TabMenu default="Item 3" style={{ height: 320, width: 470, }} customize={{
            item: { className: "fs-2 fw-500" },
            activeItem: { className: "fs-2 fw-500 active-tab" },
            content: { className: "tab-content p-3 br-10" }
        }}>
            <TabList >
                <TabItem id="Item 3" custom={<Icon icon='setting' size={34} className="p-1" />} />
                <TabItem id="Item 1" text="Account" />
                <TabItem id="Item 2" text="Darkmode" />
            </TabList>
            <TabContent id="Item 1">
                <h4 className="fs-2 fw-500">Username</h4>
                <p className="mt-1 fs-2" style={{ color: `rgb(var(--fc-text))` }}>Change your username <a className="text-info pointer br-4" href="/">here.</a></p>
                <h4 className="fs-2 fw-500">Password</h4>
                <p className="mt-1 fs-2 text-small" style={{ color: `rgb(var(--fc-text))` }}>dawdwadawdw adaw ng text long tex</p>
            </TabContent>
            <TabContent id="Item 2">
                <DarkmodeDrop />
            </TabContent>
            <TabContent id="Item 3">
                <h4 className="fs-3 fw-600">Setting</h4>
                <div className="f-row g-3 mt-2">
                    <Skeleton className="br-50" style={{ width: '48px', height: '48px' }} />
                    <div className="f-col g-2 f-justify-center f-grow">
                        <Skeleton className="br-max  w-80" />
                        <Skeleton className="br-max  w-50" />
                    </div>
                </div>
            </TabContent>
        </TabMenu>
    )
}