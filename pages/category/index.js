import { request } from "../../request/index.js"
Page({
  data: {
    leftMunuList: [],
    rightContent: [],
    // 被选中的当前索引
    currentIndex: 0,
    scrollTop: 0

  },
  // 分类接口返回的所有数据
  Cates: [],
  // 获取分类数据
  getCategoryList() {
    request({ url: "/categories" })
      .then(res => {
        this.Cates = res;
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })

      })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      // 右边数据
      rightContent,
      scrollTop: 0
    });

  },
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCategoryList();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCategoryList();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,

        })
      }
    }
  }
})