export async function uploadVideoInChunks(file, onProgress, chunkSize = 1024 * 1024) {
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("filename", file.name);
        formData.append("chunkIndex", i);
        formData.append("totalChunks", totalChunks);

        const BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(BASE_URL + "/upload.php", {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error(`Gagal upload chunk ${i + 1}`);

        const percent = Math.round(((i + 1) / totalChunks) * 100);
        onProgress?.(percent);
    }
}
