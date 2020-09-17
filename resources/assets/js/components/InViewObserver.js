/**
 * In-view Observer
 *
 */
// IntersectionObserver polyfill @https://github.com/w3c/IntersectionObserver/tree/master/polyfill
import 'intersection-observer';

export class InViewObserver {
  #defaultOptions = {
    root: null,
    rootMargin: '0px 0px -28%',
    threshold: 0,
    inviewed: 'inviewed',
    // once: true,
  };

  #options;

  #selector;

  #elements;

  #observer;

  constructor(selector, options) {
    this.#selector = selector || '.inview';
    this.#options = { ...this.#defaultOptions, ...options };
  }

  get targets() {
    return this.#elements;
  }

  get options() {
    return this.#options;
  }

  watch(callback) {
    const inviewed = `data-${this.#options.inviewed}`;

    function doWhenIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute(inviewed, true);
          if (callback) {
            callback(entry);
          }
        }
      });
    }

    this.#observer = new IntersectionObserver(doWhenIntersect, this.#options);

    this.#elements = document.querySelectorAll(this.#selector);

    this.#elements.forEach((element) => {
      this.#observer.observe(element);
    });
  }

  /**
   *
   * @param {Function} callback
   * @memberof InViewObserver
   */
  unwatch(callback) {
    if (!this.#elements) throw new Error("I can't find the element observing.");

    const inviewed = `data-${this.#options.inviewed}`;

    this.#elements.forEach((element) => {
      element.removeAttribute(inviewed);
      this.#observer.unobserve(element);

      if (callback) {
        callback(element);
      }
    });
  }
}
