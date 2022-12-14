var e = function(e, t, r) {
    e.__class__ = t, r ? r.push(t) : r = [ t ], e.__types__ = e.__types__ ? r.concat(e.__types__) : r;
}, t = function(e, t) {
    function r() {
        this.constructor = e;
    }
    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
    r.prototype = t.prototype, e.prototype = new r();
};

!function(r) {
    !function(i) {
        var a = new r.TextField(), n = function(e) {
            function i(t, r, i, n, o) {
                var s = e.call(this) || this;
                if (s.arrFps = [], s.arrCost = [], !r && !i) return s;
                s.arrFps = [], s.arrCost = [], a.x = null == o.x ? 0 : parseInt(o.x), a.y = null == o.y ? 0 : parseInt(o.y), 
                a.textColor = null == o.textColor ? "#ffffff" : o.textColor.replace("0x", "#");
                var c = null == o.size ? 12 : parseInt(o.size);
                return a.size = c, s;
            }
            return t(i, e), i.prototype.addFps = function() {}, i.prototype.addLog = function() {}, 
            i.prototype.update = function(e, t) {
                var i, n, o;
                void 0 === t && (t = !1), t ? (i = this.arrFps[this.arrFps.length - 1], n = this.arrCost[this.arrCost.length - 1][0], 
                o = this.arrCost[this.arrCost.length - 1][1]) : (i = e.fps, n = e.costTicker, o = e.costRender, 
                this.lastNumDraw = e.draw, this.arrFps.push(i), this.arrCost.push([ n, o ]));
                var s = 0, c = this.arrFps.length;
                c > 101 && (c = 101, this.arrFps.shift(), this.arrCost.shift());
                for (var h = this.arrFps[0], u = this.arrFps[0], d = 0; d < c; d++) {
                    var l = this.arrFps[d];
                    s += l, l < h ? h = l : l > u && (u = l);
                }
                var f = Math.floor(s / c);
                a.text = i + " FPS \nmin:" + h + " max:" + u + " avg:" + f + "\nDraw " + this.lastNumDraw + "\nCost " + n + " " + o, 
                r.sys.$TempStage.addChild(a);
            }, i.prototype.updateInfo = function(e) {}, i.prototype.updateWarn = function(e) {}, 
            i.prototype.updateError = function(e) {}, i;
        }(r.DisplayObject);
        i.WebFps = n, e(n.prototype, "egret.wxgame.WebFps", [ "egret.FPSDisplay" ]), r.FPSDisplay = n;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i(t) {
                var r = e.call(this) || this;
                return r.format = "image", r.$deleteSource = !0, r.source = t, r.width = t.width, 
                r.height = t.height, r;
            }
            return t(i, e), Object.defineProperty(i.prototype, "source", {
                get: function() {
                    return this.$source;
                },
                set: function(e) {
                    this.$source = e;
                },
                enumerable: !0,
                configurable: !0
            }), i.create = function(e, t, a) {
                var n = "", o = "image/png";
                "/" === (n = "arraybuffer" === e ? r.Base64Util.encode(t) : t).charAt(0) ? o = "image/jpeg" : "R" === n.charAt(0) ? o = "image/gif" : "i" === n.charAt(0) && (o = "image/png");
                var s = new Image();
                s.src = "data:" + o + ";base64," + n, s.crossOrigin = "*";
                var c = new i(s);
                return s.onload = function() {
                    s.onload = void 0, c.source = s, c.height = s.height, c.width = s.width, a && a(c);
                }, c;
            }, i.prototype.$dispose = function() {
                "webgl" == r.Capabilities.renderMode && this.webGLTexture && (r.WebGLUtils.deleteWebGLTexture(this.webGLTexture), 
                this.webGLTexture = null), this.source && this.source.dispose && this.source.dispose(), 
                this.source && this.source.src && (this.source.src = ""), this.source = null, i.$dispose(this);
            }, i.$addDisplayObject = function(e, t) {
                if (t) {
                    var r = t.hashCode;
                    if (r) if (i._displayList[r]) {
                        var a = i._displayList[r];
                        a.indexOf(e) < 0 && a.push(e);
                    } else i._displayList[r] = [ e ];
                }
            }, i.$removeDisplayObject = function(e, t) {
                if (t) {
                    var r = t.hashCode;
                    if (r && i._displayList[r]) {
                        var a = i._displayList[r], n = a.indexOf(e);
                        n >= 0 && a.splice(n, 1);
                    }
                }
            }, i.$invalidate = function(e) {
                if (e) {
                    var t = e.hashCode;
                    if (t && i._displayList[t]) for (var a = i._displayList[t], n = 0; n < a.length; n++) {
                        a[n] instanceof r.Bitmap && a[n].$refreshImageData();
                        var o = a[n];
                        o.$renderDirty = !0;
                        var s = o.$parent;
                        s && !s.$cacheDirty && (s.$cacheDirty = !0, s.$cacheDirtyUp());
                        var c = o.$maskedObject;
                        c && !c.$cacheDirty && (c.$cacheDirty = !0, c.$cacheDirtyUp());
                    }
                }
            }, i.$dispose = function(e) {
                if (e) {
                    var t = e.hashCode;
                    if (t && i._displayList[t]) {
                        for (var a = 0, n = i._displayList[t]; a < n.length; a++) {
                            var o = n[a];
                            o instanceof r.Bitmap && (o.$bitmapData = null), o.$renderDirty = !0;
                            var s = o.$parent;
                            s && !s.$cacheDirty && (s.$cacheDirty = !0, s.$cacheDirtyUp());
                            var c = o.$maskedObject;
                            c && !c.$cacheDirty && (c.$cacheDirty = !0, c.$cacheDirtyUp());
                        }
                        delete i._displayList[t];
                    }
                }
            }, i._displayList = r.createMap(), i;
        }(r.HashObject);
        i.BitmapData = a, e(a.prototype, "egret.wxgame.BitmapData"), r.BitmapData = a;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(r) {
        var i = function() {
            function e() {}
            return e.call = function(e, t) {}, e.addCallback = function(e, t) {}, e;
        }();
        r.WebExternalInterface = i, e(i.prototype, "egret.wxgame.WebExternalInterface", [ "egret.ExternalInterface" ]), 
        t.ExternalInterface = i;
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(e) {
    !function(t) {
        t.wxgame || (t.wxgame = {}), t.getItem = function(e) {
            return window.localStorage.getItem(e);
        }, t.setItem = function(t, r) {
            try {
                return window.localStorage.setItem(t, r), !0;
            } catch (i) {
                return e.$warn(1047, t, r), !1;
            }
        }, t.removeItem = function(e) {
            window.localStorage.removeItem(e);
        }, t.clear = function() {
            window.localStorage.clear();
        };
    }(e.localStorage || (e.localStorage = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a() {
                var t = e.call(this) || this;
                return t.loaded = !1, t;
            }
            return t(a, e), Object.defineProperty(a.prototype, "length", {
                get: function() {
                    if (this.originAudio) return this.originAudio.duration;
                    throw new Error("sound not loaded!");
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.load = function(e) {
                var t = this;
                this.url = e, e || r.$error(3002);
                var i = new Audio(e);
                function n() {
                    s(), t.loaded = !0, t.dispatchEventWith(r.Event.COMPLETE);
                }
                function o() {
                    s(), t.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                }
                function s() {
                    i.removeEventListener("canplaythrough", n), i.removeEventListener("error", o);
                }
                i.addEventListener("canplaythrough", n), i.addEventListener("error", o), this.originAudio = i, 
                a.clearAudios[this.url] && delete a.clearAudios[this.url], a.$recycle(this.url, i);
            }, a.prototype.play = function(e, t) {
                e = +e || 0, t = +t || 0, 0 == this.loaded && r.$error(1049);
                var n = a.$pop(this.url);
                null == n && (n = this.originAudio.cloneNode()), n.autoplay = !0;
                var o = new i.HtmlSoundChannel(n);
                return o.$url = this.url, o.$loops = t, o.$startTime = e, o.$play(), r.sys.$pushSoundChannel(o), 
                o;
            }, a.prototype.close = function() {
                0 == this.loaded && this.originAudio && (this.originAudio.src = ""), this.originAudio && (this.originAudio = null), 
                a.$clear(this.url);
            }, a.$clear = function(e) {
                a.clearAudios[e] = !0;
                var t = a.audios[e];
                t && (t.length = 0);
            }, a.$pop = function(e) {
                var t = a.audios[e];
                return t && t.length > 0 ? t.pop() : null;
            }, a.$recycle = function(e, t) {
                if (!a.clearAudios[e]) {
                    var r = a.audios[e];
                    null == a.audios[e] && (r = a.audios[e] = []), r.push(t);
                }
            }, a.MUSIC = "music", a.EFFECT = "effect", a.audios = {}, a.clearAudios = {}, a;
        }(r.EventDispatcher);
        i.HtmlSound = a, e(a.prototype, "egret.wxgame.HtmlSound", [ "egret.Sound" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a(t) {
                var i = e.call(this) || this;
                return i.$startTime = 0, i.audio = null, i.isStopped = !1, i.onPlayEnd = function() {
                    if (1 == i.$loops) return i.stop(), void i.dispatchEventWith(r.Event.SOUND_COMPLETE);
                    i.$loops > 0 && i.$loops--, i.$play();
                }, i._volume = 1, t.addEventListener("ended", i.onPlayEnd), i.audio = t, i;
            }
            return t(a, e), a.prototype.$play = function() {
                this.isStopped ? r.$error(1036) : (this.audio.play(), this.audio.volume = this._volume, 
                this.audio.currentTime = this.$startTime);
            }, a.prototype.stop = function() {
                if (this.audio) {
                    this.isStopped || r.sys.$popSoundChannel(this), this.isStopped = !0;
                    var e = this.audio;
                    e.removeEventListener("ended", this.onPlayEnd), e.volume = 0, this._volume = 0, 
                    this.audio = null;
                    var t = this.$url;
                    window.setTimeout(function() {
                        e.pause(), i.HtmlSound.$recycle(t, e);
                    }, 200);
                }
            }, Object.defineProperty(a.prototype, "volume", {
                get: function() {
                    return this._volume;
                },
                set: function(e) {
                    this.isStopped ? r.$error(1036) : (this._volume = e, this.audio && (this.audio.volume = e));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "position", {
                get: function() {
                    return this.audio ? this.audio.currentTime : 0;
                },
                enumerable: !0,
                configurable: !0
            }), a;
        }(r.EventDispatcher);
        i.HtmlSoundChannel = a, e(a.prototype, "egret.wxgame.HtmlSoundChannel", [ "egret.SoundChannel", "egret.IEventDispatcher" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function() {
            function e() {}
            return e.decodeAudios = function() {
                if (!(e.decodeArr.length <= 0 || e.isDecoding)) {
                    e.isDecoding = !0;
                    var t = e.decodeArr.shift();
                    e.ctx.decodeAudioData(t.buffer, function(r) {
                        t.self.audioBuffer = r, t.success && t.success(), e.isDecoding = !1, e.decodeAudios();
                    }, function() {
                        alert("sound decode error: " + t.url + "???\nsee http://edn.egret.com/cn/docs/page/156"), 
                        t.fail && t.fail(), e.isDecoding = !1, e.decodeAudios();
                    });
                }
            }, e.decodeArr = [], e.isDecoding = !1, e;
        }();
        i.WebAudioDecode = a, e(a.prototype, "egret.wxgame.WebAudioDecode");
        var n = function(e) {
            function n() {
                var t = e.call(this) || this;
                return t.loaded = !1, t;
            }
            return t(n, e), Object.defineProperty(n.prototype, "length", {
                get: function() {
                    if (this.audioBuffer) return this.audioBuffer.duration;
                    throw new Error("sound not loaded!");
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.load = function(e) {
                var t = this;
                this.url = e, e || r.$error(3002);
                var i = new XMLHttpRequest();
                function n() {
                    t.loaded = !0, t.dispatchEventWith(r.Event.COMPLETE);
                }
                function o() {
                    t.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                }
                i.open("GET", e, !0), i.responseType = "arraybuffer", i.onreadystatechange = function() {
                    4 == i.readyState && (i.status >= 400 || 0 == i.status ? t.dispatchEventWith(r.IOErrorEvent.IO_ERROR) : (a.decodeArr.push({
                        buffer: i.response,
                        success: n,
                        fail: o,
                        self: t,
                        url: t.url
                    }), a.decodeAudios()));
                }, i.send();
            }, n.prototype.play = function(e, t) {
                e = +e || 0, t = +t || 0, 0 == this.loaded && r.$error(1049);
                var a = new i.WebAudioSoundChannel();
                return a.$url = this.url, a.$loops = t, a.$audioBuffer = this.audioBuffer, a.$startTime = e, 
                a.$play(), r.sys.$pushSoundChannel(a), a;
            }, n.prototype.close = function() {}, n.MUSIC = "music", n.EFFECT = "effect", n;
        }(r.EventDispatcher);
        i.WebAudioSound = n, e(n.prototype, "egret.wxgame.WebAudioSound", [ "egret.Sound" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a() {
                var t = e.call(this) || this;
                return t.$startTime = 0, t.bufferSource = null, t.context = i.WebAudioDecode.ctx, 
                t.isStopped = !1, t._currentTime = 0, t._volume = 1, t.onPlayEnd = function() {
                    if (1 == t.$loops) return t.stop(), void t.dispatchEventWith(r.Event.SOUND_COMPLETE);
                    t.$loops > 0 && t.$loops--, t.$play();
                }, t._startTime = 0, t.context.createGain ? t.gain = t.context.createGain() : t.gain = t.context.createGainNode(), 
                t;
            }
            return t(a, e), a.prototype.$play = function() {
                if (this.isStopped) r.$error(1036); else {
                    this.bufferSource && (this.bufferSource.onended = null, this.bufferSource = null);
                    var e = this.context, t = this.gain, i = e.createBufferSource();
                    this.bufferSource = i, i.buffer = this.$audioBuffer, i.connect(t), t.connect(e.destination), 
                    i.onended = this.onPlayEnd, this._startTime = Date.now(), this.gain.gain.value = this._volume, 
                    i.start(0, this.$startTime), this._currentTime = 0;
                }
            }, a.prototype.stop = function() {
                if (this.bufferSource) {
                    var e = this.bufferSource;
                    e.stop ? e.stop(0) : e.noteOff(0), e.onended = null, e.disconnect(), this.bufferSource = null, 
                    this.$audioBuffer = null;
                }
                this.isStopped || r.sys.$popSoundChannel(this), this.isStopped = !0;
            }, Object.defineProperty(a.prototype, "volume", {
                get: function() {
                    return this._volume;
                },
                set: function(e) {
                    this.isStopped ? r.$error(1036) : (this._volume = e, this.gain.gain.value = e);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "position", {
                get: function() {
                    return this.bufferSource ? (Date.now() - this._startTime) / 1e3 + this.$startTime : 0;
                },
                enumerable: !0,
                configurable: !0
            }), a;
        }(r.EventDispatcher);
        i.WebAudioSoundChannel = a, e(a.prototype, "egret.wxgame.WebAudioSoundChannel", [ "egret.SoundChannel", "egret.IEventDispatcher" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a(t, i) {
                void 0 === i && (i = !0);
                var a = e.call(this) || this;
                return a.loaded = !1, a.closed = !1, a.heightSet = NaN, a.widthSet = NaN, a.waiting = !1, 
                a.userPause = !1, a.userPlay = !1, a.isPlayed = !1, a.screenChanged = function(e) {
                    var t = document.fullscreenEnabled || document.webkitIsFullScreen;
                    t || (a.checkFullScreen(!1), r.Capabilities.isMobile || (a._fullscreen = t));
                }, a._fullscreen = !0, a.onVideoLoaded = function() {
                    a.video.removeEventListener("canplay", a.onVideoLoaded);
                    var e = a.video;
                    a.loaded = !0, a.posterData && (a.posterData.width = a.getPlayWidth(), a.posterData.height = a.getPlayHeight()), 
                    e.width = e.videoWidth, e.height = e.videoHeight, window.setTimeout(function() {
                        a.dispatchEventWith(r.Event.COMPLETE);
                    }, 200);
                }, a.$renderNode = new r.sys.BitmapNode(), a.src = t, a.once(r.Event.ADDED_TO_STAGE, a.loadPoster, a), 
                t && a.load(), a;
            }
            return t(a, e), a.prototype.load = function(e, t) {
                var i = this;
                if (void 0 === t && (t = !0), e = e || this.src, this.src = e, e || r.$error(3002), 
                !this.video || this.video.src != e) {
                    var a;
                    !this.video || r.Capabilities.isMobile ? (a = document.createElement("video"), this.video = a, 
                    a.controls = null) : a = this.video, a.src = e, a.setAttribute("autoplay", "autoplay"), 
                    a.setAttribute("webkit-playsinline", "true"), a.addEventListener("canplay", this.onVideoLoaded), 
                    a.addEventListener("error", function() {
                        return i.onVideoError();
                    }), a.addEventListener("ended", function() {
                        return i.onVideoEnded();
                    });
                    var n = !1;
                    a.addEventListener("canplay", function() {
                        i.waiting = !1, n ? i.userPause ? i.pause() : i.userPlay && i.play() : (n = !0, 
                        a.pause());
                    }), a.addEventListener("waiting", function() {
                        i.waiting = !0;
                    }), a.load(), this.videoPlay(), a.style.position = "absolute", a.style.top = "0px", 
                    a.style.zIndex = "-88888", a.style.left = "0px", a.height = 1, a.width = 1;
                }
            }, a.prototype.play = function(e, t) {
                var i = this;
                if (void 0 === t && (t = !1), 0 == this.loaded) return this.load(this.src), void this.once(r.Event.COMPLETE, function(r) {
                    return i.play(e, t);
                }, this);
                this.isPlayed = !0;
                var a = this.video;
                null != e && (a.currentTime = +e || 0), a.loop = !!t, r.Capabilities.isMobile ? a.style.zIndex = "-88888" : a.style.zIndex = "9999", 
                a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.height = a.videoHeight, 
                a.width = a.videoWidth, "Windows PC" != r.Capabilities.os && "Mac OS" != r.Capabilities.os && window.setTimeout(function() {
                    a.width = 0;
                }, 1e3), this.checkFullScreen(this._fullscreen);
            }, a.prototype.videoPlay = function() {
                this.userPause = !1, this.waiting ? this.userPlay = !0 : (this.userPlay = !1, this.video.play());
            }, a.prototype.checkFullScreen = function(e) {
                var t = this.video;
                if (e) null == t.parentElement && (t.removeAttribute("webkit-playsinline"), document.body.appendChild(t)), 
                r.stopTick(this.markDirty, this), this.goFullscreen(); else if (null != t.parentElement && t.parentElement.removeChild(t), 
                t.setAttribute("webkit-playsinline", "true"), this.setFullScreenMonitor(!1), r.startTick(this.markDirty, this), 
                r.Capabilities.isMobile) return this.video.currentTime = 0, void this.onVideoEnded();
                this.videoPlay();
            }, a.prototype.goFullscreen = function() {
                var e, t = this.video;
                return !t[e = i.getPrefixStyleName("requestFullscreen", t)] && !t[e = i.getPrefixStyleName("requestFullScreen", t)] || (t.removeAttribute("webkit-playsinline"), 
                t[e](), this.setFullScreenMonitor(!0), !0);
            }, a.prototype.setFullScreenMonitor = function(e) {
                var t = this.video;
                e ? (t.addEventListener("mozfullscreenchange", this.screenChanged), t.addEventListener("webkitfullscreenchange", this.screenChanged), 
                t.addEventListener("mozfullscreenerror", this.screenError), t.addEventListener("webkitfullscreenerror", this.screenError)) : (t.removeEventListener("mozfullscreenchange", this.screenChanged), 
                t.removeEventListener("webkitfullscreenchange", this.screenChanged), t.removeEventListener("mozfullscreenerror", this.screenError), 
                t.removeEventListener("webkitfullscreenerror", this.screenError));
            }, a.prototype.screenError = function() {
                r.$error(3014);
            }, a.prototype.exitFullscreen = function() {
                document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.oCancelFullScreen ? document.oCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
            }, a.prototype.onVideoEnded = function() {
                this.pause(), this.isPlayed = !1, this.dispatchEventWith(r.Event.ENDED);
            }, a.prototype.onVideoError = function() {
                this.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
            }, a.prototype.close = function() {
                var e = this;
                this.closed = !0, this.video.removeEventListener("canplay", this.onVideoLoaded), 
                this.video.removeEventListener("error", function() {
                    return e.onVideoError();
                }), this.video.removeEventListener("ended", function() {
                    return e.onVideoEnded();
                }), this.pause(), 0 == this.loaded && this.video && (this.video.src = ""), this.video && this.video.parentElement && (this.video.parentElement.removeChild(this.video), 
                this.video = null), this.loaded = !1;
            }, a.prototype.pause = function() {
                this.userPlay = !1, this.waiting ? this.userPause = !0 : (this.userPause = !1, r.stopTick(this.markDirty, this));
            }, Object.defineProperty(a.prototype, "volume", {
                get: function() {
                    return this.video ? this.video.volume : 1;
                },
                set: function(e) {
                    this.video && (this.video.volume = e);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "position", {
                get: function() {
                    return this.video ? this.video.currentTime : 0;
                },
                set: function(e) {
                    this.video && (this.video.currentTime = e);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "fullscreen", {
                get: function() {
                    return this._fullscreen;
                },
                set: function(e) {
                    r.Capabilities.isMobile || (this._fullscreen = !!e, this.video && 0 == this.video.paused && this.checkFullScreen(this._fullscreen));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "bitmapData", {
                get: function() {
                    return this.video && this.loaded ? (this._bitmapData || (this.video.width = this.video.videoWidth, 
                    this.video.height = this.video.videoHeight, this._bitmapData = new i.BitmapData(this.video), 
                    this._bitmapData.$deleteSource = !1), this._bitmapData) : null;
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.loadPoster = function() {
                var e = this, t = this.poster;
                if (t) {
                    var i = new r.ImageLoader();
                    i.once(r.Event.COMPLETE, function(t) {
                        i.data;
                        e.posterData = i.data, e.posterData.width = e.getPlayWidth(), e.posterData.height = e.getPlayHeight();
                    }, this), i.load(t);
                }
            }, a.prototype.$measureContentBounds = function(e) {
                var t = this.bitmapData, r = this.posterData;
                t || r ? e.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight()) : e.setEmpty();
            }, a.prototype.getPlayWidth = function() {
                return isNaN(this.widthSet) ? this.bitmapData ? this.bitmapData.width : this.posterData ? this.posterData.width : NaN : this.widthSet;
            }, a.prototype.getPlayHeight = function() {
                return isNaN(this.heightSet) ? this.bitmapData ? this.bitmapData.height : this.posterData ? this.posterData.height : NaN : this.heightSet;
            }, a.prototype.$updateRenderNode = function() {
                var e = this.$renderNode, t = this.bitmapData, i = this.posterData, a = this.getPlayWidth(), n = this.getPlayHeight();
                this.isPlayed && !r.Capabilities.isMobile || !i ? this.isPlayed && t && (e.image = t, 
                e.imageWidth = t.width, e.imageHeight = t.height, r.WebGLUtils.deleteWebGLTexture(t.webGLTexture), 
                t.webGLTexture = null, e.drawImage(0, 0, t.width, t.height, 0, 0, a, n)) : (e.image = i, 
                e.imageWidth = a, e.imageHeight = n, e.drawImage(0, 0, i.width, i.height, 0, 0, a, n));
            }, a.prototype.markDirty = function() {
                return this.$renderDirty = !0, !0;
            }, a.prototype.$setHeight = function(t) {
                this.heightSet = +t || 0, e.prototype.$setHeight.call(this, t);
            }, a.prototype.$setWidth = function(t) {
                this.widthSet = +t || 0, e.prototype.$setWidth.call(this, t);
            }, Object.defineProperty(a.prototype, "paused", {
                get: function() {
                    return !this.video || this.video.paused;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "length", {
                get: function() {
                    if (this.video) return this.video.duration;
                    throw new Error("Video not loaded!");
                },
                enumerable: !0,
                configurable: !0
            }), a;
        }(r.DisplayObject);
        i.WebVideo = a, e(a.prototype, "egret.wxgame.WebVideo", [ "egret.Video", "egret.DisplayObject" ]), 
        r.Video = a;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t._url = "", t._method = "", t;
            }
            return t(i, e), Object.defineProperty(i.prototype, "response", {
                get: function() {
                    return this._response ? this._response : null;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "responseType", {
                get: function() {
                    return this._responseType;
                },
                set: function(e) {
                    this._responseType = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "withCredentials", {
                get: function() {
                    return this._withCredentials;
                },
                set: function(e) {
                    this._withCredentials = e;
                },
                enumerable: !0,
                configurable: !0
            }), i.prototype.open = function(e, t) {
                void 0 === t && (t = "GET"), this._url = e, this._method = t;
            }, i.prototype.readFileAsync = function() {
                var e = this, t = function(t) {
                    e._response = t, e.dispatchEventWith(r.Event.COMPLETE);
                }, i = function() {
                    e.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                }, a = wx.getFileSystemManager();
                "arraybuffer" == e.responseType ? a.readFile({
                    filePath: e._url,
                    success: function(e) {
                        var r = e.data;
                        t(r);
                    },
                    fail: function() {
                        i();
                    }
                }) : a.readFile({
                    filePath: e._url,
                    encoding: "utf8",
                    success: function(r) {
                        var i = r.data;
                        "json" == e.responseType && (i = JSON.parse(i)), t(i);
                    },
                    fail: function() {
                        i();
                    }
                });
            }, i.prototype.send = function(e) {
                if (this._response = void 0, this.isNetUrl(this._url)) {
                    var t = this;
                    wx.request({
                        data: e,
                        url: this._url,
                        method: this._method,
                        header: this.headerObj,
                        responseType: this.responseType,
                        success: function(e) {
                            var i = e.data, a = e.statusCode, n = e.header;
                            if (200 == a) {
                                if ("string" != typeof i && !(i instanceof ArrayBuffer)) try {
                                    i = JSON.stringify(i);
                                } catch (e) {
                                    i = i;
                                }
                                t._responseHeader = n, t._response = i, t.dispatchEventWith(r.Event.COMPLETE);
                            } else t.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                        },
                        fail: function(e) {
                            t.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                        }
                    });
                } else this.readFileAsync();
            }, i.prototype.isNetUrl = function(e) {
                return -1 != e.indexOf("http://") || -1 != e.indexOf("HTTP://") || -1 != e.indexOf("https://") || -1 != e.indexOf("HTTPS://");
            }, i.prototype.abort = function() {}, i.prototype.getAllResponseHeaders = function() {
                var e = this._responseHeader;
                return e ? Object.keys(e).map(function(t) {
                    return t + ": " + e[t];
                }).join("\n") : null;
            }, i.prototype.setRequestHeader = function(e, t) {
                this.headerObj || (this.headerObj = {}), this.headerObj[e] = t;
            }, i.prototype.getResponseHeader = function(e) {
                if (!this._responseHeader) return null;
                var t = this._responseHeader[e];
                return t || "";
            }, i.prototype.updateProgress = function(e) {
                e.lengthComputable && r.ProgressEvent.dispatchProgressEvent(this, r.ProgressEvent.PROGRESS, e.loaded, e.total);
            }, i;
        }(r.EventDispatcher);
        i.WebHttpRequest = a, e(a.prototype, "egret.wxgame.WebHttpRequest", [ "egret.HttpRequest" ]), 
        r.HttpRequest = a;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        window.URL || window.webkitURL;
        var a = function(e) {
            function a() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.data = null, t._crossOrigin = null, t._hasCrossOriginSet = !1, t.currentImage = null, 
                t.request = null, t;
            }
            return t(a, e), Object.defineProperty(a.prototype, "crossOrigin", {
                get: function() {
                    return this._crossOrigin;
                },
                set: function(e) {
                    this._hasCrossOriginSet = !0, this._crossOrigin = e;
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.load = function(e) {
                this.loadImage(e);
            }, a.prototype.loadImage = function(e) {
                var t = new Image();
                this.data = null, this.currentImage = t, this._hasCrossOriginSet ? this._crossOrigin && (t.crossOrigin = this._crossOrigin) : a.crossOrigin && (t.crossOrigin = a.crossOrigin), 
                t.onload = this.onImageComplete.bind(this), t.onerror = this.onLoadError.bind(this), 
                t.src = e;
            }, a.prototype.onImageComplete = function(e) {
                var t = this.getImage(e);
                if (t) {
                    this.data = new r.BitmapData(t), i.preUploadTexture && "webgl" == r.Capabilities.renderMode && i.WebGLRenderContext.getInstance(null, null).getWebGLTexture(this.data);
                    var a = this;
                    window.setTimeout(function() {
                        a.dispatchEventWith(r.Event.COMPLETE);
                    }, 0);
                }
            }, a.prototype.onLoadError = function(e) {
                var t = this.getImage(e);
                t && this.dispatchIOError(t.src);
            }, a.prototype.dispatchIOError = function(e) {
                var t = this;
                window.setTimeout(function() {
                    t.hasEventListener(r.IOErrorEvent.IO_ERROR) || r.$error(1011, e), t.dispatchEventWith(r.IOErrorEvent.IO_ERROR);
                }, 0);
            }, a.prototype.getImage = function(e) {
                var t = e.target;
                t.src;
                return t.onerror = null, t.onload = null, this.currentImage !== t ? null : (this.currentImage = null, 
                t);
            }, a.crossOrigin = null, a;
        }(r.EventDispatcher);
        i.WebImageLoader = a, e(a.prototype, "egret.wxgame.WebImageLoader", [ "egret.ImageLoader" ]), 
        r.ImageLoader = a;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t.textValue = "", t.onKeyboardComplete = t.onKeyboardComplete.bind(t), t.onKeyboardInput = t.onKeyboardInput.bind(t), 
                t;
            }
            return t(i, e), i.prototype.$setTextField = function(e) {
                return this.$textfield = e, !0;
            }, i.prototype.$addToStage = function() {}, i.prototype.$show = function() {
                var e = {
                    defaultValue: this.$textfield.text,
                    multiple: this.$textfield.multiline,
                    confirmHold: !0,
                    confirmType: "done",
                    fail: function(e) {
                        console.log(e.errMsg);
                    }
                };
                this.$textfield.maxChars && (e.maxLength = this.$textfield.maxChars), wx.showKeyboard(e), 
                wx.onKeyboardConfirm(this.onKeyboardComplete), wx.onKeyboardComplete(this.onKeyboardComplete), 
                wx.onKeyboardInput(this.onKeyboardInput), this.dispatchEvent(new r.Event("focus"));
            }, i.prototype.onKeyboardInput = function(e) {
                this.textValue = e.value, r.Event.dispatchEvent(this, "updateText", !1);
            }, i.prototype.onKeyboardComplete = function(e) {
                this.$textfield.text = e.value, this.$hide();
            }, i.prototype.$hide = function() {
                wx.offKeyboardComplete(), wx.offKeyboardConfirm(), wx.offKeyboardInput(), wx.hideKeyboard({}), 
                this.dispatchEvent(new r.Event("blur"));
            }, i.prototype.$getText = function() {
                return this.textValue || (this.textValue = ""), this.textValue;
            }, i.prototype.$setText = function(e) {
                return this.textValue = e, !0;
            }, i.prototype.$setColor = function(e) {
                return !0;
            }, i.prototype.$onBlur = function() {}, i.prototype.$removeFromStage = function() {}, 
            i.prototype.$resetStageText = function() {}, i;
        }(r.EventDispatcher);
        i.HTML5StageText = a, e(a.prototype, "egret.wxgame.HTML5StageText", [ "egret.StageText" ]), 
        r.StageText = a;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(e) {
    var t;
    e.wxgame || (e.wxgame = {}), t = null, e.sys.measureText = function(r, i, a, n, o) {
        t || ((t = e.sys.canvasHitTestBuffer.context).textAlign = "left", t.textBaseline = "middle");
        var s = "";
        o && (s += "italic "), n && (s += "bold "), s += (a || 12) + "px ", s += i || "Arial", 
        t.font = s;
        var c = t.measureText(r);
        return c ? c.width : (e.warn("wxcontext.measureText result is null or undefined;text is " + r + "; font is " + s), 
        1);
    };
}(egret || (egret = {})), function(t) {
    !function(r) {
        var i = function() {
            function e(e, t, i) {
                i ? r.isSubContext ? this.surface = window.sharedCanvas : this.surface = window.canvas : this.surface = function(e, t) {
                    var r = document.createElement("canvas");
                    isNaN(e) || isNaN(t) || (r.width = e, r.height = t);
                    var i = r.getContext("2d");
                    if (void 0 === i.imageSmoothingEnabled) {
                        for (var a, n = [ "webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled" ], o = n.length - 1; o >= 0 && void 0 === i[a = n[o]]; o--) ;
                        try {
                            Object.defineProperty(i, "imageSmoothingEnabled", {
                                get: function() {
                                    return this[a];
                                },
                                set: function(e) {
                                    this[a] = e;
                                }
                            });
                        } catch (e) {
                            i.imageSmoothingEnabled = i[a];
                        }
                    }
                    return r;
                }(e, t), this.context = this.surface.getContext("2d"), this.context && (this.context.$offsetX = 0, 
                this.context.$offsetY = 0);
            }
            return Object.defineProperty(e.prototype, "width", {
                get: function() {
                    return this.surface.width;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "height", {
                get: function() {
                    return this.surface.height;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.resize = function(e, i, a) {
                var n = this.surface;
                if (!r.isSubContext) {
                    if (a) {
                        var o = !1;
                        n.width < e && (n.width = e, "canvas" === t.Capabilities.renderMode && (window.sharedCanvas.width = e), 
                        o = !0), n.height < i && (n.height = i, "canvas" === t.Capabilities.renderMode && (window.sharedCanvas.height = i), 
                        o = !0), o || (this.context.globalCompositeOperation = "source-over", this.context.setTransform(1, 0, 0, 1, 0, 0), 
                        this.context.globalAlpha = 1);
                    } else n.width != e && (n.width = e, "canvas" === t.Capabilities.renderMode && (window.sharedCanvas.width = e)), 
                    n.height != i && (n.height = i, "canvas" === t.Capabilities.renderMode && (window.sharedCanvas.height = i));
                    this.clear();
                }
            }, e.prototype.getPixels = function(e, t, r, i) {
                return void 0 === r && (r = 1), void 0 === i && (i = 1), this.context.getImageData(e, t, r, i).data;
            }, e.prototype.toDataURL = function(e, t) {
                return this.surface.toDataURL(e, t);
            }, e.prototype.clear = function() {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.surface.width, this.surface.height);
            }, e.prototype.destroy = function() {
                this.surface.width = this.surface.height = 0;
            }, e;
        }();
        r.CanvasRenderBuffer = i, e(i.prototype, "egret.wxgame.CanvasRenderBuffer", [ "egret.sys.RenderBuffer" ]);
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a(t, i) {
                var a = e.call(this) || this;
                return a.onTouchBegin = function(e) {
                    var t = a.getLocation(e);
                    a.touch.onTouchBegin(t.x, t.y, e.identifier);
                }, a.onTouchMove = function(e) {
                    var t = a.getLocation(e);
                    a.touch.onTouchMove(t.x, t.y, e.identifier);
                }, a.onTouchEnd = function(e) {
                    var t = a.getLocation(e);
                    a.touch.onTouchEnd(t.x, t.y, e.identifier);
                }, a.scaleX = 1, a.scaleY = 1, a.rotation = 0, a.canvas = i, a.touch = new r.sys.TouchHandler(t), 
                a.addTouchListener(), a;
            }
            return t(a, e), a.prototype.addTouchListener = function() {
                var e = this;
                i.isSubContext ? (wx.onTouchStart(function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchBegin(t.changedTouches[i]);
                }), wx.onTouchMove(function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchMove(t.changedTouches[i]);
                }), wx.onTouchEnd(function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                }), wx.onTouchCancel(function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                })) : (e.canvas.addEventListener("touchstart", function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchBegin(t.changedTouches[i]);
                    e.prevent(t);
                }, !1), e.canvas.addEventListener("touchmove", function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchMove(t.changedTouches[i]);
                    e.prevent(t);
                }, !1), e.canvas.addEventListener("touchend", function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t);
                }, !1), e.canvas.addEventListener("touchcancel", function(t) {
                    for (var r = t.changedTouches.length, i = 0; i < r; i++) e.onTouchEnd(t.changedTouches[i]);
                    e.prevent(t);
                }, !1));
            }, a.prototype.prevent = function(e) {
                e.stopPropagation(), 1 == e.isScroll || this.canvas.userTyping || e.preventDefault();
            }, a.prototype.getLocation = function(e) {
                document.documentElement;
                var t = this.canvas.getBoundingClientRect(), i = t.left, a = t.top, n = e.pageX - i, o = n, s = e.pageY - a, c = s;
                return 90 == this.rotation ? (o = s, c = t.width - n) : -90 == this.rotation && (o = t.height - s, 
                c = n), o /= this.scaleX, c /= this.scaleY, r.$TempPoint.setTo(Math.round(o), Math.round(c));
            }, a.prototype.updateScaleMode = function(e, t, r) {
                this.scaleX = e, this.scaleY = t, this.rotation = r;
            }, a.prototype.$updateMaxTouches = function() {
                this.touch.$initMaxTouches();
            }, a;
        }(r.HashObject);
        i.WebTouchHandler = a, e(a.prototype, "egret.wxgame.WebTouchHandler");
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(e) {
    !function(e) {
        var t = !0;
        e.WebLifeCycleHandler = function(e) {
            wx.onShow && wx.onShow(function() {
                t || (e.resume(), t = !0);
            }), wx.onHide && wx.onHide(function() {
                t && (e.pause(), t = !1);
            });
        };
    }(e.wxgame || (e.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function() {
            function e() {}
            return e.WEB_AUDIO = 2, e.HTML5_AUDIO = 3, e;
        }();
        i.AudioType = a, e(a.prototype, "egret.wxgame.AudioType");
        var n = function(e) {
            function n() {
                return e.call(this) || this;
            }
            return t(n, e), n.$init = function() {
                var e = wx.getSystemInfoSync();
                n.systemInfo = e, n._canUseBlob = !1;
                var t = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
                if (t) try {
                    i.WebAudioDecode.ctx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
                } catch (e) {
                    t = !1;
                }
                var o, s = n._audioType;
                s == a.WEB_AUDIO && t || s == a.HTML5_AUDIO ? (o = !1, n.setAudioType(s)) : (o = !0, 
                n.setAudioType(a.HTML5_AUDIO));
                var c = e.platform;
                c.indexOf("android") >= 0 ? o && t && n.setAudioType(a.WEB_AUDIO) : (c.indexOf("iphone") >= 0 || c.indexOf("ipad") >= 0 || c.indexOf("ipod") >= 0) && n.getIOSVersion() >= 7 && (n._canUseBlob = !0, 
                o && t && n.setAudioType(a.WEB_AUDIO)), window.URL || window.webkitURL || (n._canUseBlob = !1), 
                r.Sound = n._AudioClass;
            }, n.setAudioType = function(e) {
                switch (n._audioType = e, e) {
                  case a.WEB_AUDIO:
                    n._AudioClass = i.WebAudioSound;
                    break;

                  case a.HTML5_AUDIO:
                    n._AudioClass = i.HtmlSound;
                }
            }, n.getIOSVersion = function() {
                var e = n.systemInfo.system;
                return parseInt(e.match(/\d+(_\d)*/)[0]) || 0;
            }, n._canUseBlob = !1, n._audioType = 0, n;
        }(r.HashObject);
        i.Html5Capatibility = n, e(n.prototype, "egret.wxgame.Html5Capatibility");
        var o = null;
        function s(e, t) {
            if (e in t) return "";
            e = e.charAt(0).toUpperCase() + e.substring(1, e.length);
            for (var r = [ "webkit", "ms", "Moz", "O" ], i = 0; i < r.length; i++) {
                if (r[i] + e in t) return r[i];
            }
            return "";
        }
        i.getPrefixStyleName = function(e, t) {
            var r = "";
            if (null != t) r = s(e, t); else {
                if (null == o) {
                    var i = document.createElement("div").style;
                    o = s("transform", i);
                }
                r = o;
            }
            return "" == r ? e : r + e.charAt(0).toUpperCase() + e.substring(1, e.length);
        }, i.getPrefix = s;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(e) {
    !function(e) {
        e.version = "1.1.12", e.isSubContext = !1, e.preUploadTexture = !1;
    }(e.wxgame || (e.wxgame = {}));
}(egret || (egret = {})), function(e) {
    !function(t) {
        var r = !1;
        e.runEgret = function(n) {
            if (!r) {
                if (r = !0, n || (n = {}), t.Html5Capatibility._audioType = n.audioType, t.Html5Capatibility.$init(), 
                "webgl" == n.renderMode) {
                    var o = n.antialias;
                    t.WebGLRenderContext.antialias = !!o;
                }
                var s;
                if (e.sys.CanvasRenderBuffer = t.CanvasRenderBuffer, "webgl" === n.renderMode ? (e.Capabilities.renderMode = "webgl", 
                e.sys.RenderBuffer = t.WebGLRenderBuffer, e.sys.systemRenderer = new t.WebGLRenderer(), 
                e.sys.canvasRenderer = new e.CanvasRenderer(), e.sys.customHitTestBuffer = new t.WebGLRenderBuffer(3, 3), 
                e.sys.canvasHitTestBuffer = new t.CanvasRenderBuffer(3, 3)) : (e.Capabilities.renderMode = "canvas", 
                e.sys.RenderBuffer = t.CanvasRenderBuffer, e.sys.systemRenderer = new e.CanvasRenderer(), 
                e.sys.canvasRenderer = e.sys.systemRenderer, e.sys.customHitTestBuffer = new t.CanvasRenderBuffer(3, 3), 
                e.sys.canvasHitTestBuffer = e.sys.customHitTestBuffer), n.canvasScaleFactor) s = n.canvasScaleFactor; else if (n.calculateCanvasScaleFactor) s = n.calculateCanvasScaleFactor(e.sys.canvasHitTestBuffer.context); else {
                    var c = e.sys.canvasHitTestBuffer.context, h = c.backingStorePixelRatio || c.webkitBackingStorePixelRatio || c.mozBackingStorePixelRatio || c.msBackingStorePixelRatio || c.oBackingStorePixelRatio || c.backingStorePixelRatio || 1;
                    s = (window.devicePixelRatio || 1) / h;
                }
                e.sys.DisplayList.$canvasScaleFactor = s, !function(e) {
                    var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                    t || (t = function(e) {
                        return window.setTimeout(e, 1e3 / 60);
                    });
                    t(function r() {
                        t(r), e.update(!0);
                    });
                }(e.ticker), n.screenAdapter ? e.sys.screenAdapter = n.screenAdapter : e.sys.screenAdapter || (e.sys.screenAdapter = new e.sys.DefaultScreenAdapter());
                var u = new t.WebPlayer({}, n);
                window.player = u, window.addEventListener("resize", function() {
                    isNaN(i) && (i = window.setTimeout(a, 300));
                });
            }
        }, e.updateAllScreens = function() {
            r && window.player.updateScreenSize();
        };
        var i = NaN;
        function a() {
            i = NaN, e.updateAllScreens();
        }
    }(e.wxgame || (e.wxgame = {}));
}(egret || (egret = {}));

var r = wx.getSystemInfoSync().language.toLowerCase();

(r = r.indexOf("zh") > -1 ? "zh_CN" : "en_US") in egret.$locale_strings && (egret.$language = r), 
egret.Capabilities.runtimeType = egret.RuntimeType.WXGAME, function(t) {
    !function(r) {
        var i = function() {
            function e() {}
            return e.detect = function() {
                var e = t.Capabilities;
                e.isMobile = !0;
                var r = wx.getSystemInfoSync(), i = r.system.toLowerCase();
                i.indexOf("ios") > -1 ? e.os = "iOS" : i.indexOf("android") > -1 && (e.os = "Android");
                var a = r.language;
                a = a.indexOf("zh") > -1 ? "zh-CN" : "en-US", e.language = a;
            }, e;
        }();
        r.WebCapability = i, e(i.prototype, "egret.wxgame.WebCapability"), i.detect();
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), null == window.HTMLDivElement && (window.HTMLDivElement = HTMLElement), 
null == window.HTMLVideoElement && (window.HTMLVideoElement = HTMLDivElement), function(e) {
    e.wxgame || (e.wxgame = {}), e.registerClass(HTMLImageElement, "egret.BitmapData"), 
    e.registerClass(HTMLCanvasElement, "egret.BitmapData"), e.registerClass(HTMLVideoElement, "egret.BitmapData");
}(egret || (egret = {})), function(e) {
    e.$toBitmapData = function(t) {
        return t.hashCode = t.$hashCode = e.$hashCount++, t;
    };
}(egret || (egret = {})), function(e) {
    !function(t) {
        function r(e) {
            var t = wx.getLaunchOptionsSync();
            return t.query[e] || t[e];
        }
        t.getOption = r, e.getOption = r;
    }(e.wxgame || (e.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function a(t, r) {
                var i = e.call(this) || this;
                return i.init(t, r), i.initOrientation(), i;
            }
            return t(a, e), a.prototype.init = function(e, t) {
                var a = this.readOption(e, t), n = new r.Stage();
                n.$screen = this, n.$scaleMode = a.scaleMode, n.$orientation = a.orientation, n.$maxTouches = a.maxTouches, 
                n.frameRate = a.frameRate, wx.setPreferredFramesPerSecond(n.frameRate), n.textureScaleFactor = a.textureScaleFactor;
                var o = new r.sys.RenderBuffer(void 0, void 0, !0), s = o.surface;
                this.attachCanvas(e, s);
                var c = new i.WebTouchHandler(n, s), h = new r.sys.Player(o, n, a.entryClassName);
                r.lifecycle.stage = n, r.lifecycle.addLifecycleListener(i.WebLifeCycleHandler), 
                (a.showFPS || a.showLog) && h.displayFPS(a.showFPS, a.showLog, a.logFilter, a.fpsStyles), 
                this.playerOption = a, this.container = e, this.canvas = s, this.stage = n, this.player = h, 
                this.webTouchHandler = c, this.updateScreenSize(), this.updateMaxTouches(), h.start();
            }, a.prototype.initOrientation = function() {
                var e = this;
                window.addEventListener("orientationchange", function() {
                    window.setTimeout(function() {
                        r.StageOrientationEvent.dispatchStageOrientationEvent(e.stage, r.StageOrientationEvent.ORIENTATION_CHANGE);
                    }, 350);
                });
            }, a.prototype.readOption = function(e, t) {
                var i = {};
                if (i.entryClassName = t.entryClassName || "Main", i.scaleMode = t.scaleMode || r.StageScaleMode.FIXED_WIDTH, 
                !i.scaleMode || i.scaleMode == r.StageScaleMode.SHOW_ALL) {
                    i.scaleMode = r.StageScaleMode.FIXED_WIDE;
                    var a = r.sys.tr(4500, "showAll", "fixedWidth");
                    console.warn(a);
                }
                i.frameRate = t.frameRate || 30, i.contentWidth = t.contentWidth || 640, i.contentHeight = t.contentHeight || 1136, 
                i.orientation = t.orientation || r.OrientationMode.AUTO, i.maxTouches = t.maxTouches, 
                i.textureScaleFactor = 1, i.showFPS = t.showFPS;
                for (var n = (t.fpsStyles || "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9").split(","), o = {}, s = 0; s < n.length; s++) {
                    var c = n[s].split(":");
                    o[c[0]] = c[1];
                }
                return i.fpsStyles = o, i.showLog = !1, i.logFilter = "", i;
            }, a.prototype.attachCanvas = function(e, t) {
                var r = t.style;
                r.cursor = "inherit", r.position = "absolute", r.top = "0", r.bottom = "0", r.left = "0", 
                r.right = "0";
            }, a.prototype.updateScreenSize = function() {
                var e = this.canvas;
                if (!e.userTyping) {
                    var t = this.playerOption, a = e.getBoundingClientRect(), n = 0, o = a.width, s = a.height;
                    a.top < 0 && (s += a.top, n = -a.top);
                    var c = !1, h = this.stage.$orientation;
                    h != r.OrientationMode.AUTO && (c = h != r.OrientationMode.PORTRAIT && s > o || h == r.OrientationMode.PORTRAIT && o > s);
                    var u = c ? s : o, d = c ? o : s;
                    r.Capabilities.boundingClientWidth = u, r.Capabilities.boundingClientHeight = d;
                    var l = r.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, u, d, t.contentWidth, t.contentHeight), f = l.stageWidth, p = l.stageHeight, g = l.displayWidth, v = l.displayHeight;
                    e.style[i.getPrefixStyleName("transformOrigin")] = "0% 0% 0px", e.width != f && (i.isSubContext || (window.sharedCanvas && (window.sharedCanvas.width = f), 
                    e.width = f)), e.height != p && (i.isSubContext || (window.sharedCanvas && (window.sharedCanvas.height = p), 
                    e.height = p));
                    var x = 0;
                    c ? h == r.OrientationMode.LANDSCAPE ? (x = 90, e.style.top = n + (s - g) / 2 + "px", 
                    e.style.left = (o + v) / 2 + "px") : (x = -90, e.style.top = n + (s + g) / 2 + "px", 
                    e.style.left = (o - v) / 2 + "px") : (e.style.top = n + (s - v) / 2 + "px", e.style.left = (o - g) / 2 + "px");
                    var m = g / f, y = v / p, w = m * r.sys.DisplayList.$canvasScaleFactor, b = y * r.sys.DisplayList.$canvasScaleFactor, T = new r.Matrix();
                    T.scale(m / w, y / b), T.rotate(x * Math.PI / 180);
                    var E = "matrix(" + T.a + "," + T.b + "," + T.c + "," + T.d + "," + T.tx + "," + T.ty + ")";
                    e.style[i.getPrefixStyleName("transform")] = E, r.sys.DisplayList.$setCanvasScale(w, b), 
                    this.webTouchHandler.updateScaleMode(m, y, x), this.player.updateStageSize(f, p);
                }
            }, a.prototype.setContentSize = function(e, t) {
                var r = this.playerOption;
                r.contentWidth = e, r.contentHeight = t, this.updateScreenSize();
            }, a.prototype.updateMaxTouches = function() {
                this.webTouchHandler.$updateMaxTouches();
            }, a;
        }(r.HashObject);
        i.WebPlayer = a, e(a.prototype, "egret.wxgame.WebPlayer", [ "egret.sys.Screen" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(e) {
    !function(t) {
        var r, i;
        function a(t, a) {
            r || (r = document.createElement("canvas"), i = r.getContext("2d"));
            var n = t.$getTextureWidth(), o = t.$getTextureHeight();
            null == a && ((a = e.$TempRectangle).x = 0, a.y = 0, a.width = n, a.height = o), 
            a.x = Math.min(a.x, n - 1), a.y = Math.min(a.y, o - 1), a.width = Math.min(a.width, n - a.x), 
            a.height = Math.min(a.height, o - a.y);
            var s = Math.floor(a.width), c = Math.floor(a.height), h = r;
            if (h.style.width = s + "px", h.style.height = c + "px", r.width = s, r.height = c, 
            "webgl" == e.Capabilities.renderMode) {
                var u = void 0;
                t.$renderBuffer ? u = t : (u = new e.RenderTexture()).drawToTexture(new e.Bitmap(t));
                for (var d = u.$renderBuffer.getPixels(a.x, a.y, s, c), l = 0, f = 0, p = 0; p < d.length; p += 4) i.fillStyle = "rgba(" + d[p] + "," + d[p + 1] + "," + d[p + 2] + "," + d[p + 3] / 255 + ")", 
                i.fillRect(l, f, 1, 1), ++l == s && (l = 0, f++);
                return t.$renderBuffer || u.dispose(), h;
            }
            var g = t, v = Math.round(g.$offsetX), x = Math.round(g.$offsetY), m = g.$bitmapWidth, y = g.$bitmapHeight;
            return i.drawImage(g.$bitmapData.source, g.$bitmapX + a.x / e.$TextureScaleFactor, g.$bitmapY + a.y / e.$TextureScaleFactor, m * a.width / n, y * a.height / o, v, x, a.width, a.height), 
            h;
        }
        e.Texture.prototype.toDataURL = function(t, r, i) {
            try {
                return a(this, r).toDataURL(t, i);
            } catch (t) {
                e.$error(1033);
            }
            return null;
        }, e.Texture.prototype.saveToFile = function(e, t, r, i) {
            var n = a(this, r).toTempFilePathSync({
                fileType: e.indexOf("png") >= 0 ? "png" : "jpg"
            });
            return wx.getFileSystemManager().saveFile({
                tempFilePath: n,
                filePath: wx.env.USER_DATA_PATH + "/" + t,
                success: function(e) {}
            }), n;
        }, e.Texture.prototype.getPixel32 = function(t, r) {
            return e.$warn(1041, "getPixel32", "getPixels"), this.getPixels(t, r);
        }, e.Texture.prototype.getPixels = function(t, r, n, o) {
            if (void 0 === n && (n = 1), void 0 === o && (o = 1), "webgl" == e.Capabilities.renderMode) {
                var s = void 0;
                return this.$renderBuffer ? s = this : (s = new e.RenderTexture()).drawToTexture(new e.Bitmap(this)), 
                s.$renderBuffer.getPixels(t, r, n, o);
            }
            try {
                a(this);
                return i.getImageData(t, r, n, o).data;
            } catch (t) {
                e.$error(1039);
            }
        };
    }(e.wxgame || (e.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e, t) {
            this.nodeType = e, this.parent = t;
        };
        i.XMLNode = a, e(a.prototype, "egret.wxgame.XMLNode");
        var n = function(e) {
            function r(t, r, i, a, n) {
                var o = e.call(this, 1, r) || this;
                return o.attributes = {}, o.children = [], o.localName = t, o.prefix = i, o.namespace = a, 
                o.name = n, o;
            }
            return t(r, e), r;
        }(a);
        i.XML = n, e(n.prototype, "egret.wxgame.XML");
        var o, s = function(e) {
            function r(t, r) {
                var i = e.call(this, 3, r) || this;
                return i.text = t, i;
            }
            return t(r, e), r;
        }(a);
        function c(e, t) {
            if ("parsererror" == e.localName) throw new Error(e.textContent);
            for (var r = new n(e.localName, t, e.prefix, e.namespaceURI, e.nodeName), i = e.attributes, a = r.attributes, o = i.length, h = 0; h < o; h++) {
                var u = i[h], d = u.name;
                0 != d.indexOf("xmlns:") && (a[d] = u.value, r["$" + d] = u.value);
            }
            var l = e.childNodes;
            o = l.length;
            var f = r.children;
            for (h = 0; h < o; h++) {
                var p = l[h], g = p.nodeType, v = null;
                if (1 == g) v = c(p, r); else if (3 == g) {
                    var x = p.textContent.trim();
                    x && (v = new s(x, r));
                }
                v && f.push(v);
            }
            return r;
        }
        i.XMLText = s, e(s.prototype, "egret.wxgame.XMLText"), r.XML = {
            parse: function(e) {
                o || (window.DOMParser ? o = new DOMParser() : console.error("?????? XML ????????????????????? http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/index.html#xml ????????????"));
                for (var t = o.parseFromString(e, "text/xml"), r = t.childNodes.length, i = 0; i < r; i++) {
                    var a = t.childNodes[i];
                    if (1 == a.nodeType) return c(a, null);
                }
                return null;
            }
        };
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.onChange = function(e) {
                    var i = new r.OrientationEvent(r.Event.CHANGE);
                    i.beta = e.beta, i.gamma = e.gamma, i.alpha = e.alpha, t.dispatchEvent(i);
                }, t;
            }
            return t(i, e), i.prototype.start = function() {
                window.addEventListener("deviceorientation", this.onChange);
            }, i.prototype.stop = function() {
                window.removeEventListener("deviceorientation", this.onChange);
            }, i;
        }(r.EventDispatcher);
        i.WebDeviceOrientation = a, e(a.prototype, "egret.wxgame.WebDeviceOrientation", [ "egret.DeviceOrientation" ]);
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), egret.DeviceOrientation = egret.wxgame.WebDeviceOrientation, 
function(r) {
    !function(i) {
        var a = function(e) {
            function i(t) {
                var i = e.call(this) || this;
                return i.onUpdate = function(e) {
                    var t = new r.GeolocationEvent(r.Event.CHANGE), a = e.coords;
                    t.altitude = a.altitude, t.heading = a.heading, t.accuracy = a.accuracy, t.latitude = a.latitude, 
                    t.longitude = a.longitude, t.speed = a.speed, t.altitudeAccuracy = a.altitudeAccuracy, 
                    i.dispatchEvent(t);
                }, i.onError = function(e) {
                    var t = r.GeolocationEvent.UNAVAILABLE;
                    e.code == e.PERMISSION_DENIED && (t = r.GeolocationEvent.PERMISSION_DENIED);
                    var a = new r.GeolocationEvent(r.IOErrorEvent.IO_ERROR);
                    a.errorType = t, a.errorMessage = e.message, i.dispatchEvent(a);
                }, i.geolocation = navigator.geolocation, i;
            }
            return t(i, e), i.prototype.start = function() {
                var e = this.geolocation;
                e ? this.watchId = e.watchPosition(this.onUpdate, this.onError) : this.onError({
                    code: 2,
                    message: r.sys.tr(3004),
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2
                });
            }, i.prototype.stop = function() {
                this.geolocation.clearWatch(this.watchId);
            }, i;
        }(r.EventDispatcher);
        i.WebGeolocation = a, e(a.prototype, "egret.wxgame.WebGeolocation", [ "egret.Geolocation" ]), 
        r.Geolocation = r.wxgame.WebGeolocation;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.onChange = function(e) {
                    var i = new r.MotionEvent(r.Event.CHANGE), a = {
                        x: e.acceleration.x,
                        y: e.acceleration.y,
                        z: e.acceleration.z
                    }, n = {
                        x: e.accelerationIncludingGravity.x,
                        y: e.accelerationIncludingGravity.y,
                        z: e.accelerationIncludingGravity.z
                    }, o = {
                        alpha: e.rotationRate.alpha,
                        beta: e.rotationRate.beta,
                        gamma: e.rotationRate.gamma
                    };
                    i.acceleration = a, i.accelerationIncludingGravity = n, i.rotationRate = o, t.dispatchEvent(i);
                }, t;
            }
            return t(i, e), i.prototype.start = function() {
                window.addEventListener("devicemotion", this.onChange);
            }, i.prototype.stop = function() {
                window.removeEventListener("devicemotion", this.onChange);
            }, i;
        }(r.EventDispatcher);
        i.WebMotion = a, e(a.prototype, "egret.wxgame.WebMotion", [ "egret.Motion" ]), r.Motion = r.wxgame.WebMotion;
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(e) {
    var t;
    e.wxgame || (e.wxgame = {}), Object.defineProperty(e.Logger, "logLevel", {
        set: function(r) {
            switch (null == t && (t = {
                error: console.error,
                debug: console.debug,
                warn: console.warn,
                info: console.info,
                log: console.log
            }), r) {
              case e.Logger.OFF:
                console.error = function() {};

              case e.Logger.ERROR:
                console.warn = function() {};

              case e.Logger.WARN:
                console.info = function() {}, console.log = function() {};

              case e.Logger.INFO:
                console.debug = function() {};
            }
            switch (r) {
              case e.Logger.ALL:
              case e.Logger.DEBUG:
                console.debug = t.debug;

              case e.Logger.INFO:
                console.log = t.log, console.info = t.info;

              case e.Logger.WARN:
                console.warn = t.warn;

              case e.Logger.ERROR:
                console.error = t.error;
            }
        },
        enumerable: !0,
        configurable: !0
    });
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r = function() {
            function e() {
                this.drawData = [], this.drawDataLen = 0;
            }
            return e.prototype.pushDrawRect = function() {
                if (0 == this.drawDataLen || 11 != this.drawData[this.drawDataLen - 1].type) {
                    var e = this.drawData[this.drawDataLen] || {};
                    e.type = 11, e.count = 0, this.drawData[this.drawDataLen] = e, this.drawDataLen++;
                }
                this.drawData[this.drawDataLen - 1].count += 2;
            }, e.prototype.pushDrawTexture = function(e, t, r, i, a) {
                if (void 0 === t && (t = 2), r) {
                    (n = this.drawData[this.drawDataLen] || {}).type = 0, n.texture = e, n.filter = r, 
                    n.count = t, n.textureWidth = i, n.textureHeight = a, this.drawData[this.drawDataLen] = n, 
                    this.drawDataLen++;
                } else {
                    var n;
                    if (0 == this.drawDataLen || 0 != this.drawData[this.drawDataLen - 1].type || e != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) (n = this.drawData[this.drawDataLen] || {}).type = 0, 
                    n.texture = e, n.count = 0, this.drawData[this.drawDataLen] = n, this.drawDataLen++;
                    this.drawData[this.drawDataLen - 1].count += t;
                }
            }, e.prototype.pushChangeSmoothing = function(e, t) {
                e.smoothing = t;
                var r = this.drawData[this.drawDataLen] || {};
                r.type = 9, r.texture = e, r.smoothing = t, this.drawData[this.drawDataLen] = r, 
                this.drawDataLen++;
            }, e.prototype.pushPushMask = function(e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 1, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++;
            }, e.prototype.pushPopMask = function(e) {
                void 0 === e && (e = 1);
                var t = this.drawData[this.drawDataLen] || {};
                t.type = 2, t.count = 2 * e, this.drawData[this.drawDataLen] = t, this.drawDataLen++;
            }, e.prototype.pushSetBlend = function(e) {
                for (var t = !1, r = this.drawDataLen - 1; r >= 0; r--) {
                    var i = this.drawData[r];
                    if (i) {
                        if (0 != i.type && 11 != i.type || (t = !0), !t && 3 == i.type) {
                            this.drawData.splice(r, 1), this.drawDataLen--;
                            continue;
                        }
                        if (3 == i.type) {
                            if (i.value == e) return;
                            break;
                        }
                    }
                }
                var a = this.drawData[this.drawDataLen] || {};
                a.type = 3, a.value = e, this.drawData[this.drawDataLen] = a, this.drawDataLen++;
            }, e.prototype.pushResize = function(e, t, r) {
                var i = this.drawData[this.drawDataLen] || {};
                i.type = 4, i.buffer = e, i.width = t, i.height = r, this.drawData[this.drawDataLen] = i, 
                this.drawDataLen++;
            }, e.prototype.pushClearColor = function() {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 5, this.drawData[this.drawDataLen] = e, this.drawDataLen++;
            }, e.prototype.pushActivateBuffer = function(e) {
                for (var t = !1, r = this.drawDataLen - 1; r >= 0; r--) {
                    var i = this.drawData[r];
                    !i || (3 != i.type && 6 != i.type && (t = !0), t || 6 != i.type) || (this.drawData.splice(r, 1), 
                    this.drawDataLen--);
                }
                var a = this.drawData[this.drawDataLen] || {};
                a.type = 6, a.buffer = e, a.width = e.rootRenderTarget.width, a.height = e.rootRenderTarget.height, 
                this.drawData[this.drawDataLen] = a, this.drawDataLen++;
            }, e.prototype.pushEnableScissor = function(e, t, r, i) {
                var a = this.drawData[this.drawDataLen] || {};
                a.type = 7, a.x = e, a.y = t, a.width = r, a.height = i, this.drawData[this.drawDataLen] = a, 
                this.drawDataLen++;
            }, e.prototype.pushDisableScissor = function() {
                var e = this.drawData[this.drawDataLen] || {};
                e.type = 8, this.drawData[this.drawDataLen] = e, this.drawDataLen++;
            }, e.prototype.clear = function() {
                for (var e = 0; e < this.drawDataLen; e++) {
                    var t = this.drawData[e];
                    t.type = 0, t.count = 0, t.texture = null, t.filter = null, t.uv = null, t.value = "", 
                    t.buffer = null, t.width = 0, t.height = 0;
                }
                this.drawDataLen = 0;
            }, e;
        }();
        t.WebGLDrawCmdManager = r, e(r.prototype, "egret.wxgame.WebGLDrawCmdManager");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r = function() {
            function e() {
                this.size = 2e3, this.vertexMaxSize = 4 * this.size, this.indicesMaxSize = 6 * this.size, 
                this.vertSize = 5, this.vertices = null, this.indices = null, this.indicesForMesh = null, 
                this.vertexIndex = 0, this.indexIndex = 0, this.hasMesh = !1;
                var e = this.vertexMaxSize * this.vertSize, t = this.indicesMaxSize;
                this.vertices = new Float32Array(e), this.indices = new Uint16Array(t), this.indicesForMesh = new Uint16Array(t);
                for (var r = 0, i = 0; r < t; r += 6, i += 4) this.indices[r + 0] = i + 0, this.indices[r + 1] = i + 1, 
                this.indices[r + 2] = i + 2, this.indices[r + 3] = i + 0, this.indices[r + 4] = i + 2, 
                this.indices[r + 5] = i + 3;
            }
            return e.prototype.reachMaxSize = function(e, t) {
                return void 0 === e && (e = 4), void 0 === t && (t = 6), this.vertexIndex > this.vertexMaxSize - e || this.indexIndex > this.indicesMaxSize - t;
            }, e.prototype.getVertices = function() {
                return this.vertices.subarray(0, this.vertexIndex * this.vertSize);
            }, e.prototype.getIndices = function() {
                return this.indices;
            }, e.prototype.getMeshIndices = function() {
                return this.indicesForMesh;
            }, e.prototype.changeToMeshIndices = function() {
                if (!this.hasMesh) {
                    for (var e = 0, t = this.indexIndex; e < t; ++e) this.indicesForMesh[e] = this.indices[e];
                    this.hasMesh = !0;
                }
            }, e.prototype.isMesh = function() {
                return this.hasMesh;
            }, e.prototype.cacheArrays = function(e, t, r, i, a, n, o, s, c, h, u, d, l, f, p) {
                var g = e.globalAlpha, v = e.globalMatrix, x = v.a, m = v.b, y = v.c, w = v.d, b = v.tx, T = v.ty, E = e.$offsetX, C = e.$offsetY;
                if (0 == E && 0 == C || (b = E * x + C * y + b, T = E * m + C * w + T), !l) {
                    0 == n && 0 == o || (b = n * x + o * y + b, T = n * m + o * w + T);
                    var S = s / i;
                    1 != S && (x *= S, m *= S);
                    var L = c / a;
                    1 != L && (y *= L, w *= L);
                }
                if (l) {
                    var R, D = this.vertices, O = this.vertexIndex * this.vertSize, A = 0, _ = 0, $ = 0, M = 0, B = 0, I = 0;
                    for (A = 0, R = d.length; A < R; A += 2) _ = O + 5 * A / 2, B = l[A], I = l[A + 1], 
                    $ = d[A], M = d[A + 1], D[_ + 0] = x * B + y * I + b, D[_ + 1] = m * B + w * I + T, 
                    p ? (D[_ + 2] = (t + (1 - M) * a) / h, D[_ + 3] = (r + $ * i) / u) : (D[_ + 2] = (t + $ * i) / h, 
                    D[_ + 3] = (r + M * a) / u), D[_ + 4] = g;
                    if (this.hasMesh) for (var F = 0, P = f.length; F < P; ++F) this.indicesForMesh[this.indexIndex + F] = f[F] + this.vertexIndex;
                    this.vertexIndex += d.length / 2, this.indexIndex += f.length;
                } else {
                    var G = h, W = u, N = i, U = a;
                    t /= G, r /= W;
                    D = this.vertices, O = this.vertexIndex * this.vertSize;
                    if (p) {
                        var k = i;
                        i = a / G, a = k / W, D[O++] = b, D[O++] = T, D[O++] = i + t, D[O++] = r, D[O++] = g, 
                        D[O++] = x * N + b, D[O++] = m * N + T, D[O++] = i + t, D[O++] = a + r, D[O++] = g, 
                        D[O++] = x * N + y * U + b, D[O++] = w * U + m * N + T, D[O++] = t, D[O++] = a + r, 
                        D[O++] = g, D[O++] = y * U + b, D[O++] = w * U + T, D[O++] = t, D[O++] = r, D[O++] = g;
                    } else i /= G, a /= W, D[O++] = b, D[O++] = T, D[O++] = t, D[O++] = r, D[O++] = g, 
                    D[O++] = x * N + b, D[O++] = m * N + T, D[O++] = i + t, D[O++] = r, D[O++] = g, 
                    D[O++] = x * N + y * U + b, D[O++] = w * U + m * N + T, D[O++] = i + t, D[O++] = a + r, 
                    D[O++] = g, D[O++] = y * U + b, D[O++] = w * U + T, D[O++] = t, D[O++] = a + r, 
                    D[O++] = g;
                    if (this.hasMesh) {
                        var H = this.indicesForMesh;
                        H[this.indexIndex + 0] = 0 + this.vertexIndex, H[this.indexIndex + 1] = 1 + this.vertexIndex, 
                        H[this.indexIndex + 2] = 2 + this.vertexIndex, H[this.indexIndex + 3] = 0 + this.vertexIndex, 
                        H[this.indexIndex + 4] = 2 + this.vertexIndex, H[this.indexIndex + 5] = 3 + this.vertexIndex;
                    }
                    this.vertexIndex += 4, this.indexIndex += 6;
                }
            }, e.prototype.clear = function() {
                this.hasMesh = !1, this.vertexIndex = 0, this.indexIndex = 0;
            }, e;
        }();
        t.WebGLVertexArrayObject = r, e(r.prototype, "egret.wxgame.WebGLVertexArrayObject");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(r) {
    !function(i) {
        var a = function(e) {
            function i(t, r, i) {
                var a = e.call(this) || this;
                return a.clearColor = [ 0, 0, 0, 0 ], a.useFrameBuffer = !0, a.gl = t, a.width = r || 1, 
                a.height = i || 1, a;
            }
            return t(i, e), i.prototype.resize = function(e, t) {
                var r = this.gl;
                this.width = e, this.height = t, this.frameBuffer && (r.bindTexture(r.TEXTURE_2D, this.texture), 
                r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, t, 0, r.RGBA, r.UNSIGNED_BYTE, null)), 
                this.stencilBuffer && (r.deleteRenderbuffer(this.stencilBuffer), this.stencilBuffer = null);
            }, i.prototype.activate = function() {
                var e = this.gl;
                e.bindFramebuffer(e.FRAMEBUFFER, this.getFrameBuffer());
            }, i.prototype.getFrameBuffer = function() {
                return this.useFrameBuffer ? this.frameBuffer : null;
            }, i.prototype.initFrameBuffer = function() {
                if (!this.frameBuffer) {
                    var e = this.gl;
                    this.texture = this.createTexture(), this.frameBuffer = e.createFramebuffer(), e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), 
                    e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture, 0);
                }
            }, i.prototype.createTexture = function() {
                var e = this.gl, t = e.createTexture();
                return e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, null), 
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), 
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), 
                t;
            }, i.prototype.clear = function(e) {
                var t = this.gl;
                e && this.activate(), t.colorMask(!0, !0, !0, !0), t.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]), 
                t.clear(t.COLOR_BUFFER_BIT);
            }, i.prototype.enabledStencil = function() {
                if (this.frameBuffer && !this.stencilBuffer) {
                    var e = this.gl;
                    e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), this.stencilBuffer = e.createRenderbuffer(), 
                    e.bindRenderbuffer(e.RENDERBUFFER, this.stencilBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, this.width, this.height), 
                    e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, this.stencilBuffer);
                }
            }, i.prototype.dispose = function() {
                r.WebGLUtils.deleteWebGLTexture(this.texture);
            }, i;
        }(r.HashObject);
        i.WebGLRenderTarget = a, e(a.prototype, "egret.wxgame.WebGLRenderTarget");
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r = function() {
            function e(e, r) {
                this.glID = null, this.projectionX = NaN, this.projectionY = NaN, this.contextLost = !1, 
                this.$scissorState = !1, this.vertSize = 5, this.surface = window.canvas, this.initWebGL(), 
                this.$bufferStack = [];
                var i = this.context;
                this.vertexBuffer = i.createBuffer(), this.indexBuffer = i.createBuffer(), i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffer), 
                i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer), this.drawCmdManager = new t.WebGLDrawCmdManager(), 
                this.vao = new t.WebGLVertexArrayObject(), this.setGlobalCompositeOperation("source-over");
            }
            return e.getInstance = function(t, r) {
                return this.instance || (this.instance = new e(t, r)), this.instance;
            }, e.prototype.pushBuffer = function(e) {
                this.$bufferStack.push(e), e != this.currentBuffer && (this.currentBuffer, this.drawCmdManager.pushActivateBuffer(e)), 
                this.currentBuffer = e;
            }, e.prototype.popBuffer = function() {
                if (!(this.$bufferStack.length <= 1)) {
                    var e = this.$bufferStack.pop(), t = this.$bufferStack[this.$bufferStack.length - 1];
                    e != t && this.drawCmdManager.pushActivateBuffer(t), this.currentBuffer = t;
                }
            }, e.prototype.activateBuffer = function(e, t, r) {
                e.rootRenderTarget.activate(), this.bindIndices || this.uploadIndicesArray(this.vao.getIndices()), 
                e.restoreStencil(), e.restoreScissor(), this.onResize(t, r);
            }, e.prototype.uploadVerticesArray = function(e) {
                var t = this.context;
                t.bufferData(t.ARRAY_BUFFER, e, t.STREAM_DRAW);
            }, e.prototype.uploadIndicesArray = function(e) {
                var t = this.context;
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.STATIC_DRAW), this.bindIndices = !0;
            }, e.prototype.destroy = function() {
                this.surface.width = this.surface.height = 0;
            }, e.prototype.onResize = function(e, t) {
                e = e || this.surface.width, t = t || this.surface.height, this.projectionX = e / 2, 
                this.projectionY = -t / 2, this.context && this.context.viewport(0, 0, e, t);
            }, e.prototype.resize = function(e, r, i) {
                var a = this.surface;
                i ? (a.width < e && (a.width = e, !t.isSubContext && window.sharedCanvas && (window.sharedCanvas.width = e)), 
                a.height < r && (a.height = r, !t.isSubContext && window.sharedCanvas && (window.sharedCanvas.height = r))) : (a.width != e && (a.width = e, 
                !t.isSubContext && window.sharedCanvas && (window.sharedCanvas.width = e)), a.height != r && (a.height = r, 
                !t.isSubContext && window.sharedCanvas && (window.sharedCanvas.height = r))), this.onResize();
            }, e.prototype.initWebGL = function() {
                this.onResize(), this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1), 
                this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1), 
                this.getWebGLContext();
                var e = this.context;
                this.$maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE);
            }, e.prototype.handleContextLost = function() {
                this.contextLost = !0;
            }, e.prototype.handleContextRestored = function() {
                this.initWebGL(), this.contextLost = !1;
            }, e.prototype.getWebGLContext = function() {
                this.setContext(window.canvas.getContext("webgl"));
            }, e.prototype.setContext = function(t) {
                this.context = t, t.id = e.glContextId++, this.glID = t.id, t.disable(t.DEPTH_TEST), 
                t.disable(t.CULL_FACE), t.enable(t.BLEND), t.colorMask(!0, !0, !0, !0), t.activeTexture(t.TEXTURE0);
            }, e.prototype.enableStencilTest = function() {
                var e = this.context;
                e.enable(e.STENCIL_TEST);
            }, e.prototype.disableStencilTest = function() {
                var e = this.context;
                e.disable(e.STENCIL_TEST);
            }, e.prototype.enableScissorTest = function(e) {
                var t = this.context;
                t.enable(t.SCISSOR_TEST), t.scissor(e.x, e.y, e.width, e.height);
            }, e.prototype.disableScissorTest = function() {
                var e = this.context;
                e.disable(e.SCISSOR_TEST);
            }, e.prototype.getPixels = function(e, t, r, i, a) {
                var n = this.context;
                n.readPixels(e, t, r, i, n.RGBA, n.UNSIGNED_BYTE, a);
            }, e.prototype.createTexture = function(e) {
                var t = this.context;
                if (e.isCanvas && null != t.wxBindCanvasTexture) return e;
                var r = t.createTexture();
                if (r) return r.glContext = t, t.bindTexture(t.TEXTURE_2D, r), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), 
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), 
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), 
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), e.source && (e.source.src = ""), 
                r;
                this.contextLost = !0;
            }, e.prototype.createTextureFromCompressedData = function(e, t, r, i, a) {
                return null;
            }, e.prototype.updateTexture = function(e, t) {
                var r = this.context;
                r.bindTexture(r.TEXTURE_2D, e), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t);
            }, e.prototype.getWebGLTexture = function(e) {
                return e.webGLTexture || ("image" == e.format ? e.webGLTexture = this.createTexture(e.source) : "pvr" == e.format && (e.webGLTexture = this.createTextureFromCompressedData(e.source.pvrtcData, e.width, e.height, e.source.mipmapsCount, e.source.format)), 
                e.$deleteSource && e.webGLTexture && (e.source.src = "", e.source = null), e.webGLTexture.smoothing = !0), 
                e.webGLTexture;
            }, e.prototype.clearRect = function(e, t, r, i) {
                if (0 != e || 0 != t || r != this.surface.width || i != this.surface.height) {
                    var a = this.currentBuffer;
                    if (a.$hasScissor) this.setGlobalCompositeOperation("destination-out"), this.drawRect(e, t, r, i), 
                    this.setGlobalCompositeOperation("source-over"); else {
                        var n = a.globalMatrix;
                        0 == n.b && 0 == n.c ? (e = e * n.a + n.tx, t = t * n.d + n.ty, r *= n.a, i *= n.d, 
                        this.enableScissor(e, -t - i + a.height, r, i), this.clear(), this.disableScissor()) : (this.setGlobalCompositeOperation("destination-out"), 
                        this.drawRect(e, t, r, i), this.setGlobalCompositeOperation("source-over"));
                    }
                } else this.clear();
            }, e.prototype.setGlobalCompositeOperation = function(e) {
                this.drawCmdManager.pushSetBlend(e);
            }, e.prototype.drawImage = function(e, t, r, i, a, n, o, s, c, h, u, d, l) {
                var f = this.currentBuffer;
                if (!this.contextLost && e && f) {
                    var p, g, v;
                    if (e.texture || e.source && e.source.texture) p = e.texture || e.source.texture, 
                    f.saveTransform(), g = f.$offsetX, v = f.$offsetY, f.useOffset(), f.transform(1, 0, 0, -1, 0, c + 2 * o); else {
                        if (!e.source && !e.webGLTexture) return;
                        p = this.getWebGLTexture(e);
                    }
                    p && (this.drawTexture(p, t, r, i, a, n, o, s, c, h, u, void 0, void 0, void 0, void 0, d, l), 
                    e.source && e.source.texture && (f.$offsetX = g, f.$offsetY = v, f.restoreTransform()));
                }
            }, e.prototype.drawMesh = function(e, t, r, i, a, n, o, s, c, h, u, d, l, f, p, g, v) {
                var x = this.currentBuffer;
                if (!this.contextLost && e && x) {
                    var m, y, w;
                    if (e.texture || e.source && e.source.texture) m = e.texture || e.source.texture, 
                    x.saveTransform(), y = x.$offsetX, w = x.$offsetY, x.useOffset(), x.transform(1, 0, 0, -1, 0, c + 2 * o); else {
                        if (!e.source && !e.webGLTexture) return;
                        m = this.getWebGLTexture(e);
                    }
                    m && (this.drawTexture(m, t, r, i, a, n, o, s, c, h, u, d, l, f, p, g, v), (e.texture || e.source && e.source.texture) && (x.$offsetX = y, 
                    x.$offsetY = w, x.restoreTransform()));
                }
            }, e.prototype.drawTexture = function(e, t, r, i, a, n, o, s, c, h, u, d, l, f, p, g, v) {
                var x = this.currentBuffer;
                if (!this.contextLost && e && x) {
                    l && f ? this.vao.reachMaxSize(l.length / 2, f.length) && this.$drawWebGL() : this.vao.reachMaxSize() && this.$drawWebGL(), 
                    null != v && e.smoothing != v && this.drawCmdManager.pushChangeSmoothing(e, v), 
                    d && this.vao.changeToMeshIndices();
                    var m = f ? f.length / 3 : 2;
                    this.drawCmdManager.pushDrawTexture(e, m, this.$filter), this.vao.cacheArrays(x, t, r, i, a, n, o, s, c, h, u, d, l, f, g);
                }
            }, e.prototype.drawRect = function(e, t, r, i) {
                var a = this.currentBuffer;
                !this.contextLost && a && (this.vao.reachMaxSize() && this.$drawWebGL(), this.drawCmdManager.pushDrawRect(), 
                this.vao.cacheArrays(a, 0, 0, r, i, e, t, r, i, r, i));
            }, e.prototype.pushMask = function(e, t, r, i) {
                var a = this.currentBuffer;
                !this.contextLost && a && (a.$stencilList.push({
                    x: e,
                    y: t,
                    width: r,
                    height: i
                }), this.vao.reachMaxSize() && this.$drawWebGL(), this.drawCmdManager.pushPushMask(), 
                this.vao.cacheArrays(a, 0, 0, r, i, e, t, r, i, r, i));
            }, e.prototype.popMask = function() {
                var e = this.currentBuffer;
                if (!this.contextLost && e) {
                    var t = e.$stencilList.pop();
                    this.vao.reachMaxSize() && this.$drawWebGL(), this.drawCmdManager.pushPopMask(), 
                    this.vao.cacheArrays(e, 0, 0, t.width, t.height, t.x, t.y, t.width, t.height, t.width, t.height);
                }
            }, e.prototype.clear = function() {
                this.drawCmdManager.pushClearColor();
            }, e.prototype.enableScissor = function(e, t, r, i) {
                var a = this.currentBuffer;
                this.drawCmdManager.pushEnableScissor(e, t, r, i), a.$hasScissor = !0;
            }, e.prototype.disableScissor = function() {
                var e = this.currentBuffer;
                this.drawCmdManager.pushDisableScissor(), e.$hasScissor = !1;
            }, e.prototype.$drawWebGL = function() {
                if (0 != this.drawCmdManager.drawDataLen && !this.contextLost) {
                    this.uploadVerticesArray(this.vao.getVertices()), this.vao.isMesh() && this.uploadIndicesArray(this.vao.getMeshIndices());
                    for (var e = this.drawCmdManager.drawDataLen, t = 0, r = 0; r < e; r++) {
                        var i = this.drawCmdManager.drawData[r];
                        t = this.drawData(i, t), 6 == i.type && (this.activatedBuffer = i.buffer), 0 != i.type && 11 != i.type && 1 != i.type && 2 != i.type || this.activatedBuffer && this.activatedBuffer.$computeDrawCall && this.activatedBuffer.$drawCalls++;
                    }
                    this.vao.isMesh() && this.uploadIndicesArray(this.vao.getIndices()), this.drawCmdManager.clear(), 
                    this.vao.clear();
                }
            }, e.prototype.drawData = function(e, r) {
                if (e) {
                    var i, a = this.context, n = e.filter;
                    switch (e.type) {
                      case 0:
                        n ? "custom" === n.type ? i = t.EgretWebGLProgram.getProgram(a, n.$vertexSrc, n.$fragmentSrc, n.$shaderKey) : "colorTransform" === n.type ? i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.colorTransform_frag, "colorTransform") : "blurX" === n.type || "blurY" === n.type ? i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.blur_frag, "blur") : "glow" === n.type && (i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.glow_frag, "glow")) : i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.texture_frag, "texture"), 
                        this.activeProgram(a, i), this.syncUniforms(i, n, e.textureWidth, e.textureHeight), 
                        r += this.drawTextureElements(e, r);
                        break;

                      case 11:
                        i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), 
                        this.activeProgram(a, i), this.syncUniforms(i, n, e.textureWidth, e.textureHeight), 
                        r += this.drawRectElements(e, r);
                        break;

                      case 1:
                        i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), 
                        this.activeProgram(a, i), this.syncUniforms(i, n, e.textureWidth, e.textureHeight), 
                        r += this.drawPushMaskElements(e, r);
                        break;

                      case 2:
                        i = t.EgretWebGLProgram.getProgram(a, t.EgretShaderLib.default_vert, t.EgretShaderLib.primitive_frag, "primitive"), 
                        this.activeProgram(a, i), this.syncUniforms(i, n, e.textureWidth, e.textureHeight), 
                        r += this.drawPopMaskElements(e, r);
                        break;

                      case 3:
                        this.setBlendMode(e.value);
                        break;

                      case 4:
                        e.buffer.rootRenderTarget.resize(e.width, e.height), this.onResize(e.width, e.height);
                        break;

                      case 5:
                        if (this.activatedBuffer) {
                            var o = this.activatedBuffer.rootRenderTarget;
                            0 == o.width && 0 == o.height || o.clear(!0);
                        }
                        break;

                      case 6:
                        this.activateBuffer(e.buffer, e.width, e.height);
                        break;

                      case 7:
                        var s = this.activatedBuffer;
                        s && (s.rootRenderTarget && s.rootRenderTarget.enabledStencil(), s.enableScissor(e.x, e.y, e.width, e.height));
                        break;

                      case 8:
                        (s = this.activatedBuffer) && s.disableScissor();
                        break;

                      case 9:
                        a.bindTexture(a.TEXTURE_2D, e.texture), e.smoothing ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), 
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR)) : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST), 
                        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST));
                    }
                    return r;
                }
            }, e.prototype.activeProgram = function(e, t) {
                if (t != this.currentProgram) {
                    e.useProgram(t.id);
                    var r = t.attributes;
                    for (var i in r) "aVertexPosition" === i ? (e.vertexAttribPointer(r.aVertexPosition.location, 2, e.FLOAT, !1, 20, 0), 
                    e.enableVertexAttribArray(r.aVertexPosition.location)) : "aTextureCoord" === i ? (e.vertexAttribPointer(r.aTextureCoord.location, 2, e.FLOAT, !1, 20, 8), 
                    e.enableVertexAttribArray(r.aTextureCoord.location)) : "aColor" === i && (e.vertexAttribPointer(r.aColor.location, 1, e.FLOAT, !1, 20, 16), 
                    e.enableVertexAttribArray(r.aColor.location));
                    this.currentProgram = t;
                }
            }, e.prototype.syncUniforms = function(e, t, r, i) {
                var a = e.uniforms;
                t && t.type;
                for (var n in a) if ("projectionVector" === n) a[n].setValue({
                    x: this.projectionX,
                    y: this.projectionY
                }); else if ("uTextureSize" === n) a[n].setValue({
                    x: r,
                    y: i
                }); else if ("uSampler" === n) ; else {
                    var o = t.$uniforms[n];
                    void 0 !== o && a[n].setValue(o);
                }
            }, e.prototype.drawTextureElements = function(e, t) {
                var r = this.context;
                e.texture.isCanvas ? r.wxBindCanvasTexture(r.TEXTURE_2D, e.texture) : r.bindTexture(r.TEXTURE_2D, e.texture);
                var i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), i;
            }, e.prototype.drawRectElements = function(e, t) {
                var r = this.context, i = 3 * e.count;
                return r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), i;
            }, e.prototype.drawPushMaskElements = function(e, t) {
                var r = this.context, i = 3 * e.count, a = this.activatedBuffer;
                if (a) {
                    a.rootRenderTarget && a.rootRenderTarget.enabledStencil(), 0 == a.stencilHandleCount && (a.enableStencil(), 
                    r.clear(r.STENCIL_BUFFER_BIT));
                    var n = a.stencilHandleCount;
                    a.stencilHandleCount++, r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, n, 255), 
                    r.stencilOp(r.KEEP, r.KEEP, r.INCR), r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), 
                    r.stencilFunc(r.EQUAL, n + 1, 255), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP);
                }
                return i;
            }, e.prototype.drawPopMaskElements = function(e, t) {
                var r = this.context, i = 3 * e.count, a = this.activatedBuffer;
                if (a) if (a.stencilHandleCount--, 0 == a.stencilHandleCount) a.disableStencil(); else {
                    var n = a.stencilHandleCount;
                    r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.EQUAL, n + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR), 
                    r.drawElements(r.TRIANGLES, i, r.UNSIGNED_SHORT, 2 * t), r.stencilFunc(r.EQUAL, n, 255), 
                    r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP);
                }
                return i;
            }, e.prototype.setBlendMode = function(t) {
                var r = this.context, i = e.blendModesForGL[t];
                i && r.blendFunc(i[0], i[1]);
            }, e.prototype.drawTargetWidthFilters = function(e, r) {
                var i, a = r, n = e.length;
                if (n > 1) for (var o = 0; o < n - 1; o++) {
                    var s = e[o], c = r.rootRenderTarget.width, h = r.rootRenderTarget.height;
                    (i = t.WebGLRenderBuffer.create(c, h)).setTransform(1, 0, 0, 1, 0, 0), i.globalAlpha = 1, 
                    this.drawToRenderTarget(s, r, i), r != a && t.WebGLRenderBuffer.release(r), r = i;
                }
                var u = e[n - 1];
                this.drawToRenderTarget(u, r, this.currentBuffer), r != a && t.WebGLRenderBuffer.release(r);
            }, e.prototype.drawToRenderTarget = function(e, r, i) {
                if (!this.contextLost) {
                    this.vao.reachMaxSize() && this.$drawWebGL(), this.pushBuffer(i);
                    var a, n = r, o = r.rootRenderTarget.width, s = r.rootRenderTarget.height;
                    if ("blur" == e.type) {
                        var c = e.blurXFilter, h = e.blurYFilter;
                        0 != c.blurX && 0 != h.blurY ? ((a = t.WebGLRenderBuffer.create(o, s)).setTransform(1, 0, 0, 1, 0, 0), 
                        a.globalAlpha = 1, this.drawToRenderTarget(e.blurXFilter, r, a), r != n && t.WebGLRenderBuffer.release(r), 
                        r = a, e = h) : e = 0 === c.blurX ? h : c;
                    }
                    i.saveTransform(), i.transform(1, 0, 0, -1, 0, s), this.vao.cacheArrays(i, 0, 0, o, s, 0, 0, o, s, o, s), 
                    i.restoreTransform(), this.drawCmdManager.pushDrawTexture(r.rootRenderTarget.texture, 2, e, o, s), 
                    r != n && t.WebGLRenderBuffer.release(r), this.popBuffer();
                }
            }, e.initBlendMode = function() {
                e.blendModesForGL = {}, e.blendModesForGL["source-over"] = [ 1, 771 ], e.blendModesForGL.lighter = [ 1, 1 ], 
                e.blendModesForGL["lighter-in"] = [ 770, 771 ], e.blendModesForGL["destination-out"] = [ 0, 771 ], 
                e.blendModesForGL["destination-in"] = [ 0, 770 ];
            }, e.glContextId = 0, e.blendModesForGL = null, e;
        }();
        t.WebGLRenderContext = r, e(r.prototype, "egret.wxgame.WebGLRenderContext"), r.initBlendMode();
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), window.sharedCanvas.isCanvas = !0, function(r) {
    !function(i) {
        var a = function(e) {
            function a(t, a, n) {
                var o = e.call(this) || this;
                if (o.globalAlpha = 1, o.stencilState = !1, o.$stencilList = [], o.stencilHandleCount = 0, 
                o.$scissorState = !1, o.scissorRect = new r.Rectangle(), o.$hasScissor = !1, o.$drawCalls = 0, 
                o.$computeDrawCall = !1, o.globalMatrix = new r.Matrix(), o.savedGlobalMatrix = new r.Matrix(), 
                o.$offsetX = 0, o.$offsetY = 0, o.context = i.WebGLRenderContext.getInstance(t, a), 
                o.rootRenderTarget = new i.WebGLRenderTarget(o.context.context, 3, 3), t && a && o.resize(t, a), 
                o.root = n, o.root) o.context.pushBuffer(o), o.surface = o.context.surface, o.$computeDrawCall = !0; else {
                    var s = o.context.activatedBuffer;
                    s && s.rootRenderTarget.activate(), o.rootRenderTarget.initFrameBuffer(), o.surface = o.rootRenderTarget;
                }
                return o;
            }
            return t(a, e), a.prototype.enableStencil = function() {
                this.stencilState || (this.context.enableStencilTest(), this.stencilState = !0);
            }, a.prototype.disableStencil = function() {
                this.stencilState && (this.context.disableStencilTest(), this.stencilState = !1);
            }, a.prototype.restoreStencil = function() {
                this.stencilState ? this.context.enableStencilTest() : this.context.disableStencilTest();
            }, a.prototype.enableScissor = function(e, t, r, i) {
                this.$scissorState || (this.$scissorState = !0, this.scissorRect.setTo(e, t, r, i), 
                this.context.enableScissorTest(this.scissorRect));
            }, a.prototype.disableScissor = function() {
                this.$scissorState && (this.$scissorState = !1, this.scissorRect.setEmpty(), this.context.disableScissorTest());
            }, a.prototype.restoreScissor = function() {
                this.$scissorState ? this.context.enableScissorTest(this.scissorRect) : this.context.disableScissorTest();
            }, Object.defineProperty(a.prototype, "width", {
                get: function() {
                    return this.rootRenderTarget.width;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "height", {
                get: function() {
                    return this.rootRenderTarget.height;
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.resize = function(e, t, r) {
                this.context.pushBuffer(this), t = t || 1, (e = e || 1) == this.rootRenderTarget.width && t == this.rootRenderTarget.height || (this.context.drawCmdManager.pushResize(this, e, t), 
                this.rootRenderTarget.width = e, this.rootRenderTarget.height = t), this.root && this.context.resize(e, t, r), 
                this.context.clear(), this.context.popBuffer();
            }, a.prototype.getPixels = function(e, t, r, i) {
                void 0 === r && (r = 1), void 0 === i && (i = 1);
                var a = new Uint8Array(4 * r * i), n = this.rootRenderTarget.useFrameBuffer;
                this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), this.context.getPixels(e, t, r, i, a), 
                this.rootRenderTarget.useFrameBuffer = n, this.rootRenderTarget.activate();
                for (var o = new Uint8Array(4 * r * i), s = 0; s < i; s++) for (var c = 0; c < r; c++) o[4 * (r * (i - s - 1) + c)] = a[4 * (r * s + c)], 
                o[4 * (r * (i - s - 1) + c) + 1] = a[4 * (r * s + c) + 1], o[4 * (r * (i - s - 1) + c) + 2] = a[4 * (r * s + c) + 2], 
                o[4 * (r * (i - s - 1) + c) + 3] = a[4 * (r * s + c) + 3];
                return o;
            }, a.prototype.$pushResize = function(e, t) {
                this.context.drawCmdManager.pushResize(this, e, t);
            }, a.prototype.toDataURL = function(e, t) {
                return this.context.surface.toDataURL(e, t);
            }, a.prototype.destroy = function() {
                this.context.destroy();
            }, a.prototype.onRenderFinish = function() {
                this.$drawCalls = 0;
            }, a.prototype.drawFrameBufferToSurface = function(e, t, r, i, a, n, o, s, c) {
                void 0 === c && (c = !1), this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), 
                this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), 
                this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), c && this.context.clear(), 
                this.context.drawImage(this.rootRenderTarget, e, t, r, i, a, n, o, s, r, i, !1), 
                this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), 
                this.restoreStencil(), this.restoreScissor();
            }, a.prototype.drawSurfaceToFrameBuffer = function(e, t, r, i, a, n, o, s, c) {
                void 0 === c && (c = !1), this.rootRenderTarget.useFrameBuffer = !0, this.rootRenderTarget.activate(), 
                this.context.disableStencilTest(), this.context.disableScissorTest(), this.setTransform(1, 0, 0, 1, 0, 0), 
                this.globalAlpha = 1, this.context.setGlobalCompositeOperation("source-over"), c && this.context.clear(), 
                this.context.drawImage(this.context.surface, e, t, r, i, a, n, o, s, r, i, !1), 
                this.context.$drawWebGL(), this.rootRenderTarget.useFrameBuffer = !1, this.rootRenderTarget.activate(), 
                this.restoreStencil(), this.restoreScissor();
            }, a.prototype.clear = function() {
                this.context.pushBuffer(this), this.context.clear(), this.context.popBuffer();
            }, a.prototype.setTransform = function(e, t, r, i, a, n) {
                var o = this.globalMatrix;
                o.a = e, o.b = t, o.c = r, o.d = i, o.tx = a, o.ty = n;
            }, a.prototype.transform = function(e, t, r, i, a, n) {
                var o = this.globalMatrix, s = o.a, c = o.b, h = o.c, u = o.d;
                1 == e && 0 == t && 0 == r && 1 == i || (o.a = e * s + t * h, o.b = e * c + t * u, 
                o.c = r * s + i * h, o.d = r * c + i * u), o.tx = a * s + n * h + o.tx, o.ty = a * c + n * u + o.ty;
            }, a.prototype.translate = function(e, t) {
                var r = this.globalMatrix;
                r.tx += e, r.ty += t;
            }, a.prototype.useOffset = function() {
                0 == this.$offsetX && 0 == this.$offsetY || (this.globalMatrix.append(1, 0, 0, 1, this.$offsetX, this.$offsetY), 
                this.$offsetX = this.$offsetY = 0);
            }, a.prototype.saveTransform = function() {
                var e = this.globalMatrix, t = this.savedGlobalMatrix;
                t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t.tx = e.tx, t.ty = e.ty;
            }, a.prototype.restoreTransform = function() {
                var e = this.globalMatrix, t = this.savedGlobalMatrix;
                e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e.tx = t.tx, e.ty = t.ty;
            }, a.create = function(e, t) {
                var r = n.pop();
                if (r) {
                    r.resize(e, t);
                    var i = r.globalMatrix;
                    i.a = 1, i.b = 0, i.c = 0, i.d = 1, i.tx = 0, i.ty = 0, r.globalAlpha = 1, r.$offsetX = 0, 
                    r.$offsetY = 0;
                } else (r = new a(e, t)).$computeDrawCall = !1;
                return r;
            }, a.release = function(e) {
                n.push(e);
            }, a.autoClear = !0, a;
        }(r.HashObject);
        i.WebGLRenderBuffer = a, e(a.prototype, "egret.wxgame.WebGLRenderBuffer", [ "egret.sys.RenderBuffer" ]);
        var n = [];
    }(r.wxgame || (r.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(r) {
        var i = [ "source-over", "lighter", "destination-out" ], a = [], n = function() {
            function e() {
                if (this.isiOS10 = !1, this.nestLevel = 0, window.canvas.getContext("webgl").wxBindCanvasTexture) {
                    var e = window.wx.getSystemInfoSync();
                    this.isiOS10 = e.system.indexOf("iOS 10") > -1;
                }
            }
            return e.prototype.render = function(e, r, i, n) {
                this.nestLevel++;
                var o = r, s = o.context;
                s.pushBuffer(o), o.transform(i.a, i.b, i.c, i.d, 0, 0), this.drawDisplayObject(e, o, i.tx, i.ty, !0), 
                s.$drawWebGL();
                var c = o.$drawCalls;
                o.onRenderFinish(), s.popBuffer();
                var h = t.Matrix.create();
                if (i.$invertInto(h), o.transform(h.a, h.b, h.c, h.d, 0, 0), t.Matrix.release(h), 
                this.nestLevel--, 0 === this.nestLevel) {
                    a.length > 6 && (a.length = 6);
                    for (var u = a.length, d = 0; d < u; d++) a[d].resize(0, 0);
                }
                return c;
            }, e.prototype.drawDisplayObject = function(e, r, i, a, n) {
                var o, s = 0, c = e.$displayList;
                if (c && !n ? ((e.$cacheDirty || e.$renderDirty || c.$canvasScaleX != t.sys.DisplayList.$canvasScaleX || c.$canvasScaleY != t.sys.DisplayList.$canvasScaleY) && (s += c.drawToSurface()), 
                o = c.$renderNode) : o = e.$renderDirty ? e.$getRenderNode() : e.$renderNode, e.$cacheDirty = !1, 
                o) {
                    switch (s++, r.$offsetX = i, r.$offsetY = a, o.type) {
                      case 1:
                        this.renderBitmap(o, r);
                        break;

                      case 2:
                        this.renderText(o, r);
                        break;

                      case 3:
                        this.renderGraphics(o, r);
                        break;

                      case 4:
                        this.renderGroup(o, r);
                        break;

                      case 5:
                        this.renderMesh(o, r);
                        break;

                      case 6:
                        this.renderNormalBitmap(o, r);
                    }
                    r.$offsetX = 0, r.$offsetY = 0;
                }
                if (c && !n) return s;
                var h = e.$children;
                if (h) for (var u = h.length, d = 0; d < u; d++) {
                    var l = h[d], f = void 0, p = void 0, g = void 0;
                    1 != l.$alpha && (g = r.globalAlpha, r.globalAlpha *= l.$alpha);
                    var v = void 0;
                    if (l.$useTranslate) {
                        var x = l.$getMatrix();
                        f = i + l.$x, p = a + l.$y;
                        var m = r.globalMatrix;
                        (v = t.Matrix.create()).a = m.a, v.b = m.b, v.c = m.c, v.d = m.d, v.tx = m.tx, v.ty = m.ty, 
                        r.transform(x.a, x.b, x.c, x.d, f, p), f = -l.$anchorOffsetX, p = -l.$anchorOffsetY;
                    } else f = i + l.$x - l.$anchorOffsetX, p = a + l.$y - l.$anchorOffsetY;
                    switch (l.$renderMode) {
                      case 1:
                        break;

                      case 2:
                        s += this.drawWithFilter(l, r, f, p);
                        break;

                      case 3:
                        s += this.drawWithClip(l, r, f, p);
                        break;

                      case 4:
                        s += this.drawWithScrollRect(l, r, f, p);
                        break;

                      default:
                        s += this.drawDisplayObject(l, r, f, p);
                    }
                    if (g && (r.globalAlpha = g), v) (x = r.globalMatrix).a = v.a, x.b = v.b, x.c = v.c, 
                    x.d = v.d, x.tx = v.tx, x.ty = v.ty, t.Matrix.release(v);
                }
                return s;
            }, e.prototype.drawWithFilter = function(e, r, n, o) {
                var s = 0;
                if (e.$children && 0 == e.$children.length && (!e.$renderNode || 0 == e.$renderNode.$getRenderCount())) return s;
                var c, h = e.$filters, u = 0 !== e.$blendMode;
                u && ((c = i[e.$blendMode]) || (c = "source-over"));
                var d = e.$getOriginalBounds(), l = d.x, f = d.y, p = d.width, g = d.height;
                if (p <= 0 || g <= 0) return s;
                if (!e.mask && 1 == h.length && ("colorTransform" == h[0].type || "custom" === h[0].type && 0 === h[0].padding)) {
                    var v = this.getRenderCount(e);
                    if (!e.$children || 1 == v) return u && r.context.setGlobalCompositeOperation(c), 
                    r.context.$filter = h[0], e.$mask ? s += this.drawWithClip(e, r, n, o) : e.$scrollRect || e.$maskRect ? s += this.drawWithScrollRect(e, r, n, o) : s += this.drawDisplayObject(e, r, n, o), 
                    r.context.$filter = null, u && r.context.setGlobalCompositeOperation("source-over"), 
                    s;
                }
                var x = this.createRenderBuffer(p, g);
                if (x.context.pushBuffer(x), e.$mask ? s += this.drawWithClip(e, x, -l, -f) : e.$scrollRect || e.$maskRect ? s += this.drawWithScrollRect(e, x, -l, -f) : s += this.drawDisplayObject(e, x, -l, -f), 
                x.context.popBuffer(), s > 0) {
                    u && r.context.setGlobalCompositeOperation(c), s++, r.$offsetX = n + l, r.$offsetY = o + f;
                    var m = t.Matrix.create(), y = r.globalMatrix;
                    m.a = y.a, m.b = y.b, m.c = y.c, m.d = y.d, m.tx = y.tx, m.ty = y.ty, r.useOffset(), 
                    r.context.drawTargetWidthFilters(h, x), y.a = m.a, y.b = m.b, y.c = m.c, y.d = m.d, 
                    y.tx = m.tx, y.ty = m.ty, t.Matrix.release(m), u && r.context.setGlobalCompositeOperation("source-over");
                }
                return a.push(x), s;
            }, e.prototype.getRenderCount = function(e) {
                var t = 0, r = e.$getRenderNode();
                if (r && (t += r.$getRenderCount()), e.$children) for (var i = 0, a = e.$children; i < a.length; i++) {
                    var n = a[i], o = n.$filters;
                    if (o && o.length > 0) return 2;
                    if (n.$children) t += this.getRenderCount(n); else {
                        var s = n.$getRenderNode();
                        s && (t += s.$getRenderCount());
                    }
                }
                return t;
            }, e.prototype.drawWithClip = function(e, r, n, o) {
                var s, c = 0, h = 0 !== e.$blendMode;
                h && ((s = i[e.$blendMode]) || (s = "source-over"));
                var u = e.$scrollRect ? e.$scrollRect : e.$maskRect, d = e.$mask;
                if (d) {
                    var l = d.$getMatrix();
                    if (0 == l.a && 0 == l.b || 0 == l.c && 0 == l.d) return c;
                }
                if (d || e.$children && 0 != e.$children.length) {
                    var f = e.$getOriginalBounds(), p = f.x, g = f.y, v = f.width, x = f.height, m = this.createRenderBuffer(v, x);
                    if (m.context.pushBuffer(m), c += this.drawDisplayObject(e, m, -p, -g), d) {
                        var y = this.createRenderBuffer(v, x);
                        y.context.pushBuffer(y);
                        var w = t.Matrix.create();
                        w.copyFrom(d.$getConcatenatedMatrix()), d.$getConcatenatedMatrixAt(e, w), w.translate(-p, -g), 
                        y.setTransform(w.a, w.b, w.c, w.d, w.tx, w.ty), t.Matrix.release(w), c += this.drawDisplayObject(d, y, 0, 0), 
                        y.context.popBuffer(), m.context.setGlobalCompositeOperation("destination-in"), 
                        m.setTransform(1, 0, 0, -1, 0, y.height);
                        var b = y.rootRenderTarget.width, T = y.rootRenderTarget.height;
                        m.context.drawTexture(y.rootRenderTarget.texture, 0, 0, b, T, 0, 0, b, T, b, T), 
                        m.setTransform(1, 0, 0, 1, 0, 0), m.context.setGlobalCompositeOperation("source-over"), 
                        y.setTransform(1, 0, 0, 1, 0, 0), a.push(y);
                    }
                    if (m.context.setGlobalCompositeOperation("source-over"), m.context.popBuffer(), 
                    c > 0) {
                        c++, h && r.context.setGlobalCompositeOperation(s), u && r.context.pushMask(u.x + n, u.y + o, u.width, u.height);
                        var E = t.Matrix.create(), C = r.globalMatrix;
                        E.a = C.a, E.b = C.b, E.c = C.c, E.d = C.d, E.tx = C.tx, E.ty = C.ty, C.append(1, 0, 0, -1, n + p, o + g + m.height);
                        var S = m.rootRenderTarget.width, L = m.rootRenderTarget.height;
                        r.context.drawTexture(m.rootRenderTarget.texture, 0, 0, S, L, 0, 0, S, L, S, L), 
                        u && m.context.popMask(), h && r.context.setGlobalCompositeOperation("source-over");
                        var R = r.globalMatrix;
                        R.a = E.a, R.b = E.b, R.c = E.c, R.d = E.d, R.tx = E.tx, R.ty = E.ty, t.Matrix.release(E);
                    }
                    return a.push(m), c;
                }
                return u && r.context.pushMask(u.x + n, u.y + o, u.width, u.height), h && r.context.setGlobalCompositeOperation(s), 
                c += this.drawDisplayObject(e, r, n, o), h && r.context.setGlobalCompositeOperation("source-over"), 
                u && r.context.popMask(), c;
            }, e.prototype.drawWithScrollRect = function(e, t, r, i) {
                var a = 0, n = e.$scrollRect ? e.$scrollRect : e.$maskRect;
                if (n.isEmpty()) return a;
                e.$scrollRect && (r -= n.x, i -= n.y);
                var o = t.globalMatrix, s = t.context, c = !1;
                if (t.$hasScissor || 0 != o.b || 0 != o.c) t.context.pushMask(n.x + r, n.y + i, n.width, n.height); else {
                    var h = o.a, u = o.d, d = o.tx, l = o.ty, f = n.x + r, p = n.y + i, g = f + n.width, v = p + n.height, x = void 0, m = void 0, y = void 0, w = void 0;
                    if (1 == h && 1 == u) x = f + d, m = p + l, y = g + d, w = v + l; else {
                        var b = h * f + d, T = u * p + l, E = h * g + d, C = u * p + l, S = h * g + d, L = u * v + l, R = h * f + d, D = u * v + l, O = 0;
                        b > E && (O = b, b = E, E = O), S > R && (O = S, S = R, R = O), x = b < S ? b : S, 
                        y = E > R ? E : R, T > C && (O = T, T = C, C = O), L > D && (O = L, L = D, D = O), 
                        m = T < L ? T : L, w = C > D ? C : D;
                    }
                    s.enableScissor(x, -w + t.height, y - x, w - m), c = !0;
                }
                return a += this.drawDisplayObject(e, t, r, i), c ? s.disableScissor() : s.popMask(), 
                a;
            }, e.prototype.drawNodeToBuffer = function(e, t, r, i) {
                var a = t;
                a.context.pushBuffer(a), a.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty), this.renderNode(e, t, 0, 0, i), 
                a.context.$drawWebGL(), a.onRenderFinish(), a.context.popBuffer();
            }, e.prototype.drawDisplayToBuffer = function(e, t, r) {
                var i;
                t.context.pushBuffer(t), r && t.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty);
                var a = 0;
                if (i = e.$renderDirty ? e.$getRenderNode() : e.$renderNode) switch (a++, i.type) {
                  case 1:
                    this.renderBitmap(i, t);
                    break;

                  case 2:
                    this.renderText(i, t);
                    break;

                  case 3:
                    this.renderGraphics(i, t);
                    break;

                  case 4:
                    this.renderGroup(i, t);
                    break;

                  case 5:
                    this.renderMesh(i, t);
                    break;

                  case 6:
                    this.renderNormalBitmap(i, t);
                }
                var n = e.$children;
                if (n) for (var o = n.length, s = 0; s < o; s++) {
                    var c = n[s];
                    switch (c.$renderMode) {
                      case 1:
                        break;

                      case 2:
                        a += this.drawWithFilter(c, t, 0, 0);
                        break;

                      case 3:
                        a += this.drawWithClip(c, t, 0, 0);
                        break;

                      case 4:
                        a += this.drawWithScrollRect(c, t, 0, 0);
                        break;

                      default:
                        a += this.drawDisplayObject(c, t, 0, 0);
                    }
                }
                return t.context.$drawWebGL(), t.onRenderFinish(), t.context.popBuffer(), a;
            }, e.prototype.renderNode = function(e, t, r, i, a) {
                switch (t.$offsetX = r, t.$offsetY = i, e.type) {
                  case 1:
                    this.renderBitmap(e, t);
                    break;

                  case 2:
                    this.renderText(e, t);
                    break;

                  case 3:
                    this.renderGraphics(e, t, a);
                    break;

                  case 4:
                    this.renderGroup(e, t);
                    break;

                  case 5:
                    this.renderMesh(e, t);
                    break;

                  case 6:
                    this.renderNormalBitmap(e, t);
                }
            }, e.prototype.renderNormalBitmap = function(e, t) {
                var r = e.image;
                r && t.context.drawImage(r, e.sourceX, e.sourceY, e.sourceW, e.sourceH, e.drawX, e.drawY, e.drawW, e.drawH, e.imageWidth, e.imageHeight, e.rotated, e.smoothing);
            }, e.prototype.renderBitmap = function(e, r) {
                var a = e.image;
                if (a) {
                    var n, o, s, c, h = e.drawData, u = h.length, d = 0, l = e.matrix, f = e.blendMode, p = e.alpha;
                    if (l) {
                        n = t.Matrix.create();
                        var g = r.globalMatrix;
                        n.a = g.a, n.b = g.b, n.c = g.c, n.d = g.d, n.tx = g.tx, n.ty = g.ty, o = r.$offsetX, 
                        s = r.$offsetY, r.useOffset(), r.transform(l.a, l.b, l.c, l.d, l.tx, l.ty);
                    }
                    if (f && r.context.setGlobalCompositeOperation(i[f]), p == p && (c = r.globalAlpha, 
                    r.globalAlpha *= p), e.filter) {
                        for (r.context.$filter = e.filter; d < u; ) r.context.drawImage(a, h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], e.imageWidth, e.imageHeight, e.rotated, e.smoothing);
                        r.context.$filter = null;
                    } else for (;d < u; ) r.context.drawImage(a, h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], e.imageWidth, e.imageHeight, e.rotated, e.smoothing);
                    if (f && r.context.setGlobalCompositeOperation("source-over"), p == p && (r.globalAlpha = c), 
                    l) {
                        var v = r.globalMatrix;
                        v.a = n.a, v.b = n.b, v.c = n.c, v.d = n.d, v.tx = n.tx, v.ty = n.ty, r.$offsetX = o, 
                        r.$offsetY = s, t.Matrix.release(n);
                    }
                }
            }, e.prototype.renderMesh = function(e, r) {
                var a, n, o, s, c = e.image, h = e.drawData, u = h.length, d = 0, l = e.matrix, f = e.blendMode, p = e.alpha;
                if (l) {
                    a = t.Matrix.create();
                    var g = r.globalMatrix;
                    a.a = g.a, a.b = g.b, a.c = g.c, a.d = g.d, a.tx = g.tx, a.ty = g.ty, n = r.$offsetX, 
                    o = r.$offsetY, r.useOffset(), r.transform(l.a, l.b, l.c, l.d, l.tx, l.ty);
                }
                if (f && r.context.setGlobalCompositeOperation(i[f]), p == p && (s = r.globalAlpha, 
                r.globalAlpha *= p), e.filter) {
                    for (r.context.$filter = e.filter; d < u; ) r.context.drawMesh(c, h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds, e.rotated, e.smoothing);
                    r.context.$filter = null;
                } else for (;d < u; ) r.context.drawMesh(c, h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], h[d++], e.imageWidth, e.imageHeight, e.uvs, e.vertices, e.indices, e.bounds, e.rotated, e.smoothing);
                if (f && r.context.setGlobalCompositeOperation("source-over"), p == p && (r.globalAlpha = s), 
                l) {
                    var v = r.globalMatrix;
                    v.a = a.a, v.b = a.b, v.c = a.c, v.d = a.d, v.tx = a.tx, v.ty = a.ty, r.$offsetX = n, 
                    r.$offsetY = o, t.Matrix.release(a);
                }
            }, e.prototype.renderText = function(e, i) {
                var a = e.width - e.x, n = e.height - e.y;
                if (!(a <= 0 || n <= 0) && a && n && 0 != e.drawData.length) {
                    var o = t.sys.DisplayList.$canvasScaleX, s = t.sys.DisplayList.$canvasScaleY, c = i.context.$maxTextureSize;
                    a * o > c && (o *= c / (a * o)), n * s > c && (s *= c / (n * s)), a *= o, n *= s;
                    var h = e.x * o, u = e.y * s;
                    if (e.$canvasScaleX == o && e.$canvasScaleY == s || (e.$canvasScaleX = o, e.$canvasScaleY = s, 
                    e.dirtyRender = !0), this.isiOS10 ? (this.canvasRenderer || (this.canvasRenderer = new t.CanvasRenderer()), 
                    e.dirtyRender && (this.canvasRenderBuffer = new r.CanvasRenderBuffer(a, n))) : this.canvasRenderBuffer && this.canvasRenderBuffer.context ? e.dirtyRender && this.canvasRenderBuffer.resize(a, n) : (this.canvasRenderer = new t.CanvasRenderer(), 
                    this.canvasRenderBuffer = new r.CanvasRenderBuffer(a, n)), this.canvasRenderBuffer.context) {
                        if (1 == o && 1 == s || this.canvasRenderBuffer.context.setTransform(o, 0, 0, s, 0, 0), 
                        h || u ? (e.dirtyRender && this.canvasRenderBuffer.context.setTransform(o, 0, 0, s, -h, -u), 
                        i.transform(1, 0, 0, 1, h / o, u / s)) : 1 == o && 1 == s || this.canvasRenderBuffer.context.setTransform(o, 0, 0, s, 0, 0), 
                        e.dirtyRender) {
                            var d = this.canvasRenderBuffer.surface;
                            if (this.canvasRenderer.renderText(e, this.canvasRenderBuffer.context), this.isiOS10) d.isCanvas = !0, 
                            e.$texture = d; else {
                                var l = e.$texture;
                                l ? i.context.updateTexture(l, d) : (l = i.context.createTexture(d), e.$texture = l);
                            }
                            e.$textureWidth = d.width, e.$textureHeight = d.height;
                        }
                        var f = e.$textureWidth, p = e.$textureHeight;
                        i.context.drawTexture(e.$texture, 0, 0, f, p, 0, 0, f / o, p / s, f, p), (h || u) && (e.dirtyRender && this.canvasRenderBuffer.context.setTransform(o, 0, 0, s, 0, 0), 
                        i.transform(1, 0, 0, 1, -h / o, -u / s)), e.dirtyRender = !1;
                    }
                }
            }, e.prototype.renderGraphics = function(e, i, a) {
                var n = e.width, o = e.height;
                if (!(n <= 0 || o <= 0) && n && o && 0 != e.drawData.length) {
                    var s = t.sys.DisplayList.$canvasScaleX, c = t.sys.DisplayList.$canvasScaleY;
                    (n * s < 1 || o * c < 1) && (s = c = 1), e.$canvasScaleX == s && e.$canvasScaleY == c || (e.$canvasScaleX = s, 
                    e.$canvasScaleY = c, e.dirtyRender = !0), n *= s, o *= c;
                    var h = Math.ceil(n), u = Math.ceil(o);
                    if (s *= h / n, c *= u / o, n = h, o = u, this.isiOS10 ? (this.canvasRenderer || (this.canvasRenderer = new t.CanvasRenderer()), 
                    e.dirtyRender && (this.canvasRenderBuffer = new r.CanvasRenderBuffer(n, o))) : this.canvasRenderBuffer && this.canvasRenderBuffer.context ? e.dirtyRender && this.canvasRenderBuffer.resize(n, o) : (this.canvasRenderer = new t.CanvasRenderer(), 
                    this.canvasRenderBuffer = new r.CanvasRenderBuffer(n, o)), this.canvasRenderBuffer.context) {
                        1 == s && 1 == c || this.canvasRenderBuffer.context.setTransform(s, 0, 0, c, 0, 0), 
                        (e.x || e.y) && ((e.dirtyRender || a) && this.canvasRenderBuffer.context.translate(-e.x, -e.y), 
                        i.transform(1, 0, 0, 1, e.x, e.y));
                        var d = this.canvasRenderBuffer.surface;
                        if (a) {
                            this.canvasRenderer.renderGraphics(e, this.canvasRenderBuffer.context, !0);
                            var l = void 0;
                            this.isiOS10 ? (console.log("forHitTest"), d.isCanvas = !0, l = d) : (t.WebGLUtils.deleteWebGLTexture(d), 
                            l = i.context.getWebGLTexture(d)), i.context.drawTexture(l, 0, 0, n, o, 0, 0, n, o, d.width, d.height);
                        } else {
                            if (e.dirtyRender) {
                                if (this.canvasRenderer.renderGraphics(e, this.canvasRenderBuffer.context), this.isiOS10) d.isCanvas = !0, 
                                e.$texture = d; else (l = e.$texture) ? i.context.updateTexture(l, d) : (l = i.context.createTexture(d), 
                                e.$texture = l);
                                e.$textureWidth = d.width, e.$textureHeight = d.height;
                            }
                            var f = e.$textureWidth, p = e.$textureHeight;
                            i.context.drawTexture(e.$texture, 0, 0, f, p, 0, 0, f / s, p / c, f, p);
                        }
                        (e.x || e.y) && ((e.dirtyRender || a) && this.canvasRenderBuffer.context.translate(e.x, e.y), 
                        i.transform(1, 0, 0, 1, -e.x, -e.y)), a || (e.dirtyRender = !1);
                    }
                }
            }, e.prototype.renderGroup = function(e, r) {
                var i, a, n, o = e.matrix;
                if (o) {
                    i = t.Matrix.create();
                    var s = r.globalMatrix;
                    i.a = s.a, i.b = s.b, i.c = s.c, i.d = s.d, i.tx = s.tx, i.ty = s.ty, a = r.$offsetX, 
                    n = r.$offsetY, r.useOffset(), r.transform(o.a, o.b, o.c, o.d, o.tx, o.ty);
                }
                for (var c = e.drawData, h = c.length, u = 0; u < h; u++) {
                    var d = c[u];
                    this.renderNode(d, r, r.$offsetX, r.$offsetY);
                }
                if (o) {
                    var l = r.globalMatrix;
                    l.a = i.a, l.b = i.b, l.c = i.c, l.d = i.d, l.tx = i.tx, l.ty = i.ty, r.$offsetX = a, 
                    r.$offsetY = n, t.Matrix.release(i);
                }
            }, e.prototype.createRenderBuffer = function(e, t) {
                var i = a.pop();
                return i ? i.resize(e, t) : (i = new r.WebGLRenderBuffer(e, t)).$computeDrawCall = !1, 
                i;
            }, e;
        }();
        r.WebGLRenderer = n, e(n.prototype, "egret.wxgame.WebGLRenderer", [ "egret.sys.SystemRenderer" ]);
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r;
        !function(e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2", e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3", 
            e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4", e[e.FLOAT = 5126] = "FLOAT", e[e.BYTE = 65535] = "BYTE", 
            e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT";
        }(r = t.WEBGL_ATTRIBUTE_TYPE || (t.WEBGL_ATTRIBUTE_TYPE = {}));
        var i = function() {
            function e(e, t, r) {
                this.gl = e, this.name = r.name, this.type = r.type, this.size = r.size, this.location = e.getAttribLocation(t, this.name), 
                this.count = 0, this.initCount(e), this.format = e.FLOAT, this.initFormat(e);
            }
            return e.prototype.initCount = function(e) {
                switch (this.type) {
                  case r.FLOAT:
                  case r.BYTE:
                  case r.UNSIGNED_BYTE:
                  case r.UNSIGNED_SHORT:
                    this.count = 1;
                    break;

                  case r.FLOAT_VEC2:
                    this.count = 2;
                    break;

                  case r.FLOAT_VEC3:
                    this.count = 3;
                    break;

                  case r.FLOAT_VEC4:
                    this.count = 4;
                }
            }, e.prototype.initFormat = function(e) {
                switch (this.type) {
                  case r.FLOAT:
                  case r.FLOAT_VEC2:
                  case r.FLOAT_VEC3:
                  case r.FLOAT_VEC4:
                    this.format = e.FLOAT;
                    break;

                  case r.UNSIGNED_BYTE:
                    this.format = e.UNSIGNED_BYTE;
                    break;

                  case r.UNSIGNED_SHORT:
                    this.format = e.UNSIGNED_SHORT;
                    break;

                  case r.BYTE:
                    this.format = e.BYTE;
                }
            }, e;
        }();
        t.EgretWebGLAttribute = i, e(i.prototype, "egret.wxgame.EgretWebGLAttribute");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        function r(e, t, r) {
            var i = e.createShader(t);
            return e.shaderSource(i, r), e.compileShader(i), e.getShaderParameter(i, e.COMPILE_STATUS) || (console.log("shader not compiled!"), 
            console.log(e.getShaderInfoLog(i))), i;
        }
        var i = function() {
            function e(e, i, a) {
                this.vshaderSource = i, this.fshaderSource = a, this.vertexShader = r(e, e.VERTEX_SHADER, this.vshaderSource), 
                this.fragmentShader = r(e, e.FRAGMENT_SHADER, this.fshaderSource), this.id = function(e, t, r) {
                    var i = e.createProgram();
                    return e.attachShader(i, t), e.attachShader(i, r), e.linkProgram(i), i;
                }(e, this.vertexShader, this.fragmentShader), this.uniforms = function(e, r) {
                    for (var i = {}, a = e.getProgramParameter(r, e.ACTIVE_UNIFORMS), n = 0; n < a; n++) {
                        var o = e.getActiveUniform(r, n), s = o.name, c = new t.EgretWebGLUniform(e, r, o);
                        i[s] = c;
                    }
                    return i;
                }(e, this.id), this.attributes = function(e, r) {
                    for (var i = {}, a = e.getProgramParameter(r, e.ACTIVE_ATTRIBUTES), n = 0; n < a; n++) {
                        var o = e.getActiveAttrib(r, n), s = o.name, c = new t.EgretWebGLAttribute(e, r, o);
                        i[s] = c;
                    }
                    return i;
                }(e, this.id);
            }
            return e.getProgram = function(t, r, i, a) {
                return this.programCache[a] || (this.programCache[a] = new e(t, r, i)), this.programCache[a];
            }, e.deleteProgram = function(e, t, r, i) {}, e.programCache = {}, e;
        }();
        t.EgretWebGLProgram = i, e(i.prototype, "egret.wxgame.EgretWebGLProgram");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r;
        !function(e) {
            e[e.FLOAT_VEC2 = 35664] = "FLOAT_VEC2", e[e.FLOAT_VEC3 = 35665] = "FLOAT_VEC3", 
            e[e.FLOAT_VEC4 = 35666] = "FLOAT_VEC4", e[e.INT_VEC2 = 35667] = "INT_VEC2", e[e.INT_VEC3 = 35668] = "INT_VEC3", 
            e[e.INT_VEC4 = 35669] = "INT_VEC4", e[e.BOOL = 35670] = "BOOL", e[e.BOOL_VEC2 = 35671] = "BOOL_VEC2", 
            e[e.BOOL_VEC3 = 35672] = "BOOL_VEC3", e[e.BOOL_VEC4 = 35673] = "BOOL_VEC4", e[e.FLOAT_MAT2 = 35674] = "FLOAT_MAT2", 
            e[e.FLOAT_MAT3 = 35675] = "FLOAT_MAT3", e[e.FLOAT_MAT4 = 35676] = "FLOAT_MAT4", 
            e[e.SAMPLER_2D = 35678] = "SAMPLER_2D", e[e.SAMPLER_CUBE = 35680] = "SAMPLER_CUBE", 
            e[e.BYTE = 65535] = "BYTE", e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", e[e.SHORT = 5122] = "SHORT", 
            e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", e[e.INT = 5124] = "INT", e[e.UNSIGNED_INT = 5125] = "UNSIGNED_INT", 
            e[e.FLOAT = 5126] = "FLOAT";
        }(r = t.WEBGL_UNIFORM_TYPE || (t.WEBGL_UNIFORM_TYPE = {}));
        var i = function() {
            function e(e, t, r) {
                this.gl = e, this.name = r.name, this.type = r.type, this.size = r.size, this.location = e.getUniformLocation(t, this.name), 
                this.setDefaultValue(), this.generateSetValue(), this.generateUpload();
            }
            return e.prototype.setDefaultValue = function() {
                switch (this.type) {
                  case r.FLOAT:
                  case r.SAMPLER_2D:
                  case r.SAMPLER_CUBE:
                  case r.BOOL:
                  case r.INT:
                    this.value = 0;
                    break;

                  case r.FLOAT_VEC2:
                  case r.BOOL_VEC2:
                  case r.INT_VEC2:
                    this.value = [ 0, 0 ];
                    break;

                  case r.FLOAT_VEC3:
                  case r.BOOL_VEC3:
                  case r.INT_VEC3:
                    this.value = [ 0, 0, 0 ];
                    break;

                  case r.FLOAT_VEC4:
                  case r.BOOL_VEC4:
                  case r.INT_VEC4:
                    this.value = [ 0, 0, 0, 0 ];
                    break;

                  case r.FLOAT_MAT2:
                    this.value = new Float32Array([ 1, 0, 0, 1 ]);
                    break;

                  case r.FLOAT_MAT3:
                    this.value = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
                    break;

                  case r.FLOAT_MAT4:
                    this.value = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
                }
            }, e.prototype.generateSetValue = function() {
                switch (this.type) {
                  case r.FLOAT:
                  case r.SAMPLER_2D:
                  case r.SAMPLER_CUBE:
                  case r.BOOL:
                  case r.INT:
                    this.setValue = function(e) {
                        var t = this.value !== e;
                        this.value = e, t && this.upload();
                    };
                    break;

                  case r.FLOAT_VEC2:
                  case r.BOOL_VEC2:
                  case r.INT_VEC2:
                    this.setValue = function(e) {
                        var t = this.value[0] !== e.x || this.value[1] !== e.y;
                        this.value[0] = e.x, this.value[1] = e.y, t && this.upload();
                    };
                    break;

                  case r.FLOAT_VEC3:
                  case r.BOOL_VEC3:
                  case r.INT_VEC3:
                    this.setValue = function(e) {
                        this.value[0] = e.x, this.value[1] = e.y, this.value[2] = e.z, this.upload();
                    };
                    break;

                  case r.FLOAT_VEC4:
                  case r.BOOL_VEC4:
                  case r.INT_VEC4:
                    this.setValue = function(e) {
                        this.value[0] = e.x, this.value[1] = e.y, this.value[2] = e.z, this.value[3] = e.w, 
                        this.upload();
                    };
                    break;

                  case r.FLOAT_MAT2:
                  case r.FLOAT_MAT3:
                  case r.FLOAT_MAT4:
                    this.setValue = function(e) {
                        this.value.set(e), this.upload();
                    };
                }
            }, e.prototype.generateUpload = function() {
                var e = this.gl, t = this.type, i = this.location;
                switch (t) {
                  case r.FLOAT:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform1f(i, t);
                    };
                    break;

                  case r.FLOAT_VEC2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform2f(i, t[0], t[1]);
                    };
                    break;

                  case r.FLOAT_VEC3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform3f(i, t[0], t[1], t[2]);
                    };
                    break;

                  case r.FLOAT_VEC4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform4f(i, t[0], t[1], t[2], t[3]);
                    };
                    break;

                  case r.SAMPLER_2D:
                  case r.SAMPLER_CUBE:
                  case r.BOOL:
                  case r.INT:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform1i(i, t);
                    };
                    break;

                  case r.BOOL_VEC2:
                  case r.INT_VEC2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform2i(i, t[0], t[1]);
                    };
                    break;

                  case r.BOOL_VEC3:
                  case r.INT_VEC3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform3i(i, t[0], t[1], t[2]);
                    };
                    break;

                  case r.BOOL_VEC4:
                  case r.INT_VEC4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniform4i(i, t[0], t[1], t[2], t[3]);
                    };
                    break;

                  case r.FLOAT_MAT2:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix2fv(i, !1, t);
                    };
                    break;

                  case r.FLOAT_MAT3:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix3fv(i, !1, t);
                    };
                    break;

                  case r.FLOAT_MAT4:
                    this.upload = function() {
                        var t = this.value;
                        e.uniformMatrix4fv(i, !1, t);
                    };
                }
            }, e;
        }();
        t.EgretWebGLUniform = i, e(i.prototype, "egret.wxgame.EgretWebGLUniform");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {})), function(t) {
    !function(t) {
        var r = function() {
            function e() {}
            return e.blur_frag = "precision mediump float;\nuniform vec2 blur;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\nuniform vec2 uTextureSize;\nvoid main()\n{\n    const int sampleRadius = 5;\n    const int samples = sampleRadius * 2 + 1;\n    vec2 blurUv = blur / uTextureSize;\n    vec4 color = vec4(0, 0, 0, 0);\n    vec2 uv = vec2(0.0, 0.0);\n    blurUv /= float(sampleRadius);\n    for (int i = -sampleRadius; i <= sampleRadius; i++) {\n        uv.x = vTextureCoord.x + float(i) * blurUv.x;\n        uv.y = vTextureCoord.y + float(i) * blurUv.y;\n        color += texture2D(uSampler, uv);\n    }\n    color /= float(samples);\n    gl_FragColor = color;\n}", 
            e.colorTransform_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\n    vec4 texColor = texture2D(uSampler, vTextureCoord);\n    if(texColor.a > 0.) {\n        texColor = vec4(texColor.rgb / texColor.a, texColor.a);\n    }\n    vec4 locColor = clamp(texColor * matrix + colorAdd, 0., 1.);\n    gl_FragColor = vColor * vec4(locColor.rgb * locColor.a, locColor.a);\n}", 
            e.default_vert = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}", 
            e.glow_frag = "precision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float dist;\nuniform float angle;\nuniform vec4 color;\nuniform float alpha;\nuniform float blurX;\nuniform float blurY;\nuniform float strength;\nuniform float inner;\nuniform float knockout;\nuniform float hideObject;\nuniform vec2 uTextureSize;\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\nvoid main(void) {\n    vec2 px = vec2(1.0 / uTextureSize.x, 1.0 / uTextureSize.y);\n    const float linearSamplingTimes = 7.0;\n    const float circleSamplingTimes = 12.0;\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float curDistanceX = 0.0;\n    float curDistanceY = 0.0;\n    float offsetX = dist * cos(angle) * px.x;\n    float offsetY = dist * sin(angle) * px.y;\n    const float PI = 3.14159265358979323846264;\n    float cosAngle;\n    float sinAngle;\n    float offset = PI * 2.0 / circleSamplingTimes * random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    float stepX = blurX * px.x / linearSamplingTimes;\n    float stepY = blurY * px.y / linearSamplingTimes;\n    for (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {\n        cosAngle = cos(a + offset);\n        sinAngle = sin(a + offset);\n        for (float i = 1.0; i <= linearSamplingTimes; i++) {\n            curDistanceX = i * stepX * cosAngle;\n            curDistanceY = i * stepY * sinAngle;\n            \n            curColor = texture2D(uSampler, vec2(vTextureCoord.x + curDistanceX - offsetX, vTextureCoord.y + curDistanceY + offsetY));\n            totalAlpha += (linearSamplingTimes - i) * curColor.a;\n            maxTotalAlpha += (linearSamplingTimes - i);\n        }\n    }\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;\n    ownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);\n    vec3 mix1 = mix(ownColor.rgb, color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));\n    vec3 mix2 = mix(mix1, color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));\n    float resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);\n    gl_FragColor = vec4(mix2 * resultAlpha, resultAlpha);\n}", 
            e.primitive_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvoid main(void) {\n    gl_FragColor = vColor;\n}", 
            e.texture_frag = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n}", 
            e;
        }();
        t.EgretShaderLib = r, e(r.prototype, "egret.wxgame.EgretShaderLib");
    }(t.wxgame || (t.wxgame = {}));
}(egret || (egret = {}));