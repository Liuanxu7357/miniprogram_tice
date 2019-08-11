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
    records: [
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
    // let record = {
    //   date: Date.now(), 
    //   // 1. 性别
    //   gender: this.third(1, 1, 1),
    //   // 2. 年龄
    //   age: this.third(1, 1, 1),
    //   // 3. 身高
    //   height: this.third(170, 169, 180),
    //   // 4. 体重
    //   weight: this.third(util.randomNum(50, 120), 30, 40),
    //   // bmi
    //   bmi: this.third(20.1, 18.5, 24.1),
    //   // 体脂率
    //   tizhilv: this.third(29.6, 15, 20),
    //   // 体脂肪量
    //   tizhifangliang: this.third(18.9, 10.4, 13.9),
    //   // 肌肉量
    //   jirouliang: this.third(41.8, 51.5, 55.5),
    //   // 骨骼肌量
    //   gugeji: this.third(27.6, 30.1, 39.8),
    //   // 身体水分
    //   shentishuifen: this.third(32.2, 40.1, 42.3),
    //   // 内脏面积
    //   neizangmianji: this.third(81.5, 0, 75),
    //   // 蛋白质量
    //   danbaizhiliang: this.third(9.6, 11.1, 12.4),
    //   // 无机盐量
    //   wujiyanliang: this.third(3.1, 3.8, 9.7), 
    //   database64: "xxxxxxx"};
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
    let that = this;
    // _this.setData({ records: res.data.data });
    wx.navigateTo({
      url: '/pages/adminrecordlistid/recordlist',
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
    wx.request({
      url: 'https://kangear.com/lala/physical?reverse=true&type=bySn' + app.globalData.snpara, //仅为示例，并非真实的接口地址
      data: {
        // type: "bySn",
        // sn: getApp().globalData.sns
      },
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.data);
        _this.setData({ records: res.data.data});
      }
    })

    let records = app.globalData.records;
    this.setData({
      records: records,
      userInfo: app.globalData.userInfo,
    });

    // let record = new Record().getJson();
    // console.log(record);
    // app.globalData.records = this.data.records;
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