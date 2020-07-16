Function.prototype.myBind=function(contxt){
    console.log(Object.prototype.toString.call(arguments))
    // console.log(isArray(arguments))
    let outerArgs=Array.prototype.slice.call(arguments,1)
    const self=this
    return function(){
        let innerArgs=Array.prototype.slice.call(arguments)
        let args=outerArgs.concat(innerArgs)
        return self.apply(contxt,args)
    }
}



var obj={value:0}
function foo(a,b){
    console.log(this.value,a,b)
    return 100
}

var bar=foo.myBind(obj,1)
const res=bar(9)
console.log(res)