
import toast from '../../common/js/toast'

import request from '../../common/js/request'

import { mobileType } from '../../common/js/common'



function $$(id) {
  return document.querySelector(id)
}

const CONFIG = {
  api: '/promote/annual-festival-list',
}

/**
 * jsbrudge  js与ios交互
 **/
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(WebViewJavascriptBridge)
      },
      false
    )
  }

  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

class Home {
  constructor() {
    this.userInfo = null
    this.isLoading = false
    this.init()
  }
  init() {
    console.log('页面进入');
  }

  // 获取数据
  getData() {
    if (this.isLoading) return // 防抖处理
    const payLoad = {
      token: this.userInfo.token,
      type_id: this.tabSel
    }
    try {
      this.isLoading = true
      request.post(CONFIG.api, payLoad).then(res => {
        if (res.code != '0') {
          this.toast(res.msg)
          return
        }
        this.isLoading = false
        this.res = res.data

        const top3 = this.res.list.splice(0, 3)
        $$('.top3').innerHTML = this.getTop3(top3)

        const tempArr = this.res.list.splice(0, 7)
        this.showingList = tempArr

        $$('.list_container').innerHTML = this.getList(this.showingList)
        $$('.fourth_content').innerHTML = this.getSelf(this.res.my_info)


      }).catch(err => {
        console.log('err----', err);
        this.isLoading = false
      })
    } catch (error) {

    }
  }

  // 与客户端交互获取用户基本信息
  getInfo() {
    const that = this
    if (/android/i.test(navigator.userAgent)) {
      try {
        that.userInfo = window.android.getInfo()
        that.userInfo = eval('(' + that.userInfo + ')')
        that.getData()
      } catch (e) {
        console.log(e, 'android报错')
      }
    } else if (/ios|iphone|ipod|pad/i.test(navigator.userAgent)) {
      try {
        setupWebViewJavascriptBridge(function (bridge) {
          var data = 'hello'
          bridge.callHandler('getInfo', data, function (resp) {
            that.userInfo = resp
            that.getData()
            console.log(resp, '获取ios信息')
          })
        })
      } catch (e) {
        console.log(e, 'ios报错')
      }
    }
  }
}

export default Home
