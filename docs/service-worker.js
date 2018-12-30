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
    "revision": "6284aef5093e897a34ce769db8cf31a3"
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
    "url": "assets/js/10.c3cf26e7.js",
    "revision": "1af0b779afc7847d17a3b9f9592d9537"
  },
  {
    "url": "assets/js/11.3ea1a131.js",
    "revision": "abfb2b9a3e02810058be456e72ad82fc"
  },
  {
    "url": "assets/js/12.ececf5f2.js",
    "revision": "0e8db1252284258d0930e70f135d7371"
  },
  {
    "url": "assets/js/13.31bc6072.js",
    "revision": "3fe74d0448f0767d5193c9ef91cbb831"
  },
  {
    "url": "assets/js/14.e9fd052a.js",
    "revision": "8f9237f5a7d9af2f33e734bb4472ce6f"
  },
  {
    "url": "assets/js/15.29a4d492.js",
    "revision": "f14c6e152d544b8875d3c5c3cc99a473"
  },
  {
    "url": "assets/js/2.f5cfcac5.js",
    "revision": "7c030d501e8e4d021d0f4387f2a7708c"
  },
  {
    "url": "assets/js/3.6d28dd3b.js",
    "revision": "6b84b21ff19d6f6ebd26877b03398532"
  },
  {
    "url": "assets/js/4.4d0df28a.js",
    "revision": "aadd5a5fdac1cec69b9f6b566f7bc4a3"
  },
  {
    "url": "assets/js/5.75499a68.js",
    "revision": "e6e421ff3506af67d9b1266927a1f8d2"
  },
  {
    "url": "assets/js/6.d8b4a15e.js",
    "revision": "3df2f029113d473366a4298a8f48c2e5"
  },
  {
    "url": "assets/js/7.48aa5a04.js",
    "revision": "4d45c8cc415e6d54875cc8968d7128cd"
  },
  {
    "url": "assets/js/8.f9c1f034.js",
    "revision": "5763753b0dec7719b03567ff72ac99d3"
  },
  {
    "url": "assets/js/9.3cc081e1.js",
    "revision": "20eac44bb33e8617f2a0d6b6acfb0417"
  },
  {
    "url": "assets/js/app.b557e690.js",
    "revision": "779e987874dbfed720da96758fe8886e"
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
    "revision": "80226567de3ac275fbb8ad777cd33e07"
  },
  {
    "url": "Jenkins.html",
    "revision": "3de00659b20755416c0f3b37051e8934"
  },
  {
    "url": "vsCode插件推荐.html",
    "revision": "3045f91a6300ecc2cd821352172f697f"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "17b876ab1fed9164df7b277247413f31"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "adf999152302ba437524fcd244f80cf1"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "5f759bbd6609f49e0b70082505b92591"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "888a2f5e66322c98ca8fdeffea34a6bf"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "880483516de5296b3d866978e91199c5"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "a574bfea33131492d3bf429ffc7046c2"
  },
  {
    "url": "正则表达式.html",
    "revision": "23896735afc3a5d69bf12b1dccbc6e4e"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "4f1e3e557ec4f3f04af3c4930ef4c125"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "55576e261e1e18fba939e9bcf6192cbe"
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
