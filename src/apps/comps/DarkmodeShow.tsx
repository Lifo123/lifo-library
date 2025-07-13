import { DarkmodeDrop, DarkmodeIcon, DarkmodeToggle } from "../../components";

interface DarkmodeShowProps {

}

export default function DarkmodeShow() {
    return (
        <div className="f-row gap-4 f-center ">
            <DarkmodeIcon />
            <DarkmodeToggle />
            <DarkmodeDrop />
        </div>
    )
}