const expect = require('expect');
const nautilus = require('../app.js');

describe('hooks:preferences', function() {

  it('determines the preferences location based on the package name', () => {
    expect(nautilus.preferences.path).toInclude('nautilus.json');
  });

  it('allows to set and get preferences by key', () => {
    nautilus.preferences.set('hello', 'world');
    expect(nautilus.preferences.get('hello')).toEqual('world');

    nautilus.preferences.set('foo.bar', 'baz');
    expect(nautilus.preferences.get('foo.bar')).toEqual('baz');
  });

  it('allows for observing preferences', () => {
    let observed = false;
    nautilus.preferences.observe.on('hello', val => {
      observed = val;
    });

    nautilus.preferences.set('hello', 'watcher');
    expect(observed).toEqual('watcher');
    nautilus.preferences.set('hello', 'world');
    expect(observed).toEqual('world');
  });

  it('persists preferences to disk', () => {
    const savedPreferences = require(nautilus.preferences.path);
    expect(savedPreferences.hello).toEqual('world');
    expect(savedPreferences.foo.bar).toEqual('baz');
  });

});
