// import { deepMap } from "nanostores";
// import { customUUID } from "../../utils/index.js";

// type DialogBaseProps = {
//     id?: string;
//     isOpen: boolean;
//     isDismissable?: boolean;
//     isKeyboardDismissDisabled?: boolean;
// }

// type DialogShowProps = {
//     title?: string;
//     description?: string;

//     variant?: 'info' | 'warning' | 'error' | 'success';
//     customIcon?: React.ReactNode;

//     cancelAction?: () => Promise<void> | void;
//     cancelActionLabel?: string;

//     PrimaryAction?: () => Promise<void> | void;
//     PrimaryActionLabel?: string;
//     isPrimaryActionDisabled?: boolean;

//     SecondaryAction?: () => Promise<void> | void;
//     SecondaryActionLabel?: string;
//     isSecondaryActionDisabled?: boolean;

//     className?: string;
//     style?: React.CSSProperties;
// }



// type DialogAllProps = {
//     custom?: React.ReactNode;
// } & DialogBaseProps & DialogShowProps



// //Will update with @nanostores/deep-map
// export const $dialoger = deepMap()


// // function createDialog(props: DialogAllProps): string {
// //     const id = props.id || customUUID();
// //     return id;
// // }

// // function show() {

// // }

// // function custom() {

// // }

// // function hide(id: string, index?: number) {

// // }