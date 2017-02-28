const fs = require("fs");
const path = require("path");
const buildFile = require("./buildFile");

// Walk through all files, look for files and do what we need with them
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

        // run buildFile.js on all files in the directory
        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .forEach((f) => buildFile(f));
    });
}

walk(__dirname + "/backend/");