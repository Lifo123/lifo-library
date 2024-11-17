import { atom, map } from "nanostores";
import { type BaseProps, type NormalProps } from "./Alert.Types.js";


export const $isOpen = atom(false);
export const $isVisible = atom(false);

export const $currentPopup = atom<string | null>(null);
export const $bgProps = map<BaseProps>()

export const $custom = map<BaseProps>()
export const $normal = map<NormalProps>()

const normal = async ({
    title, message, link, children, id, bgClose, closeBtn, funct = () => {
        console.log('Without Function');
    }
}: NormalProps) => {
    setState(true, id || '');
    $bgProps.set({ bgClose, closeBtn });
    $normal.set({ title, message, link, children, funct });
};

const custom = async (children: React.ReactNode, props?: BaseProps) => {
    setState(true, props?.id || '');
    $bgProps.set({ ...props });
    $custom.set({ children, ...props });
};

const close = () => {
    setState(false)
}

const setBodyScroll = (disable: boolean) => {
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const isMobile = window.innerWidth <= 768;

    if (disable) {
        if (!isMobile && scrollbarWidth > 0) {
            html.style.paddingRight = `${scrollbarWidth}px`;
        }
        html.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            html.style.paddingRight = '0px';
            html.style.overflow = 'auto';
        }, 160);
    }
};

const setState = async (state: boolean, id?: string) => {
    if (state) {
        setPopup(id || '')

        $isOpen.set(true);
        setTimeout(() => $isVisible.set(true), 5);
        setBodyScroll(state);
    } else {
        $isVisible.set(false);
        setTimeout(() => {
            $isOpen.set(false);
            $custom.set({});
            $bgProps.set({});
            $currentPopup.set(null);
            $normal.set({ title: '', message: '' });
        }, 150);
        setBodyScroll(state);
    }
}

const setPopup = (id: string) => {
    if (id) {
        $currentPopup.set(id);
    } else {
        const firstPopup = document.querySelector('.portal-popup');
        const newID = firstPopup?.getAttribute('id') || 'init';
        $currentPopup.set(newID);
    }
}


export const Alert = {
    normal, close, custom
}