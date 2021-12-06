(() => {
  const artAndExhibitions = {
    init() {
      this.cacheElements();
      this.generateUI();
      this.generateFilterTags();
      this.generateFilterYears();
      this.generateArts();
    },
    cacheElements() {
      this.$artAndExhibitionsFilterTags = document.querySelector('.art-and-exhibitions_sorter_tags');
      this.$artAndExhibitionsFilterYears = document.querySelector('.art-and-exhibitions_sorter_years');
      this.$artAndExhibitions = document.querySelector('.art-and-exhibitions');
      this.$containers = document.querySelectorAll('.container');
    },
    generateUI() {
      this.$containers.forEach((container) => container.classList.add('container_longer'));
    },
    generateFilterTags() {
      const tagsArray = [...(new Set((ARTS.map(art => art.tags)).flat()))];
      const tagsMap = tagsArray.map(tag => {
        return `<li data-tag="${tag}" class="anx_tag-item anx_item">${tag}</li>`;
      }).join('');
      this.filterData.tagsHtml = `<ol class="no-list flex width_45 margin_out-1">
                      <li class="anx_item anx_item_all">Show all</li>
                      ${tagsMap}
                    </ol>`;

      this.$artAndExhibitionsFilterTags.innerHTML = this.filterData.tagsHtml;
      this.cacheFilterElements();
    },
    generateFilterYears() {
      const yearsArray = [...(new Set(ARTS.map(art => art.year)))];
      const yearsMap = yearsArray.map(year => {
        return `<li data-year="${year}" class="anx_year-item anx_item">${year}</li>`;
      }).join('');
      this.filterData.yearsHtml = `<ol class="no-list flex width_45 space-above__1-5 margin_out-1">
                       <li class="anx_item anx_item_all">Show all</li>
                       ${yearsMap}
                     </ol>`;

      this.$artAndExhibitionsFilterYears.innerHTML = this.filterData.yearsHtml;
      this.cacheFilterElements();
    },
    cacheFilterElements() {
      // Cache elements just created:
      this.$anxFilterAll = document.querySelectorAll('.anx_item_all');
      this.$anxFilterTags = document.querySelectorAll('.anx_tag-item');
      this.$anxFilterYears = document.querySelectorAll('.anx_year-item');
      // Add event listener
      this.$anxFilterAll.forEach(item => this.filterListener(item));
      this.$anxFilterTags.forEach(item => this.filterListener(item));
      this.$anxFilterYears.forEach(item => this.filterListener(item));
    },
    generateArts(arts = ARTS) {
      console.log('generated');
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
                    <div class="anx_content text_right">
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
      if (years.length === 0) {
        this.$artAndExhibitions.innerHTML = '<h2 class="space-above__6">It looks like you\'ve reached the limits of filtering! Sad....</h2>';
      }
    },
    filterListener(item) {
      // Stop duplicate event listener
      if (item.dataset.listener !== 'true') {
        // Set element as having a event listener
        item.dataset.listener = 'true';
        // Add event listener
        item.addEventListener('click', (ev) => {
          let selected = ev.target;
          if (ev.target.classList.contains('anx_tag-item')) {
            if (ev.target.dataset.tag !== this.filterData.currentTag) {
              this.filterData.currentFilter = [...ARTS];
              if (this.filterData.currentYear !== null) {
                this.filterYearsLoader(ev, this.filterData.currentYear);
              }
            }
            this.generateFilterTags();
            selected = document.querySelector(`[data-tag='${ev.target.dataset.tag}']`);
            this.filterTagsLoader(ev);
            this.filterData.currentTag = ev.target.dataset.tag;
          } else if (ev.target.classList.contains('anx_year-item')) {
            if (ev.target.dataset.year !== this.filterData.currentYear) {
              this.filterData.currentFilter = [...ARTS];
              if (this.filterData.currentTag !== null) {
                this.filterTagsLoader(ev, this.filterData.currentTag);
              }
            }
            this.generateFilterYears();
            selected = document.querySelector(`[data-year='${ev.target.dataset.year}']`);
            this.filterYearsLoader(ev);
            this.filterData.currentYear = ev.target.dataset.year;
          } else {
            this.generateFilterYears();
            this.generateFilterTags();
            this.filterData.currentFilter = [...ARTS];
            this.filterData.currentYear = null;
            this.filterData.currentTag = null;
          }
          this.generateArts(this.filterData.currentFilter);
          // console.log(this.filterData.currentYear);
          selected.classList.add('anx_item_selected');
        });
      }
    },
    filterTagsLoader(ev, tag = ev.target.dataset.tag) {
      if (tag === null) return;
      this.filterData.currentFilter = this.filterData.currentFilter.filter((art) => {
        return (art.tags.toString()).includes(tag);
      });
    },
    filterYearsLoader(ev, year = ev.target.dataset.year) {
      if (year === null) return;
      this.filterData.currentFilter = this.filterData.currentFilter.filter((art) => {
        return art.year === year;
      });
    },
    filterData: {
      currentFilter: [...ARTS],
      currentYear: null,
      currentTag: null,
      tagsHtml: null,
      yearsHtml: null
    }

  };
  // Start initialization.
  artAndExhibitions.init();
})();