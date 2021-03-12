/* ----------- module模块-入口文件 -------------- */
//值类型的数据
let value = require('./info').value
let value1 = require('./info').value
console.log(value, value1, require('./info').value) //info info info
value = "index"
console.log(value, value1, require('./info').value) //index info info

//引用类型的数据
let obj = require('./info').obj
//{ name: 'info', age: 1 } { name: 'info', age: 1 } { name: 'info', age: 1 }
//console.log(obj, obj1, require('./info').obj) 
obj.name = "index"
let obj1 = require('./info').obj
//{ name: 'index', age: 1 } { name: 'index', age: 1 } { name: 'index', age: 1 }
console.log(obj, obj1, require('./info').obj)

//等模块内部更改后
setTimeout(function(){
    console.log("引入文件中：")
    //index info infoTest
    console.log(value, value1, require('./info').value)

    //{ name: 'index', age: 1 } { name: 'index', age: 1 } { name: 'infoTest', age: 100 }
    console.log(obj, obj1, require('./info').obj)
}, 2000)

