import random


dummy_text = 'foo bar zip zap cvan fizz buzz something something'.split()

def ptext(len=10):
    return ' '.join(random.choice(dummy_text) for i in xrange(len))


def trans(name):
    """This simulates a name being translated to multiple languages."""
    return {
        '_': 'Default: %s' % name,
        'en-US': 'English: %s' % name,
        'fr-FR': 'French: le %s' % name,
        'pt-BR': 'Portuguese: %s' % name,
    }


def category(slug, name):
    return {
        'url': '/categories/%s' % slug,
        'name': trans(name),
        'class_name': slug,
    }


def app(name, slug, **kwargs):
    return {
        'name': trans(name),
        'slug': random.choice(dummy_text),
        'summary': trans(kwargs.get('summary', ptext(5))),
        'description': trans(kwargs.get('description', ptext(15))),
        'dev_comments': trans(kwargs.get('dev_comments', ptext())),
        'is_packaged': False,
        'current_version': {
            'version': '%d.0' % int(random.random() * 20),
            'release_notes': trans(kwargs.get('release_notes', ptext()))
        },
        'url': '/app/<id>',
        'icons': {
            16: '/media/img/icons/firefox-beta.png',
            48: '/media/img/icons/firefox-beta.png',
            64: '/media/img/icons/firefox-beta.png',
            128: '/media/img/icons/firefox-beta.png'
        },
        'image_assets': {
            'desktop_tile': ['/media/img/icons/firefox-beta.png',
                             int(random.random() * 255)],
            'featured_tile': ['/media/img/icons/firefox-beta.png',
                              int(random.random() * 255)],
            'mobile_tile': ['/media/img/icons/firefox-beta.png',
                            int(random.random() * 255)],
        },
        'listed_authors': [
            {'name': 'basta'},
            {'name': 'cvan'}
        ],
        'price': '0.00',
        'ratings': {
            'average': random.random() * 4 + 1,
            'count': int(random.random() * 500),
        },
        'notices': [
            'be careful, cvan made it.',
            'lol jk'
        ],
        'support_email': trans('support@%s.com' % slug),
        'homepage': trans('http://marketplace.mozilla.org/'),
        'privacy_policy': trans(kwargs.get('privacy_policy', ptext())),
        'public_stats': False,
        'upsell': False,
        # or { // False if no upsell or not available in user region.
        #    url: '/app/<id>'
        #    name: trans(name),
        #    icons: ...,
        #},
        'content_ratings': {
            'dejus': {'name': 'rating name', 'description': 'rating desc'},
            'esrb': {'name': 'C', 'description': 'C for CVERYONE'},
        }
    }
