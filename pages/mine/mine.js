//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    hum_num: 6,
    half_hum: 1,
    monthdata:[10000,10000,60000,40000,10000,30000,1000,1005,10000,20000,6563,10000,10000,10000,9000,10000,10700,10000,10000,10000,10000,10,4000,45000,10000,50000,2000,10000,10000,10000,10000,10000,],
    monthmax:60000,
    hide:true
  },
  onShareAppMessage: function () {
    return {
      title: '来看我的运动数据',
      desc: '发动-陪你跑',
      path: '/page/mine/mine'
    }
  },
  showModal:function(){
      wx.showModal({
        title: '确定退出？',
        content: '如若退出该公司，您的数据将不显示在该公司列表中',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定');
             wx.redirectTo({
            url: '../index/index'
             });
          };
         
        }
      })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  wx.getStorage({
  key: 'namecode',
  success: function(res) {
      console.log('打印出来的东西是：'+res.data)
  } 
});
  wx.getStorage({
  key: 'hidebtn',
  success: function(res) {
      that.setData({
        hide: res.data
      });
      console.log(that.data.hide);
  } 
})
  }
})
