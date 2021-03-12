//Object.freeze(): 冻结对象，不允许修改或者添加任何属性，使对象只能是只读的，返回传入的相同对象。
let obj = {
  name: "seven",
  age: 1,
  sayName: function() {
    console.log(this.name);
  }
};

// 修改一个属性
Object.freeze(obj)

obj.name = "newText" //修改
obj['newPro'] = 'newPro' //增加
delete obj.name //删除
console.log(obj) //调用freeze后就不允许对obj进行任何修改了
