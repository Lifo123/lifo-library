export type LoadingButtonpProps<T extends object = {}> = {
  isLoading: boolean;
  children: React.ReactNode;
  size?: number;
  strokeWidth?: number;
} & T;

export type PromiseButtonProps<T extends object = {}> = {
  label?: string;
  loadingLabel?: string;
  successLabel?: string;
  onSuccess?: () => void;
  errorLabel?: string;
  onError?: () => void;
} & T;
