/* router.js — Hash-Router: #/ , #/modul/<id> , #/glossar?t=<begriff> */
(function (global) {
  'use strict';

  function parse(hash) {
    var raw = (hash || '').replace(/^#\/?/, '');
    var teile = raw.split('?');
    var pfad = teile[0].split('/').filter(Boolean);
    var query = {};
    (teile[1] || '').split('&').filter(Boolean).forEach(function (kv) {
      var p = kv.split('=');
      query[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    if (!pfad.length) return { view: 'home', query: query };
    if (pfad[0] === 'modul' && pfad[1]) return { view: 'modul', id: pfad[1], query: query };
    if (pfad[0] === 'glossar') return { view: 'glossar', query: query };
    return { view: 'home', query: query };
  }

  function start(onRoute) {
    function handle() { onRoute(parse(location.hash)); }
    global.addEventListener('hashchange', handle);
    handle();
  }

  global.Router = { start: start, parse: parse };
})(window);
