<template>
<div>
    <input v-model="username" name="username" />
    <p>{{ `这是一个data需要被删除的属性： ${ needDelPro || '不存在了' }` }}</p>
    <!-- <p>{{ `这是一个data新添加的数据属性： ${ newPro || '还不存在' }` }}</p>   -->
    <div class="panel-body">
        <div>
            <button @click="isShowTab='a'">tabA</button>
            <button @click="isShowTab='b'">tabB</button>
        </div>
        <div>
            <button v-if="isShowTab=='a'" @click="aTitle='new-a-title'">change A-title</button>
            <button v-else @click="bTitle='new-b-title'">change B-title</button>
        </div>
        <keep-alive>
            <tab-a v-if="isShowTab=='a'" :title="aTitle"></tab-a>
            <tab-b v-else :title="bTitle"></tab-b>
        </keep-alive>
        <!-- <tab-a v-show="isShowTab=='a'"></tab-a>
            <tab-b v-show="isShowTab=='b'"></tab-b> -->
    </div>
    <div class="panel-body">
        <div>
            <button @click="addTodo">add a todo</button>
            <button @click="changeTodo">change a todo</button>
        </div>

        <div v-for="todo in todos" :key="todo.id">
            <!-- <button @click="todo.options.needStudy=!todo.options.needStudy">toggle active</button> -->
            --
            <todo-copm :todoattr="todo"></todo-copm>
        </div>
    </div>

    <div class="panel-body">
        <button @click="isShow=!isShow">toggle panel</button>
        <div class="show-panel">
            <!-- v-show: 无论显示还是隐藏，不会引发子组件的任何生命周期，只会引发父组件update生命周期 -->
            <div v-if="isShow" class="panel-comp">
                <panel :text="message"></panel>
            </div>

            <!-- v-if: 
            显示时会引发父组件的update生命周期，引发子组件的create,mount生命周期, 
            隐藏时会引发父组件的update生命周期
            -->
            <!-- <panel v-if="isShow" :text="message"></panel> -->
        </div>
    </div>

    <div>
        <p>防抖</p>
        <input v-model="question" name="question">
        <p>{{ answer }}</p>
    </div>
</div>
</template>

<script>
import panel from '@/components/demo/panel.vue'
import todoCopm from '@/components/demo/todoComp.vue'
import tabA from '@/components/demo/tabA.vue'
import tabB from '@/components/demo/tabB.vue'
export default {
    components: {
        panel,
        todoCopm,
        tabA,
        tabB
    },
    data() {
        return {
            message: "parent data!",
            username: "username",
            todos: [{
                    id: 1,
                    text: "学习 JavaScript",
                    options: {
                        needStudy: true,
                    }
                },
                {
                    id: 2,
                    text: "学习 Vue",
                    options: {
                        needStudy: true,
                    }
                },
                {
                    id: 3,
                    text: "整个牛项目",
                    options: {
                        needStudy: false,
                    }
                }
            ],
            isShow: true,
            needDelPro: "需要删除的属性",
            answer: "",
            question: "",
            isShowTab: "a",
            aTitle: "aaa",
            bTitle: "bbb",
        }
    },
    methods: {
        addTodo() {
            this.todos.push({
                id: new Date().getTime(),
                text: "new todo thing",
                options: {
                    needStudy: false,
                }
            });
        },
        changeTodo() {
            let index = parseInt(Math.random() * this.todos.length)
            this.todos[index].text = new Date().getTime()
            //this.todos[index].options.needStudy = !this.todos[index].options.needStudy
        }
    },
    beforeCreate() {
        console.log("------- before create ---------");
    },
    created() {
        console.log("------- created ---------");
    },
    beforeMount() {
        console.log("------- before mount ---------");
    },
    mounted() {
        console.log("------- mounted ---------");
    },
    beforeUpdate() {
        console.log("------- before update ---------");
    },
    updated() {
        console.log("------- updated ---------");
    },
    beforeUnmount() {
        console.log("------- before unmount ---------");
    },
    unmounted() {
        console.log("------- unmounted ---------");
    }
};
</script>

<style lang="scss" scoped>
</style>
