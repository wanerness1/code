console.log('mypromise');

const PENDING = 'PENDING' //等待
const RESOLVED = 'RESOLVED' //成功
const REJECTED = 'REJECTED' //失败

const resolvePromise = (promise2, x, resolve, reject) => {
    //错误，自己等待自己，循环引用
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }

    //判断x是普通值还是对象或函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {//有可能是一个promise
        try {
            let then = x.then
            
            if (typeof then === 'function') {//认为x为thenable对象或者promise，展开
                //注意这里不要直接用x.then(),因为这样会两次get x的then方法，可能在不同的库之间会有兼容问题 
                
                then.call(x, y => {
                    //递归处理resolve的promise
                    resolvePromise(promise2, y, resolve, reject)
                }, e => { 
                    reject(e) 
                })
            } else {//说明x为普通对象,则直接决议
                resolve(x)
            }
        } catch (error) {
            //取值出错，直接reject
            reject(error)
        }

    } else {
        //普通值，直接决议
        resolve(x)
    }

}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        //发布-订阅模式处理状态改变时的通知
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            //当值为Promise时，进行递归
            if(value instanceof Promise){
              return value.then(resolve,reject)
            }
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                //发布
                this.onResolvedCallbacks.forEach(fn => fn())
            }

        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED

                this.onRejectedCallbacks.forEach(fn => fn())
            }

        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(onFulfilled, onRejected) {
        //处理onFulfilled, onRejected默认值
        onFulfilled=typeof onFulfilled ==='function'?onFulfilled:data=>data
        onRejected=typeof onRejected ==='function'?onRejected:err=>{throw err}
        const promise2 = new Promise((resolve, reject) => { //链式 
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    //根据返回值决定promise2的决议，加入定时器是为了执行时promise2已赋值
                    try {//加了定时器后，外部try catch无法捕获异常，在内部捕获
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                }, 0)

            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.status === PENDING) {//当状态为pending时，加入到回调数组里，订阅
                this.onResolvedCallbacks.push(() => { //切片
                    setTimeout(() => {
                        try {
                            //根据返回值决定promise2的决议，加入定时器是为了执行时promise2已赋值
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })

                this.onRejectedCallbacks.push(() => { //切片
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }

        })

        return promise2

    }

    catch(errCallback){
        return this.then(null,errCallback)
    }

    finally(callback){
        return this.then(value=>{
            return Promise.resolve(callback()).then(()=>value)
        },err=>{
            return Promise.resolve(callback()).then(()=>{throw err})
        })
    }

    //静态方法：Promise.resolve()和Promise.reject()
    static resolve(data){
        return new Promise((resolve,reject)=>{
            resolve((data))
        })
    }

    static reject(err){
        return new Promise((resolve,reject)=>{
            reject((err))
        })
    }
}

module.exports = Promise