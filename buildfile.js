/**
 * Created by Dean on 11/4/2016.
 */
const fs = require("fs");
const browserify = require("browserify");
const path = require("path");
const cheerio = require("cheerio");

const ourFile = process.argv[2];
if (!ourFile) {
    throw new Error("File must be an argument!");
}

fs.readFile(ourFile, function (err, fileData) {
    if (err) {
        throw err;
    }

    // If our file is an HTML file, parse the meta file and add onto our html file!
    if (path.extname(ourFile) === ".html") {
        let $ = cheerio.load(fileData);
        let newFile = fileData;
        const metaFile = path.join(path.dirname(ourFile), "meta.json");
        const scriptBundle = path.join(path.dirname(ourFile), "bundle.min.js");
        const head = $("head");

        if(!$("html")) {
            return;
        }

        // Add script to HTML file if it exists
        if (fs.existsSync(scriptBundle)) {
            head.prepend("<script>").attr("src", "bundle.min.js", "type", "text/javascript");
            newFile = $.html();
        }

        if (fs.existsSync(metaFile)) {
            fs.readFile(metaFile, function (err, metadata) {
                if (err) {
                    throw err;
                }

                const meta = JSON.parse(metadata);

                // define a function to add tags to head
                function add(type, _toAdd, def) {
                    let elem = head.prepend("<" + type + ">");
                    const toAdd = _toAdd ? _toAdd : def;
                    for (const index in toAdd) {
                        if (toAdd.hasOwnProperty(index)) {
                            elem = elem.attr(index, toAdd[index]);
                        }
                    }
                    newFile = $.html();
                }

                // function to add links to <head>
                const addLink = (toAdd, rel, href, size) => add("link", toAdd, {rel: rel, href: href, size: size});
                // function to add meta to <head>
                const addMeta = (toAdd, name, content) => add("link", toAdd, {name: name, content: content});

                if (!meta.favicon) {
                    meta.favicon = {};
                }
                if (!meta.card) {
                    meta.card = {};
                }

                if (!meta.favicon.noFavicon) {
                    addLink(meta.favicon.apple, "apple-touch-icon", "/favicon/apple-touch-icon.png", "180x180");
                    addLink(meta.favicon.favlarge, "icon", "/favicon/favicon-32x32.png", "32x32");
                    addLink(meta.favicon.favsmall, "icon", "/favicon/favicon-16x16.png", "16x16");
                    addLink(meta.favicon.manifest, "manifest", "/favicon/manifest.json");
                    addLink(meta.favicon.ico, {rel: "shortcut icon", href: "/favicon/favicon.ico"});
                    addMeta(meta.favicon.ms, "msapplication-config", "/favicon/browserconfig.xml");
                    addMeta(meta.favicon.theme, "theme-color", "#ffffff");
                }

                if (!meta.card.noCard) {
                    addMeta(meta.card.twitterCard, "twitter:card", "summary");
                    addMeta(meta.card.twitterUser, "twitter:site", "@Deanveloper");
                    addMeta(meta.card.ogType, "og:type", "website");
                    addMeta(meta.card.title, "og:title", "Dean Bassett's Website");
                    addMeta(meta.card.title, "twitter:title", "Dean Bassett's Website");
                    addMeta(meta.card.description, "og:description", "A place for my little creations.");
                    addMeta(meta.card.description, "twitter:description", "A place for my little creations.");
                    addMeta(meta.card.image, "og:image", "https://www.deanveloper.com/favicon/android-chrome-512x512.png");
                    addMeta(meta.card.image, "twitter:image", "https://www.deanveloper.com/favicon/android-chrome-512x512.png");
                    addMeta(meta.card.twitterImageAlt, "twitter:image:alt", "Dean Bassett's Website");
                }
            });
        }
    }
});

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

        // browserify all js files in this directory
        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .forEach((f) => {
                if (f.endsWith(".js") && !f.endsWith(".min.js")) {
                    browserify(f)
                        .transform("babelify", {presets: ["es2015"]})
                        .transform("uglifyify", {global: true})
                        .bundle()
                        .pipe(fs.createWriteStream(path.join(path.dirname(f), "bundle.min.js")))
                }
            });
    });
}

walk(__dirname + "/site/");