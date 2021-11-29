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
      let lastYOffset = 0;
      document.addEventListener('scroll', (e) => {
        window.pageYOffset > lastYOffset ? this.$toTop.classList.remove('hide') : this.$toTop.classList.add('hide');
        lastYOffset = window.pageYOffset;
      });
      this.$toTop.addEventListener('click', (e) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },
  };
  // Start initialization.
  app.init();
})();