import Icons from "../components/Icons/Icons";
import SocialIcons from "../components/Icons/SocialIcon";
import { UI } from "../UI/index"
import React from "react"

interface Props {
    children: React.ReactNode;
}

export default function Test({ children }: Props) {
    const [isClick, setIsClick] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])

    const onClick = (e: React.MouseEvent) => {
        setIsClick(true)
        console.log(e.target, e.currentTarget);
        if (e.target === e.currentTarget) {
            
            setIsClick(false)
        }
    }

    return (
        <span
            className={`test d-flex f-center ${isClick ? "active" : ""}`}
            onClick={onClick}
        >
            {children}
 
        </span>
    )
}
