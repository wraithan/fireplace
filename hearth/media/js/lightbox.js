define('lightbox',
    ['keys', 'models', 'utils', 'shothandles', 'tracking', 'underscore', 'z'],
    function(keys, models, utils, handles, tracking, _, z) {

    var $lightbox = $(document.getElementById('lightbox'));
    var $section = $lightbox.find('section');
    var $content = $lightbox.find('.content');
    var currentApp;
    var previews;
    var slider;

    $lightbox.addClass('shots');

    function showLightbox() {

        if (z.context.type === 'leaf') {
            tracking.trackEvent('App view interactions', 'click', 'Screenshot view');
        } else if (z.context.type === 'search') {
            tracking.trackEvent(
                'Category view interactions',
                'click',
                'Screenshot view'
            );
        }

        var $this = $(this);
        var which = $this.closest('li').index();
        var $tray = $this.closest('.tray');
        var $tile = $tray.prev();

        // we get the screenshots from the associated tile. No tile? bail.
        if (!$tile.hasClass('mkt-tile')) return;

        var product = models('app').lookup($tile.data('slug'));
        var id = product.id;

        if (id != currentApp || !slider) {
            currentApp = id;
            previews = product.previews;
            renderPreviews();
        }

        // set up key bindings
        z.win.bind('keydown.lightboxDismiss', function(e) {
            switch (e.which) {
                case keys.ESCAPE:
                    e.preventDefault();
                    hideLightbox();
                    break;
                case keys.LEFT:
                    e.preventDefault();
                    if (slider) slider.toPrev();
                    break;
                case keys.RIGHT:
                    e.preventDefault();
                    if (slider) slider.toNext();
                    break;
            }
        });

        // fade that bad boy in
        $lightbox.show();
        setTimeout(function() {
            slider.moveToPoint(which);
            resize();
            $lightbox.addClass('show');
        }, 0);
    }

    function renderPreviews() {
        // clear out the existing content
        $content.empty();

        // place in a pane for each image/video with a 'loading' placeholder
        // and caption.
        _.each(previews, function(p) {
            var $el = $('<li class="loading">');
            var $cap = $('<div class="caption">');
            $cap.text(p.caption);
            $el.append($cap);
            $content.append($el);

            // let's fail elegantly when our images don't load.
            // videos on the other hand will always be injected.
            if (p.type == 'video/webm') {
                // we can check for `HTMLMediaElement.NETWORK_NO_SOURCE` on the
                // video's `networkState` property at some point.
                var v = $('<video src="' + p.image_url + '" controls></video>');
                $el.removeClass('loading');
                $el.append(v);
            } else {
                var i = new Image();

                i.onload = function() {
                    $el.removeClass('loading');
                    $el.append(i);
                };
                i.onerror = function() {
                    $el.removeClass('loading');
                    $el.append('<b class="err">&#x26A0;</b>');
                };

                // attempt to load the image.
                i.src = p.image_url;
            }
        });

        // $section doesn't have its proper width until after a paint.
        slider = Flipsnap($content[0]);
        slider.element.addEventListener('fsmoveend', pauseVideos, false);

        handles.attachHandles(slider, $section);
    }

    function resize() {
        if (!slider) return;
        $content.find('.caption');
        slider.distance = $section.width();
        slider.refresh();
    }

    function pauseVideos() {
        $('video').each(function() {
            this.pause();
        });
    }

    // Horrible hack to work around trays repainting upon lightbox dismissal.
    // This affects FF only.
    function ghettoFresh() {
        // z-index should be between 10, 15 (9 is also OK).
        var z = ~~(Math.random() * 5 + 10);
        var $mainSlider = $('.product-details .slider .content');

        // Make sure the new value is always different to force a repaint.
        if (parseInt($mainSlider.css('z-index'), 10) === z) z--;

        setTimeout(function() {
            $mainSlider.css({'z-index': z});
        }, 100);
    }

    function hideLightbox() {
        pauseVideos();
        $lightbox.removeClass('show');
        // We can't trust transitionend to fire in all cases.
        setTimeout(function() {
            $lightbox.hide();
        }, 500);
        ghettoFresh();
        z.win.unbind('keydown.lightboxDismiss');
    }

    // prevent mouse cursors from dragging these images.
    $lightbox.on('dragstart', function(e) {
        e.preventDefault();
    });

    // we need to adjust the scroll distances on resize.
    z.win.on('resize', _.debounce(resize, 200));

    // if a tray thumbnail is clicked, load up our lightbox.
    z.page.on('click', '.tray ul a', utils._pd(showLightbox));

    // dismiss the lighbox when we click outside it or on the close button.
    $lightbox.on('click', function(e) {
        if ($(e.target).is('#lightbox')) {
            hideLightbox();
            e.preventDefault();
        }
    });
    $lightbox.find('.close').on('click', utils._pd(hideLightbox));

    // Hide screenshot overlay on back button hit.
    z.page.on('navigate', hideLightbox);

});
