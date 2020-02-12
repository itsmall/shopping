//同时发送异步代码的次数
let ajaxTimes = 0;
export const request = (params) => {
  // 判断url中是否带有/my/ 请求的是私有的路径 带上header token
  let header = {...params.header};
  if (params.url.includes("/my/")) {
    // 拼接header 带上token
    header["Authorization"] = wx.getStorageInfoSync("token");
  }

  ajaxTimes++;
  //显示加载中 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })


  // 定义公共的url
  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,header,
      url: baseUrl + params.url,
      success: (result) => {

        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        // 关闭正在加载中的图标
        if (ajaxTimes === 0) wx.hideLoading();
      }
    });
  })
}