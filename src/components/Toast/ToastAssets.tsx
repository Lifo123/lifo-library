"use client";
import { Icon } from "public-icons";

const success = <Icon icon="circle" size={22} variant="check" />;

const info = <Icon icon="circle" size={22} variant="info" />;

const warning = <Icon icon="triangle" size={19} variant="alert" />;

const error = <Icon icon="circle" size={22} rotate={180} variant="alert" />;

const loading = (
  <span className="custom-spin">
    <Icon icon="loader_circle" size={20} strokeWidth={2.25} />
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
