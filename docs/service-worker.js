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
    "revision": "a1bfe9582eac165389de6b9b774a9a21"
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
    "url": "assets/js/10.61dbbee1.js",
    "revision": "cd46313d18ebf38978631537ac20f082"
  },
  {
    "url": "assets/js/11.4c8f9c34.js",
    "revision": "b432cb031e0b7f42b5a5576421bf9f38"
  },
  {
    "url": "assets/js/12.738cd505.js",
    "revision": "1437c9ac9c03df1cb78ef4d7cf8f9ba7"
  },
  {
    "url": "assets/js/13.9ce2d178.js",
    "revision": "e0f285c39c420fbddc2c02d739f43538"
  },
  {
    "url": "assets/js/14.881758bc.js",
    "revision": "2adc7bc87d61abb8540c6719eeea23db"
  },
  {
    "url": "assets/js/15.d511236d.js",
    "revision": "d74fcf26aa53ecc4f0b4de8e364d9a0e"
  },
  {
    "url": "assets/js/2.1365ca4d.js",
    "revision": "44e3be81e4fb61ef7cfe238da771fe1d"
  },
  {
    "url": "assets/js/3.0910f870.js",
    "revision": "bd57915fdf434e5b7c186e43b94cb198"
  },
  {
    "url": "assets/js/4.090bd6ef.js",
    "revision": "0d02f61160bbc8b3df5ef23506368ed7"
  },
  {
    "url": "assets/js/5.26fa2496.js",
    "revision": "71130eee311470a5905088288c659d9f"
  },
  {
    "url": "assets/js/6.9f21f1ff.js",
    "revision": "89cb66110bbc7c9d94330e9777dcbc22"
  },
  {
    "url": "assets/js/7.18d9c2a7.js",
    "revision": "709376d52ade71f18ab8a0cd4ba858f2"
  },
  {
    "url": "assets/js/8.e00ce7eb.js",
    "revision": "c517e7f835788aee1bbba4a5f01ad1b6"
  },
  {
    "url": "assets/js/9.97bb7568.js",
    "revision": "56c949dee16e8ef895c540cca493fba3"
  },
  {
    "url": "assets/js/app.b787e9d8.js",
    "revision": "ef40376bb9f245688a475229531c7e6d"
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
    "revision": "34a75960d849829d3d6ccb3a5d4bf3bc"
  },
  {
    "url": "Jenkins.html",
    "revision": "6e4de57e8e10874476063352de43dfb8"
  },
  {
    "url": "vsCode插件推荐.html",
    "revision": "182da0379c1a162b843310bfcf8696ed"
  },
  {
    "url": "vue组件间数据通信.html",
    "revision": "132f88386c5d3ebb70dd41c16eb69b97"
  },
  {
    "url": "WebComponent/customElements.html",
    "revision": "4faa85ad2a787e5b88d80101f4c59242"
  },
  {
    "url": "WebComponent/HTMLImport.html",
    "revision": "7ceaaa9a4fd42b039409318252bac0d6"
  },
  {
    "url": "WebComponent/shadowDOM.html",
    "revision": "1a39113ecd7d56869690c515c1f62e02"
  },
  {
    "url": "WebComponent/template.html",
    "revision": "32dd15a22777903781b519304c3c4eba"
  },
  {
    "url": "前端的思考与杂谈.html",
    "revision": "e8367614f69fd718be5a64985d9b704a"
  },
  {
    "url": "正则表达式.html",
    "revision": "0cee383bc55e9d1f9672034655e5d765"
  },
  {
    "url": "面试题以及个人答案CSS篇.html",
    "revision": "72da3c3b84cfe01354b64e96946f7ed0"
  },
  {
    "url": "面试题以及个人答案JS篇.html",
    "revision": "1a23ba202636890382ea91fe67689f8b"
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
