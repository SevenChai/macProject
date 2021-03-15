<template>
<div>
    <p>{{ title　}}</p>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: ()=>{}
        },
    },
    watch: {
        data(newValue, oldValue) {
            this.title = newValue.title || ""
            this.listData = newValue.data || []
        }
    },
    data() {
        return {
            title: "",
            listData: []
        }
    },
    created() {
        console.log('---------- inner market-list created ----------');
    },
    mounted() {
        console.log('---------- inner market-list mounted ----------');
    },
    beforeDestroy() {
        console.log('---------- inner market-list beforeDestroy ----------');
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>

</style>
