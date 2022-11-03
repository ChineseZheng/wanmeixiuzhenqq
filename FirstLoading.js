var e = require("@babel/runtime/helpers/classCallCheck"), t = require("@babel/runtime/helpers/createClass"), i = require("@babel/runtime/helpers/assertThisInitialized"), a = require("@babel/runtime/helpers/inherits"), n = require("@babel/runtime/helpers/createSuper"), o = function(o) {
    a(l, o);
    var s = n(l);
    function l() {
        var t;
        return e(this, l), t = s.call(this), l.instance = i(t), t.once(egret.Event.ADDED_TO_STAGE, t.onAddToStage, i(t)), 
        t;
    }
    return t(l, [ {
        key: "onAddToStage",
        value: function() {
            var e = wx.env.USER_DATA_PATH + "/special";
            this.isDirectory(e, this.loadingBg, this);
        }
    }, {
        key: "isDirectory",
        value: function(e, t, i) {
            var a = wx.getFileSystemManager();
            a.access({
                path: e,
                success: function(e) {
                    t.call(i);
                },
                fail: function(n) {
                    a.mkdir({
                        dirPath: e,
                        success: function(e) {
                            t.call(i);
                        },
                        fail: function(e) {
                            console.log("创建目录失败", e);
                        }
                    });
                }
            });
        }
    }, {
        key: "loadingBg",
        value: function() {
            this.onSuccess();
            var e = wx.env.USER_DATA_PATH + "/special/dl_bg_dqdt.jpg";
            this.isFile(e, "image/dl_bg_dqdt.jpg", "bg");
        }
    }, {
        key: "isFile",
        value: function(e, t, i) {
            var a = wx.getFileSystemManager(), n = this;
            a.access({
                path: e,
                success: function(t) {
                    n.loadBgImg(e, i);
                },
                fail: function(o) {
                    console.log("没缓存背景图片", o), n.loadBgImg(t, i), a.copyFile({
                        srcPath: t,
                        destPath: e,
                        success: function() {}
                    });
                }
            });
        }
    }, {
        key: "loadBgImg",
        value: function(e, t) {
            var i, a = this, n = new egret.ImageLoader();
            n.crossOrigin = "anonymous", i = "bg" == t ? 0 : "mdl" == t ? 1 : -1, n.once(egret.Event.COMPLETE, function(e) {
                a.loadBgComplete(e, i);
            }, a), n.load(e);
        }
    }, {
        key: "loadBgComplete",
        value: function(e, t) {
            var i = e.currentTarget, a = new egret.Texture();
            a.bitmapData = i.data;
            var n = new egret.Bitmap();
            if (0 == t) n.width = this.stage.stageWidth, n.height = this.stage.stageHeight; else {
                var o = this.stage.stageHeight, s = this.stage.stageWidth;
                n.height = o > 1280 ? 1280 : o, n.width = s > 720 ? 720 : s, n.x = (s - n.width) / 2, 
                n.y = (o - n.height) / 2;
            }
            n.texture = a, t >= 0 ? this.addChildAt(n, t) : this.addChild(n);
        }
    }, {
        key: "setProgress",
        value: function(e) {
            var t = e.totalBytesWritten || e.totalBytesWriten, i = e.totalBytesExpectedToWrite, a = Math.floor(t / i * 100);
            console.log("分包加载中(".concat(a, "%)"));
        }
    }, {
        key: "onSuccess",
        value: function() {
            var e = this, t = this.stage, i = new LoginMain();
            t.addChild(i);
            var a = setTimeout(function() {
                clearTimeout(a), e.updateLoadingBg();
            }, 12e4);
        }
    }, {
        key: "updateLoadingBg",
        value: function() {
            var e = window.loginData && window.loginData.bg_img_version;
            if (e) {
                var t = window.wx.getStorageSync("bg_img_version");
                if (!(t && t >= e)) {
                    window.wx.setStorageSync("bg_img_version", e);
                    if (console.log("开始更新背景图"), GameGlobal.BG_PATH) {
                        var i = GameGlobal.BG_PATH + "?v=" + e, a = window.wx.env.USER_DATA_PATH + "/special/dl_bg_dqdt.jpg";
                        this.downLoadBg(i, a);
                    }
                }
            }
        }
    }, {
        key: "downLoadBg",
        value: function(e, t) {
            var i = window.wx.getFileSystemManager();
            window.wx.downloadFile({
                url: e,
                success: function(a) {
                    a.tempFilePath ? i.copyFile({
                        srcPath: a.tempFilePath,
                        destPath: t,
                        success: function() {}
                    }) : console.log(e + "下载失败");
                },
                fail: function(e) {
                    console.error(e);
                }
            });
        }
    } ]), l;
}(egret.DisplayObjectContainer);

window.FirstLoading = o;