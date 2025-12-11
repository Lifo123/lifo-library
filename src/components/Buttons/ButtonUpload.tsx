"use client";
import React from "react";
import { toast } from "@Components/index";
import { $files } from "@Stores/index";
import { LoadingButton } from "./LoadingButton";
import type { ButtonProps } from "react-aria-components";
import type { PromiseButtonProps } from "./types";

interface ButtonUploadProps extends ButtonProps {
  accept?: string | string[];
  delay?: number;
  success?: string;
  error?: string;
  onUpload?: (file: File) => void | Promise<void>;
}

export function ButtonUpload({
  label = "Upload",
  successLabel = "Uploaded",
  children,
  ...props
}: Omit<PromiseButtonProps<ButtonUploadProps>, "errorLabel" | "loadingLabel">) {
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const normalizeAccept = () => {
    if (!props.accept) return "";
    if (Array.isArray(props.accept)) {
      return props.accept
        .map((ext) => (ext.startsWith(".") ? ext : "." + ext))
        .join(",");
    }
    if (props.accept.includes("|")) {
      return props.accept
        .split("|")
        .map((ext) => (ext.startsWith(".") ? ext : "." + ext))
        .join(",");
    }
    return props.accept.startsWith(".") ? props.accept : "." + props.accept;
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setIsUploading(false);
      return;
    }

    if (props.accept) {
      const allowedExtensions = Array.isArray(props.accept)
        ? props.accept.join("|")
        : props.accept;

      const normalizedAllowed = allowedExtensions
        .replace(/\./g, "")
        .split("|")
        .join("|");
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const regex = new RegExp(`^(${normalizedAllowed})$`, "i");

      if (!fileExtension || !regex.test(fileExtension)) {
        toast.error(
          `File not supported. Only: ${normalizedAllowed.split("|").join(", ")}`,
          { placement: "bottom-left" },
        );
        setIsUploading(false);
        return;
      }
    }

    try {
      await new Promise((res) => setTimeout(res, props.delay ?? 850));

      const lastDotIndex = file.name.lastIndexOf(".");
      const nameWithoutLabel =
        lastDotIndex > 0 ? file.name.substring(0, lastDotIndex) : file.name;

      $files.setKey(`uploads.${nameWithoutLabel}`, file);

      if (props.onUpload) {
        await props.onUpload(file);
      } else {
        toast.success(props.success || "File uploaded", {
          placement: "bottom-left",
        });
      }

      setIsUploaded(true);
      props.onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(props.error || `Error: ${errorMessage} `, {
        placement: "bottom-left",
      });
      props.onError?.();
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  React.useEffect(() => {
    if (isUploaded) {
      const timer = setTimeout(() => {
        setIsUploaded(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isUploaded]);

  const triggerFileInput = () => {
    if (isUploading) return;
    setIsUploading(true);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = normalizeAccept();

    input.click();
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      await handleFileChange(file);
    };

    input.oncancel = () => {
      console.log("Selección cancelada");
      setIsUploading(false);
    };
  };

  return (
    <LoadingButton
      isLoading={isUploading}
      onPress={triggerFileInput}
      className={props.className}
      {...props}
    >
      <>{isUploaded ? successLabel : children || label}</>
    </LoadingButton>
  );
}
