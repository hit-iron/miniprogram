import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx.js"
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 点击 收货地址
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },
  // 购物车商品点击事件
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },
  // 全选复选框事件
  handleItemAllCheck() {
    let { allChecked, cart } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 购物车相关计算
  setCart(cart) {
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({ cart, allChecked, totalPrice, totalNum });
    wx.setStorageSync("cart", cart);
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    let { cart } = this.data;
    const { id, operation } = e.currentTarget.dataset;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 结算事件
  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" });
      return;
    }
    if (totalNum === 0) {
      await showToast({ title: "您还没有选购商品" });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  },
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
    this.setData({ address });

  }
})