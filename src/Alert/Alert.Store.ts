'use client';
import { atom, map } from "nanostores";
import { type NormalProps } from './Alert.Types'

const $isOpen = atom(false);
const $isVisible = atom(false);
const $currentPopup = atom<string | undefined>('');
const $children = atom<React.ReactNode>(null)
const $normal = map<NormalProps>()




const setBodyScroll = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
    //document.body.style.paddingRight = disable ? '11px' : '0px'
};

const setState = (state: boolean) => {
    state ? $isOpen.set(state) : $isVisible.set(state)
    setTimeout(() => {
        state ? $isVisible.set(state) : $isOpen.set(state)
        if (!state) {
            $children.set(null)
            $currentPopup.set('')
            $normal.set({
                title: '',
                description: ''
            })
        }
    }, state ? 5 : 150)
    setBodyScroll(state);
}

const setPopup = (id: string) => {
    if(id){
        $currentPopup.set(id);
    }else{
        $currentPopup.set('init') 
    }
}

export {
    $isOpen, $isVisible, $children, $normal, $currentPopup, setPopup, setState
}