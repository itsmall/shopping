// pages/cart/index.js
// import {
//   getSetting,
//   openSetting,
//   chooseAddress
// } from "../../utils/asyncWX";
// import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 点击收货地址
  handleChooseAddress() {
    try {
      // 获取权限scope状态码
      wx.getSetting({
        success: (result) => {
          //一些怪异的属性名使用["****"] 的形式获取属性值
          const scopeAddress = result.authSetting["scope.address"];
          if (scopeAddress === false) {
            //诱导用户打开授权页面
            wx.openSetting({
              success: (result) => {}
            });
          }
        }
      });
      //获取收货地址
      wx.chooseAddress({
        success: (result1) => {
          result1.all = result1.provinceName + result1.cityName + result1.countyName + result1.detailInfo;
          // 存入本地缓存
          wx.setStorageSync("address", result1);
        }
      });



      // const res1 = await getSetting();
      // const scopeAddress = res1.authSetting["scope.address"];

      // if (scopeAddress === true || scopeAddress === undefined) {
      //   const res2 = await chooseAddress();
      //   console.log(res2);
      // } else {
      //   await openSetting();
      //   const res3 = await chooseAddress();
      //   console.log(res3);
      // } 
    } catch (error) {
      console.log(error);

    }
  },
  // 商品的选中
  handleItemChange(e) {
    //获取id
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    //查找修改的对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //选中取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 全选功能
  handleItemAllChange() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cart = wx.getStorageSync("cart") || [];
    const address = wx.getStorageSync("address");
    this.setData({
      address
    });
    this.setCart(cart)
  },
  // 数量
  handleItemNumEdit(e) {
    // 获取传递的值
    const {
      id,
      operation
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    //查找index
    const index = cart.findIndex(v => v.goods_id === id);
    //修改
    if (cart[index].num === 1 && operation === "-1") {
      console.log(1);
      //弹窗提示
      wx.showModal({
        title: '提示',
        content: '是否要从购物车删除该商品！！',
        success: (result) => {
          if (result.confirm) {
            // 删除操作
            cart.splice(index, 1);
            this.setCart(cart);
          }
        }
      });
    } else {
      cart[index].num += (operation * 1);
      this.setCart(cart);
    }

  },
  // 结算功能
  handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址！',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {}
      });
      return;
    }
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选择要结算的商品！',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {}
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },
  setCart(cart) {
    //计算全选
    // every数组方法会遍历会接收,个回调函数那么每一个回调函数都返回true那么every方法的返回值为true
    //只要有一个回调函数返回了false那么不再循环执行,直接返回false
    //当数组的长度大于0 否则直接返回false
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    let allChecked = true;
    //总结个
    let totalPrice = 0;
    //总数量
    let totalNum = 0;

    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  }

})