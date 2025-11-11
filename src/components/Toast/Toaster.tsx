'use client'
import React from 'react'
import { useStore } from '@nanostores/react'
import { OverlayContainer } from 'react-aria'
import { $toaster, ToastAllProps, ToasterSettingProps, toast } from './Toaster.store.js'
import { customUUID } from '../../utils/uuid.js'
import { Button, ButtonPromise } from '../General/index.js'
import { ToastIcons } from './ToastAssets.js'
import { Icon } from 'public-icons'
import { useEnterAnimation, useExitAnimation } from '@react-aria/utils'


export function Toaster(props: ToasterSettingProps) {
    const {
        toasterId = 'default',
        maxToasts = 6,
        placement = 'bottom-right',
        duration = 3200,
        richColors = false,
        noDissapear = false,
    } = props;

    const [toasterGeneralId] = React.useState(customUUID({ prefix: 'toaster=' }));
    const TOASTER = useStore($toaster)

    const settings = React.useMemo(() => {
        const s: Partial<ToasterSettingProps> = {
            maxToasts,
            placement,
            duration,
            richColors,
            noDissapear
        };

        (Object.keys(s) as (keyof typeof s)[]).forEach(key => {
            if (s[key] === undefined) {
                delete s[key];
            }
        });

        return s;
    }, [maxToasts, placement, duration, richColors, noDissapear]);

    React.useEffect(() => {
        $toaster.setKey(`${toasterId}.settings`, settings);
    }, [toasterId, settings]);

    const toasts = TOASTER[toasterId]?.toasts
    if (!toasts) return null;

    const validToasts = toasts.filter(Boolean);
    const availableToast = validToasts.slice(-maxToasts);

    return (
        <OverlayContainer
            className='toast-overlay no-select h-full w-full '
            id={toasterGeneralId}
        >
            {
                availableToast.map((toast) => (
                    <ToastItem key={toast.id} {...toast} />
                ))
            }
        </OverlayContainer>
    )
}

function ToastItem(props: ToastAllProps) {
    const {
        id,
        toasterId,
        isHovered,
        isOpen,
        noDissapear,
        duration,
    } = props;

    const ref = React.useRef<HTMLDivElement>(null);

    const isExiting = useExitAnimation(ref, isOpen as boolean);

    React.useEffect(() => {
        if (!id || noDissapear || isHovered) {
            return;
        }

        let timeout: NodeJS.Timeout;
        timeout = setTimeout(() => {
            toast.dismiss(id, toasterId);
        }, duration);

        return () => clearTimeout(timeout);
    }, [id, isHovered, noDissapear, duration, toasterId]);

    React.useEffect(() => {
        if (!isOpen && !isExiting && id) {
            toast.remove(id, toasterId);
        }
    }, [isOpen, isExiting, id, toasterId]);

    if (!isOpen && !isExiting) {
        return null;
    }

    return (
        <ToastItemInner
            {...props}
            isExiting={isExiting}
            ref={ref}
        />
    )

}

const ToastItemInner = React.forwardRef<HTMLDivElement, ToastAllProps & { isExiting: boolean }>(
    (props, ref) => {
        const {
            id,
            toasterId,
            isHovered,
            isOpen,
            placement,
            isExiting,

            // Props de renderizado
            title,
            description,
            type = 'none',
            customIcon,
            hasCloseButton,
            action,
            actionLabel,
            richColors,
            custom
        } = props;

        const isEntering = useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;
        const [axisY, axisX] = placement?.split('-') as [string, string];

        return (
            <div
                ref={ref}
                data-open={isOpen}
                data-hovered={isHovered}

                data-entering={isEntering || undefined}
                data-exiting={isExiting || undefined}
                data-axis-y={axisY}
                data-axis-x={axisX}

                className='toast-wrapper select'
                onMouseEnter={() => toast.update(id as string, { isHovered: true }, toasterId)}
                onMouseLeave={() => toast.update(id as string, { isHovered: false }, toasterId)}
            >
                {
                    custom ?? <>
                        <div
                            className='toast-item f-row gap-9 justify-between items-center rounded-lg'
                            data-toast-type={type}
                            data-richcolors={richColors}
                        >
                            <div className='f-row gap-1 items-center'>
                                <span className='f-col f-center h-6 aspect-square'>{customIcon || ToastIcons[type]}</span>
                                <div className='f-col text-start ml-1'>
                                    {title && <p className='fs-15 fw-475'>{title}</p>}
                                    {description && <p className='text-p2 fw-475 text-gray-11'>{description}</p>}
                                </div>
                            </div>
                            <span className='text-gray-11'>
                                {
                                    action ? <ButtonPromise onPress={async () => {
                                        await action();
                                        toast.dismiss(id, toasterId)
                                    }}>
                                        {actionLabel || 'Continue'}
                                    </ButtonPromise> : hasCloseButton && <Button className={'pointer rounded-full hover:bg-gray-5 p-1 mt-1'}
                                        onPress={() => toast.dismiss(id, toasterId)}
                                    >
                                        <Icon icon='close' size={22}/>
                                    </Button>

                                }
                            </span>
                        </div>
                    </>
                }
            </div>
        )
    })