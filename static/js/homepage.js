(() => {
  const homepage = {
    init() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions_highlights');
      this.$atelierStudio = document.querySelector('.atelier-studio');
    },
    generateUI() {
      this.$artAndExhibitions.innerHTML = ARTS.map((art) => {
        if (art.highlight) {
          return `
            <li>
              <a href="art-and-exhibitions/detail/index.html"><img src="static/img/art-and-exhibitions/${art.cover.image}" alt="${art.cover.alt}"></a>
              <h3>${art.title}</h3>
              <p>${art.description}</p>
              <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a> 
            </li>`;
        }
      }).join('') + `<div class="text_center sideways sidebar">
                        <h2>Art & Exhibitions</h2>
                        <a href="art-and-exhibitions/detail/index.html" class="blue text_underline__hide">View all</a>
                     </div>`;

      this.$atelierStudio.innerHTML = ARTS.map((art) => {
        if (art.highlight) {
          return `
            <li>
              <a href="art-and-exhibitions/detail/index.html"><img src="static/img/art-and-exhibitions/${art.cover.image}" alt="${art.cover.alt}"></a>
              <h3>${art.title}</h3>
              <p>${art.description}</p>
              <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a>
            </li>`;
        }
      }).join('') + `<div class="text_center sideways sidebar">
                        <h2>Art & Exhibitions</h2>
                        <a href="art-and-exhibitions/detail/index.html" class="blue text_underline__hide">View all</a>
                     </div>`;
    },
  };
  // Start initialization.
  homepage.init();
})();