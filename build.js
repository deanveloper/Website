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

                }
            });
    });
}

walk(__dirname + "/backend/");