import {buildFile} from "./buildfile";
const fs = require("fs");
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

        // run buildfile.js on all files in the directory
        files
            .map((f) => path.join(p, f))
            .filter((f) => fs.statSync(f).isFile())
            .forEach((f) => buildFile(f));
    });
}

walk(__dirname + "/backend/");