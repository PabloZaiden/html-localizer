# html-localizer
Static html files localization middleware for Express

## How to use

### Adding the localizer middleware
Inside your app.js express file, just before adding the static files middleware, you should add the following lines:

```
var loclib = require('html-localizer');

var staticFilesDir = path.join(__dirname, 'public');
var localizer = new loclib.default(staticFilesDir);

// let's add support for english (default) and spanish languages
localizer.loadLanguage('en', path.join(__dirname, 'locale.en'), true);
localizer.loadLanguage('es', path.join(__dirname, 'locale.es'));
app.use(localizer.middleware());

// now, mount the actual static files handler on both language paths
app.use('/en', express.static(staticFilesDir));
app.use('/es', express.static(staticFilesDir));

```

### Change your html files

If your html file looked like this:

```
<html>
    <body>
        <p>This text should be different on each languange</p>
    </body>
</html>
```

You would have to change it to this:
```
<html>
    <body>
        <p>#{main_text}</p>
    </body>
</html>
```

And add the following files

**locale.en**
```
#{main_text}=This text should be different on each languange
```

**locale.es**
```
#{main_text}=Este texto debe ser distinto en cada idioma
```
