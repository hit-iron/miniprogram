import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      title: "综合",
      isActive: true
    }, {
      id: 1,
      title: "销量",
      isActive: false
    }, {
      id: 2,
      title: "价格",
      isActive: false
    }],
    goodsList: []

  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();


  },
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })

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

  },
  // 上滑加载数据
  onReachBottom() {

    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: "没有下一页了" })
    }
    else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.setData({
      goodsList: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})