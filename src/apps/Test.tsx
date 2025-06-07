import { DarkmodeToggle } from "@Components/Darkmode"
import { Dialog } from "@Components/Dialoger"
import Dropdown from "@Components/Dropdown/Dropdown"
import { Loading } from "src/Stores"


//Darkmode GOOD
//Dialog GOOD
//Dropdown FIX
//General GOOD
//Icons GOOD
//Resizer FIX
//Select FIX
//Toast GOOD

export default function Test() {
    return (
        <div className="lb-md mt-5 f-col g-2 f-align-start" data-target>
            <h1 className="title">Hello</h1>
            <h2 className="subtitle">Lorem ipsum dolor</h2>
            <p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo assumenda at expedita rem aliquam blanditiis!</p>
            <p className="text-small text-error text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo assumenda at expedita rem aliquam blanditiis!</p>
        </div>
    )
}