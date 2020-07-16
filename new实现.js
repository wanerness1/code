function myNew(fn){
    let res={}
    res.__proto__=fn.prototype
    const args=Array.prototype.slice.call(arguments,1)
    const fnRes=fn.apply(res,args)
    return typeof fnRes==='object'?fnRes:res
}


// 测试代码
function foo(a){
    this.age=a
    // return {sex:9}
}

foo.prototype={name:1}

var f=myNew(foo,'10')
console.log(f)
console.log(f.age)
console.log(f.name)