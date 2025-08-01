<script>
  import { uploadVideo } from '../../api/videos.js';

  let videos = [];
  let isDragging = false;
  let isUploading = false;
  let uploadProgress = 0;

  // Handle drag & drop
  function handleDrop(event) {
    event.preventDefault();
    isDragging = false;

    if (isUploading) {
      alert("Tunggu proses upload selesai.");
      return;
    }

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      processFile(file);
    } else {
      alert("File harus berupa video!");
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    isDragging = true;
  }

  function handleDragLeave() {
    isDragging = false;
  }

  // Manual file input
  function handleManualSelect(event) {
    const file = event.target.files[0];

    if (isUploading) {
      alert("Tunggu proses upload selesai.");
      return;
    }

    if (file && file.type.startsWith('video/')) {
      processFile(file);
    } else {
      alert("File harus berupa video!");
    }

    event.target.value = null;
  }

  // Upload file + ambil metadata + thumbnail
  async function processFile(file) {
    try {
      isUploading = true;
      uploadProgress = 0;

      // Simulasi progress
      const progressTimer = setInterval(() => {
        if (uploadProgress < 90) {
          uploadProgress += Math.random() * 10;
        }
      }, 150);

      // Dummy metadata dari uploadVideo
      const meta = await uploadVideo(file); // Harus mengembalikan { url, duration, extension, fileName, sizeMB }

      clearInterval(progressTimer);
      uploadProgress = 100;

      const thumbnail = await generateThumbnail(meta.url);

      videos = [{
        ...meta,
        thumbnail
      }];

      setTimeout(() => {
        isUploading = false;
        uploadProgress = 0;
      }, 600);
    } catch (err) {
      alert("Gagal upload: " + err.message);
      isUploading = false;
      uploadProgress = 0;
    }
  }

  // Buat thumbnail dari video
  function generateThumbnail(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');

      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;

      video.onloadeddata = () => {
        canvas.width = 320;
        canvas.height = 180;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        resolve(imageUrl);
      };

      video.onerror = () => reject('Gagal membuat thumbnail');
    });
  }
</script>

<style>
  .drop-area {
    @apply border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center text-center transition-all;
  }

  .drop-area.drag-over {
    @apply border-blue-500 bg-blue-50;
  }
</style>

<div class="p-6 pt-20 overflow-auto min-h-screen">
  <h2 class="text-xl font-semibold mb-4">Upload Video (Drag & Drop)</h2>

  <!-- Progress bar -->
  {#if isUploading}
    <div class="w-full bg-gray-200 rounded h-4 overflow-hidden mb-4">
      <div
        class="h-full bg-blue-500 transition-all"
        style="width: {uploadProgress}%"
      ></div>
    </div>
  {/if}

  <!-- Drop zone -->
  <div
    role="button"
    tabindex="0"
    aria-label="Drop zone"
    class:drag-over={isDragging}
    class="drop-area"
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
  >

    <p class="text-gray-600">Tarik dan jatuhkan file video di sini</p>
    <p class="text-sm text-gray-400">atau pilih file secara manual</p>
    <input
      type="file"
      accept="video/*"
      on:change={handleManualSelect}
      class="mt-3"
    />
  </div>

  <!-- Preview -->
  {#if videos.length > 0}
    <div class="mt-6 flex justify-center">
      <div class="bg-white shadow p-6 rounded max-w-2xl w-full">
        {#each videos as video}
          <div class="flex flex-col items-center gap-4">
            <img src={video.thumbnail} alt="thumbnail"
              class="w-48 h-auto object-cover rounded shadow" />

            <div class="text-center">
              <div class="font-semibold">{video.fileName}</div>
              <div class="text-sm text-gray-500">
                .{video.extension} • {video.duration}s • {video.sizeMB} MB
              </div>
            </div>

            <video
              controls
              src={video.url}
              class="w-full max-w-xl rounded shadow"
            >
              <track kind="captions" label="No captions available" />
            </video>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
