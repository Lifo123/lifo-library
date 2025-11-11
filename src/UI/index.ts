//


import { Darkmode } from '../components/Darkmode/Darkmode.Store.js'
import { dialog } from '../components/Dialog/index.js'
export { toast } from '../components/Toast/Toaster.store.js'
import { $loading, Loading } from '../Stores/Loading.Store.js'
import { $interface } from './Interface.Store.js'


export const UI = {
    Loading, Darkmode, dialog

}

export const UIStores = {
    $loading, $interface
}

export default UI