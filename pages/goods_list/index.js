// pages/goods_list/index.js
import {
  request
} from "../../request/index.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  totalPages: 1,
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.QueryParams
    }).then(result => {
      let goodsList = result.goods;
      //获取总页数
      this.totalPages = Math.ceil(result.total / this.QueryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList, ...goodsList]
      })
      // 关闭下拉刷新的窗口
      wx.stopPullDownRefresh();
    })
  },
  // 接受 tabs 的传值
  handleTabsItemChange(e) {
    let index = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    /* 下拉刷新页面
          1触发下拉刷新事件需要在页面的json文件中开启一个配置项找到触发下拉刷新的事件
          2重置数据数组
          3重置页码设置为1
          4.重新发送请求 */
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* 1用户上滑页面滚动条触底开始加载下一页数据
          1找到滚动条触底事件
          2判断还有没有下一页数据
            1.获取总页码
            2.获取当前页码
            3.判断当前页面是否大于等于总页数
          3假如没有下一页数据弹出一个提示
          4假如还有下一页数据来加载下一页数据 
    */

    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据了'
      });

    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }




  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
