import { map } from "nanostores";
import type { DialogPropsCustomTypes, DialogPropsTypes, DialogTypes } from "./Dialoger.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";


export const $Dialoger = map<DialogTypes>({
    bgColor: '#0000003b',
    isVisible: false,
    isAnimate: false,
})


const create = ({ ...props }) => {
    Scroll.hide();

    $Dialoger.set({
        ...props,
        animate: {
            start: { ...props.animate?.start },
            end: { ...props.animate?.end },
            duration: props.animate?.duration / 1000,
        },
        isVisible: true,
    })

    setTimeout(() => {
        $Dialoger.setKey("isAnimate", true);
    }, 10);

}

const hide = async () => {
    const DATA = $Dialoger.get();

    $Dialoger.setKey("isAnimate", false);


    await new Promise((res) => setTimeout(res, (DATA.animate?.duration || .25) * 1000));
    $Dialoger.setKey("isVisible", false);
    Scroll.show();
};

const show = ({ ...props }: DialogPropsTypes) => {
    create({
        ...props,
        children: null
    })
}

const custom = (children: React.ReactNode, props?: DialogPropsCustomTypes) => {
    create({
        ...props,
        children: children
    })
}

export const Dialog = {
    show,
    custom,
    hide
}