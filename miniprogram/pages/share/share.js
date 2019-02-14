// miniprogram/pages/recordlist/recordlist.js
const channel = require("../../common/channel/channel.js");
const util = require("../../utils/util.js");
const app = getApp();
import Card from '../../palette/card';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelState: 0,
    records: [
      { id: 0, date: 234323, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 1, date: 234323, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 2, date: 234323, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 3, date: 234323, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 4, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 5, date: 234323, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 6, date: 234323, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 7, date: 234323, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 8, date: 234323, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 9, date: 234323, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 10, date: 234323, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 11, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 12, date: 234323, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 13, date: 234323, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 14, date: 234323, weight: 15.5, gugeji: 32, tizhilv: 23 },
      { id: 15, date: 234323, weight: 60.7, gugeji: 32, tizhilv: 23 },
      { id: 16, date: 234323, weight: 74.2, gugeji: 32, tizhilv: 23 },
      { id: 17, date: 234323, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 18, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 19, date: 234323, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 20, date: 234323, weight: 78.2, gugeji: 32, tizhilv: 23 },
    ]
  },

  // 分享
  bindshare: function (e) {
    this.setData({
      shareOne: {
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/gcs9nfrPIjZSfZvMmVCK81MpPbWqDspNfc2lRLqllfrpYT61RQWNMHXCfzSia7OiapOfXTjYFR6EF7JQZib5MRCdA/132',
        nickname: '极客学苑',
        showShareModel: true
      }
    })
  },

  checkgugeji: function (gugeji) {
    console.log("share.wxs: gugeji");
    console.log(gugeji);
    if (gugeji == null) {
      console.warn("gugeji == null");
      return 0;
    }
    let max = gugeji.max;
    let min = gugeji.min;
    let cur = gugeji.cur;
    if (min == null || max == null || cur == null) {
      console.warn("min/max/cur == null");
      return 0;
    }

    let center = min + (max - min) / 2;
    if (cur < min) { // 包含吗？
      return -1;
    } else if (cur < center) { // 包含吗？
      return 0;
    } else {
      return 1;
    }
  },

  checkTizhilv: function(tizhilv) {
    console.log("share.wxs: tizhilv");

    if (tizhilv == null) {
      console.warn("tizhilv == null");
      return 0;
    }
    let max = tizhilv.max;
    let min = tizhilv.min;
    let cur = tizhilv.cur;
    if (min == null || max == null || cur == null) {
      console.warn("min/max/cur == null");
      return 0;
    }

    let center = min + (max - min) / 2;
    if (cur < center) { // 包含吗？
      return 1;
    } else if (cur < max) { // 包含吗？
      return 0;
    } else {
      return -1;
    }
  },

  share: function (e) {
    console.log(e);
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },

  onImgOK(e) {
    // 其中 e.detail.path 为生成的图片路径
    console.log(e);
  },

  onImgErr(e) {
    console.log(e);
  },

  onItemClick: function (e) {
    console.log(e);
  },

  // 选择通道
  selectChannel: function (e) {
    // channel.selectChannel(e);
    let select_from = e.currentTarget.dataset.from;
    console.log(select_from);
    let state = 0;
    switch (select_from) {
      case 'A': state = 0; break;
      case 'all': state = 1; break;
      case 'B': state = 2; break;
    }

    this.setData({ channelState: state });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   template: new Card().palette(),
    // });
    this.setData({
      userInfo: app.globalData.userInfo,
    });
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
    // 这里需要倒序
    function sortDevices(a, b) {
      return b.qr.date - a.qr.date;
    };
    let grecords = getApp().globalData.records;
    let records = [];  
    if (grecords != null && grecords.length != 0) {
      records = grecords.sort(sortDevices);
    }
    let record = records[0];
    // 如果长度为0那么显示一个无效的
    // TODO
    // if (record == null) {
    //   record = {
    //     qr: {
    //       date: Date.now(),
    //       addr: "无",
    //       tel: "无"
    //     },
    //     mp: {
    //       gugeji: {
    //         min: "无",
    //         max: "无",
    //         cur: "无"
    //       },
    //       tizhilv: {
    //         min: "无",
    //         max: "无",
    //         cur: "无"
    //       }
    //     },
    //   }
    // }

    // 取出最后一个
    this.setData({
      tizhilvSate: this.checkTizhilv(record.mp.tizhilv),
      gugejiState: this.checkgugeji(record.mp.gugeji),
      record: record,
      date: util.formatTime(record.qr.date)
    });
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
  onShareAppMessage: function (res) {
    console.log(res);
    console.log(app.globalData.myUserInfo);
    let obj = app.globalData.myUserInfo;
    let urlParameters = Object
      .keys(obj)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
      .join('&');
    return {
      title: "分享给你 " + obj.nickName + " 的体测记录",
      path: 'pages/index2/index?type=' + '1' + "&" + urlParameters,
      imageUrl: 'imageUrl',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
})