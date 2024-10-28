import { atom } from "nanostores";

const select = atom({value: ''});
const aside : any = atom([]);
const main = atom([]);


const LIBRARYSTORE = {
    select,
    aside,
    main
}

export default LIBRARYSTORE;