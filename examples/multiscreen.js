var LcdProcClient = require('lcdproc-client');
var lcd = new LcdProcClient(13666, 'localhost');

var screens = [
  {
    name: 'MyScreen1',
    heartbeat: 'off',
    widgets: {
      'first_line': {
        row: 1,
        default: 'Loading screen 1 line 1....',
        interval: 30000
      },
      'second_line': {
        row: 2,
        default: 'Loading screen 1 line 2....',
        interval: 1200000
      }
    }
  },
  {
    name: 'MyScreen2',
    heartbeat: 'off',
    widgets: {
      'first_line': {
        row: 1,
        default: 'Loading screen 2 line 1....',
        interval: 30000
      },
      'second_line': {
        row: 2,
        default: 'Loading screen 2 line 2....',
        interval: 1200000
      }
    }
  }
];

lcd.on('ready', function () {

  // Loop through screens.
  screens.forEach(function (screen) {

    // Create LCD screen.
    lcd.createScreen(screen.name, {
      heartbeat: screen.heartbeat
    });

    // Loop through and set up widgets.
    Object.keys(screen.widgets).forEach(function (key) {

      var widget = screen.widgets[key];

      // Updates widget with screen name and row number; you would probably
      // want to fetch data from somewhere.
      var updateWidget = function () {
        lcd.updateWidget(key, 1, widget.row, 20, widget.row, 'h', 1, screen.name + ' row ' + widget.row);
      };

      // Make it scoll.
      lcd.addWidget(key, 'scroller');

      // Set initial values.
      lcd.updateWidget(key, 1, widget.row, 20, widget.row, 'h', 1, widget.default);

      // Update continuously.
      updateWidget();
      setInterval(updateWidget, widget.interval);

    });

  });

});

lcd.init();
