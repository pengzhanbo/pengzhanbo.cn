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
    "revision": "81ee29ba3cedfbc6695e7078329f048d"
  },
  {
    "url": "_post_back/Jenkins.html",
    "revision": "30768e71d3a1cc24020de93e0429f9ef"
  },
  {
    "url": "_post_back/vsCode插件推荐.html",
    "revision": "a0450834d92713ad283bbb1a10a0aff8"
  },
  {
    "url": "_post_back/vue组件间数据通信.html",
    "revision": "104e4aed81c58b8df80d425bc19f05ed"
  },
  {
    "url": "_post_back/WebComponent/customElements.html",
    "revision": "5db055e0a44e9f9ca53279c156534168"
  },
  {
    "url": "_post_back/WebComponent/HTMLImport.html",
    "revision": "2e70d3e3ea468840795b754087f7224f"
  },
  {
    "url": "_post_back/WebComponent/shadowDOM.html",
    "revision": "c67e8202ac87aba9adcbc2c3f2b00bd1"
  },
  {
    "url": "_post_back/WebComponent/template.html",
    "revision": "ea010a886b5b87c3b84108981aa043a5"
  },
  {
    "url": "_post_back/前端的思考与杂谈.html",
    "revision": "1953d7e3a203b367b101322b017c30bb"
  },
  {
    "url": "_post_back/正则表达式.html",
    "revision": "9603de871301c3dec915b22b8e7c8702"
  },
  {
    "url": "_post_back/浅谈前端工程化.html",
    "revision": "766ad809245520de84a5c449c97ca6cd"
  },
  {
    "url": "_post_back/面试题以及个人答案CSS篇.html",
    "revision": "dbf5861f5201b479752ae76561422f78"
  },
  {
    "url": "_post_back/面试题以及个人答案JS篇.html",
    "revision": "fe34b16a7922d5bef6ac5b73bb9eebb7"
  },
  {
    "url": "404.html",
    "revision": "8bdc33b9e81a23e72be916b17ee6812e"
  },
  {
    "url": "assets/css/0.styles.36da9574.css",
    "revision": "d7839e508cf633eee171fe42f64c9e05"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.66ab5037.js",
    "revision": "93fb599f6d7f8fb403305f234b1dabb4"
  },
  {
    "url": "assets/js/10.7c08e196.js",
    "revision": "3aa4c460171522a3e065ac526b433583"
  },
  {
    "url": "assets/js/11.cb195a09.js",
    "revision": "39b6d8a2884f97fe5b3500ecd4a849ce"
  },
  {
    "url": "assets/js/12.db4dd32b.js",
    "revision": "b1431754a308b2f5b481029760e7fdf1"
  },
  {
    "url": "assets/js/13.951a9353.js",
    "revision": "c89a5a44144ca4f321e0d80a4c215dea"
  },
  {
    "url": "assets/js/14.92051b7f.js",
    "revision": "fa8b9ef1657570d7fd91855a5f19fe6c"
  },
  {
    "url": "assets/js/15.17b6a34f.js",
    "revision": "0ef96d11dec8fe96439025425c4b6a43"
  },
  {
    "url": "assets/js/16.ae853a5f.js",
    "revision": "463f4981cca11fdf41884ad826003a3f"
  },
  {
    "url": "assets/js/17.a7a0fcdf.js",
    "revision": "b19de3c901caf1faf7113a2d652d98e4"
  },
  {
    "url": "assets/js/18.b0908583.js",
    "revision": "8df8cbec6808bff8a2e8a583026758a4"
  },
  {
    "url": "assets/js/19.79298703.js",
    "revision": "86316e0bf3f55f06dc3386f062ffdbad"
  },
  {
    "url": "assets/js/20.b5c71c98.js",
    "revision": "2ac8e837baf98c28d01ce92032ca3cac"
  },
  {
    "url": "assets/js/21.4030c142.js",
    "revision": "90104627b64ba2c70d3a16ed86a9b88b"
  },
  {
    "url": "assets/js/22.ee7e7450.js",
    "revision": "200e27b996f401f87d6371d079a75138"
  },
  {
    "url": "assets/js/23.9d2ef0a5.js",
    "revision": "2241d22c6f292f479d41a01155dd21e7"
  },
  {
    "url": "assets/js/24.f1b1ae5d.js",
    "revision": "05853a14c4a9354259b249253827d214"
  },
  {
    "url": "assets/js/25.f5d90b3f.js",
    "revision": "1406cbdb062634088a4d0c824af0724e"
  },
  {
    "url": "assets/js/26.84a162c8.js",
    "revision": "7f1b3166b589984c344933731f3a69c7"
  },
  {
    "url": "assets/js/27.08e906a0.js",
    "revision": "05b1645b7a28d06709e290ac889e4a76"
  },
  {
    "url": "assets/js/28.f1b991e3.js",
    "revision": "bfe79172a04e88518408811c5d1233e5"
  },
  {
    "url": "assets/js/29.21fef2de.js",
    "revision": "df60f4bb980a2a996805b3dd210ed65e"
  },
  {
    "url": "assets/js/30.bcc85fa8.js",
    "revision": "ab31c5dc34a741dbd3d7e6c2ddc1e2f0"
  },
  {
    "url": "assets/js/31.4ebfbedf.js",
    "revision": "a14e863e3f427b091dc1e37288497682"
  },
  {
    "url": "assets/js/32.c38e03c3.js",
    "revision": "323eca965726bf4edbcfdd0083ca05f1"
  },
  {
    "url": "assets/js/33.394a2647.js",
    "revision": "cd353da06563f4f6b7c04762871ae7e8"
  },
  {
    "url": "assets/js/34.2ad6676d.js",
    "revision": "88a369de334b385f23979d2cda8dcc02"
  },
  {
    "url": "assets/js/4.a3bba933.js",
    "revision": "e888b1a7ffd461b40c555a69b4493208"
  },
  {
    "url": "assets/js/5.923b7910.js",
    "revision": "7c16a27a9adbe832c1ef60511d386906"
  },
  {
    "url": "assets/js/6.921fcb68.js",
    "revision": "4a68c587d2da2a8bc0c23fd43bcb7927"
  },
  {
    "url": "assets/js/7.650d1a56.js",
    "revision": "3c21ec1cca11632e8df84881a84e16ae"
  },
  {
    "url": "assets/js/8.e25d152a.js",
    "revision": "4771960913bc66ee9bc72114c136fe7d"
  },
  {
    "url": "assets/js/9.d2d5bd21.js",
    "revision": "f1afd30e7fe136b2f547d22c17e8c4b4"
  },
  {
    "url": "assets/js/app.4c1a61b0.js",
    "revision": "e3e1ec93c9a8a637869ae0a60f5b2f5b"
  },
  {
    "url": "assets/js/vuejs-paginate.3380b6dc.js",
    "revision": "1357fe50c61077f0120b2848f9bc9760"
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
    "revision": "44601cc9365516043ec334827096eaae"
  },
  {
    "url": "post/2018/03/19/webcomponent-template/index.html",
    "revision": "13d0935bf51a2357ded651f89641a04b"
  },
  {
    "url": "post/2018/07/20/vue-component-data/index.html",
    "revision": "6ca4db7566275d8668e29c738416ac29"
  },
  {
    "url": "post/2018/08/01/webcomponent-custom-elements/index.html",
    "revision": "a9c9096d2d65c696bd48b9ec0ec83ca4"
  },
  {
    "url": "post/2018/08/22/interview-question-css/index.html",
    "revision": "fde6b8e9ee713dd1d40cf8656ca7051c"
  },
  {
    "url": "post/2018/08/23/interview-question-js/index.html",
    "revision": "8709c21f2d7e756412949098fd39417c"
  },
  {
    "url": "post/2018/09/16/jenkins/index.html",
    "revision": "1cf8ea103df918a1a57ad7def1be6f58"
  },
  {
    "url": "post/2018/11/26/regexp/index.html",
    "revision": "f4d14467bd76232287095c6631ef4f5a"
  },
  {
    "url": "post/2018/12/29/vscode-plugin-recommend/index.html",
    "revision": "15e8154fa3e0e800cab02f182a2a4d1b"
  },
  {
    "url": "tag/index.html",
    "revision": "381fa1226152185b91b3344c291b2aef"
  },
  {
    "url": "tag/vue component/index.html",
    "revision": "a08a53d6410bd6834b66459a67c0dee1"
  },
  {
    "url": "tag/vue/index.html",
    "revision": "47b8c1cb5f42e6b2fda264a93706928d"
  },
  {
    "url": "tag/web component/index.html",
    "revision": "e7543777cf868a87e0cb4cf64d355096"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "c15edc760736520d90cd50a3c04ab132"
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
