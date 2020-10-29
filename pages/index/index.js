//Page Object
import { request } from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取分类导航数据
  getCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          cateList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
