<template>
<p>{{ text }}</p>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '--'
        },
    },
    beforeCreate() {
        console.log("------- inner panel compment : before create ---------");
    },
    created() {
        console.log("------- inner panel compment : created ---------");
    },
    beforeMount() {
        console.log("------- inner panel compment : before mount ---------");
    },
    mounted() {
        console.log("------- inner panel compment : mounted ---------");
    },
    beforeUpdate() {
        console.log("------- inner panel compment : before update ---------");
    },
    updated() {
        console.log("------- inner panel compment : updated ---------");
    },
    beforeDestroy() {
        console.log("------- inner panel compment : before unmount ---------");
    },
    destroyed() {
        console.log("------- inner panel compment : unmounted ---------");
    }
}
</script>

<style lang="scss" scoped>

</style>
