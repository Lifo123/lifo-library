import { map } from "nanostores";

export interface loadingProps {
    [key: string]: boolean
}

export const $loading = map<loadingProps>({
    G_fetch: false,
    card_loading: false,
    page_load: true,
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


if (typeof window !== "undefined") {
    let timeout: NodeJS.Timeout | undefined;

    $loading.subscribe((value) => {
        const loader = document.getElementById('page-load');
        if (!loader) return;

        const isLoading = value.page_load;

        if (isLoading) {
            loader.classList.remove('hidden');
            if (timeout) clearTimeout(timeout);
        } else {
            timeout = setTimeout(() => {
                loader.classList.add('hidden');
            }, 150);
        }
    });
}



export const Loading = {
    start: (id: string) => set(id, true),
    end: (id: string) => set(id, false),
    promise,
    setKey: (id: string, value: boolean) => set(id, value)
}
