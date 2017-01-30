const expect = require('expect');
const nautilus = require('../app.js');

const defaults = require('../../lib/defaults/window.js');

describe('hooks:window', function() {

  it('tracks the main application window', () => {
    nautilus.window.show();
    expect(nautilus.window.main).toExist();
    nautilus.window.main.close();
    expect(nautilus.window.main).toNotExist();
  });

  it('opens a new window when activated', () => {
    nautilus._events.activate();
    expect(nautilus.window.main).toExist();
    nautilus.window.main.show();
  });

  it('respects default configuration', () => {
    const windowSize = nautilus.window.main.getSize();
    expect(windowSize[0]).toEqual(defaults.width);
    expect(windowSize[1]).toEqual(defaults.height);
  });

});
