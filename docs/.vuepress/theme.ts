import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { defaultTheme } from '@vuepress/theme-default'

export default hopeTheme({
  
  hostname: "https://xenny.wiki",

  author: {
    name: "Xenny",
    url: "https://xenny.wiki",
  },
  pageInfo: ["Original","Author", "Date", "Word", "ReadingTime", "PageView", "Category", "Tag"],

  iconAssets: "fontawesome-with-brands",
  logo: "/logo.jpg",
  repo: "X3NNY/X3NNY.github.io",
  docsDir: "src",

  // pure: true,
  darkmode: "toggle",
  print: false,
  fullscreen: true,
  // 导航栏
  navbar,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Outlook", "Search"]
  },
  breadcrumb: false,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "",
  displayFooter: true,
  copyright: `2024 © Xenny All rights reserved. 
  著作权归 Xenny 所有`,

  // 博客相关
  blog: {
    description: "全栈/密码学/NSSCTF",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      BiliBili: "https://space.bilibili.com/187378036",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "mailto:info@example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/X3NNY",
      // Gitlab: "https://example.com",
      Gmail: "mailto:xennyxd1@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      Twitter: "https://x.com/xennyxd1",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
    },
  },

  // 加密配置
  encrypt: {
    config: {
    },
  },
  
  // 多语言配置
  metaLocales: {
    editLink: undefined,
  },
  editLink: false,

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    readingTime: {
      wordPerMinute: 240,
    },

    // 在启用之前需要安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务器，在生产环境中请自行部署并使用自己的服务器！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },
    comment: {
      provider: "Giscus",
      repo: "X3NNY/X3NNY.github.io",
      repoId: "R_kgDOLEEIXw",
      category: "Announcements",
      categoryId: "DIC_kwDOLEEIX84CcZQp"
    },
    copyCode: {},
    searchPro: true,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
  },
}, {custom: true});
