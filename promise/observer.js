//观察者模式
//观察者模式中，观察者和被观察者有关联，观察者要放到被观察者中，被观察者状态变化时要通知观察者 
//内部是基于发布-订阅实现
//被观察者需要实现attach方法（添加观察者），观察者需要实现update方法（供被观察者在状态改变时调用，对被观察者状态变化进行处理）

class Subject {//被观察者
    constructor(name){
        this.name=name
        this.observers=[] //维护观察者数组
        this.state='既生又死'
    }
    attach (observer){ //添加观察者
        this.observers.push(observer)
    }

    setState (newState){
        this.state=newState
        this.observers.forEach(o=>{o.update(this)})
    }
}

class Observer { //观察者
    constructor(name){
        this.name=name
    }
    update(subject){ //对被观察者的变化的处理函数
        console.log('状态变化:',subject.state)
    }
}

const cat=new Subject('薛定谔的猫')
const observer1=new Observer('爱因斯坦')
const observer2=new Observer('玻尔')

cat.attach(observer1)
cat.attach(observer2)

cat.setState('死了')