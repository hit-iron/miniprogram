// 调用ajax的次数
let ajaxTimes = 0;

export const request = (params) => {
  return new Promise((resolve, reject) => {
    ajaxTimes++;
    wx.showLoading({
      title: "加载中",
      mask: true
    });

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    wx.request({

      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();

        }
      }

    });

  })
}