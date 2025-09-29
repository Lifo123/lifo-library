//DEVELOP THIS MADAFAKA

'use client'
import React from "react";
import { toast } from "../Toast/Toast.Store.js";
import Icons from "../Icons/Icons.js";
import { $files } from "../../Stores/File.Store.js";

interface Props {
    className?: string;
    text?: string;
    textCharge?: string;
    accept?: string | string[];
    delay?: number;

    success?: string;
    error?: string;

    onUpload?: (file: File) => void | Promise<void>;

}


export default function UploadBtn({
    text = 'Upload',
    textCharge = 'Uploaded',
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
            toast.error(props.error || 'Error al cargar el archivo', { position: 'bottom-left' });
            return;
        }

        if (props.accept) {
            const allowedExtensions = Array.isArray(props.accept)
                ? props.accept.join('|')
                : props.accept;
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const regex = new RegExp(`^(${allowedExtensions})$`, 'i');

            if (!fileExtension || !regex.test(fileExtension)) {
                toast.error(`Archivo no permitido.`, { position: 'bottom-left' });
                return;
            }
        }

        try {
            setIsUploading(true);
            await new Promise(res => setTimeout(res, props.delay ?? 850));

            const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
            $files.setKey('uploads.' + nameWithoutExt, file);


            if (props.onUpload) {
                await props.onUpload(file);
            } else {
                toast.success(props.success || 'Archivo cargado', { position: 'bottom-left' });
            }

            setIsUploading(false);
            setIsUploaded(true);
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Error: ${error}`, { position: 'bottom-left' });
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setIsUploaded(false)
        }, 2500)
    }, [isUploaded])

    return (
        <>
            <button className={`uploadbtn btn d-flex f-center relative ${props.className || 'btn-third rounded-md w-max mx-auto'}`} onClick={() => {
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = normalizeAccept();
                input.click();
                input.onchange = async (e: any) => {
                    handleFileChange(e.target.files[0]);
                }
            }}>
                {
                    isUploading && <span className="absolute top-1/2 left-1/2 -translate-1/2"><Icons icon="loading" size={20} /></span>
                }
                <p className={`m-0 ${isUploading ? 'opacity-0' : 'opacity-100'}`}>
                    {isUploaded ? textCharge : text}
                </p>
            </button>
        </>
    )
}