<template>
<div>
    <p>Title: {{ title }}</p>
    <form name="tab-a-form" action="http://www.baidu.com">
        <input type="text" name="username"  v-model="username"/>
        <input type="password" name="pwd" v-model="password"/>

        <!-- 不会提交 -->
        <!-- <input type="button" value="submit"/> -->

        <!-- 会提交 -->
        <!-- <input type="submit" value="submit" /> -->

        <!-- 会提交 -->
        <button @click.prevent>提交</button>
    </form>
    <div>
        <p>{{ `您输入的数据是：`+ username  }}</p>
        <p>{{ `您输入的数据是：`+ password  }}</p>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            username: "",
            password: "",
        }
    },
    beforeCreate() {
        console.log("------- inner tab-B compment : before create ---------");
    },
    created() {
        console.log("------- inner tab-B compment : created ---------");
    },
    beforeMount() {
        console.log("------- inner tab-B compment : before mount ---------");
    },
    mounted() {
        console.log("------- inner tab-B compment : mounted ---------");
    },
    beforeUpdate() {
        console.log("------- inner tab-B compment : before update ---------");
    },
    updated() {
        console.log("------- inner tab-B compment : updated ---------");
    },
    beforeDestroy() {
        console.log("------- inner tab-B compment : before unmount ---------");
    },
    destroyed() {
        console.log("------- inner tab-B compment : unmounted ---------");
    },
    activated() {
        console.log("------- inner tab-B compment : activated ---------");
    },
    deactivated() {
        console.log("------- inner tab-B compment : deactivated ---------");
    },
}
</script>

<style lang="scss" scoped>

</style>
