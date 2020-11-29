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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "7d934c80101e9f8f6996c793e61fd3c5"
  },
  {
    "url": "assets/css/0.styles.4038f040.css",
    "revision": "014ef46f34b4061313ce9848385317f8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.bc66f434.js",
    "revision": "768a59a9bb389dd574c7e969e0ffc2fa"
  },
  {
    "url": "assets/js/11.f6a902f5.js",
    "revision": "208b86b1f9e72998b371779589e462b2"
  },
  {
    "url": "assets/js/12.b515471c.js",
    "revision": "eb2d37906230e8616d247299654cc14f"
  },
  {
    "url": "assets/js/13.0f0284e4.js",
    "revision": "4ab7c844a1cb32675d6a1e53e7969f29"
  },
  {
    "url": "assets/js/14.a6c0c4ef.js",
    "revision": "eab259acff138031feb1d5054538afd1"
  },
  {
    "url": "assets/js/15.c6b5e293.js",
    "revision": "a302b523ba57bbcf884f9c16fde84270"
  },
  {
    "url": "assets/js/16.029e88e4.js",
    "revision": "163e821a273ef21e7ac0bd3709262077"
  },
  {
    "url": "assets/js/17.67b7cfa6.js",
    "revision": "7af1a0aae9bc56eb5a7d64635bc77ae9"
  },
  {
    "url": "assets/js/18.57f43531.js",
    "revision": "f43b16c276898b93411358cd9ad893f2"
  },
  {
    "url": "assets/js/19.c964aa5f.js",
    "revision": "6bda91c3e0256e738bb6ba6086dbd0bd"
  },
  {
    "url": "assets/js/20.5af5a061.js",
    "revision": "56ab9c1ab81e12e7897fce2688d43d91"
  },
  {
    "url": "assets/js/3.01a18781.js",
    "revision": "547c7e66d4a345cdb03f24aabad76227"
  },
  {
    "url": "assets/js/4.6897e876.js",
    "revision": "29b53593b5fe8eda89fc171f8298f90c"
  },
  {
    "url": "assets/js/5.7c0fafba.js",
    "revision": "b2fc19c74c2f8767a4d60470dac8ec57"
  },
  {
    "url": "assets/js/6.c8a3f87e.js",
    "revision": "a3732ca665ed67aaaecf8e30b4ef5ffd"
  },
  {
    "url": "assets/js/7.a4753207.js",
    "revision": "dd8d22909a3d7e65222829564b1127e1"
  },
  {
    "url": "assets/js/8.5947eae6.js",
    "revision": "810f631264baa38fcfc72f1c081267d2"
  },
  {
    "url": "assets/js/9.9f576abe.js",
    "revision": "0a740ccdd8c2163762fe50888acbe483"
  },
  {
    "url": "assets/js/app.e62c98be.js",
    "revision": "4435673ad73e949b2fc3dd4aa72abb0a"
  },
  {
    "url": "assets/js/vuejs-paginate.00621417.js",
    "revision": "29974364cc6881115738c3c89ac2e03e"
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
    "revision": "4bcc62fb6f1bf00096d914f8587d3d99"
  },
  {
    "url": "post/2018/03/19/webcomponent-template/index.html",
    "revision": "6cea593e967c1e4fbae9d9d819eb6816"
  },
  {
    "url": "post/2018/07/20/vue-component-data/index.html",
    "revision": "4f7c8637921dc3b63fd5599828f8b326"
  },
  {
    "url": "post/2018/08/01/webcomponent-custom-elements/index.html",
    "revision": "4e795dd6fb28da845f05a78bf0f65e6b"
  },
  {
    "url": "post/2018/08/22/interview-question-css/index.html",
    "revision": "c4afc30aab8f98a70d00b3cc4e36ad5c"
  },
  {
    "url": "post/2018/08/23/interview-question-js/index.html",
    "revision": "2841c4913a8557e94b45b274238d2f0b"
  },
  {
    "url": "post/2018/09/16/jenkins/index.html",
    "revision": "4b9aa278fb566060f7ea0bcd0a0ee02f"
  },
  {
    "url": "post/2018/11/26/regexp/index.html",
    "revision": "6fd570cd29a547b96f6c08dc549900df"
  },
  {
    "url": "post/2018/12/29/vscode-plugin-recommend/index.html",
    "revision": "2260c862431be3a75bdd3d347ac18572"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "a9393ba6b978098a993b5c0d2b821546"
  },
  {
    "url": "tag/index.html",
    "revision": "570294fdf675891f7e00862bbacd54a5"
  },
  {
    "url": "tag/vue component/index.html",
    "revision": "56fcd3db3f238067df65455b9895b648"
  },
  {
    "url": "tag/vue/index.html",
    "revision": "08d5a79b2684d300f2b476d0bbc592d6"
  },
  {
    "url": "tag/web component/index.html",
    "revision": "7655f6885c0d1025713f646a7f071150"
  }
].concat(self.__precacheManifest || []);
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
