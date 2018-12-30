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
    "revision": "ef274cade4e93a726054efa1eb46c28f"
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
    "url": "assets/js/10.f32d7449.js",
    "revision": "25fe14d87150ed7e53615ac7623690ca"
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
    "url": "assets/js/app.431c609f.js",
    "revision": "eec02ac8b4442387ed3bc1ee6bbe899d"
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
    "revision": "25c12101e0411308b730e5c6c7f5ec84"
  },
  {
    "url": "Jenkins.html",
    "revision": "af032c473ec6bbdba4235f8faaedf145"
  },
  {
    "url": "vsCode插件推荐.html",
    "revision": "8edf610ca03281e27c81326e2955bbab"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "40dbc68f49fe212c9c796c7c217d68fe"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "0750ce081d58afa7be0298a13db57c3b"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "400bfc1beb78f06d4c8dd973774dc8f2"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "35257f7d9702f9303457552134454fd1"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "f302d809c3efb689331176c872c1ec03"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "a1b594999d2b3778aadb10d95ed1a45c"
  },
  {
    "url": "正则表达式.html",
    "revision": "8cabfe9407f39a64a653f11ad4b717e6"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "c1a8f8f9ac30412b111a31862c33b184"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "27ed225fb5dfe85af33c2e35562bcdae"
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
