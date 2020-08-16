import { get } from 'caseless-get';

interface Event {
  path?: string;
  rawPath?: string;
  headers: any;
  requestContext: {
    stage: string;
  };
}

interface Options {
  basePathMap?: { [host: string]: string };
}

export function getCurrentUrl(event: Event, options?: Options) {
  return resolveUrl(event.path || event.rawPath!, event, options);
}

export function resolvePath(path: string, event: Event, options?: Options) {
  if (path.startsWith('//') || path.startsWith('http:') || path.startsWith('https:')) {
    return path;
  }

  if (path[0] === '/') {
    path = path.substr(1);
  }

  return getBasePath(event, options) + path;
}

export function resolveUrl(url: string, event: Event, options?: Options) {
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

export function getBasePath(event: Event, options: Options = {}) {
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
