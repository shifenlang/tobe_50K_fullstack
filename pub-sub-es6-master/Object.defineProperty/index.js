//数据源
let vm = {
    value: 0
}

//用于管理watcher的Dep对象
let Dep = function () {
    this.list = [];
    this.add = function(watcher){
        this.list.push(watcher)
    },
    this.notify = function(newValue){
        this.list.forEach(function (fn) {
            fn(newValue)
        })
    }
};

// 模拟compile,通过对Html的解析生成一系列订阅者（watcher）
function renderInput(newValue) {
    let el = document.getElementById('inp');
    if (el) {
        el.value = newValue
    }
}

function renderTitle(newValue) {
    let el = document.getElementById('h1');
    if (el) {
        el.innerHTML = newValue
    }
}

//将解析出来的watcher存入Dep中待用
let dep = new Dep();
dep.add(renderInput);
dep.add(renderTitle)

//核心方法
function initMVVM(vm) {
    Object.keys(vm).forEach(function (key) {
        observer(vm, key, vm[key])
    })
}

function observer(vm, key, value) {
    Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('Get');
            return value
        },
        set: function (newValue) {
            if (value !== newValue) {
                value = newValue
                console.log('Update')

                //将变动通知给相关的订阅者
                dep.notify(newValue)
            }
        }
    })
}

//页面引用的方法
function inputChange(ev) {
    let value = Number.parseInt(ev.target.value);
    vm.value = (Number.isNaN(value)) ? 0 : value;
}

function btnAdd() {
    vm.value = vm.value + 1;
}

//初始化数据源
initMVVM(vm)

//初始化页面
dep.notify(vm.value);