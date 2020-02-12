// pages/login/index.js
Page({
  handleGetUserInfo(e) {
    // console.log(e.detail);
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    // 返回
    wx.navigateBack({
      delta: 1
    });
  }
})