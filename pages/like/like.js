//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    list:[
    {
      avatar: '/src/avatar_1.png',
      nickName: 'alex',
      time: '1小时前'
    },
    {
      avatar: '/src/avatar_2.png',
      nickName: 'annie',
      time: '4小时前'
    }

    ]
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
    })
  }
})
