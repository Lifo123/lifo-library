'use client'
import React from "react";
import { toast } from "../Toast/Toast.Store.js";
import Icons from "../Icons/Icons.js";

interface Props {
    className?: string;
    text?: string;
    textCharge?: string;
    fileType?: string;
    onUpload?: (file: File) => void | Promise<void>;
}


export default function UploadBtn({
    text = 'Upload',
    textCharge = 'Uploaded',
    ...props
}: Props) {
    const [isUploaded, setIsUploaded] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            toast.error(`Error al cargar el archivo`, { position: 'bottom-left' });
            return;
        }

        if (props.fileType) {
            const allowedExtensions = Array.isArray(props.fileType)
                ? props.fileType.join('|')
                : props.fileType;

            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const regex = new RegExp(`^(${allowedExtensions})$`, 'i');

            if (!fileExtension || !regex.test(fileExtension)) {
                toast.error(`Archivo no permitido.`, { position: 'bottom-left' });
                return;
            }
        }
        try {
            setIsUploading(true);
            if (props.onUpload) {
                await props.onUpload(file);
            } else {
                toast.success(`Archivo cargado`, { position: 'bottom-left' });
            }

            setIsUploading(false);
            setIsUploaded(true);
        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            toast.error(`Error durante la carga del archivo`, { position: 'bottom-left' });
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setIsUploaded(false)
        }, 3000)
    }, [isUploaded])

    return (
        <>
            <label className={`uploadbtn btn d-flex f-center relative ${props.className || 'btn-secondary br-6 w-max mx-auto'}`}>
                {
                    isUploading && <Icons icon="loading" size={20} />
                }
                <p className={`m-0 opacity-${isUploading && '0'}`}>
                    {isUploaded ? textCharge : text}
                </p>
                <input type="file" id={`up-${text}`} onChange={handleFileChange} />
            </label>
        </>
    )
}