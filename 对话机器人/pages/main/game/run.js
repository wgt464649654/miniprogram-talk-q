Page({
  data: {
    userLeft: 5,
    addNum: 1.5,
    showStartButtom: true,
    startButtomText: '开始',
    showLevel: true,
  },

  run: function () {
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

  start: function () {
    if (!this.data.level || this.data.showLevel) {
      return;
    }
    this.setData({
      canRun: true,
      robotClass: 'robotr-run-' + this.data.level,
      showStartButtom: false,
      startTime: new Date().getTime()
    })
    let random = Math.floor(Math.random() * 10)
    let reward = {}
    if (random < 2) {
      reward = ['闪现']
    } else if (random < 4) {
      reward = ['后退']
    } else if (random < 6) {
      reward = ['后退', '闪现']
    } else if (random < 8) {
      reward = ['闪现', '后退']
    } else if (random < 9) {
      reward = ['闪现', '闪现']
    } else if (random < 10) {
      reward = ['后退', '后退']
    }
    setTimeout(() => {
      this.setData({
        reward: reward
      })
    }, 3000)
    setTimeout(() => {
      this.setData({
        reward: ''
      })
    }, 5000)
  },

  close: function () {
    if ((new Date().getTime() - this.data.victoryTime) / 1000 < 1) {
      return;
    }
    this.setData({
      result: ''
    })
  },

  onShow: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },

  selectLevel: function (e) {
    this.setData({
      level: e.currentTarget.dataset.level,
      levelText: e.currentTarget.dataset.text,
      showLevel: false
    })
  },

  reSelectLevel: function () {
    this.setData({
      showLevel: true
    })
  },

  getReward: function (e) {
    let name = e.currentTarget.dataset.reward;
    let reward = this.data.reward;
    if (name.indexOf('闪现') > -1) {
      console.log(reward)
      reward.splice(reward.indexOf('闪现'), 1)
      this.setData({
        userLeft: this.data.userLeft + 10,
        reward: reward
      })
    } else if (name.indexOf('后退') > -1) {
      reward.splice(reward.indexOf('后退'), 1)
      this.setData({
        userLeft: this.data.userLeft > 10 ? this.data.userLeft - 5 : 5,
        reward: reward
      })
    }
  }
})