"use client";
export function Skeleton(props: React.HTMLAttributes<HTMLSpanElement>) {
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
