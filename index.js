var fs = require("fs");
var endOfLine = require('os').EOL;
var path = require('path');

let Localizer = class Localizer {
    constructor(staticFilesPath) {
        this._staticFilesPath = staticFilesPath;
        this._lang = {};
        this._defaultLang
    }

    loadLanguage(lang, file, isDefault) {
        this._lang[lang] = {};

        var content = fs.readFileSync(file).toString();

        for (var line of content.split(endOfLine)) {
            var equal = line.indexOf("=");
            var id = line.substring(0, equal);
            var value = line.substring(equal + 1);

            this._lang[lang][id] = value;
        }

        if (isDefault || this._defaultLang == undefined) {
            this._defaultLang = lang;
        }
    }

    middleware() {
        var realThis = this;
        return function (req, res, next) {
            var currentLang = realThis.getLang(req.url);
            var reqPath = realThis.removeLang(req.url);

            var filePath = path.join(realThis._staticFilesPath, reqPath);

            if (filePath.endsWith("/")) {
                filePath += "index.html";
            }

            if (!filePath.endsWith(".html")) {
                next();
                return;
            }

            if (!fs.existsSync(filePath)) {
                next();
                return;
            }

            var content = fs.readFileSync(filePath).toString();
            for (var key in realThis._lang[currentLang]) {
                var val = realThis._lang[currentLang][key];
                content = content.replace(`#{${key}}`, val);
            }

            res.send(content);
        }
    }

    removeLang(path) {
        for (var lang in this._lang) {
            var start = "/" + lang;
            if (path.startsWith(start)) {
                return path.substr(start.length);
            }
        }

        return path;
    }

    getLang(path) {
        for (var lang in this._lang) {
            var start = "/" + lang;
            if (path.startsWith(start)) {
                return lang;
            }
        }

        return this._defaultLang;
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Localizer;
