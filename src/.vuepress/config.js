module.exports = {
    port: 8080,
    dest: 'docs',
    evergreen: true,
    title: '鹏展博',
    lang: 'zh-CN',
    serviceWorker: true,
    description: '热爱前端，热爱健身，热爱生活',
    head: [
        ['link', { rel: 'icon', href: '/g.gif' }],
        ['meta', { 'name': 'keywords', content: '鹏展博,前端，健身' }],
        ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'id=edg' }],
        // ['script', { src: 'https://xiongzhang.baidu.com/sdk/c.js?appid=1612960656404183' }]
    ],
    markdown: {
        lineNumbers: true
    },
    // theme: '@vuepress/blog',
    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Tags',
                link: '/tag/'
            }
        ],
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/volodymyr-lian'
                }
            ],
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: 'https://policies.google.com/privacy?hl=en-US'
                },
                {
                    text: '鹏展博',
                    link: ''
                }
            ]
        }
    },
    plugins: [,
        '@vuepress/plugin-nprogress',
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        [
            '@vuepress/pwa', 
            {
                serviceWorker: true,
                updatePopup: {
                    message: '发现新内容可用',
                    buttonText: '刷新'
                }
            }
        ],
        [
            '@vuepress/medium-zoom',
            {
                selector: 'img.zoom-custom-imgs',
                margin: 16,
                backgroundColor: 'rgba(0,0,0,.5)',
                options: {
                    margin: 16,
                    backgroundColor: 'rgba(0,0,0,.5)'
                }
            }
        ],
        [
            '@vuepress/blog',
            {
                directories: [{
                    id: 'post',
                    dirname: '_post',
                    path: '/',
                    itemPermalink: '/post/:year/:month/:day/:slug',
                    pagination: {
                        lengthPerPage: 10,
                        sorter: (prev, next) => {
                            const pt = prev.frontmatter;
                            const nt = next.frontmatter;
                            const prevTime = new Date(pt.date).getTime();
                            const nextTime = new Date(nt.date).getTime();
                            
                            return prevTime - nextTime > 0 ? -1 : 1
                        }
                    }
                }],
                frontmatters: [
                    {
                        id: 'tag',
                        keys: ['tag', 'tags'],
                        path: '/tag/',
                        frontmatter: { title: 'Tag' },
                        pagination: {
                            lengthPerPage: 5,
                        }
                    }
                ]
            }
        ]
    ]
};
