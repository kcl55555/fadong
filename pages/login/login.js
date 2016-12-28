//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    orgInfo:{
      1:{
        org_name:'爱跑体育',
        org_avatar:'/src/avatar.jpg'
      }

    }
  },
  //事件处理函数
  bindViewTap2: function() {
    wx.navigateTo({
      url: '../myorg/myorg'
    })
  },
  bindViewTap: function() {
   app.onLaunch();
  },
  linktomyorg:function(){
    wx.navigateTo({
      url: '../myorg/myorg'
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
    
  //  wx.request({
  //  url: 'http://127.0.0.1:5757/getOrg', 
  //  data: {
  //     user_phone:13516721842
  //  },
  //  method: 'POST',
  //  type: 'cors',//'jsonp',
  //  header: {
  //      'content-type': 'application/json'
  //  },
  //  success: function(res) {
  //      that.setData({
  //        orgInfo:{
  //     1:{
  //       org_name:'陪你跑',
  //       org_avatar:'/src/avatar.jpg'
  //     }

  //   }
  //      })   
  //     // console.log('tiaoyongcengong')
  //  },
  //  error:function(res){
  //     console.log(res.data)
  //  }
  // })
     
  }

})
