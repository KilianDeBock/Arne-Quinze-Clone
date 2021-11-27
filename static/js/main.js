(() => {
  const app = {
    init() {
      this.cacheElements();
      this.generateUI();
    },
    cacheElements() {
      // this.navigation = document.querySelector('nav.main-nav')
    },
    generateUI() {
    },
  };
  // Start initialization.
  app.init();
})();


// TODO: Delete after development, reload client.
let liveJs = document.createElement('script');
liveJs.src = '/live.js';
document.body.appendChild(liveJs);