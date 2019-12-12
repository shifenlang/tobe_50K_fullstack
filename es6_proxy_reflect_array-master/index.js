//数据源
let vm = {
    list: [1, 2, 3, 4]
}

//处理后的代理数据源
let vmProxy;

//用于管理watcher的Dep对象
let Dep = function () {
    this.list = [];
    this.add = function (watcher) {
        this.list.push(watcher)
    };
    this.notify = function (newValue) {
        this.list.forEach(function (fn) {
            fn(newValue)
        })
    }
};

// 模拟compile,通过对Html的解析生成一系列订阅者（watcher）
function renderList() {
    let listContainer = document.querySelector('#list');
    let contentList = '';
    vm.list.forEach(function (item) {
        contentList = contentList + `<div><h3>${item}</h3></div>`
    })
    listContainer.innerHTML = contentList;
}

//将解析出来的watcher存入Dep中待用
//开始启动
let dep = new Dep();
dep.add(renderList)

//核心方法
// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
function initMVVM(vm) {
    vmProxy = new Proxy(vm.list, {
        set(target, prop, value) {
            console.log(
            `
            value: ${value}--
            target:${target}--
            prop:${prop}
            
            `);
            //Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为(简单的说 就是proxy代理器打招呼做什么，reflect反射器来完成执行)
           //Reflect.set(target, prop, value);
            target[prop] = value 
            dep.notify();
            // 通知页面来响应数据的变化
            return true;
        }
    })
}

//页面引用的方法
function btnAdd() {
    vmProxy.push(Math.random())
}
function btnDel() {
    vmProxy.pop()
}

//初始化数据源
initMVVM(vm)

//初始化页面
dep.notify();