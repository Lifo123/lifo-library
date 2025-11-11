import React from "react"
import { Button, Modal, ModalOverlay, RenderProps } from "react-aria-components"
import { useEnterAnimation, useExitAnimation, uuid } from "../utils";
import { Tooltip } from "../components/General/Tooltip";
import { Toaster } from "../components/Toast/Toaster";
import { Icon } from "public-icons";
import ButtonPromise from "../components/Buttons/ButtonPromise";
import { ButtonUpload } from "../components";


export default function Main({ children }: any) {
    const [isOpen, setIsOpen] = React.useState(false);


    const asyncFunct = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return (
        <div className="f-col f-center gap-2 fs-[15px]">
            <Toaster />

            <Tooltip text="Testing tooltip">
                <Button className="btn btn-primary rounded-md" onPress={() => {
                   
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
        </div >
    )
}