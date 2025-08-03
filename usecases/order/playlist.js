import { createMasterUseCase } from "../helpers/createMasterUseCase";

const initialPlaylists = [
    {
        code: "PL001",
        name: "Promo Agustus",
        client: "PT JAYA MAKMUR",
        duration: "00:45:00",
        totalItems: 12,
        status: "Active"
    },
    {
        code: "PL002",
        name: "Produk Baru",
        client: "JAYA TERUS",
        duration: "00:30:00",
        totalItems: 8,
        status: "Inactive"
    }
];

const defaultForm = {
    code: "",
    name: "",
    client: "",
    duration: "",
    totalItems: 0,
    status: "Active"
};

export const playlistUseCase = () => {
    const {
        items,
        filteredItems,
        form,
        modal,
        openAdd,
        openEdit,
        deleteItem,
        confirmDelete,
        handleSubmit,
        closeModal,
        search,
        updateSearch
    } = createMasterUseCase(initialPlaylists, defaultForm);

    return {
        playlists: items,
        filteredPlaylists: filteredItems,
        form,
        modal,
        openAdd,
        openEdit,
        deleteItem,
        confirmDelete,
        handleSubmit,
        closeModal,
        search,
        updateSearch
    };
};
