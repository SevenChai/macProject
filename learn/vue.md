# Vue
    ## 定义组件
        ### 全局 Vue.component
            参数：(组件名: string, 组件配置: object)
                js中: 
                ```
                    Vue.component('todoComp', {
                        props: ['todoattr'], //一律小写
                        template: '<li>{{ todoattr.text }}</li>',
                    })
                ```    
                html中：
                ```
                    <todo-comp :todoAttr="todo"></todo-comp>
                ```
            注意事项: 
                需要在new Vue()之前加载完成。
        ### 局部
            import component
            放在components中
    ## <keep-alive>
        缓存组件，第一次展示组件时经过create, mount阶段，但是第二次显示出来时则只会update
        显示隐藏会触发active和deactive的生命周期 
    ## 指令
        v-show: 无论显示还是隐藏，不会引发子组件的任何生命周期，只会引发父组件update生命周期
        v-if: 
            显示时会引发父组件的update生命周期，引发子组件的create,mount生命周期, 
            隐藏时会引发父组件的update生命周期
    ## data更改
        vm.$data 可以增加，删除，更改属性值，但是直接通过vm.$data['prop'] = "newProp"会出项错误，并且不会被直接渲染到DOM中。 
    ## ref: 访问子组件实例或者子元素
                    

    