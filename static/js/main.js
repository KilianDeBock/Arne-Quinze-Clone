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
      document.addEventListener('scroll', () => {
        window.scrollY > lastYOffset ? this.$toTop.classList.remove('hide') : this.$toTop.classList.add('hide');
        lastYOffset = window.scrollY;
      });
      this.$toTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };
  // Start initialization.
  app.init();
})();


function tagsBuilder(item) {
  const tags = item.tags.join(' / ');
  return `${tags} — ${item.location}`;
}

function panelsBuilder(target, array, imageLocation, detailsString, detailsPage) {
  target.innerHTML = array.map((item) => {
    const tags = item.location !== null && item.tags !== [] && item.tags !== undefined && item.location !== undefined ? `<p class="text_subtitle">${tagsBuilder(item)}</p>` : '';
    return `
          <li>
            <a href="art-and-exhibitions/detail/index.html">
              <img src="static/img/${imageLocation}/${item.cover.image}" alt="${item.cover.alt}" loading="lazy">
            </a>${tags}
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a>
          </li>`;
  }).join('') + `
        <div class="text_center sideways sidebar">
          <h2>${detailsString}</h2>
          <a href="${detailsPage}" class="blue text_underline__hide">View all</a>
        </div>`;
}