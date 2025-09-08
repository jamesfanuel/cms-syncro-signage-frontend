<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Chart from "chart.js/auto";
    import ChartDataLabels from "chartjs-plugin-datalabels";
    import {
        fetchTotalScreen,
        fetchTotalOrder,
    } from "../../usecases/dashboard.js";

    let screenData = [];
    let orderData = [];
    let totalScreen = 0;
    let totalOrder = 0;
    let screenChart, orderChart;

    const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#F67019",
        "#00A950",
        "#C9CBCF",
    ];

    async function loadData() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) return;

        screenData = await fetchTotalScreen(Number(customerId));
        orderData = await fetchTotalOrder(Number(customerId));

        totalScreen = screenData.reduce((a, b) => a + b.total_screen, 0);
        totalOrder = orderData.reduce((a, b) => a + b.total, 0);

        setupScreenChart();
        setupOrderChart();
    }

    function setupScreenChart() {
        if (!screenData || screenData.length === 0) return;
        const labels = screenData.map((d) => d.outlet_name);
        const data = screenData.map((d) => d.total_screen);

        const ctx = document.getElementById("screenPieChart").getContext("2d");
        if (screenChart) screenChart.destroy();

        screenChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        label: "Jumlah Screen",
                        data,
                        backgroundColor: backgroundColors.slice(0, data.length),
                        borderWidth: 2,
                        borderColor: "#fff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || "";
                                const value = context.raw || 0;
                                const percent =
                                    totalScreen > 0
                                        ? ((value / totalScreen) * 100).toFixed(
                                              1,
                                          )
                                        : 0;
                                return `${label}: ${value} Screen (${percent}%)`;
                            },
                        },
                    },
                    legend: { display: false },
                    datalabels: {
                        color: "#fff",
                        font: { weight: "bold", size: 14 },
                        formatter: (value) =>
                            totalScreen === 0
                                ? "0%"
                                : ((value / totalScreen) * 100).toFixed(1) +
                                  "%",
                    },
                    title: {
                        display: true,
                        text: "Distribusi Screen per Outlet",
                        color: "#5E6B75",
                        font: { size: 18, weight: "bold" },
                    },
                },
            },
            plugins: [ChartDataLabels],
        });
    }

    function setupOrderChart() {
        if (!orderData || orderData.length === 0) return;

        // aggregate total order per outlet
        const outletTotals = {};
        orderData.forEach((d) => {
            outletTotals[d.outlet_name] =
                (outletTotals[d.outlet_name] || 0) + (d.total ?? 0);
        });

        const labels = Object.keys(outletTotals);
        const data = Object.values(outletTotals);

        const ctx = document.getElementById("orderPieChart").getContext("2d");
        if (orderChart) orderChart.destroy();

        orderChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        label: "Total Order",
                        data,
                        backgroundColor: backgroundColors.slice(0, data.length),
                        borderWidth: 2,
                        borderColor: "#fff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || "";
                                const value = context.raw || 0;
                                const percent =
                                    totalOrder > 0
                                        ? ((value / totalOrder) * 100).toFixed(
                                              1,
                                          )
                                        : 0;
                                return `${label}: ${value} Order (${percent}%)`;
                            },
                        },
                    },
                    legend: { display: false },
                    datalabels: {
                        color: "#fff",
                        font: { weight: "bold", size: 14 },
                        formatter: (value) =>
                            totalOrder === 0
                                ? "0%"
                                : ((value / totalOrder) * 100).toFixed(1) + "%",
                    },
                    title: {
                        display: true,
                        text: "Distribusi Order per Outlet",
                        color: "#5E6B75",
                        font: { size: 18, weight: "bold" },
                    },
                },
            },
            plugins: [ChartDataLabels],
        });
    }

    // group orderData by outlet for breakdown
    $: groupedOrders = (() => {
        const groups = {};
        orderData.forEach((item) => {
            if (!groups[item.outlet_name]) groups[item.outlet_name] = [];
            groups[item.outlet_name].push(item);
        });
        return groups;
    })();

    onMount(() => {
        loadData();
    });
</script>

<section
    class="w-full px-6 py-10 bg-gradient-to-b from-gray-100 to-white"
    transition:fly={{ y: 20, duration: 800 }}
>
    <h2 class="text-2xl font-bold text-[#5E6B75] mb-6" transition:fade>
        📊 Dashboard
    </h2>

    <!-- Grid 2 kolom untuk chart -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Screen Chart -->
        <div class="bg-white shadow-xl rounded-2xl p-6 h-96" transition:fade>
            <canvas id="screenPieChart" class="w-full h-full"></canvas>
        </div>

        <!-- Order Chart -->
        <div class="bg-white shadow-xl rounded-2xl p-6 h-96" transition:fade>
            <canvas id="orderPieChart" class="w-full h-full"></canvas>
        </div>
    </div>

    <!-- Ringkasan Data -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        transition:fade={{ delay: 300, duration: 800 }}
    >
        <!-- Ringkasan Screen -->
        <div class="bg-white shadow-lg rounded-xl p-4">
            <h3 class="text-lg font-semibold text-[#5E6B75] mb-3">
                Ringkasan Screen:
            </h3>
            {#each screenData as item, i}
                <div class="summary-item border border-gray-200">
                    <div class="flex items-center space-x-2">
                        <span
                            class="w-3 h-3 rounded-full"
                            style="background-color: {backgroundColors[i]}"
                        ></span>
                        <span class="font-medium">{item.outlet_name}</span>
                    </div>
                    <div class="text-gray-600 font-medium">
                        {item.total_screen} Screen ({totalScreen > 0
                            ? ((item.total_screen / totalScreen) * 100).toFixed(
                                  1,
                              )
                            : 0}%)
                    </div>
                </div>
            {/each}
        </div>

        <!-- Ringkasan Order grouped by outlet -->
        <div class="bg-white shadow-lg rounded-xl p-4">
            <h3 class="text-lg font-semibold text-[#5E6B75] mb-3">
                Ringkasan Order (per Screen):
            </h3>
            {#each Object.entries(groupedOrders) as [outlet, screens], i}
                <div class="mb-4">
                    <div class="flex items-center space-x-2 mb-2">
                        <span
                            class="w-3 h-3 rounded-full"
                            style="background-color: {backgroundColors[
                                i % backgroundColors.length
                            ]}"
                        ></span>
                        <span class="font-semibold">{outlet}</span>
                    </div>
                    <div class="ml-4 space-y-1">
                        {#each screens as s}
                            <div class="summary-item border border-gray-200">
                                <span>{s.screen_name}</span>
                                <span class="text-gray-600 font-medium">
                                    {s.total} Order ({totalOrder > 0
                                        ? (
                                              (s.total / totalOrder) *
                                              100
                                          ).toFixed(1)
                                        : 0}%)
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .summary-item {
        @apply flex justify-between items-center py-2 px-4 rounded-lg text-sm shadow-sm bg-gray-50 transition-all;
    }
</style>
