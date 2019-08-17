ZTX.agar = {
    'quadtree': null,
    updateQuadtree: function (cells) {
        var w = ZTX.draw.canvasWidth / ZTX.draw.scale;
        var h = ZTX.draw.canvasHeight / ZTX.draw.scale;
        var x = (ZTX.agar.viewX - w / 2);
        var y = (ZTX.agar.viewY - h / 2);
        this.quadtree = new PointQuadTree(x, y, w, h, 32);
        for (var i = 0; i < cells.length; ++i) {
            var cell = cells[i];
            for (var n = 0; n < cell.points.length; ++n) {
                this.quadtree.insert(cell.points[n]);
            }
        }
    },
    'ws': null,
    'socket': null,
    'protocolKey': null,
    'clientKey': null,
    'connectionOpened': false,
    'accessTokenSent': false,
    'clientVersion': 30600,
    'clientVersionString': '3.6.0',
    'time': Date.now(),
    'serverTime': 0,
    'serverTimeDiff': 0,
    'loggedInTime': 0,
    'mapSize': 14142,
    'mapOffset': 7071,
    'mapOffsetX': 0,
    'mapOffsetY': 0,
    'mapOffsetFixed': false,
    'mapMinX': -7071,
    'mapMinY': -7071,
    'mapMaxX': 7071,
    'mapMaxY': 7071,
    'viewMinX': 0,
    'viewMinY': 0,
    'viewMaxX': 0,
    'viewMaxY': 0,
    'canvasWidth': 0,
    'canvasHeight': 0,
    'canvasScale': 1,
    'indexedCells': {},
    'cells': [],
    'removedCells': [],
    'food': [],
    'viruses': [],
    'playerCells': [],
    'playerCellIDs': [],
    'ghostCells': [],
    'playerX': 0,
    'playerY': 0,
    'playerSize': 0,
    'playerMass': 0,
    'playerMaxMass': 0,
    'playerMinMass': 0,
    'playerScore': 0,
    'playerSplitCells': 0,
    'playerColor': null,
    'playerNick': '',
    'playerPosition': 0,
    'leaderboard': [],
    'biggerSTEDCellsCache': [], //Sonia
    'biggerSTECellsCache': [],
    'biggerCellsCache': [],
    'smallerCellsCache': [],
    'STECellsCache': [],
    'STEDCellsCache': [], //Sonia
    'STE': 0,
    'autoZoom': false,
    'zoomValue': 0.1,
    'viewX': 0,
    'viewY': 0,
    'scale': 1,
    'viewScale': 1,
    'clientX': 0,
    'clientY': 0,
    'cursorX': 0,
    'cursorY': 0,
    'targetX': 0,
    'targetY': 0,
    'targetDistance': 0,
    ////
    "cRadius": 10,
    "cAngle": 4,
    "cAngle1": 0,
    "cAngle2": 0,
    "cAlpha": 1,
    "drawCommander": 0,
    ////
    'battleRoyale': {
        'state': 0,
        'players': 0,
        'startTime': 0,
        'shrinkTime': 0,
        'timeLeft': 0,
        'x': 0,
        'y': 0,
        'radius': 0,
        'targetX': 0,
        'targetY': 0,
        'targetRadius': 0,
        'maxRadius': 11313,
        'rank': [],
        'playerRank': 0,
        'joined': false
    },
    'play': false,
    'pause': false,
    'targeting': false,
    'removePlayerCell': false,
    'showCustomSkins': true,
    'showFood': true,
    'foodIsHidden': false,
    'selectBiggestCell': true,
    'hideSmallBots': false,
    'pressedKeys': {},
    'connect': function (t) {
        console.log('[Legend mod Express] Connecting to game server:', t);
        var i = this;
        setTimeout(function () {
            window.legendmod3.Socket3connect(t);
            window.legendmod3.SLGconnect(t);
        }, 100);
        window.legendmod.vnr = 0; //Sonia3
        window.legendmod.bgpi = 4; //Sonia3
        window.legendmod.lbgpi = 4; //Sonia3
        window.legendmod.vector = [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1]
        ]; //Sonia3
        window.legendmod.setrot = false; //Sonia3
        window.legendmod.delstate = -1; //Sonia3
        this.closeConnection();
        this.flushCellsData();
        this.protocolKey = null;
        this.clientKey = null;
        this.accessTokenSent = false;
        this.connectionOpened = false;
        this.mapOffsetFixed = false;
        this.leaderboard = [];
        this.ws = t;
        if (window.userBots.startedBots) window.connectionBots.send(new Uint8Array([1]).buffer)
        window.userBots.isAlive = false
        window.userBots.macroFeedInterval = null
        this.socket = new WebSocket(t);
        this.socket['binaryType'] = 'arraybuffer';
        this.socket['onopen'] = function () {
            i['onOpen']();
        };
        this.socket['onmessage'] = function (t) {
            i['onMessage'](t);
        };
        this.socket['onerror'] = function (t) {
            i['onError'](t);
        };
        this.socket['onclose'] = function (t) {
            i['onClose'](t);
        };
        ZTX.ogario['getWS'](this.ws);
        ZTX.ogario['sendServerJoin']();
        ZTX.ogario['sendServerData']();
        ZTX.ogario['displayLeaderboard']('');
        if (window.master && window.master['onConnect']) {
            window.master['onConnect']();
        }
    },
    'onOpen': function (t) {
        console.log('[Legend mod Express] Game server socket open'),
            this.time = Date.now();
        var e = this.createView(5);
        e.setUint8(0, 254);
        if (!window.gameBots.protocolVersion) window.gameBots.protocolVersion = 21;
        e.setUint32(1, 21, true);
        this.sendMessage(e);
        e = this.createView(5);
        e.setUint8(0, 255);
        if (!window.gameBots.clientVersion) window.gameBots.clientVersion = this.clientVersion
        e.setUint32(1, this.clientVersion, true);
        this.sendMessage(e);
        this.connectionOpened = true;
    },
    'onMessage': function (t) {
        t = new DataView(t['data']);
        if (this.protocolKey) {
            t = this['shiftMessage'](t, this.protocolKey ^ this.clientVersion);
        }
        this['handleMessage'](t);
    },
    'onError': function (t) {
        console.log('[Legend mod Express] Game server socket error');
        this.flushCellsData();
        if (window.master && window.master['onDisconnect']) {
            window.master['onDisconnect']();
        }
    },
    'onClose': function (t) {
        console.log('[Legend mod Express] Game server socket close');
        this.flushCellsData();
        if (window.master && window.master['onDisconnect']) {
            window.master['onDisconnect']();
        }
    },
    'closeConnection': function () {
        if (this.socket) {
            this.socket['onopen'] = null;
            this.socket['onmessage'] = null;
            this.socket['onerror'] = null;
            this.socket['onclose'] = null;
            try {
                this.socket['close']();
            } catch (ogarcloseconncloser) {
            }
            this.socket = null;
            this.ws = null;
        }
    },
    'isSocketOpen': function () {
        return null !== this.socket && this.socket['readyState'] === this.socket['OPEN'];
    },
    'createView': function (t) {
        return new DataView(new ArrayBuffer(t));
    },
    'sendBuffer': function (t) {
        this.socket['send'](t['buffer']);
    },
    'sendMessage': function (t) {
        //console.log(t);
        if (this.connectionOpened) {
            if (!this.clientKey) return;
            t = this['shiftMessage'](t, this.clientKey);
            this.clientKey = this.shiftKey(this.clientKey);
        }
        this['sendBuffer'](t);
    },
    'sendAction': function (t) {
        if (this.isSocketOpen()) {
            var e = this.createView(1);
            e.setUint8(0, t);
            this.sendMessage(e);
        }
    },
    'sendSpectate': function () {
        this.sendAction(1);
    },
    'sendFreeSpectate': function () {
        this.sendAction(18);
    },
    'sendEject': function () {
        this.sendPosition();
        this.sendAction(21);
    },
    'sendSplit': function () {
        this.sendPosition();
        this.sendAction(17);

    },
    'sendNick': function (t) {

        this.playerNick = t, t = window.unescape(window.encodeURIComponent(t));
        window.Bufferdata = t; //
        var i = this.createView(1 + t.length);
        i.setUint8(0, 0);
        for (var s = 0; s < t.length; s++) i.setUint8(s + 1, t.charCodeAt(s));
        this.sendMessage(i);
    },
    'sendPosition': function (cell, target2) {
        if (this.isSocketOpen() && this.connectionOpened && this.clientKey) {
            if (!window.autoPlay) {
                var t = window.legendmod.vector[window.legendmod.vnr][0] ? this.translateX(this.cursorX) : this.cursorX; //Sonia3
                var e = window.legendmod.vector[window.legendmod.vnr][1] ? this.translateY(this.cursorY) : this.cursorY; //Sonia3
                if (!this.play && this.targeting || this.pause) {
                    t = this.targetX;
                    e = this.targetY;
                }
            }
            //autoplay handling
            else {
                //if (typeof cell != "undefined") { //when used, autoplay not working as expected
                if (Object.keys(target2).length == 0) {
                    var t = window.legendmod.vector[window.legendmod.vnr][0] ? this.translateX(cell.x) : cell.x; //Sonia3
                    var e = window.legendmod.vector[window.legendmod.vnr][1] ? this.translateY(cell.y) : cell.y; //Sonia3
                    // var t = cell.x;
                    //var e = cell.y;
                } else {
                    var t = window.legendmod.vector[window.legendmod.vnr][0] ? this.translateX(target2.x) : target2.x; //Sonia3
                    var e = window.legendmod.vector[window.legendmod.vnr][1] ? this.translateY(target2.y) : target2.y; //Sonia3
                    //var t = target2.x;
                    //var e = target2.y;
                }
                //}
            }
            //

            var i = this.createView(13);
            i.setUint8(0, 16);
            i.setInt32(1, t, true);
            i.setInt32(5, e, true);
            i.setUint32(9, this.protocolKey, true);
            this.sendMessage(i);
        }
        window.userBots.mouseX = this.cursorX - window.userBots.offsetX;
        window.userBots.mouseY = this.cursorY - window.userBots.offsetY;
        if (window.userBots.startedBots && window.userBots.isAlive) window.connectionBots.send(window.buffers.mousePosition(window.userBots.mouseX, window.userBots.mouseY))
    },
    /*            'sendAccessToken': function(t, e, i) {
                    if (!this['accessTokenSent']) {
                        i || (i = 102);
                        for (var s = t.length, o = this.clientVersionString.length, a = [i, 8, 1, 18, s + o + 23, 1, 8, 10, 0x52, s + o + 18, 1, 8, e, 18, o + 8, 8, 5, 18, o], n = 0; n < o; n++) a.push(this.clientVersionString.charCodeAt(n));
                        for (a.push(24, 0, 32, 0, 26, s + 3, 1, 10, s, 1), n = 0; n < s; n++) a.push(t.charCodeAt(n));
                        a = new Uint8Array(a);
                        var r = new DataView(a['buffer']);
                        this.sendMessage(r);
                    }
                }, */
    "sendAccessToken": function (shapes, options, oW) {
        if (ZTX.agar["accessTokenSent"]) {
            return;
        }
        if (!oW) {
            oW = 102;
        }
        var curr = shapes.length;
        var count = this.clientVersionString.length;
        var data = [oW, 8, 1, 18];
        //this.writeUint32(data, curr + count + 23);
        ZTX.ogario.writeUint32(data, curr + count + 23);
        data.push(8, 10, 82);
        ZTX.ogario.writeUint32(data, curr + count + 18);
        //this.writeUint32(data, curr + count + 18);
        data.push(8, options, 18, count + 8, 8, 5, 18, count);
        var prev = 0;
        for (; prev < count; prev++) {
            data.push(this.clientVersionString.charCodeAt(prev));
        }
        data.push(24, 0, 32, 0, 26);
        ZTX.ogario.writeUint32(data, curr + 3);
        //this.writeUint32(data, curr + 3);
        data.push(10);
        ZTX.ogario.writeUint32(data, curr);
        //this.writeUint32(data, curr);
        prev = 0;
        for (; prev < curr; prev++) {
            data.push(shapes.charCodeAt(prev));
        }
        data = new Uint8Array(data);
        var raw_basefont = new DataView(data["buffer"]);
        this["sendMessage"](raw_basefont);
    },
    'sendFbToken': function (t) {
        //                console.log("[Legend mod Express] Facebook token: " + t);
        this.sendAccessToken(t, 2);
    },
    'sendGplusToken': function (t) {
        //                console.log("[Legend mod Express] Google Plus token: " + t);
        //this.sendAccessToken(t, 3);
        this.sendAccessToken(t, 4);
    },
    'sendRecaptcha': function (t) {
        var e = this.createView(2 + t.length);
        e.setUint8(0, 86);
        for (var i = 0; i < t.length; i++) e.setUint8(1 + i, t.charCodeAt(i));
        e.setUint8(t.length + 1, 0), this.sendMessage(e);
    },
    'setClientVersion': function (t, e) {

        if (window.disableIntegrity != true) { //
            this.clientVersion = t;
            this.clientVersionString = e;
            console.log('[Legend mod Express] Client version:', t, e);
        } //
        else { //
            this.clientVersion = 0;
            this.clientVersionString = e;
            console.log('[Legend mod Express] Client version:', t, e); //
        } //
    },
    /*
                'generateClientKey': function(t, e) {
                    if (!t.length || !e.byteLength) return null;
                    for (var i = null, s = 1540483477, o = t.match(/(ws+:\/\/)([^:]*)(:\d+)/)[2], a = o.length + e.byteLength, n = new Uint8Array(a), r = 0; r < o.length; r++) n[r] = o.charCodeAt(r);
                    n.set(e, o.length);
                    for (var l = new DataView(n['buffer']), h = a - 1, c = 4 + (h - 4 & -4) | 0, u = 255 ^ h, d = 0; h > 3;) i = 0 | Math.imul(l.getInt32(d, true), s), u = (0 | Math.imul(i >>> 24 ^ i, s)) ^ (0 | Math.imul(u, s)), h -= 4, d += 4;
                    switch (h) {
                        case 3:
                            u = n[c + 2] << 16 ^ u, u = n[c + 1] << 8 ^ u;
                            break;
                        case 2:
                            u = n[c + 1] << 8 ^ u;
                            break;
                        case 1:
                            break;
                        default:
                            i = u;
                    }
                    return i != u && (i = 0 | Math.imul(n[c] ^ u, s)), i ^= u = i >>> 13, i = 0 | Math.imul(i, s), i ^= u = i >>> 15, console.log('[Legend mod Express] Generated client key:', i),window.generatedClientKey=i, i;
                },
                'shiftKey': function(t) {
                    //if (window.disableIntegrity!=false){ //
                    return t = 0 | Math.imul(t, 1540483477), t = 114296087 ^ (0 | Math.imul(t >>> 24 ^ t, 1540483477)), (t = 0 | Math.imul(t >>> 13 ^ t, 1540483477)) >>> 15 ^ t;
                    //} //
                    //else{ //
                    //return 0; //
                    //} //
                },
                */
    "generateClientKey": function (option, _relatedTarget) {
        if (!option.length || !_relatedTarget.byteLength) {
            return null;
        }
        var j = null;
        var suggestedValue = 1540483477;
        var constraints = option.match(/(ws+:\/\/)([^:]*)(:\d+)/)[2];
        var framesize = constraints.length + _relatedTarget.byteLength;
        var data = new Uint8Array(framesize);
        var value = 0;
        for (; value < constraints.length; value++) {
            data[value] = constraints.charCodeAt(value);
        }
        data.set(_relatedTarget, constraints.length);
        var dv = new DataView(data["buffer"]);
        var maxTextureAvailableSpace = framesize - 1;
        var k = (maxTextureAvailableSpace - 4 & -4) + 4 | 0;
        var i = maxTextureAvailableSpace ^ 255;
        var n = 0;
        for (; maxTextureAvailableSpace > 3;) {
            j = Math.imul(dv['getInt32'](n, !![]), suggestedValue) | 0;
            i = (Math.imul(j >>> 24 ^ j, suggestedValue) | 0) ^ (Math.imul(i, suggestedValue) | 0);
            maxTextureAvailableSpace = maxTextureAvailableSpace - 4;
            n = n + 4;
        }
        switch (maxTextureAvailableSpace) {
            case 3:
                i = data[k + 2] << 16 ^ i;
                i = data[k + 1] << 8 ^ i;
                break;
            case 2:
                i = data[k + 1] << 8 ^ i;
                break;
            case 1:
                break;
            default:
                j = i;
                break;
        }
        if (j != i) {
            j = Math.imul(data[k] ^ i, suggestedValue) | 0;
        }
        i = j >>> 13;
        j = i ^ j;
        j = Math.imul(j, suggestedValue) | 0;
        i = j >>> 15;
        j = i ^ j;
        console.log('[Legend mod Express] Generated client key:', j);
        window.generatedClientKey = j;
        return j;

    },
    "shiftKey": function (c) {
        if (window.disableIntegrity != true) {
            var suggestedValue = 1540483477;
            c = Math.imul(c, suggestedValue) | 0;
            c = (Math.imul(c >>> 24 ^ c, suggestedValue) | 0) ^ 114296087;
            c = Math.imul(c >>> 13 ^ c, suggestedValue) | 0;
            return c >>> 15 ^ c;
        } else {
            return 0;
        }
    },
    "shiftMessage": function (t, e, i) {
        if (window.disableIntegrity != true) {
            if (!i) {
                var s = 0;
                for (; s < t.byteLength; s++) {
                    t.setUint8(s, t.getUint8(s) ^ e >>> s % 4 * 8 & 255);
                }
            } else {
                s = 0;
                for (; s < t.length; s++) {
                    t.writeUInt8(t.readUInt8(s) ^ e >>> s % 4 * 8 & 255, s);
                }
            }
            return t;
        } else {
            return t;
        }
    },
    /*
    'shiftMessage': function(t, e, i) {
        //if (window.disableIntegrity!=false){ //
        if (i)
            for (s = 0; s < t.length; s++) t.writeUInt8(t.readUInt8(s) ^ e >>> s % 4 * 8 & 255, s);
        else
            for (var s = 0; s < t.byteLength; s++) t.setUint8(s, t.getUint8(s) ^ e >>> s % 4 * 8 & 255);
        return t;
        //} //
        //else{ //
        //return t; //
        //} //
    },		*/
    //https://github.com/pierrec/node-lz4/blob/master/lib/binding.js
    'decompressMessage': function (message) {
        var buffer = new LMbuffer(message['buffer']);
        var readMessage = new LMbuffer(buffer.readUInt32LE(1));
        return ZTX.temp.a.decodeBlock(buffer.slice(5), readMessage), readMessage;
    },
    'handleMessage': function (data) {
        var i = function () {
                for (var e = ''; ;) {
                    var i = data.getUint8(s++);
                    if (0 == i) break;
                    e += String.fromCharCode(i);
                }
                return e;
            },
            s = 0,
            opcode = data.getUint8(s++);
        switch (54 == opcode && (opcode = 53), opcode) {


            case 5:
                console.log('[Legend mod Express] opcode: ', data.getUint8(0));
                window.testobjectsOpcode5 = data;
                break;
            case 17:
                window.testobjectsOpcode17 = data;
                var x = data.getFloat32(s, true);
                this.viewX = window.legendmod.vector[window.legendmod.vnr][0] ? this.translateX(x) : x;
                s += 4;
                var y = data.getFloat32(s, true);
                this.viewY = window.legendmod.vector[window.legendmod.vnr][1] ? this.translateY(y) : y;
                s += 4;
                this.scale = data.getFloat32(s, true);
                break;
            case 18:
                window.testobjectsOpcode18 = data;
                if (this.protocolKey) {
                    this.protocolKey = this.shiftKey(this.protocolKey);
                }
                this.flushCellsData();
                break;
            case 32:
                window.testobjectsOpcode32 = data;
                this.playerCellIDs.push(data.getUint32(s, true));
                if (!this.play) {
                    this.play = true;
                    ZTX.ogario.hideMenu();
                    this.playerColor = null;
                    ZTX.ogario.onPlayerSpawn();
                    window.userBots.isAlive = true;
                    if (window.userBots.startedBots) window.connectionBots.send(new Uint8Array([5, Number(window.userBots.isAlive)]).buffer);
                }
                break;
            case 50:
                window.testobjectsOpcode50 = data;
                this.pieChart = [];
                var a = data.getUint32(s, true);
                s += 4;
                for (var n = 0; n < a; n++) this.pieChart.push(data.getFloat32(s, true)), s += 4;
                ZTX.draw.drawPieChart();
                break;
            case 53:
                window.testobjectsOpcode53 = data;
                if (this.leaderboard = [], this.playerPosition = 0, 54 == data.getUint8(0)) {
                    data.getUint16(s, true);
                    s += 2;
                }
                for (var r = 0; s < data.byteLength;) {
                    var l = '';
                    var h = 0;
                    var c = false;
                    r++;
                    if (2 & (y = data.getUint8(s++))) {
                        l = window.decodeURIComponent(escape(i()));
                    }
                    if (4 & y) {
                        h = data.getUint32(s, true);
                        s += 4;
                    }
                    if (8 & y) {
                        l = this.playerNick;
                        h = 'isPlayer';
                        this.playerPosition = r
                    }
                    if (16 & y) {
                        c = true;
                    }
                    this.leaderboard.push({
                        'nick': l,
                        'id': h,
                        'isFriend': c
                    });
                }
                this.handleLeaderboard();
                break;
            case 54:
                console.log('[Legend mod Express] opcode: ', data.getUint8(0));
                window.testobjectsOpcode54 = data;
                break;
            case 69:
                window.testobjectsOpcode65 = data;
                var u = data.getUint16(s, true);
                s += 2, this.ghostCells = [];
                var max = 0; //Sonia3
                var mmax = 0; //Sonia3
                for (n = 0; n < u; n++) {
                    var d = data.getInt32(s, true);
                    s += 4;
                    var f = data.getInt32(s, true);
                    s += 4;
                    var m = data.getUint32(s, true);
                    s += 5;
                    var g = ~~Math.sqrt(100 * m);
                    this.ghostCells.push({
                        'x': window.legendmod.vector[window.legendmod.vnr][0] ? this.translateX(d) : d, //Sonia3
                        'y': window.legendmod.vector[window.legendmod.vnr][1] ? this.translateY(f) : f, //Sonia3
                        'size': g,
                        'mass': m,
                        'inView': this.isInView(d, f, g)
                    });
                    if (m > mmax) { //Sonia3
                        mmax = m; //Sonia3
                        max = n; //Sonia3
                    } //Sonia3
                }
                window.legendmod.bgpi = this.calculatebgpi(this.ghostCells[max].x, this.ghostCells[max].y); //Sonia3
                break;
            case 85:
                window.testobjectsOpcode85 = data;
                console.log('[Legend mod Express] Captcha requested');
                if (window.master && window.master.recaptchaRequested) {
                    if (window.smartbotslimited && legendmod5.autoResp) { //
                        core.connect(legendmod.ws);
                        setTimeout(function () {
                            legendmod3.autoResp();
                        }, 2000);
                    } else {
                        window.master.recaptchaRequested();
                    }
                }
                break;
            case 102:
                if (data.byteLength < 20) {
                    //this["loggedIn"] = ![];
                    //if (window["logout"]) {
                    //window["logout"]();
                    //}
                }
                if (data.buffer.byteLength > 1000) {
                    window.testobjects = data;
                    var sampleBytes = new Uint8Array(window.testobjects.buffer);
                    var enc = new TextDecoder();
                    window.testobjects2 = enc.decode(sampleBytes);
                    window.agarioUID = window.testobjects2.split('$')[1].substr(0, 36);
                    window.agarioID = window.testobjects2.split('$')[1].split('')[1].split('')[0].replace(/\s/g, "");
                    window.googlePic = "https" + window.testobjects2.split('https')[1].split('H')[0] + "H";

                    if (window.agarioUID != undefined) {
                        localStorage.setItem("agarioUID", window.agarioUID);
                        localStorage.setItem("agarioID", window.agarioID);
                    } else {
                        window.agarioUID = localStorage.getItem("agarioUID");
                        window.agarioID = localStorage.getItem("agarioID");
                    }
                }


                window.ret = new Node(data, s);

                var key_or_value = window.ret.readFlag();
                if (key_or_value == 1) {
                    window.ret.setContentType();
                }
                key_or_value = window.ret.readFlag();
                if (key_or_value == 2) {
                    window.ret.setUncompressedSize();
                }
                key_or_value = window.ret.readFlag();
                if (key_or_value == 1) {
                    var obj = window.ret.readUint32();
                    var previousState = window.ret.readFlag();
                    var artistTrack = window.ret.readUint32();
                    switch (obj) {
                        case 11:
                            console.log("[Legend mod Express] 102 Login response", window.ret.view.byteLength, window.ret.contentType, window.ret.uncompressedSize, obj, previousState, artistTrack);
                            break;
                        case 62:
                            console.log("[Legend mod Express] 102 Game over");
                            LegendModDeath();
                            //$('#pause-hud').text("PAUSE!");
                            break;
                        default:
                            console.log("[Legend mod Express] 102 Unknown", obj, previousState);
                    }
                }


            case 103:
                window.testobjectsOpcode103 = data;
                ZTX.agar["accessTokenSent"] = !![];
                break;
            case 112:
                console.log('[Legend mod Express] opcode: ', data.getUint8(0));
                window.testobjectsOpcode112 = data;
                break;
            case 114:
                console.log('[Legend mod Express] opcode: ', data.getUint8(0));
                window.testobjectsOpcode114 = data;
                break;
            case 161:
                //console.log('[Legend mod Express] opcode: ', data.getUint8(0));
                window.testobjectsOpcode161 = data;
                break;
            case 176:
                window.testobjectsOpcode176 = data;
                this.battleRoyale.startTime = data.getUint32(s, true);
                break;
            case 177:
                window.testobjectsOpcode177 = data;
                this.battleRoyale.joined = true;
                break;
            case 178:
                window.testobjectsOpcode178 = data;
                this.battleRoyale.players = data.getUint16(s, true),
                    s += 2;
                var y = data.getUint16(s, true);
                s += 2,
                y || (this.battleRoyale.state = 0, this.battleRoyale.joined = false),
                3 & y && (this.battleRoyale.state = data.getUint8(s++),
                    this.battleRoyale.x = data.getInt32(s, true),
                    s += 4,
                    this.battleRoyale.y = data.getInt32(s, true),
                    s += 4,
                    this.battleRoyale.radius = data.getUint32(s, true),
                    s += 4,
                    this.battleRoyale.shrinkTime = 1000 * data.getUint32(s, true),
                    s += 4,
                this.battleRoyale.shrinkTime &&
                (this.battleRoyale.timeLeft = ~~((this.battleRoyale.shrinkTime - Date.now() + this.serverTimeDiff) / 1000),
                this.battleRoyale.timeLeft < 0 && (this.battleRoyale.timeLeft = 0))),
                2 & y && (this.battleRoyale.targetX = data.getInt32(s, true),
                    s += 4,
                    this.battleRoyale.targetY = data.getInt32(s, true),
                    s += 4,
                    this.battleRoyale.targetRadius = data.getUint32(s, true));
                break;
            case 179:
                window.testobjectsOpcode179 = data;
                y = data.getUint8(s);
                window.decodeURIComponent(escape(i()));
                y || window.decodeURIComponent(escape(i()));
                break;
            case 180:
                window.testobjectsOpcode181 = data;
                this.battleRoyale.joined = false;
                this.battleRoyale.rank = [];
                this.battleRoyale.playerRank = data.getUint32(s, true);
                s += 8;
                var ogario1PlayerProfiles = data.getUint16(s, true);
                s += 2;
                for (n = 0; n < ogario1PlayerProfiles; n++) {
                    var ogarcopythelb = window.decodeURIComponent(escape(i())),
                        v = data.getUint32(s, true);
                    s += 4, this.battleRoyale.rank.push({
                        'place': defaultmapsettings,
                        'name': ogarcopythelb
                    });
                }
                break;
            case 226:
                window.testobjectsOpcode226 = data;
                var extraOptions = data.getUint16(1, !![]);
                data = this["createView"](3);
                data.setUint8(0, 227);
                data.setUint16(1, extraOptions);
                this["sendMessage"](data);
                break;
            case 241:
                window.testobjectsOpcode241 = data;
                this.protocolKey = data.getUint32(s, true);
                //window.testobjectsOpcode241.getUint32(1, true);
                console.log('[Legend mod Express] Received protocol key:', this.protocolKey);
                window.generatedProtocolKey = this.protocolKey;
                var irenderfromagario = new Uint8Array(data['buffer'], s += 4);
                this.clientKey = this['generateClientKey'](this.ws, irenderfromagario);
                //legendmod.generateClientKey("wss://live-arena-19y1u3v.agar.io:443",new Uint8Array(window.testobjectsOpcode241['buffer'], 5))
                if (window.master && window.master.login) {
                    window.master.login();
                }
                break;
            case 242:
                window.testobjectsOpcode242 = data;
                this.serverTime = 1000 * data.getUint32(s, true);
                this.serverTimeDiff = Date.now() - this.serverTime;
                break;
            case 255:
                window.testobjectsOpcode255 = data;
                this['handleSubmessage'](data);
                break;
            default:
                console.log('[Legend mod Express] Unknown opcode:', data.getUint8(0));
        }
    },
    'handleSubmessage': function (t) {
        var e = 0;
        switch ((t = this['decompressMessage'](t)).readUInt8(e++)) {
            case 16:
                this.updateCells(t, e);
                break;
            case 64:
                this.viewMinX = t.readDoubleLE(e);
                e += 8;
                this.viewMinY = t.readDoubleLE(e);
                e += 8;
                this.viewMaxX = t.readDoubleLE(e);
                e += 8;
                this.viewMaxY = t.readDoubleLE(e);
                this.setMapOffset(this.viewMinX, this.viewMinY, this.viewMaxX, this.viewMaxY);

                if (~~(this.viewMaxX - this.viewMinX) === 14142 && ~~(this.viewMaxY - this.viewMinY) === 14142) {
                    window.userBots.offsetX = (this.viewMinX + this.viewMaxX) / 2;
                    window.userBots.offsetY = (this.viewMinY + this.viewMaxY) / 2;
                }
                break;
            default:
                console.log('[Legend mod Express] Unknown sub opcode:', t.readUInt8(0));
        }
    },
    'handleLeaderboard': function () {
        /*                for (var t = '', e = '', i = 0; i < this.leaderboard.length && window.leaderboardlimit != i; i++) {
                            var s = '<span>';
                            'isPlayer' === this.leaderboard[i].id ? s = '<span class=\"me\">' : ogarcopythelb.clanTag.length && 0 == this.leaderboard[i].nick.indexOf(ogarcopythelb.clanTag) && (s = '<span class=\"teammate\">'), t += s + (i + 1) + '. ' + ZTX.ogario.escapeHTML(this.leaderboard[i].nick) + '</span>';
                        } */
        window.teammatenicks = [];
        window.teammatelegendmodnicks = [];
        if (legendmod3.top5) {
            for (i = 0; i < legendmod3.top5.length; i++) {
                window.teammatelegendmodnicks.push(legendmod3.top5[i].nick);
            }
        }
        window.teammatenicks = window.teammatelegendmodnicks;
        if (window.agartoolteammatenicks != undefined) {
            window.teammatenicks = window.teammatenicks.concat(window.agartoolteammatenicks);
        }
        for (var t = '', e = '', i = 0; i < this.leaderboard.length && window.leaderboardlimit != i; i++) {
            var s = '<span>';
            'isPlayer' === this.leaderboard[i].id ? s = '<span class=\"me\">' : ogarcopythelb.clanTag.length && 0 != window.teammatenicks.includes(this.leaderboard[i].nick) && (s = '<span class=\"teammate\">'), t += s + (i + 1) + '. ' + ZTX.ogario.escapeHTML(this.leaderboard[i].nick) + '</span>';
        }
        if (this.playerPosition > window.leaderboardlimit && (t += '<span class=\"me\">' + this.playerPosition + '. ' + ZTX.ogario.escapeHTML(this.playerNick) + '</span>'), defaultmapsettings['showLbData']) ;
        t += '<span class="me">' + Premadeletter130 + ': ' + this.leaderboard.length + '</span>';
        for (var o = 0; o < this.ghostCells.length && o != i; o++) {
            //
            var w = this.ghostCells[o].x;
            var u = this.ghostCells[o].y;
            /*
            w = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(this.ghostCells[o].x) : this.ghostCells[o].x;
            u = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(this.ghostCells[o].y) : this.ghostCells[o].y;
            */
            //
            e += '<span class=\"lb-data\" id= "' + 'leaderboardtargeting' + o + '" style="pointer-events: auto;" onclick="window.legendmod.targetingLead(' + o + ');">';
            e += '<span class=\"top5-mass-color\">[' + ZTX.ogario.shortMassFormat(this.ghostCells[o].mass) + ']</span>';
            //e += '<span class=\"hud-main-color\">[' + ZTX.ogario.calculateMapSector(this.ghostCells[o].x, this.ghostCells[o].y) + ']</span>', e += '</span>';
            e += '<span class=\"hud-main-color\">[' + ZTX.ogario.calculateMapSector(w, u) + ']</span>', e += '</span>';
        }
        ZTX.ogario['displayLeaderboard'](t, e);
        ///////////////// establish core.registerSkin
        if (window.vanillaskins == true) {
            if (window.customskinsname != null && window.customskinsname != undefined) {
                for (i = 0; i <= this.leaderboard.length - 1; i++) {
                    if (this.leaderboard[i].nick == window.customskinsname) {
                        ZTX.ogario.customSkinsMap[window.customskinsname] = window.customskinsurl;
                        ZTX.ogario.loadSkin(ZTX.ogario.customSkinsCache, window.customskinsurl);
                        window.customskinsname = undefined;
                    }
                }
            }
        }
        //if ($("#ao2t-capture").length && $("#ao2t-capture").hasClass("connected")) { //if existed and connected and visible
        for (var e = 0; e < legendmod.ghostCells.length; e++) {
            window.predictedGhostCells[e] = {};
            window.predictedGhostCells[e] = legendmod.ghostCells[e];
            window.predictedGhostCells[e].id = legendmod.leaderboard[e].id;
            window.predictedGhostCells[e].nick = legendmod.leaderboard[e].nick;
            window.predictedGhostCells[e].isFriend = legendmod.leaderboard[e].isFriend;
        }
        //}

    },
    'targetingLead': function (o) {
        window.targetingLeadX = legendmod.ghostCells[o].x;
        window.targetingLeadY = legendmod.ghostCells[o].y;
        legendmod.drawCommander2 = true;
    },
    'flushCellsData': function () {
        this.indexedCells = {},
            this.cells = [];
        this.playerCells = [];
        this.playerCellIDs = [];
        this.ghostCells = [];
        this.food = [];
        this.viruses = [];
    },
    'setMapOffset': function (t, e, i, s) {
        if (i - t > 14000 && s - e > 14000) {

            this.mapOffsetX = this.mapOffset - i;
            this.mapOffsetY = this.mapOffset - s;
            this.mapMinX = ~~(-this.mapOffset - this.mapOffsetX);
            this.mapMinY = ~~(-this.mapOffset - this.mapOffsetY);
            this.mapMaxX = ~~(this.mapOffset - this.mapOffsetX);
            this.mapMaxY = ~~(this.mapOffset - this.mapOffsetY);
            this.mapMidX = (this.mapMaxX + this.mapMinX) / 2; //Sonia3
            this.mapMidY = (this.mapMaxY + this.mapMinY) / 2; //Sonia3
            this.mapOffsetFixed || (this.viewX = (i + t) / 2, this.viewY = (s + e) / 2);
            this.mapOffsetFixed = true;
            console.log('[Legend mod Express] Map offset fixed: (', this.mapOffsetX, ',', this.mapOffsetY, ')');
        }
    },
    'isInView': function (t, e, i) {
        var s = this.canvasWidth / 2 / this.scale,
            o = this.canvasHeight / 2 / this.scale;
        //console.log("t:" + t + " e:" + e + " i:" + i  + " result:" + !(t + i < this.viewX - s || e + i < this.viewY - o || t - i > this.viewX + s || e - i > this.viewY + o));
        return !(t + i < this.viewX - s || e + i < this.viewY - o || t - i > this.viewX + s || e - i > this.viewY + o);
    },
    'vanillaskins': function (y, g) {
        if (g != null) {
            if (window.vanillaskins == true) {
                var skin2search = g.replace('%', '');
                if (window.LMAgarGameConfiguration != undefined) {
                    for (var player = 0; player < window.EquippableSkins.length; player++) {
                        if (window.EquippableSkins[player].productId == "skin_" + skin2search) {
                            //console.log("Player: " + y + " Color: " + EquippableSkins[player].cellColor + " Image: " + EquippableSkins[player].image + " SkinId: " + EquippableSkins[player].gameplayId + " Skins type: " + EquippableSkins[player].skinType);
                            if (ZTX.ogario.customSkinsMap[y] == undefined) {
                                if (window.EquippableSkins[player].image != "uses_spine") {

                                    if (legendflags.includes(LowerCase(y))) {
                                        console.log("[Legend mod Express] " + LowerCase(y) + " skin found. Skin registered");
                                        core.registerSkin(y, null, "https://jimboy3100.github.io/agario/live/flags/" + LowerCase(y) + ".png", null);
                                    } else {
                                        window.lastusednameforskin = y;
                                        ZTX.ogario.customSkinsMap[y] = "https://configs-web.agario.miniclippt.com/live/" + window.agarversion + window.EquippableSkins[player].image;
                                        ZTX.ogario.loadSkin(ZTX.ogario.customSkinsCache, "https://configs-web.agario.miniclippt.com/live/" + window.agarversion + window.EquippableSkins[player].image);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    //Sonia3 Adding three below functions
    'translateX': function (x) {
        return this.mapMaxX - (x - this.mapMinX);
    },
    'translateY': function (x) {
        return this.mapMaxY - (x - this.mapMinY);
    },
    'calculatebgpi': function (x, y) {
        var ofs = 150;
        var calc = (x < this.mapMidX + ofs && x > this.mapMidX - ofs) || (y < this.mapMidY + ofs && y > this.mapMidY - ofs) ? 4 : x >= this.mapMidX && y < this.mapMidY ? 0 : x < this.mapMidX && y < this.mapMidY ? 1 : x < this.mapMidX && y >= this.mapMidY ? 2 : 3;
        if ((window.legendmod.lbgpi == 4 || calc == 4 || window.legendmod.lbgpi == calc) && window.legendmod.delstate < 0) {
            window.legendmod.lbgpi = calc;
            return calc;
        } else if (window.legendmod.lbgpi != calc) {
            window.legendmod.delstate = 0;
            window.legendmod.lbgpi = calc;
            return 4;
        } else {
            window.legendmod.lbgpi = calc;
            return 4;
        }
    },
    //https://github.com/NuclearC/agar.io-protocol
    'updateCells': function (t, i) {
        var s = function () {
            for (var e = ''; ;) {
                var s = t.readUInt8(i++);
                if (0 == s) break;
                e += String.fromCharCode(s);
            }
            return e;
        };
        this.time = Date.now(), this.removePlayerCell = false;
        var o = t.readUInt16LE(i);
        i += 2;
        for (var a = 0; a < o; a++) {
            var n = this.indexedCells[t.readUInt32LE(i)],
                r = this.indexedCells[t.readUInt32LE(i + 4)];
            if (i += 8, n && r) {
                r.targetX = n.x;
                r.targetY = n.y;
                r.targetSize = r.size;
                r.time = this.time;
                r.removeCell();
            }
        }
//
        //legendmod3.sendJimboy3100info();
        fakePlayers();
//
        for (a = 0; ;) {
            extendedFlags = false;
            var l = t.readUInt32LE(i);
            if (i += 4, 0 == l) break;
            var h = t.readInt32LE(i);
            if (window.legendmod.vector[window.legendmod.vnr][0]) h = this.translateX(h); //Sonia3
            i += 4;
            var c = t.readInt32LE(i);
            if (window.legendmod.vector[window.legendmod.vnr][1]) c = this.translateY(c); //Sonia3
            i += 4;
            var u = t.readUInt16LE(i);
            i += 2;
            var d = t.readUInt8(i++),
                f = 0;
            128 & d && (f = t.readUInt8(i++), extendedFlags = true);
            //128 & d && (f = t.readUInt8(i++));
            var m = null,
                g = null,
                y = '',
                isAgitated = false,
                isOwnEjected = false,
                isOtherEjected = false;
            if (2 & d) { //offset
                var ogario1PlayerProfiles = t.readUInt8(i++),
                    ogarcopythelb = t.readUInt8(i++),
                    irenderfromagario = t.readUInt8(i++);
                m = this.rgb2Hex(~~(0.9 * ogario1PlayerProfiles), ~~(0.9 * ogarcopythelb), ~~(0.9 * irenderfromagario));
            }

            //4 & d && (g = s()),
            //8 & d && (y = window.decodeURIComponent(escape(s())));
            if (4 & d) {
                g = s();
                //						console.log('skin '+g);

            }
            if (8 & d) {
                y = window.decodeURIComponent(escape(s()));
                this.vanillaskins(y, g);
            }
            //Jimboy's
            if (16 & d) {
                isAgitated = true;
            }
            if (32 & d) {
                isOwnEjected = true;
            }
            if (64 & d) {
                isOtherEjected = true;
            }
            //
            //8 & d && (y = window.decodeURIComponent(escape(s())));
            var LM = 1 & d,
                ogarioset1final = 1 & f,
                ogariocellssetts = null;
            this.indexedCells.hasOwnProperty(l) ? (ogariocellssetts = this.indexedCells[l],
                m && (ogariocellssetts.color = m)) :
                ((ogariocellssetts = new ZTX.cell(l, h, c, u, m, ogarioset1final, LM, false, defaultmapsettings.shortMass, defaultmapsettings.virMassShots)).time = this.time,
                    ogarioset1final ? this.food.push(ogariocellssetts) :
                        (LM && defaultmapsettings.virusesRange && this.viruses.push(ogariocellssetts),
                            this.cells.push(ogariocellssetts),
                        -1 != this.playerCellIDs.indexOf(l) && -1 == this.playerCells.indexOf(ogariocellssetts) && (ogariocellssetts.isPlayerCell = true,
                            this.playerColor = m, this.playerCells.push(ogariocellssetts))),
                    this.indexedCells[l] = ogariocellssetts),
            ogariocellssetts.isPlayerCell && (y = this.playerNick),
            y && (ogariocellssetts.targetNick = y),
                ogariocellssetts.targetX = h,
                ogariocellssetts.targetY = c,
                ogariocellssetts.targetSize = u,
//                        ogariocellssetts.targetSize = u,
                ogariocellssetts.isFood = ogarioset1final,
                ogariocellssetts.isVirus = LM,
                //
                ogariocellssetts.isOwnEjected = isOwnEjected,
                ogariocellssetts.isOtherEjected = isOtherEjected,
                //
            g && (ogariocellssetts.skin = g),
            4 & f && (t.readUInt32LE(i), i += 4);
        }
        for (o = t.readUInt16LE(i), i += 2, a = 0; a < o; a++) {
            l = t.readUInt32LE(i);
            i += 4, (ogariocellssetts = this.indexedCells[l]) && ogariocellssetts.removeCell();
        }
        //Sonia7
        if (this.removePlayerCell && !this.playerCells.length) {
            this.play = false;
            ZTX.ogario.onPlayerDeath();
            ZTX.ogario.showMenu(300)
            window.userBots.isAlive = false
            if (window.userBots.startedBots) window.connectionBots.send(new Uint8Array([5, Number(window.userBots.isAlive)]).buffer)
        }
        //window.counterCell=0;
        if (window.autoPlay && legendmod.play) {
            calcTarget();
        }
        //if (window.historystate && legendmod.play) {historystate();}
    },
    'color2Hex': function (t) {
        var e = t.toString(16);
        return 1 == e.length ? '0' + e : e;
    },
    'rgb2Hex': function (t, e, i) {
        return '#' + this.color2Hex(t) + this.color2Hex(e) + this.color2Hex(i);
    },
    'sortCells': function () {
        this.cells.sort(function (t, e) {
            return t.size == e.size ? t.id - e.id : t.size - e.size;
        });
    },
    'calculatePlayerMassAndPosition': function () {
        for (var t = 0, e = 0, i = 0, s = 0, o = this.playerCells.length, a = 0; a < o; a++) {
            var n = this.playerCells[a];
            t += n.size;
            e += n.targetSize * n.targetSize;
            i += n.x / o;
            s += n.y / o;
        }
        this.viewX = i;
        this.viewY = s;
        this.playerSize = t;
        this.playerMass = ~~(e / 100);
        this.recalculatePlayerMass();
    },
    'recalculatePlayerMass': function () {
        if (this.playerScore = Math.max(this.playerScore, this.playerMass),
        defaultmapsettings.virColors || defaultmapsettings.splitRange || defaultmapsettings.oppColors || defaultmapsettings.oppRings || defaultmapsettings.showStatsSTE) {
            var t = this.playerCells;
            var e = t.length;
            t.sort(function (t, e) {
                return t.size == e.size ? t.id - e.id : t.size - e.size;
            });
            this.playerMinMass = ~~(t[0].size * t[0].size / 100);
            this.playerMaxMass = ~~(t[e - 1].size * t[e - 1].size / 100);
            this.playerSplitCells = e;
        }
        if (true) {
            var i = this.selectBiggestCell ? this.playerMaxMass : this.playerMinMass;
            // this.STE = i > 35 ? ~~(i * (i < 1000 ? 0.35 : 0.38)) : null; //Sonia2
            this.STE = Math.floor(i * 0.375); //Sonia2
            this.MTE = Math.floor(i * 0.75); //Sonia2
            this.BMTE = Math.ceil(i * 1.33); //Sonia2
            this.BSTE = Math.ceil(i * 2.66); //Sonia2
            this.TTE = Math.ceil(i / 6); //Sonia2
            this.PTE = Math.floor(i * 0.66); //Sonia2
        }
    },
    'compareCells': function () {
        if (this.play && (defaultmapsettings.oppColors || defaultmapsettings.oppRings || defaultmapsettings.splitRange)) {
            if (defaultmapsettings.oppRings || defaultmapsettings.splitRange) {
                this.biggerSTECellsCache = [];
                this.biggerCellsCache = [];
                this.smallerCellsCache = [];
                this.STECellsCache = [];
                this.biggerSTEDCellsCache = []; //Sonia
                this.STEDCellsCache = []; //Sonia
            }
            var t = 0;
            for (; t < this.cells.length; t++) {
                var e = this.cells[t];
                if (!e.isVirus) {
                    //console.log(i); i for food is 13
                    var i = ~~(e.size * e.size / 100);
                    if (i != 13) {
                        var s = this.selectBiggestCell ? this.playerMaxMass : this.playerMinMass;
                        var o = i / s;
                        var a = s < 1000 ? 0.35 : 0.38;
                        if (defaultmapsettings.oppColors && !defaultmapsettings.oppRings) {

                            e.oppColor = this.setCellOppColor(e.isPlayerCell, o, a);

                        }
                        if (!(e.isPlayerCell || !defaultmapsettings.splitRange && !defaultmapsettings.oppRings)) {
                            this.cacheCells(e.x, e.y, e.size, o, a);
                        }
                    }
                }
            }
        }
    },
    /*'cacheCells': function(t, e, i, s, o) {
        return s >= 2.5 ? void this.biggerSTECellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s >= 1.25 ? void this.biggerCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s < 1.25 && s > 0.75 ? void 0 : s > o ? void this.smallerCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : void this.STECellsCache.push({
            'x': t,
            'y': e,
            'size': i
        });
    },*/
    //Sonia (entire function updated) // this is great :D
    'cacheCells': function (t, e, i, s, o) {
        return s >= 5.32 ? void this.biggerSTEDCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s >= 2.66 ? void this.biggerSTECellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s >= 1.33 ? void this.biggerCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s < 1.33 && s > 0.75 ? void 0 : s > 0.375 ? void this.smallerCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : s > 0.1875 ? void this.STECellsCache.push({
            'x': t,
            'y': e,
            'size': i
        }) : void this.STEDCellsCache.push({
            'x': t,
            'y': e,
            'size': i
        });
    },
    'setCellOppColor': function (t, e, i) {
        //return t ? ogarcopythelb.color : e > 11 ? '#FF008C' : e >= 2.5 ? '#BE00FF' : e >= 1.25 ? '#FF0A00' : e < 1.25 && e > 0.75 ? '#FFDC00' : e > i ? '#00C8FF' : '#64FF00';
        //return t ? ogarcopythelb.color : e > 10.64 ? defaultSettings.enemyBSTEDColor : e >= 5.32 ? defaultSettings.enemyBSTEDColor : e >= 2.66 && e <= 5.32 ? defaultSettings.enemyBSTEColor : e >= 1.33 && e <= 2.66 ? defaultSettings.enemyBColor : e < 1.33 && e > 0.75 ? '#FFDC00' : e < 0.75 && e > 0.375 ? defaultSettings.enemySSTEDColor : e > i ? '#00C8FF' : defaultSettings.enemySSTEColor; //Sonia
        return t ? ogarcopythelb.color : e >= 10.64 ? defaultSettings.enemyBSTEDColor : e >= 5.32 ? defaultSettings.enemyBSTEDColor : e >= 2.66 ? defaultSettings.enemyBSTEColor : e >= 1.33 ? defaultSettings.enemyBColor : e > 0.75 ? '#FFDC00' : e > 0.375 ? defaultSettings.enemySColor : e > 0.1875 ? defaultSettings.enemySSTEColor : defaultSettings.enemySSTEDColor;
    },
    'getCursorPosition': function () {
        this.cursorX = (this.clientX - this.canvasWidth / 2) / this.viewScale + this.viewX;
        this.cursorY = (this.clientY - this.canvasHeight / 2) / this.viewScale + this.viewY;
    },
    'setZoom': function (t) {
        //t.preventDefault(), this.zoomValue *= Math.pow(defaultmapsettings.zoomSpeedValue2, t.wheelDelta / -120 || t.detail || 0), this.zoomValue > 4 / this.viewScale && (this.zoomValue = 4 / this.viewScale);
        this.zoomValue *= Math.pow(defaultmapsettings.zoomSpeedValue2 + 1, t.wheelDelta / -120 || t.detail || 0);
        if (this.zoomValue > 4 / this.viewScale) {
            this.zoomValue = 4 / this.viewScale;
        }
    },
    'setTargetPosition': function (t, e) {
        this.targetX = t - this.mapOffsetX;
        this.targetY = e - this.mapOffsetY;
        this.targetDistance = Math.round(Math.sqrt(Math.pow(this.playerX - this.targetX, 2) + Math.pow(this.playerY - this.targetY, 2)));
        window.targetDistance = this.targetDistance;
    },
    'resetTargetPosition': function () {
        this.targetX = this.vector[this.vnr][0] ? this.translateX(this.playerX) : this.playerX;
        this.targetY = this.vector[this.vnr][1] ? this.translateY(this.playerY) : this.playerY;
    },
    'setKeys': function () {
        var t = this;
        document.onkeydown = function (e) {
            var i = e.keyCode;
            if (!t.pressedKeys[i]) switch (i) {
                case 13:
                    t.sendNick('');
                    break;
                case 32:
                    t.sendSplit();
                    break;
                case 81:
                    t.sendFreeSpectate();
                    break;
                case 83:
                    t.sendSpectate();
                    break;
                case 87:
                    t.sendEject();
            }
        }, document.onkeyup = function (e) {
            t.pressedKeys[e.keyCode] = false;
        };
    },
    'init': function () {
        var t = this;
        /firefox/i.test(navigator.userAgent) ? document.addEventListener('DOMMouseScroll', function (e) {
            t.setZoom(e);
        }, false) : document.body.onmousewheel = function (e) {
            t.setZoom(e);
        }, setInterval(function () {
            t.sendPosition();
        }, 40), window.master && window.master.clientVersion && this.setClientVersion(window.master.clientVersion, window.master.clientVersionString);
    }
};