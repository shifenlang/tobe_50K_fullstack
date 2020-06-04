Function.prototype.bind  = function () {
 let self = this
  // 获取bind第一个参数，即需要绑定的对象。
 context = [].shift.call(arguments)
 // 获取bind剩余的参数，并转换为数组
 args = [].slice.call(arguments)
 // 返回一个函数，当执行的时候，执行self.apply
 return function () {
     // arguments 是执行返回的函数时，传入的参数。
     return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
 }
}
