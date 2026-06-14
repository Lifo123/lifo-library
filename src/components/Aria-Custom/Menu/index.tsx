"use client";

import React from "react";
import { Check, ChevronRight, Dot } from "lucide-react";
import { Popover, PopoverProps } from "react-aria-components/Popover";
import {
  Text,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
  type MenuTriggerProps,
  type SubmenuTriggerProps,
} from "react-aria-components/Menu";

export function MenuTrigger(
  props: MenuTriggerProps & { popover?: PopoverProps },
) {
  const { isOpen, onOpenChange, popover, ...rest } = props;

  let [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];

  const popoverProps = {
    ...popover,
    isOpen: isOpen || popover?.isOpen,
    onOpenChange: onOpenChange || popover?.onOpenChange,
  };

  return (
    <AriaMenuTrigger {...rest}>
      {trigger}
      <Popover {...popoverProps}>{menu}</Popover>
    </AriaMenuTrigger>
  );
}

export function Menu<T extends object>(props: MenuProps<T>) {
  return <AriaMenu {...props}>{props.children}</AriaMenu>;
}

export function MenuItem(
  props: Omit<MenuItemProps, "children"> & { children?: React.ReactNode },
) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaMenuItem {...props} textValue={textValue}>
      {({ hasSubmenu, isSelected, selectionMode }) => (
        <>
          {isSelected && selectionMode === "multiple" ? <Check /> : null}
          {isSelected && selectionMode === "single" ? <Dot /> : null}
          {typeof props.children === "string" ? (
            <Text slot="label">{props.children}</Text>
          ) : (
            props.children
          )}
          {hasSubmenu && <ChevronRight />}
        </>
      )}
    </AriaMenuItem>
  );
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
  return <AriaMenuSection {...props} />;
}

export function SubmenuTrigger(props: SubmenuTriggerProps) {
  let [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];
  return (
    <AriaSubmenuTrigger {...props}>
      {trigger}
      <Popover offset={-4} crossOffset={-4}>
        {menu}
      </Popover>
    </AriaSubmenuTrigger>
  );
}
