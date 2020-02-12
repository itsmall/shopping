// pages/user/index.js
Page({
  data: {
    userinfo: {},
    history: [],
    orders: []
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];

    const history = [{
        id: 0,
        his_num: 0,
        his_name: '收藏的店铺',
        url: '/pages/collect/index'
      },
      {
        id: 1,
        his_num: collect.length,
        his_name: '收藏的商品',
        url: '/pages/collect/index'
      },
      {
        id: 2,
        his_num: 0,
        his_name: '关注的商品',
        url: '/pages/collect/index'
      },
      {
        id: 3,
        his_num: 0,
        his_name: '我的足迹',
        url: '/pages/collect/index'
      }
    ]
    const orders = [{
        id: 1,
        icon: 'icon-ding_dan',
        name: '全部订单'
      },
      {
        id: 2,
        icon: 'icon-fukuantongzhi',
        name: '待付款'
      },
      {
        id: 3,
        icon: 'icon-receipt-address',
        name: '待收货'
      },
      {
        id: 4,
        icon: 'icon-tuihuotuikuan_dianpu',
        name: '退款/退货'
      }
    ];

    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      history,
      userinfo,
      orders
    })
  }
})