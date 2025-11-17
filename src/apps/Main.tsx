import React from "react"
import {
    $loading, Toaster, Tooltip, Button, ButtonPromise, ButtonUpload, Menu,
    MenuContent, MenuItem, SubMenuItem, Tabs, TabList, TabPanel, TabItem,
    toast,
    dialog,
    PressableIcon
} from '../index.js';

import {
    Scroll, Sort,
} from '../utils/index.js'

import {

} from '../Stores/index.js'
import { Dialog, DialogTrigger, Popover, ToggleButton, ToggleButtonGroup, Toolbar } from "react-aria-components";
import { Icon } from "public-icons";

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
        <div className="f-col f-center gap-4 fs-[15px]">

            <Button className={'btn btn-primary fw-475 rounded-md'} onPress={async () => {
                dialog.show({
                    title: 'Dialog title',
                    description: 'Dialog description add more description for better understanding and need more xd.',
                    PrimaryAction: async () => {
                        await new Promise(resolve => setTimeout(resolve, 1000))
                    },

                })
            }}>
                Open dialog
            </Button>

            <div className="f-row gap-3 w-md f-wrap f-center">
                <Button className={'btn btn-primary rounded-md'}>
                    Primary
                </Button>
                <Button className={'btn btn-secondary rounded-md'}>
                    Secondary
                </Button>
                <Button className={'btn btn-outline rounded-md'}>
                    Outline
                </Button>
                <Button className={'btn btn-ghost rounded-md'}>
                    Ghost
                </Button>
                <Button className={'btn btn-red rounded-md'}>
                    Destructive
                </Button>
                <Button className={'btn btn-red-out rounded-md'}>
                    Delete
                </Button>
                <Button className={'btn btn-blue rounded-md'}>
                    Describe
                </Button>
                <Button className={'btn btn-blue-out rounded-md'}>
                    Info
                </Button>
                <Button className={'btn btn-green rounded-md'}>
                    Success
                </Button>
                <Tooltip text="wasa" tooltipProps={{placement: 'bottom'}}>
                    <Button className={'btn btn-green-out rounded-md'}>
                        Aprove
                    </Button>
                </Tooltip>
            </div>
            <div className="f-col bg-gray-2 border border-gray-5 p-4 rounded-xl">
                <h1 className="text-p fw-600 text-gray-12">Title for anytinh</h1>
                <p className="text-p2 fw-475 text-gray-11">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quis.</p>
                <p className="fs-13 fw-400 text-gray-11">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quis.</p>
            </div>
            <div className="f-col bg-gray-2 border border-gray-4 p-5 rounded-xl">
                <h1 className="text-p fw-600 text-gray-12">This action cant be undone</h1>
                <p className="text-p2 fw-475 text-gray-11">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quis.</p>
                <div className="f-row gap-3 mt-6 justify-end items-center">
                    <Button className={'btn btn-outline rounded-md'}>
                        Back
                    </Button>
                    <Button className={'btn btn-red-out rounded-md'}>
                        Delete file
                    </Button>
                    <Menu >
                        <PressableIcon
                            icon="ellipsis"
                            size={18}
                            rotate={90}
                            className={'h-8 aspect-square flex f-center btn-ghost rounded-md pointer'}
                        />
                        <MenuContent popover={{
                            placement: 'bottom right',
                            offset: 10,
                        }}>
                            <MenuItem>
                                <span className="f-row gap-3">
                                    <Icon icon="setting" size={20} color="var(--color-gray-11)" />
                                    Settings
                                </span>
                            </MenuItem>
                            <MenuItem>
                                <span className="f-row gap-3">
                                    <Icon icon="user" size={20} color="var(--color-gray-11)" />
                                    Account
                                </span>
                            </MenuItem>
                            <Tooltip text="Im tooltip" tooltipProps={{ placement: 'right' }} defaultOpen>
                                <MenuItem
                                    className={'f-row gap-3 px-2 py-1.5 hover:bg-gray-3 text-red-400 rounded-md outline-none h-9 items-center select-none pointer'}
                                >
                                    <Icon icon="trash" size={20} color="var(--color-red-400)" />
                                    Delete
                                </MenuItem>
                            </Tooltip>
                        </MenuContent>
                    </Menu>
                </div>
            </div>

            <div className="f-row gap-1">
                <div className="h-12 aspect-square bg-gray-1"></div>
                <div className="h-12 aspect-square bg-gray-2"></div>
                <div className="h-12 aspect-square bg-gray-3"></div>
                <div className="h-12 aspect-square bg-gray-4"></div>
                <div className="h-12 aspect-square bg-gray-5"></div>
                <div className="h-12 aspect-square bg-gray-6"></div>
                <div className="h-12 aspect-square bg-gray-7"></div>
                <div className="h-12 aspect-square bg-gray-8"></div>
                <div className="h-12 aspect-square bg-gray-9"></div>
                <div className="h-12 aspect-square bg-gray-10"></div>
                <div className="h-12 aspect-square bg-gray-11"></div>
                <div className="h-12 aspect-square bg-gray-12"></div>
            </div>

            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
            <p className="mt-16">wadwd</p>
        </div >
    )
}