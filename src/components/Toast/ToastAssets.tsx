'use client';
import Icons from "../Icons/Icons.js";


const success = <Icons icon="checkSolid" size={20} />;

const warning = <Icons icon="warningSolid" size={20} />

const info = <Icons icon="infoSolid" size={20} />

const error = <Icons icon="infoSolid" size={20} rotate={180}/>

const loading = <Icons size={20} icon='loading' style={{strokeWidth: 2.2}} />;


export const ToastIcons = {
    success, warning, error, info, loading
}