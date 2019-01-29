// miniprogram/pages/recordlist/recordlist.js
const channel = require("../../common/channel/channel.js");
const util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelState: 0,
    records: [
      // { id: 0, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      // { id: 1, date: 1548870444345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      // { id: 2, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      // { id: 3, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      // { id: 4, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      // { id: 5, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      // { id: 6, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
      // { id: 7, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      // { id: 8, date: 1548770344345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      // { id: 9, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      // { id: 10, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      // { id: 11, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      // { id: 12, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      // { id: 13, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
      // { id: 14, date: 1548770344345, weight: 15.5, gugeji: 32, tizhilv: 23 },
      // { id: 15, date: 1548770344345, weight: 60.7, gugeji: 32, tizhilv: 23 },
      // { id: 16, date: 1548770344345, weight: 74.2, gugeji: 32, tizhilv: 23 },
      // { id: 17, date: 1548770344345, weight: 75.2, gugeji: 32, tizhilv: 23 },
      // { id: 18, date: 1548770344345, weight: 76.2, gugeji: 32, tizhilv: 23 },
      // { id: 19, date: 1548770344345, weight: 77.2, gugeji: 32, tizhilv: 23 },
      // { id: 20, date: 1548770344345, weight: 78.2, gugeji: 32, tizhilv: 23 },
    ]
  },

  addrecord: function (e) {
    let records = this.data.records;
    records.push({ id: 0, date: Date.now(), weight: util.randomNum(50, 120), gugeji: util.randomNum(20, 40), tizhilv: util.randomNum(40, 60) });
    this.setData({
      records: records,
    });
  },

  scan: function (e) {
    let that = this;
    wx.showModal({
      title: '添加记录',
      content: '确定要添加本条记录？',
      success(res) {
        if (res.confirm) {
          // 点击确定，添加一条记录
          that.addrecord();
        }
      }
    });
    return;
    
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        // 将记录保存下来
        console.log(res)
      }
    });
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
    console.log(Date.now());
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