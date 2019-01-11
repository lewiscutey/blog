module.exports = {
    theme: 'yubisaki',
    title: 'HOME', 
    description: `lewis's blog`,
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    base: '/blog/',
    repo: 'https://github.com/lewiscutey/blog',
    dest: './docs/.vuepress/dist',
    ga: '',
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
        background: `#fff`,
        github: 'lewiscutey',
        logo: '/img/logo.png',
        footer: '如果说人生是一场旅行，而我是这场旅行的主人!',
        accentColor: '#ac3e40',
        per_page: 6,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        tags: true,
        comment: {
            clientID: '4779161d8d0e96d18948',
            clientSecret: '2a8c36f4b3eda7e692224be513730f94443085dd',
            repo: 'blog',
            owner: 'lewiscutey',
            admin: 'lewiscutey',
            distractionFreeMode: false
        },
        nav: [
            {text: 'Blog', link: '/blog/', root: true},
            {text: 'About', link: '/about/'},
            {text: 'Tags', link: '/tags/', tags: true},
            {text: 'CSDN', link: 'http://www.cnblogs.com/lewiscutey/'},
            {text: 'Github', link: 'https://github.com/lewiscutey'},
        ]
    },
    markdown: {
        anchor: {
            permalink: true
        },
        toc: {
            includeLevel: [1, 2]
        },
        config: md => {
            // 使用更多 markdown-it 插件！
            md.use(require('markdown-it-task-lists'))
            .use(require('markdown-it-imsize'), { autofill: true })
        }
    },
    postcss: {
        plugins: [require('autoprefixer')]
    },
}