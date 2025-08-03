// use_case/orders/order.js
import { createMasterUseCase } from "../helpers/createMasterUseCase";

const initialOrders = [
    {
        id: "ORD001",
        client: "PT JAYA MAKMUR",
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        status: "Active",
    },
    {
        id: "ORD002",
        client: "JAYA TERUS",
        startDate: "2025-07-05",
        endDate: "2025-07-20",
        status: "Scheduled",
    },
];

const defaultForm = {
    id: "",
    client: "",
    startDate: "",
    endDate: "",
    status: "",
};

export const orderUseCase = () => {
    const { items, filteredItems, ...rest } = createMasterUseCase(initialOrders, defaultForm);

    return {
        orders: items,
        filteredOrders: filteredItems,
        ...rest,
    };
};
