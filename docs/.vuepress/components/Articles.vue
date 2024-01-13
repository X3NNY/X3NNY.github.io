<template>
    <ul>
        <li v-for="v,key in data">
            <div style="font-weight: 700;font-size: 20px;">{{ key }}</div>
            <ul>
                <li v-for="article in v">
                    <div style="display: flex;align-items: center;width: 100%;">
                        <a :href="article.path">{{ article.title }}</a>
                        <div style="margin: 0 12px;flex-grow: 1; border-top: 1px rgb(191, 191, 191) dashed;"></div>
                        <div style="font-size: 15px;">{{ article.date || '' }}</div>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/client";

const props = defineProps({
    dir: {
        type: String,
        required: true
    }
})

const articles = useBlogType("article");
let data = {};
for (let article of articles.value.items) {
    if (article.path.startsWith(`/posts/${props.dir}/`)) {
        let paths: string[] = article.path.slice(`/posts/${props.dir}/`.length).split('/');
        if (paths[0].length > 0 && paths[0].indexOf('.html') == -1 && !(paths[0] in data)) {
            data[paths[0]] = []
        }
        let e = article.info.e || paths.at(-1)?.split('.')[0];
        e = e.match(/<h1>(.+)<\/h1>/)
        let title = '';
        if (e.length >= 2) {
            title = e[1].trim();
        }

        if (paths.at(-1)?.indexOf('.html') != -1) {
            if (paths[0].indexOf('.html') == -1) {
                data[paths[0]].push({
                    title: title,
                    path: article.path,
                    date: article.info.l || 0
                })
            }
        }
    }
}
</script>