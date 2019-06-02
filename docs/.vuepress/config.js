module.exports = {
    theme: 'yubisaki',
    title: 'HOME',
    description: `lewis's blog`,
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }]
    ],
    port: 5000,
    base: '/blog/',
    repo: 'https://github.com/lewiscutey/blog/',
    ga: '',
    serviceWorker: true,
    evergreen: true,
    markdown: {
        anchor: { permalink: true },
        toc: { includeLevel: [1, 2] }
    },
    themeConfig: {
        background: `#fff`,
        github: 'lewiscutey',
        logo: '/img/logo.png',
        footer: '如果说人生是一场旅行，而我是这场旅行的主人!',
        perPagePosts: 10,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        comment: {
            clientID: '4779161d8d0e96d18948',
            clientSecret: '2a8c36f4b3eda7e692224be513730f94443085dd',
            repo: 'blog',
            owner: 'lewiscutey',
            admin: 'lewiscutey',
            distractionFreeMode: false
        },
        nav: [
            {text: 'Blog', link: '/'},
            {text: 'About', link: '/about/'},
            {text: 'Tags', link: '/tag/'},
            {text: 'CSDN', link: 'http://www.cnblogs.com/lewiscutey/'},
            {text: 'Github', link: 'https://github.com/lewiscutey'},
        ]
    },
}