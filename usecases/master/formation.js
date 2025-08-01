// src/lib/usecases/formation.js
import { createMasterUseCase } from "../helpers/createMasterUseCase";

const initialFormations = [
    { code: "TV001", name: "TV Lobby Utama", location: "Lantai 1", client: "PT JAYA MAKMUR" },
    { code: "TV002", name: "TV Resepsionis", location: "Lantai 2", client: "JAYA TERUS" },
    { code: "TV003", name: "TV Kantor Pusat", location: "Lantai 5", client: "GLOBAL MEDIA" },
];

const defaultForm = { code: "", name: "", location: "", client: "" };

export const formationUseCase = () => {
    const {
        items,
        filteredItems,
        ...rest
    } = createMasterUseCase(initialFormations, defaultForm);

    return {
        tvs: items,              // raw data
        filteredTVs: filteredItems, // for filtered search
        ...rest
    };
};
