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
  
  wxlogin:function(){
   wx.login({                       //微信登录接口
      success: function(res) {

        if (res.code) {
          // 发起网络请求
          console.log(res.code);
          wx.request({
            url: app.globalData.mysite+'login',
            data: {
              code: res.code
            },
            header: {
             'content-type': 'application/json'
            },
            success: function(res) {// res的data里面应包含这几个字段：bindphone: true/false, 3rd_session: xxx, orgInfo:[{name:陪你跑, avatar: '...xx.jpg',org_id: '1111'}]
               wx.setStorage({
                key: 'fadong_session',
                data:res.data.fadong_session
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
                console.log('bindphone true');
                console.log(res.data.orginfo.org);
                if(res.data.orginfo.org.length == 1){
                   wx.setStorage({
                    key: 'org_id',
                    data: res.data.orginfo.org[0].org_id
                   });

                   wx.redirectTo({
                        url: '../myorg/myorg'
                      })
                }
                else{
                   wx.redirectTo({
                        url: '../login/login'
                      })
                }

          }else{
                   console.log('bindphone false');
                   wx.redirectTo({
                        url: 'pages/regist/regist'
                      })
          }


            }
          })
        }

     else {//如果获取code失败
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        
      }
    });
 },
  onLoad: function () {
    console.log('onLoad')
    console.log(app.globalData.mysite)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(
      function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  var timer=null;
  timer=setInterval(function(){
   that.wxlogin();
   clearInterval(timer)
  },2500)

  }

})
