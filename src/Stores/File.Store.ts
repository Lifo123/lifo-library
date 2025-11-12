import { deepMap } from "nanostores";

type FileStore = {
    uploads: Record<string, File>;
}


export const $files = deepMap<FileStore>({
    uploads: {}
})
