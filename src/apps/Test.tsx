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
        <div className="mt-5 f-row g-4" data-target>
            <DarkmodeToggle />
            <Dropdown text="Open Dropdown" items={[
                [{ text: 'Item 1' }, { text: 'Item 2' }],
                [{ text: 'Item 3' }, { text: 'Item 4' }],
                [{
                    text: 'Item 5', onClick() {
                        Dialog.normal({
                            title: 'Dialog',
                            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptas.',
                            onClick: async () => await new Promise((resolve) => setTimeout(resolve, 2000))
                        })
                    }
                }],
            ]}/>
            <span className="btn btn-primary btn-promise br-6 fs-2" onClick={() => {
                Loading.promise(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                }, 'card_loading')
            }}>Fetch</span>
        </div>
    )
}