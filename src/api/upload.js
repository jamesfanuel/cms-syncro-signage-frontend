export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file); // ← HARUS "file", sesuai dengan $_FILES['file']

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(BASE_URL + "/upload.php", {
        method: "POST",
        body: formData,
    });

    const text = await res.text();
    console.log("RESPONSE:", text); // ← Tambahkan ini untuk debug

    if (!res.ok) {
        throw new Error(text || "Upload failed");
    }

    return text;
}
