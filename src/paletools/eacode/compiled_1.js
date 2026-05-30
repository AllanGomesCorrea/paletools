function isAndroidStockBrowser() {
    var t = navigator.userAgent
      , e = -1 < t.indexOf("Android") && -1 < t.indexOf("Mozilla/5.0") && -1 < t.indexOf("AppleWebKit")
      , n = new RegExp(/AppleWebKit\/([\d.]+)/)
      , n = null === n.exec(t) ? null : parseFloat(n.exec(t)[1]);
    return e && null !== n && n < 537
}
function isSupportedBrowser() {
    return !isAndroidStockBrowser() && function testWebGl(t) {
        try {
            return !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
        } catch (t) {
            return !1
        }
    }(document.createElement("canvas"))
}
if (!isSupportedBrowser())
    throw new Error("Browser not supported");
( () => {
    var n = /^\s*function\s+([^\(\s]*)\s*/;
    function _name() {
        var t, e;
        return this === Function || this === Function.prototype.constructor ? e = "Function" : this !== Function.prototype && (e = (t = ("" + this).match(n)) && t[1]),
        e || ""
    }
    var t = !("name"in Function.prototype && "name"in function x() {}
    )
      , e = "function" == typeof Object.defineProperty && ( () => {
        var e;
        try {
            Object.defineProperty(Function.prototype, "_xyz", {
                get: function() {
                    return "blah"
                },
                configurable: !0
            }),
            e = "blah" === Function.prototype._xyz,
            delete Function.prototype._xyz
        } catch (t) {
            e = !1
        }
        return e
    }
    )()
      , i = "function" == typeof Object.prototype.__defineGetter__ && ( () => {
        var e;
        try {
            Function.prototype.__defineGetter__("_abc", function() {
                return "foo"
            }),
            e = "foo" === Function.prototype._abc,
            delete Function.prototype._abc
        } catch (t) {
            e = !1
        }
        return e
    }
    )();
    Function.prototype._name = _name,
    t && (e ? Object.defineProperty(Function.prototype, "name", {
        get: function() {
            var t = _name.call(this);
            return this !== Function.prototype && Object.defineProperty(this, "name", {
                value: t,
                configurable: !0
            }),
            t
        },
        configurable: !0
    }) : i && Function.prototype.__defineGetter__("name", function() {
        var t = _name.call(this);
        return this !== Function.prototype && this.__defineGetter__("name", function() {
            return t
        }),
        t
    }))
}
)(),
Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(t) {
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var e = Object(this)
          , n = e.length >>> 0;
        if ("function" != typeof t)
            throw new TypeError("predicate must be a function");
        for (var i = arguments[1], o = 0; o < n; ) {
            var a = e[o];
            if (t.call(i, a, o, e))
                return o;
            o++
        }
        return -1
    },
    configurable: !0,
    writable: !0
});
var DOMKit = ( () => {
    function DOMKit() {}
    return DOMKit.addClass = function(i, t) {
        "" !== t && t.trim().split(" ").forEach(function(t) {
            if (i instanceof HTMLCollection)
                for (var e = i.length; 0 < e--; ) {
                    var n = i.item(e);
                    n && n.classList.add(t)
                }
            else
                i.classList.add(t)
        }, this)
    }
    ,
    DOMKit.removeClass = function(i, t) {
        "" !== t && t.trim().split(" ").forEach(function(t) {
            if (i instanceof HTMLCollection)
                for (var e = i.length; 0 < e--; ) {
                    var n = i.item(e);
                    n && n.classList.remove(t)
                }
            else
                i.classList.remove(t)
        }, this)
    }
    ,
    DOMKit.toggleClass = function(e, t, n) {
        var i = this;
        "" !== t && t.trim().split(" ").forEach(function(t) {
            (n = "boolean" != typeof n ? !i.hasClass(e, t) : n) ? i.addClass(e, t) : i.removeClass(e, t)
        }, this)
    }
    ,
    DOMKit.hasClass = function(t, e) {
        return "" !== e && t.classList.contains(e)
    }
    ,
    DOMKit.remove = function(t) {
        function _(t) {
            t.parentElement && t.parentElement.removeChild(t)
        }
        if (t instanceof HTMLCollection)
            for (var e = t.length; 0 < e--; ) {
                var n = t.item(e);
                n && _(n)
            }
        else
            _(t)
    }
    ,
    DOMKit.empty = function(t) {
        for (; t.hasChildNodes(); )
            t.lastChild && t.removeChild(t.lastChild)
    }
    ,
    DOMKit.insertBefore = function(t, e) {
        e.parentNode && e.parentNode.insertBefore(t, e)
    }
    ,
    DOMKit.insertAfter = function(t, e) {
        e.parentNode && e.parentNode.insertBefore(t, e.nextSibling)
    }
    ,
    DOMKit.toggleDisplayStyle = function(t, e) {
        t.style.display = e ? "" : "none"
    }
    ,
    DOMKit.findElements = function(t, e) {
        return Array.prototype.slice.call(t.querySelectorAll(e))
    }
    ,
    DOMKit.HTMLCollectionToArray = function(t) {
        return Array.prototype.slice.call(t)
    }
    ,
    DOMKit.tokenListSupports = function(t, e) {
        if (!t || !t.supports)
            return !1;
        try {
            return t.supports(e)
        } catch (t) {
            return t instanceof TypeError && console.log("The DOMTokenList doesn't have a supported tokens list"),
            !1
        }
    }
    ,
    DOMKit.isInDOM = function(t) {
        return document.body.contains(t)
    }
    ,
    DOMKit
}
)()
  , tns = (( () => {
    var i = function(t) {
        this.w = t || []
    }
      , V = (i.prototype.set = function(t) {
        this.w[t] = !0
    }
    ,
    i.prototype.encode = function() {
        for (var t = [], e = 0; e < this.w.length; e++)
            this.w[e] && (t[Math.floor(e / 6)] ^= 1 << e % 6);
        for (e = 0; e < t.length; e++)
            t[e] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(t[e] || 0);
        return t.join("") + "~"
    }
    ,
    new i);
    function J(t) {
        V.set(t)
    }
    function wa(t) {
        return "function" == typeof t
    }
    function ya(t) {
        return null != t && -1 < (t.constructor + "").indexOf("String")
    }
    function Aa(t) {
        return t ? t.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
    }
    function Qa(t, e) {
        if (1 == e.length && null != e[0] && "object" == typeof e[0])
            return e[0];
        for (var n = {}, i = Math.min(t.length + 1, e.length), o = 0; o < i; o++) {
            if ("object" == typeof e[o]) {
                for (var a in e[o])
                    e[o].hasOwnProperty(a) && (n[a] = e[o][a]);
                break
            }
            o < t.length && (n[t[o]] = e[o])
        }
        return n
    }
    function j0() {
        this.M = []
    }
    var z = function(t, e) {
        var n = new i(U(t));
        n.set(e),
        t.set(ne, n.w)
    }
      , G = function(t) {
        t = U(t),
        t = new i(t);
        for (var e = V.w.slice(), n = 0; n < t.w.length; n++)
            e[n] = e[n] || t.w[n];
        return new i(e).encode()
    }
      , U = function(t) {
        return t = t.get(ne),
        t = K(t) ? t : []
    }
      , K = function(t) {
        return "[object Array]" == Object.prototype.toString.call(Object(t))
    }
      , y = function(t, e) {
        return 0 == t.indexOf(e)
    }
      , q = function(t) {
        var e = x.createElement("img");
        return e.width = 1,
        e.height = 1,
        e.src = t,
        e
    }
      , a = function() {}
      , w = function(t) {
        return encodeURIComponent instanceof Function ? encodeURIComponent(t) : (J(28),
        t)
    }
      , r = function(t, e, n, i) {
        try {
            t.addEventListener ? t.addEventListener(e, n, !!i) : t.attachEvent && t.attachEvent("on" + e, n)
        } catch (t) {
            J(27)
        }
    }
      , $ = /^[\w\-:/.?=&%!]+$/
      , Z = function(t, e, n) {
        t && (n ? (n = "",
        e && $.test(e) && (n = ' id="' + e + '"'),
        $.test(t) && x.write("<script" + n + ' src="' + t + '"><\/script>')) : ((n = x.createElement("script")).type = "text/javascript",
        n.async = !0,
        n.src = t,
        e && (n.id = e),
        (t = x.getElementsByTagName("script")[0]).parentNode.insertBefore(n, t)))
    }
      , s = function() {
        return "https:" == x.location.protocol
    }
      , Y = function(t, e) {
        t = t.match("(?:&|#|\\?)" + w(e).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)");
        return t && 2 == t.length ? t[1] : ""
    }
      , S = function() {
        var t = "" + x.location.hostname;
        return 0 == t.indexOf("www.") ? t.substring(4) : t
    }
      , Q = function(t) {
        var e = x.referrer;
        if (/^https?:\/\//i.test(e)) {
            if (t)
                return e;
            t = "//" + x.location.hostname;
            var n = e.indexOf(t);
            return 5 != n && 6 != n || "/" != (t = e.charAt(n + t.length)) && "?" != t && "" != t && ":" != t ? e : void 0
        }
    }
      , l = function() {
        this.keys = [],
        this.values = {},
        this.m = {}
    }
      , C = (l.prototype.set = function(t, e, n) {
        this.keys.push(t),
        n ? this.m[":" + t] = e : this.values[":" + t] = e
    }
    ,
    l.prototype.get = function(t) {
        return (this.m.hasOwnProperty(":" + t) ? this.m : this.values)[":" + t]
    }
    ,
    l.prototype.map = function(t) {
        for (var e = 0; e < this.keys.length; e++) {
            var n = this.keys[e]
              , i = this.get(n);
            i && t(n, i)
        }
    }
    ,
    window)
      , x = document
      , tt = window
      , u = function(t) {
        var e = tt._gaUserPrefs;
        if (e && e.ioo && e.ioo() || t && !0 === tt["ga-disable-" + t])
            return !0;
        try {
            var n = tt.external;
            if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs)
                return !0
        } catch (t) {}
        return !1
    }
      , E = function(t) {
        var e = []
          , n = x.cookie.split(";");
        t = new RegExp("^\\s*" + t + "=\\s*(.*?)\\s*$");
        for (var i = 0; i < n.length; i++) {
            var o = n[i].match(t);
            o && e.push(o[1])
        }
        return e
    }
      , T = function(t, e, n, i, o, a) {
        if (!(o = !u(o) && !(nt.test(x.location.hostname) || "/" == n && et.test(i))))
            return !1;
        if (e && 1200 < e.length && (e = e.substring(0, 1200),
        J(24)),
        n = t + "=" + e + "; path=" + n + "; ",
        a && (n += "expires=" + new Date((new Date).getTime() + a).toGMTString() + "; "),
        i && "none" != i && (n += "domain=" + i + ";"),
        i = x.cookie,
        x.cookie = n,
        !(i = i != x.cookie))
            t: {
                for (t = E(t),
                i = 0; i < t.length; i++)
                    if (e == t[i]) {
                        i = !0;
                        break t
                    }
                i = !1
            }
        return i
    }
      , f = function(t) {
        return w(t).replace(/\(/g, "%28").replace(/\)/g, "%29")
    }
      , et = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/
      , nt = /(^|\.)doubleclick\.net$/i
      , it = function() {
        return (L || s() ? "https:" : "http:") + "//www.google-analytics.com"
    }
      , ot = function(t) {
        this.name = "len",
        this.message = t + "-8192"
    }
      , at = function(t, e, n) {
        if (n = n || a,
        e.length <= 2036)
            g(t, e, n);
        else {
            if (!(e.length <= 8192))
                throw lt("len", e.length),
                new ot(e.length);
            st(t, e, n) || rt(t, e, n) || g(t, e, n)
        }
    }
      , g = function(t, e, n) {
        var i = q(t + "?" + e);
        i.onload = i.onerror = function() {
            i.onload = null,
            i.onerror = null,
            n()
        }
    }
      , rt = function(t, e, n) {
        var i, o = C.XMLHttpRequest;
        return !!o && "withCredentials"in (i = new o) && (i.open("POST", t, !0),
        i.withCredentials = !0,
        i.setRequestHeader("Content-Type", "text/plain"),
        i.onreadystatechange = function() {
            4 == i.readyState && (n(),
            i = null)
        }
        ,
        i.send(e),
        !0)
    }
      , st = function(t, e, n) {
        return !!C.navigator.sendBeacon && !!C.navigator.sendBeacon(t, e) && (n(),
        !0)
    }
      , lt = function(t, e, n) {
        1 <= 100 * Math.random() || u("?") || (t = ["t=error", "_e=" + t, "_v=j47", "sr=1"],
        e && t.push("_f=" + e),
        n && t.push("_m=" + w(n.substring(0, 100))),
        t.push("aip=1"),
        t.push("z=" + A()),
        g(it() + "/collect", t.join("&"), a))
    }
      , ut = function(t) {
        var e = C.gaData = C.gaData || {};
        return e[t] = e[t] || {}
    };
    function Ja(t) {
        if (100 != t.get(Te) && La(O(t, I)) % 1e4 >= 100 * p(t, Te))
            throw "abort"
    }
    function Ma(t) {
        if (u(O(t, _)))
            throw "abort"
    }
    function Oa() {
        var t = x.location.protocol;
        if ("http:" != t && "https:" != t)
            throw "abort"
    }
    function Pa(n) {
        try {
            C.navigator.sendBeacon ? J(42) : C.XMLHttpRequest && "withCredentials"in new C.XMLHttpRequest && J(40)
        } catch (t) {}
        n.set(ee, G(n), !0),
        n.set(t, p(n, t) + 1);
        var i = [];
        h.map(function(t, e) {
            e.F && null != (t = n.get(t)) && t != e.defaultValue && ("boolean" == typeof t && (t *= 1),
            i.push(e.F + "=" + w("" + t)))
        }),
        i.push("z=" + ct()),
        n.set(vt, i.join("&"), !0)
    }
    function Sa(t) {
        var e, n, i = O(t, ke) || it() + "/collect", o = O(t, yt);
        (o = !o && t.get(mt) ? "beacon" : o) ? (e = O(t, vt),
        n = (n = t.get(D)) || a,
        "image" == o ? g(i, e, n) : "xhr" == o && rt(i, e, n) || "beacon" == o && st(i, e, n) || at(i, e, n)) : at(i, O(t, vt), t.get(D)),
        i = t.get(_),
        o = (i = ut(i)).hitcount,
        i.hitcount = o ? o + 1 : 1,
        i = t.get(_),
        delete ut(i).pending_experiments,
        t.set(D, a, !0)
    }
    function Hc(t) {
        (C.gaData = C.gaData || {}).expId && t.set(Ut, (C.gaData = C.gaData || {}).expId),
        (C.gaData = C.gaData || {}).expVar && t.set(Kt, (C.gaData = C.gaData || {}).expVar);
        var e, n = t.get(_);
        if (n = ut(n).pending_experiments) {
            var i = [];
            for (e in n)
                n.hasOwnProperty(e) && n[e] && i.push(encodeURIComponent(e) + "." + encodeURIComponent(n[e]));
            e = i.join("!")
        } else
            e = void 0;
        e && t.set(Xt, e, !0)
    }
    function cd() {
        if (C.navigator && "preview" == C.navigator.loadPurpose)
            throw "abort"
    }
    function yd(t) {
        var e = C.gaDevIds;
        K(e) && 0 != e.length && t.set("&did", e.join(","), !0)
    }
    function vb(t) {
        if (!t.get(_))
            throw "abort"
    }
    j0.prototype.add = function(t) {
        this.M.push(t)
    }
    ,
    j0.prototype.D = function(t) {
        try {
            for (var e = 0; e < this.M.length; e++) {
                var n = t.get(this.M[e]);
                n && wa(n) && n.call(C, t)
            }
        } catch (t) {}
        (e = t.get(D)) != a && wa(e) && (t.set(D, a, !0),
        setTimeout(e, 10))
    }
    ;
    var A = function() {
        return Math.round(2147483647 * Math.random())
    }
      , ct = function() {
        try {
            var t = new Uint32Array(1);
            return C.crypto.getRandomValues(t),
            2147483647 & t[0]
        } catch (t) {
            return A()
        }
    };
    function Ta(t) {
        var e = p(t, Yt);
        if (500 <= e && J(15),
        "transaction" != (n = O(t, M)) && "item" != n) {
            var n = p(t, te)
              , i = (new Date).getTime()
              , o = p(t, Qt);
            if (0 == o && t.set(Qt, i),
            0 < (o = Math.round(2 * (i - o) / 1e3)) && (n = Math.min(n + o, 20),
            t.set(Qt, i)),
            n <= 0)
                throw "abort";
            t.set(te, --n)
        }
        t.set(Yt, ++e)
    }
    function m0() {
        this.data = new l
    }
    function v0(t, e, n, i, o) {
        return t = new v(t,e,n,i,o),
        h.set(t.name, t),
        t.name
    }
    function w0(t, e) {
        dt.push([new RegExp("^" + t + "$"), e])
    }
    function x0(t, e, n) {
        return v0(t, e, n, void 0, y0)
    }
    function y0() {}
    var h = new l
      , dt = []
      , O = (m0.prototype.get = function(t) {
        var e = m(t)
          , n = this.data.get(t);
        return e && null == n && (n = wa(e.defaultValue) ? e.defaultValue() : e.defaultValue),
        e && e.Z ? e.Z(this, t, n) : n
    }
    ,
    function(t, e) {
        t = t.get(e);
        return null == t ? "" : "" + t
    }
    )
      , p = function(t, e) {
        t = t.get(e);
        return null == t || "" === t ? 0 : +t
    }
      , ft = (m0.prototype.set = function(t, e, n) {
        if (t)
            if ("object" == typeof t)
                for (var i in t)
                    t.hasOwnProperty(i) && ft(this, i, t[i], n);
            else
                ft(this, t, e, n)
    }
    ,
    function(t, e, n, i) {
        null != n && e === _ && en.test(n);
        var o = m(e);
        o && o.o ? o.o(t, e, n, i) : t.data.set(e, n, i)
    }
    )
      , v = function(t, e, n, i, o) {
        this.name = t,
        this.F = e,
        this.Z = i,
        this.o = o,
        this.defaultValue = n
    }
      , m = function(t) {
        var e = h.get(t);
        if (!e)
            for (var n = 0; n < dt.length; n++) {
                var i = dt[n]
                  , o = i[0].exec(t);
                if (o) {
                    e = i[1](o),
                    h.set(e.name, e);
                    break
                }
            }
        return e
    }
      , k = ya(window.GoogleAnalyticsObject) && Aa(window.GoogleAnalyticsObject) || "ga"
      , L = !1
      , gt = x0("apiVersion", "v")
      , ht = x0("clientVersion", "_v")
      , pt = (v0("anonymizeIp", "aip"),
    v0("adSenseId", "a"))
      , M = v0("hitType", "t")
      , D = v0("hitCallback")
      , vt = v0("hitPayload")
      , mt = (v0("nonInteraction", "ni"),
    v0("currencyCode", "cu"),
    v0("dataSource", "ds"),
    v0("useBeacon", void 0, !1))
      , yt = v0("transport")
      , t = (v0("sessionControl", "sc", ""),
    v0("sessionGroup", "sg"),
    v0("queueTime", "qt"),
    v0("_s", "_s"))
      , wt = (v0("screenName", "cd"),
    v0("location", "dl", ""))
      , bt = v0("referrer", "dr")
      , e = v0("page", "dp", "")
      , St = (v0("hostname", "dh"),
    v0("language", "ul"))
      , Ct = v0("encoding", "de")
      , xt = (v0("title", "dt", function() {
        return x.title || void 0
    }),
    w0("contentGroup([0-9]+)", function(t) {
        return new v(t[0],"cg" + t[1])
    }),
    v0("screenColors", "sd"))
      , Et = v0("screenResolution", "sr")
      , Tt = v0("viewportSize", "vp")
      , At = v0("javaEnabled", "je")
      , Ot = v0("flashVersion", "fl")
      , n = (v0("campaignId", "ci"),
    v0("campaignName", "cn"),
    v0("campaignSource", "cs"),
    v0("campaignMedium", "cm"),
    v0("campaignKeyword", "ck"),
    v0("campaignContent", "cc"),
    v0("eventCategory", "ec"))
      , kt = v0("eventAction", "ea")
      , Lt = v0("eventLabel", "el")
      , Mt = v0("eventValue", "ev")
      , Dt = v0("socialNetwork", "sn")
      , Pt = v0("socialAction", "sa")
      , It = v0("socialTarget", "st")
      , _t = v0("l1", "plt")
      , Rt = v0("l2", "pdt")
      , Nt = v0("l3", "dns")
      , Bt = v0("l4", "rrt")
      , Wt = v0("l5", "srt")
      , Ht = v0("l6", "tcp")
      , jt = v0("l7", "dit")
      , Ft = v0("l8", "clt")
      , Vt = v0("timingCategory", "utc")
      , zt = v0("timingVar", "utv")
      , Gt = v0("timingLabel", "utl")
      , Jt = v0("timingValue", "utt")
      , Ut = (v0("appName", "an"),
    v0("appVersion", "av", ""),
    v0("appId", "aid", ""),
    v0("appInstallerId", "aiid", ""),
    v0("exDescription", "exd"),
    v0("exFatal", "exf"),
    v0("expId", "xid"))
      , Kt = v0("expVar", "xvar")
      , Xt = v0("exp", "exp")
      , qt = v0("_utma", "_utma")
      , $t = v0("_utmz", "_utmz")
      , Zt = v0("_utmht", "_utmht")
      , Yt = v0("_hc", void 0, 0)
      , Qt = v0("_ti", void 0, 0)
      , te = v0("_to", void 0, 20)
      , ee = (w0("dimension([0-9]+)", function(t) {
        return new v(t[0],"cd" + t[1])
    }),
    w0("metric([0-9]+)", function(t) {
        return new v(t[0],"cm" + t[1])
    }),
    v0("linkerParam", void 0, void 0, function Bc(t) {
        var e = Ic(t = t.get(I), 0);
        return "_ga=1." + w(e + "." + t)
    }, y0),
    v0("usage", "_u"))
      , ne = v0("_um")
      , ie = (v0("forceSSL", void 0, void 0, function() {
        return L
    }, function(t, e, n) {
        J(34),
        L = !!n
    }),
    v0("_j1", "jid"))
      , oe = (w0("\\&(.*)", function(t) {
        var n, i, e = new v(t[0],t[1]), o = (n = t[0].substring(1),
        h.map(function(t, e) {
            e.F == n && (i = e)
        }),
        i && i.name);
        return o && (e.Z = function(t) {
            return t.get(o)
        }
        ,
        e.o = function(t, e, n, i) {
            t.set(o, n, i)
        }
        ,
        e.F = void 0),
        e
    }),
    x0("_oot"))
      , ae = v0("previewTask")
      , re = v0("checkProtocolTask")
      , se = v0("validationTask")
      , le = v0("checkStorageTask")
      , ue = v0("historyImportTask")
      , ce = v0("samplerTask")
      , de = v0("_rlt")
      , fe = v0("buildHitTask")
      , ge = v0("sendHitTask")
      , he = v0("ceTask")
      , pe = v0("devIdTask")
      , ve = v0("timingTask")
      , me = v0("displayFeaturesTask")
      , P = x0("name")
      , I = x0("clientId", "cid")
      , ye = x0("clientIdTime")
      , we = v0("userId", "uid")
      , _ = x0("trackingId", "tid")
      , R = x0("cookieName", void 0, "_ga")
      , N = x0("cookieDomain")
      , B = x0("cookiePath", void 0, "/")
      , be = x0("cookieExpires", void 0, 63072e3)
      , Se = x0("legacyCookieDomain")
      , Ce = x0("legacyHistoryImport", void 0, !0)
      , W = x0("storage", void 0, "cookie")
      , xe = x0("allowLinker", void 0, !1)
      , Ee = x0("allowAnchor", void 0, !0)
      , Te = x0("sampleRate", "sf", 100)
      , Ae = x0("siteSpeedSampleRate", void 0, 1)
      , Oe = x0("alwaysSendReferrer", void 0, !1)
      , ke = v0("transportUrl")
      , Le = v0("_r", "_r");
    function X(e, t, n, i) {
        t[e] = function() {
            try {
                return i && J(i),
                n.apply(this, arguments)
            } catch (t) {
                throw lt("exc", e, t && t.name),
                t
            }
        }
    }
    var Me = function(t) {
        this.V = t,
        this.fa = void 0,
        this.$ = !1,
        this.oa = void 0,
        this.ea = 1
    }
      , De = function(t, e) {
        var n;
        if (t.fa && t.$)
            return 0;
        if (t.$ = !0,
        e) {
            if (t.oa && p(e, t.oa))
                return p(e, t.oa);
            if (0 == e.get(Ae))
                return 0
        }
        return 0 != t.V && 0 == (n = void 0 === n ? ct() : n) % t.V ? Math.floor(n / t.V) % t.ea + 1 : 0
    };
    function n1(t) {
        if ("cookie" == O(t, W) && !H && (Ne(t),
        !H))
            throw "abort"
    }
    function o1(t) {
        var e, n, i;
        t.get(Ce) && (e = O(t, N),
        i = Xc("__utma", n = O(t, Se) || S(), e)) && (J(19),
        t.set(Zt, (new Date).getTime(), !0),
        t.set(qt, i.R),
        e = Xc("__utmz", n, e)) && i.hash == e.hash && t.set($t, e.R)
    }
    var Pe = function(t) {
        var e = Math.min(p(t, Ae), 100);
        return !(La(O(t, I)) % 100 >= e)
    }
      , Ie = function(t) {
        var e, n = {};
        !_e(n) && !Re(n) || null == (e = n[_t]) || 1 / 0 == e || isNaN(e) || (0 < e ? (o(n, Nt),
        o(n, Ht),
        o(n, Wt),
        o(n, Rt),
        o(n, Bt),
        o(n, jt),
        o(n, Ft),
        t(n)) : r(C, "load", function() {
            Ie(t)
        }, !1))
    }
      , _e = function(t) {
        var e, n = C.performance || C.webkitPerformance;
        return !!(n = n && n.timing) && 0 != (e = n.navigationStart) && (t[_t] = n.loadEventStart - e,
        t[Nt] = n.domainLookupEnd - n.domainLookupStart,
        t[Ht] = n.connectEnd - n.connectStart,
        t[Wt] = n.responseStart - n.requestStart,
        t[Rt] = n.responseEnd - n.responseStart,
        t[Bt] = n.fetchStart - e,
        t[jt] = n.domInteractive - e,
        t[Ft] = n.domContentLoadedEventStart - e,
        !0)
    }
      , Re = function(t) {
        var e, n;
        return C.top == C && (n = (e = C.external) && e.onloadT,
        0 < (n = 2147483648 < (n = e && !e.isValidLoadTime ? void 0 : n) ? void 0 : n) && e.setPageReadyTime(),
        null != n) && (t[_t] = n,
        !0)
    }
      , o = function(t, e) {
        var n = t[e];
        (isNaN(n) || 1 / 0 == n || n < 0) && (t[e] = void 0)
    }
      , H = !1
      , Ne = function(t) {
        if ("cookie" == O(t, W)) {
            var e, n = O(t, R), i = Be(t), o = je(O(t, B)), a = He(O(t, N)), r = 1e3 * p(t, be), s = O(t, _);
            if ("auto" != a)
                T(n, i, o, a, s, r) && (H = !0);
            else {
                if (J(32),
                i = [],
                4 == (a = S().split(".")).length && (e = a[a.length - 1],
                parseInt(e, 10) == e))
                    e = ["none"];
                else {
                    for (e = a.length - 2; 0 <= e; e--)
                        i.push(a.slice(e).join("."));
                    i.push("none"),
                    e = i
                }
                for (var l = 0; l < e.length; l++)
                    if (a = e[l],
                    t.data.set(N, a),
                    i = Be(t),
                    T(n, i, o, a, s, r))
                        return void (H = !0);
                t.data.set(N, "auto")
            }
        }
    }
      , Be = function(t) {
        var e = f(O(t, I))
          , n = He(O(t, N)).split(".").length;
        return 1 < (t = Fe(O(t, B))) && (n += "-" + t),
        ["GA1", n, e].join(".")
    }
      , We = function(t, e, n) {
        for (var i, o = [], a = [], r = 0; r < t.length; r++) {
            var s = t[r];
            s.H[n] == e ? o.push(s) : null == i || s.H[n] < i ? (a = [s],
            i = s.H[n]) : s.H[n] == i && a.push(s)
        }
        return 0 < o.length ? o : a
    }
      , He = function(t) {
        return 0 == t.indexOf(".") ? t.substr(1) : t
    }
      , je = function(t) {
        return t ? 0 != (t = 1 < t.length && t.lastIndexOf("/") == t.length - 1 ? t.substr(0, t.length - 1) : t).indexOf("/") ? "/" + t : t : "/"
    }
      , Fe = function(t) {
        return "/" == (t = je(t)) ? 1 : t.split("/").length
    };
    function Xc(t, e, n) {
        "none" == e && (e = "");
        var i = []
          , o = E(t);
        t = "__utma" == t ? 6 : 2;
        for (var a = 0; a < o.length; a++) {
            var r = ("" + o[a]).split(".");
            r.length >= t && i.push({
                hash: r[0],
                R: o[a],
                O: r
            })
        }
        if (0 != i.length)
            return 1 != i.length && (Zc(e, i) || Zc(n, i) || Zc(null, i)) || i[0]
    }
    function Zc(t, e) {
        var n, i;
        null == t ? n = i = 1 : (n = La(t),
        i = La(y(t, ".") ? t.substring(1) : "." + t));
        for (var o = 0; o < e.length; o++)
            if (e[o].hash == n || e[o].hash == i)
                return e[o]
    }
    var Ve = new RegExp(/^https?:\/\/([^\/:]+)/)
      , ze = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;
    function Ic(t, e) {
        for (var n = new Date, i = (o = C.navigator).plugins || [], n = [t, o.userAgent, n.getTimezoneOffset(), n.getYear(), n.getDate(), n.getHours(), n.getMinutes() + e], o = 0; o < i.length; ++o)
            n.push(i[o].description);
        return La(n.join("."))
    }
    function w1(t) {
        J(48),
        this.target = t,
        this.T = !1
    }
    w1.prototype.ca = function(t, e) {
        if (t.tagName) {
            if ("a" == t.tagName.toLowerCase())
                return void (t.href && (t.href = Ge(this, t.href, e)));
            if ("form" == t.tagName.toLowerCase())
                return Je(this, t)
        }
        if ("string" == typeof t)
            return Ge(this, t, e)
    }
    ;
    var Ge = function(t, e, n) {
        (o = ze.exec(e)) && 3 <= o.length && (e = o[1] + (o[3] ? o[2] + o[3] : "")),
        t = t.target.get("linkerParam");
        var i = e.indexOf("?")
          , o = e.indexOf("#");
        return n ? e += (-1 == o ? "#" : "&") + t : (n = -1 == i ? "?" : "&",
        e = -1 == o ? e + (n + t) : e.substring(0, o) + n + t + e.substring(o)),
        e.replace(/&+_ga=/, "&_ga=")
    }
      , Je = function(t, e) {
        if (e && e.action) {
            var n = t.target.get("linkerParam").split("=")[1];
            if ("get" == e.method.toLowerCase()) {
                for (var i = e.childNodes || [], o = 0; o < i.length; o++)
                    if ("_ga" == i[o].name)
                        return void i[o].setAttribute("value", n);
                (i = x.createElement("input")).setAttribute("type", "hidden"),
                i.setAttribute("name", "_ga"),
                i.setAttribute("value", n),
                e.appendChild(i)
            } else
                "post" == e.method.toLowerCase() && (e.action = Ge(t, e.action))
        }
    };
    function sd(t, e) {
        if (e != x.location.hostname)
            for (var n = 0; n < t.length; n++)
                if (t[n]instanceof RegExp) {
                    if (t[n].test(e))
                        return 1
                } else if (0 <= e.indexOf(t[n]))
                    return 1
    }
    function J1(t, e) {
        var n, i, o, a;
        (t = t.b).get("dcLoaded") || (z(t, 29),
        (e = e || {})[R] && (n = f(e[R])),
        n = new $e(t,"https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&",n),
        i = n,
        o = (e = t).get(fe),
        e.set(fe, function(t) {
            Ze(i, t);
            var e = o(t);
            return Ye(i, t),
            e
        }),
        a = e.get(ge),
        e.set(ge, function(t) {
            var e = a(t);
            return Qe(i, t),
            e
        }),
        t.set("dcLoaded", !0))
    }
    function K1(t) {
        var e;
        t.get("dcLoaded") || "cookie" != t.get(W) || (z(t, 51),
        e = new $e(t),
        Ze(e, t),
        Ye(e, t),
        t.get(e.U) && (t.set(Le, 1, !0),
        t.set(ke, it() + "/r/collect", !0)))
    }
    function P1(t) {
        function b(t, e) {
            a.b.data.set(t, e)
        }
        function c(t, e) {
            b(t, e),
            a.filters.add(t)
        }
        var n, e, i, o, a = this, r = (this.b = new m0,
        this.filters = new j0,
        b(P, t[P]),
        b(_, Aa(t[_])),
        b(R, t[R]),
        b(N, t[N] || S()),
        b(B, t[B]),
        b(be, t[be]),
        b(Se, t[Se]),
        b(Ce, t[Ce]),
        b(xe, t[xe]),
        b(Ee, t[Ee]),
        b(Te, t[Te]),
        b(Ae, t[Ae]),
        b(Oe, t[Oe]),
        b(W, t[W]),
        b(we, t[we]),
        b(ye, t[ye]),
        b(gt, 1),
        b(ht, "j47"),
        c(oe, Ma),
        c(ae, cd),
        c(re, Oa),
        c(se, vb),
        c(le, n1),
        c(ue, o1),
        c(ce, Ja),
        c(de, Ta),
        c(he, Hc),
        c(pe, yd),
        c(me, K1),
        c(fe, Pa),
        c(ge, Sa),
        c(ve, (n = this,
        function(t) {
            var e;
            "pageview" == t.get(M) && !n.I && (n.I = !0,
            e = Pe(t),
            t = 0 < Y(t.get(wt), "gclid").length,
            e || t) && Ie(function(t) {
                n.send(e ? "timing" : "adtiming", t)
            })
        }
        )),
        this.b), t = t[I];
        if ("cookie" == O(r, W)) {
            H = !1;
            t: {
                var s = E(O(r, R));
                if (s && !(s.length < 1)) {
                    e = [];
                    for (var l = 0; l < s.length; l++) {
                        var u, d = (u = s[l].split(".")).shift();
                        (u = ("GA1" == d || "1" == d) && 1 < u.length ? (1 == (d = u.shift().split("-")).length && (d[1] = "1"),
                        d[0] *= 1,
                        d[1] *= 1,
                        {
                            H: d,
                            s: u.join(".")
                        }) : void 0) && e.push(u)
                    }
                    if (1 == e.length) {
                        J(13),
                        e = e[0].s;
                        break t
                    }
                    if (0 != e.length) {
                        if (J(14),
                        s = He(O(r, N)).split(".").length,
                        1 == (e = We(e, s, 0)).length) {
                            e = e[0].s;
                            break t
                        }
                        s = Fe(O(r, B)),
                        e = (e = We(e, s, 1))[0] && e[0].s;
                        break t
                    }
                    J(12)
                }
                e = void 0
            }
            e || (e = O(r, N),
            s = O(r, Se) || S(),
            e = null != (e = Xc("__utma", s, e)) ? (J(10),
            e.O[1] + "." + e.O[2]) : void 0),
            e && (r.data.set(I, e),
            H = !0)
        }
        if (e = r.get(Ee),
        (l = Y(x.location[e ? "href" : "search"], "_ga")) && (r.get(xe) ? -1 == (e = l.indexOf(".")) || (s = l.substring(e + 1),
        "1" != l.substring(0, e)) || -1 == (e = s.indexOf(".")) ? J(22) : (l = s.substring(0, e)) != Ic(e = s.substring(e + 1), 0) && l != Ic(e, -1) && l != Ic(e, -2) ? J(23) : (J(11),
        r.data.set(I, e)) : J(21)),
        t && (J(9),
        r.data.set(I, w(t))),
        !r.get(I))
            if (e = (e = C.gaGlobal && C.gaGlobal.vid) && -1 != e.search(/^(?:utma\.)?\d+\.\d+$/) ? e : void 0)
                J(17),
                r.data.set(I, e);
            else {
                for (J(8),
                e = C.navigator.userAgent + (x.cookie || "") + (x.referrer || ""),
                s = e.length,
                l = C.history.length; 0 < l; )
                    e += l-- ^ s++;
                r.data.set(I, [A() ^ 2147483647 & La(e), Math.round((new Date).getTime() / 1e3)].join("."))
            }
        Ne(r);
        var f, t = this.b, g = C.navigator, h = C.screen, p = x.location, h = (t.set(bt, Q(t.get(Oe))),
        p && ("/" != (f = p.pathname || "").charAt(0) && (J(31),
        f = "/" + f),
        t.set(wt, p.protocol + "//" + p.hostname + f + p.search)),
        h && t.set(Et, h.width + "x" + h.height),
        h && t.set(xt, h.colorDepth + "-bit"),
        x.documentElement), v = (f = x.body) && f.clientWidth && f.clientHeight, m = [];
        if (h && h.clientWidth && h.clientHeight && ("CSS1Compat" === x.compatMode || !v) ? m = [h.clientWidth, h.clientHeight] : v && (m = [f.clientWidth, f.clientHeight]),
        h = m[0] <= 0 || m[1] <= 0 ? "" : m.join("x"),
        t.set(Tt, h),
        t.set(Ot, function fc() {
            var t, e, n;
            if ((n = (n = C.navigator) ? n.plugins : null) && n.length)
                for (var i = 0; i < n.length && !e; i++) {
                    var o = n[i];
                    -1 < o.name.indexOf("Shockwave Flash") && (e = o.description)
                }
            if (!e)
                try {
                    e = (t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version")
                } catch (t) {}
            if (!e)
                try {
                    t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
                    e = "WIN 6,0,21,0",
                    t.AllowScriptAccess = "always",
                    e = t.GetVariable("$version")
                } catch (t) {}
            if (!e)
                try {
                    e = (t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                } catch (t) {}
            return (e = e && (t = e.match(/[\d]+/g)) && 3 <= t.length ? t[0] + "." + t[1] + " r" + t[2] : e) || void 0
        }()),
        t.set(Ct, x.characterSet || x.charset),
        t.set(At, g && "function" == typeof g.javaEnabled && g.javaEnabled() || !1),
        t.set(St, (g && (g.language || g.browserLanguage) || "").toLowerCase()),
        p && t.get(Ee) && (g = x.location.hash)) {
            for (g = g.split(/[?&#]+/),
            p = [],
            h = 0; h < g.length; ++h)
                (y(g[h], "utm_id") || y(g[h], "utm_campaign") || y(g[h], "utm_source") || y(g[h], "utm_medium") || y(g[h], "utm_term") || y(g[h], "utm_content") || y(g[h], "gclid") || y(g[h], "dclid") || y(g[h], "gclsrc")) && p.push(g[h]);
            0 < p.length && (g = "#" + p.join("&"),
            t.set(wt, t.get(wt) + g))
        }
        this.b.set(pt, (v = C.gaGlobal = C.gaGlobal || {}).hid = v.hid || A()),
        f = this.b.get(_),
        m = this.b.get(N),
        t = this.b.get(B),
        Ue || (v = x.location.hash,
        i = C.name,
        o = /^#?gaso=([^&]*)/,
        (i = (v = (v = v && v.match(o) || i && i.match(o)) ? v[1] : E("GASO")[0] || "") && v.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) && (T("GASO", "" + v, t, m, f, 0),
        window._udo || (window._udo = m),
        window._utcp || (window._utcp = t),
        f = i[1],
        Z("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (f ? "prefix=" + f + "&" : "") + A(), "_gasojs")),
        Ue = !0)
    }
    function T1(t) {
        return "prerender" != x.visibilityState && (t(),
        !0)
    }
    function U1(n) {
        var i, o;
        T1(n) || (J(16),
        i = !1,
        r(x, "visibilitychange", o = function() {
            var t, e;
            !i && T1(n) && (i = !0,
            t = o,
            (e = x).removeEventListener ? e.removeEventListener("visibilitychange", t, !1) : e.detachEvent && e.detachEvent("onvisibilitychange", t))
        }
        ))
    }
    function W1(t) {
        if (wa(t[0]))
            this.u = t[0];
        else {
            var e = on.exec(t[0]);
            if (null != e && 4 == e.length && (this.c = e[1] || "t0",
            this.K = e[2] || "",
            this.C = e[3],
            this.a = [].slice.call(t, 1),
            this.K || (this.A = "create" == this.C,
            this.i = "require" == this.C,
            this.g = "provide" == this.C,
            this.ba = "remove" == this.C),
            this.i) && (3 <= this.a.length ? (this.X = this.a[1],
            this.W = this.a[2]) : this.a[1] && (ya(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1])),
            e = t[1],
            t = t[2],
            !this.C)
                throw "abort";
            if (this.i && (!ya(e) || "" == e))
                throw "abort";
            if (this.g && (!ya(e) || "" == e || !wa(t)))
                throw "abort";
            if (ud(this.c) || ud(this.K))
                throw "abort";
            if (this.g && "t0" != this.c)
                throw "abort"
        }
    }
    w1.prototype.S = function(i, o, t) {
        function d(t) {
            try {
                var e;
                t = t || C.event;
                t: {
                    var n = t.target || t.srcElement;
                    for (t = 100; n && 0 < t; ) {
                        if (n.href && n.nodeName.match(/^a(?:rea)?$/i)) {
                            e = n;
                            break t
                        }
                        n = n.parentNode,
                        t--
                    }
                    e = {}
                }
                ("http:" == e.protocol || "https:" == e.protocol) && sd(i, e.hostname || "") && e.href && (e.href = Ge(a, e.href, o))
            } catch (t) {
                J(26)
            }
        }
        var a = this;
        this.T || (this.T = !0,
        r(x, "mousedown", d, !1),
        r(x, "keyup", d, !1)),
        t && r(x, "submit", function(t) {
            var e;
            (t = (t = t || C.event).target || t.srcElement) && t.action && (e = t.action.match(Ve)) && sd(i, e[1]) && Je(a, t)
        })
    }
    ;
    var Ue, Ke = /^(GTM|OPT)-[A-Z0-9]+$/, Xe = /;_gaexp=[^;]*/g, qe = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g, $e = function(t, e, n) {
        this.U = ie,
        this.aa = e,
        e = (e = n) || ((e = O(t, P)) && "t0" != e ? tn.test(e) ? "_gat_" + f(O(t, _)) : "_gat_" + f(e) : "_gat"),
        this.Y = e,
        De(new Me(100), t) && (J(30),
        this.pa = !0)
    }, Ze = function(t, e) {
        e.get(t.U) || ("1" == E(t.Y)[0] ? e.set(t.U, "", !0) : e.set(t.U, "" + A(), !0))
    }, Ye = function(t, e) {
        var n;
        e.get(t.U) && (n = 6e5,
        t.pa && (n /= 10),
        T(t.Y, "1", e.get(B), e.get(N), e.get(_), n))
    }, Qe = function(t, e) {
        var n, i, o;
        e.get(t.U) && (n = new l,
        (i = function(t) {
            m(t).F && n.set(m(t).F, e.get(t))
        }
        )(gt),
        i(ht),
        i(_),
        i(I),
        i(we),
        i(t.U),
        n.set(m(ee).F, G(e)),
        o = t.aa,
        n.map(function(t, e) {
            o = (o += w(t) + "=") + w("" + e) + "&"
        }),
        o += "z=" + A(),
        q(o),
        e.set(t.U, "", !0))
    }, tn = /^gtm\d+$/, en = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/, nn = (P1.prototype.get = function(t) {
        return this.b.get(t)
    }
    ,
    P1.prototype.set = function(t, e) {
        this.b.set(t, e)
    }
    ,
    {
        pageview: [e],
        event: [n, kt, Lt, Mt],
        social: [Dt, Pt, It],
        timing: [Vt, zt, Jt, Gt]
    }), on = (P1.prototype.send = function(t) {
        var e;
        arguments.length < 1 || (t = "string" == typeof t ? (e = t,
        [].slice.call(arguments, 1)) : (e = t && t[M],
        arguments),
        e && ((t = Qa(nn[e] || [], t))[M] = e,
        this.b.set(t, void 0, !0),
        this.filters.D(this.b),
        this.b.data.m = {}))
    }
    ,
    P1.prototype.ma = function(t, e) {
        var n = this;
        un(t, n, e) || (dn(t, function() {
            un(t, n, e)
        }),
        cn(String(n.get(P)), t, void 0, e, !0))
    }
    ,
    /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/);
    function ud(t) {
        return 0 <= t.indexOf(".") || 0 <= t.indexOf(":")
    }
    function cc(t, e) {
        an.set(t, e);
        for (var n = sn.get(t) || [], i = 0; i < n.length; i++)
            n[i]();
        sn.set(t, [])
    }
    var an = new l
      , rn = new l
      , sn = new l
      , ln = {
        ec: 45,
        ecommerce: 46,
        linkid: 47
    }
      , un = function(t, e, n) {
        e != F && e.get(P);
        var i = an.get(t);
        return !!wa(i) && (e.plugins_ = e.plugins_ || new l,
        e.plugins_.get(t) || e.plugins_.set(t, new i(e,n || {})),
        !0)
    }
      , cn = function(t, e, n, i, o) {
        if (!wa(an.get(e)) && !rn.get(e)) {
            if (ln.hasOwnProperty(e) && J(ln[e]),
            Ke.test(e)) {
                if (J(52),
                !(t = F.j(t)))
                    return !0;
                i = {
                    id: e,
                    B: (n = i || {}).dataLayer || "dataLayer",
                    ia: !!t.get("anonymizeIp"),
                    na: o,
                    G: !1
                },
                t.get("&gtm") == e && (i.G = !0);
                var a = String(t.get("name"));
                "t0" != a && (i.target = a),
                u(String(t.get("trackingId"))) || (i.ja = String(t.get(I)),
                i.ka = Number(t.get(ye)),
                t = n.palindrome ? qe : Xe,
                t = (t = x.cookie.replace(/^|(; +)/g, ";").match(t)) ? t.sort().join("").substring(1) : void 0,
                i.la = t),
                t = i.B,
                n = (new Date).getTime(),
                C[t] = C[t] || [],
                n = {
                    "gtm.start": n
                },
                o || (n.event = "gtm.js"),
                C[t].push(n),
                r = "https://www.google-analytics.com/gtm/js?id=" + w((a = i).id),
                "dataLayer" != a.B && b("l", a.B),
                b("t", a.target),
                b("cid", a.ja),
                b("cidt", a.ka),
                b("gac", a.la),
                b("aip", a.ia),
                a.na && b("m", "sync"),
                b("cycle", a.G),
                n = r
            }
            !n && ln.hasOwnProperty(e) ? (J(39),
            n = e + ".js") : J(43),
            n && (0 <= n.indexOf("/") || (n = (L || s() ? "https:" : "http:") + "//www.google-analytics.com/plugins/ua/" + n),
            t = (i = gn(n)).protocol,
            n = x.location.protocol,
            "https:" == t || t == n || "http:" == t && "http:" == n) && fn(i) && (Z(i.url, void 0, o),
            rn.set(e, !0))
        }
        function b(t, e) {
            e && (r += "&" + t + "=" + w(e))
        }
        var r
    }
      , dn = function(t, e) {
        var n = sn.get(t) || [];
        n.push(e),
        sn.set(t, n)
    }
      , fn = function(t) {
        var e = gn(x.location.href);
        return !!y(t.url, "https://www.google-analytics.com/gtm/js?id=") || !(t.query || 0 <= t.url.indexOf("?") || 0 <= t.path.indexOf("://") || (t.host != e.host || t.port != e.port) && (e = "http:" == t.protocol ? 80 : 443,
        "www.google-analytics.com" != t.host || (t.port || e) != e || !y(t.path, "/plugins/")))
    }
      , gn = function(t) {
        function b(t) {
            var e = (t.hostname || "").split(":")[0].toLowerCase()
              , n = (t.protocol || "").toLowerCase();
            return [e, "" + (+t.port || ("http:" == n ? 80 : "https:" == n ? 443 : "")), t = y(t = t.pathname || "", "/") ? t : "/" + t]
        }
        var e = x.createElement("a")
          , n = (e.href = x.location.href,
        (e.protocol || "").toLowerCase())
          , i = b(e)
          , o = e.search || ""
          , a = n + "//" + i[0] + (i[1] ? ":" + i[1] : "");
        return y(t, "//") ? t = n + t : y(t, "/") ? t = a + t : !t || y(t, "?") ? t = a + i[2] + (t || o) : t.split("/")[0].indexOf(":") < 0 && (t = a + i[2].substring(0, i[2].lastIndexOf("/")) + "/" + t),
        e.href = t,
        n = b(e),
        {
            protocol: (e.protocol || "").toLowerCase(),
            host: n[0],
            port: n[1],
            path: n[2],
            query: e.search || "",
            url: t || ""
        }
    }
      , j = {
        ga: function() {
            j.f = []
        }
    }
      , F = (j.ga(),
    j.D = function(t) {
        var e = j.J.apply(j, arguments)
          , e = j.f.concat(e);
        for (j.f = []; 0 < e.length && !j.v(e[0]) && (e.shift(),
        !(0 < j.f.length)); )
            ;
        j.f = j.f.concat(e)
    }
    ,
    j.J = function(t) {
        for (var e = [], n = 0; n < arguments.length; n++)
            try {
                var i = new W1(arguments[n]);
                i.g ? cc(i.a[0], i.a[1]) : (i.i && (i.ha = cn(i.c, i.a[0], i.X, i.W)),
                e.push(i))
            } catch (t) {}
        return e
    }
    ,
    j.v = function(t) {
        try {
            if (t.u)
                t.u.call(C, F.j("t0"));
            else {
                var e, n, i, o = t.c == k ? F : F.j(t.c);
                if (t.A)
                    "t0" == t.c && F.create.apply(F, t.a);
                else if (t.ba)
                    F.remove(t.c);
                else if (o)
                    if (t.i) {
                        if (t.ha && (t.ha = cn(t.c, t.a[0], t.X, t.W)),
                        !un(t.a[0], o, t.W))
                            return !0
                    } else
                        t.K ? (e = t.C,
                        n = t.a,
                        (i = o.plugins_.get(t.K))[e].apply(i, n)) : o[t.C].apply(o, t.a)
            }
        } catch (t) {}
    }
    ,
    function(t) {
        J(1),
        j.D.apply(j, [arguments])
    }
    )
      , hn = (F.h = {},
    F.P = [],
    F.L = 0,
    F.answer = 42,
    [_, N, P])
      , e = (F.create = function(t) {
        var e = Qa(hn, [].slice.call(arguments))
          , n = (e[P] || (e[P] = "t0"),
        "" + e[P]);
        return F.h[n] || (e = new P1(e),
        F.h[n] = e,
        F.P.push(e),
        e)
    }
    ,
    F.remove = function(t) {
        for (var e = 0; e < F.P.length; e++)
            if (F.P[e].get(P) == t) {
                F.P.splice(e, 1),
                F.h[t] = null;
                break
            }
    }
    ,
    F.j = function(t) {
        return F.h[t]
    }
    ,
    F.getAll = function() {
        return F.P.slice(0)
    }
    ,
    F.N = function() {
        "ga" != k && J(49);
        var t = C[k];
        if (!t || 42 != t.answer) {
            if (F.L = t && t.l,
            F.loaded = !0,
            X("create", e = C[k] = F, e.create),
            X("remove", e, e.remove),
            X("getByName", e, e.j, 5),
            X("getAll", e, e.getAll, 6),
            X("get", e = P1.prototype, e.get, 7),
            X("set", e, e.set, 4),
            X("send", e, e.send),
            X("requireSync", e, e.ma),
            X("get", e = m0.prototype, e.get),
            X("set", e, e.set),
            !s() && !L) {
                t: {
                    for (var e = x.getElementsByTagName("script"), n = 0; n < e.length && n < 100; n++) {
                        var i = e[n].src;
                        if (i && 0 == i.indexOf("https://www.google-analytics.com/analytics")) {
                            J(33),
                            e = !0;
                            break t
                        }
                    }
                    e = !1
                }
                e && (L = !0)
            }
            s() || L || !De(new Me(1e4)) || (J(36),
            L = !0),
            e = ((C.gaplugins = C.gaplugins || {}).Linker = w1).prototype,
            cc("linker", w1),
            X("decorate", e, e.ca, 20),
            X("autoLink", e, e.S, 25),
            cc("displayfeatures", J1),
            cc("adfeatures", J1),
            t = t && t.q,
            K(t) ? j.D.apply(F, t) : J(50)
        }
    }
    ,
    F.da = function() {
        for (var t = F.getAll(), e = 0; e < t.length; e++)
            t[e].get(P)
    }
    ,
    F.N);
    function La(t) {
        var e, n, i = 1;
        if (t)
            for (i = 0,
            n = t.length - 1; 0 <= n; n--)
                i = 0 != (e = 266338304 & (i = (i << 6 & 268435455) + (e = t.charCodeAt(n)) + (e << 14))) ? i ^ e >> 21 : i;
        return i
    }
    (n = C[k]) && n.r ? e() : U1(e),
    U1(function() {
        j.D(["provide", "render", a])
    })
}
)(window),
( () => {
    var t = window
      , Ke = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || function(t) {
        return setTimeout(t, 16)
    }
      , Xe = (t = window).cancelAnimationFrame || t.mozCancelAnimationFrame || function(t) {
        clearTimeout(t)
    }
    ;
    function extend(t) {
        for (var e, n, i, o = t || {}, a = 1, r = arguments.length; a < r; a++)
            if (null !== (e = arguments[a]))
                for (n in e)
                    o !== (i = e[n]) && void 0 !== i && (o[n] = i);
        return o
    }
    function checkStorageValue(t) {
        return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t
    }
    function setLocalStorage(t, e, n, i) {
        if (i)
            try {
                t.setItem(e, n)
            } catch (t) {}
        return n
    }
    function getBody() {
        var t = document
          , e = t.body;
        return e || ((e = t.createElement("body")).fake = !0),
        e
    }
    var n = document.documentElement;
    function setFakeBody(t) {
        var e = "";
        return t.fake && (e = n.style.overflow,
        t.style.background = "",
        t.style.overflow = n.style.overflow = "hidden",
        n.appendChild(t)),
        e
    }
    function resetFakeBody(t, e) {
        t.fake && (t.remove(),
        n.style.overflow = e,
        n.offsetHeight)
    }
    function addCSSRule(t, e, n, i) {
        "insertRule"in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i)
    }
    function getCssRulesLength(t) {
        return ("insertRule"in t ? t.cssRules : t.rules).length
    }
    function forEach(t, e, n) {
        for (var i = 0, o = t.length; i < o; i++)
            e.call(n, t[i], i)
    }
    var qe = (t = "classList"in document.createElement("_")) ? function(t, e) {
        return t.classList.contains(e)
    }
    : function(t, e) {
        return 0 <= t.className.indexOf(e)
    }
      , $e = t ? function(t, e) {
        qe(t, e) || t.classList.add(e)
    }
    : function(t, e) {
        qe(t, e) || (t.className += " " + e)
    }
      , Ze = t ? function(t, e) {
        qe(t, e) && t.classList.remove(e)
    }
    : function(t, e) {
        qe(t, e) && (t.className = t.className.replace(e, ""))
    }
    ;
    function hasAttr(t, e) {
        return t.hasAttribute(e)
    }
    function getAttr(t, e) {
        return t.getAttribute(e)
    }
    function isNodeList(t) {
        return void 0 !== t.item
    }
    function setAttrs(t, e) {
        if (t = isNodeList(t) || t instanceof Array ? t : [t],
        "[object Object]" === Object.prototype.toString.call(e))
            for (var n = t.length; n--; )
                for (var i in e)
                    t[n].setAttribute(i, e[i])
    }
    function removeAttrs(t, e) {
        t = isNodeList(t) || t instanceof Array ? t : [t];
        for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--; )
            for (var o = n; o--; )
                t[i].removeAttribute(e[o])
    }
    function arrayFromNodeList(t) {
        for (var e = [], n = 0, i = t.length; n < i; n++)
            e.push(t[n]);
        return e
    }
    function hideElement(t, e) {
        "none" !== t.style.display && (t.style.display = "none")
    }
    function showElement(t, e) {
        "none" === t.style.display && (t.style.display = "")
    }
    function isVisible(t) {
        return "none" !== window.getComputedStyle(t).display
    }
    function whichProperty(e) {
        "string" == typeof e && (n = [e],
        i = e.charAt(0).toUpperCase() + e.substr(1),
        ["Webkit", "Moz", "ms", "O"].forEach(function(t) {
            "ms" === t && "transform" !== e || n.push(t + i)
        }),
        e = n);
        for (var n, i, t = document.createElement("fakeelement"), o = (e.length,
        0); o < e.length; o++) {
            var a = e[o];
            if (void 0 !== t.style[a])
                return a
        }
        return !1
    }
    function getEndProperty(t, e) {
        var n = !1;
        return /^Webkit/.test(t) ? n = "webkit" + e + "End" : /^O/.test(t) ? n = "o" + e + "End" : t && (n = e.toLowerCase() + "end"),
        n
    }
    var e = !1;
    try {
        var i = Object.defineProperty({}, "passive", {
            get: function() {
                e = !0
            }
        });
        window.addEventListener("test", null, i)
    } catch (t) {}
    var a = !!e && {
        passive: !0
    };
    function addEvents(t, e, n) {
        for (var i in e) {
            var o = 0 <= ["touchstart", "touchmove"].indexOf(i) && !n && a;
            t.addEventListener(i, e[i], o)
        }
    }
    function removeEvents(t, e) {
        for (var n in e) {
            var i = 0 <= ["touchstart", "touchmove"].indexOf(n) && a;
            t.removeEventListener(n, e[n], i)
        }
    }
    function Events() {
        return {
            topics: {},
            on: function(t, e) {
                this.topics[t] = this.topics[t] || [],
                this.topics[t].push(e)
            },
            off: function(t, e) {
                if (this.topics[t])
                    for (var n = 0; n < this.topics[t].length; n++)
                        if (this.topics[t][n] === e) {
                            this.topics[t].splice(n, 1);
                            break
                        }
            },
            emit: function(e, n) {
                n.type = e,
                this.topics[e] && this.topics[e].forEach(function(t) {
                    t(n, e)
                })
            }
        }
    }
    function wg(x) {
        x = extend({
            container: ".slider",
            mode: "carousel",
            axis: "horizontal",
            items: 1,
            gutter: 0,
            edgePadding: 0,
            fixedWidth: !1,
            autoWidth: !1,
            viewportMax: !1,
            slideBy: 1,
            center: !1,
            controls: !0,
            controlsPosition: "top",
            controlsText: ["prev", "next"],
            controlsContainer: !1,
            prevButton: !1,
            nextButton: !1,
            nav: !0,
            navPosition: "top",
            navContainer: !1,
            navAsThumbnails: !1,
            arrowKeys: !1,
            speed: 300,
            autoplay: !1,
            autoplayPosition: "top",
            autoplayTimeout: 5e3,
            autoplayDirection: "forward",
            autoplayText: ["start", "stop"],
            autoplayHoverPause: !1,
            autoplayButton: !1,
            autoplayButtonOutput: !0,
            autoplayResetOnVisibility: !0,
            animateIn: "tns-fadeIn",
            animateOut: "tns-fadeOut",
            animateNormal: "tns-normal",
            animateDelay: !1,
            loop: !0,
            rewind: !1,
            autoHeight: !1,
            responsive: !1,
            lazyload: !1,
            lazyloadSelector: ".tns-lazy-img",
            touch: !0,
            mouseDrag: !1,
            swipeAngle: 15,
            nested: !1,
            preventActionWhenRunning: !1,
            preventScrollOnTouch: "force",
            freezable: !0,
            onInit: !1,
            useLocalStorage: !0,
            textDirection: "ltr"
        }, x || {});
        var E = document
          , m = window
          , i = {
            ENTER: 13,
            SPACE: 32,
            LEFT: 37,
            RIGHT: 39
        }
          , e = {}
          , n = x.useLocalStorage;
        if (n) {
            var t = navigator.userAgent
              , o = new Date;
            try {
                (e = m.localStorage) ? (e.setItem(o, o),
                n = e.getItem(o) == o,
                e.removeItem(o)) : n = !1,
                n || (e = {})
            } catch (t) {
                n = !1
            }
            n && (e.tnsApp && e.tnsApp !== t && ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function(t) {
                e.removeItem(t)
            }),
            localStorage.tnsApp = t)
        }
        var y = e.tC ? checkStorageValue(e.tC) : setLocalStorage(e, "tC", function calc() {
            var t = document
              , e = getBody()
              , n = setFakeBody(e)
              , i = t.createElement("div")
              , o = !1;
            e.appendChild(i);
            try {
                for (var a, r = "(10px * 10)", s = ["calc" + r, "-moz-calc" + r, "-webkit-calc" + r], l = 0; l < 3; l++)
                    if (a = s[l],
                    i.style.width = a,
                    100 === i.offsetWidth) {
                        o = a.replace(r, "");
                        break
                    }
            } catch (t) {}
            return e.fake ? resetFakeBody(e, n) : i.remove(),
            o
        }(), n)
          , w = e.tPL ? checkStorageValue(e.tPL) : setLocalStorage(e, "tPL", function percentageLayout() {
            var t = document
              , e = getBody()
              , n = setFakeBody(e)
              , i = t.createElement("div")
              , t = t.createElement("div")
              , o = "";
            i.className = "tns-t-subp2",
            t.className = "tns-t-ct";
            for (var a = 0; a < 70; a++)
                o += "<div></div>";
            return t.innerHTML = o,
            i.appendChild(t),
            e.appendChild(i),
            t = Math.abs(i.getBoundingClientRect().left - t.children[67].getBoundingClientRect().left) < 2,
            e.fake ? resetFakeBody(e, n) : i.remove(),
            t
        }(), n)
          , Q = e.tMQ ? checkStorageValue(e.tMQ) : setLocalStorage(e, "tMQ", !0, n)
          , a = e.tTf ? checkStorageValue(e.tTf) : setLocalStorage(e, "tTf", whichProperty("transform"), n)
          , o = e.t3D ? checkStorageValue(e.t3D) : setLocalStorage(e, "t3D", function has3DTransforms(t) {
            var e, n, i, o;
            return !!t && !!window.getComputedStyle && (i = document,
            n = setFakeBody(e = getBody()),
            i = i.createElement("p"),
            o = 9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "",
            o += "transform",
            e.insertBefore(i, null),
            i.style[t] = "translate3d(1px,1px,1px)",
            t = window.getComputedStyle(i).getPropertyValue(o),
            e.fake ? resetFakeBody(e, n) : i.remove(),
            void 0 !== t) && 0 < t.length && "none" !== t
        }(a), n)
          , v = e.tTDu ? checkStorageValue(e.tTDu) : setLocalStorage(e, "tTDu", whichProperty("transitionDuration"), n)
          , u = e.tTDe ? checkStorageValue(e.tTDe) : setLocalStorage(e, "tTDe", whichProperty("transitionDelay"), n)
          , b = e.tADu ? checkStorageValue(e.tADu) : setLocalStorage(e, "tADu", whichProperty("animationDuration"), n)
          , c = e.tADe ? checkStorageValue(e.tADe) : setLocalStorage(e, "tADe", whichProperty("animationDelay"), n)
          , d = e.tTE ? checkStorageValue(e.tTE) : setLocalStorage(e, "tTE", getEndProperty(v, "Transition"), n)
          , f = e.tAE ? checkStorageValue(e.tAE) : setLocalStorage(e, "tAE", getEndProperty(b, "Animation"), n)
          , g = m.console && "function" == typeof m.console.warn
          , h = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"]
          , p = {};
        if (h.forEach(function(t) {
            var e, n;
            "string" == typeof x[t] && (e = x[t],
            n = E.querySelector(e),
            p[t] = e,
            n && n.nodeName ? x[t] = n : g && console.warn("Can't find", x[t]))
        }),
        !(x.container.children.length < 1)) {
            var tt, et, S, nt, T = x.responsive, it = x.nested, A = "carousel" === x.mode;
            if (T) {
                0 in T && (x = extend(x, T[0]),
                delete T[0]);
                var C, ot = {};
                for (C in T) {
                    var at = T[C];
                    ot[C] = "number" == typeof at ? {
                        items: at
                    } : at
                }
                T = ot,
                ot = null
            }
            A || !function updateOptions(t) {
                for (var e in t)
                    A || ("slideBy" === e && (t[e] = "page"),
                    "edgePadding" === e && (t[e] = !1),
                    "autoHeight" === e && (t[e] = !1)),
                    "responsive" === e && updateOptions(t[e])
            }(x),
            A || (x.axis = "horizontal",
            x.slideBy = "page",
            x.edgePadding = !1,
            tt = x.animateIn,
            et = x.animateOut,
            S = x.animateDelay,
            nt = x.animateNormal);
            var rt, st, r, lt, ut, O, ct, k, L, dt, ft, gt, ht, M, pt, vt, mt, yt, wt, s, bt, St, Ct, xt, Et, D, Tt, At, Ot, P, kt, Lt, Mt, Dt, Pt, It, _t, Rt, Nt, I = "horizontal" === x.axis, l = E.createElement("div"), Bt = E.createElement("div"), _ = x.container, Wt = _.parentNode, Ht = _.outerHTML, R = _.children, N = R.length, jt = getWindowWidth(), Ft = !1, B = (T && setBreakpointZone(),
            A && (_.className += " tns-vpfix"),
            x.autoWidth), W = getOption("fixedWidth"), H = getOption("edgePadding"), j = getOption("gutter"), F = getViewportWidth(), V = getOption("center"), z = B ? 1 : Math.floor(getOption("items")), Vt = getOption("slideBy"), zt = x.viewportMax || x.fixedWidthViewportWidth, Gt = getOption("arrowKeys"), Jt = getOption("speed"), Ut = x.rewind, G = !Ut && x.loop, J = getOption("autoHeight"), Kt = getOption("controls"), Xt = getOption("controlsText"), qt = getOption("textDirection"), $t = getOption("nav"), Zt = getOption("touch"), Yt = getOption("mouseDrag"), U = getOption("autoplay"), Qt = getOption("autoplayTimeout"), te = getOption("autoplayText"), ee = getOption("autoplayHoverPause"), ne = getOption("autoplayResetOnVisibility"), K = function createStyleSheet(t) {
                var e = document.createElement("style");
                return t && e.setAttribute("media", t),
                document.querySelector("head").appendChild(e),
                e.sheet || e.styleSheet
            }(), ie = x.lazyload, oe = (x.lazyloadSelector,
            []), X = G ? function getCloneCountForLoop() {
                var t = function getItemsMax() {
                    {
                        if (B || W && !zt)
                            return N - 1;
                        var t = W ? "fixedWidth" : "items"
                          , e = [];
                        if ((W || x[t] < N) && e.push(x[t]),
                        T)
                            for (var n in T) {
                                n = T[n][t];
                                n && (W || n < N) && e.push(n)
                            }
                        return e.length || e.push(0),
                        Math.ceil(W ? zt / Math.min.apply(null, e) : Math.max.apply(null, e))
                    }
                }()
                  , e = A ? Math.ceil((5 * t - N) / 2) : 4 * t - N;
                return e = Math.max(t, e),
                hasOption("edgePadding") ? e + 1 : e
            }() : 0, q = A ? N + 2 * X : N + X, ae = !(!W && !B || G), re = W ? getRightBoundary() : null, se = !A || !G, le = I ? "left" : "top", ue = "", ce = "", de = W ? function() {
                return V && !G ? N - 1 : Math.ceil(-re / (W + j))
            }
            : B ? function() {
                for (var t = q; t--; )
                    if (r[t] > -re)
                        return t
            }
            : function() {
                return V && A && !G ? N - 1 : G || A ? Math.max(0, q - Math.ceil(z)) : q - 1
            }
            , $ = getStartIndex(getOption("startIndex")), fe = $, ge = (getCurrentSlide(),
            0), he = B ? null : de(), pe = x.preventActionWhenRunning, ve = x.swipeAngle, me = !ve || "?", ye = !1, we = x.onInit, Z = new Events, be = " tns-slider tns-" + x.mode, Y = _.id || function getSlideId() {
                var t = window.tnsId;
                return window.tnsId = t ? t + 1 : 1,
                "tns" + window.tnsId
            }(), Se = getOption("disable"), Ce = !1, xe = x.freezable, Ee = !(!xe || B) && getFreeze(), Te = !1, Ae = {
                touchstart: onControlsClick,
                click: onControlsClick,
                keydown: function onControlsKeydown(t) {
                    t = getEvent(t);
                    var e = [i.LEFT, i.RIGHT].indexOf(t.keyCode);
                    ye && pe || 0 <= e && (0 === e ? k.disabled || onControlsClick(t, -1) : L.disabled || onControlsClick(t, 1))
                }
            }, Oe = {
                touchstart: onNavClick,
                click: onNavClick,
                keydown: function onNavKeydown(t) {
                    t = getEvent(t);
                    var e, n = E.activeElement;
                    hasAttr(n, "data-nav") && (e = [i.LEFT, i.RIGHT, i.ENTER, i.SPACE].indexOf(t.keyCode),
                    n = Number(getAttr(n, "data-nav")),
                    0 <= e) && (0 === e ? 0 < n && setFocus(vt[n - 1]) : 1 === e ? n < mt - 1 && setFocus(vt[n + 1]) : goTo(wt = n, t))
                }
            }, ke = {
                mouseover: function mouseoverPause() {
                    P && (stopAutoplayTimer(),
                    kt = !0)
                },
                mouseout: function mouseoutRestart() {
                    kt && (setAutoplayTimer(),
                    kt = !1)
                }
            }, Le = {
                visibilitychange: function onVisibilityChange() {
                    E.hidden ? P && (stopAutoplayTimer(),
                    Mt = !0) : Mt && (setAutoplayTimer(),
                    Mt = !1)
                }
            }, Me = {
                keydown: function onDocumentKeydown(t) {
                    t = getEvent(t);
                    var e = [i.LEFT, i.RIGHT].indexOf(t.keyCode);
                    0 <= e && onControlsClick(t, 0 === e ? -1 : 1)
                }
            }, De = {
                touchstart: onPanStart,
                touchmove: onPanMove,
                touchend: onPanEnd,
                touchcancel: onPanEnd
            }, Pe = {
                mousedown: onPanStart,
                mousemove: onPanMove,
                mouseup: onPanEnd,
                mouseleave: onPanEnd
            }, Ie = null, _e = hasOption("controls"), Re = hasOption("nav"), Ne = !!B || x.navAsThumbnails, Be = hasOption("autoplay"), t = hasOption("touch"), We = hasOption("mouseDrag"), He = "tns-slide-active", je = "tns-complete", Fe = {
                load: function onImgLoaded(t) {
                    imgLoaded(getTarget(t))
                },
                error: function onImgFailed(t) {
                    !function imgFailed(t) {
                        $e(t, "failed"),
                        imgCompleted(t)
                    }(getTarget(t))
                }
            }, Ve = "force" === x.preventScrollOnTouch, ze = (_e && (O = x.controlsContainer,
            ct = x.controlsContainer ? x.controlsContainer.outerHTML : "",
            k = x.prevButton,
            L = x.nextButton,
            dt = x.prevButton ? x.prevButton.outerHTML : "",
            ft = x.nextButton ? x.nextButton.outerHTML : ""),
            Re && (M = x.navContainer,
            pt = x.navContainer ? x.navContainer.outerHTML : "",
            mt = B ? N : getPages(),
            yt = 0,
            wt = -1,
            s = getCurrentNavIndex(),
            bt = s,
            St = "tns-nav-active",
            Ct = "Carousel Page ",
            xt = " (Current Slide)"),
            Be && (Et = "forward" === x.autoplayDirection ? 1 : -1,
            D = x.autoplayButton,
            Tt = x.autoplayButton ? x.autoplayButton.outerHTML : "",
            At = ["<span class='tns-visually-hidden'>", " animation</span>"]),
            (t || We) && (Dt = {},
            _t = !(Pt = {}),
            Nt = I ? function(t, e) {
                return t.x - e.x
            }
            : function(t, e) {
                return t.y - e.y
            }
            ),
            B || resetVariblesWhenDisable(Se || Ee),
            a && (le = a,
            ue = "translate",
            ce = o ? (ue += I ? "3d(" : "3d(0px, ",
            I ? ", 0px, 0px)" : ", 0px)") : (ue += I ? "X(" : "Y(",
            ")")),
            A && (_.className = _.className.replace("tns-vpfix", "")),
            !function initStructure() {
                hasOption("gutter");
                l.className = "tns-outer",
                Bt.className = "tns-inner",
                l.id = Y + "-ow",
                Bt.id = Y + "-iw",
                "" === _.id && (_.id = Y);
                be = be + (w || B ? " tns-subpixel" : " tns-no-subpixel") + (y ? " tns-calc" : " tns-no-calc"),
                B && (be += " tns-autowidth");
                be += " tns-" + x.axis,
                _.className += be,
                (A ? ((rt = E.createElement("div")).id = Y + "-mw",
                rt.className = "tns-ovh",
                l.appendChild(rt),
                rt) : l).appendChild(Bt);
                J && ((rt || Bt).className += " tns-ah");
                if (Wt.insertBefore(l, _),
                Bt.appendChild(_),
                forEach(R, function(t, e) {
                    $e(t, "tns-item"),
                    t.id || (t.id = Y + "-item" + e),
                    !A && nt && $e(t, nt),
                    setAttrs(t, {
                        "aria-hidden": "true",
                        tabindex: "-1"
                    })
                }),
                X) {
                    for (var t = E.createDocumentFragment(), e = E.createDocumentFragment(), n = X; n--; ) {
                        var i = n % N
                          , o = R[i].cloneNode(!0);
                        removeAttrs(o, "id"),
                        e.insertBefore(o, e.firstChild),
                        A && (removeAttrs(o = R[N - 1 - i].cloneNode(!0), "id"),
                        t.appendChild(o))
                    }
                    _.insertBefore(t, _.firstChild),
                    _.appendChild(e),
                    R = _.children
                }
            }(),
            !function initSheet() {
                if (!A)
                    for (var t = $, e = $ + Math.min(N, z); t < e; t++) {
                        var n = R[t];
                        n.style.left = 100 * (t - $) / z + "%",
                        $e(n, tt),
                        Ze(n, nt)
                    }
                I && (w || B ? (addCSSRule(K, "#" + Y + " > .tns-item", "font-size:" + m.getComputedStyle(R[0]).fontSize + ";", getCssRulesLength(K)),
                addCSSRule(K, "#" + Y, "font-size:0;", getCssRulesLength(K))) : A && forEach(R, function(t, e) {
                    t.style.marginLeft = function getSlideMarginLeft(t) {
                        return y ? y + "(" + 100 * t + "% / " + q + ")" : 100 * t / q + "%"
                    }(e)
                }));
                Q ? (v && (a = rt && x.autoHeight ? getTransitionDurationStyle(x.speed) : "",
                addCSSRule(K, "#" + Y + "-mw", a, getCssRulesLength(K))),
                a = getInnerWrapperStyles(x.edgePadding, x.gutter, x.fixedWidth, x.speed, x.autoHeight),
                addCSSRule(K, "#" + Y + "-iw", a, getCssRulesLength(K)),
                A && (a = I && !B ? "width:" + getContainerWidth(x.fixedWidth, x.gutter, x.items) + ";" : "",
                v && (a += getTransitionDurationStyle(Jt)),
                addCSSRule(K, "#" + Y, a, getCssRulesLength(K))),
                a = I && !B ? getSlideWidthStyle(x.fixedWidth, x.gutter, x.items) : "",
                x.gutter && (a += getSlideGutterStyle(x.gutter)),
                A || (v && (a += getTransitionDurationStyle(Jt)),
                b && (a += getAnimationDurationStyle(Jt)))) : (update_carousel_transition_duration(),
                Bt.style.cssText = getInnerWrapperStyles(H, j, W, J),
                A && I && !B && (_.style.width = getContainerWidth(W, j, z)),
                a = I && !B ? getSlideWidthStyle(W, j, z) : "",
                j && (a += getSlideGutterStyle(j))),
                a && addCSSRule(K, "#" + Y + " > .tns-item", a, getCssRulesLength(K));
                if (T && Q)
                    for (var i in T) {
                        i = parseInt(i);
                        var o = T[i]
                          , a = ""
                          , r = ""
                          , s = ""
                          , l = ""
                          , u = ""
                          , c = B ? null : getOption("items", i)
                          , d = getOption("fixedWidth", i)
                          , f = getOption("speed", i)
                          , g = getOption("edgePadding", i)
                          , h = getOption("autoHeight", i)
                          , p = getOption("gutter", i);
                        v && rt && getOption("autoHeight", i) && "speed"in o && (r = "#" + Y + "-mw{" + getTransitionDurationStyle(f) + "}"),
                        ("edgePadding"in o || "gutter"in o) && (s = "#" + Y + "-iw{" + getInnerWrapperStyles(g, p, d, f, h) + "}"),
                        A && I && !B && ("fixedWidth"in o || "items"in o || W && "gutter"in o) && (l = "width:" + getContainerWidth(d, p, c) + ";"),
                        v && "speed"in o && (l += getTransitionDurationStyle(f)),
                        l = l && "#" + Y + "{" + l + "}",
                        ("fixedWidth"in o || W && "gutter"in o || !A && "items"in o) && (u += getSlideWidthStyle(d, p, c)),
                        "gutter"in o && (u += getSlideGutterStyle(p)),
                        !A && "speed"in o && (v && (u += getTransitionDurationStyle(f)),
                        b) && (u += getAnimationDurationStyle(f)),
                        (a = r + s + l + (u = u && "#" + Y + " > .tns-item{" + u + "}")) && K.insertRule("@media (min-width: " + i / 16 + "em) {" + a + "}", K.cssRules.length)
                    }
            }(),
            initSliderTransform(),
            G ? A ? function() {
                var t = ge
                  , e = he;
                t += Vt,
                e -= Vt,
                H ? (t += 1,
                --e) : W && (F + j) % (W + j) && --e,
                X && (e < $ ? $ -= N : $ < t && ($ += N))
            }
            : function() {
                if (he < $)
                    for (; ge + N <= $; )
                        $ -= N;
                else if ($ < ge)
                    for (; $ <= he - N; )
                        $ += N
            }
            : function() {
                $ = Math.max(ge, Math.min(he, $))
            }
            ), Ge = A ? function() {
                resetDuration(_, ""),
                v || !Jt ? (doContainerTransform(),
                Jt && isVisible(_) ? (clearTimeout(Ie),
                Ie = setTimeout(onTransitionEnd, Jt + 100)) : onTransitionEnd()) : function jsTransform(t, e, n, i, o, a, r) {
                    var s = Math.min(a, 10)
                      , l = 0 <= o.indexOf("%") ? "%" : "px"
                      , o = o.replace(l, "")
                      , u = Number(t.style[e].replace(n, "").replace(i, "").replace(l, ""))
                      , c = (o - u) / a * s;
                    setTimeout(function moveElement() {
                        a -= s;
                        u += c;
                        t.style[e] = n + u + l + i;
                        0 < a ? setTimeout(moveElement, s) : r()
                    }, s)
                }(_, le, ue, ce, getContainerTransformValue(), Jt, onTransitionEnd),
                I || updateContentWrapperHeight()
            }
            : function() {
                oe = [];
                var t = {};
                t[d] = t[f] = onTransitionEnd,
                removeEvents(R[fe], t),
                addEvents(R[$], t),
                animateSlide(fe, tt, et, !0),
                animateSlide($, nt, tt),
                d && f && Jt && isVisible(_) || onTransitionEnd()
            }
            , Je = "rtl" === qt ? -100 / q : -100, Ue = "rtl" === qt ? 100 : 100 / q;
            return {
                version: "2.9.1",
                getInfo: info,
                events: Z,
                goTo: goTo,
                play: function play() {
                    U && !P && (startAutoplay(),
                    Lt = !1)
                },
                pause: function pause() {
                    P && (stopAutoplay(),
                    Lt = !0)
                },
                isOn: Ft,
                updateSliderHeight: updateInnerWrapperHeight,
                refresh: initSliderTransform,
                destroy: function destroy() {
                    K.disabled = !0,
                    K.ownerNode && K.ownerNode.remove(),
                    removeEvents(m, {
                        resize: onResize
                    }),
                    Gt && removeEvents(E, Me),
                    O && removeEvents(O, Ae),
                    M && removeEvents(M, Oe),
                    removeEvents(_, ke),
                    removeEvents(_, Le),
                    D && removeEvents(D, {
                        click: toggleAutoplay
                    }),
                    U && clearInterval(Ot),
                    A && d && ((t = {})[d] = onTransitionEnd,
                    removeEvents(_, t)),
                    Zt && removeEvents(_, De),
                    Yt && removeEvents(_, Pe);
                    var t, e, a = [Ht, ct, dt, ft, pt, Tt];
                    for (e in h.forEach(function(t, e) {
                        var n, i, o = "container" === t ? l : x[t];
                        "object" == typeof o && (n = o.previousElementSibling || !1,
                        i = o.parentNode,
                        o.outerHTML = a[e],
                        x[t] = n ? n.nextElementSibling : i.firstElementChild)
                    }),
                    h = tt = et = S = nt = I = l = Bt = _ = Wt = Ht = R = N = st = jt = B = W = H = j = F = z = Vt = zt = Gt = Jt = Ut = G = J = K = ie = r = oe = X = q = ae = re = se = le = ue = ce = de = $ = fe = ge = he = ve = me = ye = we = Z = be = Y = Se = Ce = xe = Ee = Te = Ae = Oe = ke = Le = Me = De = Pe = _e = Re = Ne = Be = We = He = je = Fe = lt = Kt = Xt = O = ct = k = L = gt = ht = $t = M = pt = vt = mt = yt = wt = s = bt = St = Ct = xt = U = Qt = Et = te = ee = D = Tt = ne = At = Ot = P = kt = Lt = Mt = Dt = Pt = It = _t = Rt = Nt = Zt = Yt = null,
                    this)
                        "rebuild" !== e && (this[e] = null);
                    Ft = !1
                },
                rebuild: function() {
                    return wg(extend(x, p))
                }
            }
        }
        function resetVariblesWhenDisable(t) {
            t && (Kt = $t = Zt = Yt = Gt = U = ee = ne = !1)
        }
        function getCurrentSlide() {
            for (var t = A ? $ - X : $; t < 0; )
                t += N;
            return t % N + 1
        }
        function getStartIndex(t) {
            return t = t ? Math.max(0, Math.min(G ? N - 1 : N - z, t)) : 0,
            A ? t + X : t
        }
        function getAbsIndex(t) {
            for (null == t && (t = $),
            A && (t -= X); t < 0; )
                t += N;
            return Math.floor(t % N)
        }
        function getCurrentNavIndex() {
            var t = getAbsIndex()
              , t = Ne ? t : W || B ? Math.ceil((t + 1) * mt / N - 1) : Math.floor(t / z);
            return t = !G && A && $ === he ? mt - 1 : t
        }
        function getWindowWidth() {
            return m.innerWidth || E.documentElement.clientWidth || E.body.clientWidth
        }
        function getInsertPosition(t) {
            return "top" === t ? "afterbegin" : "beforeend"
        }
        function getViewportWidth() {
            var t = H ? 2 * H - j : 0;
            return function getClientWidth(t) {
                var e, n = E.createElement("div");
                return t.appendChild(n),
                e = (e = n.getBoundingClientRect()).right - e.left,
                n.remove(),
                e || getClientWidth(t.parentNode)
            }(Wt) - t
        }
        function hasOption(t) {
            if (x[t])
                return !0;
            if (T)
                for (var e in T)
                    if (T[e][t])
                        return !0;
            return !1
        }
        function getOption(t, e) {
            if (null == e && (e = jt),
            "items" === t && W)
                return Math.floor((F + j) / (W + j)) || 1;
            var n = x[t];
            if (T)
                for (var i in T)
                    e >= parseInt(i) && t in T[i] && (n = T[i][t]);
            return "slideBy" === t && "page" === n && (n = getOption("items")),
            n = A || "slideBy" !== t && "items" !== t ? n : Math.floor(n)
        }
        function getInnerWrapperStyles(t, e, n, i, o) {
            var a, r = "";
            return void 0 !== t ? (a = t,
            e && (a -= e),
            r = I ? "margin: 0 " + a + "px 0 " + t + "px;" : "margin: " + t + "px 0 " + a + "px 0;") : e && !n && (t = "-" + e + "px",
            r = "margin: 0 " + (I ? t + " 0 0" : "0 " + t + " 0") + ";"),
            !A && o && v && i && (r += getTransitionDurationStyle(i)),
            r
        }
        function getContainerWidth(t, e, n) {
            return t ? (t + e) * q + "px" : y ? y + "(" + 100 * q + "% / " + n + ")" : 100 * q / n + "%"
        }
        function getSlideWidthStyle(t, e, n) {
            return e = "width:" + (e = t ? t + e + "px" : (A || (n = Math.floor(n)),
            t = A ? q : n,
            y ? y + "(100% / " + t + ")" : 100 / t + "%")),
            "inner" !== it ? e + ";" : e + " !important;"
        }
        function getSlideGutterStyle(t) {
            return !1 !== t ? (I ? "padding-" : "margin-") + (I ? "right" : "bottom") + ": " + t + "px;" : ""
        }
        function getCSSPrefix(t, e) {
            t = t.substring(0, t.length - e).toLowerCase();
            return t = t && "-" + t + "-"
        }
        function getTransitionDurationStyle(t) {
            return getCSSPrefix(v, 18) + "transition-duration:" + t / 1e3 + "s;"
        }
        function getAnimationDurationStyle(t) {
            return getCSSPrefix(b, 17) + "animation-duration:" + t / 1e3 + "s;"
        }
        function initSliderTransform() {
            var t;
            hasOption("autoHeight") || B || !I ? (forEach(t = _.querySelectorAll("img"), function(t) {
                var e = t.src;
                e && e.indexOf("data:image") < 0 ? (addEvents(t, Fe),
                t.src = "",
                t.src = e,
                $e(t, "loading")) : ie || imgLoaded(t)
            }),
            Ke(function() {
                imgsLoadedCheck(arrayFromNodeList(t), function() {
                    lt = !0
                })
            }),
            !B && I && (t = getImageArray($, Math.min($ + z - 1, q - 1))),
            ie ? initSliderTransformStyleCheck() : Ke(function() {
                imgsLoadedCheck(arrayFromNodeList(t), initSliderTransformStyleCheck)
            })) : (A && doContainerTransformSilent(),
            initTools(),
            initEvents())
        }
        function initSliderTransformStyleCheck() {
            var t;
            (B ? (t = G ? $ : N - 1,
            function stylesApplicationCheck() {
                R[t - 1].getBoundingClientRect().right.toFixed(2) === R[t].getBoundingClientRect().left.toFixed(2) ? initSliderTransformCore() : setTimeout(function() {
                    stylesApplicationCheck()
                }, 16)
            }
            ) : initSliderTransformCore)()
        }
        function initSliderTransformCore() {
            I && !B || (setSlidePositions(),
            B ? (re = getRightBoundary(),
            xe && (Ee = getFreeze()),
            he = de(),
            resetVariblesWhenDisable(Se || Ee)) : updateContentWrapperHeight()),
            A && doContainerTransformSilent(),
            initTools(),
            initEvents()
        }
        function initTools() {
            if (updateSlideStatus(),
            l.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + "</span>  of " + N + "</div>"),
            ut = l.querySelector(".tns-liveregion .current"),
            Be && (t = U ? "stop" : "start",
            D ? setAttrs(D, {
                "data-action": t
            }) : x.autoplayButtonOutput && (l.insertAdjacentHTML(getInsertPosition(x.autoplayPosition), '<button data-action="' + t + '">' + At[0] + t + At[1] + te[0] + "</button>"),
            D = l.querySelector("[data-action]")),
            D && addEvents(D, {
                click: toggleAutoplay
            }),
            U) && (startAutoplay(),
            ee && addEvents(_, ke),
            ne) && addEvents(_, Le),
            Re) {
                var t, e;
                if (M)
                    setAttrs(M, {
                        "aria-label": "Carousel Pagination"
                    }),
                    forEach(vt = M.children, function(t, e) {
                        setAttrs(t, {
                            "data-nav": e,
                            tabindex: "-1",
                            "aria-label": Ct + (e + 1),
                            "aria-controls": Y
                        })
                    });
                else {
                    for (var n = "", i = Ne ? "" : 'style="display:none"', o = 0; o < N; o++)
                        n += '<button data-nav="' + o + '" tabindex="-1" aria-controls="' + Y + '" ' + i + ' aria-label="' + Ct + (o + 1) + '"></button>';
                    l.insertAdjacentHTML(getInsertPosition(x.navPosition), n = '<div class="tns-nav" aria-label="Carousel Pagination">' + n + "</div>"),
                    M = l.querySelector(".tns-nav"),
                    vt = M.children
                }
                updateNavVisibility(),
                v && (t = v.substring(0, v.length - 18).toLowerCase(),
                e = "transition: all " + Jt / 1e3 + "s",
                addCSSRule(K, "[aria-controls^=" + Y + "-item]", e = t ? "-" + t + "-" + e : e, getCssRulesLength(K))),
                setAttrs(vt[s], {
                    "aria-label": Ct + (s + 1) + xt
                }),
                removeAttrs(vt[s], "tabindex"),
                $e(vt[s], St),
                addEvents(M, Oe)
            }
            _e && (O || k && L || (l.insertAdjacentHTML(getInsertPosition(x.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + Y + '">' + Xt[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + Y + '">' + Xt[1] + "</button></div>"),
            O = l.querySelector(".tns-controls")),
            k && L || (k = O.children[0],
            L = O.children[1]),
            x.controlsContainer && setAttrs(O, {
                "aria-label": "Carousel Navigation",
                tabindex: "0"
            }),
            (x.controlsContainer || x.prevButton && x.nextButton) && setAttrs([k, L], {
                "aria-controls": Y,
                tabindex: "-1"
            }),
            (x.controlsContainer || x.prevButton && x.nextButton) && (setAttrs(k, {
                "data-controls": "prev"
            }),
            setAttrs(L, {
                "data-controls": "next"
            })),
            gt = isButton(k),
            ht = isButton(L),
            updateControlsStatus(),
            O ? addEvents(O, Ae) : (addEvents(k, Ae),
            addEvents(L, Ae))),
            disableUI()
        }
        function initEvents() {
            var t;
            A && d && ((t = {})[d] = onTransitionEnd,
            addEvents(_, t)),
            Zt && addEvents(_, De, x.preventScrollOnTouch),
            Yt && addEvents(_, Pe),
            Gt && addEvents(E, Me),
            "inner" === it ? Z.on("outerResized", function() {
                resizeTasks(),
                Z.emit("innerLoaded", info())
            }) : (T || W || B || J || !I) && addEvents(m, {
                resize: onResize
            }),
            J && ("outer" === it ? Z.on("innerLoaded", doAutoHeight) : Se || doAutoHeight()),
            doLazyLoad(),
            Se ? disableSlider() : Ee && freezeSlider(),
            Z.on("indexChanged", additionalUpdates),
            "inner" === it && Z.emit("innerLoaded", info()),
            "function" == typeof we && we(info()),
            Ft = !0
        }
        function onResize(t) {
            Ke(function() {
                resizeTasks(getEvent(t))
            })
        }
        function resizeTasks(t) {
            var e, n, i, o, a, r, s, l, u, c, d, f, g, h, p, v, m, y, w, b, S, C;
            Ft && ("outer" === it && Z.emit("outerResized", info(t)),
            jt = getWindowWidth(),
            w = st,
            n = !1,
            T && (setBreakpointZone(),
            e = w !== st) && Z.emit("newBreakpointStart", info(t)),
            w = z,
            b = Se,
            S = Ee,
            o = Gt,
            C = Kt,
            a = $t,
            r = Zt,
            s = Yt,
            l = U,
            u = ee,
            c = ne,
            d = $,
            e && (f = W,
            g = J,
            h = Xt,
            p = V,
            v = te,
            Q || (m = j,
            y = H)),
            Gt = getOption("arrowKeys"),
            Kt = getOption("controls"),
            $t = getOption("nav"),
            Zt = getOption("touch"),
            V = getOption("center"),
            Yt = getOption("mouseDrag"),
            U = getOption("autoplay"),
            ee = getOption("autoplayHoverPause"),
            ne = getOption("autoplayResetOnVisibility"),
            e && (Se = getOption("disable"),
            W = getOption("fixedWidth"),
            Jt = getOption("speed"),
            J = getOption("autoHeight"),
            Xt = getOption("controlsText"),
            te = getOption("autoplayText"),
            Qt = getOption("autoplayTimeout"),
            Q || (H = getOption("edgePadding"),
            j = getOption("gutter"))),
            resetVariblesWhenDisable(Se),
            F = getViewportWidth(),
            I && !B || Se || (setSlidePositions(),
            I) || (updateContentWrapperHeight(),
            n = !0),
            (W || B) && (re = getRightBoundary(),
            he = de()),
            (e || W) && (z = getOption("items"),
            Vt = getOption("slideBy"),
            i = z !== w) && (W || B || (he = de()),
            ze()),
            e && Se !== b && (Se ? disableSlider : function enableSlider() {
                if (Ce) {
                    if (K.disabled = !1,
                    _.className += be,
                    doContainerTransformSilent(),
                    G)
                        for (var t = X; t--; )
                            A && showElement(R[t]),
                            showElement(R[q - t - 1]);
                    if (!A)
                        for (var e = $, n = $ + N; e < n; e++) {
                            var i = R[e]
                              , o = e < $ + z ? tt : nt;
                            i.style.left = 100 * (e - $) / z + "%",
                            $e(i, o)
                        }
                    enableUI(),
                    Ce = !1
                }
            }
            )(),
            xe && (e || W || B) && (Ee = getFreeze()) !== S && (Ee ? (doContainerTransform(getContainerTransformValue(getStartIndex(0))),
            freezeSlider()) : (function unfreezeSlider() {
                if (Te) {
                    if (H && Q && (Bt.style.margin = ""),
                    X)
                        for (var t = "tns-transparent", e = X; e--; )
                            A && Ze(R[e], t),
                            Ze(R[q - e - 1], t);
                    enableUI(),
                    Te = !1
                }
            }(),
            n = !0)),
            resetVariblesWhenDisable(Se || Ee),
            U || (ee = ne = !1),
            Gt !== o && (Gt ? addEvents : removeEvents)(E, Me),
            Kt !== C && (Kt ? O ? showElement(O) : (k && showElement(k),
            L && showElement(L)) : O ? hideElement(O) : (k && hideElement(k),
            L && hideElement(L))),
            $t !== a && ($t ? showElement : hideElement)(M),
            Zt !== r && (Zt ? addEvents(_, De, x.preventScrollOnTouch) : removeEvents(_, De)),
            Yt !== s && (Yt ? addEvents : removeEvents)(_, Pe),
            U !== l && (U ? (D && showElement(D),
            P || Lt || startAutoplay()) : (D && hideElement(D),
            P && stopAutoplay())),
            ee !== u && (ee ? addEvents : removeEvents)(_, ke),
            ne !== c && (ne ? addEvents : removeEvents)(E, Le),
            e ? (W === f && V === p || (n = !0),
            J === g || J || (Bt.style.height = ""),
            Kt && Xt !== h && (k.innerHTML = Xt[0],
            L.innerHTML = Xt[1]),
            D && te !== v && (w = U ? 1 : 0,
            S = (b = D.innerHTML).length - v[w].length,
            b.substring(S) === v[w]) && (D.innerHTML = b.substring(0, S) + te[w])) : V && (W || B) && (n = !0),
            (i || W && !B) && (mt = getPages(),
            updateNavVisibility()),
            (o = $ !== d) ? (Z.emit("indexChanged", info()),
            n = !0) : i ? o || additionalUpdates() : (W || B) && (doLazyLoad(),
            updateSlideStatus(),
            updateLiveRegion()),
            !i && A || function updateGallerySlidePositions() {
                for (var t = $ + Math.min(N, z), e = q; e--; ) {
                    var n = R[e];
                    $ <= e && e < t ? ($e(n, "tns-moving"),
                    n.style.left = 100 * (e - $) / z + "%",
                    $e(n, tt),
                    Ze(n, nt)) : n.style.left && (n.style.left = "",
                    $e(n, nt),
                    Ze(n, tt)),
                    Ze(n, et)
                }
                setTimeout(function() {
                    forEach(R, function(t) {
                        Ze(t, "tns-moving")
                    })
                }, 300)
            }(),
            Se || Ee || (e && !Q && (J === autoheightTem && Jt === speedTem || update_carousel_transition_duration(),
            H === y && j === m || (Bt.style.cssText = getInnerWrapperStyles(H, j, W, Jt, J)),
            I) && (A && (_.style.width = getContainerWidth(W, j, z)),
            C = getSlideWidthStyle(W, j, z) + getSlideGutterStyle(j),
            function removeCSSRule(t, e) {
                "deleteRule"in t ? t.deleteRule(e) : t.removeRule(e)
            }(K, getCssRulesLength(K) - 1),
            addCSSRule(K, "#" + Y + " > .tns-item", C, getCssRulesLength(K))),
            J && doAutoHeight(),
            n && (doContainerTransformSilent(),
            fe = $)),
            e) && Z.emit("newBreakpointEnd", info(t))
        }
        function getFreeze() {
            var t, e;
            return W || B ? (t = W ? (W + j) * N : r[N],
            e = H ? F + 2 * H : F + j,
            V && (e -= W ? (F - W) / 2 : (F - (r[$ + 1] - r[$] - j)) / 2),
            t <= e) : N <= (V ? z - (z - 1) / 2 : z)
        }
        function setBreakpointZone() {
            for (var t in st = 0,
            T)
                (t = parseInt(t)) <= jt && (st = t)
        }
        function disableUI() {
            !U && D && hideElement(D),
            !$t && M && hideElement(M),
            Kt || (O ? hideElement(O) : (k && hideElement(k),
            L && hideElement(L)))
        }
        function enableUI() {
            U && D && showElement(D),
            $t && M && showElement(M),
            Kt && (O ? showElement(O) : (k && showElement(k),
            L && showElement(L)))
        }
        function freezeSlider() {
            if (!Te) {
                if (H && (Bt.style.margin = "0px"),
                X)
                    for (var t = "tns-transparent", e = X; e--; )
                        A && $e(R[e], t),
                        $e(R[q - e - 1], t);
                disableUI(),
                Te = !0
            }
        }
        function disableSlider() {
            if (!Ce) {
                if (K.disabled = !0,
                _.className = _.className.replace(be.substring(1), ""),
                removeAttrs(_, ["style"]),
                G)
                    for (var t = X; t--; )
                        A && hideElement(R[t]),
                        hideElement(R[q - t - 1]);
                if (I && A || removeAttrs(Bt, ["style"]),
                !A)
                    for (var e = $, n = $ + N; e < n; e++) {
                        var i = R[e];
                        removeAttrs(i, ["style"]),
                        Ze(i, tt),
                        Ze(i, nt)
                    }
                disableUI(),
                Ce = !0
            }
        }
        function updateLiveRegion() {
            var t = getLiveRegionStr();
            ut.innerHTML !== t && (ut.innerHTML = t)
        }
        function getLiveRegionStr() {
            var t = getVisibleSlideRange()
              , e = t[0] + 1
              , t = t[1] + 1;
            return e === t ? e + "" : e + " to " + t
        }
        function getVisibleSlideRange(t) {
            null == t && (t = getContainerTransformValue());
            var n, i, o, a = $;
            return V || H ? (B || W) && (n = -(parseFloat(t) + H),
            i = n + F + 2 * H) : B && (n = r[$],
            i = n + F),
            B ? r.forEach(function(t, e) {
                e < q && ((V || H) && t <= n + .5 && (a = e),
                .5 <= i - t) && (o = e)
            }) : (o = W ? (t = W + j,
            V || H ? (a = Math.floor(n / t),
            Math.ceil(i / t - 1)) : a + Math.ceil(F / t) - 1) : V || H ? (t = z - 1,
            o = V ? (a -= t / 2,
            $ + t / 2) : $ + t,
            H && (a -= t = H * z / F,
            o += t),
            a = Math.floor(a),
            Math.ceil(o)) : a + z - 1,
            a = Math.max(a, 0),
            o = Math.min(o, q - 1)),
            [a, o]
        }
        function doLazyLoad() {
            ie && !Se && getImageArray.apply(null, getVisibleSlideRange()).forEach(function(t) {
                var e;
                qe(t, je) || ((e = {})[d] = function(t) {
                    t.stopPropagation()
                }
                ,
                addEvents(t, e),
                addEvents(t, Fe),
                t.src = getAttr(t, "data-src"),
                (e = getAttr(t, "data-srcset")) && (t.srcset = e),
                $e(t, "loading"))
            })
        }
        function imgLoaded(t) {
            $e(t, "loaded"),
            imgCompleted(t)
        }
        function imgCompleted(t) {
            $e(t, "tns-complete"),
            Ze(t, "loading"),
            removeEvents(t, Fe)
        }
        function getImageArray(t, e) {
            for (var n = []; t <= e; )
                forEach(R[t].querySelectorAll("img"), function(t) {
                    n.push(t)
                }),
                t++;
            return n
        }
        function doAutoHeight() {
            var t = getImageArray.apply(null, getVisibleSlideRange());
            Ke(function() {
                imgsLoadedCheck(t, updateInnerWrapperHeight)
            })
        }
        function imgsLoadedCheck(n, t) {
            return !lt && (n.forEach(function(t, e) {
                qe(t, je) && n.splice(e, 1)
            }),
            n.length) ? void Ke(function() {
                imgsLoadedCheck(n, t)
            }) : t()
        }
        function additionalUpdates() {
            doLazyLoad(),
            updateSlideStatus(),
            updateLiveRegion(),
            updateControlsStatus(),
            function updateNavStatus() {
                {
                    var t, e;
                    $t && (s = 0 <= wt ? wt : getCurrentNavIndex(),
                    wt = -1,
                    s !== bt) && (t = vt[bt],
                    e = vt[s],
                    setAttrs(t, {
                        tabindex: "-1",
                        "aria-label": Ct + (bt + 1)
                    }),
                    Ze(t, St),
                    setAttrs(e, {
                        "aria-label": Ct + (s + 1) + xt
                    }),
                    removeAttrs(e, "tabindex"),
                    $e(e, St),
                    bt = s)
                }
            }()
        }
        function update_carousel_transition_duration() {
            A && J && (rt.style[v] = Jt / 1e3 + "s")
        }
        function getMaxSlideHeight(t, e) {
            for (var n = [], i = t, o = Math.min(t + e, q); i < o; i++)
                n.push(R[i].offsetHeight);
            return Math.max.apply(null, n)
        }
        function updateInnerWrapperHeight() {
            var t = J ? getMaxSlideHeight($, z) : getMaxSlideHeight(X, N)
              , e = rt || Bt;
            e.style.height !== t && (e.style.height = t + "px")
        }
        function setSlidePositions() {
            r = [0];
            var n = I ? "left" : "top"
              , i = I ? "right" : "bottom"
              , o = R[0].getBoundingClientRect()[n];
            forEach(R, function(t, e) {
                e && r.push(t.getBoundingClientRect()[n] - o),
                e === q - 1 && r.push(t.getBoundingClientRect()[i] - o)
            })
        }
        function updateSlideStatus() {
            var t = getVisibleSlideRange()
              , n = t[0]
              , i = t[1];
            forEach(R, function(t, e) {
                n <= e && e <= i ? hasAttr(t, "aria-hidden") && (removeAttrs(t, ["aria-hidden", "tabindex"]),
                $e(t, He)) : hasAttr(t, "aria-hidden") || (setAttrs(t, {
                    "aria-hidden": "true",
                    tabindex: "-1"
                }),
                Ze(t, He))
            })
        }
        function getLowerCaseNodeName(t) {
            return t.nodeName.toLowerCase()
        }
        function isButton(t) {
            return "button" === getLowerCaseNodeName(t)
        }
        function isAriaDisabled(t) {
            return "true" === t.getAttribute("aria-disabled")
        }
        function disEnableElement(t, e, n) {
            t ? e.disabled = n : e.setAttribute("aria-disabled", n.toString())
        }
        function updateControlsStatus() {
            var t, e, n, i;
            !Kt || Ut || G || (t = gt ? k.disabled : isAriaDisabled(k),
            e = ht ? L.disabled : isAriaDisabled(L),
            i = !Ut && he <= $,
            (n = $ <= ge) && !t && disEnableElement(gt, k, !0),
            !n && t && disEnableElement(gt, k, !1),
            i && !e && disEnableElement(ht, L, !0),
            !i && e && disEnableElement(ht, L, !1))
        }
        function resetDuration(t, e) {
            v && (t.style[v] = e)
        }
        function getCenterGap(t) {
            return null == t && (t = $),
            B ? (F - (H ? j : 0) - (r[t + 1] - r[t] - j)) / 2 : W ? (F - W) / 2 : (z - 1) / 2
        }
        function getRightBoundary() {
            var t = F + (H ? j : 0) - function getSliderWidth() {
                return W ? (W + j) * q : r[q]
            }();
            return t = 0 < (t = V && !G ? W ? -(W + j) * (q - 1) - getCenterGap() : getCenterGap(q - 1) - r[q - 1] : t) ? 0 : t
        }
        function getContainerTransformValue(t) {
            var e, n;
            return null == t && (t = $),
            I && !B ? W ? (e = -(W + j) * t,
            V && (e += getCenterGap())) : (n = a ? q : z,
            V && (t -= getCenterGap()),
            e = 100 * -t / n) : (e = -r[t],
            V && B && (e += getCenterGap())),
            ae && (e = Math.max(e, re)),
            e += !I || B || W ? "px" : "%"
        }
        function doContainerTransformSilent(t) {
            resetDuration(_, "0s"),
            doContainerTransform(t)
        }
        function doContainerTransform(t) {
            null == t && (t = getContainerTransformValue()),
            "rtl" === qt && "-" === t.charAt(0) && (t = t.substr(1)),
            _.style[le] = ue + t + ce
        }
        function animateSlide(t, e, n, i) {
            var o = t + z;
            G || (o = Math.min(o, q));
            for (var a = t; a < o; a++) {
                var r = R[a];
                i || (r.style.left = 100 * (a - $) / z + "%"),
                S && u && (r.style[u] = r.style[c] = S * (a - t) / 1e3 + "s"),
                Ze(r, e),
                $e(r, n),
                i && oe.push(r)
            }
        }
        function render(t, e) {
            se && ze(),
            $ === fe && !e || (Z.emit("indexChanged", info()),
            Z.emit("transitionStart", info()),
            J && doAutoHeight(),
            P && t && 0 <= ["click", "keydown"].indexOf(t.type) && stopAutoplay(),
            ye = !0,
            Ge())
        }
        function strTrans(t) {
            return t.toLowerCase().replace(/-/g, "")
        }
        function onTransitionEnd(t) {
            if (clearTimeout(Ie),
            Ie = null,
            A || ye) {
                if (Z && Z.emit("transitionEnd", info(t)),
                !A && 0 < oe.length)
                    for (var e = 0; e < oe.length; e++) {
                        var n = oe[e];
                        n.style.left = "",
                        c && u && (n.style[c] = "",
                        n.style[u] = ""),
                        Ze(n, et),
                        $e(n, nt)
                    }
                (!t || !A && t.target.parentNode === _ || t.target === _ && strTrans(t.propertyName) === strTrans(le)) && (se || (t = $,
                ze(),
                $ !== t && Z && (Z.emit("indexChanged", info()),
                doContainerTransformSilent())),
                "inner" === it && Z.emit("innerLoaded", info()),
                fe = $),
                ye = !1
            }
        }
        function goTo(t, e) {
            if (!Ee)
                if ("prev" === t)
                    onControlsClick(e, -1);
                else if ("next" === t)
                    onControlsClick(e, 1);
                else {
                    if (ye) {
                        if (pe)
                            return;
                        onTransitionEnd()
                    }
                    var n = getAbsIndex()
                      , i = 0;
                    "first" === t ? i = -n : "last" === t ? i = A ? N - z - n : N - 1 - n : ("number" != typeof t && (t = parseInt(t)),
                    isNaN(t) || (i = (t = e ? t : Math.max(0, Math.min(N - 1, t))) - n)),
                    !A && i && Math.abs(i) < z && (t = 0 < i ? 1 : -1,
                    i += ge <= $ + i - N ? N * t : 2 * N * t * -1),
                    $ += i,
                    A && G && ($ < ge && ($ += N),
                    he < $) && ($ -= N),
                    getAbsIndex($) !== getAbsIndex(fe) && render(e)
                }
        }
        function onControlsClick(t, e) {
            if (ye) {
                if (pe)
                    return;
                onTransitionEnd()
            }
            var n;
            if (!e) {
                for (var i = getTarget(t = getEvent(t)); i !== O && [k, L].indexOf(i) < 0; )
                    i = i.parentNode;
                var o = [k, L].indexOf(i);
                0 <= o && (n = !0,
                e = 0 === o ? -1 : 1)
            }
            if (Ut) {
                if ($ === ge && -1 === e)
                    return void goTo("last", t);
                if ($ === he && 1 === e)
                    return void goTo("first", t)
            }
            e && ($ += Vt * e,
            B && ($ = Math.floor($)),
            render(n || t && "keydown" === t.type ? t : null))
        }
        function onNavClick(t) {
            if (ye) {
                if (pe)
                    return;
                onTransitionEnd()
            }
            for (var e, n, i = getTarget(t = getEvent(t)); i !== M && !hasAttr(i, "data-nav"); )
                i = i.parentNode;
            hasAttr(i, "data-nav") && (e = wt = Number(getAttr(i, "data-nav")),
            n = W || B ? e * N / mt : e * z,
            goTo(Ne ? e : Math.min(Math.ceil(n), N - 1), t),
            s === e) && (P && stopAutoplay(),
            wt = -1)
        }
        function setAutoplayTimer() {
            Ot = setInterval(function() {
                onControlsClick(null, Et)
            }, Qt),
            P = !0
        }
        function stopAutoplayTimer() {
            clearInterval(Ot),
            P = !1
        }
        function updateAutoplayButton(t, e) {
            setAttrs(D, {
                "data-action": t
            }),
            D.innerHTML = At[0] + t + At[1] + e
        }
        function startAutoplay() {
            setAutoplayTimer(),
            D && updateAutoplayButton("stop", te[1])
        }
        function stopAutoplay() {
            stopAutoplayTimer(),
            D && updateAutoplayButton("start", te[0])
        }
        function toggleAutoplay() {
            Lt = P ? (stopAutoplay(),
            !0) : (startAutoplay(),
            !1)
        }
        function setFocus(t) {
            t.focus()
        }
        function getEvent(t) {
            return isTouchEvent(t = t || m.event) ? t.changedTouches[0] : t
        }
        function getTarget(t) {
            return t.target || m.event.srcElement
        }
        function isTouchEvent(t) {
            return 0 <= t.type.indexOf("touch")
        }
        function preventDefaultBehavior(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
        function getMoveDirectionExpected() {
            return function getTouchDirection(t, e) {
                var n = !1
                  , t = Math.abs(90 - Math.abs(t));
                return 90 - e <= t ? n = "horizontal" : t <= e && (n = "vertical"),
                n
            }(function toDegree(t, e) {
                return Math.atan2(t, e) * (180 / Math.PI)
            }(Pt.y - Dt.y, Pt.x - Dt.x), ve) === x.axis
        }
        function onPanStart(t) {
            if (ye) {
                if (pe)
                    return;
                onTransitionEnd()
            }
            U && P && stopAutoplayTimer(),
            _t = !0,
            Rt && (Xe(Rt),
            Rt = null);
            var e = getEvent(t);
            Z.emit(isTouchEvent(t) ? "touchStart" : "dragStart", info(t)),
            !isTouchEvent(t) && 0 <= ["img", "a"].indexOf(getLowerCaseNodeName(getTarget(t))) && preventDefaultBehavior(t),
            Pt.x = Dt.x = e.clientX,
            Pt.y = Dt.y = e.clientY,
            A && (It = parseFloat(_.style[le].replace(ue, "")),
            resetDuration(_, "0s"))
        }
        function onPanMove(t) {
            var e;
            _t && (e = getEvent(t),
            Pt.x = e.clientX,
            Pt.y = e.clientY,
            A ? Rt = Rt || Ke(function() {
                !function panUpdate(t) {
                    if (!me)
                        return void (_t = !1);
                    Xe(Rt);
                    _t && (Rt = Ke(function() {
                        panUpdate(t)
                    }));
                    "?" === me && (me = getMoveDirectionExpected());
                    if (me) {
                        !Ve && isTouchEvent(t) && (Ve = !0);
                        try {
                            t.type && Z.emit(isTouchEvent(t) ? "touchMove" : "dragMove", info(t))
                        } catch (t) {}
                        var e = !1
                          , n = It
                          , i = Nt(Pt, Dt);
                        !I || W || B ? n = n + i + "px" : (i = a ? i * z * 100 / ((F + j) * q) : 100 * i / (F + j),
                        n = Math.max(Je, Math.min(n + i, Ue)),
                        e = n === Je || n === Ue,
                        n += "%"),
                        _.style[le] = ue + n + ce,
                        e && onPanEnd(t)
                    }
                }(t)
            }) : (me = "?" === me ? getMoveDirectionExpected() : me) && (Ve = !0),
            Ve) && t.preventDefault()
        }
        function onPanEnd(i) {
            var t, o, e;
            _t && (Rt && (Xe(Rt),
            Rt = null),
            A && resetDuration(_, ""),
            _t = !1,
            t = getEvent(i),
            Pt.x = t.clientX,
            Pt.y = t.clientY,
            o = Nt(Pt, Dt),
            Math.abs(o)) && (isTouchEvent(i) || addEvents(e = getTarget(i), {
                click: function preventClick(t) {
                    preventDefaultBehavior(t),
                    removeEvents(e, {
                        click: preventClick
                    })
                }
            }),
            A ? Rt = Ke(function() {
                if (I && !B) {
                    var t = -o * z / (F + j)
                      , t = 0 < o ? Math.floor(t) : Math.ceil(t);
                    10 <= Math.abs(o) && ("rtl" === qt ? $ -= t : $ += t)
                } else {
                    var e = -(It + o);
                    if (e <= 0)
                        $ = ge;
                    else if (e >= r[q - 1])
                        $ = he;
                    else
                        for (var n = 0; n < q && e >= r[n]; )
                            e > r[$ = n] && o < 0 && ($ += 1),
                            n++
                }
                render(i, o),
                Z.emit(isTouchEvent(i) ? "touchEnd" : "dragEnd", info(i))
            }) : me && onControlsClick(i, 0 < o ? -1 : 1)),
            "auto" === x.preventScrollOnTouch && (Ve = !1),
            ve && (me = "?"),
            U && !P && setAutoplayTimer()
        }
        function updateContentWrapperHeight() {
            (rt || Bt).style.height = r[$ + z] - r[$] + "px"
        }
        function getPages() {
            var t = W ? (W + j) * N / F : N / z;
            return Math.min(Math.ceil(t), N)
        }
        function updateNavVisibility() {
            if ($t && !Ne && mt !== yt) {
                var t = yt
                  , e = mt
                  , n = showElement;
                for (mt < yt && (t = mt,
                e = yt,
                n = hideElement); t < e; )
                    n(vt[t]),
                    t++;
                yt = mt
            }
        }
        function info(t) {
            return {
                container: _,
                slideItems: R,
                navContainer: M,
                navItems: vt,
                controlsContainer: O,
                hasControls: _e,
                prevButton: k,
                nextButton: L,
                items: z,
                slideBy: Vt,
                cloneCount: X,
                slideCount: N,
                slideCountNew: q,
                index: $,
                indexCached: fe,
                displayIndex: getCurrentSlide(),
                navCurrentIndex: s,
                navCurrentIndexCached: bt,
                pages: mt,
                pagesCached: yt,
                sheet: K,
                isOn: Ft,
                event: t || {}
            }
        }
        g && console.warn("No slides found in", x.container)
    }
    return Object.keys || (Object.keys = function(t) {
        var e, n = [];
        for (e in t)
            Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
        return n
    }
    ),
    "remove"in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    }
    ),
    wg
}
)());
window.matchMedia || (window.matchMedia = ( () => {
    var e, t, n, i = window.styleMedia || window.media;
    return i || (e = document.createElement("style"),
    t = document.getElementsByTagName("script")[0],
    n = null,
    e.type = "text/css",
    e.id = "matchmediajs-test",
    t.parentNode.insertBefore(e, t),
    n = "getComputedStyle"in window && window.getComputedStyle(e, null) || e.currentStyle,
    i = {
        matchMedium: function(t) {
            t = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
            return e.styleSheet ? e.styleSheet.cssText = t : e.textContent = t,
            "1px" === n.width
        }
    }),
    function(t) {
        return {
            matches: i.matchMedium(t || "all"),
            media: t || "all"
        }
    }
}
)()),
document.addEventListener("deviceready", function onDeviceReady() {
    window.plugins || (window.plugins = {}),
    window.plugins.gaPlugin || (window.plugins.gaPlugin = new GAPlugin)
}, !1),
document.addEventListener("deviceready", function onDeviceReady() {
    window.plugins || (window.plugins = {}),
    window.plugins.utilities = new Utilities
}, !1),
document.addEventListener("deviceready", function onDeviceReady() {
    window.plugins || (window.plugins = {}),
    window.plugins.revenueSDK = new RevenueSDK
}, !1);
