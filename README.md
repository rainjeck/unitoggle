# Unitoggle

Universal toggle. Use it for tabs, accordions and other switchers.

- Any style
- Support nesting
- Disable/enable input fields

[Demo & Documentation](//rainjeck.github.io/unitoggle)

Include ```unitoggle.min.js```.

**Layout**

```
<div data-toggle="toggle-id">Toggle button</div>
<div id="toggle-id">
    Toggle Content
</div>
```

**For Accordions**

```
[data-toggle-accordion] - if you want close active accordion after repeat click
[data-toggle-group] - your group name (for tabs)

<div data-toggle="toggle-id1" data-toggle-accordion data-toggle-group="group-name">Button</div>
<div id="toggle-id1">
    Toggle Content
</div>
<div data-toggle="toggle-id2" data-toggle-accordion data-toggle-group="group-name">Button</div>
<div id="toggle-id2">
    Toggle Content
</div>
```

**JS**

```
const toggler = new Unitoggle.default({
    container: docucument.body, // Container: string or object. Default: document.body
    dataAttr: 'toggle', // button and group attr. Default: [data-toggle], [data-toggle-group], [data-toggle-accordion]
    activeClass: 'is-active', // active class. Default: 'is-active'
    hash: false, // hash support
    activateInputs: false, // Activate input fields (input, select, textarea) after open. Set attr [disabled] on input fields.
    onOpen: function(tab) {}, // After open callback
    onClose: function(tab) {} // After close callback
});
```

**Demo css**

```
.tab {
  display: none;
  opacity: 0;
}

.tab.is-active {
  display: block;
  animation: tab-is-active 0.15s ease-in-out 0.1s 1 forwards;
}

@keyframes tab-is-active {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```
