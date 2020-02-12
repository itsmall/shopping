import {
  request
} from "../../request/index.js";
import
regeneratorRuntime
from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  // 商品对象
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    const curPage = pages[pages.length - 1];
    let {
      options
    } = curPage;


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
  //点击加入购物车
  handleCartAdd() {
    // 1.获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2.判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);

    if (index === -1) {
      // 3.不存在 第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 4.已经存在购物车数据了  执行num++
      cart[index].num++;
    }
    // 5.把购物车重新 添加回缓存中
    wx.setStorageSync("cart", cart);
    //6.弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      // 改成 true 防止用户手抖 疯狂点击按钮
      mask: true
    });
  },
  //获取商品详情
  async getGoods_Detail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = res;


    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id)


    this.setData({
      goodsObj: {
        pics: res.pics,
        pics_mid: res.pics_mid,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })

  },
  // 收藏功能
  handleCollect() {
    let isCollect = false;

    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏',
        icon: 'seccess',
        mask: true
      });
    } else {
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'seccess',
        mask: true
      });

    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }

})