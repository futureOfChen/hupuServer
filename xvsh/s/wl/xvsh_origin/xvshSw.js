/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("/s/wl/xvsh/workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/s/wl/xvsh/workbox-v3.6.2"});

importScripts(
  "/s/wl/xvsh/precache-manifest.775af5893aaeaeb54180c52e85810854.js"
);

workbox.core.setCacheNameDetails({prefix: "xvsh_precache"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "ignoreUrlParametersMatching": [/./]
});

workbox.routing.registerRoute(/https:\/\/shanghu.95516.com\/wlmweb-web\/restlet\/mchnt\/getMchntAndAreaInf.sjson/, workbox.strategies.cacheFirst({ "cacheName":"walletWeb-runtime", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":86400,"purgeOnQuotaError":true}), new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/css\/commonUI2.css/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/commonModule\/zepto.min.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/commonModule\/fastclick.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/commonModule\/qrcode.min.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/commonAll.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/allPluginsMerged.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/android.7.0.0\/cordova.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/android.3.6.4\/cordova.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/android.3.6.4\/cordova_plugins.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/ios.4.5.4\/cordova.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/ios.3.6.3\/cordova.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\/s\/wl\/webV3\/common\/cordova\/ios.3.6.3\/cordova_plugins.js/, workbox.strategies.staleWhileRevalidate(), 'GET');
