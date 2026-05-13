"use client";
import { DynamicIcon } from "lucide-react/dynamic";

const success = <DynamicIcon name="circle-check" size={22} />;

const info = <DynamicIcon name="circle-alert" size={22} style={{rotate: "180deg"}} />;

const warning = <DynamicIcon name="triangle-alert" size={19}/>;

const error = <DynamicIcon name="circle-alert" size={22} />;

const loading = (
  <span className="custom-spin">
    <DynamicIcon name="loader-circle" size={20} strokeWidth={2.25} />
  </span>
);

export const ToastIcons = {
  loading,
  success,
  info,
  warning,
  error,
  none: undefined,
};
