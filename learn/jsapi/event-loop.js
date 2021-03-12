// function stack1(){
//     console.log('调用栈同步任务1');
// }
// function stack2(){
//     console.log('调用栈同步任务2');
// }
// stack1()
// stack2()

// let p1 = new Promise((resolve, reject)=>{
//     console.log('同步任务3');
//     resolve()
//     setTimeout(()=>{
//         console.log('宏任务1');
//     }, 0)
//     console.log('同步任务4');
// })

// setTimeout(()=>{
//     console.log('宏任务2')
// }, 0)

// p1.then(()=>{
//     console.log('微观任务1')
// })

console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

new Promise((resolve, reject) => {
  //resolve中的才是微观任务，4是属于同步任务了
  console.log(4);
  resolve(5);
}).then(data => {
  console.log(data);
});

setTimeout(() => {
  console.log(6);
  new Promise((resolve, reject) => {
    resolve(8);
  }).then(data => {
    console.log(data);
  });
  console.log(7);
});
setTimeout(() => {
  console.log(9);
});

console.log(7);
//1, 4, 7, 5, 2, 3, 6, 7, 8, 9
