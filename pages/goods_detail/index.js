// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } =
    options;
    this.getGoods_Detail(goods_id);

  },
  // 点击轮播图 放大预览
  handlePrevewImage(e) {
    // 构造要预览的图片数组
    const urls = this.goodsInfo.pics.map(v => v.pics_mid);
    //接收传递过来的图片 url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({ 
      current,
      urls
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getGoods_Detail(goods_id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    }).then(res => {
      this.goodsInfo = res;
      this.setData({
        goodsObj: {
          pics: res.pics,
          pics_mid: res.pics_mid,
          goods_price: res.goods_price,
          goods_name: res.goods_name,
          goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
        }
      })
    })

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
