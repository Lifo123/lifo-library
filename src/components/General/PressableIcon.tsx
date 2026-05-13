"use client";
import { Button, ButtonProps } from "react-aria-components";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";

type PressableIconProps = ButtonProps & {
  icon: keyof typeof dynamicIconImports;

  className?: string;
  style?: React.CSSProperties;

  size?: number;
  color?: string;
  fill?: string;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  rotate?: number;
  strokeWidth?: number;
  x?: number;
  y?: number;
};

export function PressableIcon({
  icon = "square-dashed",

  size = 24,
  color,
  fill = "none",
  flipHorizontal,
  flipVertical,
  rotate = 0,
  strokeWidth = 2,
  x = 0,
  y = 0,

  ...ButtonProps
}: PressableIconProps) {
  return (
    <Button className={ButtonProps.className || ""} {...ButtonProps}>
      <DynamicIcon
        name={icon}
        viewBox={`${y} ${x} 24 24`}
        size={size}
        color={color}
        fill={fill}
        strokeWidth={strokeWidth}
        style={{
          rotate: `${rotate}deg`,
          transform: `scaleX(${flipHorizontal ? -1 : 1}), scaleY(${flipVertical ? -1 : 1})`,
        }}
      />
    </Button>
  );
}
