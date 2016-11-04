/**
 * Created by Dean on 11/4/2016.
 */
const fs = require("fs");
const browserify = require("browserify");

// Walk through all files, look for .jsx files
fs.readdir(".", function (err, files) {
    if (err === null) {
        for (let f of files) {
            if (f.endsWith(".jsx")) {
                browserify(f)
                    .transform("babelify", {presets: ["es2015"]})
                    .transform("uglyifyify", {global: true})
                    .bundle()
                    .pipe(fs.createWriteStream("bundle.js"));
            }

            if (f.isDirectory()) {

            }
        }
    }
});