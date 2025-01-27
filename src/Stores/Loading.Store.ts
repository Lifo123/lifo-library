import { map } from "nanostores";

interface loadingProps {
    [key: string]: boolean
}

export const $loading = map<loadingProps>({
    G_fetch: false,
})


const set = (id: string, value: boolean) => {
    $loading.setKey(id, value)
}


const promise = async (funct: () => void, id: string) => {
    if ($loading.get()[id]) {
        console.warn(`Promise for ${id} is already running.`);
        return;
    }

    try {
        Loading.start(id);
        await funct();
    } catch (error) {
        console.error(`Error in Loading.promise for ${id}:`, error);
    } finally {
        Loading.end(id);
    }
};



export const Loading = {
    set,
    start: (id: string) => set(id, true),
    end: (id: string) => set(id, false),
    promise
}
