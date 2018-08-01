module.exports = {
    title: 'blog', 
    description: `lewis's blog`,
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }]
    ],
    base: '/blog/',
    repo: 'https://github.com/lewiscutey/blog',
    dest: './docs/.vuepress/dist',
    serviceWorker: true,
    theme: 'yubisaki',
    themeConfig: {
        nav: [
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
        sidebar: 'auto',
        sidebarDepth: 2,
    },
    markdown: {
        anchor: {
            permalink: false,
            permalinkBefore: true,
            permalinkSymbol: '#'
        },
        toc: {
            includeLevel: [1, 2]
        },
        config: md => {
            // 使用更多 markdown-it 插件！
            // md.use(require('markdown-it-xxx'))
        }
    },
    postcss: {
        plugins: [require('autoprefixer')]
    },
    evergreen: true
}

