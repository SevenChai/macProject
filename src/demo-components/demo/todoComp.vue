<template>
<span :class="{ 'active': todoattr.options.needStudy }">
    <span>{{ todoattr.text }}</span>
</span>
</template>

<script>
export default {
    props: {
        todoattr: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            innerdata: "inner data"
        }
    },
    watch: {
        'todoattr.text': {
            handler: function (newVal, oldVal) {
                console.log('todo 的 watcher检测到数据更改了')
            },
            //deep: true
        },
        cuswatcher: {
            handler: function (newVal, oldVal) {
                console.log('--- inner todo compment : wather ---')
                console.log(this.innerdata) //可以获取到
            },
            immediate: true,
        },
    },
    beforeCreate() {
        console.log("------- inner todo compment : before create ---------");
        console.log(this.innerdata) //不能获取到
    },
    created() {
        console.log("------- inner todo compment : created ---------");
        console.log(this.innerdata)
    },
    beforeMount() {
        console.log("------- inner todo compment : before mount ---------");
    },
    mounted() {
        console.log("------- inner todo compment : mounted ---------");
    },
    beforeUpdate() {
        console.log("------- inner todo compment : before update ---------");
    },
    updated() {
        console.log("------- inner todo compment : updated ---------");
    },
    beforeDestroy() {
        console.log("------- inner todo compment : before unmount ---------");
    },
    destroyed() {
        console.log("------- inner todo compment : unmounted ---------");
    }

}
</script>

<style lang="scss" scoped>
/* ----------- todo component ------------- */
.active {
    font-size: 20px;
    font-weight: bold;
}
</style>
