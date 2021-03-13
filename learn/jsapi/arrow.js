console.log(this) //module中就是undefined，window中就是window或者global
//普通函数
function Foo(name, handler) {
  this.name = name;
  this.sayNme = handler;
}
let handler = function() {
  console.log("---------- normal function ----------");
  console.log(this);
  console.log(this.name);
};
let foo = new Foo("seven", handler);
foo.sayNme();

let arrHandler = () => {
  console.log("---------- arrow function ----------");
  console.log(this); //undefined
  console.log(this.name);
};


let foo1 = new Foo("seven", arrHandler);
try {
  foo1.sayNme();
} catch (error) {
  console.log(error);
}

console.log(foo, foo1);

/* 
    箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象；
    不能new
    不能用作generator函数
    不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
*/
