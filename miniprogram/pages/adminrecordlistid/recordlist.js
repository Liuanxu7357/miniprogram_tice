// miniprogram/pages/recordlist/recordlist.js
const channel = require("../../common/channel/channel.js");
const util = require("../../utils/util.js");
const Record = require('../../utils/record.js');
const app = getApp();
let _this = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelState: 0,
    bindKeyInput: "",
    records: [
      { id: 0, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 1, date: 1548870444345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 2, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 3, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 4, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 5, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 6, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 7, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 8, date: 1548770344345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 9, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 10, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 11, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 12, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 13, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 14, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 15, date: 1548770344345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 16, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 17, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 18, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 19, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 20, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
    ]
  },

  /**
 * 获取用户信息
 */
  getUserInfo: function (e) {
    console.log("userinfo")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindKeyInput: function(e) {
    console.log(e);
    this.setData({
      uid: e.detail.value,
    });
  },

  modalConfirm: function(e) {
    console.log(e);
    this.data.value;

    let id = _this.data.uid.trim()

    wx.showLoading({
      title: '查询 ' + id + " 中",
    })

    wx.request({
      url: 'https://kangear.com/lala/physical?reverse=true&type=byeSnAndUid' + app.globalData.snpara, //仅为示例，并非真实的接口地址
      data: {
        uid: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.data);
        _this.setData({ records: res.data.data });

        if (res.data.data.length != 0) {
          wx.showToast({
            icon: "success",
            title: '查询成功',
          })
          wx.setNavigationBarTitle({
            title: 'ID: ' + res.data.data[0].uid + "",
          })
          _this.setData({ modalHidden: true });
        } else {
          wx.showToast({
            icon: "none",
            title: '无数据',
          })
        }
      }
    })
  },

  modalCandel: function(e) {
    console.log(e);
    wx.navigateBack({
    })
  },

  onAdd: function (record) {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: record,
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id);
        record._id = res._id;

        this.onAddSuccess(record);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onAddDevice: function (device) {
    const db = wx.cloud.database()
    db.collection('device').add({
      data: device,
      success: res => {
        wx.showToast({
          title: '注册管理员成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id);
        record._id = res._id;

        this.onAddDeviceSuccess(record);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '注册管理员成功失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onAddDeviceSuccess: function (record) {
    let records = this.data.records;
    records.push(record);

    // 将records按照从大到小排序一下
    // 重新排列数据
    function sortDevices(a, b) {
      return b.qr.date - a.qr.date;
    };

    this.setData({
      records: records.sort(sortDevices),
    });

    console.log(records.length);

    app.globalData.records = records;
  },


  onAddSuccess: function (record) {
    let records = this.data.records;
    records.push(record);

    // 将records按照从大到小排序一下
    // 重新排列数据
    function sortDevices(a, b) {
      return b.qr.date - a.qr.date;
    };

    this.setData({
      records: records.sort(sortDevices),
    });

    console.log(records.length);

    app.globalData.records = records;
  },

  // 将原始数据存入进来？ 还是使用json，有点纠结；
  // 可以两个都使用，但是原始数据暂时不使用，直接解析成json；
  // 
  addrecord: function (e) {
    let qrjson = null;
    try {
      qrjson = JSON.parse(e);
      if (qrjson == null) {
        wx.showToast({
          duration: 2000,
          title: '添加失败，二维码有误',
          image: '/images/fail.png',
        })
        return;
      }

      // check other qr
      if (qrjson.date == null && qrjson.tel == null) {
        this.addAdmin(e);
        return;
      }

      console.log(JSON.stringify(record));
      let record = new Record(qrjson).getJson();
      console.log(record);
      this.onAdd(record);
    } catch(error) {
      console.warn(error);
      wx.showToast({
        duration: 2000,
        title: '添加失败，二维码有误',
        image: '/images/fail.png',
      })
      return;
    }
  },

  third: function (cur, min, max) {
    return { cur: cur, max: max, min: min };
  },

  scan: function (e) {
    app.globalData.admintrend = this.data.records;
    wx.navigateTo({
      url: '/pages/admintrend/trend',
    })
  },

  addAdmin(e) {
    console.log("addAdmin");
    let obj = null;
    try {
      obj = JSON.parse(e);
      if (obj != null && obj.sn != null && obj.action != null && obj.action == "add_admin") {
        this.onAddDevice(obj);
        return;
      }
      console.log(JSON.stringify(obj));
      // this.onAddDevice(record);
    } catch (error) {
      return;
    }
  },

  onScanOk: function (e) {
    let that = this;
    wx.showModal({
      title: '添加记录',
      content: '确定要添加本条记录？',
      success(res) {
        if (res.confirm) {
          // 点击确定，添加一条记录
          // 将json转换成obj
          that.addrecord(e);
        }
      }
    });
  },

  // 点击其中一项进入详情页面
  onItemClick: function (e) {
    console.log(e);
    // 将id传递进来
    wx.navigateTo({
      url: '../admindetail/detail?id=' + e.currentTarget.id,
    })
  },

  // 选择通道
  selectChannel: function (e) {
    // channel.selectChannel(e);
    let select_from = e.currentTarget.dataset.from;
    console.log(select_from);
    let state = 0;
    switch (select_from) {
      case 'A':   state = 0;break;
      case 'all': state = 1;break;
      case 'B':   state = 2;break;
    }

    this.setData({ channelState: state});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从网络查询
    _this = this;
    this.setData({ records: []});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    // this.setData({
    //   records: app.globalData.records,
    // });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})