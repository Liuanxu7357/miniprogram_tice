const Body = require('../utils/body.js');
const util = require("../utils/util.js");

const UNIT_KG = "kg";
const UNIT_KCAL = "kcal";
const UNIT_SCORE = "分";
const UNIT_CM2 = "c㎡";
const UNIT_AGE = "岁";
const UNIT_CM = "cm";
const UNIT_EMPTY = "";
const UNIT_R = "欧";
const UNIT_PERCENT = "%";
const INVALID_POSIONT = -1;

/**
 * 默认小端，大数在后，小数在前
 */
function getShortFromData(data) {
  if (data == null || data.length != 2) {
    return 0;
  }
  return data[0] + (data[1] << 8);
}

// 时间，地址，电话，database64
let qrjson = {
  "img": "",
  "date": Date.now(),
  "tel": '010-32347372',
  "addr": '昌平xxx街道xxx路xxxx号',
  "score": 90,
  "database64": "AAAAAAAAAAAAAAAAAAAAAAAAAAABKKQGIAOdGn0WUAB0C0gLZQH5CXgJExVTEwAAAAAAewIWArUCMwL8ARsC7QBfAH8AEALVAfUBLwEKAUoBmQFtAYQBdwBkAHEAIyQmAIEAjwCjABgB9QAJASMfISQfIRkB6gD5AFYAVgBcAFoAVgBcAA8GCA4GCIwALwA/ACMRFyERF+sEhANMBBQBuQDwACgBlgDIAEAEPgRdBLEDXVBaHx4jAwTwBKQCK6WAfoArgA8H3Ao="
}

let json = "";

// 入口：从设备扫码的二维码
// 1. 将database64提取出来，并转换成Array；
// 2. 将Array解析成mp的Json对象；
var Record = function Record(qr) {
  if (qr == null) {
    qr = qrjson;
  }
  console.warn("Record");
  console.log(qr);
  console.log(qr.database64);
  let arrayBuffer = wx.base64ToArrayBuffer(qr.database64);
  let array = Array.prototype.slice.call(new Uint8Array(arrayBuffer));
  console.log(util.bytesToHex(array));

  // 2. 解析成mp的json对象
  let mpjson = new Body(array).getMpJson();
  console.log(mpjson);
  // json: qr:{database64:sfaljs===}, mp:{"无机盐":{min: 22.2, max: 22,3, cur: 23.2}}
  json = {
    qr: qr,
    mp: mpjson,
  }
  console.log(json);
};

Record.prototype.getJson = function () {
  return json
};

module.exports = Record;