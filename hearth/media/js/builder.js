define('builder', [], function() {

    var applyTemplate = function (template, data) {
        if (_.isObject(data))
            return nunjucks.env.render(template, data);
        else if(_.isArray(data))
            return _.map(data, function(d) {return nunjucks.env.render(template, d);}).join('');
        else
            return nunjucks.env.render(template);
    };

    function builderObj() {
        var requests = [];
        var completed_requests = 0;

        function decrRequests() {
            completed_requests++;
            if (completed_requests == requests.length) {
                z.page.trigger('loaded');
            }
        }

        function getAJAX(request, elements) {
            elements.addClass('loading');

            if (typeof request == 'string') {
                console.log('Builder requesting URL: ' + request)
                request = $.get(request);
            }
            requests.push(request);

            request.error(function() {
                console.warn('AJAX request to remote resource failed D:');
                elements.html(applyTemplate(settings.fragment_error_template, {}));
            }).complete(function() {
                // This applies to .success and .error.
                elements.removeClass('loading');
                decrRequests();
            });

            return request;
        }

        // builder.dest('.selector').load('/api/app/<id>', 'my.template');
        this.dest = function(selector) {
            var elements = z.page.find(selector);
            var actions = {
                load: function(request, template) {
                    return getAJAX(request, elements).success(function(data) {
                        elements.removeClass('loading');
                        elements.html(applyTemplate(template, data));
                    });
                }
            };
            return actions;
        };

        // builder.loadParts(
        //     '/api/app/<id>',
        //     [{dest: '.selector', template: 'my.template'},
        //      {dest: 'section', template: 'detail.section', pluck: 'blurbs'}]
        // );
        this.loadParts = function(request, parts) {

            // Put a loading indicator on all of the parts.
            var all_parts = z.page.find(_.pluck(parts, 'dest').join(', '));

            return getAJAX(request, all_parts).success(function(data) {
                _.map(parts, function(part) {
                    var data = data;
                    // Pluck specifies a field to "pluck" out of the main
                    // data. Useful for avoiding name collissions (app name,
                    // reviewer name, etc.).
                    if ('pluck' in part) {
                        data = data[part.pluck];
                    }
                    var trigger = 'fragment_loaded';
                    if ('trigger' in part) {
                        trigger = part.trigger
                    }

                    z.page.find(part.dest)
                          .html(applyTemplate(part.template, data))
                          .trigger(trigger);

                });
            });
        };

        this.terminate = function() {
            // Abort all ongoing AJAX requests that been flagged as forced.
            _(requests).where({_force: undefined, isSuccess: false})
                       .invoke('abort');
        };
    }

    return {
        getBuilder: function() {return new builderObj();},
    };
});