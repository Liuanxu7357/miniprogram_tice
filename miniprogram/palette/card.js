export default class LastMayday {
  palette(time, gugeji, tizhilv, gugeji_thumb, tizhilv_thumb, addr, tel) {
    return ({
      width: '833rpx',
      height: '1000rpx',
      background: '#FFFF00',
      views: [
        _textDecoration('我的体测:', 0),
        _textDecoration('underline', 1),
        _textDecoration('line-through', 2),
        _textDecoration('overline underline line-through', 3, 'red'),
        _image(0),
        _des(0, '普通'),
        _image(1, 30),
        _des(1, 'rotate: 30'),
        _image(2, 30, '20rpx'),
        _des(2, 'borderRadius: 30rpx'),
        _image(3, 0, '60rpx'),
        _des(3, '圆形'),
        { //背景
          type: 'image',
          url: '/images/background.jpg',
          css: {
            width: '833rpx',
            height: '1000rpx',
          },
        },
        {
          type: 'image',
          url: '/images/qrcode.jpg',
          css: {
            bottom: '40rpx',
            right: '120rpx',
            width: '120rpx',
            height: '120rpx',
          },
        },
        {
          type: 'text',
          text: time,  //时间
          css: {
            top: '60rpx',
            fontSize: '36rpx',
            left: '380rpx',
          },
        },
        {
          type: 'image', //骨骼肌 手势
          url: gugeji_thumb,
          css: {
            width: '60rpx',
            height: '60rpx',
            top: '220rpx',
            right: '100rpx',
          },
        },
        {
          type: 'image', //体脂率 手势
          url: tizhilv_thumb,
          css: {
            width: '60rpx',
            height: '60rpx',
            top: '520rpx',
            right: '100rpx',
          },
        },
        {
          type: 'text',
          text:  gugeji,  //骨骼肌内容
          css: {
            top: '320rpx',
            fontSize: '34rpx',
            left: '420rpx',
          },
        },
        {
          type: 'text',
          text: tizhilv,  //体脂率内容
          css: {
            top: '600rpx',
            fontSize: '34rpx',
            left: '420rpx',
          },
        },
    
        {
          type: 'text',
          text: addr,  //地址
          css: {
            bottom: '100rpx',
            fontSize: '31rpx',
            left: '240rpx',
          },
        },
        {
          type: 'text', //电话
          text: tel,
          css: {
            bottom: '40rpx',
            fontSize: '31rpx',
            left: '240rpx',
          },
        },
      ],
    });
  }
}

const startTop = 50;
const startLeft = 20;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '40rpx',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return (
    {
      type: 'image',
      url: '/palette/avatar.jpg',
      css: {
        top: `${startTop + 8.5 * gapSize}rpx`,
        left: `${startLeft + 160 * index}rpx`,
        width: '120rpx',
        height: '120rpx',
        shadow: '10rpx 10rpx 5rpx #888888',
        rotate: rotate,
        borderRadius: borderRadius,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}