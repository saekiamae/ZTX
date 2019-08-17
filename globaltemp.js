// Open Source script
// Decoded simplified and modified by MGx, Adam, Jimboy3100, Snez, Volum, Alexander Lulko, Sonia
// This is part of the Legend mod project
// v1.1176 MEGA TEST
// Game Configurations
//team view

//window.testobjects = {};
ZTX.cl = ZTX.lang[ZTX.sett.cl];

function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

function Video(src, append) {
    var v = document.createElement("video");
    if (src != "") {
        defaultmapsettings.src = src;
    }
    if (append == true) {
        document.body.appendChild(v);
    }
    return v;
}


//bots
window.SERVER_HOST = 'localhost' // Hostname/IP of the server where the bots are running [Default = localhost (your own pc)]
window.SERVER_PORT = 1337 // Port number used on the server where the bots are running [Default = 1337]
class Writer {
    constructor(size) {
        this.dataView = new DataView(new ArrayBuffer(size))
        this.byteOffset = 0
    }

    writeUint8(value) {
        this.dataView.setUint8(this.byteOffset++, value)
    }

    writeInt32(value) {
        this.dataView.setInt32(this.byteOffset, value, true)
        this.byteOffset += 4
    }

    writeUint32(value) {
        this.dataView.setUint32(this.byteOffset, value, true)
        this.byteOffset += 4
    }

    writeString(string) {
        for (let i = 0; i < string.length; i++) this.writeUint8(string.charCodeAt(i))
        this.writeUint8(0)
    }
}

window.buffers = {
    startBots(url, protocolVersion, clientVersion, userStatus, botsName, botsAmount) {
        const writer = new Writer(13 + url.length + botsName.length)
        writer.writeUint8(0)
        writer.writeString(url)
        writer.writeUint32(protocolVersion)
        writer.writeUint32(clientVersion)
        writer.writeUint8(Number(userStatus))
        writer.writeString(botsName)
        writer.writeUint8(botsAmount)
        return writer.dataView.buffer
    },
    mousePosition(x, y) {
        const writer = new Writer(9)
        writer.writeUint8(6)
        writer.writeInt32(x)
        writer.writeInt32(y)
        return writer.dataView.buffer
    }
}
window.connectionBots = {
    ws: null,
    connect() {
        this.ws = new WebSocket(`ws://${window.SERVER_HOST}:${window.SERVER_PORT}`) //ws is needed for firefox
        this.ws.binaryType = 'arraybuffer'
        this.ws.onopen = this.onopen.bind(this)
        this.ws.onmessage = this.onmessage.bind(this)
        this.ws.onclose = this.onclose.bind(this)
    },
    send(buffer) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(buffer)
    },
    onopen() {
        document.getElementById('userStatus').style.color = '#00C02E'
        document.getElementById('userStatus').innerText = 'Connected'
        document.getElementById('connect').disabled = true
        document.getElementById('startBots').disabled = false
        document.getElementById('stopBots').disabled = false
    },
    onmessage(message) {
        const dataView = new DataView(message.data)
        switch (dataView.getUint8(0)) {
            case 0:
                document.getElementById('startBots').disabled = true
                document.getElementById('stopBots').disabled = false
                document.getElementById('startBots').style.display = 'none'
                document.getElementById('stopBots').style.display = 'inline'
                document.getElementById('stopBots').innerText = 'Stop Bots'
                window.userBots.startedBots = true
                break
            case 1:
                document.getElementById('stopBots').disabled = true
                document.getElementById('stopBots').innerText = 'Stopping Bots...'
                break
            case 2:
                document.getElementById('botsAI').style.color = '#DA0A00'
                document.getElementById('botsAI').innerText = 'Disabled'
                document.getElementById('startBots').disabled = false
                document.getElementById('stopBots').disabled = true
                document.getElementById('startBots').style.display = 'inline'
                document.getElementById('stopBots').style.display = 'none'
                document.getElementById('stopBots').innerText = 'Stop Bots'
                window.userBots.startedBots = false
                window.bots.ai = false
                break
            case 3:
                toastr["info"]('Your IP has captcha and bots are unable to spawn, change your ip with a VPN or something to one that doesn\'t has captcha in order to use the bots')
                break
        }
    },
    onclose() {
        document.getElementById('userStatus').style.color = '#DA0A00'
        document.getElementById('userStatus').innerText = 'Disconnected'
        document.getElementById('botsAI').style.color = '#DA0A00'
        document.getElementById('botsAI').innerText = 'Disabled'
        document.getElementById('connect').disabled = false
        document.getElementById('startBots').disabled = true
        document.getElementById('stopBots').disabled = true
        document.getElementById('startBots').style.display = 'inline'
        document.getElementById('stopBots').style.display = 'none'
        window.userBots.startedBots = false
        window.bots.ai = false
    }
}
window.gameBots = {
    url: '',
    protocolVersion: 0,
    clientVersion: 0
}
window.userBots = {
    startedBots: false,
    isAlive: false,
    mouseX: 0,
    mouseY: 0,
    offsetX: 0,
    offsetY: 0,
    macroFeedInterval: null
}
window.bots = {
    nameLM: 'Legendmod|ml',
    amount: 0,
    ai: false
}

var Socket3;
window.socket3Opened = false;
var customLMID = Math.floor(Math.random() * 100000);
window.playerCellsSockReceived = [];
window.cellsFake = [];
window.cellsFakeFlag = 0;

window.videoSkinPlayerflag = {};
window.videoSkinPlayerflag2 = {};
//window.videoSkinPlayerflag=true;
window.videoSkinPlayer = {};

function fakePlayers() {
    if (window.JimboyTests == true) {
        for (var y = 0; y < legendmod.cells.length; y++) {
            legendmod.cells[y].fakeOK = true;
        }
        for (var x = 0; x < window.cellsFake.length; x++) {
            var ab = false;
            for (y = 0; y < legendmod.cells.length; y++) {

                if (legendmod.cells[y].fake && legendmod.cells[y].id == window.cellsFake[x].id) {
                    //console.log(legendmod.cells[y]);
                    legendmod.cells[y].time = Date.now();
                    legendmod.cells[y].targetX = window.cellsFake[x].targetX;
                    legendmod.cells[y].targetY = window.cellsFake[x].targetY;
                    legendmod.cells[y].size = window.cellsFake[x].size;
                    //legendmod.cells[y] = window.cellsFake[x];
                    ab = true;
                    legendmod.cells[y].fakeOK = false;
                }
            }
            if (ab == false) { //true or false?
                legendmod.cells.push(window.cellsFake[x]);
                legendmod.cells[legendmod.cells.length - 1].fakeOK = false;
                legendmod.cells[legendmod.cells.length - 1].time = Date.now();
            }
        }
        //legendmod.cells.push(...cellsFake);
        for (var y = 0; y < legendmod.cells.length; y++) {
            if (legendmod.cells[y].fake && legendmod.cells[y].fakeOK == true) {
                legendmod.cells[y].removeCell();
            }
        }

        window.cellsFakeFlag++;
        if (window.cellsFakeFlag == 80) {
            console.log('removed');
            window.cellsFakeFlag = 0;
            window.cellsFake = [];
            /*
            if (typeof Socket3updateTeamPlayerCells === 'function') {
                for (var x = 0 ; x < legendmod.cells.length ; x++){
                    if (legendmod.cells[x].fake == true){
                        //window.cellsFake=[];
                        legendmod.cells[x].removeCell();
                    }
                }
            }
*/
        }
    }
}


function checkVideos(a, b) {
    checkVideos1(a);
    //setTimeout(function() {
    if (window.videoSkinPlayer[a].readyState == 4) {
        if (!window.videoSkinPlayer[a].playing) {
            window.videoSkinPlayer[a].play();
            setTimeout(function () {
                checkVideos2(a, b);
            }, 2000);
        }
        ;

    }
    //}, 2000);
    return true;
}

function checkVideos2(a, b) {
    //console.log("b is: "+ b);
    for (i = 0; i < legendmod3.top5.length - 1; i++) {

        if (i.nick == b) {
            //legendmod3.setTarget(i.id);

            if ($("#nick").val() != b) {
                if (legendmod5.videoSkinsMusic == true) {
                    window.videoSkinPlayerflag2[b] = false;
                    if (legendmod3.calculateMapSector(legendmod3.top5[i].x, legendmod3.top5[i].y) == legendmod3.currentSector && legendmod3.currentSector == "C3") {
                        //console.log("volume 0, stage 0");
                        window.videoSkinPlayer[a].volume = 1;
                        window.videoSkinPlayerflag2[b] = true;
                    } else {
                        //console.log("volume 0, stage 1");
                        window.videoSkinPlayer[a].volume = 0;
                    }
                } else {
                    //console.log("volume 0, stage 2");
                    window.videoSkinPlayer[a].volume = 0;
                }
            }
        }

    }
    if ($("#nick").val() != b) {
        checkvideoSkinPlayerflag2(a, b);
    }
}

function checkvideoSkinPlayerflag2(a, b) {

    if (!window.videoSkinPlayerflag2[b]) {
        //console.log("volume 0, stage 3");
        window.videoSkinPlayer[a].volume = 0;
    }
}

function checkVideos1(a) {

    if (!videoSkinPlayerflag[a]) {
        console.log("[Legend mod Express] Video skins activated");
        window.videoSkinPlayer[a] = document.createElement("video"); // create a video element
        window.videoSkinPlayer[a].crossOrigin = 'anonymous';
        window.videoSkinPlayer[a].src = a;
        window.videoSkinPlayerflag[a] = true;
    }
};

function checkVideos3(o) {
    if (o.readyState > 0) {
        var minutes = parseInt(o.duration / 60, 10);
        var seconds = o.duration % 60;
        if (minutes > 5) {
            //toastr.warning("<b>[SERVER]:</b> " + "Avoid using video skins bigger than 6 minutes");
            toastr.warning("<b>[" + Premadeletter123 + "]:</b> " + Premadeletter124);
        }
    }
}

window.agarversion = "v12/2168/";
//window.agarversion="v12/1922/";

//window.getLatestID = window.localStorage.getItem('getLatestID');
window.getLatestID = "2230";
window.getLatestconfigVersion = window.localStorage.getItem('EnvConfig.configVersion');
if (window.getLatestID != null && window.getLatestconfigVersion != null && window.getLatestID != undefined && window.getLatestconfigVersion != undefined) {
    window.agarversion = "v" + window.getLatestconfigVersion + "/" + window.getLatestID + "/";
}

function pauseVideos() {
    setTimeout(function () {
        Object.getOwnPropertyNames(window.videoSkinPlayer).forEach(function (element) {
            if (window.videoSkinPlayer[element] && window.videoSkinPlayer[element].playing) {
                window.videoSkinPlayer[element].pause();
            }
            //console.log(element);
        });
    }, 1000);
}

//functions for mods

function LegendModSpawn() {
};

function LegendModDeath() {
};
//window.Bufferdata;
//window.generatedClientKey;
//window.generatedProtocolKey

//window.disableIntegrity=false;
window.lastejected = false;

function calcTarget() {
};

function CellTimerTrigger() {
};

//function historystate(){};
var Lmagarversion = "";

window.LMGameConfiguration = $.ajax({
    type: "GET",
    url: "https://jimboy3100.github.io/agario/live/" + Lmagarversion + "GameConfiguration.json",
    async: false,
    datatype: "jsonp",
    success: function (info) {
        //var GameConfiguration = info;
    }
}).responseJSON;
//weird but it works....

setTimeout(function () {
    if (window.LMGameConfiguration == undefined) {
        window.LMGameConfiguration = $.ajax({
            type: "GET",
            url: "https://configs-web.agario.miniclippt.com/live/" + window.agarversion + "GameConfiguration.json",
            async: false,
            datatype: "jsonp",
            success: function (info) {
                //var GameConfiguration = info;
            }
        }).responseJSON;
    }
}, 3000);
setTimeout(function () {
    if (window.LMGameConfiguration != undefined) {
        window.LMAgarGameConfiguration = window.LMGameConfiguration;
        window.EquippableSkins = LMAgarGameConfiguration.gameConfig["Gameplay - Equippable Skins"];
    }
}, 5000);

window.predictedGhostCells = [];
//set values outside ogario
window.playerCellsId = [];
//window.counterCell=0;
window.leaderboardlimit = 20;
window.teamboardlimit = 20;
window.vanillaskins = false; //to enable vanilla skins it must be true
window.spawnspecialeffects = false;
window.top5skins = false;
//window.customskinsname;
//window.customskinsurl;

/*core.registerSkin('fly', null, 'https://i.imgur.com/poFMdZd.png', 1, null)
core.registerSkin = function(a, b, c, d, e){
	window.customskinsname=a;
	window.customskinsurl=c;
}
*/
var dyinglight1load;

function UpperCase(str) {
    return str.toUpperCase();
}

function LowerCase(str) {
    return str.toLowerCase();
}

var legendflags = ["argentina", "belarus", "cambodia", "isis", "jamaica", "mexico", "pakistan", "poland", "scotland", "somalia", "spain", "sweden", "switzerland", "thailand", "venezuela", "2ch", "4chan", "8ch", "9gag", "cameron", "irs", "receita-federal", "9gag", "agario-candle", "australia", "austria", "ayy-lmao", "bait", "bangladesh", "belgium", "berlusconi", "blatter", "boris", "bosnia", "botswana", "brazil", "bulgaria", "bush", "byzantium", "cambodia", "canada", "chavez", "chile", "china", "cia", "clinton", "confederate", "croatia", "cuba", "denmark", "dilma", "earth", "estonia", "european-union", "facebook", "facepunch", "feminism", "fidel", "finland", "france", "french-kingdom", "german-empire", "germany", "greece", "hillary", "hollande", "hungary", "imperial-japan", "india", "indiana", "iran", "iraq", "ireland", "italy", "jamaica", "japan", "kc", "kim-jong-un", "latvia", "lithuania", "luxembourg", "maldivas", "mars", "matriarchy", "merkel", "mexico", "nasa", "netherlands", "nigeria", "north-korea", "norway", "obama", "origin", "pakistan", "palin", "patriarchy", "peru", "pewdiepie", "piccolo", "pokerface", "portugal", "prodota", "prussia", "putin", "qing-dynasty", "quebec", "queen", "reddit", "romania"];

var emoticonicons = {
    ':)': 'smile.svg',
    ';)': 'wink.svg',
    '=)': 'smirk.svg',
    ':D': 'grin.svg',
    'X-D': 'xgrin.svg',
    '=D': 'joy.svg',
    ':(': 'sad.svg',
    ';(': 'cry.svg',
    ':P': 'tongue.svg',
    ';P': 'tonguew.svg',
    ':*': 'kiss.svg',
    '$)': 'smileh.svg',
    '<3': 'heart.svg',
    '8=)': 'cool.svg',
    ':o': 'astonished.svg',
    '(:|': 'sweat.svg',
    ':|': 'neutral.svg',
    ':\\': 'unamused.svg',
    ':@': 'pouting.svg',
    '|-)': 'sleep.svg',
    '^_^': 'relaxed.svg',
    '-_-': 'expressionless.svg',
    '$_$': 'money.svg',
    'O:)': 'angel.svg',
    '3:)': 'devil.svg',
    '(poop)': 'poo.svg',
    '(fuck)': 'finger.svg',
    '(clap)': 'clap.svg',
    '(ok)': 'ok.svg',
    '(victory)': 'victory.svg',
    '(y)': 'thumb.svg',
    '(n)': 'thumbd.svg',

    '(angry)': 'newangry.svg',
    '(clown)': 'newclown.svg',
    '(crazy)': 'newcrazy.svg',
    '(devil)': 'newdevil.svg',
    '(devil2)': 'newdevil2.svg',
    '(fb)': 'newfb.svg',
    '(google)': 'newgplus.svg',
    '(ghost)': 'newghost.svg',
    '(heel)': 'newheel.svg',
    '(kiss)': 'newkiss.svg',
    '(lipstick)': 'newlipstick.svg',
    //				'(rage)': 'newrage.svg',
    '(teacher)': 'newteacher.svg',
    '(together)': 'newtogether.svg',
    '(toothy)': 'newtoothy.svg',
    '(baby)': 'newbaby.svg',
    '(wow)': 'newwow.svg'
}


var themePresets = {
    'ogario-v3': {
        'name': 'OGARio v3',
        'darkTheme': true,
        'mainColor': '#01d9cc',
        'bgColor': '#000a11',
        'bordersColor': '#01d9cc',
        'gridColor': '#00243e',
        'sectorsColor': '#00243e',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#002f52',
        'virusStrokeColor': '#00b9e8',
        'virusGlowColor': '#fff',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#5000ff',
        'teammatesIndColor': '#ffffff',
        'cursorTrackingColor': '#ffffff',
        'splitRangeColor': '#ffffff',
        'enemyBSTEDColor': '#8000ff', //Sonia2
        'enemyBSTEColor': '#BE00FF', //Sonia2
        'enemyBColor': '#FF0A00', //Sonia2
        'enemySColor': '#00C8FF', //Sonia2
        'enemySSTEColor': '#048245', //Sonia2
        'enemySSTEDColor': '#64FF00', //Sonia2
        'safeAreaColor': '#ffffff',
        'dangerAreaColor': '#bf00aa',
        'namesFont': 'ubuntu-bold',
        'massFont': 'ubuntu-bold',
        'sectorsFont': 'ubuntu',
        'namesScale': 1,
        'massScale': 3,
        'foodSize': 5,
        'bordersWidth': 40,
        'sectorsWidth': 40,
        'sectorsFontSize': 1200,
        'cellsAlpha': 0.99,
        'skinsAlpha': 0.99,
        'virusAlpha': 0.25,
        'textAlpha': 1,
        'virusStrokeSize': 20,
        "virusGlowSize": "#fff",
        "virusGlowSize": 14,
        "borderGlowSize": 14,
        'menuPreset': 'ogario-v3',
        'menuMainColor': '#01d9cc',
        'menuBtnTextColor': '#ffffff',
        'menuPanelColor': '#00243e',
        'menuPanelColor2': '#002f52',
        'menuTextColor': '#ffffff',
        'menuTextColor2': '#8096a7',
        'btn1Color': '#018cf6',
        'btn1Color2': '#0176ce',
        'btn2Color': '#00b9e8',
        'btn2Color2': '#0099c0',
        'btn3Color': '#8d5fe6',
        'btn3Color2': '#814ee3',
        'btn4Color': '#bf00aa',
        'btn4Color2': '#a80096',
        'menuBg': 'https://jimboy3100.github.io/banners/static/img/pattern.png',
        'menuOpacity': 0.96,
        'hudMainColor': '#01d9cc',
        'hudColor': 'rgba(0,0,0,0.4)',
        'hudTextColor': '#ffffff',
        'statsHudColor': '#ffffff',
        'timeHudColor': '#01d9cc',
        'top5MassColor': '#bf00aa',
        'lbMeColor': '#bf00aa',
        'lbTeammateColor': '#018cf6',
        'hudFont': 'ubuntu-bold',
        'hudScale': 1,
        'messageColor': 'rgba(0,0,0,0.4)',
        'messageTextColor': '#ffffff',
        'messageTimeColor': '#018cf6',
        'messageNickColor': '#01d9cc',
        'commandsColor': 'rgba(191,0,170,0.9)',
        'commandsTextColor': '#ffffff',
        'commandsTimeColor': '#bf00aa',
        'commandsNickColor': '#ffffff',
        'chatBoxColor': 'rgba(0,0,0,0.4)',
        'chatScale': 1,
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#01d9cc',
        'miniMapGuidesColor': '#bf00aa',
        'miniMapNickColor': '#ffffff',
        'miniMapNickStrokeColor': '#000000',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#bf00aa',
        'miniMapTeammatesColor': '#01d9cc',
        'miniMapDeathLocationColor': '#bf00aa',
        'miniMapFont': 'ubuntu-bold',
        'miniMapNickFont': 'ubuntu-bold',
        'miniMapWidth': 240,
        'miniMapSectorsOpacity': 0.1,
        'miniMapNickSize': 11,
        'miniMapNickStrokeSize': 2,
        'miniMapMyCellSize': 7.5,
        'miniMapMyCellStrokeSize': 4,
        'miniMapTeammatesSize': 5.5,
        'customBackground': '',
        'customCursor': 'https://jimboy3100.github.io/cursors/cursor_02.cur'
    },
    'ogario-orange': {
        'name': 'OGARio v2',
        'darkTheme': true,
        'mainColor': '#ff7800',
        'bgColor': '#111111',
        'bordersColor': '#ff7800',
        'gridColor': '#292929',
        'sectorsColor': '#292929',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#666666',
        'virusStrokeColor': '#666666',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#e16400',
        'hudMainColor': '#ff7800',
        'statsHudColor': '#ff7800',
        'top5MassColor': '#ff7800',
        'timeHudColor': '#ff7800',
        'messageNickColor': '#ff7800',
        'commandsColor': 'rgba(255,120,0,0.9)',
        'commandsTimeColor': '#ff7800',
        'commandsTextColor': '#ffffff',
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#ff7800',
        'miniMapGuidesColor': '#ff7800',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#ff7800',
        'miniMapTeammatesColor': '#ff7800',
        'miniMapDeathLocationColor': '#ff7800',
        'miniMapSectorsOpacity': 0.1
    },
    'ogario-gold': {
        'name': 'OGARio LE',
        'darkTheme': true,
        'mainColor': '#b5a642',
        'bgColor': '#000000',
        'bordersColor': '#b5a642',
        'gridColor': '#111111',
        'sectorsColor': '#111111',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#666666',
        'virusStrokeColor': '#666666',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#998c36',
        'hudMainColor': '#b5a642',
        'statsHudColor': '#b5a642',
        'top5MassColor': '#b5a642',
        'timeHudColor': '#b5a642',
        'messageNickColor': '#b5a642',
        'commandsColor': 'rgba(181,166,66,0.9)',
        'commandsTimeColor': '#b5a642',
        'commandsTextColor': '#ffffff',
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#b5a642',
        'miniMapGuidesColor': '#b5a642',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#b5a642',
        'miniMapTeammatesColor': '#b5a642',
        'miniMapDeathLocationColor': '#b5a642',
        'miniMapSectorsOpacity': 0.1
    },
    'sniikz-style': {
        'name': 'SniiKz\'s Style',
        'darkTheme': true,
        'mainColor': '#01d9cc',
        'bgColor': '#000000',
        'bordersColor': '#ffffff',
        'gridColor': '#00243e',
        'sectorsColor': '#00243e',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#3b3b3b',
        'virusStrokeColor': '#ffffff',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#5000ff',
        'teammatesIndColor': '#ffffff',
        'cursorTrackingColor': '#ffffff',
        'splitRangeColor': '#ffffff',
        'safeAreaColor': '#ffffff',
        'dangerAreaColor': '#bf00aa',
        'massScale': 4,
        'foodSize': 1,
        'bordersWidth': 40,
        'sectorsWidth': 40,
        'sectorsFontSize': 1200,
        'cellsAlpha': 0.99,
        'skinsAlpha': 0.99,
        'virusAlpha': 0.4,
        'virusStrokeSize': 10,
        "virusStrokeSize": 20,
        "virusGlowSize": 14,
        "borderGlowSize": 14,
        'menuPreset': 'ogario-v3',
        'menuMainColor': '#fc0079',
        'menuBtnTextColor': '#ffffff',
        'menuPanelColor': '#050008',
        'menuPanelColor2': '#1d0526',
        'menuTextColor': '#ffffff',
        'menuTextColor2': '#65458f',
        'btn1Color': '#4f0242',
        'btn1Color2': '#3b0431',
        'btn2Color': '#6b0036',
        'btn2Color2': '#4d0227',
        'btn3Color': '#aa084e',
        'btn3Color2': '#80063b',
        'btn4Color': '#aa084e',
        'btn4Color2': '#8a063f',
        'menuBg': 'https://jimboy3100.github.io/banners/static/img/pattern.png',
        'menuOpacity': 1,
        'hudMainColor': '#5974ff',
        'hudColor': 'rgba(36,36,36,0.49)',
        'hudTextColor': '#ffffff',
        'statsHudColor': '#ffffff',
        'timeHudColor': '#737373',
        'top5MassColor': '#1fe000',
        'lbMeColor': '#bf00aa',
        'lbTeammateColor': '#018cf6',
        'hudScale': 1.15,
        'messageColor': 'rgba(0,0,0,0.4)',
        'messageTextColor': '#e8e8e8',
        'messageTimeColor': '#545454',
        'messageNickColor': '#05ff00',
        'commandsColor': 'rgba(36,36,36,0.9)',
        'commandsTextColor': '#ffffff',
        'commandsTimeColor': '#545454',
        'commandsNickColor': '#ffffff',
        'chatBoxColor': 'rgba(0,0,0,0.4)',
        'chatScale': 1,
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#000000',
        'miniMapGuidesColor': '#ff00a8',
        'miniMapNickColor': '#ffffff',
        'miniMapNickStrokeColor': '#4d4d4d',
        'miniMapMyCellColor': '#f0ff3d',
        'miniMapMyCellStrokeColor': '#acba07',
        'miniMapTeammatesColor': '#305eff',
        'miniMapDeathLocationColor': '#2b2b2b',
        'miniMapWidth': 250,
        'miniMapSectorsOpacity': 0.1,
        'miniMapNickSize': 9,
        'miniMapNickStrokeSize': 0,
        'miniMapMyCellSize': 5,
        'miniMapMyCellStrokeSize': 0,
        'miniMapTeammatesSize': 5,
        'customBackground': '',
        'customCursor': 'https://jimboy3100.github.io/cursors/cursor_01.cur'
    },
    'hkg-style': {
        'name': 'HKG Style',
        'darkTheme': true,
        'mainColor': '#651fff',
        'bgColor': '#000000',
        'bordersColor': '#ffffff',
        'gridColor': '#111111',
        'sectorsColor': '#111111',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#666666',
        'virusStrokeColor': '#666666',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#651fff',
        'hudMainColor': '#651fff',
        'statsHudColor': '#651fff',
        'top5MassColor': '#651fff',
        'timeHudColor': '#651fff',
        'messageNickColor': '#651fff',
        'commandsColor': 'rgba(101,31,255,0.9)',
        'commandsTimeColor': '#651fff',
        'commandsTextColor': '#ffffff',
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#651fff',
        'miniMapGuidesColor': '#651fff',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#651fff',
        'miniMapTeammatesColor': '#651fff',
        'miniMapDeathLocationColor': '#651fff',
        'miniMapSectorsOpacity': 0.1
    },
    'agario-light': {
        'name': 'Agar.io Light',
        'darkTheme': false,
        'mainColor': '#ffffff',
        'bgColor': '#f2fbff',
        'bordersColor': '#858a8c',
        'gridColor': '#ced6d9',
        'sectorsColor': '#ced6d9',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#33ff33',
        'virusStrokeColor': '#2de52d',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#2de52d',
        'hudMainColor': '#ffffff',
        'statsHudColor': '#ffffff',
        'top5MassColor': '#ffffff',
        'timeHudColor': '#ffffff',
        'messageNickColor': '#ffffff',
        'commandsColor': 'rgba(255,255,255,0.9)',
        'commandsTimeColor': '#ffffff',
        'commandsTextColor': '#000000',
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#ffffff',
        'miniMapGuidesColor': '#ffffff',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#ffffff',
        'miniMapTeammatesColor': '#ffffff',
        'miniMapDeathLocationColor': '#ffffff',
        'miniMapSectorsOpacity': 0.25
    },
    'agario-dark': {
        'name': 'Agar.io Dark',
        'darkTheme': true,
        'mainColor': '#ffffff',
        'bgColor': '#111111',
        'bordersColor': '#999999',
        'gridColor': '#333333',
        'sectorsColor': '#333333',
        'namesColor': '#ffffff',
        'namesStrokeColor': '#000000',
        'massColor': '#ffffff',
        'massStrokeColor': '#000000',
        'virusColor': '#33ff33',
        'virusStrokeColor': '#2de52d',
        'mVirusColor': '#ce6363',
        'mVirusStrokeColor': '#b95959',
        'foodColor': '#2de52d',
        'hudMainColor': '#ffffff',
        'statsHudColor': '#ffffff',
        'top5MassColor': '#ffffff',
        'timeHudColor': '#ffffff',
        'messageNickColor': '#ffffff',
        'commandsColor': 'rgba(255,255,255,0.9)',
        'commandsTimeColor': '#ffffff',
        'commandsTextColor': '#ffffff',
        'miniMapSectorsColor': '#ffffff',
        'miniMapSectorColor': '#ffffff',
        'miniMapGuidesColor': '#ffffff',
        'miniMapMyCellColor': '#ffffff',
        'miniMapMyCellStrokeColor': '#ffffff',
        'miniMapTeammatesColor': '#ffffff',
        'miniMapDeathLocationColor': '#ffffff',
        'miniMapSectorsOpacity': 0.1
    }
}
var themeMenus = {
    'ogario-v3': {
        'name': 'OGARio v3',
        'menuMainColor': '#01d9cc',
        'menuBtnTextColor': '#ffffff',
        'menuPanelColor': '#00243e',
        'menuPanelColor2': '#002f52',
        'menuTextColor': '#ffffff',
        'menuTextColor2': '#8096a7',
        'btn1Color': '#018cf6',
        'btn1Color2': '#0176ce',
        'btn2Color': '#00b9e8',
        'btn2Color2': '#0099c0',
        'btn3Color': '#8d5fe6',
        'btn3Color2': '#814ee3',
        'btn4Color': '#f300d8',
        'btn4Color2': '#df00c6',
        'menuBg': 'https://jimboy3100.github.io/banners/static/img/pattern.png'
    },
    'ogario-v2': {
        'name': 'OGARio v2',
        'menuMainColor': '#ff7800',
        'menuBtnTextColor': '#ffffff',
        'menuPanelColor': '#222222',
        'menuPanelColor2': '#333333',
        'menuTextColor': '#bbbbbb',
        'menuTextColor2': '#bbbbbb',
        'btn1Color': '#428bca',
        'btn1Color2': '#3071a9',
        'btn2Color': '#5cb85c',
        'btn2Color2': '#449d44',
        'btn3Color': '#f0ad4e',
        'btn3Color2': '#ec971f',
        'btn4Color': '#d9534f',
        'btn4Color2': '#c9302c',
        'menuBg': ''
    },
    'agario': {
        'name': 'Agar.io',
        'menuMainColor': '#5bc0de',
        'menuBtnTextColor': '#ffffff',
        'menuPanelColor': '#ffffff',
        'menuPanelColor2': '#cccccc',
        'menuTextColor': '#333333',
        'menuTextColor2': '#999999',
        'btn1Color': '#428bca',
        'btn1Color2': '#3071a9',
        'btn2Color': '#5cb85c',
        'btn2Color2': '#449d44',
        'btn3Color': '#f0ad4e',
        'btn3Color2': '#ec971f',
        'btn4Color': '#d9534f',
        'btn4Color2': '#c9302c',
        'menuBg': ''
    }
}
var escapeHTMLs = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
}
var defaultSettings = {
    'preset': 'ogario-v3',
    'darkTheme': true,
    'mainColor': '#01d9cc',
    'bgColor': '#000a11',
    'bordersColor': '#d90101',
    "borderGlowColor": "#ffffff",
    'gridColor': '#00243e',
    'sectorsColor': '#00243e',
    'namesColor': '#ffffff',
    'namesStrokeColor': '#000000',
    'massColor': '#ffffff',
    'massStrokeColor': '#000000',
    'virusColor': '#327a19',
    'virusStrokeColor': '#327a19',
    'mVirusColor': '#ce6363',
    'mVirusStrokeColor': '#b95959',
    'foodColor': '#0057ff',
    'teammatesIndColor': '#ffffff',
    'cursorTrackingColor': '#ffffff',
    'splitRangeColor': '#ffffff',
    'enemyBSTEDColor': '#8000ff', //Sonia2
    'enemyBSTEColor': '#BE00FF', //Sonia2
    'enemyBColor': '#FF0A00', //Sonia2
    'enemySColor': '#00C8FF', //Sonia2
    'enemySSTEColor': '#048245', //Sonia2
    'enemySSTEDColor': '#64FF00', //Sonia2
    'ghostCellsColor': '#ffffff',
    'safeAreaColor': '#ffffff',
    'dangerAreaColor': '#bf00aa',
    'namesFont': 'ubuntu-bold',
    'namesFontFamily': 'Ubuntu',
    'namesFontWeight': 700,
    'massFont': 'ubuntu-bold',
    'massFontFamily': 'Ubuntu',
    'massFontWeight': 700,
    'sectorsFont': 'ubuntu',
    'sectorsFontFamily': 'Ubuntu',
    'sectorsFontWeight': 400,
    'sectorsX': 5,
    'sectorsY': 5,
    'namesScale': 1,
    'massScale': 3,
    'virMassScale': 3,
    'strokeScale': 1,
    'foodSize': 5,
    'bordersWidth': 14,
    'sectorsWidth': 40,
    'sectorsFontSize': 1200,
    'cellsAlpha': 0.99,
    'skinsAlpha': 0.99,
    'virusAlpha': 0.6,
    'textAlpha': 1,
    'virusGlowColor': '#fff',
    'virusGlowSize': 14,
    'borderGlowSize': 14,
    'ghostCellsAlpha': 0.3,
    'virusStrokeSize': 14,
    'menuPreset': 'ogario-v3',
    'menuMainColor': '#01d9cc',
    'menuBtnTextColor': '#ffffff',
    'menuPanelColor': '#00243e',
    'menuPanelColor2': '#002f52',
    'menuTextColor': '#ffffff',
    'menuTextColor2': '#8096a7',
    'btn1Color': '#018cf6',
    'btn1Color2': '#0176ce',
    'btn2Color': '#00b9e8',
    'btn2Color2': '#0099c0',
    'btn3Color': '#8d5fe6',
    'btn3Color2': '#814ee3',
    'btn4Color': '#bf00aa',
    'btn4Color2': '#a80096',
    'menuBg': 'https://jimboy3100.github.io/banners/static/img/pattern.png',
    'menuOpacity': 0.96,
    'hudMainColor': '#01d9cc',
    'hudColor': 'rgba(0,0,0,0.4)',
    'hudTextColor': '#ffffff',
    'statsHudColor': '#ffffff',
    'timeHudColor': '#01d9cc',
    'top5MassColor': '#bf00aa',
    'lbMeColor': '#bf00aa',
    'lbTeammateColor': '#018cf6',
    'hudFont': 'ubuntu-bold',
    'hudFontFamily': 'Ubuntu',
    'hudFontWeight': 700,
    'hudScale': 1,
    'messageColor': 'rgba(0,0,0,0.4)',
    'messageTextColor': '#ffffff',
    'messageTimeColor': '#018cf6',
    'messageNickColor': '#01d9cc',
    'commandsColor': 'rgba(191,0,170,0.9)',
    'commandsTextColor': '#ffffff',
    'commandsTimeColor': '#bf00aa',
    'commandsNickColor': '#ffffff',
    'chatBoxColor': 'rgba(0,0,0,0.4)',
    'chatScale': 1,
    'miniMapSectorsColor': '#ffffff',
    'miniMapSectorColor': '#01d9cc',
    'miniMapGuidesColor': '#bf00aa',
    'miniMapNickColor': '#ffffff',
    'miniMapNickStrokeColor': '#000000',
    'miniMapMyCellColor': '#ffffff',
    'miniMapMyCellStrokeColor': '#bf00aa',
    'miniMapTeammatesColor': '#01d9cc',
    'miniMapDeathLocationColor': '#bf00aa',
    'miniMapGhostCellsColor': '#ffffff',
    ////
    "color": "#fff",
    //"commanderImage" : "https://i.imgur.com/wQKUDB3.png",
    "commanderImage": "https://jimboy3100.github.io/banners/drawCommander.png",
    "commanderImage1": "https://jimboy3100.github.io/banners/drawCommander1.png",
    "commanderImage2": "https://jimboy3100.github.io/banners/drawCommander2.png",
    "commanderImage3": "https://jimboy3100.github.io/banners/drawCommander3.png",
    "commanderImage4": "https://jimboy3100.github.io/banners/drawCommander4.png",
    "commanderImage5": "https://jimboy3100.github.io/banners/drawCommander5.png",
    "commanderImage6": "https://jimboy3100.github.io/banners/iconJustWatchPro.png",
    "commanderImageDyingLight": "https://jimboy3100.github.io/banners/icondyinglightzombie.png",
    "commanderImageDyingLightvirus": "https://jimboy3100.github.io/banners/icondyinglightvirus.png",

    ////
    'miniMapFont': 'ubuntu-bold',
    'miniMapFontFamily': 'Ubuntu',
    'miniMapFontWeight': 700,
    'miniMapNickFont': 'ubuntu-bold',
    'miniMapNickFontFamily': 'Ubuntu',
    'miniMapNickFontWeight': 700,
    'miniMapWidth': 240,
    'miniMapTop': 24,
    'miniMapSectorsOpacity': 0.1,
    'miniMapNickSize': 11,
    'miniMapNickStrokeSize': 2,
    'miniMapMyCellSize': 7.5,
    'miniMapMyCellStrokeSize': 4,
    'miniMapTeammatesSize': 5.5,
    'miniMapGhostCellsAlpha': 0.15,
    'customBackground': '',
    'customCursor': 'https://jimboy3100.github.io/cursors/cursor_02.cur'
}
var skinUrlPatterns = [{
    name: "imgur.com",
    url: "https://imgur.com/",
    example: "https://i.imgur.com/xdmUp5N.png",
    pattern: "https?://w+.imgur.com/w{6,}.(?:%file_ext%)??d*"
},
{
    name: "put.re",
        url: "https://put.re/",
    example: "https://s.put.re/iYHAW65g.png",
    pattern: "https?://w+.put.re/w{8,}.(?:%file_ext%)"
},
{
    name: "postimages.org",
        url: "https://postimages.org/",
    example: "https://i.postimg.cc/zzK0sRPg/xdmUp5N.png",
    pattern: "https?://w+.postimg.cc/w{8,}/w+.(?:%file_ext%)"
}
];
var defaultmapsettings = {
    'isAlphaChanged': false,
    'jellyPhisycs': false,
    'virusSound': false,
    'quickResp': true,
    'autoResp': false,
    'autoZoom': false,
    'autoHideNames': true,
    'autoHideMass': true,
    'autoHideFood': false,
    'autoHideFoodOnZoom': false,
    'noNames': false,
    'optimizedNames': true,
    'hideMyName': false,
    'hideTeammatesNames': false,
    'showMass': true,
    'optimizedMass': true,
    'shortMass': true,
    'virMassShots': true,
    'hideMyMass': false,
    'hideEnemiesMass': false,
    'vanillaSkins': false,
    'customSkins': true,
    'videoSkins': true,
    'videoSkinsMusic': false,
    'myTransparentSkin': false,
    'myCustomColor': false,
    'transparentCells': false,
    'transparentViruses': true,
    'transparentSkins': false,
    'showGrid': true,
    'showBgSectors': false,
    'showMapBorders': true,
    'showGhostCells': false,
    'showGhostCellsInfo': false,
    'showMiniMap': true,
    'showMiniMapGrid': false,
    'showMiniMapGuides': true,
    'showExtraMiniMapGuides': true,
    'showMiniMapGhostCells': true,
    'oneColoredTeammates': false,
    'optimizedFood': true,
    'rainbowFood': true,
    'oppColors': true,
    'oppRings': true,
    'virColors': false,
    'splitRange': false,
    'qdsplitRange': true, //Sonia2
    'sdsplitRange': true, //Sonia2
    'virusesRange': false,
    'textStroke': false,
    'namesStroke': true,
    'massStroke': true,
    'cursorTracking': false,
    'teammatesInd': true,
    'mouseSplit': false,
    'mouseFeed': false,
    'mouseInvert': false,
    'disableChat': false,
    'hideChat': false,
    'chatSounds': true,
    'chatEmoticons': true,
    'showChatBox': false,
    'showChatImages': true,
    'showChatVideos': true,
    'showTop5': true,
    'showTargeting': true,
    'showLbData': true,
    'showTime': false,
    'normalLb': true,
    'centeredLb': true,
    'fpsAtTop': true,
    'showStats': true,
    'showStatsMass': true,
    'showStatsESTE': false,
    'showStatsEMTE': false,
    'showStatsMTE': false,
    'showStatsSTE': false,
    'showStatsTTE': false,
    'showStatsPTE': false,
    'showStatsSTE': false,
    'showStatsN16': true,
    'showStatsFPS': true,
    'blockPopups': false,
    'streamMode': false,
    'hideSkinUrl': false,
    'showQuickMenu': true,
    'showQuickBots': false,
    'showSkinsPanel': true,
    'animation': 140,
    ////
    "cameraSpeed": 7,
    "commanderDelay": 1E3,
    "suckAnimation": false,
    "virusGlow": false,
    "borderGlow": false,
    "limLB": 10,
    "limTP": 5,
    ////
    //'zoomSpeedValue': .87,
    'zoomSpeedValue2': -0.13,
    'messageSound': 'https://jimboy3100.github.io/sounds/notification_01.mp3',
    //                'commandSound': 'https://jimboy3100.github.io/sounds/notification_02.mp3'
    'commandSound': 'https://jimboy3100.github.io/sounds/chat-message.mp3',
    'virusSoundurl': 'https://jimboy3100.github.io/sounds/sound-gunshot.mp3',
    'soundSplit': 'https://www.myinstants.com/media/sounds/quack_5.mp3'

};
var ogario1PlayerProfiles = [];
var ogarcopythelb = {
    'nick': 'I<3Legendmod',
    'clanTag': 'Ⓜ',
    'skinURL': '',
    'color': defaultSettings.mainColor
};

function setGUIEvents() {
    document.getElementById('botsAmount').addEventListener('keypress', e => {
        e.preventDefault()
    })
    var storedbotsname = localStorage.getItem("localStoredBotsName");
    if (storedbotsname == null || storedbotsname == "") {
        storedbotsname = "Legend mod";
        window.bots.nameLM = storedbotsname;
    }
    $('#botsNameLM').val(storedbotsname)
    document.getElementById('botsNameLM').addEventListener('change', function () {
        window.bots.nameLM = this.value
        localStorage.setItem('localStoredBotsName', window.bots.nameLM)
    })
    document.getElementById('botsAmount').addEventListener('change', function () {
        window.bots.amount = Number(this.value)
        localStorage.setItem('localStoredBotsAmount', window.bots.amount)
    })
    document.getElementById('connectBots').addEventListener('click', () => {

        if (!window.connectionBots.ws || window.connectionBots.ws.readyState !== WebSocket.OPEN) window.connectionBots.connect()

    })
    document.getElementById('startBots').addEventListener('click', () => {
        //if(window.gameBots.url && window.gameBots.protocolVersion && window.gameBots.clientVersion && !window.userBots.startedBots){
        if (legendmod.ws && window.EnvConfig.configVersion && window.master.clientVersion && !window.userBots.startedBots) {
            if (window.bots.nameLM && window.bots.amount && window.getComputedStyle(document.getElementsByClassName('btn-login-play')[0]).getPropertyValue('display') === 'none') window.connectionBots.send(window.buffers.startBots(legendmod.ws, window.gameBots.protocolVersion, window.gameBots.clientVersion, window.userBots.isAlive, window.bots.nameLM, window.bots.amount))
            else toastr["info"]('Bots name and amount are required before starting the bots')
        }
    })
    document.getElementById('stopBots').addEventListener('click', () => {
        if (window.userBots.startedBots) window.connectionBots.send(new Uint8Array([1]).buffer)
    })
}

ZTX.render=function() {
    this.txt = '',
        this.txtCanvas = null,
        this.txtCtx = null,
        this.color = '#FFFFFF',
        this.stroke = false,
        this.strokeWidth = 2,
        this.strokeColor = '#000000',
        this.font = '700 16px Ubuntu',
        this.fontFamily = 'Ubuntu',
        this.fontWeight = 700,
        this.fontSize = 16,
        this.margin = 3,
        this.scale = 1,
        this.quality = 1,
        this.measuredWidth = 0,
        this.redraw = false,
        this.remeasure = false,
        this.setTxt = function (ogariosettxtsetter) {
            this.txt !== ogariosettxtsetter && (this.txt = ogariosettxtsetter,
                this.redraw = true,
                this.remeasure = true);
        },
        this.setColor = function (ogariocolorsetter) {
            this.color !== ogariocolorsetter && (this.color = ogariocolorsetter,
                this.redraw = true);
        },
        this.setStroke = function (ogariostrokesetter) {
            this.stroke !== ogariostrokesetter && (this.stroke = ogariostrokesetter,
                this.redraw = true);
        },
        this.setStrokeWidth = function (ogariostrokewidthsetter) {
            this.stroke && this.strokeWidth != ogariostrokewidthsetter && (this.strokeWidth = ogariostrokewidthsetter,
                this.redraw = true,
                this.remeasure = true);
        },
        this.setStrokeColor = function (ogariostrokecolorsetter) {
            this.stroke && this.strokeColor !== ogariostrokecolorsetter && (this.strokeColor = ogariostrokecolorsetter,
                this.redraw = true);
        },
        this.setFont = function () {
            this.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
        },
        this.setFontFamily = function (ogariofontfamilysetter) {
            this.fontFamily !== ogariofontfamilysetter && (this.fontFamily = ogariofontfamilysetter,
                this.setFont(),
                this.redraw = true,
                this.remeasure = true);
        },
        this.setFontWeight = function (ogariofontweightsetter) {
            this.fontWeight != ogariofontweightsetter && (this.fontWeight = ogariofontweightsetter,
                this.setFont(),
                this.redraw = true,
                this.remeasure = true);
        },
        this.setFontSize = function (ogariofontsizesetter) {
            this.fontSize != ogariofontsizesetter && (this.fontSize = ogariofontsizesetter,
                this.margin = ~~(0.2 * ogariofontsizesetter),
                this.setFont(),
                this.redraw = true);
        },
        this.setScale = function (ogarioscalesetter) {
            this.scale != ogarioscalesetter && (this.scale = ogarioscalesetter,
                this.redraw = true);
        },
        this.createCanvas = function () {
            this.txtCanvas || (this.txtCanvas = document.createElement('canvas'),
                this.txtCtx = this.txtCanvas.getContext('2d'),
                this.txtCtx.ogarioCtx = true);
        },
        this.setDrawing = function (ogarsetDrawinglabel1, ogarsetDrawinglabel2, ogarsetDrawinglabel3, ogarsetDrawinglabel4, ogarsetDrawinglabel5, ogarsetDrawinglabel6) {
            this.setColor(ogarsetDrawinglabel1);
            this.setFontFamily(ogarsetDrawinglabel2);
            this.setFontWeight(ogarsetDrawinglabel3);
            this.setStroke(ogarsetDrawinglabel4);
            this.setStrokeWidth(ogarsetDrawinglabel5);
            this.setStrokeColor(ogarsetDrawinglabel6);
        },
        this.measureWidth = function () {
            return this.remeasure && (this.txtCtx.font = this.fontWeight + ' 10px ' + this.fontFamily,
                this.measuredWidth = this.txtCtx.measureText(this.txt).width,
                this.remeasure = false),
            ~~(this.fontSize / 10 * this.measuredWidth) + 2 * this.strokeWidth;
        },
        //
        this.measureWidthCustom = function (customTxt) {
            return customTxt && this.remeasure && (this.txtCtx.font = this.fontWeight + ' 10px ' + this.fontFamily,
                this.measuredWidth = this.txtCtx.measureText(customTxt).width,
                this.remeasure = false),
            ~~(this.fontSize / 10 * this.measuredWidth) + 2 * this.strokeWidth;
        },
        //
        this.drawTxt = function (customTxt) {
            return this.createCanvas(),
            this.redraw && (this.redraw = false,


                this.txtCanvas.width = this.measureWidthCustom(customTxt),
                this.txtCanvas.width = this.measureWidth(),
                this.txtCanvas.height = this.fontSize + this.margin * 2,
                this.txtCtx.font = this.font,
                this.txtCtx.globalAlpha = 1,
                this.txtCtx.lineWidth = this.strokeWidth,
                this.txtCtx.strokeStyle = this.strokeColor,
                this.txtCtx.fillStyle = this.color,
            customTxt && this.stroke && this.txtCtx.strokeText(customTxt, this.strokeWidth, ~~(this.fontSize - this.margin * 0.5)),
            !customTxt && this.stroke && this.txtCtx.strokeText(this.txt, this.strokeWidth, ~~(this.fontSize + this.margin * 0.5)),
            customTxt && this.txtCtx.fillText(customTxt, this.strokeWidth, ~~(this.fontSize - this.margin * 0.5)),
            !customTxt && this.txtCtx.fillText(this.txt, this.strokeWidth, ~~(this.fontSize + this.margin * 0.5))),
                this.txtCanvas;
        };

}

c = {
    'comm0': ZTX.cl.comm0,
    'comm1': ZTX.cl.comm1,
    'comm2': ZTX.cl.comm2,
    'comm3': ZTX.cl.comm3,
    'comm4': ZTX.cl.comm4,
    'comm5': ZTX.cl.comm5,
    'comm6': ZTX.cl.comm6,
    'comm7': ZTX.cl.comm7,
    'comm8': ZTX.cl.comm8,
    'comm9': ZTX.cl.comm9,
    'comm10': ZTX.cl.comm10,
    'comm11': ZTX.cl.comm11,
    'comm12': ZTX.cl.comm12,
    'comm13': ZTX.cl.comm13,
    'comm14': ZTX.cl.comm14,
    'comm15': ZTX.cl.comm15,
    'comm16': ZTX.cl.comm16,
    'comm17': ZTX.cl.comm17,
    'comm18': ZTX.cl.comm18,
    'comm19': ZTX.cl.comm19,
    'comm20': ZTX.cl.comm20,
    'comm21': ZTX.cl.comm21,
    'comm22': ZTX.cl.comm22,
    'comm23': ZTX.cl.comm23,
    'comm24': ZTX.cl.comm24,
    'comm25': ZTX.cl.comm25,
    'comm26': ZTX.cl.comm26,
    'comm27': ZTX.cl.comm27,
    'comm28': ZTX.cl.comm28,
    'comm29': ZTX.cl.comm29,
    'comm30': ZTX.cl.comm30
}

var
    ogarioefaultHotkeys = {},
    ogario1Hotkeys = {},
    ogario11Hotkeys = {
        'hk-feed': {
            'label': ZTX.cl['hk-feed'],
            'defaultKey': 'W',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.feed();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-macroFeed': {
            'label': ZTX.cl['hk-macroFeed'],
            'defaultKey': 'E',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.macroFeed(!0);
            },
            'keyUp': function () {
                ZTX.ogario && ZTX.ogario.macroFeed(!1);
            },
            'type': 'normal'
        },
        'hk-split': {
            'label': ZTX.cl['hk-split'],
            'defaultKey': 'SPACE',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.split();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-doubleSplit': {
            'label': ZTX.cl['hk-doubleSplit'],
            'defaultKey': 'Q',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.doubleSplit();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-popSplit': {
            'label': 'Popsplit',
            'defaultKey': 'ALT+Q',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.popSplit();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-split16': {
            'label': ZTX.cl['hk-split16'],
            'defaultKey': 'SHIFT',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.split16();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-pause': {
            'label': ZTX.cl['hk-pause'],
            'defaultKey': 'R',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setPause();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showTop5': {
            'label': ZTX.cl['hk-showTop5'],
            'defaultKey': 'T',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowTop5();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showTime': {
            'label': ZTX.cl['hk-showTime'],
            'defaultKey': 'ALT+T',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowTime();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showSplitRange': {
            'label': ZTX.cl['hk-showSplitRange'],
            'defaultKey': 'U',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowSplitRange();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showSplitInd': {
            'label': ZTX.cl['hk-showSplitInd'],
            'defaultKey': 'I',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowSplitInd();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showTeammatesInd': {
            'label': ZTX.cl['hk-showTeammatesInd'],
            'defaultKey': 'ALT+I',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowTeammatesInd();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showOppColors': {
            'label': ZTX.cl['hk-showOppColors'],
            'defaultKey': 'O',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowOppColors();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-toggleSkins': {
            'label': ZTX.cl['hk-toggleSkins'],
            'defaultKey': 'A',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.toggleSkins();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-transparentSkins': {
            'label': ZTX.cl['hk-transparentSkins'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setTransparentSkins();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showSkins': {
            'label': ZTX.cl['hk-showSkins'],
            'defaultKey': 'S',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowSkins();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showStats': {
            'label': ZTX.cl['hk-showStats'],
            'defaultKey': 'ALT+S',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowStats();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-toggleCells': {
            'label': ZTX.cl['hk-toggleCells'],
            'defaultKey': 'D',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.toggleCells();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showFood': {
            'label': ZTX.cl['hk-showFood'],
            'defaultKey': 'F',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowFood();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showGrid': {
            'label': ZTX.cl['hk-showGrid'],
            'defaultKey': 'G',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowGrid();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showMiniMapGuides': {
            'label': ZTX.cl['hk-showMiniMapGuides'],
            'defaultKey': 'ALT+G',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowMiniMapGuides();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-hideChat': {
            'label': ZTX.cl['hk-hideChat'],
            'defaultKey': 'H',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.hideChat();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showHUD': {
            'label': ZTX.cl['hk-showHUD'],
            'defaultKey': 'ALT+H',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowHUD();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-copyLb': {
            'label': ZTX.cl['hk-copyLb'],
            'defaultKey': 'L',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.copyLb();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showLb': {
            'label': ZTX.cl['hk-showLb'],
            'defaultKey': 'ALT+L',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowLb();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-toggleAutoZoom': {
            'label': ZTX.cl['hk-toggleAutoZoom'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.toggleAutoZoom();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-resetZoom': {
            'label': ZTX.cl['hk-resetZoom'],
            'defaultKey': 'Z',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.resetZoom(!0);
            },
            'keyUp': function () {
                ZTX.ogario && ZTX.ogario.resetZoom(!1);
            },
            'type': 'normal'
        },
        'hk-toggleDeath': {
            'label': ZTX.cl['hk-toggleDeath'],
            'defaultKey': 'X',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.toggleDeath();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-clearChat': {
            'label': ZTX.cl['hk-clearChat'],
            'defaultKey': 'C',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.displayChatHistory(!0);
            },
            'keyUp': function () {
                ZTX.ogario && ZTX.ogario.displayChatHistory(!1);
            },
            'type': 'normal'
        },
        'hk-showBgSectors': {
            'label': ZTX.cl['hk-showBgSectors'],
            'defaultKey': 'B',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowBgSectors();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-hideBots': {
            'label': ZTX.cl['hk-hideBots'],
            'defaultKey': 'ALT+B',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setHideSmallBots();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showNames': {
            'label': ZTX.cl['hk-showNames'],
            'defaultKey': 'N',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowNames();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-hideTeammatesNames': {
            'label': ZTX.cl['hk-hideTeammatesNames'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setHideTeammatesNames();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showMass': {
            'label': ZTX.cl['hk-showMass'],
            'defaultKey': 'LM',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowMass();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showMiniMap': {
            'label': ZTX.cl['hk-showMiniMap'],
            'defaultKey': 'ALT+LM',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowMiniMap();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-chatMessage': {
            'label': ZTX.cl['hk-chatMessage'],
            'defaultKey': 'ENTER',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.enterChatMessage();
            },
            'keyUp': null,
            'type': 'special'
        },
        'hk-quickResp': {
            'label': ZTX.cl['hk-quickResp'],
            'defaultKey': 'TILDE',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.quickResp();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-autoResp': {
            'label': ZTX.cl['hk-autoResp'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.toggleAutoResp();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-zoom1': {
            'label': ZTX.cl['hk-zoomLevel'] + ' 1',
            'defaultKey': 'ALT+1',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setZoom(0.5);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-zoom2': {
            'label': ZTX.cl['hk-zoomLevel'] + ' 2',
            'defaultKey': 'ALT+2',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setZoom(0.25);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-zoom3': {
            'label': ZTX.cl['hk-zoomLevel'] + ' 3',
            'defaultKey': 'ALT+3',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setZoom(0.125);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-zoom4': {
            'label': ZTX.cl['hk-zoomLevel'] + ' 4',
            'defaultKey': 'ALT+4',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setZoom(0.075);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-zoom5': {
            'label': ZTX.cl['hk-zoomLevel'] + ' 5',
            'defaultKey': 'ALT+5',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setZoom(0.05);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-voiceChat': {
            'label': ZTX.cl['hk-voiceChat'],
            'defaultKey': '=',
            'keyDown': function () {
                //ZTX.ogario && ZTX.ogario.enterChatMessage();
                //if ($('#message-box').css('display') == 'block') {
                $(".voice-start.icon-mic").click();
                //}
            },
            'keyUp': null,
            'type': 'special'
        },
        'hk-GhostCellsInfo': {
            'label': ZTX.cl['hk-GhostCellsInfo'],
            'defaultKey': 'K',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowGhostCellsInfo();
            },
            'keyUp': null,
            'type': 'special'
        },
        'hk-Autoplay': {
            'label': ZTX.cl['hk-Autoplay'],
            'defaultKey': 'J',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setAutoPlay();
            },
            'keyUp': null,
            'type': 'special'
        },
        'hk-switchServerMode': {
            'label': ZTX.cl['hk-switchServerMode'],
            'defaultKey': '-',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.switchServerMode();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showTargeting': {
            'label': ZTX.cl['hk-showTargeting'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowTargeting();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-setTargeting': {
            'label': ZTX.cl['hk-setTargeting'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setTargeting();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-cancelTargeting': {
            'label': ZTX.cl['hk-cancelTargeting'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.cancelTargeting();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-changeTarget': {
            'label': ZTX.cl['hk-changeTarget'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.changeTarget();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-privateMiniMap': {
            'label': ZTX.cl['hk-privateMiniMap'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setPrivateMiniMap();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-showQuest': {
            'label': ZTX.cl['hk-showQuest'],
            'defaultKey': '',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.setShowQuest();
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-bots-split': {
            'label': ZTX.cl['hk-bots-split'],
            'defaultKey': ',',
            'keyDown': function () {
                if (window.userBots.startedBots && window.userBots.isAlive) window.connectionBots.send(new Uint8Array([2]).buffer);
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-bots-feed': {
            'label': ZTX.cl['hk-bots-feed'],
            'defaultKey': '.',
            'keyDown': function () {
                if (window.userBots.startedBots && window.userBots.isAlive) window.connectionBots.send(new Uint8Array([3]).buffer)
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-bots-ai': {
            'label': ZTX.cl['hk-bots-ai'],
            'defaultKey': '/',
            'keyDown': function () {
                if (window.userBots.startedBots && window.userBots.isAlive) {
                    if (!window.bots.ai) {
                        document.getElementById('botsAI').style.color = '#00C02E'
                        document.getElementById('botsAI').innerText = 'Enabled'
                        window.bots.ai = true
                        window.connectionBots.send(new Uint8Array([4, Number(window.bots.ai)]).buffer)
                    } else {
                        document.getElementById('botsAI').style.color = '#DA0A00'
                        document.getElementById('botsAI').innerText = 'Disabled'
                        window.bots.ai = false
                        window.connectionBots.send(new Uint8Array([4, Number(window.bots.ai)]).buffer)
                    }
                }
            },
            'keyUp': null,
            'type': 'normal'
        },
        'hk-comm1': {
            'label': c['comm1'],
            'defaultKey': '1',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(1);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm2': {
            'label': c['comm2'],
            'defaultKey': '2',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(2);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm3': {
            'label': c['comm3'],
            'defaultKey': '3',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(3);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm4': {
            'label': c['comm4'],
            'defaultKey': '4',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(4);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm5': {
            'label': c['comm5'],
            'defaultKey': '5',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(5);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm6': {
            'label': c['comm6'],
            'defaultKey': '6',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(6);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm7': {
            'label': c['comm7'],
            'defaultKey': '7',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(7);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm8': {
            'label': c['comm8'],
            'defaultKey': '8',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(8);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm9': {
            'label': c['comm9'],
            'defaultKey': '9',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(9);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm0': {
            'label': c['comm0'],
            'defaultKey': '0',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(0);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm10': {
            'label': c['comm10'],
            'defaultKey': 'MOUSE WHEEL',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(10);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm11': {
            'label': c['comm11'],
            'defaultKey': 'LEFT',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(11);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm12': {
            'label': c['comm12'],
            'defaultKey': 'UP',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(12);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm13': {
            'label': c['comm13'],
            'defaultKey': 'RIGHT',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(13);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm14': {
            'label': c['comm14'],
            'defaultKey': 'DOWN',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(14);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm15': {
            'label': c['comm15'],
            'defaultKey': 'CTRL+1',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(15);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm16': {
            'label': c['comm16'],
            'defaultKey': 'CTRL+2',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(16);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm17': {
            'label': c['comm17'],
            'defaultKey': 'CTRL+3',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(17);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm18': {
            'label': c['comm18'],
            'defaultKey': 'CTRL+4',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(18);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm19': {
            'label': c['comm19'],
            'defaultKey': 'CTRL+5',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(19);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm20': {
            'label': c['comm20'],
            'defaultKey': 'CTRL+7',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(20);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm21': {
            'label': c['comm21'],
            'defaultKey': 'CTRL+8',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(21);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm22': {
            'label': c['comm22'],
            'defaultKey': 'CTRL+9',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(22);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm23': {
            'label': c['comm23'],
            'defaultKey': 'CTRL+0',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(23);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm24': {
            'label': c['comm24'],
            'defaultKey': 'CTRL+Z',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(24);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm25': {
            'label': c['comm25'],
            'defaultKey': 'CTRL+X',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(25);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm26': {
            'label': c['comm26'],
            'defaultKey': 'CTRL+Q',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(26);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm27': {
            'label': c['comm27'],
            'defaultKey': 'CTRL+LM',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(27);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm28': {
            'label': c['comm28'],
            'defaultKey': 'CTRL+B',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(28);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm29': {
            'label': c['comm29'],
            'defaultKey': 'CTRL+L',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(29);
            },
            'keyUp': null,
            'type': 'command'
        },
        'hk-comm30': {
            'label': c['comm30'],
            'defaultKey': 'CTRL+D',
            'keyDown': function () {
                ZTX.ogario && ZTX.ogario.sendCommand(30);
            },
            'keyUp': null,
            'type': 'command'
        }
    },
    lastkeys = {
        'lastPressedKey': '',
        'lastKeyId': '',
        'defaultMessageKey': 'ENTER',
        'inputClassName': 'custom-key-in form-control input-sm',
        'loadDefaultHotkeys': function () {
            for (var t in ogario1Hotkeys = {}, ogario11Hotkeys) ogario11Hotkeys.hasOwnProperty(t) && (ogario1Hotkeys[ogario11Hotkeys[t].defaultKey] = t);
            ogario1Hotkeys['spec-messageKey'] = this.defaultMessageKey;
        },
        'loadHotkeys': function () {
            null !== window.localStorage.getItem('ogarioHotkeys') ? ogario1Hotkeys = JSON.parse(window.localStorage.getItem('ogarioHotkeys')) : this.loadDefaultHotkeys(), null !== window.localStorage.getItem('ogarioCommands') && (c = JSON.parse(window.localStorage.getItem('ogarioCommands')));
        },
        'saveHotkeys': function () {
            window.localStorage.setItem('ogarioHotkeys', JSON.stringify(ogario1Hotkeys)), this.saveCommands();
        },
        'saveCommands': function () {
            $('#hotkeys .command-in').each(function () {
                var t = $(this),
                    e = t.attr('id');
                c.hasOwnProperty(e) && (c[e] = t.val());
            }), window.localStorage.setItem('ogarioCommands', JSON.stringify(c));
        },
        'resetHotkeys': function () {
            this.loadDefaultHotkeys(), $('#hotkeys-cfg .custom-key-in').each(function () {
                var t = $(this).attr('id');
                ogario11Hotkeys[t] && $(this).val(ogario11Hotkeys[t].defaultKey);
            });
        },
        'setHotkeysMenu': function () {
            var t = this;
            for (var e in $('body').append('<div id=\"hotkeys\"><div id=\"hotkeys-menu\"><button id=\"reset-hotkeys\" class=\"btn btn-primary\">' + ZTX.cl.restoreSettings + '</button> <button id=\"save-hotkeys\" class=\"btn btn-success\">' + ZTX.cl.saveSett + '</button> <button id=\"close-hotkeys\" class=\"btn btn-danger\">' + ZTX.cl['close'] + '</button></div><div id=\"hotkeys-cfg\"></div><div id=\"hotkeys-inst\"><ul><li>' + ZTX.cl['hk-inst-assign'] + '</li><li>' + ZTX.cl['hk-inst-delete'] + '</li><li>' + ZTX.cl['hk-inst-keys'] + '</li></ul></div></div>'), ogario11Hotkeys)
                if (ogario11Hotkeys.hasOwnProperty(e)) {
                    var i = ogario11Hotkeys[e],
                        o = '';
                    for (var a in ogario1Hotkeys)
                        if (ogario1Hotkeys.hasOwnProperty(a) && ogario1Hotkeys[a] === e) {
                            o = a;
                            break;
                        }
                    if ('hk-switchServerMode' === e && ZTX.ogario && !ZTX.ogario.privateIP) continue;
                    if ('command' === i.type) {
                        var n = e.replace('hk-', '');
                        $('#hotkeys-cfg').append('<div class=\"row\"><div class=\"key-label\"><input id=\"' + n + '\" class=\"command-in form-control input-sm\" value=\"' + c[n] + '\" maxlength=\"80\" /></div><div class=\"default-key\">' + i.defaultKey + '</div><div class=\"custom-key\"><input id=\"' + e + '\" class=\"custom-key-in form-control input-sm\" value=\"' + o + '\" /></div></div>');
                    } else $('#hotkeys-cfg').append('<div class=\"row\"><div class=\"key-label\">' + i.label + '</div><div class=\"default-key\">' + i.defaultKey + '</div><div class=\"custom-key\"><input id=\"' + e + '\" class=\"custom-key-in form-control input-sm\" value=\"' + o + '\" /></div></div>');
                }
            $(document).on('click', '#reset-hotkeys', function (t) {
                t.preventDefault();
                lastkeys.resetHotkeys();
            }),
                $(document).on('click', '#save-hotkeys', function (t) {
                    t.preventDefault();
                    lastkeys.saveHotkeys();
                    $('#hotkeys').fadeOut(500);
                }),
                $(document).on('click', '#close-hotkeys', function (t) {
                    t.preventDefault();
                    $('#hotkeys').fadeOut(500);
                }),
                $(document).on('click', '.hotkeys-link', function (t) {
                    $('#hotkeys').fadeIn(500);
                    $('#hotkeys-cfg').perfectScrollbar('update');
                    ogarcommando1();
                }),
                $('#hotkeys-cfg').perfectScrollbar(),
            ZTX.menu && ZTX.menu.setMenuBg();
        },
        'getPressedKey': function (t) {
            var e = '',
                i = '';
            switch (t['ctrlKey'] || 17 == t.keyCode ? e = 'CTRL' : (t.altKey || 18 == t.keyCode) && (e = 'ALT'), t.keyCode) {
                case 9:
                    i = 'TAB';
                    break;
                case 13:
                    i = 'ENTER';
                    break;
                case 16:
                    i = 'SHIFT';
                    break;
                case 17:
                case 18:
                    break;
                case 27:
                    i = 'ESC';
                    break;
                case 32:
                    i = 'SPACE';
                    break;
                case 37:
                    i = 'LEFT';
                    break;
                case 38:
                    i = 'UP';
                    break;
                case 39:
                    i = 'RIGHT';
                    break;
                case 40:
                    i = 'DOWN';
                    break;
                case 46:
                    i = 'DEL';
                    break;
                case 61:
                case 187:
                    i = '=';
                    break;
                case 192:
                    i = 'TILDE';
                    break;
                default:
                    i = String.fromCharCode(t.keyCode);
            }
            return '' !== e ? '' !== i ? e + '+' + i : e : i;
        },
        'deleteHotkey': function (t, e) {
            delete ogario1Hotkeys[t];
            $('#' + e).val('');
        },
        'setDefaultHotkey': function (t) {
            var e = false;
            return ogario11Hotkeys[t] && !ogario1Hotkeys.hasOwnProperty(ogario11Hotkeys[t].defaultKey) ? (e = ogario11Hotkeys[t].defaultKey, ogario1Hotkeys[e] = t, e) : e;
        },
        'setHotkey': function (t, e) {
            if (e && (this.lastPressedKey !== t || this.lastKeyId !== e)) {
                var i = $('#' + e).val();
                if (this.deleteHotkey(i, e), 'DEL' !== t) {
                    if (ogario1Hotkeys[t] && ogario1Hotkeys[t] !== e) {
                        var o = ogario1Hotkeys[t],
                            a = this.setDefaultHotkey(o);
                        a ? (ogario1Hotkeys[a] = o, $('#' + o).val(a)) : this.deleteHotkey(t, o);
                    }
                    ogario1Hotkeys[t] = e,
                        $('#' + e).val(t);
                    if ('hk-chatMessage' === e) {
                        ogario1Hotkeys['spec-messageKey'] = t
                    }
                    this.lastPressedKey = t;
                    this.lastKeyId = e;
                }
            }
        },
        'init': function () {
            this.loadHotkeys();
            this.setHotkeysMenu();
        }
    };