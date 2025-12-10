import { deepMap } from "@nanostores/deepmap";
import { map } from 'nanostores';
import { uuid } from "@Utils/index";

export type ToastTypes = "success" | "error" | "warning" | "info" | "loading" | 'none';
export type PlacementTypes = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type ToastProps<T extends object = {}> = T & {
  toasterId?: string,
  id?: string,
  duration?: number,
  placement?: PlacementTypes,
  noDissapear?: boolean,
};

export type ToastAllProps<T extends object = {}> = T & ToastProps<T> & ToastItemState & ToastRenderProps & ToastCustomProps & ToastPromiseProps & ToasterSettingProps

type ToastRenderProps<T extends object = {}> = T & {
  title?: string,
  type?: ToastTypes,
  description?: string,
  customIcon?: React.ReactNode,
  hasCloseButton?: boolean,

  action?: () => void,
  actionLabel?: string,

  richColors?: boolean,
}

type ToastCustomProps<T extends object = {}> = T & {
  custom?: React.ReactNode | undefined,
}

type ToastPromiseProps<T extends object = {}> = T & {
  loading?: string,
  success?: string | ((data: any) => string),
  onSuccess?: () => void,
  error?: string | ((error: any) => string),
  onError?: () => void,
}

type ToastItemState = {
  isOpen?: boolean,
  isHovered?: boolean,
}

export type ToasterSettingProps = {
  maxToasts?: number,
  richColors?: boolean,
} & Omit<ToastProps, 'id'>

interface ToasterItemProps {
  settings?: Omit<ToasterSettingProps, 'toasterId'>,
  toasts?: ToastAllProps[]
}

export const $toaster = deepMap<{ [key: string]: ToasterItemProps }>({ 'default': {} });
export const $lastToast = map<ToastAllProps>();

const TOAST_ITEM_INITIAL_STATE = {
  isOpen: false,
  isHovered: false,
  duration: 3500,
  noDissapear: false,
}

class ToastService {
  private createToast(props?: ToastAllProps): string {
    const toasterId = props?.toasterId || 'default';
    const prevData = $toaster.get()[toasterId];
    const maxToasts = prevData?.settings?.maxToasts;

    const visibleToasts = prevData?.toasts?.filter(Boolean) || [];
    const visibleCount = visibleToasts.length;

    if (maxToasts && maxToasts > 0 && visibleCount >= maxToasts) {
      return '';
    }

    const id = props?.id ?? uuid(6, 'lifo:toast:');
    const newIndex = prevData?.toasts?.length || 0;

    let lastToast = {
      ...TOAST_ITEM_INITIAL_STATE,
      ...prevData?.settings,
      ...props,
      isOpen: true,
      toasterId,
      id
    } as ToastAllProps;

    $toaster.setKey(`${toasterId}.toasts[${newIndex}]`, lastToast);
    $lastToast.set(lastToast);

    return id;
  }

  private dismissHelper(id: string, toasterId: string = 'default') {
    const currentToasts = $toaster.get()[toasterId]?.toasts || [];
    if (!currentToasts.length) return;

    const index = currentToasts.findIndex(toast => toast.id === id);
    if (index === -1) return;

    $toaster.setKey(`${toasterId}.toasts[${index}].isOpen`, false); // added
  }

  // ==================================================================
  //      Public API
  // ==================================================================

  update(id: string, newProps: ToastAllProps, toasterId?: string | 'default') {
    const tId = toasterId || newProps.toasterId || 'default';
    const currentToasts = $toaster.get()[tId]?.toasts || [];
    const index = currentToasts.findIndex(t => t.id === id);

    if (index === -1) return;

    const oldToast = currentToasts[index];
    const newMergedToast = {
      ...oldToast,
      ...newProps
    };
    $toaster.setKey(`${tId}.toasts[${index}]`, newMergedToast);
  }

  remove(id: string, toasterId: string = 'default') {
    const tId = toasterId || 'default';
    const currentToasts = $toaster.get()[tId]?.toasts || [];

    if (!currentToasts.length) return;

    const newToasts = currentToasts.filter(toast => toast && toast.id !== id);
    $toaster.setKey(`${tId}.toasts`, newToasts);
  }

  custom(component: React.ReactNode, props: ToastProps = {}) {
    return this.createToast({
      ...props,
      custom: component,
    });
  }

  dismiss(id?: string, toasterId?: string | 'default') {
    if (id && toasterId) {
      this.dismissHelper(id, toasterId);

    } else if (toasterId) {
      const currentToasts = $toaster.get()[toasterId]?.toasts || [];
      currentToasts.forEach(toast => {
        if (toast.id) {
          this.dismissHelper(toast.id, toasterId);
        }
      });
    } else {
      const allToasters = $toaster.get();
      Object.keys(allToasters).forEach(tId => {
        const currentToasts = allToasters[tId]?.toasts || [];
        currentToasts.forEach(toast => {
          if (toast.id) {
            this.dismissHelper(toast.id, tId);
          }
        });
      });
    }
  }

  dismissFirst(toasterId: string = 'default') {
    const currentToasts = $toaster.get()[toasterId]?.toasts || [];
    if (!currentToasts.length) return;

    const firstToastId = currentToasts[0]?.id;
    if (firstToastId) {
      this.dismissHelper(firstToastId, toasterId);
    }
  }

  dismissLast(toasterId: string = 'default') {
    const currentToasts = $toaster.get()[toasterId]?.toasts || [];
    if (!currentToasts.length) return;

    const lastToastId = currentToasts[currentToasts.length - 1]?.id;
    if (lastToastId) {
      this.dismissHelper(lastToastId, toasterId);
    }
  }

  async promise(fn: () => Promise<any>, props: ToastPromiseProps<Omit<ToastProps, 'noDissapear'>>) {
    const toasterId = props.toasterId || 'default';
    const id = this.createToast({
      ...props,
      type: 'loading',
      title: props.loading || 'Loading...',
      noDissapear: true,
    });

    try {
      const data = await fn();

      const successTitle = typeof props.success === 'function'
        ? props.success(data)
        : props.success;

      this.update(id, {
        type: 'success',
        title: successTitle || 'Success response',
        noDissapear: false,
        duration: props.duration ?? 3500
      }, toasterId);

      props.onSuccess?.();

    } catch (error) {
      const errorTitle = typeof props.error === 'function'
        ? props.error(error)
        : props.error;

      this.update(id, {
        type: 'error',
        title: errorTitle || 'Error',
        noDissapear: false,
        duration: props.duration ?? 3500
      }, toasterId);

      props.onError?.();
      console.error(error);
    }
  }

  show(msg: string, props?: Omit<ToastRenderProps<ToastProps>, 'description'>) {
    return this.createToast({ ...props, description: msg, custom: undefined });
  }
  success(msg: string, props?: Omit<ToastRenderProps<ToastProps>, 'description'>) {
    return this.createToast({ ...props, description: msg, type: 'success', custom: undefined });
  }
  error(msg: string, props?: Omit<ToastRenderProps<ToastProps>, 'description'>) {
    return this.createToast({ ...props, description: msg, type: 'error', custom: undefined });
  }
  warning(msg: string, props?: Omit<ToastRenderProps<ToastProps>, 'description'>) {
    return this.createToast({ ...props, description: msg, type: 'warning', custom: undefined });
  }
  info(msg: string, props?: Omit<ToastRenderProps<ToastProps>, 'description'>) {
    return this.createToast({ ...props, description: msg, type: 'info', custom: undefined });
  }

}


export const toast = new ToastService();
