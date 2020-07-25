//通用化柯里化方法
function currying(fn,arr=[]){ //arr记录传参个数
    const len=fn.length //获取fn参数个数
     
    return function(...args){
        let a =[...arr,...args]
        if(a.length<len){
            return currying(fn,a)
        }else{
            return fn(...a)
        }
    }

}

function sum(a,b,c){
    return a+b+c
}

const res=currying(sum)(1)(2)(3)

console.log(res);

console.log(sum(1,2,3));
