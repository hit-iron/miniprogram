//Page Object
import { request } from "../../request/index.js"
Page({
  data: {
    swiperList: [{
      img: "https://api-hmugo-web.itheima.net/pyg/banner1.png",
      navigator_url: "/pages/goods_list/index?cid=929"
    }, {
      img: "https://api-hmugo-web.itheima.net/pyg/banner2.png",
      navigator_url: "/pages/goods_list/index?cid=12"
    }, {
      img: "https://api-hmugo-web.itheima.net/pyg/banner3.png",
      navigator_url: "/pages/goods_list/index?cid=421"
    }],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // this.getSwiperList();
    this.getCateList();
    this.getFloorList()
  },
  // 获取轮播图数据
  // getSwiperList() {
  //   request({ url: "/home/swiperdata" })
  //     .then(result => {
  //       this.setData({
  //         swiperList: result
  //       })
  //     })
  // },
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
  }
});
