// 'use client'
// import { Button, Dialog, Heading, Modal, ModalOverlay } from "react-aria-components"
// import { $dialogStore, dialog } from "./Dialog.store.js";
// import { useStore } from "@nanostores/react";
// import ButtonPromise from "../General/ButtonPromise.js";
// import { useExitAnimation } from "@react-aria/utils";
// import React from "react";

// /*FALTA MULTIPLES DIALOGOS IN ARRAY */

// export function Dialoger() {
//     const { isOpen, custom, isDismissable, isKeyboardDismissDisabled, ...dialogData } = useStore($dialogStore);

//     return (
//         <ModalOverlay
//             isOpen={isOpen}
//             onOpenChange={dialog.change}
//             isDismissable={isDismissable}
//             isKeyboardDismissDisabled={isKeyboardDismissDisabled}
//         >
//             <Modal>
//                 <Dialog role="alertdialog" aria-label="alert-dialog" id={dialogData.id} data-variant={dialogData.variant}>
//                     <Heading className="f-row justify-between gap-10 text-p fw-500 text-lifo-title border-b border-gray-6 pb-3 mb-4">
//                         {dialogData.title}
//                         <span>

//                         </span>
//                     </Heading>

//                     <section className=" leading-relaxed text-gray-11 mt-4 text-p2 " >
//                         {custom || dialogData.description || 'No description provided.'}
//                     </section>

//                     <div className="f-row gap-3 justify-end items-center mt-10">
//                         <Button
//                             className="btn btn-third rounded-sm"
//                             onPress={async () => {
//                                 await dialogData.cancelAction?.()
//                                 dialog.close()
//                             }}>
//                             {dialogData.cancelActionLabel || 'Cancel'}
//                         </Button>

//                         {
//                             dialogData.SecondaryAction &&
//                             <ButtonPromise
//                                 className="btn btn-secondary rounded-sm"
//                                 isDisabled={dialogData.isSecondaryActionDisabled}
//                                 loadingId={dialogData.id + '0'}
//                                 onPress={async () => {
//                                     await dialogData.SecondaryAction?.()
//                                     dialog.close()
//                                 }}>
//                                 {dialogData.SecondaryActionLabel || 'Secondary'}
//                             </ButtonPromise>
//                         }

//                         <ButtonPromise
//                             className="btn btn-primary rounded-sm"
//                             isDisabled={dialogData.isPrimaryActionDisabled}
//                             loadingId={dialogData.id + '1'}
//                             onPress={async () => {
//                                 await dialogData.PrimaryAction?.()
//                                 dialog.close()
//                             }}>
//                             {dialogData.PrimaryActionLabel || 'Continue'}
//                         </ButtonPromise>
//                     </div>
//                 </Dialog>
//             </Modal>
//         </ModalOverlay>
//     )
// }

// function DialogItem(props: any){
//     const {
//         //state
//     } = props

//     const ref = React.useRef<HTMLDivElement>(null)
//     //const isExiting = useExitAnimation(ref, isOpen as boolean);
// }

// function DialogItemInner() {

// }