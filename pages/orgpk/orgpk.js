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
    wx.redirectTo({
      url: '../myorg/myorg'
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
  setMygrade:function(){
    var that=this;
    for(var i=0;i<=that.data.friendsdata.length;i++){
                if(that.data.friendsdata[i].friend_session==that.data.mydata.my_session){
                  console.log('woshii'+i);
                  that.setData({
                      mygrade: i
                  })
                }
            };
  },
  setMymonthgrade:function(){
    var that=this;
    for(var j=0;j<=that.data.friendsmonthdata.length;j++){
                if(that.data.friendsmonthdata[j].friend_session==that.data.mymonthdata.my_session){
                  console.log('woyeshii'+j);
                  that.setData({
                      mymonthgrade: j
                  });
                }

            };
  },
  onLoad: function () {
   

    var that = this
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
           })
       }
    });

      wx.request({//获取步数和好友列表的接口
        url: 'https://44165841.peinipao.wang/getOrgpkData', 
        data: {
           fadong_session: 'fkxq1jrtxeyj0jmmm5qllvbxpn666fd7c4an7aw7209ljx7tna20lfo1oga2f6h0w6rhdy1nnsh3erdf661efbmiakc0wl0cyrw5akdblexr9e1r35jtf3wy8qifjbo5tque037dld2va15ulvqaff1u8y7qj5drq8jbi2v4',//that.data.fadong_session,
              org_id: 1, //that.data.org_id
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
            
            that.setMygrade();
            that.setMymonthgrade();

            // console.log(res)
        },
        error:function(res){
           console.log(res.data)
        }
 })
  }
})
