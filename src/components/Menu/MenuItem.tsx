"use client";
import type { MenuItemProps } from "react-aria-components";
import { MenuItem as MenuItemAria } from "react-aria-components";

interface MenuItemLocalProps extends MenuItemProps<
  Omit<MenuItemProps, "children">
> {
  children?: React.ReactNode;
  kbd?: string;
}

export default function MenuItem({
  kbd,
  children,
  ...props
}: MenuItemLocalProps) {
  return (
    <MenuItemAria {...props}>
      {children}
      {kbd && <kbd>{kbd}</kbd>}
    </MenuItemAria>
  );
}
