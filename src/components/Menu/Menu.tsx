"use client";
import { MenuTrigger, type MenuTriggerProps } from "react-aria-components";

export default function Menu(props: MenuTriggerProps) {
  return <MenuTrigger {...props}>{props.children}</MenuTrigger>;
}
