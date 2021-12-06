(() => {
  const app = {
    init() {
      this.cacheElements();
      this.generateUI();
      this.generateFooter();
    },
    cacheElements() {
      this.$belgiumTimes = document.querySelectorAll('.belgium-time');
      this.$toTop = document.querySelector('.btn-top');
      this.$footerSocials = document.querySelector('.socials-wrapper');
      this.$footerInstagrams = document.querySelector('.footer-instagram');
    },
    generateUI() {
      const date = new Date();
      this.$belgiumTimes.forEach((item) => item.innerHTML = `${date.getHours()}:${date.getMinutes()}`);
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
    },
    generateFooter() {
      const socialItems = footerSocials.map((item) => {
        return `
          <li>
            <a class="text_underline__hide text_underline-fix">
              ${item.svg}
              <p>${item.name}</p>
            </a>
          </li>`;
      }).join('');
      this.$footerSocials.innerHTML = `
        <ul class="flex flex_middle-spacing no-list container">
            ${socialItems}
        </ul>`;


      this.$footerInstagrams.innerHTML = footerInstagrams.map((item) => {
        return `
          <li>
            <a href="${item.url}">
              <img alt="Instagram post." src="${item.image}">
            </a>
          </li>`;
      }).join('');
    }
  };
  // Start initialization.
  app.init();
})();


function tagsBuilder(object) {
  const tags = object.tags.join(' / ');
  if (object.location === null) {
    return `${tags}`;
  }
  return `${tags} — ${object.location}`;
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
          <a href="${detailsPage}" class="color_blue text_underline__hide">View all</a>
        </div>`;
}