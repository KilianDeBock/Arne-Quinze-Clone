(() => {
  const app = {
    init() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      this.$toTop = document.querySelector('.btn-top');
    },
    generateUI() {
      document.addEventListener('scroll', (e) => {
        if (window.pageYOffset > 100) {
          this.$toTop.classList.remove('hide');
        } else {
          this.$toTop.classList.add('hide');
        }
      });
    },
  };
  // Start initialization.
  app.init();
})();
