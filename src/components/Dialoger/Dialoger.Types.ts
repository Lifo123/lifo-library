interface AnimationTypes {
    top?: string;
    left?: string;
    opacity?: number;
    transform?: string;
}

interface CommonTypes {
    bgColor?: string
    animate?: {
        start: AnimationTypes;
        end: AnimationTypes;
        duration?: number;
    }
}

export interface DialogTypes extends CommonTypes {
    title?: string;
    desc?: string;
    closeBtn?: boolean;
    isVisible?: boolean;
    isAnimate?: boolean;
    children?: React.ReactNode;
    onClick?: () => void | Promise<void>;
}


export interface DialogPropsTypes extends CommonTypes {
    title: string
    desc?: string
    closeBtn?: boolean
    onClick?: () => void | Promise<void>;
}

export interface DialogPropsCustomTypes extends CommonTypes {

}


//Dialoger Types

export interface DialogerPropsTypes {

}