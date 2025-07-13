import { ButtonPromise, Dropdown, TabContent, TabContentItem, TabItem, TabList, TabMenu } from "../components";
import UploadBtn from "../components/General/ButtonUpload";
import Icons from "../components/Icons/Icons";
import SocialIcons from "../components/Icons/SocialIcons";
import { ToastIcons } from "../components/Toast/ToastAssets";
import { UI } from "../UI/index"
import React from "react"
import { Scroll } from "../utils";

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

            <div className="btn btn-fourth btn mt-3" onClick={() => {
                UI.Dialog.show({
                    title: 'Title',
                    description: 'Message',
                    closeBtn: true,
                    onClick: async () => {
                        await new Promise(res => setTimeout(res, 100))
                        UI.Dialog.show({
                            title: 'Wasa dialog 2',
                            description: 'Message',
                            animation: 'none',
                            onClick: async () => {
                                await new Promise(res => setTimeout(res, 100))
                                UI.Dialog.show({
                                    title: 'Wasa dialog 232132',
                                    description: 'Message',
                                    animation: 'none',
                                })
                            }
                        })
                    }
                })
            }}>
                Dailog
            </div>

            <div className="f-col gap-3 mt-5 f-center">

                <Dropdown text="hola pipol" className="btn btn-fourth rounded-md"  frezzeScroll items={[
                    [
                        { text: "Ir a mas", icon: <Icons icon="redirectArrow" size={20} style={{ color: 'var(--color-lifo-text)' }} y={-1} /> },
                        { text: 'pollo' },
                        { text: 'puta' }
                    ],
                    [{
                        text: "Log out",
                        icon: <Icons icon="logOut" size={20} />,
                        onClick: async () => {
                            UI.Dialog.show({
                                title: 'Title',
                                description: 'Message',
                                closeBtn: true,
                                onClick: async () => {
                                    await new Promise(res => setTimeout(res, 100))
                                    UI.Dialog.show({
                                        title: 'Wasa dialog 2',
                                        description: 'Message',
                                        animation: 'none',
                                    })
                                }
                            })
                        }
                    }]
                ]} />
            </div>
            <span className="btn btn-third" onClick={() => {
                UI.toast.success('Succes: Data proved', {noDissapear: true})
            }}>
                toast
            </span>

            <span className="btn btn-third" onClick={() => {
                Scroll.hide()
            }}>
                Scroll Hide
            </span>

            <span className="btn btn-third" onClick={() => {
                Scroll.show()
            }}>
                Scroll Show
            </span>

            <TabMenu defaultTab="wasa" customize={{
                indicator: {}
            }}>
                <TabList className="f-row" indicatorTransition={0}>
                    <TabItem id="wasa">first</TabItem>
                    <TabItem id="perro">second</TabItem>
                    <TabItem id="lacra">third</TabItem>
                </TabList>
                <TabContent>
                    <TabContentItem id="wasa">hola mundo</TabContentItem>
                    <TabContentItem id="perro">hola perro</TabContentItem>
                    <TabContentItem id="lacra">hola lacra</TabContentItem>
                </TabContent>
            </TabMenu>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
            <p className="mb-5">wasa</p>
        </div>
    )
}
