//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    hum_num: 6,  //几个巨无霸
    half_hum: 1,  //有没有0.5个巨无霸 ，如果巨无霸是整数，返回0
    monthdata:[
    // 10000,10000,60000,40000,10000,
    // 30000,1000,1005,10000,20000,
    // 6563,10000,10000,10000,9000,
    // 10000,10700,10000,10000,10000,
    // 10000,10,4000,45000,10000,
    // 50000,2000,10000,10000,10000,10000,10000
    ],
    monthmax: '', //本月最高步数，作为基准线使用
    btnhide:true,
    fadong_session:'',
    friend_session:'',
    monthtotal:'',
    today:'',
    lastmonth:''
  },
  onShareAppMessage: function () {
    return {
      title: '来看我的运动数据',
      desc: '发动-陪你跑',
      path: '/page/mine/mine'
    }
  },
  showModal:function(){
      wx.showModal({
        title: '确定退出？',
        content: '如若退出该公司，您的数据将不显示在该公司列表中',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            wx.request({
              url:' quit.php',  //退出该公司的接口
              data:{
                quit: true
              },
              method:'POST',
              success:function(){
                wx.redirectTo({
                url: '../login/login'
               });
              }
            })
             
          };
         
        }
      })
  },
  hidebtn:function(){
    var that=this
    that.setData({
              btnhide: false
            });
  },
  
  onLoad: function () {
     var that = this
      wx.getStorage({
        key: 'fadong_session',
        success: function(res) {
            that.setData({
              fadong_session: res.data
            })
        } 
      });
      wx.getStorage({
        key: 'friend_session',
        success: function(res) {
            that.setData({
              friend_session: res.data
            });
            if(!res.data==that.data.fadong_session){
                  that.hidebtn();  
            };
            wx.request({
              url:'https://44165841.peinipao.wang/getUserData',
              data:{
                friend_session: res.data
              },
              method: 'POST',
              success:function(res){
                that.setData({            
                    hum_num: res.data.hum_num,  //几个巨无霸
                    half_hum: res.data.half_hum,  //有没有0.5个巨无霸 ，如果巨无霸是整数，返回0
                    monthdata: res.data.monthdata,
                    monthmax:res.data.monthmax, //本月最高步数，作为基准线使用
                    monthtotal:res.data.monthtotal
                })
              }
            })
        } 
      });

    var day= new Date();
    var last=new Date(day.getTime()-2592000000);
    var day_month=day.getMonth()+1;
    var last_month=last.getMonth()+1;
    var day_day=day.getDate();
    var last_day=last.getDate();
    that.setData({
      today: day_day+'/'+day_month,
      lastmonth: last_day+'/'+last_month
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  


  }
})
