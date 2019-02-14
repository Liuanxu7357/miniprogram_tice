//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    text: "进入",
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  // tap
  tap: function (e) {
    console.log(e);
    console.log("tap:", app.globalData.userInfo);
    if (app.globalData.userInfo == null) {
      return;
    }
    
    this.gotoRecordlist();
  },

  // oDoVK5HuP5Pz7G_BOWhOXVZX-IE4

  // 第三步：跳转
  gotoRecordlist: function (e) {
    // 查询当前用户所有的 counters
    console.log("gotoRecordlist userInfo: ", app.globalData.userInfo);
    console.log("gotoRecordlist myUserInfo: ", app.globalData.myUserInfo);

    if (app.globalData.myUserInfo == null || app.globalData.myUserInfo.openid == null) {
      console.warn("信息不全1");
      return;
    }

    // 如果不是分享过来的，那么就将本人的clone进来
    if (app.globalData.userInfo == null && app.globalData.myUserInfo.openid != null) {
      app.globalData.userInfo = Object.assign({}, app.globalData.myUserInfo);
    }

    if (app.globalData.userInfo.openid == null) {
      console.warn("信息不全2");
      return;
    }

    // 才查询到20个数据项?
    // 最新三个月的 TODO: 当大于20个数据项时会有一些问题，需要能够分布加载；
    let time = Date.now() - 7862400 * 1000;
    const db = wx.cloud.database();
    const _ = db.command;
    console.log("Date.now(): " + Date.now());
    db.collection('counters').where({
      'qr.date': _.gt(time),
      _openid: app.globalData.userInfo.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)

        // 赋值到全局变量上 重新排列数据
        function sortDevices(a, b) {
          return b.qr.date - a.qr.date;
        };
        app.globalData.records = res.data.sort(sortDevices);

        // 进入
        wx.reLaunch({
          url: '../recordlist/recordlist',
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)

        app.globalData.records = [];
        // 进入
        wx.reLaunch({
          url: '../recordlist/recordlist',
        });
      }
    })
  },

  // 启动类型
  // 1. default 默认类型；
  // 2. share；
  onLoad: function(e) {
    console.log(e);
    let that = this;

    // 2. 获取传入参数，匹配启动类型；
    // 2.1 分享式启动；(参数需要传递openid, nickname等等)
    // 2.2 默认方式启动；
    if (e.type != null && e.type == "1" && e.openid != null) {
      Object.keys(e).map(function (key, index) {
        e[key] = decodeURIComponent(e[key]);
      });
      this.setData({ text: "查看 " + e.nickName + " 的体测记录"});
      // 当前用户（可以是本人，也可能是分享过来的）
      app.globalData.userInfo = Object.assign({}, e);
    }

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              this.onGetUserInfo({
                detail: {
                  userInfo: res.userInfo,
                }
              });
            } 
          })
        }
      }
    })
  },

  // 第一步：获取UserInfo
  // 获取用户信息成功回调
  // 唯一入口，获取完UserInfo获取OpenId
  onGetUserInfo: function(e) {
    console.log("onGetUserInfo");
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      // 将基本信息放到全局变量中
      app.globalData.myUserInfo = Object.assign({}, e.detail.userInfo);

      // 1. 获取openid 和 昵称；
      this.onGetOpenid();
    }
  },

  // 第二步：获取OpenId
  onGetOpenid: function() {
    console.log("onGetOpenid");
    let that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.myUserInfo = Object.assign({ openid: res.result.openid }, app.globalData.myUserInfo);
        // 这里所有的信息都获取全了，可以跳了
        if (app.globalData.userInfo == null || app.globalData.userInfo.type != "1") {
          that.gotoRecordlist();
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
