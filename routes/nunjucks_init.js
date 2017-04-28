var nunjucks  = require('nunjucks');

var _default = function (app) {
    // Setup nunjucks templating engine
    var env = nunjucks.configure(app.get('views'), {
        autoescape: true,
        noCache: true,
        watch: true,
        express: app
    });

    env.addFilter('two_digit', function(num) {
        return num <= 9 ? '0' + num : num;
    });

    return env;
};

module.exports = _default;