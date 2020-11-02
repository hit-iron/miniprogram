
Page({
  data: {
    userInfo: {},
    collectNums: 0
  },
  onShow: function () {
    const userInfo = wx.getStorageSync("userinfo");
    let collect = wx.getStorageSync("collect");
    const collectNums = collect.length;
    this.setData({
      userInfo,
      collectNums
    })
  }
})