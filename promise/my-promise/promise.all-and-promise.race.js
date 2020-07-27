function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      const res = [];
      let i = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          data => {
            i++;
            res[index] = data;
            if (res.length === promises.length) {
              resolve(res);
            }
          },
          err => {
            console.log("failed");
            reject(err);
          }
        );
      });
    });
  }


  //test
  var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

  var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
      // reject(2);
    }, 2000);
  });

//   promiseAll([
//     p1,
//     p2
//   ]).then(
//     res => {
//       console.log(res);
//     },
//     err => {
//       console.log("err", err);
//     }
//   );



function promiseRace(promises){
  return new Promise((resolve,reject)=>{
    promises.forEach(promise=>{
      Promise.resolve(promise).then(data=>{
         resolve(data)
        }
      ,
      err=>{
          reject(err)
        })
      })
    })
}

//test
promiseRace([p1,p2]).then(
  data=>{console.log('success',data)},
  err=>{console.log('fail',err)}
)

p2.then(data=>{console.log('p2',data)})