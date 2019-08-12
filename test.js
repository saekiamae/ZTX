!function (e) {
    var n = "13.04", t = !0, i = e;

    function c(o) {
        try {
            var t = e.document.createElement("script");
            t.type = "text/javascript", t.charset = "utf-8", t.src = o, t.onerror = function () {
                e.setTimeout(function () {
                    c(o)
                }, 2500)
            }, e.document.head.appendChild(t)
        } catch (t) {
            e.setTimeout(function () {
                c(o)
            }, 2500)
        }
    }

    function s() {
        try {
            e.document.documentElement.innerHTML = '<html><head></head><body style="display:none;"><div id="agarToolLoaded" style="display: none;">' + e.Date.now() + "</div></body></html>"
        } catch (t) {
        }
    }

    function o() {
        s(), e.location = "https://agar.io/agartool/" + e.location.search + e.location.hash
    }

    "undefined" != typeof unsafeWindow && (i = unsafeWindow);
    var a = e.location.pathname.includes(".htm") || e.location.pathname.includes(".php") || e.location.pathname.includes(".asp") || e.location.pathname.includes(".jsp") || !e.location.pathname.includes(".");
    if (e.location.hostname.includes("agartool.io")) a && (i.AgarToolInstalled = n); else if (e.location.hostname.includes("agar.io")) {
        c("https://cdn.agartool.io/integrity.js");
        var l = !1, r = e.document.getElementById("agarToolLoaded");
        if (r) {
            var d = r.innerHTML;
            !e.isNaN(d) && e.Date.now() - d < 500 && (l = !0)
        }
        l || (e.location.pathname.startsWith("/agartool") ? function o() {
            try {
                s(), "/" != e.location.pathname && e.history.replaceState({}, "", "/" + e.location.search + e.location.hash);
                var a = new e.XMLHttpRequest;
                a.overrideMimeType("application/json"), a.open("GET", "https://cdn.agartool.io/extension_" + n + ".js" + (t ? "" : "?v=" + e.Date.now()), !0), a.onreadystatechange = function () {
                    if (4 === a.readyState && "200" == a.status) {
                        var t = a.responseText;
                        t = t.replace("{%%283269335152219%%}", e.Date.now());
                        var o = e.JSON.parse(t);
                        i.document.open(), i.document.write(o.html), i.document.close(), c("https://cdn.agartool.io/" + n + "/" + o.js + ".js")
                    }
                }, a.onerror = function () {
                    e.setTimeout(o, 2500)
                }, a.send()
            } catch (t) {
                e.setTimeout(o, 2500)
            }
        }() : "/" == e.location.pathname || e.location.pathname.startsWith("/index.") && a ? o() : a && e.setTimeout(o, 1e3))
    }
}(window);