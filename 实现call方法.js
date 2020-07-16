

Function.prototype.myCall=function(context){
    context.fn=this
    //传参,ES5方案,字符串拼接
    let args=''
    for(var i =1;i<arguments.length;i++){
        args+='arguments['+i+'],'
    }
    const res=eval('context.fn('+args+')')
    delete context.fn
    return res
}


//测试代码
// var foo={
//     value:1
// }

// function bar(name){
//     console.log(this.value,name)
//     return name
// }

// const res=bar.myCall(foo,'waner')
// console.log(res)