# html-localizer
Static html files localization middleware for Express

## How to use

Inside your app.js express file, just before adding the static files middleware, you should add the following lines:

```
var loclib = require('html-localizer');

var staticFilesDir = path.join(__dirname, 'public');
var localizer = new loclib.default(staticFilesDir);

// let's add support for english (default) and spanish languages
loc.loadLanguage('en', path.join(__dirname, 'locale.en'), true);
loc.loadLanguage('es', path.join(__dirname, 'locale.es'));
app.use(loc.middleware());

// now, mount the actual static files handler on both language paths
app.use('/en', express.static(staticFilesDir));
app.use('/es', express.static(staticFilesDir));

```