//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hum_num: 6,
    half_hum: 1,
    monthdata:[10000,10000,60000,40000,10000,30000,1000,1005,10000,20000,6563,10000,10000,10000,9000,10000,10700,10000,10000,10000,10000,10,4000,45000,10000,50000,2000,10000,10000,10000,10000,10000,],
    monthmax:60000
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
    var day= new Date();
    console.log(day.getMonth()+1);
    console.log(day.getDate());
  }
})
