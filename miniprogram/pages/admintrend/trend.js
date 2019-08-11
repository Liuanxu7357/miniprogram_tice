var wxCharts = require('../../utils/wxcharts.js');
const util = require('../../utils/util.js');
var app = getApp();
var lineChart = null;

let records; 

let _this = null;
var startPos = null;

Page({
  data: {
    records: null,
  },

  getTime: function () {

  },

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < records.length; i++) {
      categories.push(util.formatTime(records[i].completeTime));
      data.push(parseFloat(records[i].record.weight[0]));
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },

  createSimulationDataGugeji: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < records.length; i++) {
      categories.push(util.formatTime(records[i].completeTime));
      data.push(parseFloat(records[i].record.skeletalMuscle[0]));
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  }, 
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  createSimulationDataTizhilv: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < records.length; i++) {
      categories.push(util.formatTime(records[i].completeTime));
      data.push(parseFloat(records[i].record.pbf[0]));
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '成交量1',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) + '万';
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },

  onLoad: function (e) { 
    // 从网络查询
    _this = this;
    
    function sortDevices(a, b) {
      return a.id.date - b.id.date;
    };
    // app.globalData.admintrend
    let grecords = getApp().globalData.admintrend;
    records = [];
    if (grecords != null && grecords.length != 0) {
      console.log("排序");
      records = grecords.sort(sortDevices);
    } else {
      // 注意：数据为空时要即刻返回，否则会导致死机
      return;
    }

    wx.setNavigationBarTitle({
      title: 'ID: ' + grecords[0].uid + "",
    })

    this.setData({
      records: records
    });

    _this.onShow2();
  },
  
  onShow2: function (e) {
    console.log("onShow");

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    let gugeji = this.createSimulationDataGugeji();
    let tizhilv = this.createSimulationDataTizhilv();
    lineChart = new wxCharts({
      canvasId: 'lineCanvasWeight',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{ 
        name: '体重',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(1) + 'kg';
        }
      }, {
        name: '骨骼肌',
        data: gugeji.data,
        format: function (val, name) {
          return val.toFixed(1) + 'kg';
        }
      },
      {
        name: '体脂率',
        data: tizhilv.data,
        format: function (val, name) {
          return val.toFixed(1) + '%';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
});