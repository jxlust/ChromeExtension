# ChromeExtension

[ChromeExtension Doc](https://developer.chrome.com/docs/extensions/reference/)

1. 配置 manifest.json
2. 弹框 UI 文件 popup.html 和 html 导入资源文件，css 样式和 js 文件
3. 编写 background，service_worker 后台服务逻辑
4. 也可以跟 popup 通信

```json
{ "background": { "service_worker": "/js/background.js" } }
```


### 踩过的坑啊

1. chrome.notifications.create,Chrome 只会为传递的特定名称/ID 显示一次通知,作为一种解决方法，我在名称后面加上当前的 DateTime 以使其唯一。设置为空字符也可以生效
