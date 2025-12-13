"use client";
import { Button, ButtonProps } from "react-aria-components";
import { GlobalIconProps, Icon, IconName } from "public-icons";

type PressableIconProps = ButtonProps & {
  size?: number;
  color?: string;
  fill?: string;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  rotate?: number;
  strokeWidth?: number;
  x?: number;
  y?: number;
  svgProps?: Omit<
    React.SVGAttributes<SVGSVGElement>,
    "rotate" | "strokeWidth" | "x" | "y"
  >;
};

export function PressableIcon<I extends IconName>({
  icon,
  variant,

  size,
  color,
  fill,
  flipHorizontal,
  flipVertical,
  rotate,
  strokeWidth,
  x,
  y,
  svgProps,

  ...triggerProps
}: GlobalIconProps<I> & PressableIconProps) {
  return (
    <Button {...triggerProps}>
      <Icon
        icon={icon}
        variant={variant}
        {...svgProps}
        size={size}
        color={color}
        fill={fill}
        flipHorizontal={flipHorizontal}
        flipVertical={flipVertical}
        rotate={rotate}
        strokeWidth={strokeWidth}
        x={x}
        y={y}
      />
    </Button>
  );
}
