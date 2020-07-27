//promise的超时取消

function cancelIfTimeout(promise,delay){
    const timeoutPromise=(delay)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{reject('timeout')},delay)
        })
    }
    return Promise.race([promise,timeoutPromise(delay)])
}

//test
var p = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(1)},8000)
})

cancelIfTimeout(p,3000).then(data=>{console.log('success',data);
},err=>{
    console.log('fail',err);
})

p.then(data=>{console.log('p1 success',data);
})