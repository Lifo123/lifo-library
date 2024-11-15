import { map, deepMap, atom } from "nanostores";


interface GeneralDataProps {
    [key: string]: any
}


export const $General_Data = deepMap<GeneralDataProps>({});
export const $currentGeneral_Data = atom<string>('');
export const $Local_Data = map<GeneralDataProps>({});
export const $currentLocal_Data = atom<string>('');