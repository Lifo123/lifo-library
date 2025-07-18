//


import { Darkmode } from '../components/Darkmode/Darkmode.Store.js'
import { Dialog } from '../components/Dialoger/Dialoger.Store.js'
import { toast } from '../components/Toast/Toast.Store.js'
import { $loading, Loading } from '../Stores/Loading.Store.js'
import { $interface, Interface } from './Interface.Store.js'


export const UI = {
    Loading, Darkmode, Dialog, toast, Interface
}

export const UIStores = {
    $loading, $interface
}

export default UI