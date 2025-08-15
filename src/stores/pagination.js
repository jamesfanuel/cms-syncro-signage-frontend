// src/stores/pagination.js
import { writable, derived } from "svelte/store";

export function createPagination(dataStore, pageSize = 10) {
    const currentPage = writable(1);
    const pageSizeStore = writable(pageSize);

    const totalItems = derived(dataStore, ($data) => $data.length);
    const totalPages = derived([totalItems, pageSizeStore], ([$totalItems, $pageSize]) =>
        Math.max(1, Math.ceil($totalItems / $pageSize))
    );

    const paginatedData = derived(
        [dataStore, currentPage, pageSizeStore],
        ([$data, $page, $pageSize]) => {
            const start = ($page - 1) * $pageSize;
            return $data.slice(start, start + $pageSize);
        }
    );

    function setData(newData) {
        dataStore.set(newData);
        currentPage.set(1);
    }

    function nextPage() {
        currentPage.update((p) => p + 1);
    }

    function prevPage() {
        currentPage.update((p) => Math.max(1, p - 1));
    }

    return {
        currentPage,
        pageSize: pageSizeStore,
        totalItems,
        totalPages,
        paginatedData,
        setData,
        nextPage,
        prevPage
    };
}
