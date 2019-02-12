// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

function formatTime(intdate) {
  var date = new Date(intdate);
  var Month = date.getMonth() + 1;
  var Day = date.getDate();
  var hours = date.getHours(); //计算剩余的小时
  var minutes = date.getMinutes(); //计算剩余的分钟
  var Y = date.getFullYear() + '-';
  var M = Month < 10 ? '0' + Month + '-' : Month + '-';
  var D = Day + 1 < 10 ? '0' + Day + '' : Day + '';
  var H = hours < 10 ? '0' + hours + ':' : hours + ':'
  var m = minutes < 10 ? '0' + minutes : minutes;
  return M + D + " " + H + m;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * array转换成16进制字符串
 */
function bytesToHex(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16).toUpperCase()).slice(-2);
  }).join(' ')
}

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
} 

module.exports = {
  formatTime: formatTime,
  randomNum: randomNum,
  bytesToHex: bytesToHex
}
