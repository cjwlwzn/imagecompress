<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h2>About Image Compression</h2>
        <p>Image compression is the process of reducing the file size of an image without significantly degrading its quality. This is achieved through various algorithms that remove redundant or unnecessary data from the image file.</p>
      </div>
      <div class="footer-section">
        <h2>Why Compress Images?</h2>
        <ul>
          <li>Reduce storage space</li>
          <li>Faster website loading times</li>
          <li>Improved user experience</li>
          <li>Lower bandwidth usage</li>
        </ul>
      </div>
      <div class="footer-section">
        <h2>How to Use Our Tool</h2>
        <ol>
          <li>Upload up to 20 images</li>
          <li>Wait for automatic compression</li>
          <li>Adjust quality if needed</li>
          <li>Download individual or all images</li>
        </ol>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2024 Image Compressor. All rights reserved.</p>
      <p>This tool is for educational purposes only. Please respect copyright and image ownership rights.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 40px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  padding: 0 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  color: #4285f4;
  margin-bottom: 15px;
}

p, ul, ol {
  font-size: 14px;
  line-height: 1.6;
}

ul, ol {
  padding-left: 20px;
}

.copyright {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-size: 12px;
  color: #666;
}
</style>