ZTX.draw = {
    'canvas': null,
    'ctx': null,
    'canvasWidth': 0,
    'canvasHeight': 0,
    'camX': 0,
    'camY': 0,
    'scale': 1,
    'fpsLastRequest': null,
    'renderedFrames': 0,
    'fps': 0,
    'pi2': 2 * Math.PI,
    'battleAreaMap': null,
    'battleAreaMapCtx': null,
    'pieChart': null,
    'pellet': null,
    'indicator': null,
    'setCanvas': function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.onmousemove = function (t) {
            ZTX.agar.clientX = t.clientX;
            ZTX.agar.clientY = t.clientY;
            ZTX.agar.getCursorPosition();
        };
    },
    'resizeCanvas': function () {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        ZTX.agar.canvasWidth = this.canvasWidth;
        ZTX.agar.canvasHeight = this.canvasHeight;
        this.renderFrame();
    },
    'setView': function () {
        this.setScale(),
            ZTX.agar.playerCells.length ?
                (ZTX.agar.calculatePlayerMassAndPosition(),
                    //					this.camX += (ZTX.agar.viewX - this.camX) / 2,
                    //					this.camY += (ZTX.agar.viewY - this.camY) / 2) :
                    this.camX = (this.camX + ZTX.agar.viewX) / 2,
                    this.camY = (this.camY + ZTX.agar.viewY) / 2) :
                (this.camX = (29 * this.camX + ZTX.agar.viewX) / 30,
                    this.camY = (29 * this.camY + ZTX.agar.viewY) / 30),
            ZTX.agar.playerX = this.camX, ZTX.agar.playerY = this.camY;
    },
    'setScale': function () {
        if (!ZTX.agar.autoZoom) return this.scale = (9 * this.scale + this.getZoom()) / 10, void (ZTX.agar.viewScale = this.scale);
        ZTX.agar.play ? this.scale = (9 * this.scale + Math.pow(Math.min(64 / ZTX.agar.playerSize, 1), 0.4) * this.getZoom()) / 10 : this.scale = (9 * this.scale + ZTX.agar.scale * this.getZoom()) / 10, ZTX.agar.viewScale = this.scale;
    },
    'getZoom': function () {
        return Math.max(this.canvasWidth / 1080, this.canvasHeight / 1920) * ZTX.agar.zoomValue;
    },
    //Sonia5
    'sleep': function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    /*                'renderFrame': function() {
                        //for (ZTX.agar.time = Date.now(), e = 0; e < ZTX.agar.cells.length; e++) ZTX.agar.cells[e].moveCell();
                        ZTX.agar.time = Date.now();
                            for (i = 0; i < ZTX.agar.cells.length; i++) {
                                ZTX.agar.cells[i].moveCell();
                            }
                        if (this['setView'](), ZTX.agar.getCursorPosition(), ZTX.agar.'sortCells'](), ZTX.agar.'compareCells'](), this.ctx['clearRect'](0, 0, this.canvasWidth, this.canvasHeight), defaultmapsettings.showGrid && this['drawGrid'](this.ctx, this.canvasWidth, this.canvasHeight, this.scale, this.camX, this.camY), this.ctx['save'](), this.ctx['translate'](this.canvasWidth / 2, this.canvasHeight / 2), this.ctx.scale(this.scale, this.scale), this.ctx['translate'](-this.camX, -this.camY), defaultmapsettings.showBgSectors && this.drawSectors(this.ctx, ZTX.agar.mapOffsetFixed, defaultSettings.sectorsX, defaultSettings.sectorsY, ZTX.agar.mapMinX, ZTX.agar.mapMinY, ZTX.agar.mapMaxX, ZTX.agar.mapMaxY, defaultSettings['gridColor'], defaultSettings['sectorsColor'], defaultSettings['sectorsWidth'], true), ':battleroyale' === ZTX.agar.gameMode && this['drawBattleArea'](this.ctx), defaultmapsettings['showMapBorders']) {
                            var t = defaultSettings['bordersWidth'] / 2;
                            this['drawMapBorders'](this.ctx, ZTX.agar.mapOffsetFixed, ZTX.agar.mapMinX - t, ZTX.agar.mapMinY - t, ZTX.agar.mapMaxX + t, ZTX.agar.mapMaxY + t, defaultSettings['bordersColor'], defaultSettings['bordersWidth']);
                        }
                        this.drawCommander();
                        defaultmapsettings.virusesRange && this['drawVirusesRange'](this.ctx, ZTX.agar.viruses), this['drawFood'](), ZTX.agar.play && (defaultmapsettings.splitRange && this['drawSplitRange'](this.ctx, ZTX.agar.biggerSTECellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell), defaultmapsettings.oppRings && this['drawOppRings'](this.ctx, this.scale, ZTX.agar.biggerSTECellsCache, ZTX.agar.biggerCellsCache, ZTX.agar.smallerCellsCache, ZTX.agar.STECellsCache), defaultmapsettings['cursorTracking'] && this['drawCursorTracking'](this.ctx, ZTX.agar.playerCells, ZTX.agar.cursorX, ZTX.agar.cursorY)), this['drawGhostCells']();
                        for (var e = 0; e < ZTX.agar.'removedCells'].length; e++) ZTX.agar.'removedCells'][e].draw(this.ctx, true);
                        for (e = 0; e < ZTX.agar.cells.length; e++) ZTX.agar.cells[e].draw(this.ctx);
                        this.ctx['restore'](), ':teams' === ZTX.agar.gameMode && this.pieChart && this.pieChart.width && this.ctx.drawImage(this.pieChart, this.canvasWidth - this.pieChart.width - 10, 10);
                    }, */
    'renderFrame': async function () { //Sonia5
        //this.ctx.start2D();
        await this.sleep(4); //Sonia5
        ZTX.agar.time = Date.now();
        for (i = 0; i < ZTX.agar.cells.length; i++) {
            ZTX.agar.cells[i].moveCell();
        }
        this.setView();
        ZTX.agar.getCursorPosition();
        ZTX.agar.sortCells();
        ZTX.agar.compareCells();
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (defaultmapsettings.showGrid) {
            this.drawGrid(this.ctx, this.canvasWidth, this.canvasHeight, this.scale, this.camX, this.camY);
        }
        this.ctx.save();
        this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
        this.ctx.scale(this.scale, this.scale);
        this.ctx.translate(-this.camX, -this.camY);
        if (defaultmapsettings.showBgSectors) {
            this.drawSectors(this.ctx, ZTX.agar.mapOffsetFixed, defaultSettings.sectorsX, defaultSettings.sectorsY, ZTX.agar.mapMinX, ZTX.agar.mapMinY, ZTX.agar.mapMaxX, ZTX.agar.mapMaxY, defaultSettings.gridColor, defaultSettings.sectorsColor, defaultSettings.sectorsWidth, true);
        }
        if (ZTX.agar.gameMode === ':battleroyale') {
            this.drawBattleArea(this.ctx);
        }
        if (defaultmapsettings.showMapBorders) {
            var tempborderwidthradius = defaultSettings.bordersWidth / 2;
            this.drawMapBorders(this.ctx, ZTX.agar.mapOffsetFixed, ZTX.agar.mapMinX - tempborderwidthradius, ZTX.agar.mapMinY - tempborderwidthradius, ZTX.agar.mapMaxX + tempborderwidthradius, ZTX.agar.mapMaxY + tempborderwidthradius, defaultSettings.bordersColor, defaultSettings.bordersWidth);
        }
        this.drawCommander();
        this.drawCommander2();
        if (defaultmapsettings.virusesRange) {
            this.drawVirusesRange(this.ctx, ZTX.agar.viruses);
        }
        this.drawFood();
        if (ZTX.agar.play) {
            if (defaultmapsettings.splitRange) {
                this.drawSplitRange(this.ctx, ZTX.agar.biggerSTECellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell);
                this.drawSplitRange(this.ctx, ZTX.agar.biggerSTEDCellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell); //Sonia
                //this.drawDoubleSplitRange(this.ctx, ZTX.agar.biggerSTECellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell);
                this.drawDoubleSplitRange(this.ctx, ZTX.agar.biggerSTEDCellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell); //Sonia
            }
            if (defaultmapsettings.oppRings) {
                //this.drawOppRings(this.ctx, this.scale, ZTX.agar.biggerSTECellsCache, ZTX.agar.biggerCellsCache, ZTX.agar.smallerCellsCache, ZTX.agar.STECellsCache);
                this.drawOppRings(this.ctx, this.scale, ZTX.agar.biggerSTEDCellsCache, ZTX.agar.biggerSTECellsCache, ZTX.agar.biggerCellsCache, ZTX.agar.smallerCellsCache, ZTX.agar.STECellsCache, ZTX.agar.STEDCellsCache); //Sonia
            }
            if (defaultmapsettings.cursorTracking) {
                this.drawCursorTracking(this.ctx, ZTX.agar.playerCells, ZTX.agar.cursorX, ZTX.agar.cursorY);
            }
        }

        this.drawGhostCells();

        for (var i = 0; i < ZTX.agar.removedCells.length; i++) {
            ZTX.agar.removedCells[i].draw(this.ctx, true);
        }

        //lylko
        defaultmapsettings.jellyPhisycs && ZTX.agar.updateQuadtree(ZTX.agar.cells); //

        for (i = 0; i < ZTX.agar.cells.length; i++) {

            if (defaultmapsettings.jellyPhisycs) {
                ZTX.agar.cells[i].updateNumPoints();
                ZTX.agar.cells[i].movePoints();
            }

            ZTX.agar.cells[i].draw(this.ctx);

            if (ZTX.draw.LMB && this.pointInCircle(ZTX.agar.cursorX, ZTX.agar.cursorY, ZTX.agar.cells[i].x, ZTX.agar.cells[i].y, ZTX.agar.cells[i].size)) {
                ZTX.agar.selected = ZTX.agar.cells[i].id
                //this.drawRing(this.ctx,LM.cells[i].x,LM.cells[i].y,LM.cells[i].size,0.75,'#ffffff')
            }
        }
        ZTX.agar.indexedCells[ZTX.agar.selected] && this.drawRing(this.ctx,
            ZTX.agar.indexedCells[ZTX.agar.selected].x,
            ZTX.agar.indexedCells[ZTX.agar.selected].y,
            ZTX.agar.indexedCells[ZTX.agar.selected].size,
            0.75, '#ffffff')

        if (ZTX.draw.RMB && ZTX.agar.indexedCells[ZTX.agar.selected] && ZTX.agar.playerCellIDs.length) {
            var index = ZTX.agar.selectBiggestCell ? ZTX.agar.playerCells.length - 1 : 0;
            //ctx.arc(playerCells[index].x, playerCells[index].y, playerCells[index].size + 760, 0, this.pi2, false);
            if (ZTX.agar.playerCells[index] == undefined) return;
            var xc = ZTX.agar.playerCells[index].targetX //.x
            var yc = ZTX.agar.playerCells[index].targetY //.y

            var x = ZTX.agar.indexedCells[ZTX.agar.selected].targetX //.x
            var y = ZTX.agar.indexedCells[ZTX.agar.selected].targetY //.y

            var a = xc - x
            var b = yc - y
            var distance = Math.sqrt(a * a + b * b) - (ZTX.agar.indexedCells[ZTX.agar.selected].size + ZTX.agar.playerCells[index].size)

            var ang = Math.atan2(y - yc, x - xc);

            ZTX.agar.cursorX = xc + (Math.cos(ang) * distance)
            ZTX.agar.cursorY = yc + (Math.sin(ang) * distance)
            ZTX.agar.sendPosition()
            //console.log(xc,yc,x,y,LM.cursorX,LM.cursorY)
            //Math.deg(ang)


            /*var xc = ZTX.agar.playerCells[index].x,
                yc = ZTX.agar.playerCells[index].y,*/
            //R = 100000000,
            /*ang = Math.atan2(ZTX.agar.indexedCells[LM.selected].y - yc, ZTX.agar.indexedCells[LM.selected].x - xc);
            ZTX.agar.cursorX= Math.cos(ang)
            ZTX.agar.cursorY= Math.sin(ang)*/
            //Math.deg(ang)

            //LM.cursorX = ZTX.agar.indexedCells[LM.selected].x
            //LM.cursorY = ZTX.agar.indexedCells[LM.selected].y
        }


        this.ctx.restore();
        if (ZTX.agar.gameMode === ':teams') {
            if (this.pieChart && this.pieChart.width) {
                this.ctx.drawImage(this.pieChart, this.canvasWidth - this.pieChart.width - 10, 10);
            }
        }
        //this.ctx.finish2D();
    },
    pointInCircle: function (x, y, cx, cy, radius) {
        var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return distancesquared <= radius * radius;
    },
    drawRing: function (ctx, x, y, size, alpha, color) {
        ctx.lineWidth = 20;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size - 10, 0, this.pi2, false);
        ctx.closePath();
        ctx.stroke();

        ctx.globalAlpha = 1;
    },


    'drawGrid': function (t, e, i, s, o, a) {
        var n = e / s;
        var r = i / s;
        var l = (n / 2 - o) % 50;
        var h = (r / 2 - a) % 50;
        t.strokeStyle = defaultSettings.gridColor, t.globalAlpha = 1 * s, t.beginPath();
        for (; l < n; l = l + 50) {
            t.moveTo(l * s - 0.5, 0);
            t.lineTo(l * s - 0.5, r * s);
        }
        for (; h < r; h = h + 50) {
            t.moveTo(0, h * s - 0.5);
            t.lineTo(n * s, h * s - 0.5);
        }
        t.stroke(), t.globalAlpha = 1;
    },
    'drawSectors': function (t, e, i, s, o, a, n, r, l, h, c, u) {
        if (e || !u) {
            var d = ~~((n - o) / i);
            var f = ~~((r - a) / s);
            var m = 0;
            var y = 0;
            if (t.strokeStyle = l, t.fillStyle = h, t.lineWidth = c, u || !u && defaultmapsettings["showMiniMapGrid"]) {
                t.beginPath();
                var ogario1PlayerProfiles = 0;
                for (; ogario1PlayerProfiles < i + 1; ogario1PlayerProfiles++) {
                    m = o + d * ogario1PlayerProfiles;
                    t.moveTo(ogario1PlayerProfiles == i ? n : m, a);
                    t.lineTo(ogario1PlayerProfiles == i ? n : m, r);
                }
                ogario1PlayerProfiles = 0;
                for (; ogario1PlayerProfiles < s + 1; ogario1PlayerProfiles++) {
                    y = a + f * ogario1PlayerProfiles;
                    t.moveTo(o - c / 2, ogario1PlayerProfiles == s ? r : y);
                    t.lineTo(n + c / 2, ogario1PlayerProfiles == s ? r : y);
                }
                t.stroke();
            } else {
                this.drawMapBorders(t, e, o, a, n, r, l, c);
            }
            t.font = u ? defaultSettings.sectorsFontWeight + " " + defaultSettings.sectorsFontSize + "px " + defaultSettings.sectorsFontFamily : defaultSettings.miniMapFontWeight + " " + ~~(0.4 * f) + "px " + defaultSettings.miniMapFontFamily;
            t.textAlign = "center";
            t.textBaseline = "middle";
            ogario1PlayerProfiles = 0;
            for (; ogario1PlayerProfiles < s; ogario1PlayerProfiles++) {
                var ogarcopythelb = 0;
                for (; ogarcopythelb < i; ogarcopythelb++) {
                    var rf = String.fromCharCode(65 + ogario1PlayerProfiles) + (ogarcopythelb + 1);
                    m = ~~(o + d / 2 + ogarcopythelb * d);
                    y = ~~(a + f / 2 + ogario1PlayerProfiles * f);
                    t.fillText(rf, m, y);
                }
            }
        }
    },
    "drawCommander": function () {
        //console.log('Special effects stage 2');
        if (ZTX.agar.drawCommander) {
            var pickerAxes = this.ctx;
            cimg = new Image;
            cimg.src = defaultSettings.commanderImage;
            cimg1 = new Image;
            cimg1.src = defaultSettings.commanderImage1;
            cimg2 = new Image;
            cimg2.src = defaultSettings.commanderImage2;
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(ZTX.active.spawnX, ZTX.active.spawnY);
            pickerAxes.rotate(ZTX.agar.cAngle);
            pickerAxes.drawImage(cimg, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(ZTX.active.spawnX, ZTX.active.spawnY);
            pickerAxes.rotate(ZTX.agar.cAngle1);
            pickerAxes.drawImage(cimg1, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(ZTX.active.spawnX, ZTX.active.spawnY);
            pickerAxes.rotate(ZTX.agar.cAngle2);
            pickerAxes.drawImage(cimg2, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.globalAlpha = 1;
            this.updateCommander();
        }
    },
    "drawCommander2": function () {
        //console.log('Special effects stage 2');
        if (ZTX.agar.drawCommander2) {
            var pickerAxes = this.ctx;
            cimg = new Image;
            cimg.src = defaultSettings.commanderImage3;
            cimg1 = new Image;
            cimg1.src = defaultSettings.commanderImage4;
            cimg2 = new Image;
            cimg2.src = defaultSettings.commanderImage5;
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(window.targetingLeadX, window.targetingLeadY);
            pickerAxes.rotate(ZTX.agar.cAngle);
            pickerAxes.drawImage(cimg, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(window.targetingLeadX, window.targetingLeadY);
            pickerAxes.rotate(ZTX.agar.cAngle1);
            pickerAxes.drawImage(cimg1, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.save();
            pickerAxes.globalAlpha = ZTX.agar.cAlpha;
            pickerAxes.translate(window.targetingLeadX, window.targetingLeadY);
            pickerAxes.rotate(ZTX.agar.cAngle2);
            pickerAxes.drawImage(cimg2, -ZTX.agar.cRadius / 2, -ZTX.agar.cRadius / 2, ZTX.agar.cRadius, ZTX.agar.cRadius);
            pickerAxes.restore();
            pickerAxes.globalAlpha = 1;
            this.updateCommander();
        }
    },
    "updateCommander": function () {
        ZTX.agar.cRadius += 7;
        ZTX.agar.cAngle += .007;
        ZTX.agar.cAngle1 -= .006;
        ZTX.agar.cAngle2 += .003;
        if (2025 <= ZTX.agar.cRadius) {
            ZTX.agar.cAlpha *= .95;
        }
        if (1E-4 >= ZTX.agar.cAlpha) {
            this.resetCommander();
        }
    },
    "resetCommander": function () {
        ZTX.agar.cRadius = 10; //LM.clientX
        ZTX.agar.cAngle = 4;
        ZTX.agar.cAngle1 = 0;
        ZTX.agar.cAngle2 = 0;
        ZTX.agar.cAlpha = 1;
        ZTX.agar.drawCommander = false;
        ZTX.agar.drawCommander2 = false;
        ZTX.active.spawnX = 0;
        ZTX.active.spawnY = 0;
    },
    /*
    'drawMapBorders': function(t, e, i, s, o, a, n, r) {
        e && (t.strokeStyle = n, t.lineWidth = r, t.beginPath(), t.moveTo(i, s), t.lineTo(o, s), t.lineTo(o, a), t.lineTo(i, a), t.closePath(), t.stroke());
    },
    */
    "drawMapBorders": function (ctx, macros, text, x1, x0, y0, radius, canvas) {
        if (macros) {
            ctx.strokeStyle = radius;
            ctx.lineWidth = canvas;
            ctx.beginPath();
            ctx.moveTo(text, x1);
            ctx.lineTo(x0, x1);
            ctx.lineTo(x0, y0);
            ctx.lineTo(text, y0);
            if (defaultmapsettings.borderGlow) {
                ctx.shadowBlur = defaultSettings.borderGlowSize;
                ctx.shadowColor = defaultSettings.borderGlowColor;
            } else {
                "skrrt";
            }
            ctx.closePath();
            ctx.stroke();
        }
        if (defaultmapsettings.borderGlow) {
            ctx.shadowBlur = 0;
        } else {
            "skrrt";
        }
    },
    'drawVirusesRange': function (t, e, i) {
        if (e.length) {
            t.beginPath();
            for (var s = 0; s < e.length; s++) {
                var o = e[s].x,
                    a = e[s].y;
                t.moveTo(o, a),
                    t.arc(o, a, e[s].size + 820, 0, this.pi2, false);
            }
            t.fillStyle = defaultSettings.virusColor,
                t.globalAlpha = 0.1, t.fill(),
                t.globalAlpha = 1, i && (e = []);
        }
    },
    'drawFood': function () {
        if (ZTX.agar.showFood && !(defaultmapsettings.autoHideFoodOnZoom && this.scale < 0.2)) {
            if (defaultmapsettings.autoHideFood && !ZTX.agar.foodIsHidden && ZTX.agar.playerMass > 1000) return ZTX.agar.showFood = false, void (ZTX.agar.foodIsHidden = true);
            if (defaultmapsettings.rainbowFood)
                for (var t = 0; t < ZTX.agar.food.length; t++) ZTX.agar.food[t].moveCell(), ZTX.agar.food[t].draw(this.ctx);
            else this.drawCachedFood(this.ctx, ZTX.agar.food, this.scale);
        }
    },
    'drawCachedFood': function (t, e, i, s) {
        if (e.length) {
            if (defaultmapsettings.optimizedFood && this.pellet)
                for (var o = 0; o < e.length; o++) {
                    var a = e[o].x - 10 - defaultSettings.foodSize,
                        n = e[o].y - 10 - defaultSettings.foodSize;
                    t.drawImage(this.pellet, a, n);
                } else {
                t.beginPath();
                for (o = 0; o < e.length; o++) {
                    a = e[o].x, n = e[o].y;
                    if (t.moveTo(a, n), i < 0.16) {
                        var r = e[o].size + defaultSettings.foodSize;
                        t.rect(a - r, n - r, 2 * r, 2 * r);
                    } else t.arc(a, n, e[o].size + defaultSettings.foodSize, 0, this.pi2, false);
                }
                t.fillStyle = defaultSettings.foodColor, t.globalAlpha = 1, t.fill();
            }
            s && (e = []);
        }
    },
    'drawSplitRange': function (t, e, i, s, o) {
        if (this.drawCircles(t, e, 760, 4, 0.4, defaultSettings.enemyBSTEColor), i.length) { //Sonia2
            //if (this.drawCircles(t, e, 760, 4, 0.4, '#ff0000'), i.length) { //Sonia
            var a = s ? i.length - 1 : 0;
            t.lineWidth = 6, t.globalAlpha = defaultSettings.darkTheme ? 0.7 : 0.35,
                t.strokeStyle = defaultSettings.splitRangeColor,
                t.beginPath(),
                t.arc(i[a].x, i[a].y, i[a].size + 760, 0, this.pi2, false),
                t.closePath(),
                t.stroke();
        }
        t.globalAlpha = 1, o && (e = []);
    },
    'drawDoubleSplitRange': function (t, e, i, s, o) {
        //if (this.drawCircles(t, e, 760, 4, 0.4, '#BE00FF'), i.length) {
        if (this.draw2Circles(t, e, 760, 4, 0.4, defaultSettings.enemyBSTEDColor), i.length) { //Sonia2
            //if (this.draw2Circles(t, e, 760, 4, 0.4, '#8000ff'), i.length) { //Sonia
            //this.drawSplitRange(this.ctx, ZTX.agar.biggerSTECellsCache, ZTX.agar.playerCells, ZTX.agar.selectBiggestCell);

            var a = s ? i.length - 1 : 0;
            //console.log(i[a].size);
            if (i[a].size >= 400 && defaultmapsettings.qdsplitRange) { //Sonia2
                t.lineWidth = 6,
                    t.globalAlpha = defaultSettings.darkTheme ? 0.7 : 0.35,
                    t.strokeStyle = defaultSettings.splitRangeColor;
                t.beginPath();
                t.arc(i[a].x, i[a].y, 2 * i[a].size + 760, 0, this.pi2, false);
                t.closePath();
                t.stroke();
            }
        }
        t.globalAlpha = 1;
        if (o) {
            e = [];
        }
    },
    //Sonia (entire function update)
    //'drawOppRings': function(t, e, i, s, o, a, n) {
    'drawOppRings': function (t, e, ip, i, s, o, a, ap, n) {
        var r = 14 + 2 / e;
        var l = 12 + 1 / e;
        this.drawCircles(t, ip, r, l, 0.75, defaultSettings.enemyBSTEDColor); //Sonia2
        this.drawCircles(t, i, r, l, 0.75, defaultSettings.enemyBSTEColor); //Sonia2
        this.drawCircles(t, s, r, l, 0.75, defaultSettings.enemyBColor); //Sonia2
        this.drawCircles(t, o, r, l, 0.75, defaultSettings.enemySColor); //Sonia2
        this.drawCircles(t, a, r, l, 0.75, defaultSettings.enemySSTEColor); //Sonia2
        this.drawCircles(t, ap, r, l, 0.75, defaultSettings.enemySSTEDColor); //Sonia2
        if (n) {
            i = [];
            s = [];
            o = [];
            a = [];
            ip = [];
            ap = [];
        }
    },
    'drawCursorTracking': function (t, e, i, s) {
        t.lineWidth = 4, t.globalAlpha = defaultSettings.darkTheme ? 0.75 : 0.35, t.strokeStyle = defaultSettings.cursorTrackingColor, t.beginPath();
        for (var o = 0; o < e.length; o++) t.moveTo(e[o].x, e[o].y), t.lineTo(i, s);
        t.stroke(), t.globalAlpha = 1;
    },
    'drawCircles': function (t, e, i, s, o, a) {
        t.lineWidth = s, t.globalAlpha = o, t.strokeStyle = a;
        for (var n = 0; n < e.length; n++) t.beginPath(), t.arc(e[n].x, e[n].y, e[n].size + i, 0, this.pi2, false), t.closePath(), t.stroke();
        t.globalAlpha = 1;
    },
    //Sonia (added entire function)
    'draw2Circles': function (t, e, i, s, o, a) {
        t.lineWidth = s, t.globalAlpha = o, t.strokeStyle = a;
        //for (var n = 0; n < e.length; n++) t.beginPath(), t.arc(e[n].x, e[n].y, 1.5*e[n].size + 2*i, 0, this.pi2, false), t.closePath(), t.stroke();
        if (defaultmapsettings.qdsplitRange) { //Sonia2
            for (var n = 0; n < e.length; n++) t.beginPath(), t.arc(e[n].x, e[n].y, 2 * e[n].size + i, 0, this.pi2, false), t.closePath(), t.stroke(); //760+2*cell.size is the correct
        } //Sonia2
        if (defaultmapsettings.sdsplitRange) { //Sonia2
            for (var n = 0; n < e.length; n++) t.setLineDash([20, 30]), t.lineWidth = 2 * s, t.beginPath(), t.arc(e[n].x, e[n].y, 1.5 * e[n].size + 2 * i, 0, this.pi2, false), t.closePath(), t.stroke(); //Sonia2
            t.setLineDash([]); //Sonia2
            t.lineWidth = s; //Sonia2
        } //Sonia2
        t.globalAlpha = 1;
    },
    'drawDashedCircle': function (t, e, i, s, o, a, n) {
        var r = this.pi2 / o;
        t.lineWidth = a, t.strokeStyle = n;
        for (var l = 0; l < o; l += 2) t.beginPath(), t.arc(e, i, s - a / 2, l * r, (l + 1) * r, false), t.stroke();
    },
    'drawTeammatesInd': function (t, e, i, s) {
        //console.log("t:"+ t + " e:" + e + " i:" + i + "s:" + s);
        if (this.indicator) {
            t.drawImage(this.indicator, e - 45, i - s - 90);
        }
    },
    'drawPieChart': function () {
        this.pieChart || (this.pieChart = document.createElement('canvas'));
        var t = this.pieChart.getContext('2d'),
            e = Math.min(200, 0.3 * this.canvasWidth) / 200;
        this.pieChart.width = 200 * e, this.pieChart.height = 240 * e, t.scale(e, e);
        for (var i = ['#333333', '#FF3333', '#33FF33', '#3333FF'], s = 0, o = 0; o < ZTX.agar.pieChart.length; o++) {
            var a = s + ZTX.agar.pieChart[o] * this.pi2;
            t.fillStyle = i[o + 1], t.beginPath(), t.moveTo(100, 140), t.arc(100, 140, 80, s, a, false), t.fill(), s = a;
        }
    },
    'drawBattleArea': function (t) {
        if (ZTX.agar.battleRoyale.state) {
            this.drawDangerArea(t, ZTX.agar.battleRoyale.x, ZTX.agar.battleRoyale.y, ZTX.agar.battleRoyale.radius, ZTX.agar.mapMinX, ZTX.agar.mapMinY, ZTX.agar.mapMaxX - ZTX.agar.mapMinX, ZTX.agar.mapMaxY - ZTX.agar.mapMinY, defaultSettings.dangerAreaColor, 0.25);
            this.drawSafeArea(t, ZTX.agar.battleRoyale.targetX, ZTX.agar.battleRoyale.targetY, ZTX.agar.battleRoyale.targetRadius, 40, defaultSettings.safeAreaColor);
        }
    },
    'drawBattleAreaOnMinimap': function (t, e, i, s, o, a) {
        if (ZTX.agar.battleRoyale.state) {
            if (!this.battleAreaMap) {
                this.battleAreaMap = document.createElement("canvas");
                this.battleAreaMapCtx = this.battleAreaMap.getContext("2d");
            }
            if (this.battleAreaMap.width != e) {
                this.battleAreaMap.width = e;
                this.battleAreaMap.height = i;
            } else {
                this.battleAreaMapCtx.clearRect(0, 0, e, i);
            }
            var n = (ZTX.agar.battleRoyale.x + o) * s;
            var r = (ZTX.agar.battleRoyale.y + a) * s;
            var l = ZTX.agar.battleRoyale.radius * s;
            this.drawDangerArea(this.battleAreaMapCtx, n, r, l, 0, 0, e, i, defaultSettings.dangerAreaColor, 0.25);
            n = ~~((ZTX.agar.battleRoyale.targetX + o) * s);
            r = ~~((ZTX.agar.battleRoyale.targetY + a) * s);
            l = ~~(ZTX.agar.battleRoyale.targetRadius * s);
            this.drawSafeArea(this.battleAreaMapCtx, n, r, l, 2, defaultSettings.safeAreaColor);
            t.drawImage(this.battleAreaMap, 0, 0);
        }
    },
    'drawDangerArea': function (t, e, i, s, o, a, n, r, l, h) {
        if (!(ZTX.agar.battleRoyale.radius == ZTX.agar.battleRoyale.maxRadius || s <= 0)) {
            t.save();
            t.globalAlpha = h;
            t.fillStyle = l;
            t.fillRect(o, a, n, r);
            t.globalCompositeOperation = "destination-out";
            t.globalAlpha = 1;
            t.beginPath();
            t.arc(e, i, s, 0, this.pi2, false);
            t.fill();
            t.restore();
        }
    },
    'drawSafeArea': function (t, e, i, s, o, a) {
        if (!(ZTX.agar.battleRoyale.state > 2 || s <= 0)) {
            this.drawDashedCircle(t, e, i, s, 60, o, a);
        }
    },
    'drawTextAlongArc': function (ctx, str, centerX, centerY, radius, angle) {
        var len = str.length,
            s;
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(-1 * angle / 2);
        this.ctx.rotate(-1 * (angle / len) / 2);
        for (var n = 0; n < len; n++) {
            this.ctx.rotate(angle / len);
            this.ctx.save();
            this.ctx.translate(0, -1 * radius);
            s = str[n];
            this.ctx.fillText(s, 0, 0);
            this.ctx.restore();
        }
        this.ctx.restore();
    },
    'drawGhostCells': function () {
        if (defaultmapsettings.showGhostCells) {
            var t = ZTX.agar.ghostCells;
            this.ctx.beginPath();
            var e = 0;
            for (; e < t.length; e++) {
                if (!t[e].inView) {
                    var i = t[e].x;
                    var s = t[e].y;
                    this.ctx.moveTo(i, s);
                    this.ctx.arc(i, s, t[e].size, 0, this.pi2, false);
                    //
                    if (defaultmapsettings.showGhostCellsInfo) {
                        this.nickScale = 1;
                        this.fontSize = Math.max(t[e].size * 0.3, 26) * this.scale;
                        this.nickSize = ~~(this.fontSize * this.nickScale);
                        this.ctx.font = defaultSettings.namesFontWeight + " " + this.nickSize * 4 + "px " + defaultSettings.namesFontFamily;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillStyle = defaultSettings.namesColor;
                        this.ctx.strokeStyle = defaultSettings.namesStrokeColor;
                        this.ctx.lineWidth = 4;
                        angle = Math.PI * 0.8;

                        if (ZTX.agar.leaderboard[e] != undefined) { //LM instead of legendmod for quicker response

                            this.ghostcellstext = removeEmojis(ZTX.ogario.escapeHTML(ZTX.agar.leaderboard[e].nick)); //legendmod3.escapeHTML(legendmod.leaderboard[0].nick)
                        } else {
                            this.ghostcellstext = "Legend mod";
                        }
                        this.drawTextAlongArc(this.ctx, this.ghostcellstext, i, s, t[e].size * this.pi2 / 6, angle);
                        if (defaultmapsettings.customSkins && ZTX.agar.showCustomSkins) {
                            if (ZTX.agar.leaderboard[e] != undefined) {
                                node = ZTX.ogario.getCustomSkin(ZTX.agar.leaderboard[e].nick, "#000000");
                                if (node) {
                                    this.ctx.drawImage(node, i - t[e].size, s - t[e].size, t[e].size * 2, t[e].size * 2);
                                }
                            }
                        }
                    }
                    //
                }
            }
            this.ctx.fillStyle = defaultSettings.ghostCellsColor;
            this.ctx.globalAlpha = defaultSettings.ghostCellsAlpha;
            this.ctx.shadowColor = defaultSettings.ghostCellsColor;
            this.ctx.shadowBlur = 40;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            this.ctx.shadowBlur = 0;
        }
    },
    'preDrawPellet': function () {
        this.pellet = null;
        var t = 10 + defaultSettings.foodSize,
            e = document.createElement('canvas');
        e.width = 2 * t, e.height = 2 * t;
        var i = e.getContext('2d');
        i.arc(t, t, t, 0, this.pi2, false), i.fillStyle = defaultSettings.foodColor, i.fill(), this.pellet = new Image(), this.pellet.src = e.toDataURL(), e = null;
    },
    'preDrawIndicator': function () {
        this.indicator = null;
        var t = document.createElement('canvas');
        t.width = 90, t.height = 50;
        var e = t.getContext('2d');
        e.lineWidth = 2;
        e.fillStyle = defaultSettings.teammatesIndColor;
        e.strokeStyle = '#000000';
        e.beginPath();
        e.moveTo(0, 0);
        e.lineTo(90, 0);
        e.lineTo(45, 50);
        e.closePath();
        e.fill();
        e.stroke();
        this.indicator = new Image();
        this.indicator.src = t.toDataURL();
        t = null;
    },
    'countFps': function () {
        if (defaultmapsettings.showStatsFPS) {
            var t = Date.now();
            if (!this.fpsLastRequest) {
                this.fpsLastRequest = t;
            }
            if (t - this.fpsLastRequest >= 1000) {
                this.fps = this.renderedFrames;
                this.renderedFrames = 0;
                this.fpsLastRequest = t;
            }
            this.renderedFrames++;
        }
    },
    'render': function () {
        ZTX.draw.countFps(), ZTX.draw.renderFrame(), window.requestAnimationFrame(ZTX.draw.render);
    },
    'init': function () {
        this.setCanvas();
        this.resizeCanvas();
        this.preDrawPellet();
        this.preDrawIndicator();
        window.requestAnimationFrame(ZTX.draw.render);
    }

}