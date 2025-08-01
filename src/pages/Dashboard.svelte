<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import ChartDataLabels from "chartjs-plugin-datalabels";

    let chart;

    const tvData = [
        { outlet: "Outlet A", totalTVs: 10 },
        { outlet: "Outlet B", totalTVs: 7 },
        { outlet: "Outlet C", totalTVs: 12 },
        { outlet: "Outlet D", totalTVs: 5 },
    ];

    const labels = tvData.map((d) => d.outlet);
    const data = tvData.map((d) => d.totalTVs);
    const totalTV = data.reduce((a, b) => a + b, 0);

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

    onMount(() => {
        const ctx = document.getElementById("tvPieChart").getContext("2d");

        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        label: "Jumlah TV",
                        data,
                        backgroundColor: backgroundColors.slice(0, data.length),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1200,
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.raw || 0;
                                const percent = (
                                    (value / totalTV) *
                                    100
                                ).toFixed(1);
                                return `${label}: ${value} TV (${percent}%)`;
                            },
                        },
                        backgroundColor: "#5E6B75",
                        titleColor: "#fff",
                        bodyColor: "#fff",
                        cornerRadius: 6,
                        padding: 10,
                    },
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        color: "#fff",
                        font: {
                            weight: "bold",
                            size: 14,
                        },
                        formatter: (value) => {
                            const percent = (value / totalTV) * 100;
                            return percent.toFixed(1) + "%";
                        },
                    },
                    title: {
                        display: true,
                        text: "Distribusi TV per Outlet",
                        color: "#5E6B75",
                        font: {
                            size: 18,
                        },
                    },
                },
            },
            plugins: [ChartDataLabels],
        });
    });
</script>

<section class="w-full px-6 py-10 bg-gradient-to-b from-gray-100 to-white">
    <h2 class="text-xl font-bold text-[#5E6B75] mb-6">Dashboard</h2>
    <div
        class="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6"
    >
        <!-- Pie Chart -->
        <div class="w-full md:w-1/2 h-80">
            <canvas id="tvPieChart" class="w-full h-full"></canvas>
        </div>

        <!-- Data Summary -->
        <div class="w-full md:w-1/2 space-y-3">
            <h3 class="text-md font-semibold text-[#5E6B75] mb-2">
                Ringkasan Data:
            </h3>
            {#each tvData as item, i}
                <div class="summary-item border border-gray-200">
                    <div class="flex items-center space-x-2">
                        <span
                            class="w-3 h-3 rounded-full"
                            style="background-color: {backgroundColors[i]}"
                        ></span>
                        <span>{item.outlet}</span>
                    </div>
                    <div class="text-gray-600 font-medium">
                        {item.totalTVs} TV ({(
                            (item.totalTVs / totalTV) *
                            100
                        ).toFixed(1)}%)
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .summary-item {
        @apply flex justify-between items-center py-2 px-4 rounded-lg text-sm shadow-sm bg-gray-50;
    }
</style>
