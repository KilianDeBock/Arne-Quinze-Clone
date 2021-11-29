(() => {
  const homepage = {
    init() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions_highlights');
    },
    generateUI() {
      this.$artAndExhibitions.innerHTML = ARTS.map((art) => {
        if (art.highlight) {
          return `
            <li>
            <a href=""><img src="static/img/art-and-exhibitions/${art.cover.image}" alt="${art.cover.alt}"></a>
                <h2>${art.title}</h2>
                <p>${art.description}</p>
                <a class="underline">Learn more</a>
            </li>`;
        }
      }).join('');
    },
  };
  // Start initialization.
  homepage.init();
})();