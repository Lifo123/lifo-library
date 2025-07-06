import Icons from "../components/Icons/Icons";
import SocialIcons from "../components/Icons/SocialIcons";
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
        <div className="f-col f-center g-2">

            <Icons icon="search" className="pointer" size={24} onClick={() => {
                console.log('clicked')
            }}/>
            <p className="m-0">pedro</p>
            <SocialIcons icon="reddit" size={24} />
        </div>
    )
}
