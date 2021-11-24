(() => {
  const navigationItems = [
    {
      name: 'Art & Exhibitions',
      url: 'art-and-exhibitions/index.html',
      classes: ['a', 'b']
    },
    {
      name: 'Biography',
      url: 'biography.html',
      classes: []
    },
    {
      name: 'Atelier / Studio',
      url: 'atelier-studio/index.html',
      classes: []
    },
    {
      name: 'Press',
      url: 'press/index.html',
      classes: []
    },
    {
      name: 'Contact',
      url: 'contact.html',
      classes: []
    }
  ]
  const navigation = {
    init() {
      this.cacheElements()
      this.generateUI()
    },
    cacheElements() {
      this.$navigation = document.querySelector('nav.main-nav')
    },
    generateUI() {
      const itemMap = navigationItems.map((item) => {
        // Define classes in string layout.
        const classes = item.classes.map((cla) => cla).join(' ');

        // Get raw url without settings.
        const url = document.URL.split('?')[0];
        // If url is current file set selected layout and return.
        if ((url).endsWith(item.url)) {
          return `<li class="selected ${classes}"><a href="${item.url}">${item.name}</a></li>`;
        };

        // If not returned above set default layout.
        return `<li class="${classes}"><a href="${item.url}">${item.name}</a></li>`})
        .join('');

      this.$navigation.innerHTML = `
        <div class="logo"><a href="index.html">Arne Quinze</a></div>
        <ul>
            ${itemMap}
        </ul>`;
    }
  }
  // Start initialization.
  navigation.init();
})()