export function signalCriticalHeroReady() {
  document.documentElement.dataset.heroReady = 'true'
  window.dispatchEvent(new Event('nourdoc:hero-ready'))
}
