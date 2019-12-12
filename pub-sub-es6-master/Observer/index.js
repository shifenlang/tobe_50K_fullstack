/**
 * 发布-订阅模式
 * 观察者模式
 * 
 * 
 * 发布者(发布，订阅，取消订阅)  announcer
 * 订阅者(function)     subscriber
 * 登记表{‘type’:[function,function,function]}   Registration form
 */

let publisher = {
    registration: {},
    subscribe: function (type, fn) {
        if (Object.keys(this.registration).indexOf(type) >= 0) {
            this.registration[type].push(fn);
        } else {
            this.registration[type] = [];
            this.registration[type].push(fn);
        }
    },
    unSubscribe: function (type, fnName) {
        if (Object.keys(this.registration).indexOf(type) >= 0) {
            let index = -1;
            this.registration[type].forEach(function (func, idx) {
                if (func.name === fnName) {
                    index = idx;
                }
            })
            index > -1 ? this.registration[type].splice(index, 1) : null
        }
    },
    publish: function (type, message) {
        if (Object.keys(this.registration).indexOf(type) >= 0) {
            for (let fn of this.registration[type]) {
                fn(message)
            }
        }
    }
}

let subscriberA = function (message) {
    console.log(`A收到通知：${message}`)
};

let subscriberB = function (message) {
    console.log(`B收到通知：${message}`)
};

let subscriberC = function (message) {
    console.log(`C收到通知：${message}`)
};

publisher.subscribe('game', subscriberA);
publisher.subscribe('game', subscriberB);
publisher.subscribe('game', subscriberC);
publisher.unSubscribe('game', subscriberB.name)
publisher.publish('game', '恭喜RNG获得LOL 2018季中赛冠军！')