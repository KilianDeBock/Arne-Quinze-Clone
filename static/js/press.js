(() => {
  const atelier = {
    init() {
      this.cacheElements();
      this.generateAtelier();
    },
    cacheElements() {
      this.$pressRelease = document.querySelector('.press_release');
      this.$press = document.querySelector('.press');
    },
    generateAtelier() {
      panelsBuilder(this.$pressRelease, PRESS_RELEASES, 'press', 'Press releases', 'art-and-exhibitions/detail/index.html', false, true, 'press/detail/index.html');
      panelsBuilder(this.$press, PRESS, 'press', 'In the press', 'art-and-exhibitions/detail/index.html', false, true, 'press/detail/index.html');
    },
  };
  // Start initialization.
  atelier.init();
})();