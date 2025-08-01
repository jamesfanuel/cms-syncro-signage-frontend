// usecases/video.js
import { writable, derived } from "svelte/store";
import { fetchVideoList } from "../src/api/videos/list";

// Stores
export const videos = writable([]);
export const keyword = writable("");
export const sortKey = writable("name");
export const sortAsc = writable(true);

export const progress = writable(0);
const CHUNK_SIZE = 1 * 1024 * 1024; // 1 MB


// Derived store untuk filtering dan sorting
export const filteredVideos = derived(
    [videos, keyword, sortKey, sortAsc],
    ([$videos, $keyword, $sortKey, $sortAsc]) => {
        let filtered = $videos.filter(v =>
            v.name.toLowerCase().includes($keyword.toLowerCase())
        );
        filtered.sort((a, b) => {
            if (a[$sortKey] < b[$sortKey]) return $sortAsc ? -1 : 1;
            if (a[$sortKey] > b[$sortKey]) return $sortAsc ? 1 : -1;
            return 0;
        });
        return filtered;
    }
);

// Actions
export const load = async () => {
    try {
        const res = await fetchVideoList();
        videos.set(res);
    } catch (err) {
        console.error("Gagal load video list", err);
    }
};


export async function uploadChunked(file, uploadUrl) {
    if (!file) {
        alert("Pilih file terlebih dahulu");
        return false;
    }

    progress.set(0);
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = Date.now();

    for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("fileName", file.name);
        formData.append("uploadId", uploadId);
        formData.append("chunkIndex", i);
        formData.append("totalChunks", totalChunks);

        try {
            await fetch(`${uploadUrl}/upload.php`, {
                method: "POST",
                body: formData,
            });

            progress.set(Math.floor(((i + 1) / totalChunks) * 100));
        } catch (err) {
            console.error("Gagal upload chunk", i, err);
            alert("Upload gagal di chunk " + (i + 1));
            return false;
        }
    }

    return true;
}

export const setKeyword = (val) => keyword.set(val);
export const toggleSort = (key) => {
    sortKey.update(current => {
        sortAsc.update(asc => (current === key ? !asc : true));
        return key;
    });
};

// Opsional: export bundling sebagai useCase
export const videoUseCase = {
    load,
    setKeyword,
    toggleSort,
    keyword,
    sortKey,
    sortAsc,
    filteredVideos,
    uploadChunked,
};
