import { map } from "nanostores";

interface loadingProps {
    [key: string]: boolean
}

export const $loading = map<loadingProps>({
    G_all: false,
    G_fetch: false,
})


const set = (id: string, value: boolean) => {
    $loading.setKey(id, value)
}

interface PromiseProps {
    id?: string,
    delayIn?: number,
    delayOut?: number
}

const promise = async (funct: () => void, props?: PromiseProps) => {
    const id = props?.id || 'G_fetch';
    await new Promise<void>((resolve) => setTimeout(() => {
        set(id, true);
        resolve();
    }, props?.delayIn || 0));

    await funct();

    await new Promise<void>((resolve) => setTimeout(() => {
        set(id, false);
        resolve();
    }, props?.delayOut || 0));
}


export const Loading = {
    set, 
    promise
}
