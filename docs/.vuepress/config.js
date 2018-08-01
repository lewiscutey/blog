module.exports = {
    title: 'blog', 
    description: `lewis's blog`,
    head: [
        ['link', { rel: 'apple-touch-icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    base: '/blog/',
    dest: './docs/.vuepress/dist',
    themeConfig: {
    // 导航配置
        nav: [
        // text为导航栏显示文字，link为路径，即文件夹名字，注意不要丢了名字前后的'/'
        {text: 'Home', link: '/'},
        {text: 'About', link: '/about/'},
        {
            text: 'Study', 
            items: [
                { text: 'JavaScript', link: '/javascript/' },
                { text: 'H5', link: '/h5/' },
                { text: 'CSS', link: '/css/' }
            ]
        },
        {text: 'CSDN', link: 'http://www.cnblogs.com/lewiscutey/'},
        {text: 'Github', link: 'https://github.com/lewiscutey'}
        ],
        sidebar: {
            '/javascript/': [
                '',
                ['201709', '201709'],
                ['201710', '201710'],
            ],
            '/h5/': [
                '',
                ['axios', '1.axios'],
                ['document', '2.document'],
            ],
            '/css/': [
                '',
                ['axios', '1.axios'],
                ['document', '2.document'],
            ]
        },
        sidebarDepth: 2,
    }
}