<template>
    <div class="ui-tags-wrapper">
        <span
            v-for="(tag, index) in tags"
            :key="index"
            class="ui-tags-item"
            :style="{ 'background-color': colorList[index] }"
        >
            {{ tag }}
        </span>
    </div>
</template>
<script>
export default {
    name: 'Tags',
    props: {
        tags: {
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            colorList: [
                '#0099CC',
                '#FF6666',
                '#FF6600',
                '#009999',
                '#CCCC44',
                '#CC3333',
                '#FF99CC',
                '#993399',
                '#666699',
                '#66CC66'
            ]
        }
    }
};
</script>
<style lang="stylus">
.ui-tags-wrapper
    display flex
    justify-content flex-start
    align-items center
    margin-top 10px
    
    span
        display inline-block
        padding 2px 5px
        margin-right 10px
        border-radius 2px
        background-color #ccc
        font-size 12px
        color #fff
</style>
