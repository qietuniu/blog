[promise规范en](https://segmentfault.com/a/1190000002452115)
[promise规范zh](https://segmentfault.com/a/1190000002452115)

作用：解决回调地狱/多个请求并发问题

特点：

1. Promise是类
2. new Promise是需要传递一个执行器函数，executor默认会被立即执行
3. 三个状态：pending等待 fulfilled成功 rejected失败,默认等待
4. 每个Promise的实例都具备一个then方法，传递两个参数（成功cb，失败cb）
5. 失败reject() / 成功resolve()，throw new Error()报错就走失败
6. 多次调用只执行第一次
7. then多次链式调用
