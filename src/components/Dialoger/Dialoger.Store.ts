import { map } from "nanostores";
import type { DialogPropsCustomTypes, DialogPropsTypes, DialogTypes } from "./Dialoger.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";


const $Dialoger = map<DialogTypes>({
    bgColor: '#0000003b',
    isVisible: false,
    isAnimate: false,
})


const create = ({ ...props }) => {
    Scroll.hide();
    $Dialoger.set({
        ...props,
        isVisible: true,
    })

    setTimeout(() => {
        $Dialoger.setKey("isAnimate", true);
    }, 10);

}

const hide = async () => {
    const DATA = $Dialoger.get();

    $Dialoger.setKey("isAnimate", false);
    await new Promise(() => {
        Scroll.show();
        setTimeout(() => {
            $Dialoger.set({
                isVisible: false,
            });
        }, DATA.animate?.duration || 300)
    });
};




const normal = ({ ...props }: DialogPropsTypes) => {
    create({
        ...props,
        children: null
    })
}

const custom = (node: React.ReactNode, props?: DialogPropsCustomTypes) => {
    create({
        ...props,
        children: node
    })
}



const Dialog = {
    normal,
    custom,
    hide
}

export default Dialog
export const DialogDev = {
    $Dialoger
}
