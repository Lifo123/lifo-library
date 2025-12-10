'use client'
import React from 'react'
import { useStore } from '@nanostores/react'
import { Button, Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'

import { $dialoger, dialog, type dialogAllProps } from './Dialoger.store'
import { ButtonPromise } from '@Components/index'

export function Dialoger() {
  const DIALOGS = useStore($dialoger)

  React.useEffect(() => {
    if (DIALOGS.length > 1) {
      console.warn(
        'Dialoger: 2 or more active dialogs detected. ' +
        'While stacking is technically supported, ' +
        'it is generally considered bad practice for UX and accessibility.'
      )
    }
  }, [DIALOGS.length])

  if (DIALOGS.length === 0) return null

  return (
    <>
      {
        DIALOGS.map((item) => (
          <DialogItem key={item.id} {...item} />
        ))
      }
    </>
  )
}

function DialogItem(props: dialogAllProps) {
  const {
    id,
    variant,
    title,
    description,
    custom,
    className,
    style,

    bgColor,
    modalClassName,
    modalStyle,

    isPrimaryActionDisabled,
    isSecondaryActionDisabled,
  } = props

  const [isActionRunning, setIsActionRunning] = React.useState(false)

  return (
    <ModalOverlay
      isOpen={props.isOpen}
      onOpenChange={() => {
        if (isActionRunning) return
        dialog.hide(`${id}`)
      }}
      isDismissable={props.isDismissable}
      isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
      className='dialog-modal-overlay'
      style={{ backgroundColor: bgColor || '#0000003a' }}
    >
      <Modal
        className={modalClassName || 'dialog-modal'}
        style={modalStyle}
      >
        <Dialog
          id={id}
          role="alertdialog"
          aria-label="alert-dialog"
          data-variant={variant}
          className={className || 'empty'}
          style={style}
        >
          {
            custom ??
            <div className='dialog-container'>
              {
                title &&
                <Heading>
                  {title}
                  <span>

                  </span>
                </Heading>
              }

              <p>
                {description || 'No description provided.'}
              </p>

              <div>
                <Button
                  className="btn btn-outline rounded-md"
                  isDisabled={isActionRunning}
                  onPress={async () => {
                    await props.cancelAction?.()
                    dialog.hide(`${id}`)
                  }}>
                  {props.cancelActionLabel || 'Cancel'}
                </Button>

                {
                  props.SecondaryAction &&
                  <ButtonPromise
                    className="btn btn-outline rounded-md"
                    isDisabled={isSecondaryActionDisabled || isActionRunning}
                    loadingId={id + '0'}
                    onPress={async () => {
                      setIsActionRunning(true)
                      try {
                        await props.SecondaryAction?.()
                        dialog.hide(`${id}`)
                      } catch (e) {
                        console.error("Dialog secondary action failed:", e)
                        setIsActionRunning(false)
                      }
                    }}>
                    {props.SecondaryActionLabel || 'Secondary'}
                  </ButtonPromise>
                }

                <ButtonPromise
                  className="btn btn-primary rounded-md"
                  isDisabled={isPrimaryActionDisabled || isActionRunning}
                  loadingId={id + '1'}
                  onPress={async () => {
                    setIsActionRunning(true)
                    try {
                      await props.PrimaryAction?.()
                      dialog.hide(`${id}`)
                    } catch (e) {
                      console.error("Dialog primary action failed:", e)
                      setIsActionRunning(false)
                    }
                  }}>
                  {props.PrimaryActionLabel || 'Continue'}
                </ButtonPromise>
              </div>
            </div>
          }
        </Dialog>
      </Modal>
    </ModalOverlay >
  )
}
