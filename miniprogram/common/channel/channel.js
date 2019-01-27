const selectChannel = function (e) {
  let select_from = e.currentTarget.dataset.from;
  switch (select_from) {
    case 'A':
      this.setData({
        channelState: 0
      });
      break;
    case 'all':
      this.setData({
        channelState: 1
      });
      break;
    case 'B':
      this.setData({
        channelState: 2
      });
      break;
  }
}

module.exports = {
  selectChannel: selectChannel
}