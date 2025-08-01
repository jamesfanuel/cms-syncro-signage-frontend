<script>
    export let items = [];
</script>

<ul class="bullet-list">
    {#each items as item}
        <li>{item}</li>
    {/each}
</ul>

<style>
    .bullet-list {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    .bullet-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: #374151;
        line-height: 1.4;
    }

    .bullet-list li::before {
        content: "✔️";
        color: #5e6b75;
        flex-shrink: 0;
    }
</style>
