const util = require("../utils/util.js");

// 默认数据
const xxx = [
    /* 0x55, 0xAA, 0xCD, 0x02, 0x31, 0x00, */0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x01, 0x28, 0xA4, 0x06, 0x20, 0x03, 0x9D, 0x1A, 0x7D, 0x16,
    0x50, 0x00, 0x74, 0x0B, 0x48, 0x0B, 0x65, 0x01, 0xF9, 0x09, 0x78, 0x09,
    0x13, 0x15, 0x53, 0x13, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7B, 0x02, 0x16,
    0x02,  0xB5, 0x02, 0x33, 0x02, 0xFC, 0x01, 0x1B, 0x02, 0xED, 0x00, 0x5F,
    0x00, 0x7F, 0x00, 0x10, 0x02, 0xD5, 0x01, 0xF5, 0x01, 0x2F, 0x01, 0x0A,
    0x01, 0x4A, 0x01, 0x99, 0x01, 0x6D, 0x01, 0x84, 0x01, 0x77, 0x00, 0x64,
    0x00, 0x71, 0x00, 0x23, 0x24, 0x26, 0x00, 0x81, 0x00, 0x8F, 0x00, 0xA3,
    0x00, 0x18, 0x01, 0xF5, 0x00, 0x09, 0x01, 0x23, 0x1F, 0x21, 0x24, 0x1F,
    0x21, 0x19, 0x01, 0xEA, 0x00, 0xF9, 0x00, 0x56, 0x00, 0x56, 0x00, 0x5C,
    0x00, 0x5A, 0x00, 0x56, 0x00, 0x5C, 0x00, 0x0F, 0x06, 0x08, 0x0E, 0x06,
    0x08, 0x8C, 0x00, 0x2F, 0x00, 0x3F, 0x00, 0x23, 0x11, 0x17, 0x21, 0x11,
    0x17, 0xEB, 0x04, 0x84, 0x03, 0x4C, 0x04, 0x14, 0x01, 0xB9, 0x00, 0xF0,
    0x00, 0x28, 0x01, 0x96, 0x00, 0xC8, 0x00, 0x40, 0x04, 0x3E, 0x04, 0x5D,
    0x04, 0xB1, 0x03, 0x5D, 0x50, 0x5A, 0x1F, 0x1E, 0x23, 0x03, 0x04, 0xF0,
    0x04, 0xA4, 0x02, 0x2B, 0xA5, 0x80, 0x7E, 0x80, 0x2B, 0x80, 0x0F, 0x07,
    0xDC, 0x0A, /*0x81, 0xA8*/
];

const UNIT_KG      = "kg";
const UNIT_KCAL    = "kcal";
const UNIT_SCORE   = "分";
const UNIT_CM2     = "c㎡";
const UNIT_AGE     = "岁";
const UNIT_CM      = "cm";
const UNIT_EMPTY   = "";
const UNIT_R       = "欧";
const UNIT_PERCENT = "%";
const INVALID_POSIONT = -1;

// Third
class Third {
  constructor(name, curStart, minStart, maxStart, length, dot, unit) {
    this._name = name;
    this._curStart = curStart;
    this._minStart = minStart;
    this._maxStart = maxStart;
    this._length = length;
    this._dot = dot;
    this._unit = unit;
  }

  get dot() {
    return this._dot;
  }

  get name() {
    return this._name;
  }

  get curStart() {
    return this._curStart;
  }

  get minStart() {
    return this._minStart;
  }

  get maxStart() {
    return this._maxStart;
  }

  get max() {
    return this._max;
  }

  get length() {
    return this._length;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  get cur() {
    return this._cur;
  }

  set min(value) {
    this._min = value;
  }

  set cur(value) {
    this._cur = value;
  }

  setMin(value) {
    this._min = value;
    return this;
  }

  setMax(value) {
    this._max = value;
    return this;
  }

  set max(value) {
    this._max = value;
  }
}

let mList = [];
let 性别 = new Third("性别", 20, INVALID_POSIONT, INVALID_POSIONT, 1, 0, UNIT_EMPTY);
let 年龄 = new Third("年龄", 21, INVALID_POSIONT, INVALID_POSIONT, 1, 0, UNIT_AGE);
let 身高 = new Third("身高", 22, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_CM);
let 体重 = new Third("体重", 24, 53, 55, 2, 1, UNIT_KG);
let _5k电阻 = new Third("_5k电阻", 26, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_R);
let _50k电阻 = new Third("_50k电阻", 28, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_R);
let _250k电阻 = new Third("_250k电阻", 44, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_R);
let 去脂体重 = new Third("去脂体重", 57, 59, 61, 2, 1, UNIT_KG);
let 体脂肪量 = new Third("体脂肪量", 63, 65, 67, 2, 1, UNIT_KG);
let 肌肉量 = new Third("肌肉量", 69, 71, 73, 2, 1, UNIT_KG);
let 骨骼肌 = new Third("骨骼肌", 75, 77, 79, 2, 1, UNIT_KG);
let 身体水分 = new Third("身体水分", 81, 83, 85, 2, 1, UNIT_KG);
let 蛋白质 = new Third("蛋白质", 87, 89, 91, 2, 1, UNIT_KG);
let 无机盐 = new Third("无机盐", 93, 94, 95, 1, 1, UNIT_KG);
let 细胞外液含量 = new Third("细胞外液含量", 96, 98, 100, 2, 1, UNIT_KG);
let 细胞内液含量 = new Third("细胞内液含量", 103, 105, 107, 2, 1, UNIT_KG);
let 左上肢肌肉量 = new Third("左上肢肌肉量", 109, 110, 111, 1, 1, UNIT_KG);
let 右上肢肌肉量 = new Third("右上肢肌肉量", 112, 113, 114, 1, 1, UNIT_KG);
let 躯干肌肉量 = new Third("躯干肌肉量", 115, 117, 119, 2, 1, UNIT_KG);
let 左下肌肉量 = new Third("左下肌肉量", 121, 123, 125, 2, 1, UNIT_KG);
let 右下肌肉量 = new Third("右下肌肉量", 127, 129, 131, 2, 1, UNIT_KG);
let 左上脂肪量 = new Third("左上脂肪量", 133, 134, 135, 1, 1, UNIT_KG);
let 右上脂肪量 = new Third("右上脂肪量", 136, 137, 138, 1, 1, UNIT_KG);
let 躯干脂肪量 = new Third("躯干脂肪量", 139, 141, 143, 2, 1, UNIT_KG);
let 左下脂肪量 = new Third("左下脂肪量", 145, 146, 147, 1, 1, UNIT_KG);
let 右下脂肪量 = new Third("右下脂肪量", 148, 149, 150, 1, 1, UNIT_KG);
let BMI = new Third("BMI", 157, 159, 161, 2, 1, UNIT_EMPTY);
let 体脂百分比 = new Third("体脂百分比", 163, 165, 167, 2, 1, UNIT_PERCENT);
let 腰臀比 = new Third("腰臀比", 177, 178, 179, 1, 2, UNIT_EMPTY);
let 水肿系数 = new Third("水肿系数", 180, 181, 182, 1, 0, UNIT_EMPTY);
let 体型分析 = new Third("体型分析", INVALID_POSIONT, 183, 184, 1, 0, UNIT_EMPTY);
let 内脏面积 = new Third("内脏面积", 185, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_CM2);
let 评分 = new Third("评分", 187, INVALID_POSIONT, INVALID_POSIONT, 2, 1, UNIT_SCORE);
let 基础代谢 = new Third("基础代谢", 196, INVALID_POSIONT, INVALID_POSIONT, 2, 0, UNIT_KCAL);
let 总能耗 = new Third("总能耗", 198, INVALID_POSIONT, INVALID_POSIONT, 2, 0, UNIT_KCAL);
let 身体年龄 = new Third("身体年龄", 198, INVALID_POSIONT, INVALID_POSIONT, 1, 0, UNIT_KCAL);

/**
 * 默认小端，大数在后，小数在前
 */
function getShortFromData(data) {
  if (data == null || data.length != 2) {
    return 0;
  }
  return data[0] + (data[1] << 8);
}

/**
 * @t Third
 * @data data
 */
function parse(t, data) {
  if (t == null || data == null) {
    console.warn("null......");
    return false; 
  }

  t.cur = 0;
  t.min = 0;
  t.max = 0;

  if (t.length == 1) {
    if (t.curStart != INVALID_POSIONT) {
      t.cur = data[t.curStart] & 0xFF;
    }
    if (t.minStart != INVALID_POSIONT) {
      t.min = data[t.minStart] & 0xFF;
    }
    if (t.maxStart != INVALID_POSIONT) {
      t.max = data[t.maxStart] & 0xFF;
    }
  } else if (t.length == 2) {
    if (t.curStart != INVALID_POSIONT) {
      t.cur = getShortFromData(data.slice(t.curStart, t.curStart + 2)) & 0xFFFF;
    }
    if (t.minStart != INVALID_POSIONT) {
      t.min = getShortFromData(data.slice(t.minStart, t.minStart + 2)) & 0xFFFF;
    }
    if (t.maxStart != INVALID_POSIONT) {
      t.max = getShortFromData(data.slice(t.maxStart, t.maxStart + 2)) & 0xFFFF;
    }
  } else {
    return false;
  }

  // 根据dot将单片机值转换成真实值
  t.cur /= Math.pow(10, t.dot);
  t.min /= Math.pow(10, t.dot);
  t.max /= Math.pow(10, t.dot);

  return true;
}

let json = "";

var Body = function Body(data) {
  if (data == null) {
    data = xxx;
  }
  console.warn("Body");
  mList.push(年龄);
  mList.push(身高);
  mList.push(体重);
  mList.push(_5k电阻);
  mList.push(_50k电阻);
  mList.push(_250k电阻);
  mList.push(体脂肪量);
  mList.push(骨骼肌);
  mList.push(身体水分);
  mList.push(蛋白质);
  mList.push(无机盐);
  mList.push(左上肢肌肉量);
  mList.push(右上肢肌肉量);
  mList.push(躯干肌肉量);
  mList.push(左下肌肉量);
  mList.push(右下肌肉量);
  mList.push(左上脂肪量);
  mList.push(右上脂肪量);
  mList.push(躯干脂肪量);
  mList.push(左下脂肪量);
  mList.push(右下脂肪量);
  mList.push(BMI);
  mList.push(体脂百分比);
  mList.push(腰臀比);
  mList.push(内脏面积.setMin(0).setMax(800)); // hardcode number
  mList.push(评分);
  mList.push(基础代谢);
  mList.push(总能耗);
  mList.push(去脂体重);
  mList.push(肌肉量);
  mList.push(细胞外液含量);
  mList.push(细胞内液含量);
  mList.push(水肿系数);
  mList.push(体型分析);
  mList.push(身体年龄);
  console.log(mList);

  for (let t of mList) {
    let ret = parse(t, data);
    if (!ret) { 
      console.error(" parse error !!!!!!!!!", t);
      break;
    }
  }

  console.log(mList);

  // 转换成json对象
  // 体重/骨骼肌/体脂率/BMI/体脂肪量/肌肉量/身体水分/内脏面积/蛋白质/无机盐
  let mpjson = {
    "bmi": {
      cur: BMI.cur,
      min: BMI.min,
      max: BMI.max,
    },
    "weight": {
      cur: 体重.cur,
      min: 体重.min,
      max: 体重.max,
    },
    "gugeji": {
      cur: 骨骼肌.cur,
      min: 骨骼肌.min,
      max: 骨骼肌.max,
    },
    "tizhilv": {
      cur: 体脂百分比.cur,
      min: 体脂百分比.min,
      max: 体脂百分比.max,
    },
    "tizhifangliang": {
      cur: 体脂肪量.cur,
      min: 体脂肪量.min,
      max: 体脂肪量.max,
    },
    "jirouliang": {
      cur: 肌肉量.cur,
      min: 肌肉量.min,
      max: 肌肉量.max,
    },
    "shentishuifen": {
      cur: 身体水分.cur,
      min: 身体水分.min,
      max: 身体水分.max,
    },
    "neizangmianji": {
      cur: 内脏面积.cur,
      min: 内脏面积.min,
      max: 内脏面积.max,
    },
    "danbaizhi": {
      cur: 蛋白质.cur,
      min: 蛋白质.min,
      max: 蛋白质.max,
    },
    "wujiyan": {
      cur: 无机盐.cur,
      min: 无机盐.min,
      max: 无机盐.max,
    }
  }

  // 模拟数据
  // util.randomNum(50, 120)
  if (getApp().globalData.debug) {
    mpjson = {
      "bmi": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "weight": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "gugeji": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "tizhilv": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "tizhifangliang": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "jirouliang": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "shentishuifen": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "neizangmianji": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "danbaizhi": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      },
      "wujiyan": {
        cur: util.randomNum(50, 120),
        min: util.randomNum(50, 120),
        max: util.randomNum(50, 120),
      }
    }
  }
  json = mpjson;
  // json: qr:{database64:sfaljs===}, mp:{"无机盐":{min: 22.2, max: 22,3, cur: 23.2}}
  console.log(json);
};

Body.prototype.getMpJson = function () {
  return json
};

module.exports = Body;