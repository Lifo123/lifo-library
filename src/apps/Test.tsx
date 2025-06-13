import { useStore } from "@nanostores/react"
import { $preferences } from "../Stores/Preferences.Store"
import { $user } from "../Stores/User.Store"
import { Dropdown, Icon, Notes } from "../components/index"
import { UI } from "../UI/index"
import React from "react"


export default function Test() {
    const PREFERENCES = useStore($preferences)
    const USER = useStore($user)

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", true)
        }, 0)
    }, [])

    return (
        <div className="d-flex f-center f-row f-wrap g-6 f-grow">
            <span className="btn btn-third br-6" onClick={() => {
                UI.Dialog.show({
                    title: 'Dialog title',
                    message: 'Dialog message',
                    custom: <Wasa />,
                    onClick: async () => {
                        await UI.toast.promise(async () => {
                            await new Promise((res) => setTimeout(res, 1000))
                        },
                            {
                                error: 'Error',
                                loading: 'Loading',
                                success: 'Success',
                                richColors: true,
                            })
                    }
                })
            }}>Dialog</span>
        </div>
    )
}

const Wasa = () => {
    return (
        <Notes type="success" note="This is a note." >

        </Notes>
    )
}