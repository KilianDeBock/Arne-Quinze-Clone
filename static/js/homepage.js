(() => {
  const homepage = {
    init() {
      this.cacheElements();
      this.generateArtHighlights();
      this.generateAtelierHighlights();
    },
    cacheElements() {
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions_highlights');
      this.$atelierStudio = document.querySelector('.atelier-studio_highlights');
    },
    generateArtHighlights() {
      const artItems = ARTS.filter((item) => item.highlight);
      panelsBuilder(this.$artAndExhibitions, artItems, 'art-and-exhibitions');
    },
    generateAtelierHighlights() {
      const atelierItems = ATELIERS.filter((item) => item.highlight);
      panelsBuilder(this.$atelierStudio, atelierItems, 'homepage');
    }
  };
  // Start initialization.
  homepage.init();
})();