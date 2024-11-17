import { map } from "nanostores";

interface ErrorProps {
    [key: string]: string
}

export const $error = map<ErrorProps>({})


const set = (id: string, message: string) => {
    $error.setKey(id, message)
}
const clear = (id: string) => {
    $error.setKey(id, '')
}

interface PromiseProps {
    id: string,
    message: string,
    delayIn?: number,
    delayOut?: number
}

const promise = async (funct: () => void, props?: PromiseProps) => {
    const id = props?.id || 'global';
    const message = props?.message || '';

    await new Promise<void>((resolve) => setTimeout(() => {
        set(id, message);
        resolve();
    }, props?.delayIn || 0));

    await funct();

    await new Promise<void>((resolve) => setTimeout(() => {
        set(id, message);
        resolve();
    }, props?.delayOut || 0));
}

export const Error = {
    set, clear, promise
}