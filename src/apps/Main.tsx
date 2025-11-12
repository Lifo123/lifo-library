import React from "react"
import { 
    $loading, Toaster, Dialoger, Tooltip, Button, dialog, ButtonPromise, ButtonUpload, Menu,
    MenuContent, MenuItem, SubMenuItem, Tabs, TabList, TabPanel, TabItem
} from '../index.js';

export default function Main({ children }: any) {
    const [isOpen, setIsOpen] = React.useState(false);


    const asyncFunct = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    React.useEffect(() => {
        setTimeout(() => {
            $loading.setKey('page_load', false)
        }, 150)
    }, [])

    return (
        <div className="f-col f-center gap-2 fs-[15px]">
            <Toaster />
            <Dialoger />
            <Tooltip text="Testing tooltip">
                <Button className="btn btn-primary rounded-md" onPress={() => {
                    dialog.open({
                        title: 'Title',
                        description: 'Description',
                    })
                }}>
                    Primary
                </Button>
            </Tooltip>

            <ButtonPromise
                onPress={async () => {
                    await asyncFunct();
                }}
            >
                Promise
            </ButtonPromise>

            <ButtonUpload />

            <Menu>
                <Button className={'btn btn-third rounded-md'}>
                    Open menu
                </Button>
                <MenuContent >
                    <MenuItem kbd="ctrl K">Menu item 1</MenuItem>
                    <MenuItem>Menu item 2</MenuItem>
                    <SubMenuItem label="wasa" >
                        <MenuItem>Submenu item 1</MenuItem>
                        <MenuItem>Submenu item 2</MenuItem>
                        <MenuItem>Submenu item 3</MenuItem>
                        <SubMenuItem label="3sub menu" >
                            <MenuItem kbd="ctrl K">Menu item 1</MenuItem>
                            <MenuItem>Submenu item 1</MenuItem>
                            <MenuItem>Submenu item 2</MenuItem>
                            <MenuItem>Submenu item 3</MenuItem>
                        </SubMenuItem>
                    </SubMenuItem>
                </MenuContent>
            </Menu>

            <Tabs>
                <TabList aria-label="History of Ancient Rome">
                    <TabItem id="home">Home</TabItem>
                    <TabItem id="search">Search</TabItem>
                    <TabItem id="notifications">Notifications</TabItem>
                </TabList>
                <TabPanel id="home">Home content</TabPanel>
                <TabPanel id="search">Search content</TabPanel>
                <TabPanel id="notifications">Notifications content</TabPanel>
            </Tabs>

            <div className="f-row bg-info-a3 p-4 rounded-lg border border-info-6 light:bg-info-4">
                <p className="fs-16 fw-400 text-info-10">Brillo</p>
            </div>
            <div className="f-row bg-success-3 p-4 rounded-lg border border-success-6">
                <p className="fs-16 fw-400 text-success-a10">Brillo</p>
            </div>
            <div className="f-row bg-error-a3 p-4 rounded-lg border border-error-6">
                <p className="fs-16 fw-400 text-error-10">Brillo</p>
            </div>
            <div className="f-row bg-warn-a3 p-4 rounded-lg border border-warn-6">
                <p className="fs-16 fw-400 text-warn-11">Brillo</p>
            </div>
        </div >
    )
}