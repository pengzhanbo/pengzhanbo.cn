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
    "revision": "b3d5882649802a59dfc9fdd53b3a77fc"
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
    "url": "assets/js/10.00d15077.js",
    "revision": "5f7acb0ed0d7620cca2df49f55462dbb"
  },
  {
    "url": "assets/js/11.ce61406a.js",
    "revision": "873c686173816c0ccc5f29c0c5168454"
  },
  {
    "url": "assets/js/12.433abfa5.js",
    "revision": "217a599d0d84f887fe9175859ba79e3d"
  },
  {
    "url": "assets/js/13.7b943e95.js",
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
    "url": "assets/js/4.1c1925df.js",
    "revision": "0fccc921d5bd63235e3bb1cabdcf40f8"
  },
  {
    "url": "assets/js/5.065e1133.js",
    "revision": "c57e57b82fa9809862278b46f451d83e"
  },
  {
    "url": "assets/js/6.c8da340b.js",
    "revision": "bcdbf586cff7b0c57c4899a078374624"
  },
  {
    "url": "assets/js/7.4f59e8bc.js",
    "revision": "bc3cd5d8da5842d7b5d7632418745106"
  },
  {
    "url": "assets/js/8.5087170f.js",
    "revision": "af7eefb2c94f05ecacd6db2ea6286cdd"
  },
  {
    "url": "assets/js/9.4a036476.js",
    "revision": "1641b3aa68e7b619071fe20118729798"
  },
  {
    "url": "assets/js/app.e9f34dad.js",
    "revision": "b16951d0d0f8e74a1c43717001e58f18"
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
    "url": "images/jenkins_globalconfig.png",
    "revision": "5c8b5cfed556c01c9ac8b220a11a2e4b"
  },
  {
    "url": "index.html",
    "revision": "939f8adb25286780435861fffb61fe75"
  },
  {
    "url": "Jenkins.html",
    "revision": "8977407b47809ca4280d01806156d30e"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "d291baacdcbe2a1fe56ac153379f324c"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "d36d451795effee46269b4c5821c2f69"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "d204b3a09985c28beab13a6b1b4f4324"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "4f5079821c36ff69124df8e49ffdc32f"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "93edc8047d6ae88f98623b34a122df57"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "0c3d1c6f28c83627fa8ec9d2b819c178"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "8ff7c29d27f4487222dc0a3fccface8b"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "13c94b6a6606812b4d3ac8502f75a322"
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
