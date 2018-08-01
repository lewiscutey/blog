module.exports = {
    title: 'blog', 
    description: `lewis's blog`,
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
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
        {text: 'Study', link: '/study/'},
        {text: 'CSDN', link: 'http://www.cnblogs.com/lewiscutey/'},
        {text: 'Github', link: 'https://github.com/lewiscutey'}
        ],
        sidebar: {
        '/problem/': [
            // ''空字符串代表主页，显示README.md中的内容
            '',
            ['201709', '201709'],
            ['201710', '201710'],
            ],
        '/study/': [
            '',
            ['axios', '1.axios'],
            ['document', '2.document'],
            ]
        },
        // 这是嵌套标题链接，自动显示当前激活（导航）页面标题的链接，即显示深度（h1-h6的深度）
        sidebarDepth: 1,
    }
}