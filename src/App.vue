<template>
  <div id="app">
    <Header />
    <main>
      <ImageProcessor />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ImageProcessor from './components/ImageProcessor.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    ImageProcessor,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 可以在这里添加全局样式 */
</style>