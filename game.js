var e = require("@babel/runtime/helpers/createForOfIteratorHelper");

require("./weapp-adapter.js");
setAccount();
//使用微端账号统一登录
function setAccount(){
  var account = qq.getStorageSync('account')
  var pass = qq.getStorageSync('pass')
  var placeholderText = '输入手机号码'
  if(account!=''||pass!=''){return;}
  qq.showToast({
                 title:"输入格式'账号123XXXXX'"
             })
  qq.showKeyboard({
      confirmType:'next'
  })
  qq.onKeyboardConfirm((res)=>{
      console.log('res:',res)
      var str = res.value;
      if(str.length>2){
          console.log('acc',str.slice(2,str.length))
         if(str.slice(0,2)=='账号'){
             qq.setStorageSync('account',str.slice(2,str.length))
             qq.showToast({
                 title:"输入格式'密码123XXXXX'"
             })
             qq.showKeyboard({
                confirmType:'done',
            })
         }
         else if(str.slice(0,2)=='密码'){
             qq.setStorageSync('pass',str.slice(2,str.length))
    
             qq.showToast({
                 title:"设置成功,请重新进入游戏"
             })
         }
         else {

         }
      }
  })
//   wx.showModal({
//     title: '配置微端账号',
//     content: '',
//     editable:true,
//     placeholderText:'输入手机号码',
//     success (res) {
//       if (res.confirm) {
//         if(res.content.length!=11) {
//           wx.showToast({
//             title: '账号长度不对',
//           })
//           return;
//         }
//         qq.setStorageSync('account', res.content)
//         qq.setStorageSync('pass', '')
//             if(qq.getStorageSync('pass')==''){
//               wx.showModal({
//               title: '配置微端密码',
//               content: '',
//               editable:true,
//               placeholderText:"输入密码",
//               success (res) {
//                 if (res.confirm) {
//                   if(res.content==""){
//                     return;
//                   }
//                   qq.setStorageSync('pass', res.content)    
//                 }
//               }
//             })
//         }
        
//       }
//     }
//   })
}
var o = qq, a = o.env.USER_DATA_PATH + "/resource", t = o.getFileSystemManager(), n = function o(a) {
    var n = 0, r = t.statSync(a);
    if (r.isFile()) n = r.size; else {
        var i, c = t.readdirSync(a), s = e(c);
        try {
            for (s.s(); !(i = s.n()).done; ) {
                n += o(a + "/" + i.value);
            }
        } catch (e) {
            s.e(e);
        } finally {
            s.f();
        }
    }
    return n;
};

window.statFileSize = n;

var r = function() {
    console.log("缓存清理中..."), o.showLoading({
        title: "缓存清理中..."
    });
    try {
        t.rmdirSync(a, !0), o.setStorageSync("cacheSize", 0), o.removeStorageSync("bg_img_version"), 
        o.hideLoading(), o.showModal({
            title: "提示",
            content: "缓存清理成功,请重新进入小程序!",
            showCancel: !1,
            success: function(e) {
                e.confirm && o.exitMiniProgram({});
            }
        }), console.log("删除本地缓存成功~");
    } catch (e) {
        console.log("删除本地缓存失败~"), o.setStorageSync("cacheSize", 0), o.removeStorageSync("bg_img_version"), 
        console.error(e);
    }
};

window.clearCache = r;

window.MAX_CACHE_SIZE = 188743680;

try {
    t.accessSync(a);
} catch (e) {
    console.log("init cache dir..."), t.mkdirSync(a), o.setStorageSync("cacheSize", 0), 
    o.removeStorageSync("bg_img_version");
}

var i = o.env.USER_DATA_PATH + "/special";

try {
    t.accessSync(i + "/dl_bg_dqdt.jpg");
} catch (e) {
    console.log("not has bg img..."), o.removeStorageSync("bg_img_version");
}

try {
    var c = o.getStorageSync("cacheSize");
    c || (c = n(a), o.setStorageSync("cacheSize", c)), console.log("cacheSize:" + c / 1048576 + "M"), 
    c >= 188743680 && r();
} catch (e) {
    console.error(e);
}

var s = require("./shsdk/shsdk_conf.js");

window._gameCfg_ = {
    gameId: s.AND_PACKAGE_CODE,
    channel: s.CHANNEL,
    version: s.VERSION,
    platform: s.PLATFORM,
    resURL: s.RESURL,
    accURL: s.ACCURL,
    loginURI: s.LOGINURI,
    serverGroupURI: s.SERVERGROUPURI,
    createOrderURI: s.CREATEORDERURI,
    noticeURI: s.NOTICEURI,
    noticeId: s.NOTICEID,
    uuid: "",
    examineId: s.EXAMINEID
};

var l;

try {
    var g = o.getStorageSync("saveUUID");
    g || (l = new Date().getTime(), g = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
        var o = (l + 16 * Math.random()) % 16 | 0;
        return l = Math.floor(l / 16), ("x" == e ? o : 3 & o | 8).toString(16);
    }), o.setStorageSync("saveUUID", g)), window._gameCfg_.uuid = g;
} catch (e) {
    console.log(e);
}

var d = require("./shsdk/qqsdk-bnl.js");

window.qqGameSDK = d;

!function() {
    var e = o.getSystemInfoSync().system;
    -1 === (e = e.toLowerCase()).indexOf("ios") ? window._gameCfg_.gameId = s.AND_PACKAGE_CODE : window._gameCfg_.gameId = s.IOS_PACKAGE_CODE, 
    console.log(window._gameCfg_);
    window.qqGameSDK.init({
        game_id: "280",
        game_name: "逍遥修真",
        channel_id: "69833",
        qx_appid: "223"
    }, function(e) {
        console.log("初始化回调结果", e), 0 == e.statusCode && (window.cpQuery = e.launchOptions.query, 
        window.qqGameSDK.login({}, function(e) {
            if (0 == e.statusCode) {
                var o = JSON.parse(e.loginParams.cp_ext);
                window.QQopenid = o.userId, window.loginData = e.loginParams, console.log("初始化====>登录回调", e);
            }
        }));
    });
}();

var u, S;

u = window._gameCfg_.uuid, S = "cid=" + window._gameCfg_.channel + "&idfa=" + u + "&step=0", 
o.request({
    url: window._gameCfg_.accURL + "/action/user/deviceStep?" + S,
    success: function(e) {
        console.log("请求打点成功!"), console.log(e.data);
    }
}), require("./manifest.js"), require("./egret.wxgame.js");

var w = require("./library/file-util");

window.fileutil = w, window.RES && RES.processor && (require("./library/image.js"), 
require("./library/text.js"), require("./library/sound.js"), require("./library/binary.js"));

var f = {
    entryClassName: "Main",
    orientation: "auto",
    frameRate: 30,
    scaleMode: "fixedWidth",
    contentWidth: 720,
    contentHeight: 1280,
    showFPS: !1,
    fpsStyles: "x:0,y:0,size:10,textColor:0xffffff,bgAlpha:0.8",
    showLog: !1,
    maxTouches: 2,
    renderMode: "webgl",
    audioType: 0,
    calculateCanvasScaleFactor: function(e) {
        var o = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / o;
    }
};

require("./FirstLoading.js"), f.entryClassName = "FirstLoading", egret.runEgret(f), 
o.onShow(function(e) {
    console.log(e, window.cpQuery), o.getStorage({
        key: "share_time",
        success: function(e) {
            o.removeStorage({
                key: "share_time",
                success: function(e) {
                    console.log(e);
                }
            });
            var a = new Date().getTime();
            console.log("时间差：", a - e.data), window.platform && (a - e.data > 2e3 ? (console.log("开始调用shareCallback"), 
            platform.shareCallback()) : setTimeout(function() {
                Toast.showTipsDownToUp("分享好友或群，可领取奖励");
            }, 600));
        }
    }), o.setKeepScreenOn({
        keepScreenOn: !0,
        success: function() {},
        fail: function() {
            console.log("设置屏幕常亮失败");
        }
    });
}), o.onMemoryWarning(function() {
    console.log("onMemoryWarningReceive...triggerGC now!!!"), o.triggerGC();
});

window.removeLoading = function() {};

window.gameStar = function(e, a, t, n) {
    o.loadSubpackage ? o.loadSubpackage({
        name: "stage1",
        success: function() {
            o.loadSubpackage({
                name: "stage2",
                success: function() {
                    o.loadSubpackage({
                        name: "stage3",
                        success: function() {
                            t.call(n);
                        }
                    }).onProgressUpdate(function(o) {
                        var t = o.totalBytesWritten || o.totalBytesWriten, n = o.totalBytesExpectedToWrite, r = Math.floor(t / n * 50) + 100;
                        console.log("分包3加载中(".concat(r, "%)")), e && e.call(a, r, 150);
                    });
                }
            }).onProgressUpdate(function(o) {
                var t = o.totalBytesWritten || o.totalBytesWriten, n = o.totalBytesExpectedToWrite, r = Math.floor(t / n * 50) + 50;
                console.log("分包2加载中(".concat(r, "%)")), e && e.call(a, r, 150);
            });
        }
    }).onProgressUpdate(function(o) {
        var t = o.totalBytesWritten || o.totalBytesWriten, n = o.totalBytesExpectedToWrite, r = Math.floor(t / n * 50);
        console.log("分包1加载中(".concat(r, "%)")), e && e.call(a, r, 150);
    }) : o.showToast({
        title: "当前微信版本较低,请升级后进入游戏!",
        icon: "none",
        duration: 6e6
    });
};