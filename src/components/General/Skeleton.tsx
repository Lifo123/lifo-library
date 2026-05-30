"use client";
type Props = React.HTMLAttributes<HTMLSpanElement> & {
  height?: number;
  width?: number;
};

export function Skeleton({ height = 20, width, ...props }: Props) {
  return (
    <span
      {...props}
      className={`skeleton ${props.className || ""}`}
      style={{
        height,
        width: width || "100%",
        ...props.style,
      }}
    ></span>
  );
}
