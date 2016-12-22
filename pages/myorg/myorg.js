//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    show:1,
    off:0,
    mydata:{
      avatar:'/src/coveravatar.png',
      nickName:'爱是不可名zhide cuowu',
      steps:6667843,
      likes:456,
      unlikepic:'/src/unlike.png',
      likepic:'/src/liked.png',
      grade:3

    },
    mymonthdata:{
      avatar:'/src/coveravatar.png',
      nickName:'爱是不可名zhide cuowu',
      steps:66678243,
      likes:4545,
      unlikepic:'/src/unlike.png',
      likepic:'/src/liked.png',
      grade:3

    },
    friendsdata:{
        1:{
        avatar:'/src/avatar_1.png',
        nickName:'wu',
        steps:11143,
        likes:456,
        grade:3,
         },
        2:{
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
         }
    },
     friendsmonthdata:{
        1:{
        avatar:'/src/avatar_1.png',
        nickName:'wu',
        steps:117143,
        likes:456,
        grade:3,
         },
        2:{
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
         },
         3:{
        avatar:'/src/avatar_1.png',
        nickName:'爱是不可名zhide cuowu',
        steps:66843,
        likes:456,
        grade:12,
         }
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showToday:function(){
    this.setData({
      show:1,
      off:0
    })

  },
  showMonth:function(){
    this.setData({
      show:0,
      off:1
    })
  },
  onLoad: function () {
    console.log('onLoad');
    console.log('onLoadmyorg');

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
     //  wx.request({
 //  url: 'test.php', //仅为示例，并非真实的接口地址
 //  data: {
 //     user_phone:'13823612077',
        // org_code: 'aipao'
 //  },
 //  header: {
 //      'content-type': 'application/json'
 //  },
 //  success: function(res) {
 //      that.setData({
 //        mydata:res.mydata,
 //        mymonthdata:res.mymonthata,
 //        friendsdata:res.friendsdata,
 //        friendsmonthdata:res.friendsmonthdata
 //      })   
 //  },
 //  error:function(res){
 //     console.log(res.data)
 //  }
 // })
  }
})
