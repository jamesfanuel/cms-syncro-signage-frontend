// src/use_case/helpers/createMasterUseCase.js
import { writable, derived, get } from 'svelte/store';

export function createMasterUseCase(initialData, defaultFormData) {
    const items = writable(initialData);
    const search = writable('');
    const modal = writable({ show: false, type: null, index: null });
    const form = writable({ ...defaultFormData });

    const filteredItems = derived([items, search], ([$items, $search]) => {
        const query = (typeof $search === 'string' ? $search : '').toLowerCase();

        const filtered = query
            ? $items.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(query)
                )
            )
            : $items;

        return filtered.map((item, index) => {
            const totalProducts = Array.isArray(item.products)
                ? item.products.length
                : item.totalProducts ?? 0;

            return { ...item, totalProducts, index };
        });
    });

    function openAdd() {
        form.set({ ...defaultFormData });
        modal.set({ show: true, type: 'add', index: null });
    }

    function openEdit(index) {
        items.update((list) => {
            const item = list[index];
            form.set({ ...item });
            modal.set({ show: true, type: 'edit', index });
            return list;
        });
    }

    function deleteItem(index) {
        modal.set({ show: true, type: 'delete', index });
    }

    function confirmDelete() {
        modal.update(($modal) => {
            items.update((list) => {
                if ($modal.index !== null) {
                    list.splice($modal.index, 1);
                }
                return [...list];
            });
            return { show: false, type: null, index: null };
        });
    }

    function handleSubmit() {
        const newItem = get(form);

        modal.update(($modal) => {
            items.update((list) => {
                switch ($modal.type) {
                    case 'add':
                        return [...list, newItem];
                    case 'edit':
                        if ($modal.index !== null) {
                            const updated = [...list];
                            updated[$modal.index] = newItem;
                            return updated;
                        }
                        return list;
                    default:
                        return list;
                }
            });

            return { show: false, type: null, index: null };
        });
    }

    function closeModal() {
        modal.set({ show: false, type: null, index: null });
    }

    function updateSearch(query) {
        search.set(typeof query === 'string' ? query : '');
    }

    return {
        items,
        filteredItems,
        form,
        modal,
        search,
        updateSearch,
        openAdd,
        openEdit,
        deleteItem,
        confirmDelete,
        handleSubmit,
        closeModal,
    };
}
