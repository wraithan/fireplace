// Do this last- initialize the marketplace!

(function() {

    var splash = $('#splash-overlay');
    z.page.on('loaded', function() {
       splash.addClass('hide');
    });

    var modules = [
        'feedback',
        'install',
        'login',
        'notification',
        'tracking'
    ];

    define('marketplace', modules, function() {

        if (settings.tracking_enabled) {
            // Initialize analytics tracking.
            z.page.on('loaded', function(event, href, popped, state) {
                // Otherwise we'll track back button hits etc.
                if (!popped) {
                    // GA track every fragment loaded page.
                    _gaq.push(['_trackPageview', href]);
                }
            });
        }

        // This lets you refresh within the app by holding down command + R.
        if (z.capabilities.gaia) {
            window.addEventListener('keydown', function(e) {
                if (e.keyCode == 82 && e.metaKey) {
                    window.location.reload();
                }
            });
        }

        var hash = window.location.hash;
        nav.navigate(hash && hash.substr(0, 2) == '#!' ? hash : '/');

    });

    require('marketplace');

})();
