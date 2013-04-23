import copy
import json
import os
from cgi import escape

from flask import render_template
from jinja2 import FileSystemLoader

import urls
import settings


template_path = '../hearth/templates/'

helpers = {
    'api': urls.api_url,
    'apiParams': urls.api_apiParams,
    'url': urls.reverse,

    'settings': settings,
    '_': lambda x, **kwargs: x.format(**kwargs),
    '_plural': lambda x, y, **kw: (x if kw.get('n') == 1 else y).format(**kw),
}


def make_data_attrs(obj):
    if not obj:
        return ''
    return ' '.join(
        'data-%s="%s"' % (escape(k), escape(v)) for
        k, v in obj.iteritems())


def dataproduct(obj):
    obj = copy.copy(obj)
    if 'this' in obj:
        del obj['this']
    if 'window' in obj:
        del obj['window']
    return 'data-product="%s"' % escape(repr(obj))


def setup_templates(app):
    # Load in template our extensions.
    app.jinja_options = dict(app.jinja_options)
    app.jinja_options['extensions'].append('defer_ext.Defer')

    app.jinja_loader = FileSystemLoader(
        os.path.join(os.path.dirname(__file__), template_path))

    app.jinja_env.globals.update(helpers)
    app.jinja_env.filters['stringify'] = json.dumps
    app.jinja_env.filters['urlparams'] = urls._urlparams
    app.jinja_env.filters['make_data_attrs'] = make_data_attrs
    app.jinja_env.filters['dataproduct'] = dataproduct

    print 'Jinja2 Template Loader side-loaded'

def render(template):
    out = render_template(template)
    return render_template('spaceheater.html', data=out)
