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
    urls: [
      '../../../images/aguan.jpg',
      '../../../images/amin.jpg',
      '../../../images/aguan.jpg',
      '../../../images/amin.jpg',
    ]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [
      {
        category: '小吃',
        index: '0',
        data: [
          {
            name: '煎饺',
            createUser: '敏',
            describe: '好吃',
            id: 'jianjiao'
          }
        ]
      },
      {
        category: '甜品',
        index: '1',
        data: [
          {
            name: '红糖红枣芋丸',
            likeNums: 1,
            createUser: '敏',
            id: 'hongzao'
          },
          {
            name: '布丁🍮',
            likeNums: 1,
            createUser: '观',
            id: 'buding'
          }
        ]
      },
      {
        category: '面食',
        index: '2',
        data: [
          {
            name: '葱油拌面',
            likeNums: 1,
            createUser: '敏',
            describe: '阿敏独家制作',
            id: 'congyou'
          }
        ]
      },
      {
        category: '鱼肉',
        index: '3',
        data: [
          {
            name: '沸腾虾',
            likeNums: 0,
            createUser: '观',
            describe: '费油',
            id: 'feiteng'
          },
          {
            name: '可乐鸡翅',
            likeNums: 0,
            createUser: '观',
            id: 'kele'
          }
        ]
      }
    ];
    this.setData({
      list: list,
      listCur: list[0]
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
  }
})