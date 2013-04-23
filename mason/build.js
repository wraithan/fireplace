{
    baseUrl: '../hearth/media/js/',
    include: ['requireLib'],
    insertRequire: ['requireLib'],
    paths: {
        'requireLib': 'lib/require',
        'flipsnap': 'lib/flipsnap',
        'jquery': 'lib/jquery-1.9',
        'underscore': 'lib/underscore',
        'nunjucks': 'lib/nunjucks',
        'nunjucks.compat': 'lib/nunjucks.compat',
        'templates': '../../templates',
        'stick': 'lib/stick',
        'format': 'lib/format'
    },
    name: 'marketplace',
    out: '../hearth/media/compiled.js',
    optimize: 'none'
}