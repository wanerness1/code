let Promise=require('./my-promise')

var p=new Promise((resolve,reject)=>{
    // setTimeout(()=>{resolve(1)},2000)
    // resolve(1)
    reject(1)
    
})

// p.then((res)=>{console.log(1,res)},(err)=>{console.log(err)})
// p.then((res)=>{console.log(2,res)},(err)=>{console.log(err)})

// var p2=p.then((res)=>new Promise((resolve,reject)=>{
//     setTimeout(()=>{resolve(100)},1000)
// }))

// p2.then(res=>{console.log('p2',res)})

// p.then().then().catch(res=>{console.log('err',res);
// })

// Promise.resolve(new Promise((res,rej)=>{
//     setTimeout(() => {
//         res(123)
//     }, 2000);
// })).then(res=>{console.log(res)})

Promise.reject('1').finally(()=>{
    //  throw new Error(2)
    return 2
}).then(res=>{console.log(res);
},err=>{console.log('err',err)})