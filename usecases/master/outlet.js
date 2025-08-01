import { createMasterUseCase } from "../helpers/createMasterUseCase";

const initialOutlets = [
    {
        code: "O001",
        name: "Outlet Utama",
        address: "Jl. Jendral Sudirman No.12",
        city: "Jakarta",
        client: "PT JAYA MAKMUR"
    },
    {
        code: "O002",
        name: "Outlet Ruko Margonda",
        address: "Jl. Margonda Raya No.88",
        city: "Depok",
        client: "JAYA TERUS"
    }
];

const defaultForm = {
    code: "",
    name: "",
    address: "",
    city: "",
    client: ""
};

export const outletUseCase = () => {
    const {
        items,
        filteredItems,
        ...rest
    } = createMasterUseCase(initialOutlets, defaultForm);

    return {
        outlets: items,              // raw data
        filteredOutlets: filteredItems, // for filtered search
        ...rest
    };
};
