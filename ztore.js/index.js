//创建 ztore 对象
let ztore = new createZtore();

//数据对象的订阅者
let subscribe = (prv, current) => {
    document.getElementById('show').innerHTML = (`<h1>${current}</h1>`);
}

//存储数据对象到ztore并绑定订阅者
ztore.add('Text', '', subscribe);

let show = (value) => {
    ztore.update('Text', value.trim())
}