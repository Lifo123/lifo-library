import type { ButtonProps, PressEvent } from "react-aria-components";

export type LoadingButtonProps<T extends object = {}> = {
  isLoading?: boolean;
  children: React.ReactNode;
  size?: number;
  strokeWidth?: number;
} & T;

export type PromiseButtonProps<T extends object = {}> = {
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  onSuccess?: () => void;
  onError?: () => void;
} & T;

export interface ButtonPromiseProps extends ButtonProps {
  loadingId?: string;
  onPress?: (e: PressEvent) => Promise<any>;
}
