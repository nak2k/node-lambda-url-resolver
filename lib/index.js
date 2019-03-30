const { get } = require('caseless-get');

function resolvePath(path, event, options) {
  if (path.startsWith('//') || path.startsWith('http:') || path.startsWith('https:')) {
    return path;
  }

  if (path[0] === '/') {
    path = path.substr(1);
  }

  return getBasePath(event, options) + path;
}

function resolveUrl(url, event, options) {
  if (url.startsWith('http:') || url.startsWith('https:')) {
    return url;
  }

  if (url.startsWith('//')) {
    return 'https:' + url;
  }

  if (url[0] === '/') {
    url = url.substr(1);
  }

  const {
    headers,
  } = event;

  const host = get(headers, 'host');

  return `https://${host}` + getBasePath(event, options) + url;
}

function getBasePath(event, options = {}) {
  const {
    basePathMap = {},
  } = options;

  const host = get(event.headers, 'host') || '';
  const basePath = basePathMap[host];

  if (basePath) {
    return basePath.endsWith('/') ? basePath : basePath + '/';
  } else if (host.endsWith('.amazonaws.com')) {
    return `/${event.requestContext.stage}/`;
  } else {
    return '/';
  }
}

/*
 * Exports.
 */
exports.resolvePath = resolvePath;
exports.resolveUrl = resolveUrl;
