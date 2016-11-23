/**
 * Created by Dean on 11/4/2016.
 */
const fs = require("fs");
const browserify = require("browserify");
const path = require("path");

// Walk through all files, look for .jsx files and compile them into minified ES5
function walk(p) {
    fs.readdir(p, function (err, files) {
        if (err) {
            throw err;
        }

        // walk through all directories except node_modules
        files
            .filter((f) => f != "node_modules")
            .filter((f) => !f.startsWith("."))
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isDirectory())
            .forEach((f) => {
                walk(f)
            });

        // browserify all jsx files in this directory
        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .forEach((f) => {
                if (f.endsWith(".jsx")) {
                    browserify(f)
                        .transform("babelify", {presets: ["es2015"]})
                        .transform("uglifyify", {global: true})
                        .bundle()
                        .pipe(fs.createWriteStream(path.join(path.dirname(f), "bundle.min.js")));
                }
            });
    });
}

walk(__dirname);