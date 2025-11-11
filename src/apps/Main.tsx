import React from "react"
import UI, { toast } from "../UI"
import { Button, Modal, ModalOverlay, RenderProps } from "react-aria-components"
import { Dialoger, $dialogStore, dialog } from "../components/Dialog/index.js";
import { useEnterAnimation, useExitAnimation, uuid } from "../utils";
import { Tooltip } from "../components/General/Tooltip";

import { Toaster } from "../components/Toast/Toaster";
import { DarkmodeToggle } from "../components";
import { Icon } from "public-icons";


export default function Main({ children }: any) {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])

    const asyncFunct = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return (
        <div className="f-col f-center gap-2 fs-[15px]">
            <Toaster />
            <Dialoger />
            <Tooltip text="Testing tooltip">
                <Button className="btn btn-primary rounded-md" onPress={() => {
                    dialog.open({
                        title: 'Dialog title',
                        description: 'Dialog description',
                    })
                }}>
                    Primary
                </Button>
            </Tooltip>
        </div >
    )
}