//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    fadong_session: '',
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
    wx.getStorage({
      key:'fadong_session',
      success:function(res){
          that.setData({
            fadong_session: res.data
          })
      }
    });
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    wx.request({
      url:'like_list.php',
      data:{fadong_session: that.data.fadong_session},
      method:'POST',
      success:function(res){
          that.setData({
            list: res.data
          })
      }
    })
  }
})
