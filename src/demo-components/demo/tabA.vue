<template>
<div>
    <p>Title: {{ title }}</p>
    <form name="tab-a-form" action="http://www.baidu.com">
        <input type="text" name="username" v-model="username" />
        <input type="password" name="pwd" v-model="password" />
        <input ref="datepicker" type="text" name="date" v-model="date" />

        <!-- 不会提交 -->
        <!-- <input type="button" value="submit"/> -->

        <!-- 会提交 -->
        <!-- <input type="submit" value="submit" /> -->

        <!-- 会提交 -->
        <button @click.prevent>下一步</button>
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
            date: "",
        }
    },
    methods: {
        setDatePicker() {
            // this.$refs.datepicker //指向input 这个DOM元素
            this.picker = new Pikaday({
                field: this.$refs.datepicker,
                format: 'YYYY-MM-DD'
            })
        }
    },
    beforeCreate() {
        console.log("------- inner tab-A compment : before create ---------");
    },
    created() {
        console.log("------- inner tab-A compment : created ---------");
    },
    beforeMount() {
        console.log("------- inner tab-A compment : before mount ---------");
    },
    mounted() {
        console.log("------- inner tab-A compment : mounted ---------");
        this.setDatePicker()
    },
    beforeUpdate() {
        console.log("------- inner tab-A compment : before update ---------");
    },
    updated() {
        console.log("------- inner tab-A compment : updated ---------");
    },
    beforeDestroy() {
        console.log("------- inner tab-A compment : before unmount ---------");
        this.picker.destroy()
    },
    destroyed() {
        console.log("------- inner tab-A compment : unmounted ---------");
    },
    activated() {
        console.log("------- inner tab-A compment : activated ---------");
    },
    deactivated() {
        console.log("------- inner tab-A compment : deactivated ---------");
    },
}
</script>

<style lang="scss" scoped>

</style>
