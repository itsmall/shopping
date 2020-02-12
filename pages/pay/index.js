import {
  request
} from "../../request/index";
import {
  requestPayment,
  showToast
} from "../../utils/asyncWX";

import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    const address = wx.getStorageSync("address");
    //总结个
    let totalPrice = 0;
    //总数量
    let totalNum = 0;
    cart.forEach(v => {
      totalNum += v.num;
      totalPrice += v.num * v.goods_price;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  async handleOrderPay() {


    try {
      // 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      // console.log("token已拿到");
      // 创建订单
      //头
      // const header = {
      //   Authorization: token
      // };
      //参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      };
      //创建订单 获取订单编号

      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        data: orderParams,
        method: 'post'
      });

      //发起预支付接口
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        data: {
          order_number
        },
        method: "post"
      });

      //发起微信支付
      await requestPayment(pay);

      //查询后台 订单状态
      const res = await request({
        url: "/my/orders/chkOrder",
        data: {
          order_number
        },
        method: "post"
      });
      await showToast("支付成功");

      //手动删除已支付的数据
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.getStorageSync("cart", newCart);

      //跳转到订单页面
      wx.navigateTo({
        url: '/pages/oreder/index'
      });

    } catch (error) {
      await showToast("支付失败");

      console.log(error);
    }


  }

})