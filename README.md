# ChromeExtension
[ChromeExtension Doc](https://developer.chrome.com/docs/extensions/reference/)





### 踩过的坑啊

1. chrome.notifications.create,Chrome 只会为传递的特定名称/ID 显示一次通知,作为一种解决方法，我在名称后面加上当前的 DateTime 以使其唯一。设置为空字符也可以生效


