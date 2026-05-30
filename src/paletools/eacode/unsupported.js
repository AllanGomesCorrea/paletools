var xhr, url, preloadStrings = {};
function includeHTML(e, t) {
    for (var n, r, o, d = t ? [document.getElementById(t)] : document.getElementsByTagName("*"), i = 0; i < d.length; i++)
        if (r = (n = d[i]).getAttribute("include-html"))
            return (o = createXMLHttpRequest()).onreadystatechange = function() {
                4 == this.readyState && (200 == this.status && (n.innerHTML = this.responseText),
                404 == this.status && (n.innerHTML = "Page not found."),
                n.removeAttribute("include-html"),
                includeHTML(e, t))
            }
            ,
            o.open("GET", r, !0),
            void o.send();
    e && e()
}
function isAndroidStockBrowser() {
    var e = navigator.userAgent
      , t = -1 < e.indexOf("Android") && -1 < e.indexOf("Mozilla/5.0") && -1 < e.indexOf("AppleWebKit")
      , n = new RegExp(/AppleWebKit\/([\d.]+)/)
      , n = null === n.exec(e) ? null : parseFloat(n.exec(e)[1]);
    return t && null !== n && n < 537
}
function isSupportedBrowser() {
    return !isAndroidStockBrowser() && function testWebGl() {
        var e = document.createElement("canvas");
        try {
            return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
        } catch (e) {
            return !1
        }
    }() && function supportsWasm() {
        return "object" == typeof WebAssembly
    }()
}
function initUnsupported() {
    document.getElementById("futweb-loader").style.display = "none",
    document.getElementById("unsupported-browser-shield").style.display = "block",
    preloadStrings["preload.unsupportedbrowser.title"] && (document.getElementById("unsupportedTitle").innerText = preloadStrings["preload.unsupportedbrowser.title"]),
    preloadStrings["preload.unsupportedbrowser.body"] && (document.getElementById("unsupportedBody").innerText = preloadStrings["preload.unsupportedbrowser.body"])
}
function getParameterByName(e) {
    var t = window.location.href;
    e = e.replace(/[\[\]]/g, "\\$&");
    e = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return e ? e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "" : null
}
function createXMLHttpRequest() {
    var t = null;
    if ("undefined" != typeof XMLHttpRequest)
        t = new XMLHttpRequest;
    else if (void 0 !== window.ActiveXObject)
        try {
            t = new ActiveXObject("Msxml2.XMLHTTP.4.0")
        } catch (e) {
            try {
                t = new ActiveXObject("MSXML2.XMLHTTP")
            } catch (e) {
                try {
                    t = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    t = null
                }
            }
        }
    return t
}
isSupportedBrowser() ? window.onload = function() {
    document.getElementById("futweb-loader").style.display = "none",
    onDeviceReady()
}
: window.onload = function() {
    includeHTML(initUnsupported, "unsupported-html")
}
,
JSON && (xhr = createXMLHttpRequest()) && (url = window.fut_resourceRoot + window.fut_resourceBase + window.fut_guid + "/" + window.fut_year + "/fut/loc/companion/futweb/preload/",
xhr.open("GET", url + (window.localStorage && window.localStorage.UT_LOCALE || getParameterByName("locale") || "en-US") + ".json"),
xhr.setRequestHeader("Content-Type", "application/json"),
xhr.onreadystatechange = function() {
    if (4 === xhr.readyState && 200 === xhr.status) {
        var e, t = JSON.parse(xhr.responseText);
        for (e in t)
            t.hasOwnProperty(e) && (preloadStrings[e] = t[e]);
        isSupportedBrowser() || (window.onload = function() {
            includeHTML(initUnsupported, "unsupported-html")
        }
        ),
        xhr = null
    }
}
,
xhr.send());
