/*
1输入框绑定值改变事件input事件
  1获取到输入框的值
  2合法性判断.
  3检验通过把输入框的值发送到后台
  4返回的数据打印到页面上
2防抖(定时器来实现) 
  0 防抖一般在输入框   节流一般用于下拉
  1定义全局的定时器id
*/
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
    goods: [],
    isFocus: false,
    input_value: ''
  },
  //全局的定时器id
  TimeId: -1,
  handleInput(e) {
    // 获取输入框的值
    const {
      value
    } = e.detail;
    // 2合法性判断
    if (!value.trim()) {
      //值不合法
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    //3准备发送请求数据
    //#1清除定时器id
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
    this.setData({
      isFocus: true
    })
  },
  // 获取搜索得到的数据
  async qsearch(query) {
    let res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })

    this.setData({
      goods: res
    })

  },
  handleCancel() {
    this.setData({
      input_value: '',
      isFocus: false,
      goods: []
    })
  }

})