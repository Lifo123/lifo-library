'use client'
import React from "react";
import { TabContext } from "./TabMenu.js";

interface TabItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  id?: string;
}

export default function TabItem(props: TabItemProps) {
  const {
    select, setSelect,
    isOpen, setIsOpen,
    customize
  } = React.useContext(TabContext);

  const isActive = select === props.id;

  const defaultClass = `tab-item d-flex rounded-md pointer fs-2 o-hidden px-3 py-2`;
  const baseClass = customize?.item?.className || defaultClass;
  const defaultColor = isActive ? 'var(--color-lifo-title)' : 'var(--color-lifo-text)';
  const styleColor = customize?.item?.style?.color ?? defaultColor;


  const baseStyle = customize?.item?.style || {};

  return (
    <div
      data-tab-id={props.id}
      className={`${baseClass} ${props.disabled ? 'no-select' : ''} relative`}
      onClick={async () => {
        if (props.disabled) return;
        if (props.id) {
          setSelect(props.id);
          setIsOpen(select === props.id ? !isOpen : true);
        }
      }}
      style={{
        ...baseStyle,
        color: styleColor,
        ...(props.disabled ? { pointerEvents: 'none', cursor: 'not-allowed', opacity: .85 } : {})
      }}

    >
      {props.children}
    </div>
  );
}
