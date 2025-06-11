import { map } from "nanostores";

export interface loadingProps {
    [key: string]: boolean
}

export const $loading = map<loadingProps>({
    G_fetch: false,
    card_loading: false,
    page_load: false,
})


const set = (id: string, value: boolean) => {
    $loading.setKey(id, value)
}

const promise = async (funct: () => void | Promise<void>, id: string) => {
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

$loading.subscribe((value) => {
    if (value.page_load) document.getElementById('page-load')?.remove()
})



export const Loading = {
    start: (id: string) => set(id, true),
    end: (id: string) => set(id, false),
    promise,
    setKey: (id: string, value: boolean) => set(id, value)
}
