// 'use client'
// import { useStore } from '@nanostores/react'
// import { $dialoger, dialog, type dialogAllProps } from './Dialoger.store.js'
// import { Button, Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
// import { ButtonPromise } from '../Buttons/index.js'
// import React from 'react'

// export function Dialoger() {
//     const DIALOGS = useStore($dialoger)

//     React.useEffect(() => {
//         if (DIALOGS.length > 1) {
//             console.warn(
//                 'Dialoger: 2 or more active dialogs detected. ' +
//                 'While stacking is technically supported, ' +
//                 'it is generally considered bad practice for UX and accessibility.'
//             )
//         }
//     }, [DIALOGS.length])

//     if (DIALOGS.length === 0) return null

//     return (
//         <>
//             {
//                 DIALOGS.map((item) => (
//                     <DialogItem key={item.id} {...item} />
//                 ))
//             }
//         </>
//     )
// }

// function DialogItem(props: dialogAllProps) {
//     const {
//         id,
//         variant,
//         title,
//         description,
//         custom,

//         isPrimaryActionDisabled,
//         isSecondaryActionDisabled,
//     } = props

//     const [isActionRunning, setIsActionRunning] = React.useState(false)

//     return (
//         <ModalOverlay
//             isOpen={props.isOpen}
//             onOpenChange={() => {
//                 if (isActionRunning) return
//                 dialog.hide(`${id}`)
//             }}
//             isDismissable={props.isDismissable}
//             isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
//         >
//             <Modal >
//                 <Dialog
//                     id={id}
//                     role="alertdialog"
//                     aria-label="alert-dialog"
//                     data-variant={variant}
//                 >
//                     {
//                         title &&
//                         <Heading className="f-row mb-6 justify-between gap-10 text-p fw-600 leading-none text-lifo-title border-b border-gray-6 pb-3">
//                             {title}
//                             <span>

//                             </span>
//                         </Heading>
//                     }

//                     <section>
//                         {custom ? custom : (
//                             <div className='text-p2 max-w-md leading-relaxed text-gray-11'>
//                                 {description || 'No description provided.'}
//                             </div>
//                         )}
//                     </section>

//                     <div className="f-row gap-3 justify-end items-center mt-10">
//                         <Button
//                             className="btn btn-third rounded-sm text-2 fw-600"
//                             isDisabled={isActionRunning}
//                             onPress={async () => {
//                                 await props.cancelAction?.()
//                                 dialog.hide(`${id}`)
//                             }}>
//                             {props.cancelActionLabel || 'Cancel'}
//                         </Button>

//                         {
//                             props.SecondaryAction &&
//                             <ButtonPromise
//                                 className="btn btn-secondary rounded-sm text-2 fw-600"
//                                 isDisabled={isSecondaryActionDisabled || isActionRunning}
//                                 loadingId={id + '0'}
//                                 onPress={async () => {
//                                     setIsActionRunning(true)
//                                     try {
//                                         await props.SecondaryAction?.()
//                                         dialog.hide(`${id}`)
//                                     } catch (e) {
//                                         console.error("Dialog secondary action failed:", e)
//                                         setIsActionRunning(false)
//                                     }
//                                 }}>
//                                 {props.SecondaryActionLabel || 'Secondary'}
//                             </ButtonPromise>
//                         }

//                         <ButtonPromise
//                             className="btn btn-primary rounded-sm text-2 fw-600"
//                             isDisabled={isPrimaryActionDisabled || isActionRunning}
//                             loadingId={`panmconPollo1`}
//                             onPress={async () => {
//                                 setIsActionRunning(true)
//                                 try {
//                                     await props.PrimaryAction?.()
//                                     dialog.hide(`${id}`)
//                                 } catch (e) {
//                                     console.error("Dialog primary action failed:", e)
//                                     setIsActionRunning(false)
//                                 }
//                             }}>
//                             {props.PrimaryActionLabel || 'Continue'}
//                         </ButtonPromise>
//                     </div>
//                 </Dialog>
//             </Modal>
//         </ModalOverlay>
//     )
// }