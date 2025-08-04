<script>
    import { Building2, CalendarDays, MonitorPlay } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";
    export let orders = [];

    import { deleteOrderItem } from "../../../../usecases/order/order.js";

    const dispatch = createEventDispatcher();

    let showItemModal = false;
    let selectedItems = [];

    function handleEdit(order) {
        dispatch("edit", order);
    }

    function handleAddItem(order) {
        dispatch("addItem", order);
    }

    function handleDelete(order) {
        if (confirm(`Are you sure you want to delete "${order.order_name}"?`)) {
            dispatch("delete", { id: order.order_id });
        }
    }

    async function handleItemDelete(orderItemId) {
        const confirmed = confirm(`Are you sure you want to delete this item?`);
        if (!confirmed) return;

        try {
            await deleteOrderItem(orderItemId);
            selectedItems = selectedItems.filter(
                (item) => item.order_item_id !== orderItemId,
            );
        } catch (error) {
            console.error("Failed to delete order item:", error);
            alert("Failed to delete order item.");
        }
    }

    function openItemList(order) {
        selectedItems = order.order_items || [];
        showItemModal = true;
    }

    function closeModal() {
        showItemModal = false;
        selectedItems = [];
    }
</script>

<!-- 🧾 Table Orders -->
<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">📣 Campaign</th>
            <th class="px-4 py-2 text-left">🧾 Order</th>
            <th class="px-4 py-2 text-left">⏱ Duration</th>
            <th class="px-4 py-2 text-left">👤 Created By</th>
            <th class="px-4 py-2 text-left">📅 Created At</th>
            <th class="px-4 py-2 text-left">🎯 Total Items</th>
            <th class="px-4 py-2 text-left">⚙️ Actions</th>
            <th class="px-4 py-2 text-left">⚙️ Add Item</th>
        </tr>
    </thead>

    <tbody>
        {#each orders as order, index}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">{order.campaign_name}</td>
                <td class="px-4 py-2">{order.order_name}</td>
                <td class="px-4 py-2">{order.duration}</td>
                <td class="px-4 py-2">{order.created_by}</td>
                <td class="px-4 py-2">{order.created_at}</td>
                <td class="px-4 py-2">
                    <button
                        class="text-indigo-600 hover:underline"
                        on:click={() => openItemList(order)}
                    >
                        {order.order_items?.length || 0} item(s)
                    </button>
                </td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-blue-500 hover:text-blue-700 transition"
                            on:click={() => handleEdit(order)}
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            class="text-red-500 hover:text-red-700 transition"
                            on:click={() => handleDelete(order)}
                            title="Delete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-green-500 hover:text-green-700 transition"
                            on:click={() => {
                                handleAddItem(order);
                            }}
                            title="Add Item"
                        >
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="7" class="text-center text-gray-500 p-4 text-sm">
                    No data found.
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- 🪟 Modal for Order Items -->
{#if showItemModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-4xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Order Items
            </h2>

            <ul class="space-y-4 max-h-[400px] overflow-y-auto pr-3">
                {#each selectedItems as item}
                    <li
                        class="relative border border-gray-300 rounded-xl bg-gray-100 p-5 shadow hover:bg-gray-200 transition"
                    >
                        <!-- Tombol Delete -->
                        <button
                            class="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                            title="Delete Item"
                            on:click={() =>
                                handleItemDelete(item.order_item_id)}
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>

                        <!-- Outlet Name -->
                        <div
                            class="flex items-center mb-2 text-gray-800 uppercase font-bold text-base"
                        >
                            <Building2 class="w-5 h-5 mr-2 text-gray-600" />
                            {item.outlet_name}
                        </div>

                        <!-- Start - End Date -->
                        <div
                            class="flex items-center text-gray-700 text-sm mb-1"
                        >
                            <CalendarDays class="w-4 h-4 mr-2 text-gray-500" />
                            {item.start_date} UNTIL {item.end_date}
                        </div>

                        <!-- Screen and POS -->
                        <div class="flex items-center text-gray-700 text-sm">
                            <MonitorPlay class="w-4 h-4 mr-2 text-gray-500" />
                            Screen {item.screen_name} - POS {item.pos_no}
                        </div>
                    </li>
                {/each}

                {#if selectedItems.length === 0}
                    <li class="text-gray-500 text-center text-sm italic">
                        No items found.
                    </li>
                {/if}
            </ul>

            <div class="mt-8 text-right">
                <button
                    class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow transition"
                    on:click={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}
