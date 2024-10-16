<template>
  <div class="image-processor">
    <div class="upload-section">
      <button class="upload-btn" @click="triggerFileInput">UPLOAD FILES</button>
      <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept="image/*" style="display: none;">
      <button class="clear-btn" @click="clearQueue">CLEAR QUEUE</button>
    </div>
    
    <div class="image-preview-container">
      <button class="nav-btn left" @click="scrollImages('left')" v-if="files.length > 1">&lt;</button>
      <div class="image-preview" ref="imagePreview">
        <div class="image-card" v-for="(file, index) in files" :key="index" @click="selectImage(file)">
          <button class="delete-btn" @click.stop="deleteImage(index)">×</button>
          <img :src="getImagePreview(file)" :alt="file.name">
          <div class="compression-ratio">-{{ file.compressionRatio || 20 }}%</div>
          <button class="download-btn" @click.stop="downloadImage(file)">DOWNLOAD</button>
        </div>
        <div class="image-card empty" v-if="files.length === 0">
          <span>No images uploaded</span>
        </div>
      </div>
      <button class="nav-btn right" @click="scrollImages('right')" v-if="files.length > 1">&gt;</button>
    </div>
    
    <button class="download-all-btn" @click="downloadAllImages" v-if="files.length > 0">DOWNLOAD ALL</button>

    <div class="selected-image-section" v-if="selectedFile">
      <div class="image-info-bar">
        <div class="image-info original">Original: {{ selectedFile.size }} KB</div>
        <div class="image-info compressed">Compressed: {{ compressedSize }} KB</div>
      </div>
      <div class="image-comparison-container">
        <div class="image-comparison">
          <div class="comparison-slider" ref="slider">
            <img :src="getImagePreview(selectedFile)" alt="Original" class="original-image">
            <img :src="compressedImagePreview" alt="Compressed" class="compressed-image">
            <div class="slider-handle" @mousedown="startSliding" :style="{ left: sliderPosition + '%' }"></div>
          </div>
        </div>
        <div class="image-settings">
          <div class="quality-slider">
            <input type="range" v-model.number="quality" min="0" max="100" step="1" @input="updateCompressedImage" orient="vertical">
            <label>Quality: {{ quality }}%</label>
          </div>
          <button class="apply-btn" @click="applyCompression">APPLY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs';

export default {
  name: 'ImageProcessor',
  data() {
    return {
      files: [],
      quality: 80,
      selectedFile: null,
      sliderPosition: 50,
      compressedImagePreview: null,
      compressedSize: 0
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: Math.round(file.size / 1024),
        compressionRatio: 20
      }));
      this.files = [...this.files, ...newFiles];
      if (this.files.length > 0 && !this.selectedFile) {
        this.selectImage(this.files[0]);
      }
    },
    clearQueue() {
      this.files.forEach(file => URL.revokeObjectURL(file.preview));
      this.files = [];
      this.selectedFile = null;
    },
    getImagePreview(fileObj) {
      return fileObj.preview;
    },
    selectImage(fileObj) {
      this.selectedFile = fileObj;
      this.updateCompressedImage();
    },
    deleteImage(index) {
      URL.revokeObjectURL(this.files[index].preview);
      this.files.splice(index, 1);
      if (this.files.length === 0) {
        this.selectedFile = null;
      } else if (this.selectedFile === this.files[index]) {
        this.selectImage(this.files[0]);
      }
    },
    scrollImages(direction) {
      const container = this.$refs.imagePreview;
      const scrollAmount = container.clientWidth;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    },
    startSliding(e) {
      e.preventDefault();
      document.addEventListener('mousemove', this.slide);
      document.addEventListener('mouseup', this.stopSliding);
    },
    slide(e) {
      const slider = this.$refs.slider;
      const rect = slider.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;
      pos = Math.max(0, Math.min(pos, 1));
      this.sliderPosition = pos * 100;
    },
    stopSliding() {
      document.removeEventListener('mousemove', this.slide);
      document.removeEventListener('mouseup', this.stopSliding);
    },
    updateCompressedImage() {
      if (!this.selectedFile) return;
      new Compressor(this.selectedFile.file, {
        quality: this.quality / 100,
        success: (result) => {
          this.compressedImagePreview = URL.createObjectURL(result);
          this.compressedSize = Math.round(result.size / 1024);
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
    applyCompression() {
      if (!this.selectedFile) return;
      const index = this.files.findIndex(f => f === this.selectedFile);
      if (index !== -1) {
        const compressionRatio = Math.round((1 - this.compressedSize / this.selectedFile.size) * 100);
        this.files[index] = {
          ...this.selectedFile,
          compressionRatio: compressionRatio
        };
        this.selectedFile = this.files[index];
      }
    },
    downloadImage(file) {
      new Compressor(file.file, {
        quality: (100 - file.compressionRatio) / 100,
        success: (result) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(result);
          link.download = `compressed_${file.name}`;
          link.click();
          URL.revokeObjectURL(link.href);
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
    downloadAllImages() {
      this.files.forEach(file => this.downloadImage(file));
    }
  }
}
</script>

<style scoped>
.image-processor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.upload-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.upload-btn, .clear-btn, .download-all-btn {
  padding: 15px 30px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.upload-btn {
  background-color: #4285f4;
  color: white;
}

.clear-btn {
  background-color: #ea4335;
  color: white;
}

.download-all-btn {
  background-color: #34a853;
  color: white;
  margin: 20px auto;
  display: block;
}

.image-preview-container {
  position: relative;
  margin-bottom: 30px;
  height: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.image-preview {
  display: flex;
  height: 100%;
  overflow-x: auto;
  gap: 20px;
  padding: 20px;
  scroll-behavior: smooth;
}

.image-card {
  position: relative;
  width: 300px;
  height: 300px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
}

.compression-ratio {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 18px;
}

.download-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
}

.nav-btn.left {
  left: 0;
}

.nav-btn.right {
  right: 0;
}

.selected-image-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-info-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.image-info {
  font-size: 16px;
  font-weight: bold;
}

.image-comparison-container {
  display: flex;
  gap: 20px;
}

.image-comparison {
  width: calc(100% - 100px);
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
}

.comparison-slider {
  position: relative;
  width: 100%;
  height: 100%;
}

.comparison-slider img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.compressed-image {
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  left: 50%;
  cursor: ew-resize;
}

.slider-handle::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80px;
}

.quality-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.quality-slider input[type="range"] {
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
  width: 8px;
  height: 400px;
  padding: 0 5px;
}

.quality-slider label {
  margin-top: 10px;
  text-align: center;
}

.apply-btn {
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: #34a853;
  color: white;
  transition: background-color 0.3s;
}
</style>