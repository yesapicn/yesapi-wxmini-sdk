/**
 * 小白接口SDK
 * @version 1.1
 * @author dogstar 20200319
 */
let util = require('./md5.js')
const app = getApp();

var yesapi = {
  /**
   * 通用的接口请求，任何小白接口基本都可通过此方法进行调用，在请求前可先看下本SDK有没已封装好的接口
   * @param string service 小白接口服务名称
   * @param object params 接口参数
   * @param function onSuccess 成功时的回调函数
   * @param function onError 失败时的回调函数
   */
  request: function (service, params, onSuccess, onError) {
    // 读取配置
    const YESAPI_API_HOST = app.globalData.yesapi.api_host
    const YESAPI_APP_KEY = app.globalData.yesapi.app_key

    // 请求参数 
    params = params || {}
    params['s'] = service
    params = this.enryptData(params)

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
  },

  /** ----------------- 用户 ----------------- */

  /**
   * 微信用户登录
   */
  requestAppWxmini_UserLogin: function (code, iv, encryptedData, onSuccess, onError) {
    let params = {
      code: code,
      iv: iv,
      encryptedData: encryptedData
    }
    this.request('App.Wxmini_User.Login', params, onSuccess, onError)
  },

  /**
   * 获取绑定的用户信息
   */
  requestAppWxmini_UserGetBindInfo: function (openid, onSuccess, onError) {
    this.request('App.Wxmini_User.GetBindInfo', { openid: openid }, onSuccess, onError)
  },

  /** ----------------- 店铺 ----------------- */

  /**
   * 微信小程序店铺-在售的商品总数
   */
  requestAppWxmini_GoodsCount: function (onSuccess, onError) {
    this.request('App.Wxmini_Goods.Count', {}, onSuccess, onError)
  },

  /**
   * 微信小程序店铺-商品分类
   */
  requestAppWxmini_GoodsCategory: function (cate_id, onSuccess, onError) {
    this.request('App.Wxmini_Goods.Category', { cate_id: cate_id }, onSuccess, onError)
  },

  /**
   * 微信小程序店铺-商品详情
   */
  requestAppWxmini_GoodsDetail: function (goods_id, onSuccess, onError) {
    this.request('App.Wxmini_Goods.Detail', { goods_id: goods_id }, onSuccess, onError)
  },

  /**
   * 微信小程序店铺-根据条件搜素商品
   */
  requestAppWxmini_GoodsSearchList: function (params, onSuccess, onError) {
    this.request('App.Wxmini_Goods.SearchList', params, onSuccess, onError)
  },

  /** ----------------- 微信小程序功能 ----------------- */

  requestAppWxmini_AdverGetAdList: function (num, onSuccess, onError) {
    this.request('App.Wxmini_Adver.GetAdList', { num: num || 5 }, onSuccess, onError)
  },

  requestAppWxmini_NoticeGetList: function (num, onSuccess, onError) {
    this.request('App.Wxmini_Notice.GetList', { num: num || 5 }, onSuccess, onError)
  },

  requestAppWxmini_MenusGetList: function (num, onSuccess, onError) {
    this.request('App.Wxmini_Menus.GetList', { num: num || 5 }, onSuccess, onError)
  },

  requestAppWxmini_CmsGetArticleList: function (cate_no, page, perpage, onSuccess, onError) {
    let params = {}
    if (cate_no) {
      params['cate_no'] = cate_no
    }
    if (page) {
      params['page'] = page
    }
    if (perpage) {
      params['perpage'] = perpage
    }
    this.request('App.Wxmini_Cms.GetArticleList', params, onSuccess, onError)
  },

  requestAppWxmini_CmsGetArticleDetail: function (id, onSuccess, onError) {
    this.request('App.Wxmini_Cms.GetArticleDetail', { id: id }, onSuccess, onError)
  },

  /** ----------------- 示例 ----------------- */

  /**
   * 示例接口调用，可验证配置和签名是否正确
   */
  requestAppHelloWorld: function (name, onSuccess, onError) {
    this.request('App.Hello.World', { name: name }, onSuccess, onError);
  },

  /** ----------------- 内部方法 ----------------- */

  /**
   * 签名加密
   */
  enryptData: function (params) {
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

}

module.exports = yesapi