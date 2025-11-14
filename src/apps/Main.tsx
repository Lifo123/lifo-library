import React from "react"
import {
    $loading, Toaster, Tooltip, Button, ButtonPromise, ButtonUpload, Menu,
    MenuContent, MenuItem, SubMenuItem, Tabs, TabList, TabPanel, TabItem,
    toast
} from '../index.js';

import {
    ManageLocal, Scroll, Sort,
} from '../utils/index.js'

import {

} from '../Stores/index.js'

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
            <Button className={'btn btn-primary'} onPress={async () => {
                toast.show('测试成功')
            }}>异步加载</Button>
        </div >
    )
}