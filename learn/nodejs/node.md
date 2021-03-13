# Node API
    ##  模块 module
        用法：require/exports
        特点：运行时动态加载，同步读取，require/exports 输出的是一个值的拷贝，若文件引用的模块值改变，require 引入的模块值不会改变
        ### 导出 module.exports <Object>
            导出一个对象 ./info.js
             module.exports = { name: 'seven' }
        ### 引入 require() <Function>
            用于引入模块,JSON,本地文件
        ```
        //引入node_modules模块或Node.js内置模块
        const path = require("path") 

        //路径会根据__dirname定义的目录名或当前目录进行处理
        const info = require("./info")
        
        ```

