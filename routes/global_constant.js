var data_assets_path = 'json/',
    data = {},
    path = require('path'),
    fs = require('fs'),
    files = fs.readdirSync(data_assets_path);

files.map(function(fileName) {
    var filePath = path.join(data_assets_path, fileName);
    var extension = path.extname(fileName);
    var key = fileName.slice(0, -extension.length);
    var fileContents = fs.readFileSync(filePath, 'utf8');

    switch(extension) {
        case '.json':
            data[key] = JSON.parse(fileContents);
            break;
    }
});

module.exports = data;