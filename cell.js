ZTX.cell = function(t, e, s, o, a, n, r, l, h, c) {
    cimg2 = new Image;
    cimg2.src = defaultSettings.commanderImage2;
    cimg5 = new Image;
    cimg5.src = defaultSettings.commanderImage5;
    cimg6 = new Image;
    cimg6.src = defaultSettings.commanderImage6;
    cimg7 = new Image;
    cimg7.src = 'https://jimboy3100.github.io/banners/iconLcForCanvas.png';

    if (dyinglight1load == "yes") {
        cimgDyingLight = new Image;
        cimgDyingLight.src = defaultSettings.commanderImageDyingLight;
        cimgDyingLightvirus = new Image;
        cimgDyingLightvirus.src = defaultSettings.commanderImageDyingLightvirus;


        cimgDyingLight1 = new Image;
        cimgDyingLight1.src = 'https://jimboy3100.github.io/banners/icondyinglightzombie2.png';
        cimgDyingLight2 = new Image;
        cimgDyingLight2.src = 'https://jimboy3100.github.io/banners/icondyinglightzombie3.png';
        cimgDyingLight3 = new Image;
        cimgDyingLight3.src = 'https://jimboy3100.github.io/banners/icondyinglightzombie4.png';
        cimgDyingLight4 = new Image;
        cimgDyingLight4.src = 'https://jimboy3100.github.io/banners/icondyinglightzombie5.png';
        cimgDyingLight5 = new Image;
        cimgDyingLight5.src = 'https://jimboy3100.github.io/banners/icondyinglightzombiebig.png';
        cimgDyingLight6 = new Image;
        cimgDyingLight6.src = 'https://jimboy3100.github.io/banners/icondyinglightvolaltile.png';
    }

    //lylko
    this.points = []
    this.pointsVel = []
    this.maxPointRad = 0


    this.oldAlpha = 0;
    this.id = t;
    this.x = e;
    this.y = s;
    this.targetX = e;
    this.targetY = s;
    this.color = a;
    this.oppColor = null;
    this.size = o;
    this.targetSize = o;
    this.alpha = 1;
    this.nick = '';
    this.targetNick = '';
    this.nickCanvas = null;
    this.mass = 0;
    this.lastMass = 0;
    //			this.historyMass = [];
    //			this.historyX = [];
    //			this.historyY = [];
    this.kMass = 0;
    this.massCanvas = null;
    this.mergeCanvas = null;
    this.massTxt = '';
    this.margin = 0;
    this.scale = 1;
    this.nickScale = 1;
    this.massScale = 1;
    this.virMassScale = 3;
    this.strokeScale = 1;
    this.fontSize = 26;
    this.nickSize = 26;
    this.lastNickSize = 0;
    this.massSize = 26;
    this.virMassSize = 26;
    this.nickStrokeSize = 3;
    this.massStrokeSize = 3;
    this.isFood = n;
    this.isVirus = r;
    this.isPlayerCell = l;
    this.shortMass = h;
    this.virMassShots = c;
    this.rescale = false;
    this.redrawNick = true;
    this.redrawMass = true;
    this.redrawMerge = true;
    this.optimizedNames = false;
    this.optimizedMass = false;
    this.strokeNick = false;
    this.strokeMass = false;
    this.removed = false;
    this.redrawed = 0;
    this.time = 0;
    this.skin = null;
    this.pi2 = 2 * Math.PI;
    this.virusColor = null;
    this.virusStroke = null;
    this.nHeight = 6;

    this.updateNumPoints = function () {
        //adjustment of the number of contacts
        var numPoints = this.size * ZTX.draw.scale | 0;
        numPoints = Math.max(numPoints, 5);
        numPoints = Math.min(numPoints, 120);
        if (this.isVirus) numPoints = 100;
        while (this.points.length > numPoints) {
            var i = Math.random() * this.points.length | 0;
            this.points.splice(i, 1);
            this.pointsVel.splice(i, 1);
        }
        if (this.points.length == 0 && numPoints != 0) {
            this.points.push({
                x: this.x,
                y: this.y,
                rl: this.size,
                parent: this //?
            });
            this.pointsVel.push(Math.random() - 0.5);
        }
        while (this.points.length < numPoints) {
            var i = Math.random() * this.points.length | 0;
            var point = this.points[i];
            var vel = this.pointsVel[i];
            this.points.splice(i, 0, {
                x: point.x,
                y: point.y,
                rl: point.rl,
                parent: this
            });
            this.pointsVel.splice(i, 0, vel);
        }
    }
    this.sqDist = function (a, b) {
        return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    }
    this.movePoints = function () {
        //console.log(this.id)
        var pointsVel = this.pointsVel.slice();
        var len = this.points.length;
        for (var i = 0; i < len; ++i) {
            var prevVel = pointsVel[(i - 1 + len) % len];
            var nextVel = pointsVel[(i + 1) % len];
            var newVel = (this.pointsVel[i] + Math.random() - 0.5) * 0.7;
            newVel = Math.max(Math.min(newVel, 10), -10);
            this.pointsVel[i] = (prevVel + nextVel + 8 * newVel) / 10;
        }
        this.maxPointRad = 0
        for (var i = 0; i < len; ++i) {
            var curP = this.points[i];
            var curRl = curP.rl;
            var prevRl = this.points[(i - 1 + len) % len].rl;
            var nextRl = this.points[(i + 1) % len].rl;
            var self = this;
            var affected = ZTX.agar.quadtree.some({
                x: curP.x - 5,
                y: curP.y - 5,
                w: 10,
                h: 10
            }, function (item) {
                return item.parent != self && this.sqDist(item, curP) <= 25;
            }.bind(this));

            //this.viewMinX, this.viewMinY, this.viewMaxX, this.viewMaxY

            //(curP.x < ZTX.agar.mapMinX || curP.y < ZTX.agar.mapMaxY ||
            //curP.x > ZTX.agar.mapMaxX || curP.y > ZTX.agar.mapMinY))


            //(curP.x < ZTX.agar.viewMinX || curP.y < ZTX.agar.viewMaxY ||
            //curP.x > ZTX.agar.viewMaxX || curP.y > ZTX.agar.viewMinY))

            /*if (!affected &&
                (curP.x < ZTX.agar.mapMinX || curP.y < ZTX.agar.mapMaxY ||
                curP.x > ZTX.agar.mapMaxX || curP.y > ZTX.agar.mapMinY))
            {
                affected = true;
            }*/
            if (affected) {
                //console.log('affected!!!!!')
                this.pointsVel[i] = Math.min(this.pointsVel[i], 0);
                this.pointsVel[i] -= 1;
            }
            curRl += this.pointsVel[i];
            curRl = Math.max(curRl, 0);

            curRl = (9 * curRl + this.size) / 10; //собака

            curP.rl = (prevRl + this.size + 8 * curRl) / 10; //собака

            //curP.rl = (prevRl + nextRl + 8 * curRl) / 10;

            var angle = 2 * Math.PI * i / len;
            var rl = curP.rl;
            if (rl > this.maxPointRad) this.maxPointRad = rl
            if (this.isVirus && i % 2 == 0) {
                rl += 5;
            }

            curP.x = this.x + Math.cos(angle) * rl;
            curP.y = this.y + Math.sin(angle) * rl;
        }
    };

    this.update = function (t, e, i, s, o, a) {
        this.x = t;
        this.y = e;
        this.isVirus = s;
        this.isPlayerCell = o;
        this.setMass(i);
        this.setNick(a);
    };
    this.removeCell = function () {
        this.removed = true;
        var t = ZTX.agar.cells.indexOf(this);
        if (t != -1) {
            ZTX.agar.cells.splice(t, 1);
            if (defaultmapsettings.virusesRange) {
                t = ZTX.agar.viruses.indexOf(this);
                if (t != -1) {
                    ZTX.agar.viruses.splice(t, 1);
                }
            }
        } else {
            t = ZTX.agar.food.indexOf(this);
            if (t != -1) {
                ZTX.agar.food.splice(t, 1);
            }
        }
        t = ZTX.agar.playerCells.indexOf(this);
        if (t != -1) {
            ZTX.agar.removePlayerCell = true;
            ZTX.agar.playerCells.splice(t, 1);
            t = ZTX.agar.playerCellIDs.indexOf(this.id);
            if (t != -1) {
                ZTX.agar.playerCellIDs.splice(t, 1);
            }
        }
        if (this.redrawed) {
            ZTX.agar.removedCells.push(this);
        }
        delete ZTX.agar.indexedCells[this.id];
    };
    this.moveCell = function () {
        var t = ZTX.agar.time - this.time;
        var t1 = t / defaultmapsettings.animation;
        t1 = t1 < 0 ? 0 : t1 > 1 ? 1 : t1;
        this.x += (this.targetX - this.x) * t1;
        this.y += (this.targetY - this.y) * t1;
        this.size += (this.targetSize - this.size) * t1;
        this.alpha = t1;
        if (!this.removed) {
            this.time = ZTX.agar.time;
            return;
        }
        if (t1 == 1) {
            var t2 = ZTX.agar.removedCells.indexOf(this);
            if (t2 != -1) {
                ZTX.agar.removedCells.splice(t2, 1);
            }
        }
    };
    this.isInView = function () {
        //console.log("hi");
        return !(this.id <= 0) && !(this.x + this.size + 40 < ZTX.agar.viewX - ZTX.agar.canvasWidth / 2 / ZTX.agar.scale || this.y + this.size + 40 < ZTX.agar.viewY - ZTX.agar.canvasHeight / 2 / ZTX.agar.scale || this.x - this.size - 40 > ZTX.agar.viewX + ZTX.agar.canvasWidth / 2 / ZTX.agar.scale || this.y - this.size - 40 > ZTX.agar.viewY + ZTX.agar.canvasHeight / 2 / ZTX.agar.scale);
    };
    /*
        this.setMass = function(t) {
            return this.size = t, !(t <= 40) && (this.massCanvas ? (this.mass = ~~(t * t / 100), this.redrawMass = true, this.isVirus ? (this.virMassShots && this.mass < 200 && (this.mass = ~~((200 - this.mass) / 14)), this.massTxt = this.mass.toString(), this.mass > 220 ? (this.virusColor = defaultSettings.mVirusColor, this.virusStroke = defaultSettings.mVirusStrokeColor) : (this.virusColor = defaultSettings.virusColor, this.virusStroke = defaultSettings.virusStrokeColor), true) : (this.massTxt = this.mass.toString(), this.mass <= 200 || (this.shortMass && this.mass >= 1000 ? (this.kMass = Math.round(this.mass / 100) / 10, this.massTxt = this.kMass + 'k', true) : (this.optimizedMass && (this.redrawMass = Math.abs((this.mass - this.lastMass) / this.mass) >= 0.02 || this.rescale), true)))) : (this.massCanvas = new irenderfromagario(), false));
        };
        */
    this.setMass = function (t) {
        this.size = t;
        if (t <= 40) {
            return false;
        }
        if (!this.massCanvas) {
            this.massCanvas = new ZTX.render();
            return false;
        }
        if (!window.legendmod5.optimizedMass && window.ExternalScripts && !this.mergeCanvas) {
            this.mergeCanvas = new ZTX.render();
            return false;
        }
        this.mass = ~~(t * t / 100);
        this.redrawMass = true;
        if (this.isVirus) {
            if (this.mass <= 200) {
                this.virusColor = defaultSettings.virusColor, this.virusStroke = defaultSettings.virusStrokeColor;
            } else if (this.mass > 220) {
                this.virusColor = defaultSettings.mVirusColor, this.virusStroke = defaultSettings.mVirusStrokeColor;
            }
            if (this.virMassShots) {
                this.mass = ~~((200 - this.mass) / 14);
            }
            if (defaultmapsettings.virusSound && this.lastMass && this.mass < this.lastMass) {
                void ZTX.ogario.playSound(ZTX.ogario.setSound(defaultmapsettings.virusSoundurl));
            }
            this.massTxt = this.mass.toString();
        }
        this.massTxt = this.mass.toString();

        if (this.shortMass && this.mass >= 1000) {
            this.kMass = Math.round(this.mass / 100) / 10;
            this.massTxt = this.kMass + 'k';
            return true;
        }
        if (this.optimizedMass) {
            this.redrawMass = Math.abs((this.mass - this.lastMass) / this.mass) >= 0.02 || this.rescale;
        }
        return true;
    };

    this.setNick = function (t) {
        this.nick = t;
        if (!t || this.isVirus) {
            return false;
        }
        if (!this.nickCanvas) {
            this.nickCanvas = new ZTX.render();
            return false;
        }
        return true;
    };
    this.setScale = function (t, e, i, s, o) {
        var t = Math.ceil(t * 10) / 10;
        this.rescale = false;
        if (this.scale != t) {
            this.scale = t;
            this.rescale = true;
        }
        this.nickScale = e;
        this.massScale = i;
        this.virMassScale = s;
        this.strokeScale = o;
    };
    this.setFontSize = function () {
        if (this.isVirus) {
            this.massSize = Math.ceil(this.virMassSize * this.scale * this.virMassScale);
            return;
        }
        this.fontSize = Math.max(this.size * 0.3, 26) * this.scale;
        this.nickSize = ~~(this.fontSize * this.nickScale);
        this.massSize = ~~(this.fontSize * 0.5 * this.massScale);
        if (this.optimizedNames) {
            this.redrawNick = Math.abs((this.nickSize - this.lastNickSize) / this.nickSize) >= 0.3 || this.rescale;
            return;
        }
        this.redrawNick = true;
    };
    this.setStrokeSize = function () {
        if (this.strokeNick && !this.isVirus) {
            this.nickStrokeSize = ~~(this.nickSize * 0.1 * this.strokeScale);
        }
        if (this.strokeMass) {
            this.massStrokeSize = ~~(this.massSize * 0.1 * this.strokeScale);
        }
    };
    this.setDrawing = function () {
        this.optimizedNames = defaultmapsettings.optimizedNames;
        this.optimizedMass = defaultmapsettings.optimizedMass;
        this.shortMass = defaultmapsettings.shortMass;
        this.virMassShots = defaultmapsettings.virMassShots;
        this.strokeNick = defaultmapsettings.namesStroke;
        this.strokeMass = defaultmapsettings.massStroke;
    };
    this.setDrawingScale = function () {
        this.setScale(ZTX.active.viewScale, defaultSettings.namesScale, defaultSettings.massScale, defaultSettings.virMassScale, defaultSettings.strokeScale);
        this.setFontSize();
        this.setStrokeSize();
        this.margin = 0;
    };
    this.drawNick = function (t) {
        if (!this.nick || !this.nickCanvas || this.isVirus) {
            return;
        }
        var nickCanvas = this.nickCanvas;
        nickCanvas.setDrawing(defaultSettings.namesColor, defaultSettings.namesFontFamily, defaultSettings.namesFontWeight, this.strokeNick, this.nickStrokeSize, defaultSettings.namesStrokeColor);
        nickCanvas.setTxt(this.nick);
        if (this.redrawNick) {
            nickCanvas.setFontSize(this.nickSize);
            this.lastNickSize = this.nickSize;
        }
        nickCanvas.setScale(this.scale);
        var nickImg = nickCanvas.drawTxt();
        var w = ~~(nickImg.width / this.scale);
        var h = ~~(nickImg.height / this.scale);
        this.margin = ~~(h / 2);
        try {
            t.drawImage(nickImg, ~~this.x - ~~(w / 2), ~~this.y - this.margin, w, h);
        } catch (e) {
        }
    };
    this.drawMerge = function (context) {
        if (this.mergeCanvas && !(this.size <= 40)) {
            var mergeCanvas = this.mergeCanvas;
            mergeCanvas.setDrawing(defaultSettings.massColor, defaultSettings.massFontFamily, defaultSettings.massFontWeight, this.strokeMass, this.massStrokeSize, defaultSettings.massStrokeColor);

            mergeCanvas.setFontSize(this.massSize);
            mergeCanvas.setScale(this.scale);


            if (window.ExternalScripts && !defaultmapsettings.optimizedMass && window.playerCellsId && this.isPlayerCell && !this.isVirus) {
                CellTimerTrigger();
                if (window.playerCellsId[this.id] == undefined) {
                    window.playerCellsId[this.id] = {};
                    window.playerCellsId[this.id].historyMass = [];
                    window.playerCellsId[this.id].historyX = [];
                    window.playerCellsId[this.id].historyY = [];
                } else {
                    window.playerCellsId[this.id].historyMass.unshift(this.mass); //i test mass with size to find out the merging time
                    if (window.playerCellsId[this.id].historyMass.length > 500) {
                        window.playerCellsId[this.id].historyMass.pop();
                    }
                    window.playerCellsId[this.id].historyX.unshift(this.x);
                    if (window.playerCellsId[this.id].historyX.length > 500) {
                        window.playerCellsId[this.id].historyX.pop();
                    }
                    window.playerCellsId[this.id].historyY.unshift(this.y);
                    if (window.playerCellsId[this.id].historyY.length > 500) {
                        //this.historyY.pop();
                        window.playerCellsId[this.id].historyY.pop();
                    }
                }
                //if (this.mergeTime && this.mergeTime > 0) {
                if (window.legendmod.playerCells.length > 1 && window.playerCellsId[this.id].mergeTime && window.playerCellsId[this.id].mergeTime > 1) {
                    var customTxt = Math.round(window.playerCellsId[this.id].mergeTime);

                    if (this.redrawMerge) {
                        mergeCanvas.setTxt(customTxt);
                        //this.lastMass = this.mass;
                    }

                    var data = mergeCanvas.drawTxt(customTxt);
                    var width = ~~(data.width / this.scale);
                    //console.log(data.width, this.scale, width, this.x - width / 2);
                    var height = ~~(data.height / this.scale);
                    var textureY = this.margin === 0 ? ~~(this.y + height * 2) : ~~this.y - 4 * this.margin;
                    if (width > 1 && height > 1) {
                        try {
                            context.drawImage(data, ~~(this.x - width / 2), textureY, width, height);
                        } catch (e) {
                        }
                    }

                }

            }
            ///


            //window.counterCell++;
        }
    };
    this.drawMass = function (context) {
        if (this.massCanvas && !(this.size <= 40)) {
            var massCanvas = this.massCanvas;
            massCanvas.setDrawing(defaultSettings.massColor, defaultSettings.massFontFamily, defaultSettings.massFontWeight, this.strokeMass, this.massStrokeSize, defaultSettings.massStrokeColor);
            //
            if (this.redrawMass) {
                massCanvas.setTxt(this.massTxt);
                this.lastMass = this.mass;
            }
            massCanvas.setFontSize(this.massSize);
            massCanvas.setScale(this.scale);

            var data = massCanvas.drawTxt();
            var width = ~~(data.width / this.scale);
            //console.log("m:"+data.width, this.scale, width, this.x - width / 2);
            var height = ~~(data.height / this.scale)
            var textureY = this.margin === 0 ? ~~(this.y - height / 2) : ~~this.y + this.margin;
            if (width > 1 && height > 1) {
                try {
                    context.drawImage(data, ~~(this.x - width / 2), textureY, width, height);
                } catch (e) {
                }
            }
        }
    };
    this.createStrokeVirusPath = function (shadowXpos, shadowYpos, zeroSizeMax, pixelSizeTargetMax = 6) {
        const nAngelsOfVirus = ~~(45 * zeroSizeMax / 98);
        const GROUPSIZE = this.pi2 / nAngelsOfVirus;
        const degreeStep = GROUPSIZE / 2;
        const ctxfx = new Path2D;
        const radiusX = zeroSizeMax - pixelSizeTargetMax;
        const tileHeight = radiusX + this.nHeight;
        const n = this.pi2 + GROUPSIZE;
        for (let i = 0, j = degreeStep; i <= n; j = (i = i + GROUPSIZE) + degreeStep) {
            ctxfx.lineTo(~~(shadowXpos + radiusX * Math.sin(i)), ~~(shadowYpos + radiusX * Math.cos(i)));
            ctxfx.lineTo(~~(shadowXpos + tileHeight * Math.sin(j)), ~~(shadowYpos + tileHeight * Math.cos(j)));
        }
        return ctxfx;
    };
    this.draw = function (style, canCreateDiscussions) {
        if (!(ZTX.agar.hideSmallBots && this.size <= 36)) {
            style.save();
            this.redrawed++;
            if (canCreateDiscussions) {
                this.moveCell();
            }
            if (this.removed) {
                style.globalAlpha *= 1 - this.alpha;
            }
            var value = style.globalAlpha;
            var s = false;
            var y = this.isFood ? this.size + defaultSettings.foodSize : this.size;
            style.beginPath()


            if (defaultmapsettings.jellyPhisycs && this.points.length) {
                var point = this.points[0];
                style.moveTo(point.x, point.y);
                for (var i = 0; i < this.points.length; ++i) {
                    var point = this.points[i];
                    style.lineTo(point.x, point.y);
                }
            } else if (defaultmapsettings.jellyPhisycs && this.isVirus) {
                style.lineJoin = "miter"
                var pointCount = 120;
                var incremental = this.pi2 / pointCount;
                style.moveTo(this.x, this.y + this.size + 3);
                for (var i = 1; i < pointCount; i++) {
                    var angle = i * incremental;
                    var dist = this.size - 3 + (i % 2 === 0) * 6;
                    style.lineTo(
                        this.x + dist * Math.sin(angle),
                        this.y + dist * Math.cos(angle)
                    )
                }
                style.lineTo(this.x, this.y + this.size + 3);
            } else style.arc(this.x, this.y, y, 0, this.pi2, false);

            style.closePath();


            //if (style.arc(this.x, this.y, y, 0, this.pi2, false), style.closePath(), this.isFood) {
            //    return style.fillStyle = this.color, style.fill(), void style.restore();
            //}


            if (!defaultmapsettings.jellyPhisycs) {
                if (this.isVirus) {
                    //console.log("is not jelly");
                    if (dyinglight1load == "yes") {
                        try {
                            style.drawImage(cimgDyingLightvirus, this.x - 0.8 * this.size, this.y - 0.8 * this.size, 1.6 * this.size, 1.6 * this.size);
                        } catch (e) {
                        }
                    }
                    return defaultmapsettings.transparentViruses && (style.globalAlpha *= defaultSettings.virusAlpha, s = true), defaultmapsettings.virColors && ZTX.agar.play ? (style.fillStyle = ZTX.ogario.setVirusColor(y), style.strokeStyle = ZTX.ogario.setVirusStrokeColor(y)) : (style.fillStyle = this.virusColor, style.strokeStyle = this.virusStroke), style.fill(), s && (style.globalAlpha = value, s = false), style.lineWidth = defaultSettings.virusStrokeSize, defaultmapsettings.virusGlow ? (style.shadowBlur = defaultSettings.virusGlowSize, style.shadowColor =
                        defaultSettings.virusGlowColor) : "yeet", style.stroke(this.createStrokeVirusPath(this.x, this.y, this.size - 2, 6)), defaultmapsettings.showMass && (this.setDrawing(), this.setDrawingScale(), defaultmapsettings.virusGlow ? style.shadowBlur = 0 : "yote",
                        this.setMass(this.size), this.drawMass(style), (window.ExternalScripts && !window.legendmod5.optimizedMass && this.drawMerge(style))), void style.restore();
                }
            } else {
                if (this.isVirus) {
                    //console.log("is jelly");
                    if (defaultmapsettings.transparentViruses) {
                        style.globalAlpha *= defaultSettings.virusAlpha;
                        defaultmapsettings.isAlphaChanged = true;
                    }
                    if (defaultmapsettings.virColors && ZTX.agar.play) {
                        style.fillStyle = ZTX.ogario.setVirusColor(y);
                        style.strokeStyle = ZTX.ogario.setVirusStrokeColor(y);
                    } else {
                        style.fillStyle = defaultSettings.virusColor;
                        style.strokeStyle = defaultSettings.virusStrokeColor;
                    }
                    style.fill();
                    if (defaultmapsettings.isAlphaChanged) {
                        style.globalAlpha = defaultSettings.cellsAlpha;
                        defaultmapsettings.isAlphaChanged = false;
                    }
                    style.lineWidth = defaultSettings.virusStrokeSize;
                    if (defaultmapsettings.virusGlow) {
                        style.shadowBlur = defaultSettings.virusGlowSize;
                        style.shadowColor = defaultSettings.virusGlowColor;
                    }
                    style.stroke();
                    if (defaultmapsettings.showMass) {
                        this.setDrawing();
                        this.setDrawingScale();
                        this.setMass(this.size);
                        this.drawMass(style);
                        if (window.ExternalScripts && !window.legendmod5.optimizedMass) {
                            this.drawMerge(style);
                        }
                    }
                    style.restore();
                    return;
                }
            }
            if (defaultmapsettings.transparentCells) {
                style.globalAlpha *= defaultSettings.cellsAlpha;
                s = true;
            }
            var color = this.color;
            if (ZTX.agar.play) {
                if (this.isPlayerCell) {
                    if (defaultmapsettings.myCustomColor) {
                        color = ogarcopythelb.color;
                    }
                } else {
                    if (defaultmapsettings.oppColors && !defaultmapsettings.oppRings) {
                        color = this.oppColor;
                    }
                }
            }
            if (dyinglight1load != "yes" || this.targetNick.includes("The Dying Light")) {
                style.fillStyle = color;
                style.fill();
            }
            if (s) {
                style.globalAlpha = value;
                s = false;
            }
            /*if (dyinglight1load != "yes"){
                    style.globalAlpha = 1;
                    s = false;
                }*/
            var node = null;
            var node2 = {}; //, node2.src = ZTX.ogario.customSkinsMap[this.targetNick]


            //lylko
            if (defaultmapsettings.customSkins && ZTX.agar.showCustomSkins) {
                node = ZTX.ogario.getCustomSkin(this.targetNick, this.color);

                if (node) {
                    if ((defaultmapsettings.transparentSkins || ZTX.agar.play && defaultmapsettings.oppColors) && !(this.isPlayerCell && !defaultmapsettings.myTransparentSkin) || this.isPlayerCell && defaultmapsettings.myTransparentSkin) {
                        style.globalAlpha *= defaultSettings.skinsAlpha;
                        s = true;
                    }


                    if (defaultmapsettings.jellyPhisycs) {
                        var lineWidth = Math.max(~~(y / 50), 10);
                        style.save();
                        style.clip();
                        this.maxPointRad && (y = this.maxPointRad);
                        try {
                            style.drawImage(node, this.x - y - lineWidth, this.y - y - lineWidth, 2 * y + lineWidth * 2, 2 * y + lineWidth * 2);
                        } catch (e) {
                        }
                        style.globalCompositeOperation = 'luminosity';

                        style.lineWidth = lineWidth
                        style.strokeStyle = color;
                        style.stroke();
                        style.globalCompositeOperation = '';
                        style.restore();

                    } else {
                        try {
                            style.drawImage(node, this.x - y, this.y - y, 2 * y, 2 * y);
                        } catch (e) {
                        }
                    }

                    //special animations
                    if (this.targetNick.includes("The Dying Light")) {
                        try {
                            style.drawImage(cimg5, this.x - y * 2, this.y - y * 2, 4 * y, 4 * y);
                        } catch (e) {
                        }
                    } else if (this.targetNick.includes("℄🌀Jimboy3100") || this.targetNick.includes("Qᴜᴇᴛᴢᴀʟ   ᶜᵒᵃᵗˡ") || this.targetNick.includes("℄🌀     ᑕᖇᗩƵƳ😈") || this.targetNick.includes("℄🌀ᔕᕼᗴᖇᗴ ᛕᕼᗩᑎ")) {
                        try {
                            style.drawImage(cimg2, this.x - y * 2, this.y - y * 2, 4 * y, 4 * y);
                            //style.translate(this.x - y * 2, this.y - y * 2, this.y - y * 2);
                            //style.rotate(ZTX.agar.cAngle);
                            //style.drawImage(cimg2, this.x - y * 2, this.y - y * 2, 4 * y, 4 * y);
                            //try
                            //ZTX.agar.updateCommander();
                        } catch (e) {
                        }
                    }
                    //style.drawImage(node, this.x - y, this.y - y, 2 * y, 2 * y), s && (style.globalAlpha = value, s = false)),
                    //(this.targetNick.includes("℄🌀ＪｕｓｔＷａｔｃｈＰｒｏ")) && (this.oldAlpha=style.globalAlpha, style.globalAlpha = 0.1, style.drawImage(cimg7, this.x - y * 4, this.y - y * 4, 8 * y, 8 * y), style.globalAlpha=this.oldAlpha), //cimg7
                    //((defaultmapsettings.videoSkins && (node2.src.includes(".mp4") || node2.src.includes(".webm") || node2.src.includes(".ogv")) && checkVideos(node2.src, this.targetNick)),
                    //(node2.src.includes(".mp4") || node2.src.includes(".webm") || node2.src.includes(".ogv")) && style.drawImage(window.videoSkinPlayer[node2.src], this.x - 0.7 * y, this.y - 0.7 * y, 1.4 * y, 1.4 * y) ),
                    //node2.src.includes(".mp4") && (style.drawImage(node2, this.x - 0.7 * y, this.y - 0.7 * y, 1.4 * y, 1.4 * y)),
                    //!node2.src.includes(".mp4") && !node2.src.includes(".webm") && !node2.src.includes(".ogv") && style.drawImage(node, this.x - y, this.y - y, 2 * y, 2 * y),
                    //(this.targetNick.includes("℄🌀ＪｕｓｔＷａｔｃｈＰｒｏ")) && (style.drawImage(cimg6, this.x - y, this.y - y, 2 * y, 2 * y)),
                    //this.targetNick.includes("℄") && (style.rotate(ZTX.agar.cAngle1)) && (style.drawImage(cimg2, this.x - y * 1.5, this.y - y * 1.5, 3 * y, 3 * y)) &&
                    //(this.targetNick.includes("The Dying Light")) && (style.drawImage(cimg5, this.x - y * 2, this.y - y * 2, 4 * y, 4 * y)),
                    //(this.targetNick.includes("℄🌀Jimboy3100") || this.targetNick.includes("℄🌀     ᑕᖇᗩƵƳ😈") || this.targetNick.includes("℄🌀ᔕᕼᗴᖇᗴ ᛕᕼᗩᑎ")) &&

                    //(ZTX.agar.cAngle += .007), console.log(ZTX.agar.cAngle),
                    //style.rotate(ZTX.agar.cAngle1),
                }
            }
            if (s) {
                style.globalAlpha = value;
                s = false;
            }


            if (defaultmapsettings.teammatesInd && !this.isPlayerCell && y <= 800 &&
                window.teammatenicks && this.targetNick != "" &&
                (window.teammatenicks.includes(this.targetNick))) {
                ZTX.draw.drawTeammatesInd(style, this.x, this.y, y)
            }

            if (defaultmapsettings.noNames && !defaultmapsettings.showMass || canCreateDiscussions) {

                //                            y <= 200 && (node || ZTX.ogario.checkSkinsMap(this.targetNick, this.color)) && ZTX.draw.drawTeammatesInd(style, this.x, this.y, y), defaultmapsettings.noNames && !defaultmapsettings.showMass || canCreateDiscussions) {

                style.restore();
                return;
            } else {
                if (defaultmapsettings.customSkins && ZTX.agar.showCustomSkins) {
                    node2.src = ZTX.ogario.customSkinsMap[this.targetNick];
                    ZTX.ogario.customSkinsMap[this.targetNick];
                    if (node2.src) {
                        if (defaultmapsettings.videoSkins) {
                            if (node2.src.includes(".mp4") || node2.src.includes(".webm") || node2.src.includes(".ogv")) {
                                checkVideos(node2.src, this.targetNick);
                                try {
                                    style.drawImage(window.videoSkinPlayer[node2.src], this.x - 0.7 * y, this.y - 0.7 * y, 1.4 * y, 1.4 * y);
                                } catch (e) {
                                }
                            }
                        }
                    }
                    if (dyinglight1load == "yes" && node == null && this.targetNick.includes("The Dying Light") == false) {
                        try {
                            style.drawImage(cimgDyingLight, this.x - y, this.y - y, 2 * y, 2 * y);
                        } catch (e) {
                        }
                    }

                }
                var recursive = false;
                if (!this.isPlayerCell && (recursive = ZTX.ogario.setAutoHideCellInfo(y)) && defaultmapsettings.autoHideNames && defaultmapsettings.autoHideMass) {
                    style.restore();
                } else {
                    this.setDrawing();
                    this.setDrawingScale();
                    style.globalAlpha *= defaultSettings.textAlpha;
                    if (!(defaultmapsettings.noNames || recursive && defaultmapsettings.autoHideNames || this.isPlayerCell && defaultmapsettings.hideMyName || node && defaultmapsettings.hideTeammatesNames)) {
                        if (this.setNick(this.targetNick)) {
                            this.drawNick(style);
                        }
                    }
                    if (!(!defaultmapsettings.showMass || recursive && defaultmapsettings.autoHideMass || this.isPlayerCell && defaultmapsettings.hideMyMass || defaultmapsettings.hideEnemiesMass && !this.isPlayerCell && !this.isVirus)) {
                        if (this.setMass(this.size)) {

                            this.drawMass(style);
                            if (window.ExternalScripts && !window.legendmod5.optimizedMass) {
                                this.drawMerge(style);
                            }
                        }
                    }
                    style.restore();
                }


            }
        }
    };
}