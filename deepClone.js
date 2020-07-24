function deepClone(target,result){
    result=result||(Object.prototype.toString.call(target)==='[object Object]'?{}:[])
    for(let i in target){
        if(target.hasOwnProperty(i)){
            if(typeof target[i]==='object'){
                result[i]=deepClone(target[i])
            }else{
                result[i]=target[i]
            }
        }
    }
    return result
}

//test

// var a = {name:{test:1}}
// var b = deepClone(a,{age:2})
// console.log(b)

// b.name.test=10
// console.log(a,b)
