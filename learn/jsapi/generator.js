function * caculate(num){
    yield num+1
    yield num+2
    return num+100
}
let itors = caculate(0)
let anext; 
do{
    anext = itors.next()
    console.log(anext)
}while(!anext.done)
//{value: 1, done: false } 
//{value: 2, done: false } 
//{value: 100, done: true } 


//v8会忽略第一个next所带的参数，第一个参数应该放在caculate2()中
function * caculate2(num){
    let y1 = yield num+1
    let y2 = yield num+2
    return num+100
}
let itors2 = caculate2(10)
console.log(itors2.next(50)) 
console.log(itors2.next(50))
console.log(itors2.next(50))

