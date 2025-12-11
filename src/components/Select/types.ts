import type {
  ButtonProps,
  PopoverProps,
  SelectProps,
  ValidationResult,
} from "react-aria-components";

export interface SelectMenuProps<
  T extends object,
  M extends "single" | "multiple",
> extends Omit<SelectProps<T, M>, "children"> {
  label?: string;
  offset?: number;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  placement?: PopoverProps["placement"];
  customize?: {
    trigger?: ButtonProps;
  };
}
