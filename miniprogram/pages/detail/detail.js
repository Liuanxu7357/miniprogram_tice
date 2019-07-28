// miniprogram/pages/detail/detail.js
const app = getApp();
const util = require("../../utils/util.js");
let index = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:null,
    listData: [
      { "type": "01", "value": "text1", "range": "type1" },
    ]
  },

  tap: function (e) {
    wx.previewImage({
      current: this.data.imgurl,     //当前图片地址
      urls: [this.data.imgurl],               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    });

    // 查询出当前记录
    let records = app.globalData.records;
    index = records.findIndex(function (element) {
      return element._id == options.id;
    });

    var record = records[index];

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
      title: '体成分结果(' + util.formatTime(record.qr.date) + ")",
    })

    // 如果有PDF图片，则不再显示列表
    let img = record.qr.img;
    if (img != null && img.length != 0) {
      this.setData({
        imgurl: "https://kangear.com/gallery/" + img,
      });

      return;
    }

    let list = [];
    list.push(
      {
        type: "BMI",
        value: record.mp.bmi.cur,
        range: util.formatRange(record.mp.bmi),
      },
      {
        type: "体脂肪率",
        value: record.mp.tizhilv.cur,
        range: util.formatRange(record.mp.tizhilv),
      },
      {
        type: "体脂肪量",
        value: record.mp.tizhifangliang.cur,
        range: util.formatRange(record.mp.tizhifangliang),
      },
      {
        type: "肌肉量",
        value: record.mp.jirouliang.cur,
        range: util.formatRange(record.mp.jirouliang),
      },
      {
        type: "骨骼肌量",
        value: record.mp.gugeji.cur,
        range: util.formatRange(record.mp.gugeji),
      },
      {
        type: "身体水分",
        value: record.mp.shentishuifen.cur,
        range: util.formatRange(record.mp.shentishuifen),
      },
      {
        type: "内脏面积",
        value: record.mp.neizangmianji.cur,
        range: util.formatRange(record.mp.neizangmianji),
      },
      {
        type: "蛋白质量",
        value: record.mp.danbaizhi.cur,
        range: util.formatRange(record.mp.danbaizhi),
      },
      {
        type: "无肌盐量",
        value: record.mp.wujiyan.cur,
        range: util.formatRange(record.mp.wujiyan),
      });
    this.setData({
      record: record,
      listData: list,
    });
    console.log(record);
  },

  deleteCurRecord: function(e) {
    console.log("deleteCurRecord");
    let _this = this;
    wx.showModal({
      title: '删除记录',
      content: '确定要删除本条记录？',
      success(res) {
        if (res.confirm) {
          // 点击确定，添加一条记录
          // 将json转换成obj
          _this.onDel(e);
        }
      }
    });
  },

  onDel: function() {
    let _this = this;
    const db = wx.cloud.database()
    db.collection('counters').doc(this.data.record._id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })

        _this.onDelDone();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },

  onDelDone: function () {
    app.globalData.records.splice(index, 1);

    // 返回到上级页面
    wx.navigateBack({
    })
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