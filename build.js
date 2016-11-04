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

        // make all necessary directories and copy all non-jsx files to the new folder
        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .filter((f) => !f.endsWith(".jsx"))
            .forEach((f) => {
                const dir = path.dirname(f).replace("GithubPagesES6", "Website");
                fs.mkdir(dir, () => {
                    fs.createReadStream(f).pipe(fs.createWriteStream(path.join(dir, path.basename(f))));
                });
            });

        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .filter((f) => f.endsWith(".jsx"))
            .forEach((f) => {
                const dir = path.dirname(f).replace("GithubPagesES6", "Website");
                browserify(f)
                    .transform("babelify", {presets: ["es2015"]})
                    .transform("uglifyify", {global: true})
                    .bundle()
                    .pipe(fs.createWriteStream(path.join(dir, "bundle.js")));
            });
    });
}

walk(__dirname);