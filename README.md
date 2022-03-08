## get 请求
## post 请求
  - 处理请求头
  - 处理请求体
## 错误处理
  - 网络错误
  - 超时错误
    ```javascript
      request.timeout = timeout
      request.ontimeout = function () {}
    ```
  - 状态码错误

## 拦截器功能
  - 公共特性
    - 拦截器弹出功能：use方法返回一个索引 使用`enject`即可将对应的拦截器弹出
    - 支持返回`Promise`
  - 请求拦截器
    - 拦截器执行顺序是：倒序执行 就是先加的后执行
  - 响应拦截器
    - 拦截器执行顺序是：正序执行 就是先加的先执行

## 转换请求与响应

## 取消请求