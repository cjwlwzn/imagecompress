<template>
  <header class="header">
    <div class="header-content">
      <div class="image-container">
                <a href="/" @click.prevent="refreshPage">
          <img src="/header-image.svg" alt="Image Compression Illustration" class="header-image">
        </a>
      </div>
      <div class="divider"></div>
      <div class="description">
        <p>
          Welcome to our <strong>Image Compressor</strong> tool. Here's how to use it:
        </p>
        <p>
          Upload up to <strong>20 images</strong>. Wait for the compression to finish. Click thumbnails in the queue for quality setting. Use the slider to control the compression level and mouse/gestures to compare images.
        </p>
        <p>
          <strong>Upload</strong> your images using the "UPLOAD FILES" button.
        </p>
        <p>
          <strong>Select</strong> an image to view and adjust compression settings.
        </p>
        <p>
          Use the <strong>quality slider</strong> to adjust the compression level.
        </p>
        <p>
          Click <strong>"APPLY"</strong> to confirm your settings.
        </p>
        <p>
          <strong>Download</strong> individual images or use "DOWNLOAD ALL" for batch processing.
        </p>
        <p>
          Our tool helps you <strong>reduce file sizes</strong> while maintaining good image quality, perfect for web optimization and faster loading times.
        </p>
        <p class="privacy-note">
  <strong>Important:</strong> We do not store or save any user data. Your privacy and security are our top priorities.
</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    refreshPage() {
      window.location.reload();
    }
  }
}
</script>

<style scoped>
.header {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #4285f4;
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.divider {
  height: 2px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.description {
  font-size: 16px;
  line-height: 1.6;
}

.description p {
  margin-bottom: 15px;
}

strong {
  font-weight: bold;
  color: #4285f4;
}

.privacy-note {
  background-color: #f8f8f8;
  border-left: 4px solid #4285f4;
  padding: 10px;
  margin-top: 20px;
  font-style: italic;
}
</style>