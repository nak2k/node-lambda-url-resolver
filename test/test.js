const test = require('tape');
const {
  resolvePath,
  resolveUrl,
} = require('..');

test('test resolvePath()', t => {
  t.plan(2);

  const path1 = resolvePath('/test', {
    headers: {
      Host: 'test.amazonaws.com',
    },
    requestContext: {
      stage: 'Prod',
    },
  });

  t.equal(path1, '/Prod/test');

  const path2 = resolvePath('/test', {
    headers: {
      Host: 'example.com',
    },
    requestContext: {
      stage: 'Prod',
    },
  });

  t.equal(path2, '/test');
});

test('test resolveUrl()', t => {
  t.plan(2);

  const url1 = resolveUrl('/test', {
    headers: {
      Host: 'test.amazonaws.com',
    },
    requestContext: {
      stage: 'Prod',
    },
  });

  t.equal(url1, 'https://test.amazonaws.com/Prod/test');

  const url2 = resolveUrl('/test', {
    headers: {
      Host: 'example.com',
    },
    requestContext: {
      stage: 'Prod',
    },
  });

  t.equal(url2, 'https://example.com/test');
});
