'use client'
import React from "react";
import { toast } from "../Toast/Toast.Store.js";
import CircleLoading from "./CircleLoading.js";

interface Props {
    className?: string;
    text: string;
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

        // Validar si el archivo existe
        if (!file) {
            toast.error(`Error al cargar el archivo`, { position: 'bottom-left' });
            return;
        }

        if (props.fileType) {
            // Crear regex para las extensiones permitidas
            const allowedExtensions = Array.isArray(props.fileType)
                ? props.fileType.join('|') // Convertir el array en un patrón regex
                : props.fileType;

            const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extensión en minúsculas
            const regex = new RegExp(`^(${allowedExtensions})$`, 'i'); // Crear regex para validar

            if (!fileExtension || !regex.test(fileExtension)) {
                toast.error(`Archivo no permitido.`, { position: 'bottom-left' });
                return;
            }
        }
        try {
            setIsUploading(true);
            // Ejecutar el callback si está definido
            if (props.onUpload) {
                await props.onUpload(file); // Pasar el archivo al callback
            } else {
                toast.show(`Archivo cargado`, { position: 'bottom-left' });
            }

            // Cambiar el estado a "cargado"
            setIsUploading(false);
            setIsUploaded(true);
        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            toast.error(`Error durante la carga del archivo`, { position: 'bottom-left' });
        }
    };


    return (
        <>
            <label className={`uploadbtn btn d-flex f-center relative ${props.className || 'btn-secondary br-6 w-max mx-auto'}`}>
                {
                    isUploading && <CircleLoading size={20} stroke={'rgb(var(--lb-black))'} />
                }
                <p className={`m-0 opacity-${isUploading && '0'}`}>
                    {isUploaded ? textCharge : text}
                </p>
                <input type="file" id={`up-${text}`} onChange={handleFileChange} />
            </label>
        </>
    )
}