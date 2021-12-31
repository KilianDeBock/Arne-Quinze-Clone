(() => {
  const app = {
    init() {
      this.cacheElements();
      this.generateUI();
      this.generateFooter();
      this.generateRelated();
    },
    cacheElements() {
      this.$belgiumTimes = document.querySelectorAll('.belgium-time');
      this.$toTop = document.querySelector('.btn-top');
      this.$footerSocials = document.querySelector('.socials-wrapper');
      this.$footerInstagrams = document.querySelector('.footer-instagram');
      this.$related = document.querySelector('.related');
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
    },
    generateRelated() {
      if (this.$related) {
        const randomARTS = ARTS.sort(() => 0.3 - Math.random());
        const artItems = randomARTS.slice(0, 3);
        const descriptions = [
          'Arne Quinze does not portray a flower but the strength and fragility of his entire garden. Each...',
          'This natural garden welcomes a new creature, with the artist\'s approving gaze. This sculpture...',
          'Sky & Yellows, oil paint on canvas with solid oak frame Many wildflowers have stripes, dots, and...'
        ];

        this.$related.innerHTML = artItems.map((item, i) => {
          const tags = item.location !== null && item.tags !== [] && item.tags !== undefined && item.location !== undefined ? `<p class="text_subtitle">${tagsBuilder(item)}</p>` : '';
          const description = item.description === null ? '' : item.description;
          return `
          <li>
            <a href="art-and-exhibitions/detail/index.html">
              <img src="static/img/art-and-exhibitions/${item.images[0]}" alt="${item.title}" loading="lazy">
            </a>${tags}
            <h3>${item.title}</h3>
            <p>${descriptions[i]}</p>
            <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a>
          </li>`;
        }).join('');
      }
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

function panelsBuilder(target, array, imageLocation, detailsString, detailsPage, disableSideBar = false, subtitleShouldBe = false, url = 'art-and-exhibitions/detail/index.html', topSpacing = false) {
  const sidebar = disableSideBar ? '' : `
        <div class="text_center sideways sidebar">
          <h2>${detailsString}</h2>
          <a href="${detailsPage}" class="color_blue text_underline__hide">View all</a>
        </div>`;
  const spacing = topSpacing ? ' class="space-above__6"' : '';
  target.innerHTML = array.map((item) => {
    const tags = item.location !== null && item.tags !== [] && item.tags !== undefined && item.location !== undefined ? `<p class="text_subtitle">${tagsBuilder(item)}</p>` : '';
    const sub = `<p class="text_subtitle">${item.subtitle}</p>`;
    const subtitle = subtitleShouldBe ? sub : tags;
    return `
          <li${spacing}>
            <a href="${url}">
              <img src="static/img/${imageLocation}/${item.cover.image}" alt="${item.cover.alt}" loading="lazy">
            </a>${subtitle}
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="art-and-exhibitions/detail/index.html" class="text_underline">Learn more</a>
          </li>`;
  }).join('') + sidebar;
}