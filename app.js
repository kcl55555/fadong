//app.js
App({
  onLaunch: function () {

  
      //mock一下数据
 var that=this
  
                   that.toPage('index');

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({                       //微信登录接口
      success: function(res) {

        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },
            header: {
             'content-type': 'application/json'
            },
            success: function(res) {// res的data里面应包含这几个字段：bindphone: true/false, 3rd_session: xxx, orgInfo:[{name:陪你跑, avatar: '...xx.jpg'}]
               wx.setStorage({
                key: 'fadong_session',
                data: res.data.fadong_session
              })//储存用户 3rd_session

              wx.setStorage({
                key: 'orgInfo',
                data: res.data.orgInfo
              }); //储存用户的组织信息

             // wx.setStorage({
             //    key: 'bindphone',
             //    data: res.data.bindphone
             //  }); //储存用户的组织信息
  
    //以下决定进入那个页面

          if(res.data.bindphone){ //如果用户已经绑定过手机号码
               
                if(res.data.orgInfo.length==1){
                   that.toPage('myorg')
                }
                else{
                   that.toPage('login')
                }

          }else{
                   that.toPage('index')
          }


            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        
      }
    });
  },
 
 toPage:function(page){
    wx.redirectTo({
      url: 'pages/'+page+'/'+page
    })
 },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})