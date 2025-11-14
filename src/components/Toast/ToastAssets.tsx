'use client';
import { Icon } from "public-icons";


const success = <Icon icon='circle-check'  size={24}  />;

const info = <Icon icon='circle-info' size={24} />

const warning = <Icon icon='triangle-alertSolid' size={22} />

const error = <Icon icon='circle-info' size={24} rotate={180}  />

const loading = <span className='custom-spin'><Icon icon='loader-circle' size={20} strokeWidth={2.25}/></span>

export const ToastIcons = {
    loading, success, info, warning, error, none: undefined
}