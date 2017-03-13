//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    orgInfo:[],
    fadong_session:''
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
  linktomyorg:function(e){
    var that=this
    var org_id=e.currentTarget.dataset.org_id;
    wx.setStorage({
      key: 'org_id',
      data: org_id
    });

    that.toPage('myorg')
    
  },
   toPage:function(page){
    wx.redirectTo({
      url: '../'+page+'/'+page
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
      key: 'orgInfo',
      success:function(res){
          that.setData({
            orgInfo: res.data
          })

         if(res.data.length==1){
          // console.log('我的长度真的是'+res.data.length)
            that.toPage('myorg')
            
         }
      }
    });
     wx.setStorage({
                key: 'fadong_session',
                success:function(res){
                    that.setData({
                      fadong_session: res.data
                    })
                }
              })//获取fadong_session

     
  }

})
