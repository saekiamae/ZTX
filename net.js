ZTX.ogario = {
    'name': 'LM express',
    'version': 'v1',
    'privateMode': false,
    'protocolMode': true,
    'publicIP': 'wss://srv.ogario.eu',
    'privateIP': null,
    'updateInterval': 1000,
    'updateTick': 0,
    'updateMaxTick': 2,
    'currentSector': '',
    'miniMap': null,
    'miniMapCtx': null,
    'miniMapSectors': null,
    'pi2': 2 * Math.PI,
    'socket': null,
    'cells': {},
    'teamPlayers': [],
    'parties': [],
    'chatHistory': [],
    'chatUsers': {},
    'chatMutedUsers': {},
    'chatMutedUserIDs': [],
    'customSkinsCache': {},
    'customSkinsMap': {},
    'cacheQueue': [],
    'deathLocations': [],
    'playerID': null,
    'playerMass': 0,
    'selectedProfile': 0,
    'lastDeath': 0,
    'skipServerData': false,
    'gameMode': ':ffa',
    'region': '',
    'partyToken': '',
    'ws': '',
    'serverIP': '',
    'serverArena': '',
    'serverToken': '',
    'lastSentNick': '',
    'lastSentClanTag': null,
    'lastSentSkinURL': '',
    'lastSentCustomColor': '',
    'lastSentPartyToken': '',
    'lastSentServerToken': '',
    'lastMessageSentTime': Date.now(),
    'rFps': 0,
    'renderedFrames': 0,
    'fpsLastRequest': null,
    'statsHUD': null,
    'leaderboardPositionsHUD': null,
    'leaderboardDataHUD': null,
    'activeParties': null,
    'top5pos': null,
    'top5totalMass': null,
    'top5totalPlayers': null,
    'top5limit': 5,
    'timeHUD': null,
    'questHUD': null,
    'retryResp': 0,
    'token': 'b2dhcmlvLm92aA==',
    'canvasScale': 1,
    'selectBiggestCell': true,
    'noColors': false,
    'skipStats': false,
    'showQuest': false,
    'showSplitInd': false,
    'pause': false,
    'targetID': 0,
    'targetStatus': 0,
    'targetNick': '',
    'targetSkinURL': '',
    'targeting': false,
    'privateMiniMap': false,
    'messageSound': null,
    'commandSound': null,
    'virusSound': null,
    'virusSoundurl': null,
    'feedInterval': null,
    'getPlayerX': function () {
        return ZTX.active.playerX + ZTX.active.mapOffsetX;
    },
    'getPlayerY': function () {
        return ZTX.active.playerY + ZTX.active.mapOffsetY;
    },
    'feed': function () {
        if (window.core && window.core.eject) {
            window.core.eject();
        }
    },
    'macroFeed': function (t) {
        if (t) {
            if (this.feedInterval) return;
            var e = this;
            this.feed(), this.feedInterval = setInterval(function () {
                e.feed();
            }, 80);
        } else if (this.feedInterval) {
            clearInterval(this.feedInterval);
            this.feedInterval = null
        }
        ;
    },
    'split': function () {
        window.core && window.core.split && window.core.split();
    },
    'doubleSplit': function () {
        var t = this;
        t.split();
        setTimeout(function () {
            t.split();
        }, 40);
    },
    'popSplit': function () {
        var t = this;
        t.split();
        setTimeout(function () {
            t.split();
        }, 200);
    },
    'split16': function () {
        var t = this;
        t.split();
        setTimeout(function () {
            t.split();
        }, 40);
        setTimeout(function () {
            t.split();
        }, 80);
        setTimeout(function () {
            t.split();
        }, 120);
    },
    'toggleSkins': function () {
        ZTX.active.vanillaSkins && ZTX.active.customSkins ? ZTX.active.vanillaSkins = false : !ZTX.active.vanillaSkins && ZTX.active.customSkins ? (ZTX.active.vanillaSkins = true, ZTX.active.customSkins = false) : (ZTX.active.vanillaSkins = true, ZTX.active.customSkins = true);
    },
    'toggleCells': function () {
        this.selectBiggestCell = !this.selectBiggestCell,
            ZTX.active.selectBiggestCell = this.selectBiggestCell;
    },
    'setShowTop5': function () {
        defaultmapsettings.showTop5 = !defaultmapsettings.showTop5, this.setTop5();
    },
    'setTop5': function () {
        defaultmapsettings.showTop5 ? $('#top5-hud').show() : $('#top5-hud').hide();
    },
    'setShowTargeting': function () {
        defaultmapsettings.showTargeting = !defaultmapsettings.showTargeting, this.setTargetingHUD();
    },
    'setTargetingHUD': function () {
        defaultmapsettings.showTargeting ? $('#target-hud, #target-panel-hud').show() : $('#target-hud, #target-panel-hud').hide();
    },
    'setShowTime': function () {
        defaultmapsettings.showTime = !defaultmapsettings.showTime, defaultmapsettings.showTime ? ($('#time-hud').show(), this.displayTime()) : $('#time-hud').hide();
    },
    'setShowSplitRange': function () {
        defaultmapsettings.splitRange = !defaultmapsettings.splitRange, ZTX.active.splitRange = defaultmapsettings.splitRange;
    },
    'setShowGhostCellsInfo': function () {
        if (defaultmapsettings.showGhostCells == false || defaultmapsettings.showGhostCellsInfo == false) {
            defaultmapsettings.showGhostCellsInfo = true;
            defaultmapsettings.showGhostCells = true;
        } else {
            defaultmapsettings.showGhostCellsInfo = false;
            defaultmapsettings.showGhostCells = false;
        }

    },
    'setAutoPlay': function () {
        if (legendmod.pause) {
            ogarminimapdrawer && ogarminimapdrawer.setPause()
        }
        ;
        if (window.autoPlay == false) {
            window.autoPlay = true;
            $('#pause-hud').text("AI (Striker & Jimboy3100) SkyNet v0.06");
            $('#pause-hud').show();
        } else {
            window.autoPlay = false;
            $('#pause-hud').text(ZTX.cl.pause);
            $('#pause-hud').hide();
        }
    },
    'setShowSplitInd': function () {
        this.showSplitInd = !this.showSplitInd,
            defaultmapsettings.splitRange = this.showSplitInd,
            defaultmapsettings.oppRings = this.showSplitInd,
            ZTX.active.splitRange = defaultmapsettings.splitRange,
            ZTX.active.oppRings = defaultmapsettings.oppRings;
    },
    'setShowTeammatesInd': function () {
        defaultmapsettings.teammatesInd = !defaultmapsettings.teammatesInd;
    },
    'setShowOppColors': function () {
        defaultmapsettings.oppColors = !defaultmapsettings.oppColors, ZTX.active.oppColors = defaultmapsettings.oppColors;
    },
    'setShowSkins': function () {
        this.noSkins = !this.noSkins,
        window.core && window.core.setSkins && window.core.setSkins(!this.noSkins),
            ZTX.active.showCustomSkins = !this.noSkins,
            this.displayChatInfo(!this.noSkins, 'showSkinsMsg');
    },
    'setTransparentSkins': function () {
        defaultmapsettings.transparentSkins = !defaultmapsettings.transparentSkins,
            ZTX.active.transparentSkins = defaultmapsettings.transparentSkins;
    },
    'setShowStats': function () {
        $('#stats-hud').toggle();
    },
    'setShowFood': function () {
        ZTX.active.showFood = !ZTX.active.showFood;
    },
    'setShowHUD': function () {
        $('#overlays-hud').toggle();
    },
    'setShowGrid': function () {
        defaultmapsettings.showGrid = !defaultmapsettings.showGrid;
    },
    'setShowMiniMapGuides': function () {
        defaultmapsettings.showMiniMapGuides = !defaultmapsettings.showMiniMapGuides;
    },
    'setShowLb': function () {
        ':teams' !== this.gameMode && $('#leaderboard-hud').toggle();
    },
    'setShowBgSectors': function () {
        defaultmapsettings.showBgSectors = !defaultmapsettings.showBgSectors;
    },
    'setHideSmallBots': function () {
        ZTX.active.hideSmallBots = !ZTX.active.hideSmallBots,
            this.displayChatInfo(!ZTX.active.hideSmallBots, 'hideSmallBotsMsg');
    },
    'setShowNames': function () {
        defaultmapsettings.noNames = !defaultmapsettings.noNames;
    },
    'setHideTeammatesNames': function () {
        defaultmapsettings.hideTeammatesNames = !defaultmapsettings.hideTeammatesNames;
    },
    'setShowMass': function () {
        defaultmapsettings.showMass = !defaultmapsettings.showMass;
    },
    'setShowMiniMap': function () {
        defaultmapsettings.showMiniMap = !defaultmapsettings.showMiniMap, this.setMiniMap();
    },
    'setMiniMap': function () {
        defaultmapsettings.showMiniMap ? $('#minimap-hud').show() : $('#minimap-hud').hide();
    },
    'setShowQuest': function () {
        ':ffa' === this.gameMode && (this.showQuest = !this.showQuest, this.setQuest());
    },
    'setQuest': function () {
        this.showQuest && ':ffa' === this.gameMode ? $('#quest-hud').show() : $('#quest-hud').hide();
    },
    'toggleAutoZoom': function () {
        ZTX.active.autoZoom = !ZTX.active.autoZoom, this.displayChatInfo(ZTX.active.autoZoom, 'autoZoomMsg');
    },
    'resetZoom': function (t) {
        t ? (ZTX.active.zoomResetValue = 1, ZTX.active.zoomValue = 1) : ZTX.active.zoomResetValue = 0;
    },
    'setZoom': function (t) {
        ZTX.active.zoomValue = t;
    },
    'toggleDeath': function () {
        this.lastDeath--;
        if (this.lastDeath < 0) {
            this.lastDeath = this.deathLocations.length - 1;
        }
    },
    'tryResp': function () {
        if (ZTX.active.play || 20 == this.retryResp) this.retryResp = 0;
        else {
            this.retryResp++;
            var t = this;
            setTimeout(function () {
                $('.btn-play-guest').is(':visible') ? $('.btn-play-guest').click() : $('.btn-play').click(), ZTX.active.play || t.tryResp();
            }, 500);
        }
    },
    'quickResp': function () {
        if (defaultmapsettings.quickResp) {
            this.hideMenu();
            this['gameServerConnect'](this.ws);
            ZTX.active.play = false;
            this.tryResp();
        }
    },
    'autoResp': function () {
        defaultmapsettings.autoResp && (this.setAutoResp(),
            $('#overlays').stop().hide(),
            $('.btn-play-guest').is(':visible') ? $('.btn-play-guest').click() : $('.btn-play').click());
    },
    'setAutoResp': function () {
        defaultmapsettings.autoResp && ($('#skipStats').prop('checked') || ($('#skipStats').click(), this.skipStats = true));
    },
    'toggleAutoResp': function () {
        defaultmapsettings.autoResp = !defaultmapsettings.autoResp, this.setAutoResp(), this.displayChatInfo(defaultmapsettings.autoResp, 'autoRespMsg');
    },
    'copyLb': function () {
        var t = $('<input>');
        $('body').append(t);
        t.val($('#leaderboard-positions').text()).select();
        try {
            document.execCommand('copy');
        } catch (ogarcopierlbcather) {
        }
        t.remove();
    },
    'setPause': function () {
        if (window.autoPlay) {
            ogarminimapdrawer && ogarminimapdrawer.setAutoPlay()
        }
        ;
        this.pause = !this.pause, ZTX.active.pause = this.pause, this.pause ? (ZTX.active.resetTargetPosition(), $('#pause-hud').text(ZTX.cl.pause), $('#pause-hud').show()) : $('#pause-hud').hide();
    },
    'setCenteredLb': function () {
        defaultmapsettings.centeredLb ? $('#leaderboard-hud').addClass('hud-text-center') : $('#leaderboard-hud').removeClass('hud-text-center');
    },
    'setNormalLb': function () {
        defaultmapsettings.normalLb ? $('#leaderboard-hud h5').html(ZTX.cl.leaderboard) : $('#leaderboard-hud h5').html('legendmod');
    },
    'setFpsAtTop': function () {
        defaultmapsettings.fpsAtTop ? $('#stats-hud').removeClass('hud-bottom').addClass('hud-top') : $('#stats-hud').removeClass('hud-top').addClass('hud-bottom');
    },
    'setBlockPopups': function () {
        this.protocolMode ? $('#block-warn').hide() : defaultmapsettings["blockPopups"] ? this["blockPopups"]() : this.unblockPopups();
    },
    'blockPopups': function () {
        $('#openfl-content, #openfl-overlay').hide();
        $('#openfl-content, #openfl-overlay').addClass('block-popups');
        $('#freeCoins, #gifting, #openShopBtn, #dailyQuests').prop('disabled', true);
        $('#block-warn').show();
    },
    'unblockPopups': function () {
        $('#openfl-overlay.disabler').click();
        $('#openfl-content, #openfl-overlay').hide();
        $('#openfl-content, #openfl-overlay').removeClass('block-popups');
        $('#freeCoins, #gifting, #openShopBtn, #dailyQuests').prop('disabled', false);
        $('#block-warn').hide();
    },
    'tempUnblockPopups': function () {
        if (defaultmapsettings["blockPopups"]) {
            this.unblockPopups();
        }
    },
    'displayLeaderboard': function (t, e = '') {
        if (this.leaderboardPositionsHUD) {
            this.leaderboardPositionsHUD.innerHTML = t;
            if (defaultmapsettings.showLbData) {
                this.leaderboardDataHUD.innerHTML = e;
            } else {
                this.leaderboardDataHUD.innerHTML = '';
            }
        }

    },
    'displayStats': function () {
        if (defaultmapsettings.showStats) {
            var t = '';
            if (ZTX.active.play) {
                if (defaultmapsettings.showStatsMass && ZTX.active.playerMass) {
                    //t += h.mass + ': ' + i.playerMass + ' | '
                    t += Languageletter366 + ': ' + ZTX.active.playerMass + ' | '
                }
                if (ZTX.active.playerScore) {
                    //t += h.score + ': ' + i.playerScore
                    t += Languageletter49 + ': ' + ZTX.active.playerScore
                }
                if (defaultmapsettings.showStatsN16 && ZTX.active.playerSplitCells) {
                    t += ' | ' + ZTX.active.playerSplitCells + '/16'
                }
                if (defaultmapsettings.showStatsESTE && ZTX.active.BSTE) {
                    t += ' | ◎◎➛◉: ' + ZTX.active.BSTE //Sonia6
                }
                if (defaultmapsettings.showStatsEMTE && ZTX.active.BMTE) {
                    t += ' | ◎➛◉: ' + ZTX.active.BMTE //Sonia6
                }
                if (defaultmapsettings.showStatsMTE && ZTX.active.MTE) {
                    t += ' | ◉➛◎: ' + ZTX.active.MTE //Sonia6
                }
                if (defaultmapsettings.showStatsSTE && ZTX.active.STE) {
                    t += ' | ◉◉➛◎: ' + ZTX.active.STE //Sonia6
                }
                if (defaultmapsettings.showStatsTTE && ZTX.active.TTE) {
                    t += ' | ◉➚◉: ' + ZTX.active.TTE //Sonia6
                }
                if (defaultmapsettings.showStatsPTE && ZTX.active.PTE) {
                    t += ' | ➚◎➘: ' + ZTX.active.PTE //Sonia6
                }
                if (defaultmapsettings.showStatsFPS) {
                    t += ' | '
                }
            }
            if (defaultmapsettings.showStatsFPS) {
                t += 'FPS: ' + ZTX.draw.fps;
            }
            this.statsHUD.textContent = t;
            var e = this;
            setTimeout(function () {
                e.displayStats();
            }, 250);
        } else $('#stats-hud').hide();
    },
    'displayTime': function () {
        if (defaultmapsettings.showTime) {
            var t = new Date().toLocaleString();
            this.timeHUD.textContent = t;
            var e = this;
            setTimeout(function () {
                e.displayTime();
            }, 1000);
        } else $('#time-hud').hide();
    },
    'displayParties': function () {
        for (var t = '', e = 0; e < this.parties.length; e++) t += '<li><a href=\"https://agar.io/#' + this.parties[e] + '\" onclick=\"$(\'#party-token\').val(\'' + this.parties[e] + '\'); $(\'#join-party-btn-2\').click();\">https://agar.io/#' + this.parties[e] + '</a></li>';
        this.activeParties.className = '' === t ? 'no-parties' : '',
            this.activeParties.innerHTML = t;
    },
    /*
                'displayTop5': function() {
                    if (defaultmapsettings.showTop5) {
                        //console.log(.top5.length);
                        //console.log(.teamPlayers.length);
                        for (var t = '', e = 0, s = this.top5.length, o = 0; o < s; o++) e += this.top5[o].mass, o >= this['top5limit'] || (t += '<li><span class=\"cell-counter\" style=\"background-color: ' + this.top5[o].color + '\">' + (o + 1) + '</span>', defaultmapsettings.showTargeting && (t += '<a href=\"#\" data-user-id=\"' + this.top5[o].id + '\" class=\"set-target ogicon-target\"></a> '), t += '<span class=\"hud-main-color\">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + ']</span>', t += 					'<span class=\"top5-mass-color\">[' + this.shortMassFormat(this.top5[o].mass) + ']</span> ' + this.escapeHTML(this.top5[o].nick) + '</li>');
                        this['top5pos'].innerHTML = t, i.play && i.playerMass && (e += i.playerMass, s++), this.top5totalMass.textContent= this.shortMassFormat(e), this.top5totalPlayers.textContent= s;
                    }
                },
                'setTop5limit': function(t) {
                    t && (this['top5limit'] = t);
                },

            "displayTop5" : function() {
              if (defaultmapsettings.showTop5) {
                var pix_color = "";
                var bufferString = 0;
                var PL$29 = this.top5.length;
                var entityType = 0;
                for (; entityType < PL$29; entityType++) {
                  bufferString = bufferString + this.top5[entityType].mass;
                  if (!(entityType >= defaultmapsettings["limTP"])) {
                    pix_color = pix_color + ('<li id="player"><span id="pos-skin" style="background-color: ' + this.top5[entityType].color + '; width: 30px; height:30px; display: inline-block;"><img style="position: absolute; margin-left: 2px; margin-top: 2px; width: 26px; height:26px; display: inline-block;"  src = ' + (this.top5[entityType]["skin"] ? this.top5[entityType]["skin"] : "https://jimboy3100.github.io/banners/icon32croped.ico.gif") + '" alt=""> ' +
                    '<span class=\"top5-mass-color\">[' + this.shortMassFormat(this.top5[entityType].mass) + ']</span> ' + this.escapeHTML(this.top5[entityType].nick) + '</span><span class=\"hud-main-color\">[' + this.calculateMapSector(this.top5[entityType].x, this.top5[entityType].y) +']</span><span id= "top5mass" class=""> ' +
                    this.shortMassFormat(this.top5[entityType].mass) + '</span></li>');
                  }
                }
                this.top5pos.innerHTML = pix_color;
                if (i["play"] && i.playerMass) {
                  bufferString = bufferString + i.playerMass;
                  PL$29++;
                }
                this.top5totalMass.textContent= this.shortMassFormat(bufferString);
                this.top5totalPlayers.textContent= PL$29;
              }
            },
    */
    'displayTop5': function () {
        if (window.top5skins != true) {
            if (defaultmapsettings.showTop5) {
                //console.log(.top5.length);
                //console.log(.teamPlayers.length);
                for (var t = '', e = 0, s = this.top5.length, o = 0; o < s; o++) {
                    e += this.top5[o].mass;
                    if (!(o >= window.teamboardlimit && this.top5[o].mass > 1)) {
                        t = t + '<li style=\"height: 16px;"\><span>' + (o + 1) + '. </span>';
                        defaultmapsettings.showTargeting && (t += '<a href=\"#\" data-user-id=\"' + this.top5[o].id + '\" class=\"set-target ogicon-target\"></a> ');
                        //
                        this.w = this.top5[o].x;
                        this.u = this.top5[o].y;
                        /*
                        this.w = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(this.top5[o].x) : this.top5[o].x;
                        this.u = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(this.top5[o].y) : this.top5[o].y;
                        */
                        //
                        //t += '<span class=\"hud-main-color\">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + ']</span>',
                        t += '<span class=\"hud-main-color\">[' + this.calculateMapSector(this.w, this.u) + ']</span>';
                        t += '<span class=\"top5-mass-color\">[' + this.shortMassFormat(this.top5[o].mass) + ']</span> ' + this.escapeHTML(this.top5[o].nick) + '</li>';
                    }
                    this['top5pos'].innerHTML = t,
                    ZTX.active.play && ZTX.active.playerMass && (e += ZTX.active.playerMass, s++),
                        this.top5totalMass.textContent = this.shortMassFormat(e),
                        this.top5totalPlayers.textContent = s;
                }
            }
        } else {
            if (defaultmapsettings.showTop5) {


                //temp
                var tempTime = new Date().getTime();
                Object.getOwnPropertyNames(legendmod3.teamPlayers).forEach(function (element) {
                    if (legendmod3.teamPlayers && legendmod3.teamPlayers[element] && legendmod3.teamPlayers[element].lbgpi == -2 && legendmod3.teamPlayers[element].mass > 1) {
                        //console.log(legendmod3.teamPlayers[element].lastUpdatedTime, tempTime);
                        if (legendmod3.teamPlayers[element].lastUpdatedTime && ((legendmod3.teamPlayers[element].lastUpdatedTime) - tempTime < 6000)) {
                            legendmod3.teamPlayers[element].mass = 1;
                            legendmod3.teamPlayers[element].alive = false;
                        } else {

                            legendmod3.top5.push(legendmod3.teamPlayers[element]);
                        }
                    }
                });
                //
                var t = "";
                var e = 0;
                var s = this.top5.length;
                var o = 0;
                for (; o < s; o++) {
                    e = e + this.top5[o].mass;
                    if (!(o >= window.teamboardlimit && this.top5[o].mass > 1)) {
                        t = t + ('<li><a href="#" id="pos-skin" class= "set-target" data-user-id="' + this.top5[o].id + '"style="background-color: ' + this.top5[o].color + '; width: 30px; height:30px; display: inline-block;"><img style="position: absolute; margin-left: 2px; margin-top: 2px; width: 26px; height:26px; display: inline-block;"  src = ' + (this.top5[o]["skin"] ? this.top5[o]["skin"] : "https://jimboy3100.github.io/banners/icon32croped.ico.gif") + ' alt=""> ' + '</a><div style="margin-top: -30px; margin-left: 32px;">');
                        /* if (defaultmapsettings["showTargeting"]) {
                          t = t + ('<a href="#" data-user-id="' + this.top5[o].id + '" class="set-target ogicon-target"></a> ');
                        } */
                        var flag = false;
                        for (var e = 0; e < legendmod.ghostCells.length; e++) {
                            if (legendmod.leaderboard[e] && this.top5[o].nick == legendmod.leaderboard[e].nick) {
                                if (flag == false && window.predictedGhostCells[e]) {
                                    //
                                    var w = window.predictedGhostCells[e].x;
                                    var u = window.predictedGhostCells[e].y;
                                    /*
                                    w = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(window.predictedGhostCells[e].x) : window.predictedGhostCells[e].x;
                                    u = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(window.predictedGhostCells[e].y) : window.predictedGhostCells[e].y;
                                    */
                                    //
                                    //t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(window.predictedGhostCells[e].x, window.predictedGhostCells[e].y) + "]</span>");
                                    t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(w, u) + "]</span>");
                                    flag = true;
                                }
                            }
                        }
                        if (flag == false && this.top5[o].lbgpi >= 0) {
                            t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + "]</span>");
                        } else if (flag == false && (this.calculateMapSector(this.top5[o].x, this.top5[o].y) == "C3" || legendmod.gameMode == ":party")) {
                            t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + "]</span>");
                        }
                        //temporary socket 3
                        else if (flag == false && this.top5[o].lbgpi == -2) {
                            if (this.top5[o].temp == true) {
                                t = t + ('<span class="hud-main-color">[' + 'Temp. Socket' + "]</span>");
                            } else {
                                t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + "]</span>");
                            }
                        }
                        //t = t + ('<span class="hud-main-color">[' + this.calculateMapSector(this.top5[o].x, this.top5[o].y) + "]</span>");
                        t = t + ('<span class="top5-mass-color">[' + this.shortMassFormat(this.top5[o].mass) + "]</span> " + this.escapeHTML(this.top5[o].nick) + "</div></li>");
                    }
                }
                this.top5pos.innerHTML = t;
                if (ZTX.active.play && ZTX.active.playerMass) {
                    e = e + ZTX.active.playerMass;
                    s++;
                }
                this.top5totalMass.textContent = this.shortMassFormat(e);
                this.top5totalPlayers.textContent = s;
            }
        }
    },
    /*
                'setTop5limit': function(t) {
                    t && (this['top5limit'] = t);
                },
                "setTop5limit": function(canCreateDiscussions) {
                    if (canCreateDiscussions) {
                        this["top5limit"] = canCreateDiscussions;
                    }
                }, */

    'displayChatHistory': function (t) {
        if (t) {
            this.clearChatHistory(!0);
            for (var e = 0; e < this.chatHistory.length; e++) $('#messages').append('<li><span class=\"message-nick\">' + this.chatHistory[e].nick + ': </span><span class=\"message-text\">' + this.chatHistory[e].message + '</span></li>');
        } else this.clearChatHistory(!1);
    },
    'clearChatHistory': function (t) {
        $('#messages').empty(), t && (toastr['clear'](), defaultmapsettings.showChatBox && ($('#chat-box .message').remove(), this.chatHistory.length = 0));
    },
    'displayChatInfo': function (t, e) {
        t ? toastr.info(ZTX.cl[e + 'A']) : toastr.error(ZTX.cl[e + 'B']);
    },
    'setDisableChat': function () {
        defaultmapsettings.hideChat = defaultmapsettings.disableChat;
        this.setHideChat();
    },
    'hideChat': function () {
        defaultmapsettings.hideChat = !defaultmapsettings.hideChat, this.setHideChat(), this.displayChatInfo(!defaultmapsettings.hideChat, 'hideChatMsg');
    },
    'setHideChat': function () {
        if (defaultmapsettings.hideChat) {
            $('#message-box').hide();
        }
        this.setShowChatBox();
    },
    'setShowChatBox': function () {
        !defaultmapsettings.hideChat && defaultmapsettings.showChatBox ? $('#chat-box').show() : $('#chat-box').hide();
    },
    'enterChatMessage': function () {
        var t = $('#message-box');
        var e = $('#message');
        if (t.is(':visible')) {
            var o = e.val();
            o.length ? (this['sendChatMessage'](101, o), ZTX.active.play && (e.blur(), t.hide())) : (e.blur(), t.hide()), e.val('');
        } else {
            t.show();
            e.focus();
            e.val('');
        }
    },
    'showMenu': function (t) {
        if (window.MC && window.MC.showNickDialog) return $('.ogario-menu').show(), $('.menu-panel').hide(), ZTX.active.play || this.skipStats ? $('#main-panel').show() : $('#stats').show(), window.MC.showNickDialog(300), $('#oferwallContainer').is(':visible') && window.closeOfferwall(), void ($('#videoContainer').is(':visible') && window.closeVideoContainer());
        t ? $('#overlays').fadeIn(t) : $('#overlays').show();
    },
    'hideMenu': function (t) {
        window.MC && window.MC.showNickDialog ? $('.ogario-menu').hide() : t ? $('#overlays').fadeOut(t) : $('#overlays').hide();
    },
    'escapeHTML': function (t) {
        return String(t).replace(/[&<>"'\/]/g, function (t) {
            return escapeHTMLs[t];
        });
    },
    'checkSkinURL': function (t) {
        //return /^https?:\/\/i\.(?:imgur|hizliresim)\.com\/\w{6,8}\.(?:jpg|jpeg|png)\??\d*$/i .test(t) ? t.replace('http:', 'https:') : '';
        return t.replace('http:', 'https:');
        //return /^https?:\/\/(i|s))\.(?:imgur|hizliresim|put)\.(com|re)\/\w{6,8}\.(?:jpg|jpeg|png)\??\d*$/i .test(t) ? t.replace('http:', 'https:') : '';
    },
    'loadSettings': function () {
        var t = null;
        for (var s in null !== window.localStorage.getItem('ogarioSettings') && (t = JSON.parse(window.localStorage.getItem('ogarioSettings'))), defaultmapsettings) defaultmapsettings.hasOwnProperty(s) && (t && t.hasOwnProperty(s) && (defaultmapsettings[s] = t[s]), ZTX.active.hasOwnProperty(s) && (ZTX.active[s] = defaultmapsettings[s]));

    },
    'saveSettings': function (t, i) {
        window.localStorage.setItem(i, JSON.stringify(t));
    },
    'exportSettings': function () {
        var t = {
            'ogarioCommands': c,
            'ogarioHotkeys': ogario1Hotkeys,
            'ogarioPlayerProfiles': ogario1PlayerProfiles,
            'ogarioSettings': defaultmapsettings,
            'ogarioThemeSettings': defaultSettings
        };
        for (var e in t) {
            if (t.hasOwnProperty(e)) $('#export-' + e).prop('checked') || delete t[e];
        }
        t = JSON.stringify(t), $('#export-settings').val(t), $('#import-settings').val(''), t = null;
    },
    'importSettings': function () {
        $('#import-settings').blur();
        var t = $('#import-settings').val();
        if (t) {
            for (var i in t = JSON.parse(t))
                if (t.hasOwnProperty(i)) {
                    if (!$('#import-' + i).prop('checked')) continue;
                    window.localStorage.setItem(i, JSON.stringify(t[i]));
                }
            window.location.reload();
        }
    },
    'restoreSettings': function () {
        null !== window.localStorage.getItem('ogarioSettings') && (window.localStorage.removeItem('ogarioSettings'), window.location.reload());
    },
    'setSettings': function (t, e) {
        if (defaultmapsettings.hasOwnProperty(t) && null !== e) {
            switch (defaultmapsettings[t] = e, ZTX.active.hasOwnProperty(t) && (ZTX.active[t] = e), t) {
                case 'autoResp':
                    this.setAutoResp();
                    break;
                case 'showMiniMap':
                    this.setMiniMap();
                    break;
                case 'showMiniMapGrid':
                    this.resetMiniMapSectors();
                    break;
                case 'disableChat':
                    this.setDisableChat();
                    break;
                case 'chatSounds':
                    this.setChatSoundsBtn();
                    break;
                case 'showChatBox':
                    this.setShowChatBox();
                    break;
                case 'showTop5':
                    this.setTop5();
                    break;
                case 'showTargeting':
                    this.setTargetingHUD();
                    break;
                case 'showTime':
                    this.displayTime(), $('#time-hud').show();
                    break;
                case 'centeredLb':
                    this.setCenteredLb();
                    break;
                case 'normalLb':
                    this.setNormalLb();
                    break;
                case 'fpsAtTop':
                    this.setFpsAtTop();
                    break;
                case 'showStats':
                    this.displayStats(), $('#stats-hud').show();
                    break;
                case 'blockPopups':
                    this.setBlockPopups();
            }
            this.saveSettings(defaultmapsettings, 'ogarioSettings');
        }
    },
    'loadProfiles': function () {
        if (null !== window.localStorage.getItem('ogarioPlayerProfiles')) {
            ogario1PlayerProfiles = JSON.parse(window.localStorage.getItem('ogarioPlayerProfiles'))
            if (ogario1PlayerProfiles.length == 10) { //fix for old players
                for (var t = 10; t < 15; t++) ogario1PlayerProfiles.push({
                    'nick': 'Profile #' + (t + 1),
                    'clanTag': '',
                    'skinURL': '',
                    'color': defaultSettings.mainColor
                });
            }
        } else {
            for (var t = 0; t < 15; t++) ogario1PlayerProfiles.push({
                'nick': 'Profile #' + (t + 1),
                'clanTag': '',
                'skinURL': '',
                'color': defaultSettings.mainColor
            });
        }
        if (null !== window.localStorage.getItem('ogarioSelectedProfile')) {
            this.selectedProfile = JSON.parse(window.localStorage.getItem('ogarioSelectedProfile'));
        }
        ogarcopythelb.nick = ogario1PlayerProfiles[this.selectedProfile].nick;
        ogarcopythelb.clanTag = ogario1PlayerProfiles[this.selectedProfile].clanTag;
        ogarcopythelb.skinURL = ogario1PlayerProfiles[this.selectedProfile].skinURL;
        ogarcopythelb.color = ogario1PlayerProfiles[this.selectedProfile].color;
    },
    'changeSkinPreview': function (e, t) {
        //console.log(e,t);
        if (!t || !e) {
            return;
        }
        if ("skin-preview" === t) { //or if ("skin-preview" === e)
            //console.log(e,e.src);

            if (e.src.includes(".mp4") || e.src.includes(".webm") || e.src.includes(".ogg")) { //console.log("stage 3a videos");
                $("#skin-preview").children().remove();
                $("#skin-preview").removeClass("default");
                $("#skin-preview").append('<a href="#" id="skin-popover" data-toggle="popover" title="" data-html="true" data-content="<video src=\'' + e.src + "' width='350'>\"></a>");
                $("#skin-popover").append('<video id="videoskinpreview" src=\'' + e.src + "' width='350' controls>\"></video>");
                //						$("#skin-popover").popover();

                //$("#skin-preview").append('<a href="#" id="skin-popover" data-toggle="popover" title="" data-html="true" data-content="<video src=\'' + t.src + "' width='500'>\"></a>");
            } else {
                //console.log("default settings for images on changeSkinPreview")
                $("#skin-preview").removeClass("default");
                $("#skin-preview").append('<a href="#" id="skin-popover" data-toggle="popover" title="" data-html="true" data-content="<img src=\'' + e.src + "' width='500'>\"></a>");
            }
            $("#skin-popover").append($(e).fadeIn(1000));
            $("#skin-popover").popover();
        } else {
            if (e.src.includes(".mp4") || e.src.includes(".webm") || e.src.includes(".ogg")) { //console.log("stage 3b videos");
                $("#" + t).removeClass("default");
                $("#" + t).append($(e).fadeIn(1000));

            } else {
                $("#" + t).removeClass("default");
                $("#" + t).append($(e).fadeIn(1000));
            }
        }

    },
    'setSkinPreview': function (t, e) {
        if (t.includes(".mp4") || t.includes(".webm") || t.includes(".ogg")) {
            //console.log("stage 1 videos");

            if ($('#' + e).empty().addClass('default'), t && 0 != t.length) {
                //console.log("stage 1 images/videos: " + t);
                var i = this;
                o = new Video();
                o.src = t;
                // o = new Image();
                o.crossOrigin = 'anonymous';
                setTimeout(function () {
                    //newo.onload = function() {
                    i.changeSkinPreview(o, e);
                    checkVideos3(o);
                    //};
                }, 500);

            }
        } else {
            checktypeImgVid = new Image();
            //console.log("stage 1 images");

            if ($('#' + e).empty().addClass('default'), t && 0 != t.length) {
                //console.log("stage 1 images/videos: " + t);
                var i = this,
                    o = checktypeImgVid;
                o.src = t;
                // o = new Image();
                o.crossOrigin = 'anonymous',
                    o.onload = function () {
                        i.changeSkinPreview(o, e);
                    };
            }
        }
    },
    'setProfile': function () {
        var t = (ogario1PlayerProfiles.length + this.selectedProfile - 1) % ogario1PlayerProfiles.length,
            e = (this.selectedProfile + 1) % ogario1PlayerProfiles.length;
        //console.log(ogario1PlayerProfiles.length);
        this.setSkinPreview(ogario1PlayerProfiles[t].skinURL, 'prev-profile');
        this.setSkinPreview(ogario1PlayerProfiles[this.selectedProfile].skinURL, 'skin-preview');
        this.setSkinPreview(ogario1PlayerProfiles[e].skinURL, 'next-profile');
        this.saveSettings(this.selectedProfile, 'ogarioSelectedProfile');
        $('#nick').val(ogario1PlayerProfiles[this.selectedProfile].nick);
        $('#clantag').val(ogario1PlayerProfiles[this.selectedProfile].clanTag);
        $('#skin').val(ogario1PlayerProfiles[this.selectedProfile].skinURL);
        $('#color').val(ogario1PlayerProfiles[this.selectedProfile].color);
        $('.skin')['colorpicker']('setValue', ogario1PlayerProfiles[this.selectedProfile].color);
        $('#skins a').removeClass('selected');
        $('#skins a[data-profile=\'' + this.selectedProfile + '\']').addClass('selected');
    },
    'prevProfile': function () {
        this.setPlayerSettings(),
            this.selectedProfile = (ogario1PlayerProfiles.length + this.selectedProfile - 1) % ogario1PlayerProfiles.length, this.setProfile();
    },
    'nextProfile': function () {
        this.setPlayerSettings(),
            this.selectedProfile = (this.selectedProfile + 1) % ogario1PlayerProfiles.length, this.setProfile();
    },
    'selectProfile': function (t) {
        this.setPlayerSettings();
        this.selectedProfile = parseInt(t);
        this.setProfile();
    },
    'addOption': function (t, e, i, o) {
        $(t).append('<label><input type=\"checkbox\" id=\"' + e + '\" class=\"js-switch\"> ' + i + '</label>');
        $('#' + e).prop('checked', o);
    },
    'addOptions': function (t, e) {
        if (t) {
            $('#og-options').append('<div class=\"options-box ' + e + '\"><h5 class=\"menu-main-color\">' + ZTX.cl[e] + '</h5></div>');
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                if (defaultmapsettings.hasOwnProperty(o)) {
                    $('.' + e).append('<label>' + ZTX.cl[o] + ' <input type=\"checkbox\" class=\"js-switch\" id=\"' + o + '\"></label>');
                    $('#' + o).prop('checked', defaultmapsettings[o]);
                }
            }
        }
    },
    'addInputBox': function (t, e, i, o) {
        $(t).append('<div class=\"input-box\"><span class=\"title-box\">' + ZTX.cl[e] + '</span><input id=\"' + e + '\" class=\"form-control\" placeholder=\"' + i + '\" value=\"' + defaultmapsettings[e] + '\" /></div>');
        var a = this;
        $('#' + e).on('input', function () {
            defaultmapsettings[e] = this.value, a[o](), a.saveSettings(defaultmapsettings, 'ogarioSettings');
        });
    },
    'addSliderBox': function (t, e, o, a, n, r) {
        $(t).append('<div class=\"slider-box\"><div class=\"box-label\"><span class=\"value-label\">' + ZTX.cl[e] + ': </span><span id=\"' + e + '-value\" class=\"value\">' + defaultmapsettings[e] + '</span></div><input id=\"' + e + '-slider\" type=\"range\" min=\"' + o + '\" max=\"' + a + '\" step=\"' + n + '\" value=\"' + defaultmapsettings[e] + '\"></div>');
        var l = this;
        r ? $('#' + e + '-slider').on('input', function () {
            var t = parseFloat($(this).val());
            $('#' + e + '-value').text(t), defaultmapsettings[e] = t, ZTX.active.hasOwnProperty(e) && (ZTX.active[e] = t), l[r](), l.saveSettings(defaultmapsettings, 'ogarioSettings');
        }) : $('#' + e + '-slider').on('input', function () {
            var t = parseFloat($(this).val());
            $('#' + e + '-value').text(t), defaultmapsettings[e] = t, ZTX.active.hasOwnProperty(e) && (ZTX.active[e] = t), l.saveSettings(defaultmapsettings, 'ogarioSettings');
        });
    },
    'setLang': function () {
        if ('pl' === ZTX.sett.cl && window.i18n_dict && window.i18n_dict.en)
            for (var t in window.i18n_dict.en) window.i18n_dict.en.hasOwnProperty(t) && ZTX.cl.hasOwnProperty(t) && (window.i18n_dict.en[t] = ZTX.cl[t]);
    },
    'setMenu': function () {
        var t;
        for (t in document.title = this.name,
            $("#mainPanel").before('<div id="exp-bar" class="agario-panel"><span class="ogicon-user"></span><div class="agario-exp-bar progress"><span class="progress-bar-text"></span><div class="progress-bar progress-bar-striped" style="width: 0%;"></div></div><div class="progress-bar-star"></div></div><div id="main-menu" class="agario-panel"><ul class="menu-tabs"><li class="start-tab active"><a href="#main-panel" class="active ogicon-home" data-toggle="tab-tooltip" title="' +
                ZTX.cl.start + '"></a></li><li class="profile-tab"><a href="#profile" class="ogicon-user" data-toggle="tab-tooltip" title="' + ZTX.cl.profile + '"></a></li><li class="settings-tab"><a href="#og-settings" class="ogicon-cog" data-toggle="tab-tooltip" title="' + ZTX.cl.settings + '"></a></li><li class="theme-tab"><a href="#theme" class="ogicon-droplet" data-toggle="tab-tooltip" title="' + ZTX.cl.theme + '"></a></li><li class="hotkeys-tab"><a href="#" class="hotkeys-link ogicon-keyboard" data-toggle="tab-tooltip" title="' +
                ZTX.cl.hotkeys + '"></a></li><li class="music-tab"><a href="#music" class="ogicon-music" data-toggle="tab-tooltip" title="Radio / ' + ZTX.cl.sounds + '"></a></li></ul><div id="main-panel" class="menu-panel"></div><div id="profile" class="menu-panel"></div><div id="og-settings" class="menu-panel"><div class="submenu-panel"></div></div><div id="theme" class="menu-panel"></div><div id="music" class="menu-panel"></div></div>'),
            $("#main-panel").append('<a href="#" class="quick quick-menu ogicon-menu"></a><a href="#" class="quick quick-bots ogicon-trophy"></a><a href="#" class="quick quick-skins ogicon-images"></a><div id="profiles"><div id="prev-profile"></div><div id="skin-preview"></div><div id="next-profile"></div></div>'),
            $("#mainPanel div[role=form]").appendTo($("#main-panel")),
            $("#main-panel div[role=form] .form-group:first").remove(),
            $("#nick").before('<input id="clantag" class="form-control" placeholder="Tag, e.g  \Lc" maxlength="10"><div class="input-group nick"></div>'),
            $("#nick").appendTo($(".nick")),
            $(".nick").append('<span class="input-group-btn"><button id="stream-mode" class="btn active ogicon-eye"></button></span>'),
            $(".nick").after('<div class="input-group skin"><input id="skin" class="form-control" placeholder="Skin URL (imgur.com direct link)" maxlength="40"><input type="hidden" id="color" value="' + ogarcopythelb.color + '" maxlength="7" /><span class="input-group-addon"><i></i></span><span class="input-group-btn"><button id="hide-url" class="btn active ogicon-eye"></button></span></div>'),
            $("#locationKnown, #locationUnknown").insertAfter($(".skin")),
            $("#region").before('<button class="btn btn-warning btn-server-info ogicon-cogs"></button>'),
            $(".btn-spectate, .btn-logout").appendTo("#agario-main-buttons"),
            $("#agario-main-buttons").addClass("clearfix").before('<div id="server-info" class="form-group clearfix"><input id="server-ws" class="form-control" placeholder="Server WS"><button id="server-connect" class="btn btn-success ogicon-power"></button><button id="server-reconnect" class="btn btn-primary ogicon-redo2"></button><input id="server-token" class="form-control" placeholder="Server token"><button id="server-join" class="btn btn-success" data-itr="page_join_party">Join</button></div>'),
            $("#helloContainer div[role=form]").after('<div id="ogario-party" class="clearfix"><input id="party-token" class="form-control" placeholder="Party token"></div>'),
            $("#ogario-party").append('<button id="join-party-btn-2" class="btn btn-success" data-itr="page_join_party">Join</button><button id="create-party-btn-2" class="btn btn-primary" data-itr="page_create_party">Create</button>'),
            $("#pre-join-party-btn:first, #join-party-btn:first, #create-party-btn:first, #leave-party-btn:first, #joinPartyToken:first, .party-icon-back:first").appendTo($("#ogario-party")),
            $("#settingsChoice, #options").appendTo($("#og-settings .submenu-panel")),
            $("#stats").appendTo($("#main-menu")).addClass("menu-panel"),
            $("#statsContinue").attr("id", "statsContinue2"),
            $("#mainPanel").empty().remove(),
            $(".center-container").addClass("ogario-menu"),
            $(".center-container").append('<div id="menu-footer" class="menu-main-color">' + ZTX.cl.visit + ' <a href="http://legendmod.ml" target="_blank">legendmod.ml</a> | ' + this.version + ' <a href="https://goo.gl/nRREoR" class="release ogicon-info" target="_blank"></a></div>'),
            $("#leftPanel, #rightPanel").addClass("ogario-menu").removeAttr("id"),
            $(".agario-profile-panel, .agario-panel-freecoins, .agario-panel-gifting, .agario-shop-panel, #dailyquests-panel").appendTo($("#profile")).removeClass("agario-side-panel"),
            $(".agario-profile-panel").after('<div id="block-warn">' + ZTX.cl.blockWarn + '<br><a href="#" id="unblock-popups">' + ZTX.cl.unblockPopups + "</a></div>"),
            $("#exp-bar").addClass("agario-profile-panel"), $(".left-container").empty(),
            $(".agario-shop-panel").after('<div class="agario-panel ogario-yt-panel"><h5 class="menu-main-color">The Legend Mod Project</h5><div class="g-ytsubscribe" data-channelid="UCoj-ZStcJ0jLMOSK7FOBTbA" data-layout="full" data-theme="dark" data-count="default"></div></div>'),
            $("#tags-container").appendTo($("#profile")),
            $(".btn-logout").appendTo($("#profile")),
            $(".left-container").append('<div id="quick-menu" class="agario-panel agario-side-panel"><a href="https://jimboy3100.github.io/skins/" class="quick-more-skins ogicon-grin" target="_blank" data-toggle="tab-tooltip" data-placement="left" title="' + ZTX.cl.skins + '"></a><a href="https://youtube.com/channel/UCoj-ZStcJ0jLMOSK7FOBTbA" class="quick-yt ogicon-youtube2" target="_blank" data-toggle="tab-tooltip" data-placement="left" title="The Legend mod Project"></a></div>'),
            $(".left-container").append(`<div id="quick-bots" class="agario-panel agario-side-panel"><h2 id="botsInfo"></h2>									
					<h5 id="botsAuthor">Party bots</h5>
					<span id="statusTextBots">Status: <b id="userStatus">Disconnected</b></span>
					<br>
					<span id="aiTextBots">Bots AI: <b id="botsAI">Disabled</b></span>
					<br>
					<input type="text" id="botsNameLM" placeholder="Bots Name" maxlength="15" spellcheck="false">
					<input type="number" id="botsAmount" placeholder="Bots Amount" min="10" max="199" spellcheck="false">
					<button id="connectBots">Connect</button>
					<br>
					<button id="startBots" disabled>Start Bots</button>
					<button id="stopBots">Stop Bots</button><br>
					<br><a href="https://github.com/jimboy3100/jimboy3100.github.io/tree/master/ExampleScripts/agario-bots2" target="_blank">How to use?</a>	
					</div>`),
        this.protocolMode || $("#quick-menu").prepend('<a href="#" class="quick-shop ogicon-cart" data-toggle="tab-tooltip" data-placement="left" title="' + ZTX.cl.page_shop + '"></a><a href="#" class="quick-free-coins ogicon-coin-dollar" data-toggle="tab-tooltip" data-placement="left" title="' + ZTX.cl.page_menu_main_free_coins + '"></a><a href="#" class="quick-free-gifts ogicon-gift" data-toggle="tab-tooltip" data-placement="left" title="' + ZTX.cl.page_menu_main_gifts + '"></a><a href="#" class="quick-quests ogicon-trophy" data-toggle="tab-tooltip" data-placement="left" title="' + ZTX.cl.page_menu_main_dailyquests + '"></a>'),
            $(".party-dialog, .partymode-info").remove(),
            $(".agario-party-6").appendTo($(".center-container")),
            $(".right-container").empty(),
            $(".right-container").append('<div class="agario-party"></div>'),
            $(".agario-party-6").appendTo($(".agario-party")).addClass("agario-panel agario-side-panel"),
            $(".agario-party h4, #cancel-party-btn").remove(),
            $(".agario-party .btn").addClass("btn-sm"),
            $(".right-container").append('<div id="skins-panel" class="agario-panel agario-side-panel"><div id="skins"></div><a href="https://ogario.ovh/skins/" id="more-skins" class="btn btn-block btn-success" target="_blank">' + ZTX.cl.moreSkins + "</a></div>"),
            $(".btn-settings, .text-muted, .tosBox, .agario-promo, #agario-web-incentive, span[data-itr='page_option_dark_theme'], #options #darkTheme").remove(),
            $("#advertisement, #adbg, #a320x250, #g320x250, #s320x250, #adsBottom").css("display", "none"),
            $("#advertisement").removeClass("agario-panel"), $("#adsBottom").css({
            "z-index": "1",
            "opacity": "0",
            "bottom": "-100px"
        }), $("#noNames, #showMass").remove(), $("#og-settings .submenu-panel").append('<div id="og-options"></div>'),
            this.addOptions([], "animationGroup"),
            this.addOptions(["autoZoom"], "zoomGroup"),
            this.addOptions(["quickResp", "autoResp"], "respGroup"),
            this.addOptions(["noNames", "optimizedNames", "autoHideNames", "hideMyName", "hideTeammatesNames", "namesStroke"], "namesGroup"),
            this.addOptions(["showMass", "optimizedMass", "autoHideMass", "hideMyMass", "hideEnemiesMass", "shortMass", "virMassShots", "massStroke", "virusSound"], "massGroup"),
            this.protocolMode ? this.addOptions(["customSkins", "jellyPhisycs", "videoSkins", "videoSkinsMusic"], "skinsGroup") : this.addOptions(["customSkins", "vanillaSkins", "jellyPhisycs", "videoSkins", "videoSkinsMusic"], "skinsGroup"),
            this.addOptions(["optimizedFood", "autoHideFood", "autoHideFoodOnZoom", "rainbowFood"], "foodGroup"),
            this.addOptions(["myCustomColor", "myTransparentSkin", "transparentSkins", "transparentCells", "transparentViruses", "virusGlow"], "transparencyGroup"),
            this.addOptions(["showGrid", "showBgSectors", "showMapBorders", "borderGlow"], "gridGroup"),
            this.addOptions(["disableChat", "chatSounds", "chatEmoticons", "showChatImages", "showChatVideos", "showChatBox"], "chatGroup"),
            this.addOptions(["showMiniMap", "showMiniMapGrid", "showMiniMapGuides", "showExtraMiniMapGuides", "showMiniMapGhostCells", "oneColoredTeammates"], "miniMapGroup"),
            this.addOptions(["oppColors", "oppRings", "virColors", "splitRange", "qdsplitRange", "sdsplitRange", "virusesRange", "cursorTracking", "teammatesInd", "showGhostCells", "showGhostCellsInfo"], "helpersGroup"), //Sonia2
            this.addOptions(["mouseSplit", "mouseFeed", "mouseInvert"], "mouseGroup"),
            this.addOptions(["showTop5", "showTargeting", "showLbData", "centeredLb", "normalLb", "fpsAtTop"], "hudGroup"),
            this.addOptions(["showStats", "showStatsMass", "showStatsESTE", "showStatsEMTE", "showStatsMTE", "showStatsSTE", "showStatsTTE", "showStatsPTE", "showStatsN16", "showStatsFPS", "showTime"], "statsGroup"),
        this.protocolMode || (this.addOptions(["blockPopups"], "extrasGroup"),
            $("#noSkins, #noColors, #skipStats, #showQuest").addClass("js-switch-vanilla"),
            $(".skinsGroup h5").after('<label class="noSkins">' + ZTX.cl.noSkins + " </label>"),
            $("#noSkins").appendTo($(".noSkins")), $(".transparencyGroup h5").after('<label class="noColors">' + ZTX.cl.noColors + " </label>"),
            $("#noColors").appendTo($(".noColors")),
            $(".extrasGroup h5").after('<label class="skipStats">' + ZTX.cl.skipStats + " </label>"),
            $("#skipStats").appendTo($(".skipStats")),
            $(".skipStats").after('<label class="showQuest">' + ZTX.cl.showQuest + " </label>"),
            $("#showQuest").appendTo($(".showQuest")),
            $("#options").remove(),
            $("#settingsChoice").appendTo($(".extrasGroup")).addClass("select-wrapper")),
            this.addSliderBox(".animationGroup", "animation", 20, 200, 1),
            this.addSliderBox(".zoomGroup", "zoomSpeedValue2", -0.90, 0.90, 0.01),
            $("#og-settings").append('<button class="btn btn-block btn-success btn-export">' + ZTX.cl.exportImport + "</button>"),
            $("#og-settings").append('<div class="restore-settings"><a href="#">' + ZTX.cl.restoreSettings + "</a></div>"),
            $("#music").append('<div class="agario-panel radio-panel"><h5 class="menu-main-color">Radio (' + ZTX.cl.thanks + ')</h5><audio src="" controls></audio><span class="playlist"><span class="ogicon-file-music"></span> <a href="" target="_blank">' + ZTX.cl.playlist + "</a></span></div>"),
            $("#music").append('<div class="agario-panel sounds-panel"><h5 class="menu-main-color">' + ZTX.cl.sounds + "</h5></div>"),
            $("#music").append('<div class="agario-panel ogario-yt-panel"><h5 class="menu-main-color">Legend Clan (tag: \u24c2)</h5><div class="g-ytsubscribe" data-channelid="UCoj-ZStcJ0jLMOSK7FOBTbA" data-layout="full" data-theme="dark" data-count="default"></div></div>'),
            this.addInputBox(".sounds-panel", "messageSound", "Sound URL", "setMessageSound"),
            this.addInputBox(".sounds-panel", "commandSound", "Sound URL", "setCommandSound"),
            this.addInputBox(".sounds-panel", "virusSoundurl", "Sound URL", "setvirusSound"),
            $("body").append('<div id="overlays-hud" data-gamemode=":ffa"><div id="stats-hud" class="hud stats-hud-color"></div> <div id="top5-hud" class="hud"><h5 class="hud-main-color">Team<span class="team-top"></span></h5><ol id="top5-pos"></ol><div id="top5-total"><span class="hud-main-color ogicon-users"></span> ' + //<div class="hud-main-color team-top-menu"><a href="#" data-limit="5" class="team-top-limit active">5</a> | <a href="#" data-limit="10" class="team-top-limit">10</a> | <a href="#" data-limit="100" class="team-top-limit">100</a></div><ol id="top5-pos"></ol><div id="top5-total"><span class="hud-main-color ogicon-users"></span> ' +
                ZTX.cl.totalPartyPlayers + ': <span id="top5-total-players" class="top5-mass-color">0</span>   <span class="hud-main-color ogicon-pacman"></span> ' +
                ZTX.cl.totalPartyMass + ': <span id="top5-total-mass" class="top5-mass-color">0</span></div></div> <div id="time-hud" class="hud time-hud-color"></div> <div id="pause-hud" class="hud">' +
                ZTX.cl.pause + '</div> <div id="leaderboard-hud" class="hud-b"><h5 class="hud-main-color">legendmod.ml</h5><div id="leaderboard-data"></div><div id="leaderboard-positions"></div></div> <div id="btl-leaderboard-hud"><div class="hud hud-c"><span id="btl-players-status">Players ready</span>: <span id="btl-players-count">0</span></div></div> <div id="minimap-hud" class="hud-b"><canvas id="minimap-sectors"></canvas><canvas id="minimap"></canvas></div><div id="target-hud" class="hud"><div id="target-player"><span id="target-skin"><img src="https://jimboy3100.github.io/banners/static/img/blank.png" alt=""> </span><span id="target-nick"></span><span id="target-status" class="hud-main-color">' + //class="hud-main-color">[' +
                ZTX.cl.targetNotSet + '</span></div><div id="target-summary"></div></div><div id="target-panel-hud" class="hud"><a href="#" id="set-targeting" class="ogicon-target"></a><a href="#" id="set-private-minimap" class="ogicon-location2"></a><a href="#" id="cancel-targeting" class="ogicon-cancel-circle"></a><a href="#" id="change-target" class="ogicon-arrow-right"></a></div> <div id="quest-hud" class="hud"></div> <div id="btl-hud" class="hud"></div></div>'),
            $("body").append('<ul id="messages"></ul>'),
            $("body").append('<div id="message-box"><div id="chat-emoticons"></div><div id="message-menu"><a href="#" class="chat-sound-notifications ogicon-volume-high"></a><a href="#" class="chat-active-users ogicon-user-check"></a><a href="#" class="chat-muted-users ogicon-user-minus"></a><a href="#" class="show-chat-emoticons ogicon-smile"></a></div><input type="text" id="message" class="form-control" placeholder="' +
                ZTX.cl.enterChatMsg + '..." maxlength="80"></div>'),
            $("body").append('<div id="chat-box"></div>'), emoticonicons) {
            if (emoticonicons.hasOwnProperty(t)) {
                $("#chat-emoticons").append('<img src="https://jimboy3100.github.io/banners/emoticons/' + emoticonicons[t] + '" alt="' + t + '" class="emoticon">');
            }
        }
        $("body").append('<div id="exp-imp"><div id="exp-imp-menu"><button id="close-exp-imp" class="btn btn-danger">' + ZTX.cl.close + '</button></div><div id="exp-imp-settings"></div></div>'),
            $("#exp-imp-settings").append("<h1>" + ZTX.cl.exportSettings + "</h1><h2>" + ZTX.cl.exportInfo + "</h2>"),
            this.addOption("#exp-imp-settings", "export-ogarioCommands", ZTX.cl.commands, true),
            this.addOption("#exp-imp-settings", "export-ogarioHotkeys", ZTX.cl.hotkeys, true),
            this.addOption("#exp-imp-settings", "export-ogarioPlayerProfiles",
                ZTX.cl.profiles, true), this.addOption("#exp-imp-settings", "export-ogarioSettings", ZTX.cl.settings, true),
            this.addOption("#exp-imp-settings", "export-ogarioThemeSettings", ZTX.cl.theme, true),
            $("#exp-imp-settings").append('<textarea id="export-settings" class="form-control" rows="14" cols="100" spellcheck="false" readonly /><button id="export-settings-btn" class="btn btn-block btn-success">' + ZTX.cl.exportSettings + "</button>"),
            $("#exp-imp-settings").append("<h1>" + ZTX.cl.importSettings + "</h1><h2>" +
                ZTX.cl.importInfo + "</h2>"), this.addOption("#exp-imp-settings", "import-ogarioCommands", ZTX.cl.commands, true),
            this.addOption("#exp-imp-settings", "import-ogarioHotkeys", ZTX.cl.hotkeys, true),
            this.addOption("#exp-imp-settings", "import-ogarioPlayerProfiles", ZTX.cl.profiles, true),
            this.addOption("#exp-imp-settings", "import-ogarioSettings", ZTX.cl.settings, true),
            this.addOption("#exp-imp-settings", "import-ogarioThemeSettings", ZTX.cl.theme, true),
            $("#exp-imp-settings").append('<textarea id="import-settings" class="form-control" rows="14" cols="100" spellcheck="false" /><button id="import-settings-btn" class="btn btn-block btn-success">' +
                ZTX.cl.importSettings + "</button>"), ZTX.menu && ZTX.menu.setThemeMenu();
        /** @type {number} */
        var e = 0;
        for (; e < ogario1PlayerProfiles.length; e++) {
            $("#skins").append('<div class="skin-box"><a href="#profile-' + e + '" id="profile-' + e + '" data-profile="' + e + '"></a></div>');
            this.setSkinPreview(ogario1PlayerProfiles[e].skinURL, "profile-" + e);
            if (e == this.selectedProfile) {
                $("#profile-" + e).addClass("selected");
            }
        }
    },
    'setUI': function () {
        var t = this;
        $(document).on("click", ".menu-tabs a", function (event) {
            event.preventDefault();
            t.switchMenuTabs($(this), "menu-panel");
        });
        $(document).on("click", ".submenu-tabs a", function (event) {
            event.preventDefault();
            t.switchMenuTabs($(this), "submenu-panel");
        });
        $(document).on("click", ".quick-menu", function (event) {
            event.preventDefault();
            defaultmapsettings.showQuickMenu = !defaultmapsettings.showQuickMenu;
            //defaultmapsettings.showQuickBots=false;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setShowQuickMenu();
        });
        $(document).on("click", ".quick-bots", function (event) {
            event.preventDefault();
            defaultmapsettings.showQuickBots = !defaultmapsettings.showQuickBots;
            //defaultmapsettings.showQuickMenu=false;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setShowQuickBots();
        });
        $(document).on("click", ".quick-skins", function (event) {
            event.preventDefault();
            defaultmapsettings.showSkinsPanel = !defaultmapsettings.showSkinsPanel;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setShowSkinsPanel();
        });
        $(document).on("change", "#region", function () {
            t.region = this.value;
        });
        $(document).on("change", "#gamemode", function () {
            var dummy = this.value;
            if (":party" !== dummy) {
                t.leaveParty();
            }
            t.gameMode = ZTX.active.gameMode = dummy;
            t.setQuest();
        });
        $(document).on("change", "#quality", function () {
            t.getQuality(this.value);
            ogarhusettings();
        });
        $(document).on("input", "#skin", function () {
            var hexInputVal = this.value;
            t.setSkinPreview(hexInputVal, "skin-preview");
            t.setSkinPreview(hexInputVal, "profile-" + t.selectedProfile);
        });
        $(document).on("click", "#skins a", function (event) {
            event.preventDefault();
            t.selectProfile($(this).attr("data-profile"));
        });
        $(document).on("click", "#prev-profile", function () {
            t.prevProfile();
        });
        $(document).on("click", "#next-profile", function () {
            t.nextProfile();
        });
        $(document).on("click", "#stream-mode", function () {
            /** @type {boolean} */
            defaultmapsettings.streamMode = !defaultmapsettings.streamMode;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setStreamMode();
        });
        $(document).on("click", "#hide-url", function () {
            /** @type {boolean} */
            defaultmapsettings.hideSkinUrl = !defaultmapsettings.hideSkinUrl;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setHideSkinUrl();
        });
        $(document).on("click", ".btn-server-info", function () {
            $("#server-info").toggle();
        });
        $(document).on("click", "#server-connect", function () {
            t.gameServerConnect($("#server-ws").val());
        });
        $(document).on("click", "#server-reconnect", function () {
            t.gameServerReconnect();
        });
        $(document).on("click", "#server-join", function () {
            t.gameServerJoin($("#server-token").val());
        });
        $(document).on("change", "#og-options input[type='checkbox']", function () {
            var template = $(this);
            t.setSettings(template.attr("id"), template.prop("checked"));
        });
        $(document).on("change", ".js-switch-vanilla", function () {
            var template = $(this);
            var p = template.attr("id");
            if (void 0 !== t[p]) {
                t[p] = template.prop("checked");
                if ("noSkins" === p) {
                    /** @type {boolean} */
                    ZTX.active.showCustomSkin = !t.noSkins;
                }
                if ("showQuest" === p) {
                    t.setQuest();
                }
            }
        });
        $(document).on("click", "#og-settings .restore-settings a", function (result) {
            result.preventDefault();
            t.restoreSettings();
        });
        $(document).on("click", "#og-settings .btn-export", function (result) {
            result.preventDefault();
            t.exportSettings();
            $("#exp-imp").fadeIn(500);
            $("#exp-imp-settings, #export-settings").perfectScrollbar("update");
        });
        $(document).on("click", "#close-exp-imp", function (event) {
            event.preventDefault();
            $("#exp-imp").fadeOut(500);
        });
        $(document).on("focus", "#export-settings", function () {
            $(this).select();
        }),
            $(document).on("click", "#export-settings-btn", function (event) {
                event.preventDefault();
                t.exportSettings();
            });
        $(document).on("click", "#import-settings-btn", function (result) {
            result.preventDefault();
            t.importSettings();
        });
        $(document).on("click", "#unblock-popups", function (result) {
            result.preventDefault();
            t.unblockPopups();
        });
        $(document).on("click", "#openfl-overlay.disabler", function () {
            if (defaultmapsettings["blockPopups"]) {
                t["blockPopups"]();
            }
        });
        $(document).on("click", "#openfl-content", function () {
            if (defaultmapsettings["blockPopups"]) {
                var container = $(this);
                setTimeout(function () {
                    if (!container.is(":visible")) {
                        t["blockPopups"]();
                    }
                }, 1000);
            }
        });
        $(document).on("click", ".quick-shop", function (event) {
            event.preventDefault();
            t.unblockPopups();
            if (window.MC && window.MC.openShop) {
                window.MC.openShop();
            }
        });
        $(document).on("click", ".quick-free-coins", function (event) {
            event.preventDefault();
            t.unblockPopups();
            if (window.MC && window.MC.showFreeCoins) {
                window.MC.showFreeCoins();
            }
        });
        $(document).on("click", ".quick-free-gifts", function (event) {
            event.preventDefault();
            t.unblockPopups();
            if (window.MC && window.MC.showGifting) {
                window.MC.showGifting();
            }
        });
        $(document).on("click", ".quick-quests", function (event) {
            event.preventDefault();
            t.unblockPopups();
            if (window.MC && window.MC.showQuests) {
                window.MC.showQuests();
            }
        });
        $(document).on("click", "#set-targeting", function (event) {
            event.preventDefault();
            t.setTargeting();
        });
        $(document).on("click", "#cancel-targeting", function (event) {
            event.preventDefault();
            t.cancelTargeting();
        });
        $(document).on("click", "#set-private-minimap", function (event) {
            event.preventDefault();
            t.setPrivateMiniMap();
        });
        $(document).on("click", "#change-target", function (result) {
            result.preventDefault();
            t.changeTarget();
        });
        $(document).on("click", ".team-top-limit", function (event) {
            event.preventDefault();
            var template = $(this);
            /** @type {number} */
            var param = parseInt(template.attr("data-limit"));
            if (param) {
                t.setTop5limit(param);
                t.displayTop5();
                $(".team-top").text(param);
                $(".team-top-limit").removeClass("active");
                template.addClass("active");
            }
        });
        $(document).on("click", "#top5-pos .set-target", function (event) {
            event.preventDefault();
            t.setTarget(parseInt($(this).attr("data-user-id")));
        });
        $(document).on("click", ".mute-user", function (event) {
            event.preventDefault();
            t.muteChatUser(parseInt($(this).attr("data-user-id")));
        });
        $(document).on("click", ".btn-mute-user", function () {
            var template = $(this);
            t.muteChatUser(parseInt(template.attr("data-user-id")));
            template.removeClass("btn-red btn-mute-user").addClass("btn-green btn-unmute-user").text(ZTX.cl.unmute);
        });
        $(document).on("click", ".btn-unmute-user", function () {
            var template = $(this);
            t.unmuteChatUser(parseInt(template.attr("data-user-id")));
            template.removeClass("btn-green btn-unmute-user").addClass("btn-red btn-mute-user").text(ZTX.cl.mute);
        });
        $(document).on("click", ".chat-sound-notifications", function (result) {
            result.preventDefault();
            /** @type {boolean} */
            defaultmapsettings.chatSounds = !defaultmapsettings.chatSounds;
            t.saveSettings(defaultmapsettings, "ogarioSettings");
            t.setChatSoundsBtn();
        });
        $(document).on("click", ".chat-active-users", function (event) {
            event.preventDefault();
            t.displayChatActiveUsers();
        });
        $(document).on("click", ".chat-muted-users", function (event) {
            event.preventDefault();
            t.displayChatMutedUsers();
        });
        $(document).on("click", ".show-chat-emoticons", function (result) {
            result.preventDefault();
            var template = $(this);
            var p = $("#chat-emoticons");
            p.toggle();
            if (p.is(":visible")) {
                template.addClass("active");
            } else {
                template.removeClass("active");
                $("#message").focus();
            }
        });
        $(document).on("click", "#chat-emoticons .emoticon", function () {
            var d = $(this).attr("alt");
            var e = $("#message");
            var n = e.val();
            if (n.length + d.length <= 80) {
                e.val(n + d);
            }
            e.focus();
        });
        this.statsHUD = document.getElementById("stats-hud");
        this.activeParties = document.getElementById("active-parties");
        this.top5pos = document.getElementById("top5-pos");
        this.top5totalMass = document.getElementById("top5-total-mass");
        this.top5totalPlayers = document.getElementById("top5-total-players");
        this.leaderboardPositionsHUD = document.getElementById("leaderboard-positions");
        this.leaderboardDataHUD = document.getElementById("leaderboard-data");
        this.timeHUD = document.getElementById("time-hud"), this.questHUD = document.getElementById("quest-hud"), $("#canvas").bind("contextmenu", function () {
            return false;
        });
        $(document).on("mouseup", ".btn", function () {
            $(this).blur();
        });
        $("[data-toggle='tab-tooltip']").tooltip({
            "trigger": "hover"
        });
        $(".submenu-panel, #chat-box, #exp-imp-settings, #export-settings, #import-settings").perfectScrollbar({
            "suppressScrollX": true
        });
        Array.prototype.slice.call(document.querySelectorAll(".js-switch")).forEach(function (remove) {
            new Switchery(remove, {
                "color": defaultSettings["menuMainColor"],
                "size": "small"
            });
        });
        $("input[type='range']").rangeslider({
            "polyfill": false
        });
        toastr["options"] = {
            "newestOnTop": false,
            "positionClass": "toast-bottom-left",
            "timeOut": 15000
        };

    },
    'switchMenuTabs': function (t, e) {
        var i = t.parent();
        if ('menu-panel' === e) {
            if (t.hasClass('hotkeys-link')) return;
            i.hasClass('profile-tab') && this.setBlockPopups();
        }
        t.addClass('active'), i.addClass('active'), i.siblings().removeClass('active'), i.siblings().find('a').removeClass('active');
        var o = t.attr('href');
        if ('submenu-panel' === e) {
            var a = $(o).parent().attr('id');
            $('#' + a + ' .submenu-panel').not(o).css('display', 'none');
        } else $('.menu-panel').not(o).css('display', 'none');
        $(o).fadeIn(1000), ogarhusettings(), $('.submenu-panel').perfectScrollbar('update');
    },
    'getDefaultSettings': function () {
        if (this.noSkins = $("#noSkins").prop("checked"),
            this.noColors = $("#noColors").prop("checked"),
            this.skipStats = $("#skipStats").prop("checked"),
            this.showQuest = $("#showQuest").prop("checked"),
            ZTX.active.showCustomSkin = !this.noSkins,
        null !== window.localStorage.getItem("scale_setting")) {
            var t = JSON.parse(window.localStorage.getItem("scale_setting"));
            this.setCanvasScale(t);
        } else {
            var o = $("#quality").val();
            this.getQuality(o);
        }
        null !== window.localStorage.getItem("location") ? (this.region = window.localStorage.getItem("location"),
            $("#region").val(this.region),
        window.MC && window.MC.setRegion && window.MC.setRegion(this.region)) : this.region = $("#region").val(),
            this.setParty(), ":party" === this.gameMode && window.location.hash &&
        $("#join-party-btn-2").click(),
            Array.prototype.slice.call(document.querySelectorAll(".js-switch-vanilla")).forEach(function (remove) {
                new Switchery(remove, {
                    "color": defaultSettings["menuMainColor"],
                    "size": "small"
                });
            }), $("#nick").val(ogarcopythelb.nick).blur(),
            $("#noNames").prop("checked", !defaultmapsettings.noNames),
            $("#showMass").prop("checked", defaultmapsettings.showMass),
            this.unlockButtons(),
            this.setAutoResp(),
            this.setQuest();
    },
    'getQuality': function (t) {
        var i = 1;
        switch ('devicePixelRatio' in window && (i = window.devicePixelRatio), t) {
            case 'High':
                this.setCanvasScale(1);
                break;
            case 'Medium':
                this.setCanvasScale(0.9);
                break;
            case 'Low':
                this.setCanvasScale(0.75);
                break;
            case 'VeryLow':
                this.setCanvasScale(0.5);
                break;
            default:
                this.setCanvasScale(i);
        }
    },
    'setCanvasScale': function (t) {
        this.canvasScale = t;
        ZTX.active.canvasScale = t;
    },
    'setStreamMode': function () {
        if (defaultmapsettings.streamMode) {
            $("#stream-mode").addClass("ogicon-eye-blocked");
            $("#clantag, #nick, #party-token").addClass("stream-mode");
        } else {
            $("#stream-mode").removeClass("ogicon-eye-blocked");
            $("#clantag, #nick, #party-token").removeClass("stream-mode");
        }
    },
    'setHideSkinUrl': function () {
        if (defaultmapsettings.hideSkinUrl) {
            $("#hide-url").addClass("ogicon-eye-blocked");
            $("#skin").addClass("hide-url");
        } else {
            $("#hide-url").removeClass("ogicon-eye-blocked");
            $("#skin").removeClass("hide-url");
        }
    },
    'setShowQuickMenu': function () {
        if (defaultmapsettings.showQuickMenu) {
            $("#quick-menu").fadeIn(500);
        } else {
            $("#quick-menu").fadeOut(500);
        }
        if (defaultmapsettings.showQuickBots) {
            $("#quick-bots").hide();
        }
    },
    'setShowQuickBots': function () {
        if (defaultmapsettings.showQuickBots) {
            $("#quick-bots").fadeIn(500);
        } else {
            $("#quick-bots").fadeOut(500);
        }
        if (defaultmapsettings.showQuickBots) {
            $("#quick-menu").hide();
        }
    },
    'setShowSkinsPanel': function () {
        if (defaultmapsettings.showSkinsPanel) {
            $("#skins-panel").fadeIn(500);
        } else {
            $("#skins-panel").fadeOut(500);
        }
    },
    'unlockButtons': function () {
        $('.btn-play, .btn-play-guest, .btn-login-play, .btn-spectate').prop('disabled', false);
    },
    'setMainButtons': function () {
        var t = this;
        $(document).on("click", ".btn-play, .btn-play-guest", function () {
            t.onPlay();
        });
        $(document).on("click", ".btn-spectate", function () {
            t.onSpectate();
        });
        $(document).on("click", "#create-party-btn-2", function () {
            t.onCreate();
        });
        $(document).on("click", "#join-party-btn-2", function () {
            t.skipServerData = true;
            t.joinParty();
            t.onJoin();
        });
        $(document).on("click", "#statsContinue2", function () {
            $("#stats, #main-panel").toggle();
        });
    },
    'play': function () {
        if (window.noOgarioSocket) {
            console.log('New Socket 3 data sent');
            if (window.noOgarioSocket) {
                //Socket3.send(JSON.stringify({ com: "sendPlayerSkinURL", nick: ogarcopythelb.nick, token: legendmod3.serverToken, tag: ogarcopythelb.clanTag, skin: ogarcopythelb.skinURL, color: ogarcopythelb.color, id: customLMID, x: legendmod3.getPlayerX(), y: legendmod3.getPlayerY(), mass: legendmod.playerMass}));
                var temp = {
                    com: "sendPlayerSkinURL",
                    nick: ogarcopythelb.nick,
                    token: legendmod3.serverToken,
                    tag: ogarcopythelb.clanTag,
                    skin: ogarcopythelb.skinURL,
                    color: ogarcopythelb.color,
                    id: customLMID,
                    x: legendmod3.getPlayerX(),
                    y: legendmod3.getPlayerY(),
                    mass: legendmod.playerMass
                };
                Socket3.send(JSON.stringify({"toH": "legendmod", "msg": temp}));

            }
        }
        if (this.setPlayerSettings(), this.setParty(), this.isSocketOpen()) this.sendPartyData();
        else {
            this.connect();
            var t = this;
            setTimeout(function () {
                t.sendPartyData();
            }, 1000);
        }
    },
    'onPlay': function () {
        //                this.play(), this.hideMenu(), window.addKeyListeners && window.addKeyListeners(), defaultmapsettings.autoHideFood && (i.showFood = true), window['ga'] && window['ga']('create', 'UA-92655864-7', 'auto', 'ogarioTracker'), window['ga'] && window['ga']('ogarioTracker.send', 'pageview');
        this.play();
        this.hideMenu();
        if (window.addKeyListeners) {
            window.addKeyListeners();
        }
        if (defaultmapsettings.autoHideFood) {
            ZTX.active.showFood = true
        }
        ;
    },
    'onSpectate': function () {
        this.onJoin();
        this.sendPlayerJoin();
        this.hideMenu();
        if (window.addKeyListeners) {
            window.addKeyListeners();
        }
        if (defaultmapsettings.autoHideFood) {
            ZTX.active.showFood = false;
        }
    },
    'join': function () {
        this.setParty();
        this.setPlayerSettings();
        this.sendPartyData();
        this.sendPlayerDeath();
    },
    'onJoin': function () {
        if (this.setParty(), this.isSocketOpen()) this.join();
        else {
            this.connect();
            var t = this;
            setTimeout(function () {
                t.join();
                t.sendPlayerJoin();
            }, 1000);
        }
    },
    'create': function () {
        if (this.setParty(), this.partyToken) this.onJoin();
        else {
            var t = this;
            setTimeout(function () {
                t.create();
            }, 100);
        }
    },
    'onCreate': function () {
        this.setParty(), ':party' === this.gameMode && this.partyToken ? this.gameServerReconnect() : this.createParty(), this.create();
    },
    'onPlayerSpawn': function () {
        if (ZTX.active.play = true, ZTX.active.playerColor) return this.sendPlayerSpawn(), void this.cacheCustomSkin(ogarcopythelb.nick, ZTX.active.playerColor, ogarcopythelb.skinURL);
        var t = this;
        setTimeout(function () {
            t.onPlayerSpawn();
        }, 100);
        if (window.spawnspecialeffects == true) {
            setTimeout(function () {
                ///////// trigger special effects
                //console.log('Special effects stage 1');
                ZTX.active.spawnX = ZTX.active.playerX;
                ZTX.active.spawnY = ZTX.active.playerY;
                ZTX.agar.drawCommander = true;
            }, 110);
        }
        LegendModSpawn();
    },
    'onPlayerDeath': function () {
        //
        pauseVideos();
        ZTX.active.play = false;
        ZTX.active.playerColor = null;
        ZTX.active.foodIsHidden = false;
        ZTX.active.playerMass = 0;
        ZTX.active.playerScore = 0;
        ZTX.active.playerSplitCells = 0;
        this.showMenu(300);
        this.sendPlayerDeath();
        this.updateDeathLocations(ZTX.active.playerX, ZTX.active.playerY);
        this.unlockButtons();
        ogarcommando1();
        this.autoResp();

    },
    'setPlayerSettings': function () {
        var t = $('#nick').val(),
            e = $('#clantag').val(),
            o = $('#skin').val(),
            a = $('#color').val();
        ogarcopythelb.nick = t,
            ogarcopythelb.clanTag = e.trim(),
            ogarcopythelb.skinURL = this['checkSkinURL'](o.trim()),
        7 == a.length && (ogarcopythelb.color = a),
        ogarcopythelb.clanTag.length > 0 && (ZTX.active.clanTag = ogarcopythelb.clanTag),
            ogario1PlayerProfiles[this.selectedProfile].nick = ogarcopythelb.nick,
            ogario1PlayerProfiles[this.selectedProfile].clanTag = ogarcopythelb.clanTag,
            ogario1PlayerProfiles[this.selectedProfile].skinURL = ogarcopythelb.skinURL,
            ogario1PlayerProfiles[this.selectedProfile].color = ogarcopythelb.color,
            this.saveSettings(ogario1PlayerProfiles, 'ogarioPlayerProfiles');
    },
    'loadSkin': function (t, e) {
        var i = this;
        //console.log ("t:" + t + "e:" + e);
        if (e.includes(".mp4") || e.includes(".webm") || e.includes(".ogv")) {
            t[e] = new Video();
            //console.log("stage 2 videos");
        } else {
            t[e] = new Image();
        }
        t[e].crossOrigin = 'Anonymous';
        t[e]['onload'] = function () {
            this.complete &&
            this.width &&
            this.height &&
            this.width <= 2000 &&
            this.height <= 2000 &&
            (i.cacheQueue.push(e),
            1 == i.cacheQueue.length &&
            i.cacheSkin(i.customSkinsCache));
        },
            t[e]['onerror'] = function () {
                //console.log("error loading image: "+ e);
                if (e.includes(window.EnvConfig.config_url)) {
                    e = "https://jimboy3100.github.io/vanillaskins/" + e.split('/').pop(); //if CORS policy on miniclip images, use other source
                    //console.log("new destination is:" + e);
                    ogarminimapdrawer.customSkinsMap[window.lastusednameforskin] = e;
                    ogarminimapdrawer.loadSkin(t, e);
                    return e;

                }
            };
        t[e].src = e;
    },
    'cacheSkin': function (t) {
        //console.log(t);  //////// return the image src
        if (0 != this.cacheQueue.length) {
            var e = this.cacheQueue.shift();
            if (e) {
                var i = document.createElement("canvas");
                i.width = 512;
                i.height = 512;
                var $ = i.getContext("2d");
                $.beginPath();
                $.arc(256, 256, 256, 0, 2 * Math.PI, false);
                $.clip();
                try {
                    $.drawImage(this.customSkinsCache[e], 0, 0, 512, 512);
                } catch (e) {
                }
                this.customSkinsCache[e + "_cached"] = new Image;
                this.customSkinsCache[e + "_cached"].src = i.toDataURL();
                i = null;
                this.cacheSkin(this.customSkinsCache);
            }
        }
    },
    'getCachedSkin': function (t, e) {
        return t[e + '_cached'] && t[e + '_cached'].complete && t[e + '_cached'].width ? t[e + '_cached'] : null;
    },
    'cacheCustomSkin': function (t, e, i) {
        if (i) {
            var s = ':party' === this.gameMode ? t + e : t;
            //console.log("t= " + t);
            //console.log("e= " + e);
            if (s && (this.customSkinsMap[s] = i), this.customSkinsCache.hasOwnProperty(i)) return;
            this.loadSkin(this.customSkinsCache, i);
        }
    },
    'checkSkinsMap': function (t, e) {
        var i = ':party' === this.gameMode ? t + e : t;
        //console.log(.customSkinsMap.hasOwnProperty(i));
        return !!this.customSkinsMap.hasOwnProperty(i);
    },
    'getCustomSkin': function (t, e) {
        if (!this.checkSkinsMap(t, e)) return null;
        var i = ':party' === this.gameMode ? t + e : t;
        return this.getCachedSkin(this.customSkinsCache, this.customSkinsMap[i]);
    },
    'calculateMapSector': function (t, e, s = false) {
        if (!ZTX.active.mapOffsetFixed) return '';
        var o = s ? ZTX.active.mapOffsetX + ZTX.active.mapOffset : ZTX.active.mapOffset,
            a = s ? ZTX.active.mapOffsetY + ZTX.active.mapOffset : ZTX.active.mapOffset,
            n = Math.floor((e + a) / (ZTX.active.mapSize / defaultSettings.sectorsY)),
            r = Math.floor((t + o) / (ZTX.active.mapSize / defaultSettings.sectorsX));
        window.calculateMapSector = n < 0 ? 0 : n >= defaultSettings.sectorsY ? defaultSettings.sectorsY - 1 : n, r = r < 0 ? 0 : r >= defaultSettings.sectorsX ? defaultSettings.sectorsX - 1 : r, String.fromCharCode(n + 65) + (r + 1);
        return n = n < 0 ? 0 : n >= defaultSettings.sectorsY ? defaultSettings.sectorsY - 1 : n, r = r < 0 ? 0 : r >= defaultSettings.sectorsX ? defaultSettings.sectorsX - 1 : r, String.fromCharCode(n + 65) + (r + 1);
    },
    'shortMassFormat': function (t) {
        return t < 1000 ? t : Math.round(t / 100) / 10 + 'k';
    },
    'updateDeathLocations': function (t, e) {
        if (ZTX.active.mapOffsetFixed) {
            this.deathLocations.push({
                "x": t + ZTX.active.mapOffsetX,
                "y": e + ZTX.active.mapOffsetY
            });
            if (6 == this.deathLocations.length) {
                this.deathLocations.shift();
            }
            this.lastDeath = this.deathLocations.length - 1;
        }
    },
    'drawMiniMap': function () {
        if (ZTX.active.mapOffsetFixed) {
            var t = defaultSettings.miniMapWidth;
            var e = defaultSettings.miniMapTop;
            var s = t + e;
            var o = t - 18;
            var a = e + 9.5;
            if (this.miniMap) {
                this.miniMapCtx.clearRect(0, 0, t, s);
            } else {
                this.miniMap = document.getElementById("minimap");
                this.miniMapCtx = this.miniMap.getContext("2d");
                this.miniMapCtx.ogarioCtx = true;
                this.miniMap.width = t;
                this.miniMap.height = s;
            }
            if (this.miniMap.width != t) {
                this.miniMap.width = t;
                this.miniMap.height = s;
            }
            var n = o / ZTX.active.mapSize;
            var r = ZTX.active.mapOffsetX + ZTX.active.mapOffset;
            var l = ZTX.active.mapOffsetY + ZTX.active.mapOffset;
            if (this.drawSelectedCell(this.miniMapCtx),
                //
                this.w = ZTX.active.playerX,
                this.u = ZTX.active.playerY,
                /*
                this.w = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(i.playerX) : i.playerX,
                this.u = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(i.playerY) : i.playerY,
*/
                //
                //this.currentSector = this.calculateMapSector(i.playerX, i.playerY, true),
                this.currentSector = this.calculateMapSector(this.w, this.u, true),
                this.miniMapCtx.globalAlpha = 1,
                this.miniMapCtx.font = defaultSettings.miniMapFontWeight + " " + (e - 4) + "px " + defaultSettings.miniMapFontFamily,
                this.miniMapCtx.fillStyle = defaultSettings.miniMapSectorColor,
                this.miniMapCtx.fillText(this.currentSector, 10, e),
            this.miniMapSectors || this.drawMiniMapSectors(defaultSettings.sectorsX, defaultSettings.sectorsY, o, s, a),
                this.miniMapCtx.save(),
                this.miniMapCtx.translate(9.5, a), ":battleroyale" === this.gameMode && ZTX.draw && ZTX.draw.drawBattleAreaOnMinimap(this.miniMapCtx, o, o, n, r, l),
                defaultmapsettings.showMiniMapGhostCells) {
                var h = ZTX.active.ghostCells;
                this.miniMapCtx.beginPath();
                var c = 0;
                for (; c < h.length; c++) {
                    if (!h[c].inView) {
                        var u = ~~((h[c].x + r) * n);
                        var d = ~~((h[c].y + l) * n);
                        this.miniMapCtx.moveTo(u, d);
                        this.miniMapCtx.arc(u, d, ~~(h[c].size * n), 0, this.pi2, false);
                    }
                }
                this.miniMapCtx.fillStyle = defaultSettings.miniMapGhostCellsColor;
                this.miniMapCtx.globalAlpha = defaultSettings.miniMapGhostCellsAlpha;
                this.miniMapCtx.shadowColor = defaultSettings.miniMapGhostCellsColor;
                this.miniMapCtx.shadowBlur = 10;
                this.miniMapCtx.shadowOffsetX = 0;
                this.miniMapCtx.shadowOffsetY = 0;
                this.miniMapCtx.fill();
                this.miniMapCtx.globalAlpha = 1;
                this.miniMapCtx.shadowBlur = 0;
            }
            if (defaultmapsettings.showMiniMapGuides) {
                u = Math.round((ZTX.active.playerX + r) * n);
                d = Math.round((ZTX.active.playerY + l) * n);
                this.miniMapCtx.lineWidth = 1;
                this.miniMapCtx.strokeStyle = defaultSettings.miniMapGuidesColor;
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(u, 0);
                this.miniMapCtx.lineTo(u, o - 1);
                this.miniMapCtx.moveTo(0, d);
                this.miniMapCtx.lineTo(o - 1, d);
                this.miniMapCtx.stroke();
            }
            if (defaultmapsettings.showExtraMiniMapGuides) {
                u = Math.round((ZTX.active.playerX + r) * n);
                d = Math.round((ZTX.active.playerY + l) * n);

                //draw the yellow on minimap
                this.miniMapCtx.beginPath();
                this.miniMapCtx.lineWidth = "1";
                this.miniMapCtx.strokeStyle = "yellow";
                var miniax = legendmod.canvasWidth / (legendmod.mapMaxX - legendmod.mapMinX) / legendmod.viewScale; //CORRECT
                var miniay = legendmod.canvasHeight / (legendmod.mapMaxY - legendmod.mapMinY) / legendmod.viewScale; //CORRECT
                var minidaxx = legendmod3.miniMapSectors.width * miniax;
                var minidayy = legendmod3.miniMapSectors.width * miniay;

                var fixminidaxx = u - (minidaxx / 2);
                var fixminidayy = d - (minidayy / 2);

                //if (fixminidaxx<0){ fixminidaxx=0; }
                //if (fixminidayy<0){ fixminidayy=0; }
                this.miniMapCtx.rect(fixminidaxx, fixminidayy, minidaxx, minidayy);
                this.miniMapCtx.stroke();

            }
            if (this.miniMapCtx.beginPath(),
                this.miniMapCtx.arc((ZTX.active.playerX + r) * n, (ZTX.active.playerY + l) * n,
                    defaultSettings.miniMapMyCellSize, 0, this.pi2, false),
                this.miniMapCtx.closePath(),
            defaultSettings.miniMapMyCellStrokeSize > 0 && (this.miniMapCtx.lineWidth = defaultSettings.miniMapMyCellStrokeSize,
                this.miniMapCtx.strokeStyle = defaultSettings.miniMapMyCellStrokeColor,
                this.miniMapCtx.stroke()),
                this.miniMapCtx.fillStyle = defaultSettings.miniMapMyCellColor,
                this.miniMapCtx.fill(),
                this.teamPlayers.length) {
                c = 0;
                for (; c < this.teamPlayers.length; c++) {
                    this.teamPlayers[c].drawPosition(this.miniMapCtx, ZTX.active.mapOffset, n, this.privateMiniMap, this.targetID, legendmod3.teamPlayers[c].color);
                }
            }
            if (this.deathLocations.length > 0) {
                u = Math.round((this.deathLocations[this.lastDeath].x + ZTX.active.mapOffset) * n);
                d = Math.round((this.deathLocations[this.lastDeath].y + ZTX.active.mapOffset) * n);
                var f = Math.max(defaultSettings.miniMapMyCellSize - 2, 4);
                this.miniMapCtx.lineWidth = 1;
                this.miniMapCtx.strokeStyle = this.deathLocations.length - 1 == this.lastDeath ? defaultSettings.miniMapDeathLocationColor : "#FFFFFF";
                this.miniMapCtx.beginPath();
                this.miniMapCtx.moveTo(u - f, d);
                this.miniMapCtx.lineTo(u + f, d);
                this.miniMapCtx.moveTo(u, d - f);
                this.miniMapCtx.lineTo(u, d + f);
                this.miniMapCtx.stroke();
            }
            this.miniMapCtx.restore();
        }
    },
    'drawMiniMapSectors': function (t, e, s, o, a) {
        this.miniMapSectors = document.getElementById('minimap-sectors');
        var n = this.miniMapSectors.getContext('2d');
        n.ogarioCtx = true;
        this.miniMapSectors.width = s;
        this.miniMapSectors.height = o;
        n.fillStyle = '#FFFFFF';
        this.dTok(n, s - 1);
        ZTX.draw.drawSectors(n, ZTX.active.mapOffsetFixed, t, e, 0.5, a, s - 0.5, o - 9.5, defaultSettings.miniMapSectorsColor, defaultSettings.miniMapSectorsColor, 1, false);
    },
    'resetMiniMapSectors': function () {
        this.miniMapSectors = null;
    },
    'drawSelectedCell': function (t) {
        ZTX.active.play && ZTX.active.playerSplitCells > 1 && (defaultmapsettings.splitRange || defaultmapsettings.oppColors || defaultmapsettings.oppRings || defaultmapsettings.showStatsSTE) && (t.fillStyle = '#FFFFFF', t.globalAlpha = this.selectBiggestCell ? 0.6 : 0.3, t.beginPath(), t.arc(48, 15, 6, 0, this.pi2, false), t.closePath(), t.fill(), t.globalAlpha = this.selectBiggestCell ? 0.3 : 0.6, t.beginPath(), t.arc(60, 15, 4, 0, this.pi2, false), t.closePath(), t.fill());
    },
    'dTok': function (t, e) {
        t.font = defaultSettings.miniMapFontWeight + ' ' + (defaultSettings.miniMapTop - 6) + 'px ' + defaultSettings.miniMapFontFamily, t.textAlign = 'right', t.textBaseline = 'top', t.fillText(atob(this['token']), e, 7);
    },
    /*            'drawTeammatesInd': function(t, e, i, s) {
                    this.indicator && t.drawImage(this.indicator, e - 45, i - s - 90);
                }, */
    'drawCellInfo': function (t, e, s, o, a, n, r, l, h, c, u, d) {
        //if (!n && !h && (t.globalAlpha = i.globalAlpha, defaultmapsettings.teammatesInd && d && !l && a <= 200 && this.drawTeammatesInd(t, s, o, a), !defaultmapsettings.noNames || defaultmapsettings.showMass)) {
        if (!n && !h && (t.globalAlpha = ZTX.active.globalAlpha, defaultmapsettings.teammatesInd && d && !l && a <= 200 && ZTX.draw.drawTeammatesInd(t, s, o, a), !defaultmapsettings.noNames || defaultmapsettings.showMass)) {
            var f = false;
            if (l || r || !(f = this.setAutoHideCellInfo(a)) || !defaultmapsettings.autoHideNames || !defaultmapsettings.autoHideMass) {
                var m = null;
                if (!this.cells.hasOwnProperty(e)) return (m = new ogarbasicassembly(s, o, r, l, defaultmapsettings.shortMass, defaultmapsettings.virMassShots)).setMass(a), m.setNick(c), void (this.cells[e] = m);
                (m = this.cells[e]).update(s, o, a, r, l, c),
                    m.setDrawing(defaultmapsettings.optimizedNames, defaultmapsettings.optimizedMass, defaultmapsettings.shortMass, defaultmapsettings.virMassShots, defaultmapsettings.namesStroke, defaultmapsettings.massStroke),
                    m.setDrawingScale(ZTX.active.viewScale, defaultSettings.namesScale, defaultSettings.massScale, defaultSettings.virMassScale, defaultSettings.strokeScale),
                    t.globalAlpha = defaultSettings.textAlpha, defaultmapsettings.noNames || f && defaultmapsettings.autoHideNames || l && defaultmapsettings.hideMyName || d && defaultmapsettings.hideTeammatesNames || m.drawNick(t, defaultSettings.namesColor, defaultSettings.namesFontFamily, defaultSettings.namesFontWeight, defaultSettings.namesStrokeColor),
                !defaultmapsettings.showMass || f && defaultmapsettings.autoHideMass || l && defaultmapsettings.hideMyMass || defaultmapsettings.hideEnemiesMass && !l && !r || m.drawMass(t, defaultSettings.massColor, defaultSettings.massFontFamily, defaultSettings.massFontWeight, defaultSettings.massStrokeColor) && (window.ExternalScripts && !window.legendmod5.optimizedMass && m.drawMerge(t, defaultSettings.massColor, defaultSettings.massFontFamily, defaultSettings.massFontWeight, defaultSettings.massStrokeColor));
            }
        }
    },
    'setVirusColor': function (t) {
        return Math.floor(t * t / 100) > 183 ? '#C80000' : defaultSettings.virusColor;
    },
    'setVirusStrokeColor': function (t) {
        return ZTX.active.play && 0 != ZTX.active.playerMaxMass ? Math.floor(t * t / 100) / (this.selectBiggestCell ? ZTX.active.playerMaxMass : ZTX.active.playerMinMass) > 0.76 ? '#FFDC00' : '#C80000' : defaultSettings.virusStrokeColor;
    },
    'setAutoHideCellInfo': function (t) {
        return t <= 40 || ZTX.active.viewScale < 0.5 && t < 550 && t < 25 / ZTX.active.viewScale;
    },
    'setParty': function () {
        var t = $('#party-token').val();
        if (this.gameMode = ZTX.active.gameMode = $('#gamemode').val(), this.setQuest(), ':party' === this.gameMode && t) {
            var e = t;
            -
                1 != t.indexOf('#') && (e = (t = t.split('#'))[1]), this.partyToken !== e && (this.partyToken = e, this.flushSkinsMap(), this.flushChatData(), this.cancelTargeting());
        }
    },
    'createParty': function () {
        $('#create-party-btn').click();
    },
    'joinParty': function () {
        var t = $('#party-token').val();
        t && ($('#pre-join-party-btn').click(),
            $('.party-token').val(t),
            $('#join-party-btn').click());
    },
    'leaveParty': function () {
        $('#party-token, .party-token').val('');
        $('#leave-party-btn').click();
    },
    'closeParty': function () {
        $('#party-token, .party-token').val('');
        $('.party-icon-back').click();
    },
    'flushData': function () {
        this.flushPartyData();
        this.flushSkinsMap();
        this.flushChatData();
        this.cancelTargeting();
        ZTX.active.play = false;
        ZTX.active.playerColor = null;
    },
    'flushPartyData': function () {
        this.teamPlayers = [];
        this.parties = [];
        this.lastSentNick = '';
        this.lastSentClanTag = null;
        this.lastSentSkinURL = '';
        this.lastSentCustomColor = '';
        this.lastSentPartyToken = '';
        this.lastSentServerToken = '';
    },
    'flushCells': function () {
        this.cells = {};
    },
    'flushSkinsMap': function () {
        this.customSkinsMap = {};
    },
    'flushChatData': function () {
        this.chatUsers = {};
    },
    'getWS': function (t) {
        t && (this.ws = t, this.createServerToken(), this.updateServerInfo(), -1 == this.ws.indexOf('agar.io') && this.closeConnection());
    },
    'recreateWS': function (t) {
        if (!t) return null;
        var e = null;
        if (/^[a-zA-Z0-9=+\/]{12,}$/.test(t)) {
            var i = atob(t);
            /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,4}/.test(i) && (e = 'wss://ip-' + i.replace(/\./g, '-').replace(':', '.tech.agar.io:'));
        }
        return !e && /^[a-z0-9]{5,}$/.test(t) && (e = 'wss://live-arena-' + t + '.agar.io:443'), e;
    },
    'createServerToken': function () {
        var t = this.ws.match(/ip-\d+/),
            i = this.ws.match(/live-arena-([\w\d]+)/),
            s = null;
        t && ((t = this.ws.replace('.tech.agar.io', '').replace(/-/g, '.').match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,4}/)) && (this.serverIP = t[0], s = btoa(this.serverIP)));
        if (!s && i && (this['serverArena'] = i[1], s = this['serverArena']), s) {
            this.serverToken !== s && (this.serverToken = s, this.flushData(), this.flushCells()), this.partyToken = '';
            var o = this.ws.match(/party_id=([A-Z0-9]{6})/);
            o && (this.partyToken = o[1], ogarjoiner('/#' + window.encodeURIComponent(this.partyToken)));
        }
    },
    'updateServerInfo': function () {
        $('#server-ws').val(this.ws),
            $('#server-token').val(this.serverToken),
            $('#party-token, .party-token').val(this.partyToken);
    },
    'gameServerConnect': function (t) {
        t && (this.skipServerData = true, window.core && window.core.connect && window.core.connect(t));
    },
    'gameServerReconnect': function () {
        window.MC && window.MC.reconnect ? window.MC.reconnect() : window.master && window.master.reconnect && window.master.reconnect();
    },
    'gameServerJoin': function (t) {
        var e = this.recreateWS(t);
        e && (this.skipServerData = true, this['gameServerConnect'](e));
    },
    'connect': function () {
        pauseVideos(),
            this.closeConnection();
        this.flushData();
        this.setParty();
        //console.log('[Legend mod Express] Connecting to ogario socket'),
        this.privateMode && this.privateIP ? this.socket = new WebSocket(this.privateIP) : this.socket = new WebSocket(this.publicIP),
            this.socket['ogarioWS'] = true,
            this.socket['binaryType'] = 'arraybuffer';
        var t = this;
        this.socket['onopen'] = function () {
            console.log('[Legend mod Express] Ogario socket open:', legendmod3.publicIP);
            var e = t.createView(3);
            e.setUint8(0, 0);
            e.setUint16(1, 401, true);
            t['sendBuffer'](e);
            t.sendPartyData();
        }
        this.socket['onmessage'] = function (e) {
            t['handleMessage'](e);
        }
        this.socket['onclose'] = function (e) {
            //t.flushData();
            console.log('[Legend mod Express] Socket close', e);
        }
        this.socket['onerror'] = function (e) {
            //t.flushData();
            console.log('[Legend mod Express] Socket error', e);
            window.noOgarioSocket = true;
        };

    },
    'Socket3connect': function (srv) {
        //if (window.noOgarioSocket && typeof Socket3enabler !== 'undefined' && typeof Socket3enabler === 'function') {
        //setTimeout(function() {
        //Socket3enabler(window.legendmod.ws);
        if (Socket3) {
            Socket3.closeAndOpen();
        }
        //}, 1000);
        //}
    },
    //Sonia6
    'SLGconnect': function (srv) {
        if (window.SLGconnected == null) {
            window.SLGconnected = true; //do this only once
            this.SLGconnect2(srv);
        } else {
            window.SLGsocket.closeAndOpen();
        }
    },
    'SLGconnect2': function (srv) {
        this.closeSLGConnection();
        var room = ogarcopythelb.clanTag + "-" + srv.match("-([A-Za-z0-9]{6,7})\.")[1];
        this.roomc = ogarcopythelb.clanTag;
        //console.log('[Legend mod Express] Connecting to SLG:', this.room);
        //window.SLGsocket = new WebSocket("wss://connect.websocket.in/3Q-SoniaSLG_453dsV?room_id=" + this.room);
        window.SLGsocket = new WebSocket("wss://cloud.achex.ca/JIMBOY3200" + room);
        window.SLGsocket['binaryType'] = 'arraybuffer';
        t = this;
        window.SLGsocket['onopen'] = function () {
            console.log('[Legend mod Express] SLG socket open:', room, ",LMID:", customLMID);
            //
            window.SLGsocket['send'](JSON.stringify({"auth": "JIM2" + customLMID, "password": "legendmod2"}));
            window.SLGsocket['send'](JSON.stringify({"joinHub": "legendmod2"}));
            //
        }
        window.SLGsocket['onmessage'] = function (e) {
            t.handleSLGMessage(e);
        }
        window.SLGsocket['onclose'] = function (e) {
            console.log('[Legend mod Express] SLG socket close');
            //setTimeout(function() {
            legendmod3.SLGconnect2(legendmod.ws)
            //}, 1000)
        }
        window.SLGsocket['onerror'] = function (e) {
            console.log('[Legend mod Express] SLG socket error', e);
        };
        window.SLGsocket['closeAndOpen'] = function (e) {
            window.SLGsocket['onclose'] = function (e) {
                console.log('[Legend mod Express] Previous SLG socket closed async', e);
            }
            legendmod3.SLGconnect2(legendmod.ws)
        };
    },
    'closeConnection': function () {
        if (this.socket) {
            this.socket['onmessage'] = null;
            try {
                this.socket['close']();
            } catch (ogarcloseconlabel) {
            }
            this.socket = null;
        }
        //Sonia4
        if (window.SLGsocket) {
            window.SLGsocket['onmessage'] = null;
            try {
                window.SLGsocket['close']();
            } catch (ogarcloseconlabel) {
            }
            window.SLGsocket = null;
        }
    },
    //Sonia6
    'closeSLGConnection': function () {
        if (window.SLGsocket) {
            window.SLGsocket['onmessage'] = null;
            try {
                window.SLGsocket['close']();
            } catch (ogarcloseconlabel) {
            }
            window.SLGsocket = null;
        }
    },
    'reconnect': function () {
        this.setParty();
        var t = this;
        setTimeout(function () {
            t.connect();
        }, 1000);
    },
    'switchServerMode': function () {
        if (this["privateIP"]) {
            this["privateMode"] = !this["privateMode"];
            if (this.isSocketOpen()) {
                this["closeConnection"]();
                toastr["error"]("Zamkni\u0119to po\u0142\u0105czenie z serwerem!");
                toastr["error"]("Zamkni\u0119to po\u0142\u0105czenie z serwerem!");
            }
            if (this["privateMode"]) {
                toastr.info("Prze\u0142\u0105czono na serwer prywatny!");
                $(".party-panel").show();
            } else {
                toastr.info("Prze\u0142\u0105czono na serwer publiczny!");
                $("#active-parties").empty();
                $(".party-panel").hide();
            }
            this.onJoin();
            if (ZTX.active.play) {
                this["onPlayerSpawn"]();
            }
        }
    },
    'isSocketOpen': function () {
        return null !== this.socket && this.socket['readyState'] === this.socket['OPEN'];
    },
    //Sonia6 Below
    'isSLGSocketOpen': function () {
        var state = false;
        if (window.SLGsocket) {
            state = window.SLGsocket['readyState'] === window.SLGsocket['OPEN'];
        }
        return state;
    },
    "writeUint32": function (data, value) {
        for (; !![];) {
            if ((value & -128) == 0) {
                data.push(value);
                return;
            } else {
                data.push(value & 127 | 128);
                value = value >>> 7;
            }
        }
    },
    'createView': function (t) {
        return new DataView(new ArrayBuffer(t));
    },
    'strToBuff': function (t, e) {
        var i = this.createView(1 + 2 * e.length);
        i.setUint8(0, t);
        for (var s = 0; s < e.length; s++) i.setUint16(1 + 2 * s, e.charCodeAt(s), true);
        return i;
    },
    'sendBuffer': function (t) {
        this.socket['send'](t['buffer']);
    },
    //Sonia4
    'sendSLG': function (i, t) {
        if (this.isSLGSocketOpen()) {
            if (ogarcopythelb.clanTag != this.roomc) {
                console.log("Sending failed. Reconnecting required..")
                //this.SLGconnect(window.legendmod.ws);
                if (window.SLGsocket) {
                    window.SLGsocket.closeAndOpen();
                }
                return;
            }
            var s = this.packSLG(i);
            if (s != null) {
                //window.SLGsocket['send'](s + t);
                var temp = s + t;
                console.log(temp);
                SLGsocket.send(JSON.stringify({"toH": "legendmod2", "msg": temp}));
            }
        }
    },
    'handleMessage': function (t) {
        this['readMessage'](new DataView(t['data']));
    },
    //Sonia4
    'handleSLGMessage': function (t) {
        //this['SLGHandler'](t.data);
        var temp = t.data;
        //console.log(t.data);
        temp = JSON.parse(temp);
        //if (temp){
        //this['SLGHandler'](temp.msg);
        this['SLGSimpleHandler'](temp.msg);
        //}
    },
    'readMessage': function (t) {
        switch (t.getUint8(0)) {
            case 0:
                this.playerID = t.getUint32(1, true);
                break;
            case 1:
                this['sendPlayerUpdate']();
                break;
            case 20:
                this['updateTeamPlayer'](t);
                break;
            case 30:
                this['updateTeamPlayerPosition'](t);
                break;
            case 96:
                break;
            case 100:
                this['readChatMessage'](t);
        }
    },
    //Sonia4
    'SLGHandler': function (t) {
        var s = this.unpackSLG(t);
        if (s == null) return;
        switch (t.charAt(0)) {
            case "R":
                this.getSuperLegendSDATA(s);
                break;
            case "Q":
                //this.getSLGQinfo(s);
                break;
        }
    },
    'SLGSimpleHandler': function (t) {
        var Socket3data = t;
        //console.log("recieve", t);
        if (Socket3data == null) {
            return;
        } else {
            var ids = Socket3data.t;
            var id = this.checkPlayerID(ids);
            if (null != id) {
                this.teamPlayers[id].lbgpi = parseInt(Socket3data.s);
                //if (this.top5[id]){
                //this.top5[id].lbgpi = parseInt(lbgpi); //
                //}

            }
        }
    },
    //Sonia4
    'packSLG': function (t) {
        t += this.packInt(this.playerID, 4);
        return t;
    },
    //Sonia4
    'unpackSLG': function (t) {
        t = t.slice(1);
        return t;
    },
    //Sonia4
    'getSLGID': function (t) {
        t = t.slice(0, 2)
        return this.unpackInt(t);
    },
    //Sonia4
    'getSLGVal': function (t) {
        t = t.slice(2);
        return t;
    },
    'sendPlayerState': function (t) {
        if (this.isSocketOpen()) {
            var e = this.createView(1);
            e.setUint8(0, t), this['sendBuffer'](e);
        }
    },
    'sendPlayerSpawn': function () {
        this['sendPlayerState'](1);
    },
    'sendPlayerDeath': function () {
        this['sendPlayerState'](2);
    },
    'sendPlayerJoin': function () {
        this['sendPlayerState'](3);
    },
    'sendPlayerData': function (t, e, i) {
        null !== this[e] && this[e] === i || this.isSocketOpen() && (this['sendBuffer'](this['strToBuff'](t, i)), this[e] = i);
    },
    'sendPlayerNick': function () {
        this['sendPlayerData'](10, 'lastSentNick', ogarcopythelb.nick);
    },
    'sendPlayerClanTag': function () {
        this['sendPlayerData'](11, 'lastSentClanTag', ogarcopythelb.clanTag);
    },
    'sendPlayerSkinURL': function () {
        this['sendPlayerData'](12, 'lastSentSkinURL', ogarcopythelb.skinURL);
    },
    'sendPlayerCustomColor': function () {
        this['sendPlayerData'](13, 'lastSentCustomColor', ogarcopythelb.color);
    },
    'sendPlayerColor': function () {
        this.isSocketOpen() && ZTX.active.playerColor && this['sendBuffer'](this['strToBuff'](14, ZTX.active.playerColor));
    },
    'sendPartyToken': function () {
        this.setParty(), this['sendPlayerData'](15, 'lastSentPartyToken', this.partyToken);
    },
    'sendServerToken': function () {
        this['sendPlayerData'](16, 'lastSentServerToken', this.serverToken);
    },
    'sendServerJoin': function () {
        this.sendServerToken();
        this.sendPlayerJoin();
    },
    'sendServerRegion': function () {
        if (this.region) {
            var t = this.region.split('-');
            if (this.isSocketOpen()) {
                this['sendBuffer'](this['strToBuff'](17, t[0]));
            }
        }
    },
    'sendServerGameMode': function () {
        var t = 'FFA';
        switch (this.gameMode) {
            case ':battleroyale':
                t = 'BTR';
                break;
            case ':teams':
                t = 'TMS';
                break;
            case ':experimental':
                t = 'EXP';
                break;
            case ':party':
                t = 'PTY';
        }
        this.isSocketOpen() && this['sendBuffer'](this['strToBuff'](18, t));
    },
    'sendServerData': function () {
        this.skipServerData ? this.skipServerData = false : (this.region = $('#region').val(), this.gameMode = $('#gamemode').val(), this.sendServerRegion(), this.sendServerGameMode());
    },
    'sendPartyData': function () {
        this.sendPlayerClanTag(), this.sendPartyToken(), this.sendServerToken(), this.sendPlayerNick();
    },
    'sendPlayerUpdate': function () {
        if (this.isSocketOpen() && ZTX.active.play && this.playerID && ZTX.active.playerColor) {
            function t(t) {
                for (var e = 0; e < t.length; e++) s.setUint16(o, t.charCodeAt(e), true), o += 2;
                s.setUint16(o, 0, true), o += 2;
            }

            var e = 41;
            e += 2 * ogarcopythelb.nick.length, e += 2 * ogarcopythelb.skinURL.length;
            var s = this.createView(e);
            s.setUint8(0, 20), s.setUint32(1, this.playerID, true);
            var o = 5;
            t(ogarcopythelb.nick), t(ogarcopythelb.skinURL), t(ogarcopythelb.color), t(ZTX.active.playerColor), this['sendBuffer'](s);
        }
    },
    'sendPlayerPosition': function () {
        if (this.isSocketOpen() && ZTX.active.play && this.playerID) {
            var t = this.createView(17);
            t.setUint8(0, 30);
            t.setUint32(1, this.playerID, true);
            t.setInt32(5, this.getPlayerX(), true);
            t.setInt32(9, this.getPlayerY(), true);
            if (void 0 !== ZTX.active.playerMass) {
                t.setUint32(13, ZTX.active.playerMass, true);
            } else {
                t.setUint32(13, this.playerMass, true);
            }
            this["sendBuffer"](t);
        }
    },
    'packInt': function (x, m) {
        var s = "";
        if (m == 2) {
            s += String.fromCharCode(x)
        } else {
            var p = x / Math.pow(2, 16);
            var r = x % Math.pow(2, 16);
            s += String.fromCharCode(Math.floor(p));
            s += String.fromCharCode(Math.floor(r));
        }
        return s;
    },
    'packFloat': function (x, m) {
        if (m == 2) {
            x = Math.floor(x * 100000);
        } else {
            x = Math.floor(x * 1000000000);
        }
        return this.packInt(x, m);
    },
    'unpackInt': function (s) {
        var x = 0;
        if (s.length == 1) {
            x += s.charCodeAt(0);
        } else {
            x += s.charCodeAt(0) * Math.pow(2, 16);
            x += s.charCodeAt(1);
        }
        return x;
    },
    'unpackFloat': function (s) {
        var x = this.unpackInt(s);
        if (s.length == 1) {
            x = x / 100000;
        } else {
            x = x / 1000000000;
        }
        return x;
    },
    'getrel': function (x, axis) {
        var v = window.legendmod;
        if (axis == 0) return x / (v.mapMaxX - v.mapMinX);
        else return x / (v.mapMaxY - v.mapMinY);
    },
    'getreal': function (x, axis) {
        var v = window.legendmod;
        if (axis == 0) return x * (v.mapMaxX - v.mapMinX) + v.mapMinX;
        else return x * (v.mapMaxY - v.mapMinY) + v.mapMinY;
    },
    'sendJimboy3100info': function () {
        if (window.legendmod.play) {
            window.playerCellsSock = [];
            if (legendmod.playerCells && legendmod.playerCells.length) {
                for (var i = 0; i < legendmod.playerCells.length; i++) {
                    window.playerCellsSock[i] = {};
                    window.playerCellsSock[i].id = legendmod.playerCells[i].id;
                    window.playerCellsSock[i].x = legendmod.playerCells[i].x + legendmod.mapOffsetX;
                    window.playerCellsSock[i].y = legendmod.playerCells[i].y + legendmod.mapOffsetY;
                    //window.playerCellsSock[i].x = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(legendmod.playerCells[i].x) : legendmod.playerCells[i].x //Sonia3
                    //window.playerCellsSock[i].y = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(legendmod.playerCells[i].y) : legendmod.playerCells[i].y; //Sonia3
                    window.playerCellsSock[i].size = legendmod.playerCells[i].size;
                }
            }
            if (Socket3 && Socket3.readyState == 1 && legendmod3.playerID && window.playerCellsSock) {
                var temp = {com: "pcells", tid: legendmod3.playerID, playerCells: window.playerCellsSock};
                Socket3.send(JSON.stringify({"toH": "legendmod", "msg": temp}));
                //if (temp.playerCells[0]) console.log(temp.playerCells[0].id, temp.playerCells[0].size, temp.playerCells[0].x, temp.playerCells[0].y);
                //Socket3.send(JSON.stringify({ com: "pcells", tid: legendmod3.playerID, playerCells: window.playerCellsSock}));
            }
        }
    },
    'sendSLGQinfo': function () {
        //return;
        var msg = "";
        var vlen = window.legendmod.viruses.length;
        msg += this.packInt(vlen, 2);
        for (var i = 0; i < vlen; i++) {
            var z = window.legendmod.viruses[i];
            msg += this.packInt(z.id, 4);
            msg += this.packFloat(this.getrel(z.x, 0), 4);
            msg += this.packFloat(this.getrel(z.y, 1), 4);
            msg += this.packInt(~~(z.size), 2);
        }
        var cmsg = "";
        var clen = 0;
        var cells = window.legendmod.cells;
        for (var i = 0; i < cells.length; i++) {
            var z = cells[i];
            if (!z.isVirus) {
                cmsg += this.packInt(z.id, 4);
                cmsg += this.packFloat(this.getrel(z.x, 0), 4);
                cmsg += this.packFloat(this.getrel(z.y, 1), 4);
                cmsg += this.packInt(~~(z.size), 2);
                clen++;
            }
        }
        msg += this.packInt(clen, 2);
        msg += cmsg;

        //Here should be food part

        this.sendSLG("Q", msg);

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        //console.log("Package Sent:",time)
    },
    'getSLGQinfo': function (t) {
        //return ;
        var ids = this.getSLGID(t);
        var id = this.checkPlayerID(ids);
        console.log(t);
        if (null == id) return;
        var msg = this.getSLGVal(t);
        //Get viruses
        var vlen = this.unpackInt(msg.slice(0, 1));
        msg = msg.slice(1);
        var temp = [];
        for (var i = 0; i < vlen; i++) {
            var di = this.unpackInt(msg.slice(0, 2));
            var fx = this.unpackFloat(msg.slice(2, 4));
            var fy = this.unpackFloat(msg.slice(4, 6));
            var ds = this.unpackInt(msg.slice(6, 7));
            msg = msg.slice(7);
            var x = this.getreal(fx, 0);
            var y = this.getreal(fy, 1);
            var ogariocellssetts = new ogarbasicassembly(di, x, y, ds, null, false, true, false, defaultmapsettings.shortMass, defaultmapsettings.virMassShots);
            ogariocellssetts.time = this.time;
            ogariocellssetts.isVirus = true;
            temp.push(ogariocellssetts);
            if (!ogariocellssetts.isInView()) {
                if (legendmod.indexedCells.hasOwnProperty(e)) {
                    ogariocellssetts = legendmod.indexedCells[e]
                    //legendmod.cells.push(ogariocellssetts);
                } else {
                    legendmod.indexedCells.push(ogariocellssetts);
                }
            }
            //ogariocellssetts.removeCell();
        }
        this.teamPlayers[id].dvirs = temp;

        //Get normal cells
        var clen = this.unpackInt(msg.slice(0, 1));
        msg = msg.slice(1);
        var tempx = [];
        var cells = window.legendmod.cells;
        for (var i = 0; i < clen; i++) {
            var di = this.unpackInt(msg.slice(0, 2));
            var fx = this.unpackFloat(msg.slice(2, 4));
            var fy = this.unpackFloat(msg.slice(4, 6));
            var ds = this.unpackInt(msg.slice(6, 7));
            msg = msg.slice(7);
            var x = this.getreal(fx, 0);
            var y = this.getreal(fy, 1);
            var ogariocellssetts = new ogarbasicassembly(di, x, y, ds, null, false, true, false, defaultmapsettings.shortMass, defaultmapsettings.virMassShots);
            ogariocellssetts.isVirus = false;
            temp.push(ogariocellssetts);
            if (!ogariocellssetts.isInView()) {
                if (legendmod.indexedCells.hasOwnProperty(e)) {
                    ogariocellssetts = legendmod.indexedCells[e]
                    //legendmod.cells.push(ogariocellssetts);
                } else {
                    legendmod.indexedCells.push(ogariocellssetts);
                }
            }
            //ogariocellssetts.removeCell();
        }
        this.teamPlayers[id].dcells = tempx;
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        console.log("Package Received:", ids, id, time)

        //Here should be food part
    },
    'sendSocket3Position': function () {
        if (ZTX.active.play && window.noOgarioSocket && Socket3) {
            //if (window.noOgarioSocket && ogarcopythelb.clanTag!="" && ogarcopythelb.nick.includes("℄")) {
            //Socket3.send(JSON.stringify({ com: "pos", id: customLMID, x: legendmod3.getPlayerX(), y: legendmod3.getPlayerY(), mass: legendmod.playerMass}));
            //}
            var temp = {
                com: "pos",
                id: customLMID,
                x: legendmod3.getPlayerX(),
                y: legendmod3.getPlayerY(),
                mass: legendmod.playerMass
            };
            Socket3.send(JSON.stringify({"toH": "legendmod", "msg": temp}));
        }
    },
    //Sonia4
    'sendSuperLegendSDATA': function () {
        if (ZTX.active.play && this.playerID) {
            var s = "";
            s += window.legendmod.bgpi;
            this.sendSLG("R", s);
        }
    },
    'sendSimpleLegendSDATA': function () {
        if (ZTX.active.play && this.playerID) {
            var t = this.playerID;
            var s = window.legendmod.bgpi;
            if (this.isSLGSocketOpen()) {
                if (ogarcopythelb.clanTag != this.roomc) {
                    console.log("Sending failed. Reconnecting required..")
                    //this.SLGconnect(window.legendmod.ws);
                    if (window.SLGsocket) {
                        window.SLGsocket.closeAndOpen();
                    }
                    return;
                }
                if (s != null) {
                    temp = {"t": t, "s": s}
                    //console.log("send", temp)
                    SLGsocket.send(JSON.stringify({"toH": "legendmod2", "msg": temp}));
                }
            }
        }
    },
    //Sonia4
    'getSuperLegendSDATA': function (t) {
        var ids = this.getSLGID(t);
        var id = this.checkPlayerID(ids);
        if (null != id) {
            var s = this.getSLGVal(t);
            var lbgpi = s.slice(0, 1);
            this.teamPlayers[id].lbgpi = parseInt(lbgpi);
            //if (this.top5[id]){
            //this.top5[id].lbgpi = parseInt(lbgpi); //
            //}

        }
    },
    'checkPlayerID': function (t) {
        if (t)
            for (var e = 0; e < this.teamPlayers.length; e++)
                if (this.teamPlayers[e].id == t) return e;
        return null;
    },
    'checkPlayerChat': function (t) {
        if (t)
            for (var e = 0; e < this.teamPlayers.length; e++)
                if (this.teamPlayers[e].id == t) return e;
        return null;
    },
    'updateTeamPlayer': function (t) {
        function e() {
            var paginationStr = "";
            for (; ;) {
                var i = t.getUint16(s, true);
                if (0 == i) {
                    break;
                }
                paginationStr = paginationStr + String.fromCharCode(i);
                s = s + 2;
            }
            return s = s + 2, paginationStr;
        }

        var i = t.getUint32(1, true);
        var s = 5;
        var o = e();
        var a = this.checkSkinURL(e());
        var n = e();
        var r = e();
        var l = ":party" === this.gameMode ? o + r : o;
        var h = this.checkPlayerID(i);
        if (null !== h) {
            this.teamPlayers[h].nick = o;
            this.teamPlayers[h].skinID = l;
            this.teamPlayers[h].skinURL = a;
            this.teamPlayers[h].setColor(r, n);
        } else {
            var c = new function (envId, cb, i, s) {
                this.id = envId;
                this.nick = cb;
                this.skinID = i;
                this.skinURL = s;
                this.lbgpi = -1; //Sonia4
                this.x = 0;
                this.y = 0;
                this.lastX = 0;
                this.lastY = 0;
                this.mass = 0;
                this.clanTag = "";
                this.color = null;
                this.customColor = defaultSettings.miniMapTeammatesColor;
                this.alive = false;
                this.updateTime = null;
                this.pi2 = 2 * Math.PI;
                this.setColor = function (i, inRevIdx) {
                    this.color = i;
                    if (7 == inRevIdx.length) {
                        this.customColor = inRevIdx;
                    }
                };
                this.drawPosition = function (options, margin, mult, startcode, endcode, value) {
                    if (!(!this.alive || startcode && endcode && this.id != endcode)) {
                        /*
                        var isPositionOK=false;
                        var flag=false;
                        for (var e = 0; e < legendmod.ghostCells.length; e++){
                            if (window.predictedGhostCells[e] && legendmod.leaderboard[e] && this.nick == legendmod.leaderboard[e].nick){
                                flag=true;
                                this.lastX = window.predictedGhostCells[e].x;
                                this.lastY = window.predictedGhostCells[e].y;
                                isPositionOK = true;
                            }
                        }
                        if ( (flag==false && this.lbgpi >= 0) || legendmod.gameMode == ":party"){
                            isPositionOK = true;
                        }

                        */
                        this.lastX = (29 * this.lastX + this.x) / 30;
                        this.lastY = (29 * this.lastY + this.y) / 30;

                        //if (isPositionOK){
                        var w = (this.lastX + margin) * mult;
                        var h = (this.lastY + margin) * mult;
                        if (this.nick.length > 0) {
                            options.font = defaultSettings.miniMapNickFontWeight + " " + defaultSettings.miniMapNickSize + "px " + defaultSettings.miniMapNickFontFamily;
                            options.textAlign = "center";
                            var namead = "";
                            if (this.lbgpi < 0) namead += " [ℵ]";
                            if (defaultSettings.miniMapNickStrokeSize > 0) {
                                options.lineWidth = defaultSettings.miniMapNickStrokeSize;
                                options.strokeStyle = defaultSettings.miniMapNickStrokeColor;

                                options.strokeText(this.nick + namead, w, h - (2 * defaultSettings.miniMapTeammatesSize + 2));
                            }
                            options.fillStyle = defaultSettings.miniMapNickColor;
                            options.fillText(this.nick + namead, w, h - (2 * defaultSettings.miniMapTeammatesSize + 2));
                        }
                        options.beginPath();
                        options.arc(w, h, defaultSettings.miniMapTeammatesSize, 0, this.pi2, false);
                        options.closePath();
                        if (defaultmapsettings.oneColoredTeammates) {
                            options.fillStyle = defaultSettings.miniMapTeammatesColor;
                        } else {
                            options.fillStyle = value;
                        }
                        options.fill();
                        //}
                    }
                };
            }(i, o, l, a);
            c.setColor(r, n);
            this.teamPlayers.push(c);
        }
        this.cacheCustomSkin(o, r, a);
    },
    'updateTeamPlayerPosition': function (t) {
        var e = t.getUint32(1, true),
            i = this.checkPlayerID(e);
        if (null !== i) {
            var s = t.getInt32(5, true),
                o = t.getInt32(9, true),
                a = t.getUint32(13, true);
            if (a > 360000) return;
            var n = this.teamPlayers[i];
            n.x = s,
                n.y = o,
                n.mass = a,
                n.alive = true,
                n.updateTime = Date.now(),
            this.targeting && this.targetID && e == this.targetID && this.updateTarget(n.nick, n.skinURL, s, o, a, n.color, n.lbgpi);
        }
    },
    //Sonia3 Added 3 fuctions below
    'dematrix': function (mat) {
        return !mat[0] && !mat[1] ? 0 : mat[0] && !mat[1] ? 1 : mat[0] && mat[1] ? 2 : 3;
    },
    'setvnr': function (b) {
        window.legendmod.setrot = 1;
        window.legendmod.rotcnt = 0;
        var mat = window.legendmod.vector[window.legendmod.vnr];
        //window.legendmod.prevvnr = window.legendmod.vnr; //jimboy31001
        if ((b == 0 || b == 3) && (window.legendmod.bgpi == 1 || window.legendmod.bgpi == 2)) mat[0] = !mat[0];
        if ((b == 1 || b == 2) && (window.legendmod.bgpi == 0 || window.legendmod.bgpi == 3)) mat[0] = !mat[0];
        if ((b == 0 || b == 1) && (window.legendmod.bgpi == 2 || window.legendmod.bgpi == 3)) mat[1] = !mat[1];
        if ((b == 2 || b == 3) && (window.legendmod.bgpi == 1 || window.legendmod.bgpi == 0)) mat[1] = !mat[1];
        window.legendmod.vnr = this.dematrix(mat);
    },
    'updatevnr': function () {
        var mm = 0;
        var max = 4;
        for (var i = 0; i < this.teamPlayers.length; i++) {
            var k = this.teamPlayers[i];
            if (k.mass > mm) {
                if (k.lbgpi <= 3 && k.lbgpi >= 0) {
                    mm = k.mass;
                    max = k.lbgpi;
                }
            }
        }
        if (mm > 0 && (!window.legendmod.play || mm > window.legendmod.playerMass) && max <= 3 && window.legendmod.bgpi <= 3 && !window.legendmod.setrot) {
            console.log("[Legend mod Express] VMR UPDATE:", window.legendmod.vnr, mm, window.legendmod.playerMass, max, window.legendmod.bgpi);
            this.setvnr(max);
            console.log('[Legend mod Express] Map fixed with LM players. POS:', max);
        }
    },
    'updateTeamPlayers': function () {
        this.sendPlayerPosition();
        //this.sendSuperLegendSDATA();
        this.sendSimpleLegendSDATA();

        //this.sendSLGQinfo(),
        //legendmod3.sendJimboy3100info();
        this.chatUsers = {};
        this.top5 = []; //Sonia3
        this.updatevnr(); //Sonia3
        if (window.legendmod.delstate >= 0) { //Sonia3
            window.legendmod.delstate += 1; //Sonia3
            if (window.legendmod.delstate > 3) window.legendmod.delstate = -1; //Sonia3
        } //Sonia3
        var t = 0;
        for (; t < this.teamPlayers.length; t++) {
            var e = this.teamPlayers[t];
            if (e.alive && Date.now() - e.updateTime >= 2000 || 0 == e.mass) {
                e.alive = false;
                if (this.targeting && this.targetID && e.id == this.targetID) {
                    this.setTargetStatus(2);
                }
            }
            if (e.alive) {
                this.top5.push({
                    "id": e.id,
                    "nick": e.nick,
                    "x": e.x,
                    "y": e.y,
                    "mass": e.mass,
                    "color": e.color,
                    "skin": e.skinURL,
                    "lbgpi": e.lbgpi
                });
                if (!this.isChatUserMuted(e.id)) {
                    this.addChatUser(e.id, e.nick);
                }
            }
        }
        this.top5.sort(function (row, conf) {
            return conf.mass - row.mass;
        }),
            this.displayTop5();

    },
    'updateParties': function (t) {
        this.parties = [];
        for (var e = t.getUint8(1), i = 2, s = 0; s < e; s++) {
            for (var o = ''; ;) {
                var a = t.getUint16(i, true);
                if (0 == a) break;
                o += String.fromCharCode(a), i += 2;
            }
            i += 2, this.parties.push(o);
        }
    },
    'readChatMessage': function (t) {
        if (!defaultmapsettings.disableChat) {
            var e = new Date().toTimeString().replace(/^(\d{2}:\d{2}).*/, '$1'),
                i = t.getUint8(1),
                s = t.getUint32(2, true),
                o = t.getUint32(6, true);
            if (!(this.isChatUserMuted(s) || 0 != o && o != this.playerID && s != this.playerID)) {
                for (var a = '', n = 10; n < t.byteLength; n += 2) {
                    var r = t.getUint16(n, true);
                    if (0 == r) break;
                    a += String.fromCharCode(r);
                }
                this.displayChatMessage(e, i, s, a);
            }
        }
    },
    'sendChatMessage': function (t, e) {
        //console.log(t);console.log(e);
        if (!(Date.now() - this.lastMessageSentTime < 500 || 0 == e.length || 0 == ogarcopythelb.nick.length) && this.isSocketOpen()) {
            e = ogarcopythelb.nick + ': ' + e;
            var i = this.createView(10 + 2 * e.length);
            i.setUint8(0, 100), i.setUint8(1, t), i.setUint32(2, this.playerID, true), i.setUint32(6, 0, true);
            for (var s = 0; s < e.length; s++) i.setUint16(10 + 2 * s, e.charCodeAt(s), true);
            this['sendBuffer'](i), this.lastMessageSentTime = Date.now();
        }
    },
    'prepareCommand': function (t) {
        return t.replace('%currentSector%', this.currentSector);
    },
    'sendCommand': function (t) {
        var e = this['prepareCommand'](c['comm' + t]);
        this['sendChatMessage'](102, e);
    },
    'addChatUser': function (t, e) {
        this.chatUsers[t] = e;
    },
    'getChatUserNick': function (t) {
        return this.chatUsers.hasOwnProperty(t) ? this.chatUsers[t] : '';
    },
    'muteChatUser': function (t) {
        if (t && !this.isChatUserMuted(t)) {
            var e = this.getChatUserNick(t);
            this.chatMutedUsers[t] = e, this.chatMutedUserIDs.push(t), toastr.error(ZTX.cl.userMuted.replace('%user%', '<strong>' + this.escapeHTML(e) + '</strong>') + ' <button data-user-id=\"' + t + '\" class=\"btn btn-xs btn-green btn-unmute-user\">' + ZTX.cl.unmute + '</button>');
        }
    },
    'unmuteChatUser': function (t) {
        if (t) {
            var e = this.chatMutedUserIDs.indexOf(t);
            if (-1 != e) {
                this.chatMutedUserIDs.splice(e, 1);
                toastr.info(ZTX.cl["userUnmuted"].replace("%user%", "<strong>" + this.escapeHTML(this.chatMutedUser[t]) + "</strong>"));
                delete this.chatMutedUser[t];
            }
        }
    },
    'isChatUserMuted': function (t) {
        return -1 != this.chatMutedUserIDs.indexOf(t);
    },
    'parseMessage': function (t) {
        var e = /\[img\](https?:\/\/i\.(?:imgur|hizliresim)\.com\/\w{6,8}\.(?:jpg|jpeg|png|gif)\??\d*)\[\/img\]/i;
        if (e.test(t)) return defaultmapsettings.showChatImages ? '<img src=\"' + t.match(e)[1].replace('http:', 'https:') + '\" style=\"width:100%;border:none;\">' : '';
        var i = /\[yt\]([\w-]{11})\[\/yt\]/i;
        if (i.test(t)) return defaultmapsettings.showChatVideos ? '<iframe type=\"text/html\" width=\"100%\" height=\"auto\" src=\"https://www.youtube.com/embed/' + t.match(i)[1] + '?autoplay=1&amp;vq=tiny\" frameborder=\"0\" />' : '';
        var s = this.escapeHTML(t);
        return defaultmapsettings['chatEmoticons'] && (s = this.parseEmoticons(s)), s;
    },
    'parseEmoticons': function (t) {
        /*return String(t).replace(/\&lt\;3/g, '<3').replace(/(O\:\)|3\:\)|8\=\)|\:\)|\;\)|\=\)|\:D|X\-D|\=D|\:\(|\;\(|\:P|\;P|\:\*|\$\)|\<3|\:o|\(\:\||\:\||\:\\|\:\@|\|\-\)|\^\_\^|\-\_\-|\$\_\$|\(poop\)|\(fuck\)|\(clap\)|\(ok\)|\(victory\)|\(y\)|\(n\))/g, function(t) {
            return '<img src=\"https://jimboy3100.github.io/banners/emoticons/' + d[t] + '\" alt=\"' + t + '\" class=\"emoticon\">';
        });*/
        //return String(t).replace(/\&lt\;3/g, '<3').replace(/℄/g, '℄ Legend Clan').replace(/(O\:\)|3\:\)|8\=\)|\:\)|\;\)|\=\)|\:D|X\-D|\=D|\:\(|\;\(|\:P|\;P|\:\*|\$\)|\<3|\:o|\(\:\||\:\||\:\\|\:\@|\|\-\)|\^\_\^|\-\_\-|\$\_\$|\(poop\)|\(fuck\)|\(clap\)|\(ok\)|\(victory\)|\(y\)|\(n\)|\(angry\)|\(clown\)|\(crazy\)|\(devil\)|\(devil2\)|\(fb\)|\(google\)|\(ghost\)|\(heel\)|\(kiss\)|\(lipstick\)|\(rage\)|\(teacher\)|\(together\)|\(toothy\)|\(evil\)|\(baby\)|\(wow\))/g, function(t) {
        return String(t).replace(/\&lt\;3/g, '<3').replace(/℄/g, '℄ Legend Clan').replace(/(O\:\)|3\:\)|8\=\)|\:\)|\;\)|\=\)|\:D|X\-D|\=D|\:\(|\;\(|\:P|\;P|\:\*|\$\)|\<3|\:o|\(\:\||\:\||\:\\|\:\@|\|\-\)|\^\_\^|\-\_\-|\$\_\$|\(poop\)|\(fuck\)|\(clap\)|\(ok\)|\(victory\)|\(y\)|\(n\)|\(angry\)|\(clown\)|\(crazy\)|\(devil\)|\(devil2\)|\(fb\)|\(google\)|\(ghost\)|\(heel\)|\(kiss\)|\(lipstick\)|\(rage\)|\(teacher\)|\(together\)|\(toothy\)|\(evil\)|\(baby\)|\(wow\))/g, function (t) {
            //console.log(d[t]);
            return '<img src=\"https://jimboy3100.github.io/banners/emoticons/' + emoticonicons[t] + '\" alt=\"' + t + '\" class=\"emoticon\">';
        });

    },
    'displayChatMessage': function (t, e, i, o) {
        if (0 != o.length) {
            //console.log(o);
            var a = o.split(': ', 1).toString(),
                n = this.parseMessage(o.replace(a + ': ', ''));
            if (!(0 == a.length || a.length > 15 || 0 == n.length)) {
                var r = '';
                if (0 != i && i != this.playerID && (this.addChatUser(i, a), r = '<a href=\"#\" data-user-id=\"' + i + '\" class=\"mute-user ogicon-user-minus\"></a> '), a = this.escapeHTML(a), 101 == e) {
                    if (defaultmapsettings.showChatBox) return $('#chat-box').append('<div class=\"message\"><span class=\"message-time\">[' + t + '] </span>' + r + '<span class=\"message-nick\">' + a + ': </span><span class=\"message-text\">' + n + '</span></div>'),
                        $('#chat-box').perfectScrollbar('update'), $('#chat-box').animate({
                        'scrollTop': $('#chat-box').prop('scrollHeight')
                    }, 500), void (defaultmapsettings.chatSounds && this.playSound(this.messageSound));
                    defaultmapsettings.hideChat || (toastr.success('<span class=\"message-nick\">' + a + ': </span><span class=\"message-text\">' + n + '</span>' + r), defaultmapsettings.chatSounds && this.playSound(this.messageSound)), this.chatHistory.push({
                        'nick': a,
                        'message': n
                    }), this.chatHistory.length > 15 && this.chatHistory.shift();
                } else if (102 == e) {
                    if (defaultmapsettings.showChatBox) return $('#chat-box').append('<div class=\"message command\"><span class=\"command-time\">[' + t + '] </span>' + r + '<span class=\"command-nick\">' + a + ': </span><span class=\"command-text\">' + n + '</span></div>'),
                        $('#chat-box').perfectScrollbar('update'), $('#chat-box').animate({
                        'scrollTop': $('#chat-box').prop('scrollHeight')
                    }, 500), void (defaultmapsettings.chatSounds && this.playSound(this.commandSound));
                    defaultmapsettings.hideChat || (toastr.warning('<span class=\"command-nick\">' + a + ': </span><span class=\"command-text\">' + n + '</span>' + r), defaultmapsettings.chatSounds && this.playSound(this.commandSound));
                } else $('#messages').append(o);
            }
        }
    },
    'displayUserList': function (t, e, i, s, o) {
        var a = '';
        if (Object['keys'](t).length) {
            for (var n in a += '<ol class=\"user-list\">', t) t.hasOwnProperty(n) && (a += '<li><strong>' + this.escapeHTML(t[n]) + '</strong> <button data-user-id=\"' + n + '\" class=\"btn btn-xs ' + i + '\">' + s + '</button></li>');
            a += '</ol>';
        } else a += ZTX.cl.none;
        toastr[o](a, e, {
            'closeButton': true,
            'tapToDismiss': false
        });
    },
    'displayChatActiveUsers': function () {
        this.displayUserList(this.chatUsers, ZTX.cl.activeUsers, 'btn-red btn-mute-user', ZTX.cl.mute, 'info');
    },
    'displayChatMutedUsers': function () {
        this.displayUserList(this.chatMutedUsers, ZTX.cl.mutedUsers, 'btn-green btn-unmute-user', ZTX.cl.unmute, 'error');
    },
    'preloadChatSounds': function () {
        this.setMessageSound(), this.setCommandSound(), this.setvirusSound();
    },
    'setChatSoundsBtn': function () {
        defaultmapsettings.chatSounds ? $('.chat-sound-notifications').removeClass('ogicon-volume-mute2').addClass('ogicon-volume-high') : $('.chat-sound-notifications').removeClass('ogicon-volume-high').addClass('ogicon-volume-mute2');
    },
    'setMessageSound': function () {
        this.messageSound = this.setSound(defaultmapsettings.messageSound);
    },
    'setCommandSound': function () {
        this.commandSound = this.setSound(defaultmapsettings.commandSound);
    },
    'setvirusSound': function () {
        this.virusSoundurl = this.setSound(defaultmapsettings.virusSoundurl);
    },
    'setSound': function (t) {
        return t ? new Audio(t) : null;
    },
    /*            'playSound': function(t) {
                    //t && t.play && (t.pause(), t.currentTime = 0, t.play());
                    //t && t.play && t.play!==null && (t.pause(), t.currentTime = 0, t.play());
                    t.pause();
                    t.currentTime = 0;
                    var nopromise = {
                        catch: new Function()
                    };
                    (t.play() || nopromise).catch(function() {});
                },
    */
    'playSound': function (t) {
        if (t && t.play) {
            t.pause();
            t.currentTime = 0;
            //t.play();
            var nopromise = {
                catch: new Function()
            };
            (t.play() || nopromise).catch(function () {
            });
        }
    },
    'setTargeting': function () {
        if (this.targetID) {
            this.targeting = !this.targeting, ZTX.active.targeting = this.targeting, this.setTargetingInfo();
        }
    },
    'setTargetingInfo': function () {
        this.targeting ? ($('#set-targeting').addClass('active'),
            $('#target-status').show(),
        2 != this.targetStatus && $('#target-summary').show()) : ($('#set-targeting').removeClass('active'),
            $('#target-summary, #target-status').hide());
    },
    'cancelTargeting': function () {
        this.setTargetStatus(0);
    },
    'setPrivateMiniMap': function () {
        this.targetID && (this.privateMiniMap = !this.privateMiniMap, this.privateMiniMap ? $('#set-private-minimap').addClass('active') : $('#set-private-minimap').removeClass('active'));
    },
    'setTarget': function (t) {
        var e = this.checkPlayerID(t);
        if (null !== e) {
            var i = this.teamPlayers[e];
            if (this.targetID = i.id, this.updateTarget(i.nick, i.skinURL, i.x, i.y, i.mass, i.color, i.lbgpi), !i.alive) {
                return void this.setTargetStatus(2);
            }
            this.setTargetStatus(1);
        } else this.setTargetStatus(0);
    },
    'setTargetStatus': function (t) {
        switch (t) {
            case 0:
                this.targetStatus = 0,
                    this.targetID = 0,
                    this.targetNick = '',
                    this.targetSkinURL = '',
                    this.targeting = false,
                    ZTX.active.targeting = false,
                    this.privateMiniMap = false,
                    $('#target-skin, #target-nick, #target-summary').hide(),
                    $("#target-hud").hide(),
                    $('#target-status').show().text(ZTX.cl.targetNotSet),
                    $('#target-panel-hud a').removeClass('active'); //$('#target-status').show().text('[' + h.targetNotSet + ']'), $('#target-panel-hud a').removeClass('active');
                break;
            case 1:
                this.targetStatus = 1,
                this.targeting || (this.targeting = true, ZTX.active.targeting = true, $("#target-hud").show(), this.setTargetingInfo()),
                    $('#target-skin, #target-nick, #target-status, #target-summary').show();
                break;
            case 2:
                //this.targetStatus = 2, $('#target-summary').hide(), $("#target-hud").show(), $('#target-status').show().text('[' + h.targetDead + ']'), i.resetTargetPosition();
                this.targetStatus = 2,
                    $('#target-summary').hide(),
                    $("#target-hud").show(),
                    $('#target-status').show().text('[' + Languageletter369 + ']'),
                    ZTX.active.resetTargetPosition();
        }
    },
    'changeTarget': function () {
        for (var t = this.checkPlayerID(this.targetID), e = null, i = 0; i < this.teamPlayers.length; i++)
            if (this.teamPlayers[i].alive) {
                if (null === t) {
                    t = i;
                    break;
                }
                if (i < t && null === e) e = i;
                else if (i > t) {
                    e = i;
                    break;
                }
            }
        null !== e && (t = e), null !== t ? this.setTarget(this.teamPlayers[t].id) : this.setTargetStatus(0);
    },
    'updateTarget': function (t, e, o, a, n, r, f) {
        ZTX.active.setTargetPosition(o, a);
        if (this.targetNick !== t) {
            this.targetNick = t;
            $('#target-nick').html(this.escapeHTML(t))
        }
        $('#target-skin').css('background-color', r);
        if (e) {
            if (this.targetSkinURL !== e) {
                if (this.customSkinsCache.hasOwnProperty(e + '_cached')) {
                    $('#target-skin img').attr('src', e);
                    this.targetSkinURL = e;
                } else {
                    $('#target-skin img').attr('src', 'https://jimboy3100.github.io/banners/static/img/blank.png')
                }

            }
        }
        $('#target-status').text('[' + this.shortMassFormat(n) + ']');
        //var l = this.calculateMapSector(o, a);
        var l;
        //c = h.targetDistance + ': <span class=\"hud-main-color\">' + i.targetDistance + ' [' + l + ']</span>';
        var flag = false;
        for (var j = 0; j < legendmod.ghostCells.length; j++) {
            if (legendmod.leaderboard[j] && this.targetNick == legendmod.leaderboard[j].nick) {

                if (flag == false) {
                    l = window.legendmod3.calculateMapSector(window.predictedGhostCells[j].x, window.predictedGhostCells[j].y)
                    flag = true;
                }
            }
        }
        ;
        if (flag == false && f >= 0) {
            l = this.calculateMapSector(o, a);
        } else if (flag == false && (this.calculateMapSector(o, a) == "C3" || legendmod.gameMode == ":party")) {
            l = this.calculateMapSector(o, a);
        } else if (flag == false) {
            l = "Unknown";
        }
        ;
        c = Languageletter368 + ': <span class=\"hud-main-color\">' + ZTX.active.targetDistance + ' [' + l + ']</span>';
        if (ZTX.active.play) {
            c += ' | ' + ZTX.cl['targetMass'] + ': <span class=\"hud-main-color\">' + this.shortMassFormat(n + ZTX.active.playerMass) + '</span>'
        }
        $('#target-summary').html(c);
        if (1 != this.targetStatus) {
            this.setTargetStatus(1);
        }
    },
    'updateQuest': function () {
        this.showQuest && ':ffa' === this.gameMode && window.MC && window.MC.getQuestProgressLabel && (this.questHUD.textContent = window.MC.getQuestProgressLabel());
    },
    'init': function () {
        this.loadSettings(),
            this.loadProfiles(),
            this.setLang(),
            this.setMenu(),
            this.setUI(),
        ZTX.menu && ZTX.menu.setTheme(),
            this.setShowQuickMenu(),
            this.setShowSkinsPanel(),
            this.setProfile(),
            this.setMainButtons(),
            this.setStreamMode(),
            this.setHideSkinUrl(),
            this.setMiniMap(),
            this.setAutoResp(),
            this.setDisableChat(),
            this.setShowChatBox(),
            this.setTop5(),
            this.setTargetingHUD(),
            this.setQuest(),
            this.displayTime(),
            this.setCenteredLb(),
            this.setNormalLb(),
            this.setFpsAtTop(),
            this.displayStats(),
            this.setBlockPopups(),
            this.preloadChatSounds(),
            this.setChatSoundsBtn();
        var t = this;
        setInterval(function () {
            t.drawMiniMap();
        }, 33),
            setInterval(function () {
                t.updateTeamPlayers();
                legendmod3.sendSocket3Position();
            }, this.updateInterval);
    }
};