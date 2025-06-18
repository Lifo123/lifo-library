'use client';
import React from 'react';
import { TabContext } from './TabMenu.js';

interface TabListProps {
  indicatorTransition?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TabList({
  className, style, children, indicatorTransition = 300
}: TabListProps) {
  const { select, customize } = React.useContext(TabContext);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || !indicatorRef.current) return;
    const activeEl = containerRef.current.querySelector(`[data-tab-id="${select}"]`) as HTMLElement;
    if (activeEl) {
      const offsetLeft = activeEl.offsetLeft;
      const offsetWidth = activeEl.offsetWidth;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [select]);

  const indicatorClass = customize?.indicator?.className || "";
  const indicatorStyle = customize?.indicator?.style || {};

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={style}
    >
      <div
        ref={indicatorRef}
        className={`tab-indicator h-100 absolute  ${indicatorClass}`}
        style={{
          ...indicatorStyle,
          ...(indicatorTransition > 0 && {
            transition: `transform ${indicatorTransition}ms ease-in-out, width ${indicatorTransition}ms ease-in-out`,
          }),
        }}
      />
      {children}
    </div>
  );
}
