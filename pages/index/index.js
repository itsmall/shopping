//Page Object
import {
  request
} from "../../request/index.js";

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      result.forEach(v => v.navigator_url = v.navigator_url.replace('main', 'index'));

      this.setData({
        swiperList: result
      })
    })
  },
  getCatesList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      result[0].navigator_url = '/pages/category/index';
      this.setData({
        catesList: result
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      // result['product_list'].forEach(v => v.navigator_url = v.navigator_url.replace('?query', '/index?query'));
      result.forEach(v => {
        v.product_list.forEach(v => v.navigator_url = v.navigator_url.replace('?query', '/index?query'));
      });

      this.setData({
        floorList: result
      })
    })
  },
 
});