"use client";
import { motion, type TargetAndTransition } from "@Utils/index";
import { Dialog } from "react-aria-components";
import { BasePropsDrawer } from "./types";
import React from "react";

type Props = {
  children: React.ReactNode;
  direction: "bottom" | "top" | "left" | "right";
} & BasePropsDrawer;

const MotionDialog = motion.create(Dialog);

const variants = {
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    static: {
      bottom: 0,
      left: 0,
      right: 0,
      marginInline: "auto",
      width: "fit-content",
    },
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    static: {
      top: 0,
      left: 0,
      right: 0,
      marginInline: "auto",
      width: "fit-content",
    },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    static: { left: 0, top: 0, bottom: 0, width: "auto" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    static: { right: 0, top: 0, bottom: 0, width: "auto" },
  },
};

export default function InnerDrawer({ children, direction, ...props }: Props) {
  const currentVariant = variants[direction];
  return (
    <MotionDialog
      id={props.id}
      aria-label={`drawer-${props.id}`}
      className="drawer-container"
      variants={currentVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "tween",
        duration: 0.15,
      }}
      onAnimationEnd={props.onAnimationEnd}
      style={{
        ...currentVariant.static,
        position: "fixed",
      }}
    >
      <div className={props.className} style={props.style}>
        {children}
      </div>
    </MotionDialog>
  );
}
