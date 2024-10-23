export default {
    install(app, options) {
      app.config.globalProperties.$gtag = function(...args) {
        if (window.gtag) {
          window.gtag(...args);
        }
      }
  
      // Initialize Google Analytics sasasa
      if (window.gtag) {
        window.gtag('config', 'G-GDPDFNRJMQ');
      }
    }
  }