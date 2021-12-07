(() => {
  const atelier = {
    init() {
      this.cacheElements();
      this.generateAtelier();
    },
    cacheElements() {
      this.$atelierStudio = document.querySelector('.atelier-studios');
    },
    generateAtelier() {
      panelsBuilder(this.$atelierStudio, ATELIERS, 'homepage', 'Atelier ‐ Studio', 'art-and-exhibitions/detail/index.html', true);
    }
  };
  // Start initialization.
  atelier.init();
})();