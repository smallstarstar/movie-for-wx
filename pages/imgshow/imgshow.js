// pages/imgshow.js
const services = require('../services/services-movies.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgId: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    dataLit: [],
    swiperIndex: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg(e) {
      // var data = JSON.stringify(e.currentTarget.dataset.item);
      // console.log(e.currentTarget.dataset.item._id)
      wx.navigateTo({
        url: '../details/details?data=' + e.currentTarget.dataset.item._id,
      })
    }
  },
  observers: {
    async imgId(e) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      });
      let pageInfo = {};
      pageInfo.page = 1;
      pageInfo.size = 5;
      pageInfo.titleId = e;
      this.setData({dataLit:[]})
      let data = await services.getMoviceByPageAndSizeAndTitleId(pageInfo);
      if (data) {
        this.setData({
          dataLit: data.val
        });
        wx.hideToast();
      }
    }
  }
})