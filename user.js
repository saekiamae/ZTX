
// ==UserScript==
// @name         ƵŦX Extention
// @namespace    ƵŦX Extention Agario Mod
// @version      1.6
// @description
// @homepage
// @author       ZTX Dev Team
// @license      MIT
// @icon         https://jimboy3100.github.io/banners/CropedImage128.gif
// @match        https://agar.io/*
// @match        https://play.google.com/*
// @downloadURL
// @updateURL
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      saekiamae.github.io
// ==/UserScript==

/*MIT License*/

// Check location
if (location.host === "agar.io" && location.pathname === "/") {
    var url = window.location.href;
    localStorage.setItem("url", url);
    location.href = "https://agar.io/legendmod" + location.hash;
    return;
}
var modVersion = GM_info.script.version;
// Inject Legend
function inject(page) {
    var pagex = page.replace("</body>", "<script>init('" + modVersion + "');</script>" + "</body>");
    return pagex;
}
window.stop();
document.documentElement.innerHTML = "";

GM_xmlhttpRequest({
    method: "GET",
    url: "https://saekiamae.github.io/ZTX/ZTX.html",
    onload: function(legend) {
        var doc = inject(legend.responseText);
        document.open();
        document.write(doc);
        setTimeout(function() {
            window.history.pushState(null, null, "/");
        }, 2000);

        document.close();
    }
});

if (location.host == "play.google.com") {
    window.close();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

