Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 1,
    latestArtList: [
      {
        id: '0',
        agree: '10',
        title: '坐月子时婆婆送我一箱泡面吃，现她生病，我送一箱泡面一箱火腿肠',
        content: '跟老公结婚5年，孩子3岁，今天老公打电话说婆婆生病我不照顾，还送一箱泡面一箱火腿，气的他开始威胁我，说我再不用心照顾他妈就要跟我离婚...'
      },
      {
        id: '1',
        agree: '15',
        title: '我的老公年薪三十万 可他在我眼里就是废物一个',
        content: '我们在外人看来是很不错的家庭，一个可爱的女儿，定居北京，有房有车，他在银行工作，年薪差不多30万...'
      }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})