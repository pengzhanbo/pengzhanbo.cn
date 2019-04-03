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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f24ce415fe855e116d75c0dc3cce240c"
  },
  {
    "url": "assets/css/0.styles.0c95a4d6.css",
    "revision": "2f630c4ae984686fc95052d94edb9fd4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8f51ecc6.js",
    "revision": "fd2ecc2bb0e624ee6d485f2fa1dcd44a"
  },
  {
    "url": "assets/js/11.1ef0db5b.js",
    "revision": "a18b20997df2feb1050db1204f2c639d"
  },
  {
    "url": "assets/js/12.11470c7e.js",
    "revision": "89ce59ede54e634fb5b80fa6865fcdcc"
  },
  {
    "url": "assets/js/13.131736d8.js",
    "revision": "cc5c983dfa93c3abc67f7652c6549748"
  },
  {
    "url": "assets/js/14.28566eeb.js",
    "revision": "8653a4ed506eb21e5dd1c12f253888b1"
  },
  {
    "url": "assets/js/15.4ee22bd2.js",
    "revision": "b078732425d9e2b349582b1ccf4b104f"
  },
  {
    "url": "assets/js/16.511314bb.js",
    "revision": "9c4128de0b772ce689fdce4f416f2ae9"
  },
  {
    "url": "assets/js/2.1365ca4d.js",
    "revision": "44e3be81e4fb61ef7cfe238da771fe1d"
  },
  {
    "url": "assets/js/3.ea917c2a.js",
    "revision": "786f6f912afe10818b53d3133fc049e9"
  },
  {
    "url": "assets/js/4.ce7bdfdc.js",
    "revision": "427e8fba42ec8d6e311447b62f88df83"
  },
  {
    "url": "assets/js/5.b78f1572.js",
    "revision": "5ca10707ed2a58fae43157754a6db92b"
  },
  {
    "url": "assets/js/6.3ed472f1.js",
    "revision": "0bed9dbdd4ec71b6958aa9ae751fd321"
  },
  {
    "url": "assets/js/7.59b58b82.js",
    "revision": "e3d7646d6b12beb7536373ea222ea8c5"
  },
  {
    "url": "assets/js/8.9bec80fa.js",
    "revision": "3446d77375138989b086a2282b8bb536"
  },
  {
    "url": "assets/js/9.fe483af1.js",
    "revision": "7032cf1bc7057a90617cd07feb9bcaef"
  },
  {
    "url": "assets/js/app.10abd34d.js",
    "revision": "e05996817657bc89df5b5964dbc5fbad"
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
    "revision": "f88ecf3c4105ee910a633c4945cc717f"
  },
  {
    "url": "Jenkins.html",
    "revision": "12997af20b25e8f7db29db6843b18696"
  },
  {
    "url": "vsCode插件推荐.html",
    "revision": "95078f3fbf8e9cbf903fdfd78808ce0a"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "68673c611e020b3642b55b3c07894d55"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "430feb538a98e388c77f93e99209fd71"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "4591c92f74c93ce7de925d679bb48bea"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "a9c29585bc3a4df360e7ad2673e4304a"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "1eccb4259e61e534a7492bbcaeda57c8"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "8647fd43af539ef2c87e86ef25dac42c"
  },
  {
    "url": "正则表达式.html",
    "revision": "751435a64b21e033edec6ca3cc82f0fb"
  },
  {
    "url": "浅谈前端工程化.html",
    "revision": "714d20a16fb5b168e5d80859325123e5"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "8433d377c1a23b61c519770cc65fc852"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "d4cb771c61056d68584579da2a98d330"
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
