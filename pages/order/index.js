
Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        title: "全部",
        isActive: true
      },
      {
        id: 1,
        title: "待付款",
        isActive: false
      },
      {
        id: 2,
        title: "待发货",
        isActive: false
      },
      {
        id: 3,
        title: "退款/退货",
        isActive: false
      }
    ]
  },
  handleTabsItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false

    });
    this.setData({
      tabs
    })

  }
})