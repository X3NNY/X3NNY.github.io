<script setup>
import ParentLayout from 'vuepress-theme-hope/layouts/Layout'
import { useRoute } from 'vue-router';

const route = useRoute();
let link = `https://xenny.wiki${route.path}`
</script>

<template>
<ParentLayout>
    <template #contentAfter>
        <div class="my-footer">
            <div class="author">
                Xenny
            </div>
            <div class="link">
                <a :href="link">{{ link }}</a>
            </div>
            <div class="copyright">
                本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议。转载请注明来自 <a href="https://xenny.wiki">Xenny 的博客</a>！
            </div>
        </div>
    </template>
</ParentLayout>
</template>

<style lang="scss">
.my-footer {
    max-width: var(--content-width, 740px);
    margin: 0 auto;
    font-size: 14px;
    padding: 10px 10px;
    border-radius: 8px;
    border: 1px #5291f3 solid;
    .author {
        &::before {
            content: "文章作者：";
            color: #5291f3;
            font-weight: 700;
        }
    }
    .link {
        &::before {
            content: "文章链接：";
            color: #5291f3;
            font-weight: 700;
        }
    }
    .copyright {
        &::before {
            content: "版权声明：";
            color: #5291f3;
            font-weight: 700;
        }
    }
}
.vp-page-nav {
    max-width: var(--content-width, 740px);
    margin: 0 auto;
}
#sidebar {
    display: none;
    width: 0px;
}
.vp-page {
    padding-inline: 0px !important;
}
</style>
