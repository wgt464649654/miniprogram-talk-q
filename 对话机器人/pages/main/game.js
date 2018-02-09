Page({
  data: {
    userLeft: 5,
    addNum: 1.5,
    showStartButtom: true,
    startButtomText: '开始',
    showLevel: true
  },

  run: function() {
    if (this.data.userLeft >= (90 - this.data.addNum)) {
      this.setData({
        userLeft: 90
      })
      if ((new Date().getTime() - this.data.startTime) / 1000 < this.data.level) {
        this.setData({
          result: 'win'
        })
      } else {
        this.setData({
          result: 'lose'
        })
      }
      this.setData({
        canRun: false,
        showStartButtom: true,
        startButtomText: '重新开始',
        userLeft: 5,
        addNum: 2,
        robotClass: '',
        victoryTime: new Date().getTime(),
      })
      return;
    }
    this.setData({
      userLeft: this.data.userLeft + this.data.addNum
    })
  },

  start: function() {
    if (!this.data.level) {
      return;
    }
    this.setData({
      canRun: true,
      robotClass: 'robotr-run-' + this.data.level,
      showStartButtom: false,
      startTime: new Date().getTime()
    })
    if (Math.floor(Math.random() * 10) > 5) {
      setTimeout(() => {
        this.setData({
          reward: {
            name: '闪现'
          }
        })
      }, 5000)
      setTimeout(() => {
        this.setData({
          reward: ''
        })
      }, 6000)
    }
  },

  close: function() {
    if ((new Date().getTime() - this.data.victoryTime)/1000 < 1.2) {
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

  selectLevel: function(e) {
    this.setData({
      level: e.currentTarget.dataset.level,
      levelText: e.currentTarget.dataset.text,
      showLevel: false
    })
  },

  reSelectLevel: function() {
    this.setData({
      showLevel: true
    })
  },

  getReward: function(e) {
    let name = e.currentTarget.dataset.reward;
    if (name == '闪现') {
      this.setData({
        userLeft: this.data.userLeft + 10,
        reward: ''
      })
    }
  }
})