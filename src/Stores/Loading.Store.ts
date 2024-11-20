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

const promise = async (funct: () => Promise<void> | void, props?: PromiseProps) => {
    const id = props?.id || 'G_fetch';

    if ($loading.get()[id]) {
        console.warn(`Promise for ${id} is already running.`);
        return;
    }

    try {
        set(id, true);
        if (props?.delayIn) {
            await new Promise<void>((resolve) => setTimeout(resolve, props.delayIn));
        }

        await funct();
    } catch (error) {
        console.error(`Error in Loading.promise for ${id}:`, error);
    } finally {
        await new Promise<void>((resolve) => setTimeout(() => {
            set(id, false);
            resolve();
        }, props?.delayOut || 0));
    }
};


export const Loading = {
    set,
    start: (id: string) => set(id, true),
    end: (id: string) => set(id, false),
    promise
}
