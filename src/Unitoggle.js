/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/unitoggle
 */

class Unitoggle {
  constructor(options = {}) {
    this.container = document.body;

    if (typeof options.container === 'string') {
      if (!document.querySelector(options.container)) return;
      this.container = document.querySelector(options.container);
    }

    if (typeof options.container === 'object') {
      this.container = options.container;
    }
    this.dataAttr = options.dataAttr || 'toggle'; // [data-{dataAttr}]
    this.activeClass = options.activeClass || 'is-active'; // class name for add
    this.activateInputs = options.activateInputs || false; // activate inputs when open/on
    this.hash = options.hash || false; // hash
    this.onOpen = options.onOpen || ''; // after Open
    this.onClose = options.onClose || ''; // after Close

    this.button = options.button || `[data-${this.dataAttr}]`;


    this.init();
  }

  init() {
    this.container.addEventListener('click', this.clickButton.bind(this));

    if ( !this.hash ) {
      this.activateTabs();
    }

    if ( this.hash ) {
      this.activateHash();
    }
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

    if ( this.hash ) {
      this.setHash();
    }
  }

  activate(tab) {
    const selector = `[data-${this.dataAttr}="${tab.id}"]`;
    const buttons = Array.prototype.slice.call(document.querySelectorAll(selector));

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
    const selector = `[data-${this.dataAttr}="${tab.id}"]`;
    const buttons = Array.prototype.slice.call(this.container.querySelectorAll(selector));

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
    const selector = `[data-${this.dataAttr}-group].${this.activeClass}`;
    const buttons = Array.prototype.slice.call(this.container.querySelectorAll(selector));

    if ( buttons ) {
      buttons.forEach(button => {
        const tabID = button.dataset[this.dataAttr];
        const tab = document.getElementById(tabID);

        this.activate(tab);
      });
    }
  }

  closeGroup(groupID) {
    const selector = `[data-${this.dataAttr}-group="${groupID}"]`;
    const groupButtons = Array.prototype.slice.call(this.container.querySelectorAll(selector));

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
    const inputs = Array.prototype.slice.call(tab.querySelectorAll('input, select, textarea'));

    inputs.forEach(input => {
      input.removeAttribute('disabled');
    });
  }

  disableInputs(tab) {
    const inputs = Array.prototype.slice.call(tab.querySelectorAll('input, select, textarea'));

    inputs.forEach(input => {
      input.setAttribute('disabled', true);
    });
  }

  activateHash() {

    const hash = window.location.hash;

    if ( !hash ) {
      this.activateTabs();
      this.setHash();
      return;
    };

    const hashItems = this.checkHash( hash.replace('#', '').split('_') );

    if ( !hashItems ) {
      this.activateTabs();
      this.setHash();
      return;
    }

    hashItems.forEach( item => {
      const selector = `[data-${this.dataAttr}="${item}"]`;
      const button = this.container.querySelector(selector);

      const attr = `data-${this.dataAttr}-group`;
      const groupID = button.getAttribute(attr);
      const tab = document.getElementById(item);

      this.closeGroup(groupID);
      this.activate(tab);
    });

    this.setHash();
  }

  checkHash( hashItems ) {
    const selector = `[data-${this.dataAttr}-group]`;
    const tabsGroup = this.container.querySelectorAll(selector);

    let groups = [];

    [].forEach.call(tabsGroup, elem => {
      const attr = `data-${this.dataAttr}-group`;
      const group = elem.getAttribute(attr);

      if ( groups.indexOf(group) < 0 ) {
        groups.push(group);
      }
    });

    if ( hashItems.length !== groups.length ) {
      return 0;
    }

    let offIndex;

    hashItems.forEach( item => {
      const selector = `[data-${this.dataAttr}="${item}"]`;
      const button = this.container.querySelector(selector);

      if ( button !== null ) {
        const attr = `data-${this.dataAttr}-group`;
        const group = button.getAttribute(attr);

        groups.splice(groups.indexOf(group), 1);
      }

      if ( button === null ) {
        offIndex = hashItems.indexOf(item);
        hashItems.splice(offIndex, 1);
      }
    });

    groups.forEach( item => {
      const selector = `[data-${this.dataAttr}-group="${item}"].${this.activeClass}`;
      const button = this.container.querySelector(selector);

      const attr = `data-${this.dataAttr}`;
      const tabID = button.getAttribute(attr);

      if ( hashItems.indexOf(tabID) < 0 ) {
        hashItems.splice(offIndex, 0, tabID);
      }
    });

    return hashItems;
  }

  setHash() {
    const selector = `[data-${this.dataAttr}-group].${this.activeClass}`;
    const items = Array.prototype.slice.call( this.container.querySelectorAll(selector) );

    let ids = [];

    items.forEach(item => {
      const attrName = `data-${this.dataAttr}`;
      const id = item.getAttribute(attrName);
      ids.push(id);
    });

    const hash = ids.join('_');

    window.location.hash = '#' + hash;
  }
}
