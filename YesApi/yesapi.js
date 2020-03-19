/**
 * 小白接口SDK
 * @version 1.0
 * @author dogstar 20200319
 */
let util = require('./md5.js')
const app = getApp();

/**
 * 通用的接口请求，任何小白接口基本都可通过此方法进行调用，在请求前可先看下本SDK有没已封装好的接口
 * @param string service 小白接口服务名称
 * @param object params 接口参数
 * @param function onSuccess 成功时的回调函数
 * @param function onError 失败时的回调函数
 */
function request(service, params, onSuccess, onError) {
  // 读取配置
  const YESAPI_API_HOST = app.globalData.yesapi.api_host
  const YESAPI_APP_KEY = app.globalData.yesapi.app_key

  // 请求参数 
  params = params || {}
  params['s'] = service
  params = enryptData(params)

  // 请求链接
  let url = YESAPI_API_HOST + '/?s=' + service + '&app_key=' + YESAPI_APP_KEY

  wx.request({
    header: {
      'Accept': 'application/json'
    },
    method: 'POST',
    url: url,
    data: params,
    success: (res) => {
      typeof onSuccess == 'function' && onSuccess(res.data)
    },
    fail: (err) => {
      typeof cb == "function" && cb(err);
    }
  })
}

/**
 * 微信用户登录
 */
function requestAppWxmini_UserLogin(code, iv, encryptedData, onSuccess, onError) {
  let params = {
    code: code,
    iv: iv,
    encryptedData: encryptedData
  }
  request('App.Wxmini_User.Login', params, onSuccess, onError)
}

/**
 * 示例接口调用，可验证配置和签名是否正确
 */
function requestAppHelloWorld(name, onSuccess, onError) {
  request('App.Hello.World', { name: name }, onSuccess, onError);
}


/**
 * 签名加密
 */
function enryptData (params) {
  // const app = getApp()

  const YESAPI_API_HOST = app.globalData.yesapi.api_host
  const YESAPI_APP_KEY = app.globalData.yesapi.app_key
  const YESAPI_APP_SECRET = app.globalData.yesapi.app_secrect

  params['app_key'] = YESAPI_APP_KEY
  params['sign'] = '' // 屏蔽sign参数

  var sdic = Object.keys(params).sort();
  var paramsStrExceptSign = "";
  for (let ki in sdic) {
    paramsStrExceptSign += params[sdic[ki]];
  }

  var sign = util.hexMD5(paramsStrExceptSign + YESAPI_APP_SECRET).toUpperCase();
  params['sign'] = sign;

  return params;
}

module.exports = {
  request: request,
  requestAppHelloWorld: requestAppHelloWorld,
  requestAppWxmini_UserLogin: requestAppWxmini_UserLogin
}  