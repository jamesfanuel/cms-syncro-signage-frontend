import { createMasterUseCase } from "../helpers/createMasterUseCase";

const initialCampaigns = [
    {
        code: "CMP001",
        name: "Promo Lebaran 2025",
        startDate: "2025-03-25",
        endDate: "2025-04-20",
        client: "PT JAYA MAKMUR"
    },
    {
        code: "CMP002",
        name: "Diskon Akhir Tahun",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        client: "JAYA TERUS"
    }
];

const defaultForm = {
    code: "",
    name: "",
    startDate: "",
    endDate: "",
    client: ""
};

export const campaignUseCase = () => {
    const {
        items,
        filteredItems,
        ...rest
    } = createMasterUseCase(initialCampaigns, defaultForm);

    return {
        campaigns: items,
        filteredCampaigns: filteredItems,
        ...rest
    };
};
