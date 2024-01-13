import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { copyrightPlugin } from "vuepress-plugin-copyright2";
import { comment } from "vuepress-theme-hope";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Xenny 的博客",
  description: "Xenny 的博客",

  theme,

  plugins: [
    copyrightPlugin({
      author: "Xenny",
      license: "CC BY-NC-SA 4.0 许可",
      triggerLength: 12,
      canonical: "https://xenny.wiki",
      global: true,
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
