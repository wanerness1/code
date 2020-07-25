//发布订阅模式
// on emit
//发布订阅模式下发布者和订阅者无明显关联

const event = {
    arr:[],
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach(fn => {
            fn()
        });
    }
}

event.on(()=>{console.log('123')})
event.emit()


