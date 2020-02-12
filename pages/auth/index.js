import {
  request
} from "../../request/index";

Page({

  handleGetUserInfo(e) {
    // 获取用户数据
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = e.detail;
    // 获取登录后的code
    try {

      wx.login({
        timeout: 10000,
        success: (result) => {
          const code = result.code;
          const loginParams = {
            encryptedData,
            iv,
            rawData,
            signature,
            code
          };

          request({
            url: "/users/wxlogin",
            data: loginParams,
            method: 'post'
          }).then(result1 => {
             //因为不是企业号的原因
            // const {
            //   token
            // } = result1;
           
            // wx.setStorageSync("token", token);
            wx.navigateBack({
              delta: 1
            });
          })

        }
      });
    } catch (error) {
      console.log(error);

    }


  }
})