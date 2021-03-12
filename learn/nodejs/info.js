let info = {
    value: "info",
    obj: {
        name: "info",
        age: 1,
    },
    sayName: function(name){
        console.log(name)
    },
    changeVal: function(){
        this.value += "Test"
    },
    changeObj: function(){
        this.obj = {
            name: "infoTest",
            age: 100
        }
    },
    showData: function(){
        this.sayName('模块内部: ')
        console.log(this.value, this.obj)
    },
}
module.exports = info
setTimeout(function(){
    info.changeVal()
    info.changeObj()
    //infoTest { name: 'infoTest', age: 100 }
    info.showData()
}, 1000)