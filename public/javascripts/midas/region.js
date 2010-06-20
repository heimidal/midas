if (!Midas) var Midas = {};
Midas.Region = Class.create({
  version: 0.2,
  name: null,
  options: {
    configuration: null,
    contentWindow: window,
    inline: false
  },
  previewing: false,

  initialize: function(element, options, name) {
    if (!Midas.version) throw('Midas.Region requires Midas');
    if (!Midas.agentIsCapable()) throw('Midas.Region requires a browser that has contentEditable features');

    this.element = $(element);
    if (!this.element) throw('Unable to locate the element "' + element + '"');
    this.sibling = this.element.previousSibling;

    this.options = Object.extend(Object.clone(this.options), options);
    this.options['configuration'] = this.options['configuration'] || Midas.Config;
    this.config = this.options['configuration'];
    this.name = this.element.getAttribute('id') || name;
    this.doc = this.options['contentWindow'].document;
    this.selections = [];

    this.makeEditable();
    this.setupObservers();
  },

  makeEditable: function() {
    this.element.addClassName('midas-region');

    if (this.element.innerHTML.replace(/^\s+|\s+$/g, "") == '' && Prototype.Browser.Gecko) {
      this.setContents('&nbsp;')
    }
    
    if (this.options['inline']) {
      this.element.setStyle({height: 'auto', minHeight: '20px', minWidth: '20px'});
    } else {
      this.element.setStyle({overflow: 'auto'});
      var width = this.element.getWidth();
      if (width) this.element.setStyle({maxWidth: width + 'px'});
    }
    this.element.contentEditable = true;

    this.doc.execCommand('styleWithCSS', false, false);
    //this.doc.execCommand('enableInlineTableEditing', false, false);
  },

  setupObservers: function() {
    this.element.observe('focus', function(event) {
      if (this.previewing) return;
      Midas.fire('region', {region: this, name: this.name, event: event});
      if (this.getContents() == '&nbsp;' && Prototype.Browser.Gecko) this.setContents('&nbsp;');
    }.bind(this));

    this.element.observe('click', function(event) {
      if (this.previewing) return;
      Midas.fire('region', {region: this, name: this.name, event: event});
      if (this.getContents() == '&nbsp;' && Prototype.Browser.Gecko) this.setContents('&nbsp;');
    }.bind(this));
    this.element.observe('mouseup', function(event) {
      if (this.previewing) return;
      Midas.fire('region:update', {region: this, name: this.name, event: event});
    }.bind(this));

    this.element.observe('keydown', function(event) {
      if (Midas.modal.showing) event.stop();
    }.bind(this));

    this.element.observe('keyup', function(event) {
      if (this.previewing) return;
      Midas.fire('region:update', {region: this, name: this.name, event: event, changed: true});
    }.bind(this));
    this.element.observe('keypress', function(event) {
      if (this.previewing) return;
      Midas.fire('region:update', {region: this, name: this.name, event: event});

      switch (event.keyCode) {
        case 9: // tab
          this.selections.each(function(selection) {
            var container = selection.commonAncestorContainer;
            if (container.nodeType == 3) container = container.parentNode;
            if (container.tagName == 'LI' || container.up('li')) {
              event.stop();
              this.handleAction('indent');
            }
          }.bind(this));
          break;
        case 13: // enter
          break;
      }
    }.bind(this));

    // clipboard tracking
    this.element.observe('paste', function(event) {
      if (Midas.modal.showing) event.stop();
      setTimeout(this.afterPaste.bind(this), 1);
    }.bind(this));

    // selection tracking
    this.element.observe('keyup', function() {
      this.updateSelections();
    }.bind(this));
    this.element.observe('mousedown', function() {
      this.selecting = true;
    }.bind(this));
    Event.observe(document, 'mouseup', function() {
      if (!this.selecting) return;
      this.selecting = false;
      this.updateSelections();
    }.bind(this));
  },

  setContents: function(content) {
    this.element.innerHTML = content;
  },

  getContents: function() {
    return this.element.innerHTML.replace(/^\s+|\s+$/g, "");
  },

  updateSelections: function() {
    var selection = this.options['contentWindow'].getSelection();
    this.selections = [];

    for (var i = 0; i <= selection.rangeCount - 1; ++i) {
      var range = selection.getRangeAt(i);

      if (range.commonAncestorContainer == this.element ||
          Element.descendantOf(range.commonAncestorContainer, this.element)) {
        this.selections.push(range);
      }
    }
  },

  afterPaste: function() {
    var pastedRegion = this.element.down('.midas-region');
    if (pastedRegion) {
      var selection = this.options['contentWindow'].getSelection();
      selection.removeAllRanges();

      var range = this.doc.createRange();
      range.selectNode(pastedRegion);
      selection.addRange(range);
      this.doc.execCommand('undo', false, null);
      this.doc.execCommand('insertHTML', false, pastedRegion.innerHTML);
    }
  },

  execCommand: function(action, argument) {
    argument = typeof(argument) == 'undefined' ? null : argument;
    
    var supported = this.doc.execCommand('styleWithCSS', false, false);
    var handled;
    try {
      handled = this.doc.execCommand(action, false, argument);
    } catch(e) {
      Midas.trace(e);
      // Gecko does some interesting things when it fails on indent
      if (action == 'indent') {
        var sibling = this.element.previousSibling;
        if (sibling != this.sibling) sibling.remove();
      }
      handled = true;
    }
    if (!handled && supported) throw('Unknown action "' + action + '"');
  },

  serialize: function() {
    return {name: this.name, content: this.getContents()}
  },

  togglePreview: function() {
    if (this.previewing) {
      this.element.removeClassName('midas-region-preview');
      this.makeEditable();
      this.previewing = false;
    } else {
      this.element.contentEditable = false;
      this.element.addClassName('midas-region-preview');
      this.element.setStyle({height: null, minHeight: null, minWidth: null, maxWidth: null, overflow: null});
      this.element.removeClassName('midas-region');
      this.previewing = true;
    }
  },

  destroy: function() {
    this.element.contentEditable = 'false';
    this.element.blur();
    this.element.removeClassName('midas-region');
  },

  handleAction: function(action, event, toolbar, options) {
    options = options || {};
    
    if (this.config['behaviors'][action]) {
      var behaviors = this.config['behaviors'][action];

      for (var behavior in behaviors) {
        if (Object.isFunction(this.handle[behavior])) {
          this.handle[behavior].call(this, action, toolbar, options, behaviors[behavior]);

          var sel = window.getSelection();
          this.selections.each(function(selection) {
            sel.removeRange(selection);
            sel.addRange(selection);
          })
        } else {
          throw('Unknown behavior method "' + behavior + '"');
        }
      }
    } else {
      switch (action) {
        case 'removeformatting':
          this.execCommand('insertHTML', this.selections[0].cloneContents().textContent);
          break;
        case 'style':
          this.wrap('span', function() {
            return new Element('span', {'class': options['value']});
          }, function(element) {
            element.addClassName(options['value']);
          });
          break;
        case 'backcolor':
          this.wrap('font', function() {
            return new Element('font', {style: 'background-color:' + options['value']});
          }, function(element) {
            element.setStyle('background-color:' + options['value']);
          });
          break;
        default: this.execCommand(action, options['value']);
      }
    }
  },

  wrap: function(tagName, newElementCallback, updateElementCallback) {
    var range = this.selections[0];
    var fragment = range.cloneContents();

    if (fragment.containsTags('div table tr td')) {
      this.wrapTextnodes(fragment, tagName, newElementCallback, updateElementCallback);
    } else {
      this.wrapFragment(fragment, newElementCallback, updateElementCallback);
    }
  },

  wrapTextnodes: function(fragment, tagName, newElementCallback, updateElementCallback) {
    var textnodes = fragment.getTextNodes();
    for (var i = 0; i < textnodes.length; ++i) {
      if (textnodes[i].parentNode.tagName != tagName.toUpperCase()) {
        Element.wrap(textnodes[i], newElementCallback.call(this));
      } else {
        updateElementCallback.call(this, textnodes[i].parentNode);
      }
    }

    var wrapper = new Element('div');
    wrapper.appendChild(fragment);

    var html = wrapper.innerHTML;
    this.execCommand('insertHTML', html);
  },

  wrapFragment: function(fragment, newElementCallback) {
    var container = newElementCallback.call(this);
    container.appendChild(fragment);

    var wrapper = new Element('div');
    wrapper.appendChild(container);

    var html = wrapper.innerHTML;
    this.execCommand('insertHTML', html);
  },

  handle: {

    insertHTML: function(action, toolbar, options, callbackOrValue) {
      var value = (Object.isFunction(callbackOrValue)) ?
                  callbackOrValue.call(this, action, toolbar, options) :
                  callbackOrValue;
      this.execCommand('insertHTML', value);
    },

    call: function(action, toolbar, options, callback) {
      callback.call(this, action, toolbar, options);
    }

  }

});
