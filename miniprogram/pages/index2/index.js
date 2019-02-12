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
    console.log("tap:", this.data.userInfo);
    if (this.data.userInfo == null) {
      return;
    }
    
    this.gotoRecordlist();
  },

  // 进入
  gotoRecordlist: function (e) {
    console.log("gotoRecordlist");
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    console.log("getRecordlist2: " + app.globalData.openid);
    if (app.globalData.openid == null) {
      reject("fail");
      return;
    }

    db.collection('counters').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)

        // 赋值到全局变量上
        app.globalData.records = res.data;

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
      }
    })
  },

  // 启动类型
  // 1. default 默认类型；
  // 2. share；
  onLoad: function(e) {
    console.log(e);
    let that = this;

    // 1. 获取openid 和 昵称；
    this.onGetOpenid();

    // 2. 获取传入参数，匹配启动类型；
    // 2.1 分享式启动；(参数需要传递openid, nickname等等)
    // 2.2 默认方式启动；
    if (e.type != null && e.type == "share" && e.shareid != null) {
      this.setData({ boot: { type: "share", shareid: e.shareid, shareNickName: e.nickName}});
      this.setData({ text: "查看 " + e.nickName + " 的体测记录"});
    } else {
      this.setData({ boot: { type: "default", shareid: ""}});
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
              that.gotoRecordlist();
            }
          })
        }
      }
    })
  },

  getRecordlist: function (e) {
    const db = wx.cloud.database()
    console.log("getRecordlist: " + app.globalData.openid);
    return new Promise(function (resolve, reject) {
      // 查询当前用户所有的 counters
      console.log("getRecordlist2: " + app.globalData.openid);
      if (app.globalData.openid == null) {
        reject("fail");
        return;
      }

      db.collection('counters').where({
        _openid: app.globalData.openid
      }).get({
        success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
          resolve('Success!');
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
          reject('Fail!');
        }
      })
    });
  },

  // 获取用户信息成功回调
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })

      // 将基本信息放到全局变量中
      app.globalData.userInfo = e.detail.userInfo;

      // 获取数据
      this.gotoRecordlist();
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
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
