//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'physical-test-5g1bon0cb8f88ae9',
        traceUser: true,
      })
    }

    this.globalData = {
      debug: false,
      userInfo: null, // 当前 (本人或者分享人)
      myUserInfo: null, // 本人
      records: [
      ]
    }
  }
})
