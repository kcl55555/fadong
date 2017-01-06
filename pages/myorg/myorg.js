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
    btn_true: true,
    btn_false: false,
    fadong_session: '',
    org_id:'',
    mygrade:'',
    mymonthgrade:'',
    mydata:{
      // avatar:'/src/coveravatar.png',
      // nickName:'爱是不可名zhide cuowu',
      // steps:6667843,
      // likes:1,
      // grade:3,
      // my_session: '1333'

    },
    mymonthdata:{
      // avatar:'/src/coveravatar.png',
      // nickName:'爱是不可名zhide cuowu',
      // steps:6667823,
      // likes:454,
      // grade:3,
      // my_session: '1333'
    },
    friendsdata:[
        // {
        // avatar:'/src/avatar_1.png',
        // nickName:'wu',
        // steps:11143,
        // likes:456,
        // mylike: false,
        // friend_session: 138111115345
        //  }
    ],
     friendsmonthdata:[
        // {
        // avatar:'/src/avatar_2.png',
        // nickName:'wudong',
        // steps:843,
        // likes:64,
        // grade:56,
        // mylike: true,
        // friend_session: 13857646344
        //  }
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
  likeit:function(e){
    var that=this
    var session=e.currentTarget.dataset.session;
    var dayindex=that.findIndex(that.data.friendsdata, session);
    var monthindex=that.findIndex(that.data.friendsmonthdata, session);
      if(session==that.data.fadong_session){//如果自己点击自己的红心，则跳转到赞我的人页面
         wx.navigateTo({
           url:'../like/like'
         });
      }
      else{
       wx.request({ //点赞数据发给服务端
           url: 'like.php',
           method: 'POST',
           data:{
            fadong_session: that.data.fadong_session,
            friend_session:session
           },
           success:function(res){ //服务端返回后在客户端显示加1 ，日列表心形被点击 月列表自动加1，反之一样。

           that.data.friendsdata[dayindex].likes+=1;
           that.data.friendsdata[dayindex].mylike=true;

           that.setData({
            friendsdata:that.data.friendsdata
           });

           that.data.friendsmonthdata[monthindex].likes+=1;
           that.data.friendsmonthdata[monthindex].mylike=true;

           that.setData({
            friendsmonthdata:that.data.friendsmonthdata
           });

           }

         })
       }
  },
  findIndex:function(arr, value){
        
         for(var i=0;i<arr.length;i++){

          if(arr[i].friend_session==value){
            var res=i
            
            return res
            }
          }
         },
         
  linktolike:function(){
    wx.navigateTo({
      url: '../like/like'
    })
  },
  linktomine: function(e) {
    var friend_session=e.currentTarget.dataset.fsession;
    var hidebtn=e.currentTarget.dataset.hidebtn;
    var avatar=e.currentTarget.dataset.avatar;
    wx.setStorage({
      key:"friend_session",
      data:friend_session
    }),
    wx.setStorage({
      key:"avatar",
      data:avatar
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
    wx.redirectTo({
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
    var that=this;
    this.setData({
      show:0,
      off:1
    });
    
  },
  setMygrade:function(){
    var that=this;
    for(var i=0;i<=that.data.friendsdata.length;i++){
      var index=i;
                if(that.data.friendsdata[index].friend_session==that.data.mydata.my_session){
                  console.log('woshii'+index);
                  // console.log(that.data.friendsdata[index].friend_session)
                  that.setData({
                      mygrade: i
                  })
                }
            };
  },
  setMymonthgrade:function(){
    var that=this;
    for(var j=0;j<=that.data.friendsmonthdata.length;j++){
               var index=j;
                if(that.data.friendsmonthdata[index].friend_session==that.data.mymonthdata.my_session){
                  console.log('woyeshii'+index);
                  that.setData({
                      mymonthgrade: index
                  });
                }

            };
  },
  
  onLoad: function () {
   

    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });

    wx.getStorage({
       key:'fadong_session',
       success:function(res){
           that.setData({
            fadong_session: res.data
           })
       }
    });

    wx.getStorage({
       key:'org_id',
       success:function(res){
           that.setData({
            org_id: res.data
           });
             wx.request({//获取步数和好友列表的接口
        url: app.globalData.mysite+'getMyOrgData', 
        data: {
           fadong_session: that.data.fadong_session,
              org_id: that.data.org_id
        },
        method: 'POST',
//   type: 'cors',//'jsonp'
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
                console.log(res);
                var friendsdata=res.data.friendsdata.sort(function(b,a){
                  return a.steps-b.steps});
                var friendsmonthdata=res.data.friendsmonthdata.sort(function(b,a){
                  return a.steps-b.steps});
             console.log(res)
            that.setData({
              mydata:res.data.mydata,
              mymonthdata:res.data.mymonthdata,
              friendsdata:friendsdata,
              friendsmonthdata:friendsmonthdata
            }) ;
            //  console.log(friendsmonthdata[8].friend_session==that.data.mymonthdata.my_session)
            that.setMygrade();
            that.setMymonthgrade();
            wx.hideToast();
            // console.log(res)
        },
        error:function(res){
           console.log(res.data)
        }
 })
       }
    });


  }
})
