Page({
  data: {
    userLeft: 5,
    addNum: 1.5,
    showStartButtom: true,
    startButtomText: '开始'
  },

  run: function() {
    if (this.data.userLeft >= (90 - this.data.addNum)) {
      this.setData({
        userLeft: 90
      })
      if ((new Date().getTime() - this.data.startTime)/1000 < 10) {
        this.setData({
          result: 'win',
          canRun: false,
          showStartButtom: true,
          startButtomText: '重新开始',
          userLeft: 5,
          addNum: 2,
          robotClass: '',
          victoryTime: new Date().getTime(),
        })
      }
      return;
    }
    this.setData({
      userLeft: this.data.userLeft + this.data.addNum
    })
  },

  start: function() {
    this.setData({
      canRun: true,
      robotClass: 'robotr-run-10',
      showStartButtom: false,
      startTime: new Date().getTime()
    })
  },

  close: function() {
    if ((new Date().getTime() - this.data.victoryTime)/1000 < 2) {
      return;
    }
    this.setData({
      result: ''
    })
  },

  onShow: function() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },

})