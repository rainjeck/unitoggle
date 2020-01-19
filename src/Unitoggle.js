/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/unitoggle
 */

export default class Unitoggle {
  constructor(options = {}) {
    this.container = document.body;

    if (typeof options.container === 'string') {
      this.container = document.querySelector(options.container) || document.body;
    }

    if (typeof options.container === 'object') {
      this.container = options.container;
    }
    this.dataAttr = options.dataAttr || 'toggle'; // [data-{dataAttr}]
    this.activeClass = options.activeClass || 'is-active'; // class name for add
    this.activateInputs = options.activateInputs || false; // activate inputs when open/on
    this.onOpen = options.onOpen || ''; // after Open
    this.onClose = options.onClose || ''; // after Close

    this.button = options.button || `[data-${this.dataAttr}]`;


    this.init();
  }

  init() {
    this.container.addEventListener('click', this.clickButton.bind(this));
    this.activateTabs();
  }

  clickButton(e) {
    let button = e.target;

    if (!e.target.matches(this.button) && !e.target.closest(this.button)) {
      return;
    }

    if (!e.target.matches(this.button) && e.target.closest(this.button)) {
      button = e.target.closest(this.button);
    }

    const tabID = button.dataset[this.dataAttr];
    const tab = document.getElementById(tabID);

    if (button.hasAttribute(`data-${this.dataAttr}-accordion`) && button.classList.contains(this.activeClass)) {
      this.inactivate(tab);
      return;
    }

    if (button.hasAttribute(`data-${this.dataAttr}-group`)) {
      this.closeGroup(button.getAttribute(`data-${this.dataAttr}-group`));
    }

    this.activate(tab);
  }

  activate(tab) {
    const searchString = `[data-${this.dataAttr}="${tab.id}"]`;
    const buttons = Array.from(document.querySelectorAll(searchString));

    if (tab.classList.contains(this.activeClass)) {

      this.inactivate(tab);
      return;
    }

    if (this.activateInputs) {
      this.enableInputs(tab);
    }

    tab.classList.add(this.activeClass);

    buttons.forEach(button => {
      button.classList.add(this.activeClass);
    });

    if (this.onOpen && typeof this.onOpen === 'function') {
      this.onOpen(tab);
    }
  }

  inactivate(tab) {
    const searchString = `[data-${this.dataAttr}="${tab.id}"]`;
    const buttons = Array.from(document.querySelectorAll(searchString));

    buttons.forEach(button => {
      button.classList.remove(this.activeClass);
    });

    tab.classList.remove(this.activeClass);

    if (this.activateInputs) {
      this.disableInputs(tab);
    }

    if (this.onClose && typeof this.onClose === 'function') {
      this.onClose(tab);
    }
  }

  activateTabs() {
    const buttons = Array.from(this.container.querySelectorAll(`[data-${this.dataAttr}-group].${this.activeClass}`));

    if (buttons) {
      buttons.forEach(button => {
        const tabID = button.dataset[this.dataAttr];
        const tab = document.getElementById(tabID);

        this.activate(tab);
      });
    }
  }

  closeGroup(groupID) {
    const groupButtons = Array.from(document.querySelectorAll(`[data-${this.dataAttr}-group="${groupID}"]`));

    groupButtons.forEach(button => {
      button.classList.remove(this.activeClass);

      const tabID = button.dataset[this.dataAttr];
      const tab = document.getElementById(tabID);

      tab.classList.remove(this.activeClass);

      if (this.activateInputs) {
        this.disableInputs(tab);
      }
    });
  }

  enableInputs(tab) {
    const inputs = Array.from(tab.querySelectorAll('input, select, textarea'));

    inputs.forEach(input => {
      input.removeAttribute('disabled');
    });
  }

  disableInputs(tab) {
    const inputs = Array.from(tab.querySelectorAll('input, select, textarea'));

    inputs.forEach(input => {
      input.setAttribute('disabled', true);
    });
  }
}
