// Open Source script
// Decoded simplified and modified by MGx, Adam, Jimboy3100, Snez, Volum, Alexander Lulko, Sonia
// This is part of the Legend mod project
// v1.1176 MEGA TEST
// Game Configurations
//team view

//window.testobjects = {};

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

var languagetexts = {
    'pl': {
        'start': 'Start',
        'settings': 'Ustawienia',
        'restoreSettings': 'Przywróc ustawienia domyślne',
        'animationGroup': 'Animacja',
        'zoomGroup': 'Zoom',
        'respGroup': 'Odrodzenie',
        'namesGroup': 'Nazwy',
        'massGroup': 'Masa',
        'skinsGroup': 'Skiny',
        'foodGroup': 'Pokarm',
        'transparencyGroup': 'Przezroczystość / kolory',
        'gridGroup': 'Siatka / sektory',
        'miniMapGroup': 'Minimapa',
        'helpersGroup': 'Wspomagacze',
        'mouseGroup': 'Sterowanie myszką',
        'hudGroup': 'HUD',
        'chatGroup': 'Czat',
        'statsGroup': 'Statystyki',
        'extrasGroup': 'Dodatkowe',
        'noSkins': 'Wyłącz skiny',
        'noNames': 'Wyłącz nazwy',
        'noColors': 'Wyłącz kolory',
        'showMass': 'Pokaż masę',
        'skipStats': 'Pomiń statystyki po śmierci',
        'showQuest': 'Pokaż zadanie (quest)',
        'autoZoom': 'Auto zoom',
        'animation': 'Opóźnienie animacji',
        'suckAnimation': 'Cell Eat [Sucking] Animation',
        'virusGlow': 'Virus Glow',
        'borderGlow': 'Border Glow',
        'zoomSpeedValue2': 'Szybkość zoomu',
        'quickResp': 'Szybkie odrodzenie (klawisz)',
        'autoResp': 'Auto odrodzenie',
        'autoHideCellsInfo': 'Autoukrywanie nazw i masy',
        'autoHideNames': 'Autoukrywanie nazw',
        'autoHideMass': 'Autoukrywanie masy',
        'autoHideFood': 'Autoukrywanie pokarmu - masa',
        'autoHideFoodOnZoom': 'Autoukrywanie pokarmu - zoom',
        'optimizedNames': 'Zoptymalizowane nazwy',
        'hideMyName': 'Ukryj własną nazwę',
        'hideTeammatesNames': 'Ukryj nazwy graczy teamu',
        'optimizedMass': 'Optimized mass (+/-2%) & Merge timer BETA off\n Suggested to be enabled for Lag reduce',
        'shortMass': 'Skrócona masa (k)',
        'virMassShots': 'Licznik strzałów (wirusy)',
        'hideMyMass': 'Ukryj własną masę',
        'hideEnemiesMass': 'Ukryj masę przeciwników',
        'vanillaSkins': 'Podstawowe skiny',
        'customSkins': 'Własne skiny',
        'videoSkins': 'Video skins (.mp4 .webm .ogv)',
        'videoSkinsMusic': 'Sound from other\'s Video skins when both C3',
        'myTransparentSkin': 'Mój przezroczysty skin',
        'myCustomColor': 'Mój własny kolor',
        'transparentCells': 'Przezroczyste kulki',
        'transparentViruses': 'Przezroczyste wirusy',
        'transparentSkins': 'Przezroczyste skiny',
        'showGrid': 'Siatka',
        'showBgSectors': 'Sektory w tle',
        'showMapBorders': 'Granice mapy',
        'showGhostCells': 'Duchy kulek (fps drop)',
        'showGhostCellsInfo': 'Ghost cells info (confusing)',
        'showMiniMap': 'Pokaż minimapę',
        'showMiniMapGrid': 'Pokaż siatkę minimapy',
        'showMiniMapGuides': 'Pokaż prowadnice na minimapie',
        'showExtraMiniMapGuides': 'Show extra minimap guides',
        'showMiniMapGhostCells': 'Pokaż duchy kulek na minimapie',
        'oneColoredTeammates': 'Jednokolorowi gracze',
        'optimizedFood': 'Zoptymalizowany pokarm',
        'rainbowFood': 'Kolorowy pokarm',
        'oppColors': 'Kolory przeciwników',
        'oppRings': 'Ringi przeciwników',
        'virColors': 'Kolory wirusów',
        'splitRange': 'Zasięg podziału',
        'virusesRange': 'Zasięg wirusów',
        'textStroke': 'Obwódki nazw i masy',
        'namesStroke': 'Obwódki nazw',
        'massStroke': 'Obwódki masy',
        'cursorTracking': 'Śledzenie kursora',
        'teammatesInd': 'Wskaźniki graczy teamu',
        'mouseSplit': 'LPM - Split myszką',
        'mouseFeed': 'PPM - Feed myszką',
        'mouseInvert': 'Odwróć klawisze myszki',
        'disableChat': 'Wyłącz czat',
        'hideChat': 'Ukryj czat',
        'chatSounds': 'Powiadomienia dźwiękowe',
        'chatEmoticons': 'Emotikony',
        'showChatImages': 'Pokaż obrazki na czacie',
        'showChatVideos': 'Pokaż filmiki na czacie',
        'showChatBox': 'Czatbox zamiast wyskakujących wiadomości',
        'messageSound': 'Dźwięk powiadomienia o wiadomości',
        'commandSound': 'Dźwięk powiadomienia o komendzie',
        'virusSoundurl': 'Virus shot sound',
        'virusSound': 'Virus shot sound',
        'jellyPhisycs': 'Jelly physics',
        'showTop5': 'Pokaż top 5 teamu',
        'showTargeting': 'Pokaż namierzanie',
        'showTime': 'Pokaż aktualny czas',
        'showLbData': 'Pokaż masę w topce',
        'normalLb': 'Nagłówek \"Topka\"',
        'centeredLb': 'Wyśrodkowana topka',
        'fpsAtTop': 'Statystyki na górze',
        'showStats': 'Pokaż statystyki',
        'showStatsMass': 'Statystyki: Masa',
        'showStatsSTE': 'Statystyki: Przedziały Masy',
        'showStatsESTE': 'Statystyki: STE wroga',
        'showStatsEMTE': 'Statystyki: MTE wroga',
        'showStatsMTE': 'Statystyki: Nasze MTE',
        'showStatsSTE': 'Statystyki: Nasze STE',
        'showStatsTTE': 'Statystyki: Minimalna masa mate\'a do tricksplitu',
        'showStatsPTE': 'Statystyki: Maksymalna masa wroga do presplitu',
        'showStatsN16': 'Statystyki: n/16',
        'showStatsFPS': 'Statystyki: FPS',
        'blockPopups': 'Blokuj popupy (reklamy/sklep/zadanie)',
        'hotkeys': 'Skróty klawiszowe',
        'hk-inst-assign': 'Aby ustawić skrót klawiszowy kliknij na polu skrótu i naciśnij wybrany klawisz.',
        'hk-inst-delete': 'Aby usunąć skrót klawiszowy kliknij na polu skrótu i naciśnij klawisz DELETE.',
        'hk-inst-keys': 'Możliwe kombinacje skrótów klawiszowych z użyciem klawiszy CTRL oraz ALT.',
        'hk-bots-split': 'Bots split',
        'hk-bots-feed': 'Bots feed',
        'hk-bots-ai': 'Bots AI toggle',
        'hk-feed': 'Feed',
        'hk-macroFeed': 'Szybki feed',
        'hk-split': 'Podział',
        'hk-doubleSplit': 'Podwójny podział',
        'hk-split16': 'Podział na 16',
        'hk-pause': 'Pauza kulki',
        'hk-showTop5': 'Pokaż/ukryj top 5 teamu',
        'hk-showTime': 'Pokaż/ukryj aktualny czas',
        'hk-showSplitRange': 'Pokaż/ukryj zasięg podziału',
        'hk-showSplitInd': 'Pokaż/ukryj zasięg podziału z ringami',
        'hk-showTeammatesInd': 'Pokaż/ukryj wskaźniki graczy teamu',
        'hk-showOppColors': 'Pokaż/ukryj kolory przeciwników',
        'hk-toggleSkins': 'Przełącz skiny (własne/standardowe)',
        'hk-showSkins': 'Pokaż/ukryj skiny',
        'hk-transparentSkins': 'Włącz/wyłącz przezroczyste skiny',
        'hk-showStats': 'Pokaż/ukryj statystyki gry',
        'hk-toggleCells': 'Przełącz kulkę (najmniejsza/największa)',
        'hk-showFood': 'Pokaż/ukryj pokarm',
        'hk-showGrid': 'Pokaż/ukryj siatkę',
        'hk-showMiniMapGuides': 'Pokaż/ukryj prowadnice na minimapie',
        'hk-hideChat': 'Pokaż/ukryj czat',
        'hk-showHUD': 'Pokaż/ukryj HUD',
        'hk-copyLb': 'Kopiuj topkę',
        'hk-showLb': 'Pokaż/ukryj topkę',
        'hk-toggleAutoZoom': 'Włącz/wyłącz auto zoom',
        'hk-resetZoom': 'Reset zoomu',
        'hk-zoomLevel': 'Zoom - poziom',
        'hk-toggleDeath': 'Przełącz miejsce śmierci',
        'hk-clearChat': 'Pokaż historię czatu / Czyść czat',
        'hk-showBgSectors': 'Pokaż/ukryj sektory w tle',
        'hk-hideBots': 'Pokaż/ukryj małe boty',
        'hk-showNames': 'Pokaż/ukryj nazwy',
        'hk-hideTeammatesNames': 'Pokaż/ukryj nazwy graczy teamu',
        'hk-showMass': 'Pokaż/ukryj masę',
        'hk-showMiniMap': 'Pokaż/ukryj minimapę',
        'hk-chatMessage': 'Napisz wiadomość na czacie',
        'hk-quickResp': 'Szybkie odrodzenie (respawn)',
        'hk-autoResp': 'Włącz/wyłacz auto odrodzenie',
        'hk-switchServerMode': 'Przełącz serwer [publiczny/prywatny]',
        'hk-showTargeting': 'Pokaż/ukryj panel namierzania',
        'hk-voiceChat': 'Głos do tekstu',
        'hk-GhostCellsInfo': 'Show ghost cells information',
        'hk-Autoplay': 'Auto Play',
        'hk-setTargeting': 'Włącz/wyłącz namierzanie (śledzenie)',
        'hk-cancelTargeting': 'Zatrzymaj namierzanie',
        'hk-changeTarget': 'Zmień cel',
        'hk-privateMiniMap': 'Pokaż cel na minimapie',
        'hk-showQuest': 'Pokaż/ukryj zadanie',
        'commands': 'Komendy',
        'comm1': 'Feeduj!',
        'comm2': 'Dziel się!',
        'comm3': 'Pomocy na %currentSector%!',
        'comm4': 'Wróg na %currentSector%!',
        'comm5': 'Zabij pomocnika!',
        'comm6': 'Strzel z wirusa!',
        'comm7': 'Zjedz wirusa!',
        'comm8': 'Zjebałem, wybacz.',
        'comm9': 'Ja pierdolę...',
        'comm0': 'Kurwa mać!',
        'comm10': 'Trick!',
        'comm11': 'Lewo!',
        'comm12': 'Góra!',
        'comm13': 'Prawo!',
        'comm14': 'Dół!',
        'comm15': 'Fake Tricksplit',
        'comm16': 'Popsplit',
        'comm17': 'Double Popsplit',
        'comm18': 'Reversed Tricksplit',
        'comm19': 'Canonsplit',
        'comm20': 'Reversed Canonsplit',
        'comm21': 'Bowlingsplit',
        'comm22': 'Auto feed trick',
        'comm23': 'Pause',
        'comm24': 'ANTI alarm stage 1',
        'comm25': 'ANTI alarm stage 2',
        'comm26': 'ANTI alarm stage 3',
        'comm27': 'ANTI alarm stage 4',
        'comm28': 'ANTI alarm stage 5',
        'comm29': 'Presplit',
        'comm30': 'Party Run tricks',
        'saveComm': 'Zapisz komendy',
        'theme': 'Wygląd',
        'restoreThemeSettings': 'Przywróc ustawienia domyślne wyglądu',
        'basicTheming': 'Podstawowy',
        'themePreset': 'Motyw',
        'themeType': 'Typ motywu',
        'darkTheme': 'Ciemny motyw',
        'lightTheme': 'Jasny motyw',
        'mainColor': 'Kolor główny',
        'bgColor': 'Tło',
        'bordersColor': 'Granice mapy',
        'gridColor': 'Siatka',
        'sectorsColor': 'Czcionka sektorów',
        'namesColor': 'Nazwy',
        'namesStrokeColor': 'Obwódki nazw',
        'massColor': 'Masa',
        'massStrokeColor': 'Obwódki masy',
        'virusColor': 'Wirusy',
        'virusStrokeColor': 'Obwódki wirusów',
        'virusGlowColor': "Virus Glow",
        "borderGlowColor": "Border Glow",
        'mVirusColor': 'Mothercell',
        'mVirusStrokeColor': 'Mothercell stroke',
        'virusGlowSize': 'Virus Glow Size',
        'borderGlowSize': 'Border Glow Size',
        'foodColor': 'Pokarm',
        'namesFont': 'Czcionka nazw',
        'massFont': 'Czcionka masy',
        'sectorsFont': 'Czcionka sektorów',
        'namesScale': 'Skala nazw',
        'massScale': 'Skala masy',
        'virMassScale': 'Skala masy wirusów',
        'strokeScale': 'Skala obwódek tekstu',
        'foodSize': 'Wielkość pokarmu',
        'bordersWidth': 'Grubość granic mapy',
        'sectorsWidth': 'Grubość siatki sektorów',
        'sectorsFontSize': 'Rozmiar czcionki sektorów',
        'cellsAlpha': 'Przezroczystość kulek',
        'skinsAlpha': 'Przezroczystość skinów',
        'virusAlpha': 'Przezroczystość wirusów',
        'textAlpha': 'Przezroczystość nazw i masy',
        'virusStrokeSize': 'Grubość obwódki wirusów',
        "virusGlowSize": "Virus Glow Size",
        'teammatesIndColor': 'Wskaźnik gracza',
        'cursorTrackingColor': 'Śledzenie kursora',
        'splitRangeColor': 'Zasięg podziału',
        'qdsplitRange': 'Zasięg szybkiego podwójnego podziału', //Sonia2
        'sdsplitRange': 'Zasięg powolnego podwójnego podziału', //Sonia2
        'enemyBSTEDColor': 'Kolor W2STE wroga', //Sonia2
        'enemyBSTEColor': 'Kolor WSTE wroga', //Sonia2
        'enemyBColor': 'Kolor większego wroga', //Sonia2
        'enemySColor': 'Kolor mniejszego wroga', //Sonia2
        'enemySSTEColor': 'Kolor MSTE wroga', //Sonia2
        'enemySSTEDColor': 'Kolor M2STE wroga', //Sonia2
        'safeAreaColor': 'Bezpieczna strefa',
        'dangerAreaColor': 'Strefa zagrożenia',
        'ghostCellsColor': 'Duchy kulek',
        'ghostCellsAlpha': 'Przezroczystość duchów kulek',
        'menuTheming': 'Menu',
        'menuPreset': 'Motyw menu',
        'menuMainColor': 'Kolor główny',
        'menuBtnTextColor': 'Tekst przycisku',
        'menuPanelColor': 'Panel',
        'menuPanelColor2': 'Panel (2)',
        'menuTextColor': 'Tekst panelu',
        'menuTextColor2': 'Tekst panelu (2)',
        'btn1Color': 'Przycisk #1',
        'btn1Color2': 'Przycisk #1 (2)',
        'btn2Color': 'Przycisk #2',
        'btn2Color2': 'Przycisk #2 (2)',
        'btn3Color': 'Przycisk #3',
        'btn3Color2': 'Przycisk #3 (2)',
        'btn4Color': 'Przycisk #4',
        'btn4Color2': 'Przycisk #4 (2)',
        'menuBg': 'Grafika tła panelu',
        'menuOpacity': 'Przezroczystość',
        'hudTheming': 'HUD',
        'hudMainColor': 'Kolor główny',
        'hudColor': 'Tło',
        'hudTextColor': 'Tekst',
        'statsHudColor': 'Statystyki',
        'timeHudColor': 'Czas',
        'top5MassColor': 'Masa',
        'lbMeColor': 'Topka - ja',
        'lbTeammateColor': 'Topka - team',
        'hudFont': 'Czcionka HUD',
        'hudScale': 'Skala HUD',
        'chatTheming': 'Czat',
        'messageColor': 'Tło wiadomości',
        'messageTextColor': 'Tekst wiadomości',
        'messageTimeColor': 'Czas wiadomości',
        'messageNickColor': 'Nick wiadomości',
        'commandsColor': 'Tło komendy',
        'commandsTextColor': 'Tekst komendy',
        'commandsTimeColor': 'Czas komendy',
        'commandsNickColor': 'Nick komendy',
        'chatBoxColor': 'Tło czatboxu',
        'chatScale': 'Skala czatu',
        'miniMapTheming': 'Minimapa',
        'miniMapSectorsColor': 'Sektory',
        'miniMapSectorColor': 'Aktualny sektor',
        'miniMapGuidesColor': 'Prowadnice',
        'miniMapNickColor': 'Nick',
        'miniMapNickStrokeColor': 'Obwódka nicku',
        'miniMapMyCellColor': 'Moja kulka',
        'miniMapMyCellStrokeColor': 'Obwódka mojej kulki',
        'miniMapTeammatesColor': 'Gracze',
        'miniMapDeathLocationColor': 'Miejsce śmierci',
        'miniMapFont': 'Czcionka minimapy',
        'miniMapNickFont': 'Czcionka nicku',
        'miniMapWidth': 'Szerokość minimapy',
        'miniMapSectorsOpacity': 'Przezroczystość sektorów',
        'miniMapNickSize': 'Rozmiar nicku',
        'miniMapNickStrokeSize': 'Grubość obwódki nicku',
        'miniMapMyCellSize': 'Wielkość mojej kulki',
        'miniMapMyCellStrokeSize': 'Grubość obwódki mojej kulki',
        'miniMapTeammatesSize': 'Wielkość graczy',
        'miniMapGhostCellsColor': 'Duchy kulek',
        'miniMapGhostCellsAlpha': 'Przezroczystość duchów kulek',
        'imagesTheming': 'Grafika / kursory',
        'customBackground': 'Grafika tła',
        'customCursor': 'Grafika kursora',
        'hideChatMsgA': 'Czat został włączony!',
        'hideChatMsgB': 'Czat został ukryty!',
        'showSkinsMsgA': 'Skiny zostały włączone!',
        'showSkinsMsgB': 'Skiny zostały ukryte!',
        'hideSmallBotsMsgA': 'Małe boty stały się widoczne!',
        'hideSmallBotsMsgB': 'Małe boty zostały ukryte!',
        'autoRespMsgA': 'Auto odrodzenie zostało włączone!',
        'autoRespMsgB': 'Auto odrodzenie zostało wyłączone!',
        'autoZoomMsgA': 'Auto zoom został włączony!',
        'autoZoomMsgB': 'Auto zoom został wyłączony!',
        //                   'targetNotSet': 'Brak celu',
        'targetNotSet': '',
        'targetDead': 'Nie żyje',
        'targetDistance': 'Dystans',
        'targetMass': 'Masa razem',
        'totalPartyPlayers': '',
        'totalPartyMass': '',
        'exportImport': 'Eksport / import ustawień',
        'exportSettings': 'Eksportuj ustawienia',
        'exportInfo': 'Aby wyeksportować wybrane ustawienia skopiuj poniższy kod i zapisz go w pliku tekstowym z kodowaniem Unicode.',
        'importSettings': 'Importuj ustawienia',
        'importInfo': 'Aby zaimportować wybrane ustawienia wklej poniżej wyeksportowany wcześniej kod i naciśnij przycisk \"Importuj ustawienia\".',
        'profile': 'Profil',
        'profiles': 'Profile',
        'skins': 'Skiny',
        'moreSkins': 'Dodaj skiny',
        'thanks': 'Dzięki Awesome!',
        'saveSett': 'Zapisz ustawienia',
        'saved': 'Zapisano!',
        'resetSett': 'Resetuj ustawienia',
        'close': 'Zamknij',
        'enterChatMsg': 'Napisz wiadomość',
        'activeParties': 'Aktywne party',
        'noActiveParties': 'Brak aktywnych party ;(',
        'playlist': 'Playlista',
        'pause': 'PAUZA!',
        'visit': 'Odwiedź',
        'exit': 'Legend mod Express: Czy na pewno chcesz opuścic grę?',
        'blockWarn': 'UWAGA! Popupy zostały zablokowane w ustawieniach.',
        'unblockPopups': 'Odblokuj tymczasowo',
        'mass': 'Masa',
        'score': 'Top',
        'leaderboard': 'Topka',
        'user': 'Użytkownik',
        'userMuted': 'Użytkownik %user% został wyciszony.',
        'userUnmuted': 'Wyłączono wyciszenie użytkownika %user%.',
        'mute': 'Wycisz',
        'unmute': 'Wyłącz wyciszenie',
        'mutedUsers': 'Wyciszeni użytkownicy',
        'activeUsers': 'Aktywni użytkownicy',
        'showActiveUsers': 'Pokaż aktywnych użytkowników',
        'none': 'Brak',
        'sounds': 'Dźwięki',
        'page_back_button': 'Wróć',
        'page_create_party': 'Stwórz party',
        'page_join_party': 'Dołącz',
        'page_login_and_play': 'Zaloguj',
        'page_logout': 'Wyloguj',
        'page_menu_login_facebook': 'Zaloguj z Facebook',
        'page_menu_login_google': 'Zaloguj z Google',
        'page_menu_main_free_coins': 'Darmowe Monety',
        'page_menu_main_gifts': 'Prezenty',
        'page_menu_main_dailyquests': 'Zadania',
        'page_party_join_error': 'Nie można dołączyć do tego party. Upewnij się, że token jest prawidłowy lub stwórz nowy.',
        'page_play': 'Graj',
        'page_play_as_guest': 'Graj jako gość',
        'page_shop': 'Sklep',
        'page_spectate': 'Obserwuj',
        'page_stats': 'Statystyki'
    },
    'en': {
        'start': 'Home',
        'settings': 'Settings',
        'restoreSettings': 'Restore default settings',
        'animationGroup': 'Animation',
        'zoomGroup': 'Zoom',
        'respGroup': 'Respawn',
        'namesGroup': 'Names',
        'massGroup': 'Mass',
        'skinsGroup': 'Skins',
        'foodGroup': 'Food',
        'transparencyGroup': 'Transparency / colors',
        'gridGroup': 'Grid / sectors',
        'miniMapGroup': 'Minimap',
        'helpersGroup': 'Helpers',
        'mouseGroup': 'Mouse control',
        'hudGroup': 'HUD',
        'chatGroup': 'Chat',
        'statsGroup': 'Stats',
        'extrasGroup': 'Extras',
        'noSkins': 'No skins',
        'noNames': 'No names',
        'noColors': 'No colors',
        'showMass': 'Show mass',
        'skipStats': 'Skip stats after death',
        'showQuest': 'Show quest',
        'autoZoom': 'Auto zoom',
        'animation': 'Animation delay',
        'suckAnimation': 'Cell Eat [Sucking] Animation',
        'virusGlow': 'Virus Glow',
        'borderGlow': 'Border Glow',
        'zoomSpeedValue2': 'Zoom speed',
        'quickResp': 'Quick respawn (hotkey)',
        'autoResp': 'Auto respawn',
        'autoHideCellsInfo': 'Auto hide names and mass',
        'autoHideNames': 'Auto hide names',
        'autoHideMass': 'Auto hide mass',
        'autoHideFood': 'Auto hide food - mass',
        'autoHideFoodOnZoom': 'Auto hide food - zoom',
        'optimizedNames': 'Optimized names',
        'hideMyName': 'Hide my name',
        'hideTeammatesNames': 'Hide teammates names',
        'optimizedMass': 'Optimized mass (+/-2%) & Merge timer BETA off\r\n Suggested to be enabled for Lag reduce',
        'shortMass': 'Short mass (k)',
        'virMassShots': 'Virus shots',
        'hideMyMass': 'Hide my mass',
        'hideEnemiesMass': 'Hide enemies mass',
        'vanillaSkins': 'Vanilla skins',
        'customSkins': 'Custom skins',
        'videoSkins': 'Video skins (.mp4 .webm .ogv)',
        'videoSkinsMusic': 'Sound from other\'s Video skins when both C3',
        'myTransparentSkin': 'My transparent skin',
        'myCustomColor': 'My custom color',
        'transparentCells': 'Transparent cells',
        'transparentViruses': 'Transparent viruses',
        'transparentSkins': 'Transparent skins',
        'showGrid': 'Show grid',
        'showBgSectors': 'Show background sectors',
        'showMapBorders': 'Show map borders',
        'showGhostCells': 'Ghost cells (fps drop)',
        'showGhostCellsInfo': 'Ghost cells info (confusing)',
        'showMiniMap': 'Show minimap',
        'showMiniMapGrid': 'Show minimap grid',
        'showMiniMapGuides': 'Show minimap guides',
        'showExtraMiniMapGuides': 'Show extra minimap guides',
        'showMiniMapGhostCells': 'Show ghost cells',
        'oneColoredTeammates': 'One-colored teammates',
        'optimizedFood': 'Optimized food',
        'rainbowFood': 'Rainbow food',
        'oppColors': 'Opponents colors',
        'oppRings': 'Opponents rings',
        'virColors': 'Viruses colors',
        'splitRange': 'Split range',
        'qdsplitRange': 'Quick double split range', //Sonia2
        'sdsplitRange': 'Slow double split range', //Sonia2
        'virusesRange': 'Viruses range',
        'textStroke': 'Names and mass stroke',
        'namesStroke': 'Names stroke',
        'massStroke': 'Mass stroke',
        'cursorTracking': 'Cursor tracking',
        'teammatesInd': 'Teammates indicators',
        'mouseSplit': 'LMB - Mouse split',
        'mouseFeed': 'RMB - Mouse feed',
        'mouseInvert': 'Invert mouse buttons',
        'disableChat': 'Disable chat',
        'hideChat': 'Hide chat',
        'chatSounds': 'Sound notifications',
        'chatEmoticons': 'Emoticons',
        'showChatImages': 'Show images on chat',
        'showChatVideos': 'Show videos on chat',
        'showChatBox': 'Chatbox instead of popups',
        'messageSound': 'Message notification sound',
        'commandSound': 'Command notification sound',
        'virusSoundurl': 'Virus shot sound',
        'virusSound': 'Virus shot sound',
        'jellyPhisycs': 'Jelly physics',
        'showTop5': 'Show teamboard',
        'showTargeting': 'Show targeting',
        'showTime': 'Show current time',
        'showLbData': 'Show leaderboard mass',
        'normalLb': '\"Leaderboard\" header',
        'centeredLb': 'Centered leaderboard',
        'fpsAtTop': 'Game stats at the top',
        'showStats': 'Show game stats',
        'showStatsMass': 'Game stats: Mass',
        'showStatsESTE': 'Game stats: Enemy\'s STE',
        'showStatsEMTE': 'Game stats: Enemy\'s MTE',
        'showStatsMTE': 'Game stats: Our MTE',
        'showStatsSTE': 'Game stats: Our STE',
        'showStatsTTE': 'Game stats: Minimal tricksplit teammate\'s mass',
        'showStatsPTE': 'Game stats: Maximal enemy\'s mass for presplit',
        'showStatsN16': 'Game stats: n/16',
        'showStatsFPS': 'Game stats: FPS',
        'blockPopups': 'Block popups (ads/shop/quest)',
        'hotkeys': 'Hotkeys',
        'hk-inst-assign': 'To assign a hotkey click on the input field and press your chosen key.',
        'hk-inst-delete': 'To delete a hotkey click on the input field and press the DELETE key.',
        'hk-inst-keys': 'Possible key combinations with the CTRL and ALT keys.',
        'hk-bots-split': 'Bots split',
        'hk-bots-feed': 'Bots feed',
        'hk-bots-ai': 'Bots AI toggle',
        'hk-feed': 'Feed',
        'hk-macroFeed': 'Macro feed',
        'hk-split': 'Split',
        'hk-doubleSplit': 'Double split',
        'hk-split16': 'Split 16',
        'hk-pause': 'Cell pause',
        'hk-showTop5': 'Show/hide teamboard',
        'hk-showTime': 'Show/hide current time',
        'hk-showSplitRange': 'Show/hide split range',
        'hk-showSplitInd': 'Show/hide split indicators',
        'hk-showTeammatesInd': 'Show/hide teammates indicators',
        'hk-showOppColors': 'Show/hide opponents colors',
        'hk-toggleSkins': 'Toggle skins (custom/default)',
        'hk-showSkins': 'Show/hide skins',
        'hk-transparentSkins': 'Toggle transparent skins',
        'hk-showStats': 'Show/hide game stats',
        'hk-toggleCells': 'Toggle own cells (smallest/biggest)',
        'hk-showFood': 'Show/hide food',
        'hk-showGrid': 'Show/hide grid',
        'hk-showMiniMapGuides': 'Show/hide minimap guides',
        'hk-hideChat': 'Show/hide chat',
        'hk-showHUD': 'Show/hide HUD',
        'hk-copyLb': 'Copy leaderboard',
        'hk-showLb': 'Show/hide leaderboard',
        'hk-toggleAutoZoom': 'Toggle auto zoom',
        'hk-resetZoom': 'Reset zoom',
        'hk-zoomLevel': 'Zoom level',
        'hk-toggleDeath': 'Toggle death location',
        'hk-clearChat': 'Show chat history / Clear chat',
        'hk-showBgSectors': 'Show/hide background sectors',
        'hk-hideBots': 'Show/hide small bots',
        'hk-showNames': 'Show/hide names',
        'hk-hideTeammatesNames': 'Show/hide teammates names',
        'hk-showMass': 'Show/hide mass',
        'hk-showMiniMap': 'Show/hide minimap',
        'hk-chatMessage': 'Enter chat message',
        'hk-quickResp': 'Quick respawn',
        'hk-autoResp': 'Toggle auto respawn',
        'hk-switchServerMode': 'Switch server [public/private]',
        'hk-showTargeting': 'Show/hide targeting panel',
        'hk-voiceChat': 'Voice to text',
        'hk-GhostCellsInfo': ' Show ghost cells information',
        'hk-Autoplay': 'Auto Play',
        'hk-setTargeting': 'Start/stop targeting (following)',
        'hk-cancelTargeting': 'Cancel targeting',
        'hk-changeTarget': 'Change target',
        'hk-privateMiniMap': 'Show target on the minimap',
        'hk-showQuest': 'Show/hide quest',
        'commands': 'Commands',
        'comm1': 'Feed me!',
        'comm2': 'Split into me!',
        'comm3': 'Need backup at %currentSector%!',
        'comm4': 'Enemy spotted at %currentSector%!',
        'comm5': 'Need a teammate!',
        'comm6': 'Tank the virus!',
        'comm7': 'Eat the virus!',
        'comm8': 'Let\'s bait!',
        'comm9': 'Fake tricksplit!',
        'comm0': 'Fuck!',
        'comm10': 'Tricksplit!',
        'comm11': 'Left!',
        'comm12': 'Up!',
        'comm13': 'Right!',
        'comm14': 'Bottom!',
        'comm15': 'Fake Tricksplit',
        'comm16': 'Popsplit',
        'comm17': 'Double Popsplit',
        'comm18': 'Reversed Tricksplit',
        'comm19': 'Canonsplit',
        'comm20': 'Reversed Canonsplit',
        'comm21': 'Bowlingsplit',
        'comm22': 'Auto feed trick',
        'comm23': 'Pause',
        'comm24': 'ANTI alarm stage 1',
        'comm25': 'ANTI alarm stage 2',
        'comm26': 'ANTI alarm stage 3',
        'comm27': 'ANTI alarm stage 4',
        'comm28': 'ANTI alarm stage 5',
        'comm29': 'Presplit',
        'comm30': 'Party Run tricks',
        'saveComm': 'Save commands',
        'theme': 'Theme',
        'restoreThemeSettings': 'Restore theme default settings',
        'basicTheming': 'Basic theming',
        'themePreset': 'Theme preset',
        'themeType': 'Theme type',
        'darkTheme': 'Dark theme',
        'lightTheme': 'Light theme',
        'mainColor': 'Main color',
        'bgColor': 'Background',
        'bordersColor': 'Map borders',
        'gridColor': 'Grid',
        'sectorsColor': 'Sectors font',
        'namesColor': 'Names',
        'namesStrokeColor': 'Names stroke',
        'massColor': 'Mass',
        'massStrokeColor': 'Mass stroke',
        'virusColor': 'Virus',
        'virusStrokeColor': 'Virus stroke',
        'virusGlowColor': "Virus Glow",
        "borderGlowColor": "Border Glow",
        'mVirusColor': 'Mothercell',
        'mVirusStrokeColor': 'Mothercell stroke',
        'virusGlowSize': 'Virus Glow Size',
        'borderGlowSize': 'Border Glow Size',
        'foodColor': 'Food',
        'namesFont': 'Names font',
        'massFont': 'Mass font',
        'sectorsFont': 'Sectors font',
        'namesScale': 'Names scale',
        'massScale': 'Mass scale',
        'virMassScale': 'Virus mass scale',
        'strokeScale': 'Text stroke scale',
        'foodSize': 'Food size',
        'bordersWidth': 'Map borders width',
        'sectorsWidth': 'Sectors grid width',
        'sectorsFontSize': 'Sectors font size',
        'cellsAlpha': 'Cells transparency',
        'skinsAlpha': 'Skins transparency',
        'virusAlpha': 'Virus transparency',
        'textAlpha': 'Names & mass transparency',
        'virusStrokeSize': 'Virus stroke size',
        "virusGlowSize": "Virus Glow Size",
        'teammatesIndColor': 'Teammate indicator',
        'cursorTrackingColor': 'Cursor tracking',
        'splitRangeColor': 'Split range',
        'enemyBSTEDColor': 'B2STE Enemy Color', //Sonia2
        'enemyBSTEColor': 'BSTE Enemy Color', //Sonia2
        'enemyBColor': 'Bigger Enemy Color', //Sonia2
        'enemySColor': 'Smaller Enemy Color', //Sonia2
        'enemySSTEColor': 'SSTE Enemy Color', //Sonia2
        'enemySSTEDColor': 'S2STE Enemy Color', //Sonia2
        'safeAreaColor': 'Safe area',
        'dangerAreaColor': 'Danger area',
        'ghostCellsColor': 'Ghost cells',
        'ghostCellsAlpha': 'Ghost cells transparency',
        'menuTheming': 'Menu',
        'menuPreset': 'Menu theme',
        'menuMainColor': 'Main color',
        'menuBtnTextColor': 'Button text',
        'menuPanelColor': 'Panel',
        'menuPanelColor2': 'Panel (2)',
        'menuTextColor': 'Panel text',
        'menuTextColor2': 'Panel text (2)',
        'btn1Color': 'Button #1',
        'btn1Color2': 'Button #1 (2)',
        'btn2Color': 'Button #2',
        'btn2Color2': 'Button #2 (2)',
        'btn3Color': 'Button #3',
        'btn3Color2': 'Button #3 (2)',
        'btn4Color': 'Button #4',
        'btn4Color2': 'Button #4 (2)',
        'menuBg': 'Panel background image',
        'menuOpacity': 'Transparency',
        'hudTheming': 'HUD',
        'hudMainColor': 'Main color',
        'hudColor': 'Background',
        'hudTextColor': 'Text',
        'statsHudColor': 'Stats',
        'timeHudColor': 'Time',
        'top5MassColor': 'Mass',
        'lbMeColor': 'Leaderboard - me',
        'lbTeammateColor': 'Leaderboard - teammate',
        'hudFont': 'HUD font',
        'hudScale': 'HUD scale',
        'chatTheming': 'Chat',
        'messageColor': 'Message background',
        'messageTextColor': 'Message text',
        'messageTimeColor': 'Message time',
        'messageNickColor': 'Message nick',
        'commandsColor': 'Command background',
        'commandsTextColor': 'Command text',
        'commandsTimeColor': 'Command time',
        'commandsNickColor': 'Command nick',
        'chatBoxColor': 'Chatbox color',
        'chatScale': 'Chat scale',
        'miniMapTheming': 'Minimap',
        'miniMapSectorsColor': 'Sectors',
        'miniMapSectorColor': 'Current sector',
        'miniMapGuidesColor': 'Guides',
        'miniMapNickColor': 'Nick',
        'miniMapNickStrokeColor': 'Nick stroke',
        'miniMapMyCellColor': 'My cell',
        'miniMapMyCellStrokeColor': 'My cell stroke',
        'miniMapTeammatesColor': 'Teammates',
        'miniMapDeathLocationColor': 'Death location',
        'miniMapFont': 'Minimap font',
        'miniMapNickFont': 'Nick font',
        'miniMapWidth': 'Minimap width',
        'miniMapSectorsOpacity': 'Sectors transparency',
        'miniMapNickSize': 'Nick size',
        'miniMapNickStrokeSize': 'Nick stroke size',
        'miniMapMyCellSize': 'My cell size',
        'miniMapMyCellStrokeSize': 'My cell stroke size',
        'miniMapTeammatesSize': 'Teammates size',
        'miniMapGhostCellsColor': 'Ghost cells',
        'miniMapGhostCellsAlpha': 'Ghost cells transparency',
        'imagesTheming': 'Graphics / cursors',
        'customBackground': 'Custom background image',
        'customCursor': 'Custom cursor image',
        'hideChatMsgA': 'Chat is visible!',
        'hideChatMsgB': 'Chat is hidden!',
        'showSkinsMsgA': 'Skins are visible!',
        'showSkinsMsgB': 'Skins are hidden!',
        'hideSmallBotsMsgA': 'Small bots are visible!',
        'hideSmallBotsMsgB': 'Small bots are hidden!',
        'autoRespMsgA': 'Auto respawn is on!',
        'autoRespMsgB': 'Auto respawn is off!',
        'autoZoomMsgA': 'Auto zoom is on!',
        'autoZoomMsgB': 'Auto zoom is off!',
        'targetNotSet': '',
        'targetDead': 'Dead',
        'targetDistance': 'Distance',
        'targetMass': 'Total Mass',
        'totalPartyPlayers': '',
        'totalPartyMass': '',
        'exportImport': 'Export / import settings',
        'exportSettings': 'Export settings',
        'exportInfo': 'To export selected settings copy the code below and save it to a text file encoded in Unicode.',
        'importSettings': 'Import settings',
        'importInfo': 'To import selected settings paste an exported code below and press the \"Import settings\" button.',
        'profile': 'Profile',
        'profiles': 'Profiles',
        'skins': 'Skins',
        'moreSkins': 'Add skins',
        'thanks': 'Thanks to Awesome!',
        'saveSett': 'Save settings',
        'saved': 'Saved!',
        'resetSett': 'Reset to default',
        'close': 'Close',
        'enterChatMsg': 'Enter chat message',
        'activeParties': 'Active parties',
        'noActiveParties': 'No active parties ;(',
        'playlist': 'Playlist',
        'pause': 'PAUSE!',
        'visit': 'Visit',
        'exit': 'Legend mod Express: Are you sure you want to quit the game?',
        'blockWarn': 'WARNING! Popups are blocked in the settings.',
        'unblockPopups': 'Temporary unblock',
        'mass': 'Mass',
        'score': 'Score',
        'leaderboard': 'Leaderboard',
        'user': 'User',
        'userMuted': 'User %user% has been muted.',
        'userUnmuted': 'User %user% has been unmuted.',
        'mute': 'Mute',
        'unmute': 'Unmute',
        'mutedUsers': 'Muted users',
        'activeUsers': 'Active users',
        'showActiveUsers': 'Show active users',
        'none': 'None',
        'sounds': 'Sounds',
        'page_menu_main_free_coins': 'Free Coins',
        'page_menu_main_gifts': 'Gifts',
        'page_menu_main_dailyquests': 'Daily Quest',
        'page_shop': 'Shop'
    }
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