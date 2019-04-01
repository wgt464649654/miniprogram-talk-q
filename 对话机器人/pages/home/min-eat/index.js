/**
 * list [
 *  category 分类名称
 *  index 列表中序号 必须从0开始连续
 *  data: [
 *    {
 *      name 商品名称
 *      likeNums 喜欢次数
 *      createUser 创建者
 *      describe 描述
 *      type 同category
 *      id
 *    }
 *  ],
 * ]
 */
const app = getApp()
Page({
  data: {
    TabCur: 0, // 当前类目
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    loading: true, // 页面初始化加载
    urls: [
      '../../../images/together1.jpg',
      '../../../images/together2.jpg',
      '../../../images/together3.jpg',
    ]
  },
  onLoad() {
    const that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bfd184eb9f1023cf648fe55/wgt/eat/list',
      success(res) {
        const list = res.data.data;
        that.setData({
          loading: false,
          list,
          listCur: list[0]
        })
      }
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].index);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].index - 1) * 50,
          TabCur: list[i].index
        })
        return false
      }
    }
  },
  // 点赞
  like(e) {
    const id = e.target.dataset.id;
    const list = this.data.list
    let whichItem = null;
    list.some(e => {
      if (e.data) {
        return e.data.some(item => {
          if (item.id === id) {
            whichItem = item;
            return  true;
          } else {
            return false;
          }
        })
      } else {
        return false;
      }
    })
    whichItem.likeNums = (whichItem.likeNums || 0) + 1
    this.setData({
      list
    })
  },
  // 展示图片
  showImgs(e) {
    const detailImgs = e.currentTarget.dataset.imgs
    if (detailImgs && detailImgs.length > 0) {
      console.log(detailImgs)
      this.setData({
        showDetailImgs: true,
        detailImgs
      })
    }
  },
  // 隐藏图片
  hideModal(e) {
    this.setData({
      showDetailImgs: false,
      detailImgs: []
    })
  },
})