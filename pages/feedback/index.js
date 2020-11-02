Page({
  data: {
    tabs: [
      {
        id: 0,
        title: "体验问题",
        isActive: true
      },
      {
        id: 1,
        title: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""

  },
  UpLoadImgs: [],
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  // 点击 “+” 选择图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },
  // 点击 自定义图片组件
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    // 判断有没有需要上传的图片数组

    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            if (i === chooseImgs.length - 1) {

              wx.hideLoading();


              console.log("把文本的内容和外网的图片数组 提交到后台中");
              this.setData({
                textVal: "",
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1
              });

            }
          }
        });
      })
    } else {
      wx.hideLoading();

      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });

    }
  }
})