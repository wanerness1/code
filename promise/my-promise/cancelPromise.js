//可取消的promise
function cancelablePromise(promise){
    let cancelFlag=false
    const wrappedPromise = new Promise((resolve,reject)=>{
        promise.then(
            data=>cancelFlag?reject('canceled'):resolve(data),
            err=>cancelFlag?reject('canceled'):reject(err)
        )
    })
    return {
        promise:wrappedPromise,
        cancel:function(){
            cancelFlag=true
        }
    }
}


//test
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(1)},3000)
})

const cancelableP=cancelablePromise(p)
cancelableP.promise.then(
    data=>{console.log('success',data)},
    err=>{console.log('fail',err)}
)
cancelableP.cancel()