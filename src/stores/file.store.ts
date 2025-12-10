'use client'
import { deepMap } from "@nanostores/deepmap";

type FileStore = {
    uploads: Record<string, File>;
}

export const $files = deepMap<FileStore>({
    uploads: {}
})
