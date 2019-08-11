// miniprogram/pages/detail/detail.js
const app = getApp();
const util = require("../../utils/util.js");
let index = 0;
let _this = null;

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

    // 从网络查询
    _this = this;
    wx.request({
      url: 'https://kangear.com/lala/physical', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.data);
        _this.setData({ records: res.data.data });
        _this.onReuslt(res.data.data[0]);
      }
    })

    // // 查询出当前记录
    // let records = app.globalData.records;
    // index = records.findIndex(function (element) {
    //   return element._id == options.id;
    // });

    // var record = records[index];

    // // 先在本地查询，本地没有的话，查网络
    // if (record != null) {
    //   this.onReuslt(record);
    //   return;
    // }
    // wx.showLoading({
    //   title: '加载中...',
    // });

    // const db = wx.cloud.database();
    // const _ = db.command;
    // db.collection('counters').where({
    //   _id: _.eq(options.id)
    // }).get({
    //   success: res => {
    //     wx.hideLoading();
    //     this.onReuslt(res.data[0]);
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // });
  },

  formatRange: function (arr) {
    return "(" + arr[1] + "-" + arr[2] + ")";
  },

  onReuslt: function (record) {
    // 根据uq查询
    console.log("onResult: ", record);
    // titile
    wx.setNavigationBarTitle({
      title: '体成分结果(' + util.formatTime(record.completeTime) + ")",
    })

    // 如果有PDF图片，则不再显示列表
    let img = record.img;
    if (img != null && img.length != 0) {
      this.setData({
        imgurl: "https://kangear.com/gallery/" + img,
      });

      // 如果加载不了，提示其还在转换中

      return;
    }

    let list = [];
    list.push(
      {
        type: "BMI",
        value: record.record.bmi[0],
        range: _this.formatRange(record.record.bmi),
      },
      {
        type: "体脂肪率",
        value: record.record.pbf[0],
        range: _this.formatRange(record.record.pbf),
      },
      {
        type: "体脂肪量",
        value: record.record.bodyFat[0],
        range: _this.formatRange(record.record.bodyFat),
      },
      {
        type: "肌肉量",
        value: record.record.muscle[0],
        range: _this.formatRange(record.record.muscle),
      },
      {
        type: "骨骼肌量",
        value: record.record.skeletalMuscle[0],
        range: _this.formatRange(record.record.skeletalMuscle),
      },
      {
        type: "身体水分",
        value: record.record.bodyMoisture[0],
        range: _this.formatRange(record.record.bodyMoisture),
      },
      {
        type: "内脏面积",
        value: record.record.visceralArea[0],
        range: _this.formatRange(record.record.visceralArea),
      },
      {
        type: "蛋白质量",
        value: record.record.protein[0],
        range: _this.formatRange(record.record.protein),
      },
      {
        type: "无肌盐量",
        value: record.record.mineralSalt[0],
        range: _this.formatRange(record.record.mineralSalt),
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