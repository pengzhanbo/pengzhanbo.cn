module.exports = {
    port: 8080,
    dest: 'docs',
    evergreen: true,
    title: '鹏展博',
    lang: 'zh-CN',
    serviceWorker: true,
    description: '热爱前端，热爱健身，热爱生活',
    head: [
        ['link', {rel: 'icon', href: '/g.gif'}],
        ['meta', {'name': 'keywords', content: '鹏展博,前端，健身'}],
        ['meta', {'http-equiv': 'X-UA-Compatible', content: 'id=edg'}],
        ['script', {src: 'https://xiongzhang.baidu.com/sdk/c.js?appid=1612960656404183'}]
    ],
    themeConfig: {
        logo: '/g.gif',
        sidebar: [
            '/WebComponent/template',
            '/WebComponent/HTMLImport',
            '/WebComponent/shadowDOM',
            '/WebComponent/customElements',
            '/Jenkins',
            '/vue组件间数据通信',
            '/前端的思考与杂谈',
            '/面试题以及个人答案CSS篇',
            '/面试题以及个人答案JS篇'
        ],
        displayAllHeaders: true,
        lastUpdated: 'Last Updated',
        prev: '',
        next: '',
        serviceWorker: {
            updatePopup: true
        }
    },
    markdown: {
        lineNumbers: true
    }
};
