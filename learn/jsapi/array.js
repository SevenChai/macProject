//声明一个Array
//当只有一个参数表示length，多个参数则是数组各项
let a1 = new Array(); //[]
let a11 = new Array(10); //[empty*10]
let a12 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //[1...10]
let a2 = []; //[]
//of(n1)：== [n1]
let a3 = Array.of(1); //[1]
let a4 = new Array(10).fill(1); //[1..1]
console.log(a1, a11, a12, a2, a3, a4); // [] [empty*10] [1...10] [] [1] [1..1]
console.log("------------------");

//使用typeof 无法判断array和object
console.log(typeof a12); //object
//判断是否是array
function isArray(arr = null, type = "") {
  let res = false;
  switch (type) {
    case "es6":
      res = Array.isArray(arr);
      break;
    case "constructor":
      res = arr.constructor == Array;
      break;
    case "instance":
      res = arr instanceof Array;
      break;
  }
  return res;
}
let res = isArray(a12, "instance");
let res1 = isArray({ name: "seven" }, "instance");
console.log(res, res1); //true, false

function printArr(str = "", arr = null) {
  console.log(str + ":", arr);
  console.log("-----------------");
}
//array常用方法
let testarr = ["X", "X", "X"];
printArr("Array原始数据", testarr);

//新增
//末尾添加
testarr.push("push新增数据1", "push新增数据2", "push新增数据3");
//首部添加
testarr.unshift("unshift新增数据1", "unshift新增数据2", "unshift新增数据3");
//任意位置添加
testarr.splice(4, 0, "splice新增数据1", "splice新增数据2", "splice新增数据3");
/*
0: "unshift新增数据1"
1: "unshift新增数据2"
2: "unshift新增数据3"
3: "X"
4: "splice新增数据1"
5: "splice新增数据2"
6: "splice新增数据3"
7: "X"
8: "X"
9: "push新增数据1"
10: "push新增数据2"
11: "push新增数据3"
*/
printArr("Array修改后的数据", testarr);

//删除
//末尾删除
testarr.pop();
//首项删除
testarr.shift();
//任意位置删除
//testarr.slice(6, 7) slice并不会改变原数组，只是会返回一个删除后的新数组
testarr.splice(6, 1); //(index, howmanynum)
testarr.splice(-3, 1); //从倒数第三位置开始删除
/*
0: "unshift新增数据2"
1: "unshift新增数据3"
2: "X"
3: "splice新增数据1"
4: "splice新增数据2"
5: "splice新增数据3"
6: "push新增数据1"
7: "push新增数据2"
*/
printArr("Array修改后的数据", testarr);
//修改
testarr[2] = "新X";
printArr("Array修改后的数据", testarr);
//颠倒
testarr.reverse();
printArr("Array颠倒后的数据", testarr);

let testarr1 = [
  {
    name: "seven",
    age: 1
  },
  {
    name: "pc",
    age: 2
  },
  {
    name: "seven",
    age: 3
  }
];

printArr("Array原始的数据", testarr1);
//查询
let findItm = testarr1.find(itm => itm.name == "seven");
let findIndex = testarr1.findIndex(itm => itm.age > 10);
//找到第一个符合条件的，没有则返回undefined/-1
console.log("查询Array中第一个符合的数据find: ", findItm);
console.log("查询Array中第一个符合的索引值findIndex: ", findIndex);
//判断是否包含，不适合判断对象数组
//indexOf无法判断NAN的项，includes可以判断
console.log(
  "判断Array中是否包含: ",
  testarr1.includes({ name: "seven", age: 1 })
); //false
let newarr = testarr1.filter(itm => itm.age > 1);
printArr("查询age>1的项", newarr);
//entries()，keys()和values()
for (let ent of testarr1.entries()) {
  console.log(ent); //[0, {}] [1, {}], [2, {}]
}
for (let ent of testarr1.keys()) {
  console.log(ent); //0 1 2
}
for (let ent of testarr1.values()) {
  console.log(ent); // {} {} {}
}
//排序

//数组去重
let oriArr = [
  2,
  2,
  "2",
  NaN,
  NaN,
  "NaN",
  "test",
  "test",
  null,
  null,
  "null",
  undefined,
  undefined,
  "undefined",
  {
    name: "seven",
    age: 1
  },
  {
    name: "seven",
    age: 1
  },
  {
    name: "pc",
    age: 1
  },
  {},
  {},
];
printArr("去重----Array原始的数据", oriArr);
let uniArr = [],
  uniArr1 = [],
  uniArr2 = [],
  uniArr3 = [];

//indexOf+循环: 对象没有去重，indexOf(NAN)=-1，直接忽略掉了
uniArr1 = oriArr.filter((itm, index, arr) => {
  //console.log(itm, arr.indexOf(itm, 0))
  return arr.indexOf(itm, 0) == index;
});
printArr("去重后的数据：", uniArr1); // [2, "2", "NAN", "test", null, "null", undefined, "undefined", {…}, {…}, {…}]

//includes+循环: 对象没有去重
oriArr.forEach(itm => {
  if (!uniArr.includes(itm)) {
    uniArr.push(itm);
  }
});
printArr("去重后的数据：", uniArr); //[2, "2", NaN, "NAN", "test", null, "null", undefined, "undefined", {},{},{}]

//includes+reduce: 对象没有去重
uniArr2 = oriArr.reduce((prev, itm, index) => (prev.includes(itm) ? [...prev] : [...prev, itm]), []);
printArr("去重后的数据：", uniArr2);

/*
function loop(type){
    switch(type){
        case "type1": //匹配到该项则中断
        console.log('type1')
        break;
        case "type2":
        console.log('type2')
        break;
        default: //什么都没匹配到后执行该项
        console.log('default')
    }
}
loop()
*/
