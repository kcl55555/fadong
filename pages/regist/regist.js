//index.js
//获取应用实例 
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    btn_text:'获取验证码',
    btn_second:'',
    disabled: false,
    only_phone: '13516721842', //防止用户获取完验证码后再次更换手机号的字段
    phone: '13516721842',
    countbegin: false, //是否在倒数计时中，防止二次输入的bug.
    testNum: 'love',
    inputNUm: '123456',
    error: false,
    fadong_session: ''
  },
  sendmsg:function(){//点击发送验证码按钮动作
      var that=this;
      console.log(that.data.phone);
       that.setData({
                 error: false
             });
        wx.request({
          url: 'https://44165841.peinipao.wang/smsVerify', //服务端的接口
          type: 'cors',//代表跨域
          method: 'GET',
          data: {
             
             user_phone: that.data.phone
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
             that.sendSuccess();
             console.log(res.data);
             that.setData({
                 testNum: res.data, //填写正确的返回的验证码的字段
                 only_phone: that.data.phone   
             });
          }
    });

 },
 
 inputTest:function(e){
   var that=this;
   that.setData({
       inputNUm: e.detail.value,
       error: false
   });
 },
 submitTest: function(){
  // wx.redirectTo({
  //     url: '../login/login'
  //   });
 wx.setStorage({
                key: 'fadong_session',
                success:function(res){
                    that.setData({
                      fadong_session: res.data
                    })
                }
              })//获取fadong_session
  var that=this;
     if(1){//that.data.inputNUm==that.data.testNum && that.data.only_phone==that.data.phone){
        
      wx.request({
        url:'https://44165841.peinipao.wang/bindPhone',
        method: 'POST',
        data:{
          user_phone: that.data.only_phone,
          fadong_session: that.data.fadong_session,
          avatar:'a',
          nickname:'b'
        },
        success:function(res){
           wx.setStorage({
                key: 'orgInfo',
                data: res.data.orgInfo
              }); //储存用户的组织信息
           wx.navigateTo({
            url: '../login/login'
           });
           that.setData({
            testNum: 'love'
          })

        }
      })    
     }
     else{
        that.setData({
          error: true
        })
     }
 },
  phoneInput:function(e){//监听输入手机号码动作
    var that=this
     if((/^1[34578]\d{9}$/.test(e.detail.value)) && !that.data.countbegin){
          that.setData({
            disabled: false,
            phone: e.detail.value,
            error: false
        });
          
     }
  }, 
  sendSuccess:function(){// 验证码发送成功回调函数
    var that=this

        that.setData({
          btn_text:'s后重发',
          btn_second:'60',//此处可定义多少秒后重新发送短信
          disabled: true,
          countbegin: true
        });

    var second=that.data.btn_second;
    var timer=setInterval(function(){//倒数计时器
        second--;
      if(second>=0)
          {
            that.setData({
              btn_second:second
            });
          }
      else
        {
          clearInterval(timer);
          that.setData({
            btn_text:'获取验证码',
            btn_second:'',
            disabled: false
          });
        }


    },1000);

      wx.showToast({
        title: '验证码发送成功，请注意查收',
        icon: 'success',
        duration: 2000
      });

  },
  onLoad: function () {
    console.log('onLoad')
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(
      function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });

  }

})
