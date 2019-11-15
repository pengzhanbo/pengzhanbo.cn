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
    "url": "_post_back/index.html",
    "revision": "22bd3e3810fa18cf529b7ea6551726c4"
  },
  {
    "url": "_post_back/Jenkins.html",
    "revision": "a2f9237f067ba9e89d0b720a5c65dc16"
  },
  {
    "url": "_post_back/vsCode插件推荐.html",
    "revision": "3b87e537420c5b57adb3eba0925ece49"
  },
  {
    "url": "_post_back/vue组件间数据通信.html",
    "revision": "4eeb89235ddffe636c9509e71fca2d91"
  },
  {
    "url": "_post_back/WebComponent/customElements.html",
    "revision": "fb4c22c9c3be6469ee7a3bc9c14ffe7c"
  },
  {
    "url": "_post_back/WebComponent/HTMLImport.html",
    "revision": "44a2c15386f2b92c1ef47ede66f46ae8"
  },
  {
    "url": "_post_back/WebComponent/shadowDOM.html",
    "revision": "17d243938be859f478ce3c058fbccd5f"
  },
  {
    "url": "_post_back/WebComponent/template.html",
    "revision": "2b7b3739f433deeb6660c779f81bbf8e"
  },
  {
    "url": "_post_back/前端的思考与杂谈.html",
    "revision": "9986ec8966841d198a4cbe84e1a3b5fd"
  },
  {
    "url": "_post_back/正则表达式.html",
    "revision": "6664240e5e91a8dc8bed1186da49aabf"
  },
  {
    "url": "_post_back/浅谈前端工程化.html",
    "revision": "009adae1c2c00724e45d65ad8fc3fcb7"
  },
  {
    "url": "_post_back/面试题以及个人答案CSS篇.html",
    "revision": "2045698bcbeabe4cd4eed13a1d7d9e54"
  },
  {
    "url": "_post_back/面试题以及个人答案JS篇.html",
    "revision": "acc6dc3ec49b90213c22d874e6c8df86"
  },
  {
    "url": "404.html",
    "revision": "80bd5d9b79aa83f6525a8ac8b739da94"
  },
  {
    "url": "assets/css/0.styles.5b30cd91.css",
    "revision": "289300a0dc1bb1df5f73d68be6abc3cc"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.f0e95df7.js",
    "revision": "5b6f488a4ebae2e0ac8579beb407c689"
  },
  {
    "url": "assets/js/10.ef5779a0.js",
    "revision": "639a30ca346e177b9381f449c8c94303"
  },
  {
    "url": "assets/js/11.9e8eec4a.js",
    "revision": "ce867f3ad223f8390cb82d6b18c4e9a1"
  },
  {
    "url": "assets/js/12.8b96abc2.js",
    "revision": "5c4dc5b2acb3d31ffd42d42299226d39"
  },
  {
    "url": "assets/js/13.8359aa5b.js",
    "revision": "c10fa1d50a83d444dc7faa3df59cc8e9"
  },
  {
    "url": "assets/js/14.809e58a6.js",
    "revision": "41913a97573cd92699b660de3514359a"
  },
  {
    "url": "assets/js/15.2fb1a3f8.js",
    "revision": "ff79a86e5da9e5f94e7c7093df227683"
  },
  {
    "url": "assets/js/16.dcd7b9df.js",
    "revision": "da2a99313c660e3bb43e43fd2d689f4d"
  },
  {
    "url": "assets/js/17.1a7e2651.js",
    "revision": "997450db383cdc34fbcf26627b3a1d96"
  },
  {
    "url": "assets/js/18.48fc6c64.js",
    "revision": "2be94b35b751bec42e5e0702a4450174"
  },
  {
    "url": "assets/js/19.7b9cb0a2.js",
    "revision": "e49d8a952019de546e6123d0bd7fbc5d"
  },
  {
    "url": "assets/js/20.a7663a54.js",
    "revision": "c30b14f6c453c51c07e1381fe71188f1"
  },
  {
    "url": "assets/js/21.12db77bd.js",
    "revision": "4ca19d1d0cd2c92ff652cad3876459c7"
  },
  {
    "url": "assets/js/22.03ca20a0.js",
    "revision": "0bf75db381328fc660b413e7c58b78de"
  },
  {
    "url": "assets/js/23.a83e6603.js",
    "revision": "05faf6b12c44077a299c34e6d70a5b8c"
  },
  {
    "url": "assets/js/24.bddfdb8a.js",
    "revision": "998b7afa192e2109384e8a473ec1b7ae"
  },
  {
    "url": "assets/js/25.3187bd29.js",
    "revision": "d6e77d742916b802c4e638fdb5265740"
  },
  {
    "url": "assets/js/26.ea21c843.js",
    "revision": "69aa355f72b096c690fd0dd6d032dcdb"
  },
  {
    "url": "assets/js/27.71a58df8.js",
    "revision": "322dc119c503fa2f77ca9d85fa229f13"
  },
  {
    "url": "assets/js/28.8caedddd.js",
    "revision": "cf909b95bfc78f282c1981f093262555"
  },
  {
    "url": "assets/js/29.ddeec051.js",
    "revision": "83cd376d9d2f24ed9101f8c448bcf050"
  },
  {
    "url": "assets/js/30.f3067c98.js",
    "revision": "a9a5e87408ef00196b3a19ce41b905a5"
  },
  {
    "url": "assets/js/31.4ebfbedf.js",
    "revision": "a14e863e3f427b091dc1e37288497682"
  },
  {
    "url": "assets/js/32.d1efafc6.js",
    "revision": "d35f052f0c06e837d6a88212b739c4b0"
  },
  {
    "url": "assets/js/33.bd610ffe.js",
    "revision": "d76c9cb466ada25d812d036778335003"
  },
  {
    "url": "assets/js/34.8b265ff1.js",
    "revision": "9934b8a97ac377cb3e0cff4af3b1eb77"
  },
  {
    "url": "assets/js/35.f55b3003.js",
    "revision": "9c9748133b6e80a8f71a5e3181dbb77c"
  },
  {
    "url": "assets/js/36.dddcbdbf.js",
    "revision": "74006909e8190814bcf8f1d37712b1b3"
  },
  {
    "url": "assets/js/4.95fb6385.js",
    "revision": "59b2b14bc35098d950f18a02308bfee7"
  },
  {
    "url": "assets/js/5.2cb996cc.js",
    "revision": "611791a593300e90d3ae0e7b67784cf5"
  },
  {
    "url": "assets/js/6.55a36ca9.js",
    "revision": "52149f65eb25de06047e233813a0f9f9"
  },
  {
    "url": "assets/js/7.c9da92c0.js",
    "revision": "8b4805779a412e224867b1f5d17a5ff2"
  },
  {
    "url": "assets/js/8.3797390c.js",
    "revision": "63409017c466b11090f36e42f6a67e6b"
  },
  {
    "url": "assets/js/9.bb4845f2.js",
    "revision": "255249bcaf95277091a1311fa8732cd5"
  },
  {
    "url": "assets/js/app.dd150920.js",
    "revision": "7952c58a53d502a50539240f8b9d9e75"
  },
  {
    "url": "assets/js/vuejs-paginate.56553db2.js",
    "revision": "486f1627c8587957d3fbacb14fe4f7b9"
  },
  {
    "url": "draft/2019-11-03-micro-front-end.html",
    "revision": "64e97509ef8e2cb5b30142796ed73543"
  },
  {
    "url": "draft/2019-9-10-how-develop-ui-framwork.html",
    "revision": "0726189c42e483b499e0cc0f0c59a6a3"
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
    "revision": "f92428aed6eb3c18953ab71453904962"
  },
  {
    "url": "post/2018/03/19/webcomponent-template/index.html",
    "revision": "ec84dc678f916f3d05079852cfcb50cb"
  },
  {
    "url": "post/2018/07/20/vue-component-data/index.html",
    "revision": "62e9d4e386be613224b6a40ae9f12ee2"
  },
  {
    "url": "post/2018/08/01/webcomponent-custom-elements/index.html",
    "revision": "461c30b49475e11e660de5ece95449e5"
  },
  {
    "url": "post/2018/08/22/interview-question-css/index.html",
    "revision": "9b8b07222f75d67bcdc1c34b7dc97522"
  },
  {
    "url": "post/2018/08/23/interview-question-js/index.html",
    "revision": "00208c5ac3fe2f37082a5a3c5ba30e9b"
  },
  {
    "url": "post/2018/09/16/jenkins/index.html",
    "revision": "99b1a246fb40c71434181b8e80ecb8d9"
  },
  {
    "url": "post/2018/11/26/regexp/index.html",
    "revision": "f28e6f338a59782546cc18f8765bd14e"
  },
  {
    "url": "post/2018/12/29/vscode-plugin-recommend/index.html",
    "revision": "62d853d87ea0bacd85ff5a1e6ae660c7"
  },
  {
    "url": "tag/framework/index.html",
    "revision": "5786c8c6d3a7729bb1560b043dba4ecc"
  },
  {
    "url": "tag/index.html",
    "revision": "7a505db03e04c89532281e14cd25ef1c"
  },
  {
    "url": "tag/vue component/index.html",
    "revision": "ae9e97eae2ebe0820e37c69dff18ff7e"
  },
  {
    "url": "tag/vue/index.html",
    "revision": "e847465d0e8ae30dae9295d5f1c517c7"
  },
  {
    "url": "tag/web component/index.html",
    "revision": "3a62f5fb6587ef7081915068c786a9f8"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "6a44980224ce94dae62889d4e74ff397"
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
