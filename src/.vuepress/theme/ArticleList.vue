<template>
    <div class="articleList-wrapper">
        <ul>
            <li v-for="page in pages">
                <h4><router-link :to="page.path">{{page.title}}</router-link></h4>
                <section v-html="page.excerpt"></section>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['sidebarItems'],
    computed: {
        pages() {
            return parsePage(this.sidebarItems || []);
        }
    }
};

function parsePage(pages) {
    let res = [];
    pages.forEach(page => {
        if (page.type === 'group') {
            res.push(...page.children || []);
        } else {
            res.push(page);
        }
    });
    return res;
}

</script>
<style lang="stylus">
@import './styles/config.styl'
.articleList-wrapper
    ul
        list-style none 
        li
            padding-bottom .5rem
            border-bottom solid $borderColor 1px
</style>

