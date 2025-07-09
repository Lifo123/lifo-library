import { ButtonPromise, Dropdown } from "../components";
import UploadBtn from "../components/General/ButtonUpload";
import Icons from "../components/Icons/Icons";
import SocialIcons from "../components/Icons/SocialIcons";
import { ToastIcons } from "../components/Toast/ToastAssets";
import { UI } from "../UI/index"
import React from "react"

interface Props {
    children?: React.ReactNode;
}

export default function Test({ children }: Props) {
    const [isClick, setIsClick] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])


    return (
        <div className="f-col f-center gap-2 ">
            <span className="btn btn-third pointer f-row gap-2 select" onClick={() => {
                UI.toast.success('Succes: Data proved', {
                    id: 120341,
                    closeBtn: true,
                    action: async () => {
                        await new Promise(res => setTimeout(res, 1000))
                    },
                    href: 'wasadawd',
                    actionText: 'More'
                })
            }}>
                Error
            </span>

            <div className="f-row gap-3 f-center mt-5">
                {ToastIcons.loading}
                {ToastIcons.error}
                {ToastIcons.success}
                {ToastIcons.warning}
                {ToastIcons.info}
                <Icons icon="checkSolid" size={20} />
            </div>
            <div className="btn btn-fourth btn mt-3" onClick={() => {
                UI.Dialog.show({
                    title: 'Title',
                    message: 'Message',
                    closeBtn: true,
                    animate: {
                        duration: 0
                    },
                    onClick: async () => {
                        await new Promise(res => setTimeout(res, 1000))
                    }
                })
            }}>
                Dailog
            </div>

            <div className="f-col gap-3 mt-5 f-center">
                <ButtonPromise text="Get API key" onClick={async () => {
                    await new Promise(res => setTimeout(res, 1000000))
                }} />

                <Dropdown text="hola pipol" items={[
                    [
                        { text: "Ir a mas", icon: <Icons icon="redirectArrow" size={20} style={{color: 'var(--color-lifo-text)'}} y={-2}/> },
                        { text: 'pollo' },
                        { text: 'puta' }
                    ],
                    [{ text: "Log out", icon: <Icons icon="logOut" size={20}/> }]
                ]}/>
                <UploadBtn />
            </div>
        </div>
    )
}
