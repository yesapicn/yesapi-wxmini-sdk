# YesApi小白接口 - 微信小程序JS SDK

## 接口和后台

+ 查看[小白接口大全](http://api.yesapi.cn/docs.php)  
+ 进入[我的微信小程序管理后台](http://open.yesapi.cn/wxmini/)

## 下载
将当前项目里面的YesApi目录，下载到你的微信小程序项目中，放到utils目录内。

![](http://cdn7.okayapi.com/yesyesapi_20200319154349_9b2e2fb4f045da6efd33e32b244bb844.png)

## 配置
进入[小白开放平台-个人中心](http://open.yesapi.cn/?r=App/Mine)，查看你自己的接口域名、```app_key```、```app_secrect```。  
![](http://cdn7.okayapi.com/yesyesapi_20200319154611_81817001ebef0ca0db0d4764bf47c447.png)  

然后，复制以下配置，并修改成你的配置，保存到你微信小程序项目根目录下的```./app.js```配置文件中。  

```
//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    uuid: null,
    token: null,
    yesapi: { // 小白开放平台配置，查看：http://open.yesapi.cn/?r=App/Mine
      api_host: '换成你的', // 接口域名
      app_key: '换成你的', // app_key
      app_secrect: '换成你的' // app_secrect
    }
  }
})
```

> 如果还没有注册小白，可以先[免费注册](http://open.yesapi.cn/)。

## 微信平台配置

登录微信公众号平台，进入：设置 - 开发设置 - 服务器域名，修改request合法域名，修改为你当前所在的小白开放接口域名。小白开放接口已支持HTTPS访问。如下：  

![](http://cdn7.phalapi.net/20180325091907_c20c1b1cb2a0f9822c4faad47557be7c)  

## 调用小白接口

当前JS SDK包已经封装好了对小白接口的通用请求。  

接口签名如下：  
```
/**
 * 通用的接口请求，任何小白接口基本都可通过此方法进行调用，在请求前可先看下本SDK有没已封装好的接口
 * @param string service 小白接口服务名称
 * @param object params 接口参数
 * @param function onSuccess 成功时的回调函数
 * @param function onError 失败时的回调函数
 */
function request(service, params, onSuccess, onError) {
}
```

参数解释：  
 + service：小白接口服务名称，例如：```App.Wxmini_User.Login```，点击查看[小白接口大全](http://api.yesapi.cn/docs.html)。  
 + params：接口参数，使用对象方式传递，例如：```{name: 'xxx'}``` 
 + onSuccess：成功时的回调函数，例如：```function (res) { }```
 + onError：失败时的回调函数，例如：```function (res) { }```
 
请求小白接口，返回的res中会固定有三部分，分别是：  
 + ret：状态码，200表示成功，其他表示异常
 + data：数据部分，根据不同接口而定
 + msg：提示信息
 
## 请求示例

```
  onLoad: function () {

    yesapi.requestAppHelloWorld('Demo', function(res) {
      console.log('如果你看到这句话，说明小白接口请求成功啦~', res)
    }, function (res) {
      console.log('小白接口配置不正确，修改app.js配置文件：', res)
    })
    
  }
```  

运行效果，控制台的输出：  
![](http://cdn7.okayapi.com/yesyesapi_20200319155542_771212b07e3756e6a292c17f3880e512.png)  

网络请求：  
![](http://cdn7.okayapi.com/yesyesapi_20200319155614_78460ec48ec53e7c457dec2dbfff8d5f.png)


## 关注我们

扫码关注小白开放平台微信公众号

![](http://cdn7.okayapi.com/yesyesapi_20200301195545_4bc0953f26de3281b53235c187e55286.jpeg)  



