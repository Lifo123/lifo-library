"use client";

type Props = React.HTMLAttributes<HTMLSpanElement>;

export function Skeleton(props: Props) {
  return (
    <span
      className={`skeleton ${props.className}`}
      style={{
        height: props?.style?.height || "24px",
        ...props.style,
      }}
      {...props}
    ></span>
  );
}
