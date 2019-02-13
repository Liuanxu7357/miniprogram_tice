var wxCharts = require('../../utils/wxcharts.js');
const util = require('../../utils/util.js');
var app = getApp();
var lineChart = null;

let records;

var startPos = null;

Page({
  data: {
    records: [
      { id: 0, date: 234323, weight: 120.5, gugeji: 32.5, tizhilv: 20.1 },
      { id: 1, date: 234323, weight: 83.7, gugeji: 60.3, tizhilv: 22.5 },
      { id: 2, date: 234323, weight: 74.2, gugeji: 51.4, tizhilv: 20.1 },
      { id: 3, date: 234323, weight: 75.2, gugeji: 51.4, tizhilv: 20.1 },
      { id: 4, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 5, date: 234323, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 6, date: 234323, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 7, date: 234323, weight: 83.5, gugeji: 32, tizhilv: 23 },
      { id: 8, date: 234323, weight: 83.7, gugeji: 32, tizhilv: 23 },
      { id: 9, date: 234323, weight: 83.2, gugeji: 32, tizhilv: 23 },
      { id: 10, date: 234323, weight: 75.2, gugeji: 32, tizhilv: 23 },
      { id: 11, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 12, date: 234323, weight: 77.2, gugeji: 32, tizhilv: 23 },
      { id: 13, date: 234323, weight: 85.2, gugeji: 32, tizhilv: 23 },
      { id: 14, date: 234323, weight: 83.5, gugeji: 32, tizhilv: 23 },
      { id: 15, date: 234323, weight: 82.7, gugeji: 32, tizhilv: 23 },
      { id: 16, date: 234323, weight: 80.2, gugeji: 32, tizhilv: 23 },
      { id: 17, date: 234323, weight: 78.2, gugeji: 32, tizhilv: 23 },
      { id: 18, date: 234323, weight: 76.2, gugeji: 32, tizhilv: 23 },
      { id: 19, date: 234323, weight: 73.2, gugeji: 32, tizhilv: 23 },
      { id: 20, date: 234323, weight: 60.2, gugeji: 32, tizhilv: 23 },
    ]
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
      categories.push(util.formatTime(records[i].date));
      data.push(records[i].weight);
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
      categories.push(util.formatTime(records[i].date));
      data.push(records[i].gugeji);
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
      categories.push(util.formatTime(records[i].date));
      data.push(records[i].tizhilv);
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
    // 这里需要正序
    function sortDevices(a, b) {
      return a.date - b.date;
    };
    records = getApp().globalData.records.sort(sortDevices);
    if (records == null) {
      records = [];
      return;  
    }
  },
  onShow: function (e) {
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
          return val.toFixed(2) + 'kg';
        }
      }, {
        name: '骨骼肌',
        data: gugeji.data,
        format: function (val, name) {
          return val.toFixed(2) + 'kg';
        }
      },
      {
        name: '体脂率',
        data: tizhilv.data,
        format: function (val, name) {
          return val.toFixed(2) + 'kg';
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