import { AnimationPropsTypes, BaseComponentProps } from "../../Types/GeneralTypes.js";

export interface TooltipProps extends BaseComponentProps {
    children: React.ReactNode;
    custom?: React.ReactNode;

    label: string;
    offset?: string;
    dir?: 'bt' | 'tb' | 'lr' | 'rl'; //4 axis

    duration?: string;
    animate?: AnimationPropsTypes
}