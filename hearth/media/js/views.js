
var views = {};

define('views', ['builder'], function(builder) {

    var routes = [
        {pattern: '^/$', view_name: 'homepage'},
        {pattern: '^/app/([^/<>"\']+)/ratings$', view_name: 'ratings'},
        {pattern: '^/app/([^/<>"\']+)$', view_name: 'app'},
    ];

    _.map(routes, function(route) {
        route.regexp = new RegExp(route.pattern);
    });

    function match_route(url) {
        // Returns a 2-tuple: (view, [args]) or null

        var hashpos, qspos;
        // Strip the hash string
        if ((hashpos = url.indexOf('#')) >= 0) {
            url = url.substr(0, hashpos);
        }

        // Strip the query string
        if ((qspos = url.indexOf('?')) >= 0) {
            url = url.substr(0, qspos);
        }

        // Force a leading slash
        if (url[0] != '/') {
            url = '/' + url;
        }

        console.log('Routing', url);
        for (var i in routes) {
            var route = routes[i];
            console.log(route.regexp);
            var matches = route.regexp.exec(url);
            if (!matches)
                continue;

            console.log('Found route: ', route.view_name);
            if (!(route.view_name in views)) {
                console.error('Route matched but view not initialized!');
                return null;
            }
            return [views[route.view_name], _.rest(matches)];
        }

        return null;
    }

    return {
        match: match_route,
        routes: routes
    };

});