function addTrailingSlash(url) {
  return url + '/';
}
function removeTrailingSlash(url) {
  return url.replace(/\/$/, '');
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (!uri.includes('.')) {
    if (uri === '') {
      request.uri += '/index.html';
    } else if (uri === '/') {
      request.uri += 'index.html';
    } else {
      if (uri.endsWith('/')) {
        request.uri = removeTrailingSlash(request.uri);
      }
      request.uri += '/index.html';
    }
  }
  return request;
}
