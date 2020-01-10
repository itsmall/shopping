import {
  request
} from "../../request/index.js";
// import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MenuList: [],
    content: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    0web中的本地存储和小程序中的本地存储的区别
      1写代码的方式不一样了
          web: localStorage.setItem( "key", "value") localStorage . getItem("key" )
        小程序: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候有没有做类型转换
          web:不管存入的是什么类型的数据，最终都会先调用以下toString(), 把数据变成了字符串再存入进去
        小程序:不存在类型转换的这个操作存什么类似的数据进去，获取的时候就是什么类型

     *思路
     *先判断本地存储中有没有就的数据
     *{time：data.now(),data:[...]}
     *没有旧数据 直接发送新请求
     *有旧数据 同时旧数据页没有过期 就直接使用本地存储中的旧数据
     */
    // 1.获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    //2.判断
    if (!Cates) {
      //不存在 发送请求数据
      this.getCates();
    } else {
      //
      if (Date.now() - Cates.time > 1000 * 300) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        //构造菜单数据
        let MenuList = this.Cates.map(v => v.cat_name);
        //商品数据
        let content = this.Cates[0].children;
        this.setData({
          MenuList,
          content
        })
      }

    }



  },
  /* async */
  getCates() {
    request({
      url: '/categories'
    }).then(result => {
      this.Cates = result;
      // 把接口的数据存入本地数据存储中
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.Cates
      });
      //构造菜单数据
      let MenuList = this.Cates.map(v => v.cat_name);
      //商品数据
      let content = this.Cates[0].children;
      this.setData({
        MenuList,
        content
      })
    })

    /* // 使用es7的 async  await来发送请求
    const result = await request({
      url: '/categories'
    });
    this.Cates = result.data.message;
    // 把接口的数据存入本地数据存储中
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });
    //构造菜单数据
    let MenuList = this.Cates.map(v => v.cat_name);
    //商品数据
    let content = this.Cates[0].children;
    this.setData({
      MenuList,
      content
    }) */


  },
  handleItemTap(e) {
    /**
     * 获取点击菜单的index
     * 修改currentIndex的值
     * 修改content的值
     */
    const {
      index
    } = e.currentTarget.dataset;
    let content = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      content,
      scrollTop: 0
    })
  }
})
