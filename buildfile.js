/**
 * Created by Dean on 11/4/2016.
 */
const fs = require("fs");
const async = require("async");
const browserify = require("browserify");
const path = require("path");
const cheerio = require("cheerio");

buildFile(process.argv[2]);

export function buildFile(absPath) {
    if (!absPath) {
        throw new Error("File must be an argument!");
    }

    fs.readFile(absPath, function (err, fileData) {
        if (err) {
            throw err;
        }

        // If our file is an HTML file, parse the meta file and add onto our html file!
        if (path.extname(absPath) === ".html") {
            dealWithHtml(absPath, fileData);
        } else if (path.basename(absPath) === "script.js") {
            browserify(absPath)
                .transform("babelify", {presets: ["es2015"]})
                .transform("uglifyify", {global: true})
                .bundle()
                .pipe(fs.createWriteStream(getOutputName(absPath)));
        } else if (isNeeded(absPath)) {
            fs.createReadStream(absPath).pipe(fs.createWriteStream(getOutputName(absPath)));
        }
        // else do nothing
    });
}

function isNeeded(absPath) {

    const neededFileExts = [
        ".css", ".png", ".ogg", ".svg", ".jpg", ".jpeg", ".mp4", ".otf", ".oet", ".ttf", ".woff", ".woff2", ".less",
        ".scss"
    ];

    const neededFiles = [
        "manifest.json", "browserconfig.xml", "sitemap.xml", "CNAME"
    ];

    return neededFileExts.includes(path.extname(absPath)) || neededFiles.includes(path.basename(absPath));
}

function dealWithHtml(absPath, fileData) {
    let $ = cheerio.load(fileData);
    let newFile = fileData;
    const metaFile = path.join(path.dirname(absPath), "meta.json");
    const scriptBundle = path.join(path.dirname(absPath), "bundle.min.js");
    const head = $("head");

    if (!$("html")) {
        return;
    }

    // Add script to HTML file if it exists
    if (fs.existsSync(scriptBundle)) {
        head.prepend("<script>").attr("src", "bundle.min.js", "type", "text/javascript");
        newFile = $.html();
    }

    async.parallel([
        function scanMetaFile() {
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
                    const addLink = (toAdd, rel, href, size) => add("link", toAdd, {
                        rel: rel,
                        href: href,
                        size: size
                    });
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
                })
            }
        }
    ], function onComplete() {
        fs.writeFile(getOutputName(absPath), newFile, (err) => {
            throw err;
        });
    })

}

function getOutputName(ourFilePath) {
    const split = ourFilePath.split(path.sep);
    for (let i = split.length - 1; i >= 0; i--) {
        if (split[i] === "backend") {
            split[i] = "docs";
            break;
        }
    }

    return path.join(...split);
}

