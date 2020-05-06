var curry = (fn, ...args) =>
    args.length < fn.length
        //参数长度不足时，重新柯里化该函数，等待接受新参数        
        ? (...arguments) => curry(fn, ...args, ...arguments)
        //参数长度满足时，执行函数
        : fn(...args);
