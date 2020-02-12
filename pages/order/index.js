import {
  request
} from '../../request/index';

import
regeneratorRuntime
from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabs: [{
        id: 1,
        value: "全部订单",
        isActive: true
      },
      {
        id: 2,
        value: "待付款",
        isActive: false
      },
      {
        id: 3,
        value: "待收货",
        isActive: false
      }, {
        id: 4,
        value: "退货/退款",
        isActive: false
      }
    ],
    orders: []
  },
  handleTabsItemChange(e) {

    const index = e.detail;

    this.changeTitleByIndex(index);

  },
  changeTitleByIndex(index) {
    let {
      tabs
    } = this.data;

    tabs.forEach((v, i) => i === index ?
      v.isActive = true : v.isActive = false);

    this.setData({
      tabs
    })
  },
  onShow(options) {
    //判断 是否存在token
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }
    // 获取当前小程序的页面栈-数组 长度最大是10页面
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    const {
      type
    } = curPage.options;
    console.log(type);

    this.changeTitleByIndex(type - 1);
    // this.getOrders(type);

  },
  // 获取订单列表的方法
  async getOrders(type) {

    const res = await request({
      url: '/my/order/all',
      data: {
        type
      }
    });

    this.setData({
      orders: res.orders.map(v => ({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString)
      }))
    })


  }
})