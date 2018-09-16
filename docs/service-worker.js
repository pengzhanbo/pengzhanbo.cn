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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "33cab9fbd22e7de81a226959cc84998a"
  },
  {
    "url": "assets/css/0.styles.580ca345.css",
    "revision": "47b87022875243b9fe9bc9729ed9fe7b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6d7fd6a1.js",
    "revision": "5f7acb0ed0d7620cca2df49f55462dbb"
  },
  {
    "url": "assets/js/11.aeca08e4.js",
    "revision": "873c686173816c0ccc5f29c0c5168454"
  },
  {
    "url": "assets/js/12.e376f83c.js",
    "revision": "217a599d0d84f887fe9175859ba79e3d"
  },
  {
    "url": "assets/js/13.c0b60ed9.js",
    "revision": "aa80c6c65252af023229c68b13606def"
  },
  {
    "url": "assets/js/2.f5cfcac5.js",
    "revision": "7c030d501e8e4d021d0f4387f2a7708c"
  },
  {
    "url": "assets/js/3.d4d1d10d.js",
    "revision": "987aabff47bb97e14ab49838ab957e0f"
  },
  {
    "url": "assets/js/4.d5a9de69.js",
    "revision": "edf207a765391eb1667c618ff9711cc4"
  },
  {
    "url": "assets/js/5.b7a405ad.js",
    "revision": "c57e57b82fa9809862278b46f451d83e"
  },
  {
    "url": "assets/js/6.5e4501ec.js",
    "revision": "bcdbf586cff7b0c57c4899a078374624"
  },
  {
    "url": "assets/js/7.6785a6c2.js",
    "revision": "bc3cd5d8da5842d7b5d7632418745106"
  },
  {
    "url": "assets/js/8.2c5cdf47.js",
    "revision": "af7eefb2c94f05ecacd6db2ea6286cdd"
  },
  {
    "url": "assets/js/9.f3a5d3ac.js",
    "revision": "1641b3aa68e7b619071fe20118729798"
  },
  {
    "url": "assets/js/app.5904f62e.js",
    "revision": "14f5fe1c1d44e0fec906e74b4281550a"
  },
  {
    "url": "g.gif",
    "revision": "511ab92acf34ae4e32fb6eacc427e978"
  },
  {
    "url": "helloboy.gif",
    "revision": "9e9bf36dcb5e1a33a0ac19cddef3b4eb"
  },
  {
    "url": "index.html",
    "revision": "e7d0a917b73e66fbe50800d3cf60d3ee"
  },
  {
    "url": "Jenkins.html",
    "revision": "279d51bef0b26a48c208bdc74bd3e38b"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "e2d9d024d029cb25ca7ea8babb1c427d"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "1bb6fc2e3ccd65c0d7a84b2e526f7270"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "dc52addff917bf8c2c37e4d843d52ac7"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "11d6cce83554adfaa2c4d6cbb0dab713"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "88f7efe1b548b3ce6d023539a1730f03"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "b96af09499f245d20844d27b2d9be504"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "8e70f05703f7c4116582dfcc5e0b717f"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "3005e4f9be3ebaf69b7ad24d1656ee43"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
