function handler(event) {
  var response = event.response;
  var headers = response.headers;

  var defaultSrc =
    "default-src 'self' res.cloudinary.com *.googletagmanager.com *.google-analytics.com *.youtube.com";
  var imgSrc =
    "img-src 'self' www.facebook.com data: *.googletagmanager.com www.google.com www.google.com.pe  *.doubleclick.net *.upc.edu.pe *.upn.edu.pe *.stage01.link *.wetalk.pe res.cloudinary.com www.google-analytics.com fonts.gstatic.com static.getclicky.com t.co analytics.twitter.com pixel.mathtag.com leadsglobal.go2cloud.org *.teads.tv analytics.tiktok.com ads.sonataplatform.com *.clarity.ms";
  var fontSrc =
    "font-src 'self' data: *.upc.edu.pe *.upn.edu.pe  stordatamiupc.blob.core.windows.net fonts.gstatic.com";

  var connectSrc =
    "connect-src 'self' in.getclicky.com  searchs-open-portals.azurewebsites.net *.upc.edu.pe *.upn.edu.pe *.stage01.link *.wetalk.pe *.googletagmanager.com *.google-analytics.com viveupc.pe  *.doubleclick.net *.stage01.link *.wetalk.pe analytics.google.com eu2.device-api.indigitall.com n2.mouseflow.com vc.hotjar.io *.teads.tv analytics.tiktok.com *.clarity.ms *.microsoftonline.com";
  var styleSrc =
    "style-src 'self' 'unsafe-inline'  *.upc.edu.pe *.upn.edu.pe  cdn.jsdelivr.net www.googletagmanager.com fonts.googleapis.com ";
  var scriptSrc =
    "script-src 'self' 'unsafe-eval' cdnjs.cloudflare.com script.hotjar.com connect.facebook.net in.getclicky.com *.googletagmanager.com 'unsafe-inline' *.upc.edu.pe *.upn.edu.pe www.youtube.com viveupc.pe  static.getclicky.com www.googleoptimize.com www.google-analytics.com www.googleadservices.com tpc.googlesyndication.com ssl.google-analytics.com js.hs-analytics.net static.ads-twitter.com static.hotjar.com cdn.mouseflow.com pe-upc.netmng.com pixel.mathtag.com ajax.cloudflare.com *.teads.tv analytics.tiktok.com *.clarity.ms";
  var frameSrc =
    "frame-src 'self' tpc.googlesyndication.com www.youtube.com pixel.mathtag.com *.doubleclick.net www.facebook.com *.teads.tv *.microsoftonline.com";
  var frameAncestors = "frame-ancestors 'self' *.wetalk.pe";

  var contentSecurityPolicy = [
    defaultSrc,
    imgSrc,
    fontSrc,
    connectSrc,
    styleSrc,
    scriptSrc,
    frameSrc,
    frameAncestors,
  ].join('; ');

  headers['content-security-policy'] = { value: contentSecurityPolicy };

  headers['strict-transport-security'] = {
    value: 'max-age=31536000; includeSubdomains; preload',
  };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-xss-protection'] = { value: '1; mode=block' };

  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

  headers['x-permitted-cross-domain-policies'] = { value: 'none' };
  //headers['cache-control'] = { value: 'public, max-age=3600' };
  headers['cache-control'] = {
    value: 'private, max-age=0, no-store, must-revalidate',
  };

  headers['permissions-policy'] = {
    value:
      'geolocation=(),midi=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=(),accelerometer=()',
  };
  // Return the response to viewers
  return response;
}
