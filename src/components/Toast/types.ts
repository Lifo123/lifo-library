export type ToastTypes =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "none";
export type PlacementTypes =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastProps<T extends object = {}> = T & {
  toasterId?: string;
  id?: string;
  duration?: number;
  placement?: PlacementTypes;
  noDissapear?: boolean;
};

export type ToastAllProps<T extends object = {}> = T &
  ToastProps<T> &
  ToastItemState &
  ToastRenderProps &
  ToastCustomProps &
  ToastPromiseProps &
  ToasterSettingProps;

export type ToastRenderProps<T extends object = {}> = T & {
  title?: string;
  type?: ToastTypes;
  description?: string;
  customIcon?: React.ReactNode;
  hasCloseButton?: boolean;

  action?: () => void;
  actionLabel?: string;

  richColors?: boolean;
};

export type ToastCustomProps<T extends object = {}> = T & {
  custom?: React.ReactNode | undefined;
};

export type ToastPromiseProps<T extends object = {}> = T & {
  loading?: string;
  success?: string | ((data: any) => string);
  onSuccess?: () => void;
  error?: string | ((error: any) => string);
  onError?: () => void;
};

export type ToastItemState = {
  isOpen?: boolean;
  isHovered?: boolean;
};

export type ToasterSettingProps = {
  maxToasts?: number;
  richColors?: boolean;
} & Omit<ToastProps, "id">;
