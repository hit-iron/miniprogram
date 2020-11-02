
Page({
  data: {
    tabs: [{
      id: 0,
      title: "商品收藏",
      isActive: true
    }, {
      id: 1,
      title: "品牌收藏",
      isActive: false
    }, {
      id: 2,
      title: "店铺收藏",
      isActive: false
    }, {
      id: 2,
      title: "浏览足迹",
      isActive: false
    }],
    collect: []
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false

    });
    this.setData({
      tabs
    })

  },
  onShow: function () {
    let collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })

  }
})