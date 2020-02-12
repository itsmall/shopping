import {
  request
} from '../../request/index';

import
regeneratorRuntime
from '../../lib/runtime/runtime';

/**
 * +的功能
 * 
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ''
  },
  //外网的图片的路径数组
  UPLoadImgs: [],
  handleTabsItemChange(e) {
    const index = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //"+"功能
  handleChooseImg() {
    // 调用内置选择图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });

  },
  //删除图片
  handleRemoveImg(e) {
    const {
      index
    } = e.currentTarget.dataset;

    let {
      chooseImgs
    } = this.data;

    // 删除
    chooseImgs.splice(index, 1)

    this.setData({
      chooseImgs
    })
  },
  //获取文本域的内容
  handleInputText(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  //提交
  async handleFormSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data;
    if (!textVal.trim()) {
      //不合法
      wx.showToast({
        title: '输入不合法！！！',
        icon: 'none',
        mask: true
      });
      return;
    }

    // wx.request({
    //   url: 'https://images.ac.cn/api/upload',
    //   data: {
    //     "apiType": "this",
    //     "image": chooseImgs
    //   },
    //   header: {
    //     'content-type': 'application/json',
    //     "token": "5f40b5e3a9f47380cccd300c215d"
    //   },
    //   method: 'post',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (res) => {
    //     let url = JSON.parse(res.data);
    //   }
    // });


    wx.showLoading({
      title: "正在加载中。。。",
      mask: true
    });

    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {

        wx.uploadFile({
          //上传的路径
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          //上传文件路径
          filePath: v,
          //上传文件的名称
          name: 'file',
          //顺带文本信息
          formData: {},
          success: (res) => {
            console.log(res);

            // let url = JSON.parse(res.data.url);
            // this.UPLoadImgs.push(url)

            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              console.log("把文本和图片数组提交到后台");
              //重置
              this.setData({
                textVal: '',
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1
              });

            }
          }
        });
      });
    }else{
      wx.hideLoading();
              console.log("把文本提交到后台");
              //重置
              this.setData({
                textVal: '',
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1
              });
    }
    



  }
})