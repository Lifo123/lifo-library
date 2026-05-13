"use client";
import {
  MenuItem,
  SubmenuTrigger,
  type SubmenuTriggerProps,
} from "react-aria-components";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { SubMenuContent } from "./MenuContent";

interface SubMenuProps extends Omit<SubmenuTriggerProps, "children"> {
  children: React.ReactNode;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: keyof typeof dynamicIconImports ;
}

export default function SubMenuItem<T extends object>({
  children,
  ...props
}: SubMenuProps) {
  return (
    <SubmenuTrigger {...props} delay={props.delay || 100}>
      <MenuItem>
        {props.label || "No Label"}
        <DynamicIcon
          name={props.icon || "chevron-right"}
          size={16}
          strokeWidth={2.5}
          color="var(--color-gray-a10)"
        />
      </MenuItem>
      <SubMenuContent>{children}</SubMenuContent>
    </SubmenuTrigger>
  );
}
