# lambda-url-resolver

URL resolver for Lambda.

In building the web site with API Gateway + Lambda, this package is useful that generates redirect URLs.

## Installation

```
npm i lambda-url-resolver
```

## API

### getBasePath(event, options)

This function returns a base path for an event.

- `event`
  - An event object of Lambda Proxy Integration.
- `options.basePathMap`
  - See `resolveUrl(url, event, options)`

### getCurrentUrl(event, options)

This function is equivalent to `resolveUrl(event.path, event, options)`.

### resolvePath(path, event, options)

This function resolve a path and return an absolute path.
In order to do it, get a base path from `event` and `options`.

- `path`
  - A relative path.
- `event`
  - An event object of Lambda Proxy Integration.
- `options.basePathMap`
  - See `resolveUrl(url, event, options)`

### resolveUrl(url, event, options)

This function resolve a url and return an absolute url.

- `url`
  - A relative url.
- `event`
  - An event object of Lambda Proxy Integration.
- `options.basePathMap`
  - An object that specify base paths for each domains.
  - The key is a domain, and the value is a base path against the domain.
  - If the value of the host header of the event does not match any key of this object, the following process make the base path:
    - If the value of the host header ends with `.amazonaws.com`, the base path is `/${event.requestContext.stage}/`.
    - Otherwise, the base path is `/`.
  - Default: `{}`

## Related

- [pambda-redirect](https://github.com/pambda/pambda-redirect)

## License

MIT
