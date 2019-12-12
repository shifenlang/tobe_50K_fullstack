# es6_proxy_reflect_array
用proxy实现响应式array,并映射到视图中


上面代码中，每一个Proxy对象的拦截操作（get、delete、has），内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。
http://es6.ruanyifeng.com/#docs/reflect

Reflect.set(target, prop, value); target[prop] = value 
这两种写法是一样的效果