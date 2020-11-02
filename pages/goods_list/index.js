import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
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