'use client'

import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface Props extends BaseComponentProps {

}

export default function Skeleton({ ...props }: Props) {
    return <span className={`skeleton ${props.className}`} style={{
        height: props?.style?.height || '18px',
        ...props.style
    }}>
    </span>;
}
