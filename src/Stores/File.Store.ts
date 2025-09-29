import { deepMap } from "nanostores";

interface FileStore {
    uploads: Record<string, File>;
    [key: string]: any;
}


export const $files = deepMap<FileStore>({
    uploads: { }
})