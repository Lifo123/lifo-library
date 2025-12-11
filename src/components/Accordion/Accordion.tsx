"use client";
import React from "react";
import { useButton, useDisclosure } from "react-aria";
import { useDisclosureState, DisclosureProps } from "react-stately";
import { mergeProps, useFocusRing } from "react-aria";
import { Icon } from "public-icons";

interface Props extends DisclosureProps {
  title: string;
  children: React.ReactNode;
  styling?: {
    content?: React.HTMLAttributes<HTMLElement>;
    trigger?: React.HTMLAttributes<HTMLElement>;
    panel?: React.HTMLAttributes<HTMLElement>;
  };
}

export function Accordion(props: Props) {
  let state = useDisclosureState(props);
  let panelRef = React.useRef<HTMLDivElement | null>(null);
  let triggerRef = React.useRef<HTMLButtonElement | null>(null);
  let { buttonProps: triggerProps, panelProps } = useDisclosure(
    { ...props },
    state,
    panelRef,
  );
  let { buttonProps } = useButton(triggerProps, triggerRef);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div className={`accordion ${state.isExpanded ? "expanded" : ""}`}>
      <button
        className={"accordion-trigger"}
        style={{ outline: isFocusVisible ? "2px solid dodgerblue" : "none" }}
        {...mergeProps(buttonProps, focusProps)}
        ref={triggerRef}
      >
        {props.title || "No title provided"}
        <span className="mr-1">
          <Icon
            icon="arrow"
            size={20}
            rotate={state.isExpanded ? 0 : -180}
            style={{
              transition: "rotate .15s ease",
            }}
          />
        </span>
      </button>
      <div
        className={`accordion-panel ${state.isExpanded && "expanded"}`}
        {...mergeProps(panelProps, focusProps)}
        ref={panelRef}
      >
        {props.children || "No content provided"}
      </div>
    </div>
  );
}
