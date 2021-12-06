(() => {
  const artAndExhibitions = {
    init() {
      this.cacheElements();
      this.generateUI();
      this.generateArts();
      this.eventListeners();
    },
    cacheElements() {
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions');
      this.$containers = document.querySelectorAll('.container');
    },
    generateUI() {
      this.$containers.forEach((container) => container.classList.add('container_longer'));
    },
    generateArts(arts = ARTS) {
      // Loop through the years, import it into a set so only unique stay, and then convert it back to an array.
      const years = [...(new Set(arts.map(art => art.year)))];
      // const years = [1, 2, 3];
      this.$artAndExhibitions.innerHTML = years.map((year) => {
        const yearArtsArray = arts.filter(art => art.year === year);
        const yearArtsHTML = yearArtsArray.map(art => {
          const artImages = art.images.map(image => {
            return `<li><img class="img_ane" loading="lazy" src="static/img/art-and-exhibitions/${image}" alt="${art.title}"></li>`;
          }).join('');
          return `<li class="space-above__6 flex">
                    <div class="anx_content">
                        <h3>${art.title}</h3>
                        <p>${art.subtitle}</p>
                        <p>${tagsBuilder(art)}</p>
                    </div>
                    <ul class="no-list flex anx_images">
                      ${artImages}
                    </ul>
                  </li>`;
        }).join('');
        return `<h2 class="space-above__12">${year}</h2><ul class="no-list">${yearArtsHTML}</ul>`;
      }).join('');
    },
    eventListeners() {
      console.log('lol');
    }
  };
  // Start initialization.
  artAndExhibitions.init();
})();