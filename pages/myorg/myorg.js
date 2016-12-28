//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    show:1,
    off:0,
    unlikepic:'/src/unlike.png',
    likepic:'/src/liked.png',
    mydata:{
      avatar:'/src/coveravatar.png',
      nickName:'爱是不可名zhide cuowu',
      steps:6667843,
      likes:456,
      grade:3

    },
    mymonthdata:{
      avatar:'/src/coveravatar.png',
      nickName:'爱是不可名zhide cuowu',
      steps:66678243,
      likes:4545,
      grade:3

    },
    friendsdata:[
        {
        avatar:'/src/avatar_1.png',
        nickName:'wu',
        steps:11143,
        likes:456,
        grade:3,
        namecode:13811111111
         },
        {
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
        namecode:13844444444
         },
        {
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
        namecode:13844444444
         },
        {
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
        namecode:13844444444
         },
        {
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
        namecode:13844444444
         }
    ],
     friendsmonthdata:[
        {
        avatar:'/src/avatar_1.png',
        nickName:'wu',
        steps:117143,
        likes:456,
        grade:3,
        namecode:13945543232
         },
        {
        avatar:'/src/avatar_2.png',
        nickName:'wudong',
        steps:843,
        likes:44,
        grade:56,
        namecode:13573322463
         },
         {
        avatar:'/src/avatar_1.png',
        nickName:'爱是不可名zhide cuowu',
        steps:66843,
        likes:456,
        grade:12,
        namecode:13842323552
         }
     ]
  },
  //设置分享
  onShareAppMessage: function () {
    return {
      title: '来看我的运动数据',
      desc: '发动-陪你跑',
      path: '/page/myorg/myorg'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  linktolike:function(){
    wx.navigateTo({
      url: '../like/like'
    })
  },
  linktomine: function(e) {
    var namecode=e.currentTarget.dataset.namecode;
    var hidebtn=e.currentTarget.dataset.hidebtn;
    wx.setStorage({
      key:"namecode",
      data:namecode
    }),
    wx.setStorage({
      key:"hidebtn",
      data:hidebtn
    }),
    wx.navigateTo({
      url: '../mine/mine'
    })
  },
  linktoorg:function(){
    wx.navigateTo({
      url: '../orgpk/orgpk'
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
//       wx.request({
//   url: 'http://127.0.0.1:5757/getMyOrgData', 
//   data: {
//      user_phone:13516721842,
//         org_code: 'aipao'
//   },
//   method: 'POST',
//   type: 'cors',//'jsonp'
//   header: {
//       'content-type': 'application/json'
//   },
//   success: function(res) {
          // var friendsdata=res.data.friendsdata.sort(function(a,b){
          //   return a.steps-b.steps});
          // var friendsmonthdata=res.data.friendsmonthdata.sort(function(a,b){
          //   return a.steps-b.steps});

//       that.setData({
//         mydata:res.data.mydata,
//         mymonthdata:res.data.mymonthdata,
//         friendsdata:friendsdata,
//         friendsmonthdata:friendsmonthdata
//       }) ;
//       console.log(res)
//   },
//   error:function(res){
//      console.log(res.data)
//   }
//  })
  }
})
