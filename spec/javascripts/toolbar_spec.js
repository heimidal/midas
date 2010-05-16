describe('Midas.Toolbar', function() {

  beforeEach(function() {
    jasmine.loadFixture('midas_fixture');
  });

  afterEach(function () {
    try {
      window.toolbar.destroy();
    } catch(e) {}
  });

  it('should accept options in the constructor', function() {
    window.toolbar = new Midas.Toolbar({lettuce: 'banana'});

    expect(toolbar.options['lettuce']).toEqual('banana');
  });

  it('should make a toolbar', function() {
    window.toolbar = new Midas.Toolbar();

    expect(toolbar.element).not.toBeFalsy();
    expect($(toolbar.element.getAttribute('id'))).not.toBeFalsy(1);
    expect($$('body .midas-toolbar').length).toEqual(1);
  });

  it('should generate an id for the toolbar it creates', function() {
    window.toolbar = new Midas.Toolbar();

    var id = toolbar.generateId();
    expect($(id)).not.toBeNull();
    expect(toolbar.generateId()).toEqual(id);
  });

  it('should be able to put the toolbar inside an existing element', function() {
    window.toolbar = new Midas.Toolbar({appendTo: 'toolbar'});

    expect($('toolbar').innerHTML).not.toEqual('toolbar');
  });

  it('should fill the toolbar with buttons (based on configuration)', function() {
    window.toolbar = new Midas.Toolbar({appendTo: 'toolbar'});

    expect($('toolbar').innerHTML).toContain('Save this page');
    expect($('toolbar').innerHTML).toContain('class="flex-spacer"');
  });

  it('should make buttons and button groups', function() {
    window.toolbar = new Midas.Toolbar({appendTo: 'toolbar'});
    
    expect($('toolbar').select('.group').length).toBeGreaterThan(2);
    expect($('toolbar').innerHTML).toContain('class="group"');
  });

  it('should make buttons create an array of context buttons', function() {
    window.toolbar = new Midas.Toolbar({appendTo: 'toolbar'});

    expect(toolbar.contexts.length).toBeGreaterThan(2);
  });

  it('should make separators', function() {
    window.toolbar = new Midas.Toolbar();

    expect(toolbar.makeSeparator('-').getAttribute('class')).toEqual('line-spacer');
    expect(toolbar.makeSeparator('*').getAttribute('class')).toEqual('flex-spacer');
    expect(toolbar.makeSeparator(' ').getAttribute('class')).toEqual('spacer');
  });

  it('should destroy', function() {
    window.toolbar = new Midas.Toolbar();
    toolbar.destroy();

    expect(toolbar.element).not.toBeFalsy();
    expect($(toolbar.element.getAttribute('id'))).toBeFalsy(null);
    expect($$('.midas-toolbar').length).toEqual(0);
  });
});