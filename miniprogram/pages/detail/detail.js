// miniprogram/pages/detail/detail.js
const app = getApp();
const util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "type": "01", "value": "text1", "range": "type1" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询出当前记录
    let records = app.globalData.records;
    var record = records.find(function (element) {
      return element._id == options.id;
    });

    // 先在本地查询，本地没有的话，查网络
    if (record != null) {
      this.onReuslt(record);
      return;
    }

    wx.showLoading({
      title: '加载中...',
    });

    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('counters').where({
      _id: _.eq(options.id)
    }).get({
      success: res => {
        wx.hideLoading();
        this.onReuslt(res.data[0]);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    });
  },

  onReuslt: function (record) {
    console.log("onResult: ", record);
    // titile
    wx.setNavigationBarTitle({
      title: '体成分结果(' + util.formatTime(record.date) + ")",
    })

    let list = [];
    list.push(
      {
        type: "BMI",
        value: record.bmi.cur,
        range: util.formatRange(record.bmi),
      },
      {
        type: "体脂肪率",
        value: record.tizhilv.cur,
        range: util.formatRange(record.tizhilv),
      },
      {
        type: "体脂肪量",
        value: record.tizhifangliang.cur,
        range: util.formatRange(record.tizhifangliang),
      },
      {
        type: "肌肉量",
        value: record.jirouliang.cur,
        range: util.formatRange(record.jirouliang),
      },
      {
        type: "骨骼肌量",
        value: record.gugeji.cur,
        range: util.formatRange(record.gugeji),
      },
      {
        type: "身体水分",
        value: record.shentishuifen.cur,
        range: util.formatRange(record.shentishuifen),
      },
      {
        type: "内脏面积",
        value: record.neizangmianji.cur,
        range: util.formatRange(record.neizangmianji),
      },
      {
        type: "蛋白质量",
        value: record.danbaizhiliang.cur,
        range: util.formatRange(record.danbaizhiliang),
      },
      {
        type: "无肌盐量",
        value: record.wujiyanliang.cur,
        range: util.formatRange(record.wujiyanliang),
      });
    this.setData({
      listData: list,
    });
    console.log(record);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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