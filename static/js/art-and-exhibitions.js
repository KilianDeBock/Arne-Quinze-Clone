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
                      <li class="anx_item anx_item_all anx_item_all_tags">Show all</li>
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
                       <li class="anx_item anx_item_all anx_item_all_years">Show all</li>
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
      // Loop through the years, import it into a set so only unique stay, and then convert it back to an array.
      const years = [...(new Set(arts.map(art => art.year)))];
      // const years = [1, 2, 3];
      this.$artAndExhibitions.innerHTML = years.map((year) => {
        const yearArtsArray = arts.filter(art => art.year === year);
        const yearArtsHTML = yearArtsArray.map(art => {
          const artImages = art.images.map(image => {
            return `<li>
                      <a href="art-and-exhibitions/detail/index.html">
                        <img class="img_ane" loading="lazy" src="static/img/art-and-exhibitions/${image}" alt="${art.title}">
                      </a>
                    </li>`;
          }).join('');
          return `<li class="space-above__6 flex">
                    <div class="anx_content text_right">
                      <h3><a class="text_underline__hide" href="art-and-exhibitions/detail/index.html">${art.title}</a></h3>
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
          // Set selected target.
          let selected = ev.target;

          // Check if item is tag
          if (ev.target.classList.contains('anx_tag-item')) {
            // Check if we need to create new filtered data
            if (ev.target.dataset.tag !== this.filterData.currentTag) {
              // Set to default data
              this.filterData.currentFilter = [...ARTS];
              // Check if an other filter is set.
              if (this.filterData.currentYear !== null) {
                // Reset old filter:
                this.filterYearsLoader(ev, this.filterData.currentYear);
              }
            }
            // Generate the set tags
            this.generateFilterTags();
            // Reload tags generation
            this.filterTagsLoader(ev);
            // set the latest tag to memory
            this.filterData.currentTag = ev.target.dataset.tag;
            // Cache new selected element
            selected = document.querySelector(`[data-tag='${ev.target.dataset.tag}']`);

            //  Check if item is year
          } else if (ev.target.classList.contains('anx_year-item')) {
            // Check if we need to create new filtered data
            if (ev.target.dataset.year !== this.filterData.currentYear) {
              // Set to default data
              this.filterData.currentFilter = [...ARTS];
              // Check if an other filter is set.
              if (this.filterData.currentTag !== null) {
                // Reset old filter:
                this.filterTagsLoader(ev, this.filterData.currentTag);
              }
            }
            // Generate the set years
            this.generateFilterYears();
            // Reload years generation
            this.filterYearsLoader(ev);
            // set the latest year to memory
            this.filterData.currentYear = ev.target.dataset.year;
            // Cache new selected element
            selected = document.querySelector(`[data-year='${ev.target.dataset.year}']`);

            //  Other item (all items)
          } else {
            // reset filter to default.
            this.filterData.currentFilter = [...ARTS];

            // Check if item is all tags:
            if (ev.target.classList.contains('anx_item_all_tags')) {
              // regenerate tags
              this.generateFilterTags();
              // reset data saved to memory
              this.filterData.currentTag = null;
              // Check if an other filter is set.
              if (this.filterData.currentYear !== null) {
                // Reset old filter
                this.filterYearsLoader(ev, this.filterData.currentYear);
              }
            }

            // Check if item is all years:
            if (ev.target.classList.contains('anx_item_all_years')) {
              // regenerate tags
              this.generateFilterYears();
              // reset data saved to memory
              this.filterData.currentYear = null;
              // Check if an other filter is set.
              if (this.filterData.currentTag !== null) {
                // Reset old filter
                this.filterTagsLoader(ev, this.filterData.currentTag);
              }
            }
          }
          // Generate the now filtered arts.
          this.generateArts(this.filterData.currentFilter);
          // Add selected tag to the target.
          selected.classList.add('anx_item_selected');
        });
      }
    },
    filterTagsLoader(ev, tag = ev.target.dataset.tag) {
      // if tag is unset, stop!
      if (tag === null) return;
      // Filter data
      this.filterData.currentFilter = this.filterData.currentFilter.filter((art) => {
        return (art.tags.toString()).includes(tag);
      });
    },
    filterYearsLoader(ev, year = ev.target.dataset.year) {
      // if year is unset, stop!
      if (year === null) return;
      // Filter data
      this.filterData.currentFilter = this.filterData.currentFilter.filter((art) => {
        return art.year === year;
      });
    },
    filterData: {
      currentFilter: [...ARTS],
      currentYear: null,
      currentTag: null
    }
  };
  // Start initialization.
  artAndExhibitions.init();
})();