<script>
  export let searchTerm = ''; // dikontrol dari parent

  let groupedVideos = {
    TV1: [
      {
        fileName: 'XONE_P00342_1998x1080_20250623180310_LOWRES.mp4',
        extension: 'mp4',
        duration: 120,
        sizeMB: 4.2,
        url: 'https://mms.cinema21.co.id/media/masterlowres//iklan/XONE_P00342_1998x1080_20250623180310_LOWRES.mp4',
      },
      {
        fileName: 'XONE_P00325_1920x1080_20250307103532_LOWRES.mp4',
        extension: 'mp4',
        duration: 120,
        sizeMB: 4.2,
        url: 'https://mms.cinema21.co.id/media/masterlowres//iklan/XONE_P00325_1920x1080_20250307103532_LOWRES.mp4',
      }
    ],
    TV2: [
      {
        fileName: 'teaser.webm',
        extension: 'webm',
        duration: 90,
        sizeMB: 2.9,
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      }
    ]
  };

  let expandedTV = null;
  let activeFileName = null;

  function toggleTV(tvKey) {
    expandedTV = expandedTV === tvKey ? null : tvKey;
    activeFileName = null; // reset video preview saat berpindah grup
  }

  function togglePreview(fileName) {
    activeFileName = activeFileName === fileName ? null : fileName;
  }

  function handleDelete(tvKey, fileName) {
    if (confirm('Yakin ingin menghapus konten ini?')) {
      groupedVideos[tvKey] = groupedVideos[tvKey].filter(v => v.fileName !== fileName);
      groupedVideos = { ...groupedVideos };

      if (activeFileName === fileName) activeFileName = null;
    }
  }

  $: filteredGroupedVideos = Object.fromEntries(
    Object.entries(groupedVideos)
      .map(([tvKey, videos]) => {
        const filtered = videos.filter(video =>
          video.fileName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return [tvKey, filtered];
      })
      .filter(([, videos]) => videos.length > 0)
  );
</script>

<style>
  .animate-fade-in {
    animation: fadeIn 0.25s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<div class="p-6 min-h-screen bg-gradient-to-b from-gray-300 to-white">
  <h2 class="text-2xl font-bold mb-4 text-gray-800">📺 Daftar Konten per TV</h2>

  {#if Object.keys(filteredGroupedVideos).length === 0}
    <p class="text-gray-600">
      Tidak ditemukan konten dengan nama "<strong>{searchTerm}</strong>".
    </p>
  {/if}

  {#each Object.keys(filteredGroupedVideos) as tvKey}
    <div class="mb-4 border rounded shadow-sm">
      <button
        type="button"
        class="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
        on:click={() => toggleTV(tvKey)}
      >
        <h3 class="text-lg font-semibold text-gray-800">🖥️ {tvKey}</h3>
        <svg
          class="w-4 h-4 transition-transform duration-200"
          style="transform: rotate({expandedTV === tvKey ? 180 : 0}deg)"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {#if expandedTV === tvKey}
        <ul class="space-y-2 bg-white p-4">
          {#each filteredGroupedVideos[tvKey] as video}
            <li class="rounded border border-gray-200 shadow">
              <button
                type="button"
                class="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
                on:click={() => togglePreview(video.fileName)}
              >
                <span class="text-gray-800 font-medium">{video.fileName}</span>
                <button
                  type="button"
                  class="text-sm text-red-600 hover:text-red-800 focus:outline-none"
                  on:click|stopPropagation={() => handleDelete(tvKey, video.fileName)}
                >
                  Hapus
                </button>

              </button>

              {#if activeFileName === video.fileName}
                <div class="px-4 pb-4 animate-fade-in">
                  <div class="text-sm text-gray-600 mb-2">
                    <div><strong>Ekstensi:</strong> .{video.extension}</div>
                    <div><strong>Durasi:</strong> {video.duration} detik</div>
                    <div><strong>Ukuran:</strong> {video.sizeMB} MB</div>
                  </div>
                  <video
                    controls
                    src={video.url}
                    class="w-full max-w-xl rounded border"
                  >
                    <track kind="captions" label="Default" srcLang="en" />
                  </video>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/each}
</div>
