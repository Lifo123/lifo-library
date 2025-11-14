'use client'
import React from "react";
import { toast } from "../Toast/Toaster.store.js";
import { $files } from "../../Stores/File.Store.js";
import { LoadingButton } from "./LoadingButton.js";

interface Props {
    className?: string;
    label?: string;
    labelCharge?: string;
    accept?: string | string[];
    delay?: number;

    success?: string;
    error?: string;

    onUpload?: (file: File) => void | Promise<void>;

}

export default function UploadBtn({
    label = 'Upload',
    labelCharge = 'Uploaded',
    ...props
}: Props) {
    const [isUploaded, setIsUploaded] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);

    const normalizeAccept = () => {
        if (!props.accept) return "";
        if (Array.isArray(props.accept)) {
            return props.accept.map(ext => ext.startsWith(".") ? ext : "." + ext).join(",");
        }
        if (props.accept.includes("|")) {
            return props.accept.split("|").map(ext => ext.startsWith(".") ? ext : "." + ext).join(",");
        }
        return props.accept.startsWith(".") ? props.accept : "." + props.accept;
    };

    const handleFileChange = async (file: File) => {
        if (!file) {
            toast.error(props.error || 'Error selecting file', { placement: 'bottom-left' });
            return;
        }

        if (props.accept) {
            const allowedExtensions = Array.isArray(props.accept)
                ? props.accept.join('|')
                : props.accept;

            const normalizedAllowed = allowedExtensions.replace(/\./g, '').split('|').join('|');
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const regex = new RegExp(`^(${normalizedAllowed})$`, 'i');

            if (!fileExtension || !regex.test(fileExtension)) {
                toast.error(`File not supported. Only: ${normalizedAllowed.split('|').join(', ')}`, { placement: 'bottom-left' });
                return;
            }
        }

        try {
            await new Promise(res => setTimeout(res, props.delay ?? 850));

            const lastDotIndex = file.name.lastIndexOf('.');
            const nameWithoutLabel = (lastDotIndex > 0)
                ? file.name.substring(0, lastDotIndex)
                : file.name;

            $files.setKey(`uploads.${nameWithoutLabel}`, file);


            if (props.onUpload) {
                await props.onUpload(file);
            } else {
                toast.success(props.success || 'File uploaded', { placement: 'bottom-left' });
            }

            setIsUploaded(true);
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(`Error: ${errorMessage} `, { placement: 'bottom-left' });
        }
    };

    React.useEffect(() => {
        if (isUploaded) {
            const timer = setTimeout(() => {
                setIsUploaded(false)
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isUploaded]);

    const triggerFileInput = () => {
        if (isUploading) return;
        setIsUploading(true);

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = normalizeAccept();

        const handleCancel = () => {
            setTimeout(() => {
                //No ejecuta
                console.log('wasa cancelando');

                if (!input.files || input.files.length === 0) {
                    setIsUploading(false);
                }
            }, 300);

            window.removeEventListener('focus', handleCancel);
        };

        window.addEventListener('focus', handleCancel);

        input.onchange = async (e: any) => {
            window.removeEventListener('focus', handleCancel);

            await handleFileChange(e.target.files[0]);
            setIsUploading(false);
        };

        input.click();
    };

    return (
        <LoadingButton
            isLoading={isUploading}
            onPress={triggerFileInput}
            {...props}
        >
            {isUploaded ? labelCharge : label}
        </LoadingButton>
    );
}