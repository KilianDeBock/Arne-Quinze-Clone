(() => {
  const homepage = {
    init() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions_highlights');
      this.$atelierStudio = document.querySelector('.atelier-studio_highlights');
    },
    generateUI() {
      this.panelsBuilder(this.$artAndExhibitions, ARTS, 'art-and-exhibitions');
      this.panelsBuilder(this.$atelierStudio, ATELIERS, 'homepage');
    },
    panelsBuilder(target, array, imageLocation) {
      target.innerHTML = array.map((item) => {
        if (item.highlight) {
          const figcaption = item.subtitle !== null ? `<figcaption>${item.subtitle}</figcaption>` : '';
          return `
            <li>
              <figure>
                <a href="art-and-exhibitions/detail/index.html">
                  <img src="static/img/${imageLocation}/${item.cover.image}" alt="${item.cover.alt}" loading="lazy">
                </a>
                ${figcaption}
              </figure>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a>
            </li>`;
        }
      }).join('') + `
        <div class="text_center sideways sidebar">
          <h2>Art & Exhibitions</h2>
          <a href="art-and-exhibitions/detail/index.html" class="blue text_underline__hide">View all</a>
        </div>`;
    }
  };
  // Start initialization.
  homepage.init();
})();