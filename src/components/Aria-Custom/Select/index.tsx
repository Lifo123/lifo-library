"use client";

import { Label, FieldError } from "../Form/Form";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Button } from "react-aria-components/Button";
import { Popover, PopoverProps } from "react-aria-components/Popover";
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue,
  type ValidationResult,
} from "react-aria-components/Select";
import {
  Text,
  ListBox as DropdownListBox,
  ListBoxItem as DropdownItem,
  type ListBoxProps,
  type ListBoxItemProps,
} from "react-aria-components/ListBox";

export interface SelectProps<
  T extends object,
  M extends "single" | "multiple",
> extends Omit<AriaSelectProps<T, M>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);

  popover?: PopoverProps;
}

export function Select<
  T extends object,
  M extends "single" | "multiple" = "single",
>({
  label,
  description,
  errorMessage,
  children,
  items,
  popover,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect {...props}>
      {label && <Label>{label}</Label>}
      <Button>
        <SelectValue />
        <ChevronDown size={18} />
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover {...popover} className="react-aria-Popover select-popover">
        <SelectListBox items={items}>{children}</SelectListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} className={"dropdown-listbox"} />;
}

export function SelectItem({ children, ...props }: ListBoxItemProps) {
  return (
    <DropdownItem {...props} className={"dropdown-item"}>
      {typeof children === "string"
        ? ({ isSelected, selectionMode }) => (
            <>
              {isSelected && selectionMode !== "none" ? <CheckIcon /> : null}
              <Text slot="label">{children}</Text>
            </>
          )
        : children}
    </DropdownItem>
  );
}
