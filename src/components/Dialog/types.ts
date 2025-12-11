export type dialogBaseProps = {
  id?: string;
  isOpen?: boolean;
};

export type dialogStatesProps = {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  bgColor?: string;

  modalClassName?: string;
  modalStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
};

export type dialogShowProps = {
  title?: string;
  description?: string;

  variant?: "info" | "warning" | "error" | "success";
  customIcon?: React.ReactNode;

  cancelAction?: () => Promise<void> | void;
  cancelActionLabel?: string;

  PrimaryAction?: () => Promise<void> | void;
  PrimaryActionLabel?: string;
  isPrimaryActionDisabled?: boolean;

  SecondaryAction?: () => Promise<void> | void;
  SecondaryActionLabel?: string;
  isSecondaryActionDisabled?: boolean;
};

export type dialogCustomProps = {
  custom?: React.ReactNode;
};

export type dialogAllProps = {} & dialogBaseProps &
  dialogShowProps &
  dialogCustomProps &
  dialogStatesProps;
