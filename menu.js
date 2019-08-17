ZTX.menu = {
    'menuMainColorCSS': null,
    'menuPanelColorCSS': null,
    'menuTextlColorCSS': null,
    'menuButtonsCSS': null,
    'hudCSS': null,
    'chatCSS': null,
    'chatScaleCSS': null,
    'cursorCSS': null,
    'loadThemeSettings': function (i) {
        var t = null;
        for (var s in null !== window.localStorage.getItem('ogarioThemeSettings') && (t = JSON.parse(window.localStorage.getItem('ogarioThemeSettings'))), defaultSettings) defaultSettings.hasOwnProperty(s) && (t && t.hasOwnProperty(s) && (defaultSettings[s] = t[s]), ZTX.active.hasOwnProperty(s) && (i[s] = defaultSettings[s]));
        //if (defaultmapsettings.zoomSpeedValue2 && defaultmapsettings.zoomSpeedValue2>0.99){defaultmapsettings.zoomSpeedValue2=defaultmapsettings.zoomSpeedValue2-1};
    },
    'saveThemeSettings': function () {
        window.localStorage.setItem('ogarioThemeSettings', JSON.stringify(defaultSettings));
    },
    'restoreThemeSettings': function () {
        null !== window.localStorage.getItem('ogarioThemeSettings') && (window.localStorage.removeItem('ogarioThemeSettings'), window.location.reload());
    },
    'addCustomCSS': function (t, e) {
        this[t] || (this[t] = $("<style type=\'text/css\'>").appendTo('head')), this[t].html(e);
    },
    'addPresetBox': function (t, e, i, o, a) {
        for (var n in $(t).append('<div class=\"preset-box\"><span class=\"title-box\">' +ZTX.cl[e] + '</span><div class=\"select-wrapper\"><select id=\"' + e + '\" class=\"form-control\"></select></div></div>'), i) ZTX.active.hasOwnProperty(n) && $('#' + e).append('<option value=\"' + n + '\">' + i[n]['name'] + '</option>');
        $('#' + e).val(defaultSettings[o]);
        var r = this;
        $('#' + e).on('change', function () {
            var t = this.value;
            defaultSettings[o] = t, r[a](t);
        });
    },
    'addColorBox': function (t, e, o) {
        if ($(t).append('<div class=\"color-box\"><span class=\"title-box\">' +ZTX.cl[e] + '</span><div class=\"input-group ' + e + '-picker\"><input type=\"text\" value=\"' + defaultSettings[e] + '\" id=\"' + e + '\" class=\"form-control\" /><span class=\"input-group-addon\"><i></i></span></div></div>'), o) {
            var a = this;
            $(t + ' .' + e + '-picker')['colorpicker']({
                'format': 'hex'
            }).on('changeColor.colorpicker', function (t) {
                defaultSettings[e] = t.color.toHex(), ZTX.active.hasOwnProperty(e) && (i[e] = defaultSettings[e]), a[o]();
            });
        } else $(t + ' .' + e + '-picker').colorpicker({
            'format': 'hex'
        }).on('changeColor.colorpicker', function (t) {
            defaultSettings[e] = t.color.toHex(), ZTX.active.hasOwnProperty(e) && (i[e] = defaultSettings[e]);
        });
    },
    'addRgbaColorBox': function (t, e, o) {
        if ($(t).append('<div class=\"color-box\"><span class=\"title-box\">' +ZTX.cl[e] + '</span><div class=\"input-group ' + e + '-picker\"><input type=\"text\" value=\"' + defaultSettings[e] + '\" id=\"' + e + '\" class=\"form-control\" /><span class=\"input-group-addon\"><i></i></span></div></div>'), o) {
            var a = this;
            $(t + ' .' + e + '-picker').colorpicker({
                'format': 'rgba'
            }).on('changeColor.colorpicker', function (t) {
                var s = t.color.toRGB();
                defaultSettings[e] = 'rgba(' + s['r'] + ',' + s['defaultSettings'] + ',' + s['b'] + ',' + s['a'] + ')', ZTX.active.hasOwnProperty(e) && (i[e] = defaultSettings[e]), a[o]();
            });
        } else s(t + ' .' + e + '-picker').colorpicker({
            'format': 'rgba'
        }).on('changeColor.colorpicker', function (t) {
            var s = t.color.toRGB();
            defaultSettings[e] = 'rgba(' + s['r'] + ',' + s['defaultSettings'] + ',' + s['b'] + ',' + s['a'] + ')', ZTX.active.hasOwnProperty(e) && (i[e] = defaultSettings[e]);
        });
    },
    'addSliderBox': function (t, e, o, a, n, r) {
        if ($(t).append('<div class=\"slider-box\"><div class=\"box-label\"><span class=\"value-label\">' +ZTX.cl[e] + ': </span><span id=\"' + e + '-value\" class=\"value\">' + defaultSettings[e] + '</span></div><input id=\"' + e + '-slider\" type=\"range\" min=\"' + o + '\" max=\"' + a + '\" step=\"' + n + '\" value=\"' + defaultSettings[e] + '\"></div>'), r) {
            var l = this;
            $('#' + e + '-slider').on('input', function () {
                var t = parseFloat($(this).val());
                $('#' + e + '-value').text(t), defaultSettings[e] = t, ZTX.active.hasOwnProperty(e) && (i[e] = t), l[r]();
            });
        } else $('#' + e + '-slider').on('input', function () {
            var t = parseFloat($(this).val());
            $('#' + e + '-value').text(t), defaultSettings[e] = t, ZTX.active.hasOwnProperty(e) && (i[e] = t);
        });
    },
    'addInputBox': function (t, e, i, o) {
        $(t).append('<div class=\"input-box\"><span class=\"title-box\">' +ZTX.cl[e] + '</span><input id=\"' + e + '\" class=\"form-control\" placeholder=\"' + i + '\" value=\"' + defaultSettings[e] + '\" /></div>');
        var a = this;
        $('#' + e).on('input', function () {
            defaultSettings[e] = this.value, a[o]();
        });
    },
    'addCursorBox': function (t, e) {
        e === defaultSettings.customCursor ? $(t).append('<div class=\"cursor-box\"><a href=\"#\" class=\"active\"><img src=\"' + e + '\"></a></div>') : $(t).append('<div class=\"cursor-box\"><a href=\"#\"><img src=\"' + e + '\"></a></div>');
    },
    'setFont': function (t, e) {
        defaultSettings[t] = e,
            defaultSettings[t + 'Family'] = this.setFontFamily(e),
            defaultSettings[t + 'Weight'] = this.setFontWeight(e),
        ZTX.active.hasOwnProperty(t + 'Family') && (i[t + 'Family'] = defaultSettings[t + 'Family']),
        ZTX.active.hasOwnProperty(t + 'Weight') && (i[t + 'Weight'] = defaultSettings[t + 'Weight']);
    },
    'addFontBox': function (t, e, i) {
        $(t).append('<div class=\"font-box\"><span class=\"title-box\">' +ZTX.cl[e] + '</span><div class=\"select-wrapper\"><select id=\"' + e + '\" class=\"form-control\"></select></div></div>');
        $('#' + e).append('<option value=\"ubuntu\">Ubuntu</option><option value=\"ubuntu-bold\">Ubuntu Bold</option>');
        $('#' + e).append('<option value=\"roboto\">Roboto</option><option value=\"roboto-bold\">Roboto Bold</option>');
        $('#' + e).append('<option value=\"oswald\">Oswald</option><option value=\"oswald-bold\">Oswald Bold</option>');
        $('#' + e).append('<option value=\"shojumaru\">Shojumaru</option><option value=\"shojumaru-bold\">Shojumaru Bold</option>');
        $('#' + e).append('<option value=\"allura\">Allura</option><option value=\"allura-bold\">Allura Bold</option>');

        $('#' + e).val(defaultSettings[e]);
        var o = this;
        i ? $('#' + e).on('change', function () {
            var t = this.value;
            o.setFont(e, t), o[i]();
        }) : $('#' + e).on('change', function () {
            var t = this.value;
            o.setFont(e, t);
        });
    },
    'setFontFamily': function (t) {
        var tempFont;
        if (t.indexOf('roboto') == 0) {
            tempFont = 'Roboto';
        } else if (t.indexOf('oswald') == 0) {
            tempFont = 'Oswald';
        } else if (t.indexOf('shojumaru') == 0) {
            //console.log('font: shojumaru');
            tempFont = 'Shojumaru';
        } else if (t.indexOf('allura') == 0) {
            //console.log('font: allura');
            tempFont = 'Allura';
        }
        //					else (if t.indexOf('ubuntu')){
        else {
            tempFont = 'Ubuntu';
        }

        return tempFont;
        //return -1 != t.indexOf('roboto') ? 'Roboto' : -1 != t.indexOf('oswald') ? 'Oswald' : 'Ubuntu';
    },
    'setFontWeight': function (t) {
        return -1 != t.indexOf('bold') ? 700 : 400;
    },
    'setThemeMenu': function () {
        var t = this;
        $('#theme').append('<ul class=\"submenu-tabs\"><li class=\"theme-main-tab active\"><a href=\"#theme-main\" class=\"active ogicon-paint-format\" data-toggle=\"tab-tooltip\" title=\"' +ZTX.cl.basicTheming +
            '\"></a></li><li class=\"theme-menu-tab\"><a href=\"#theme-menu\" class=\"ogicon-menu\" data-toggle=\"tab-tooltip\" title=\"' +ZTX.cl.menuTheming +
            //
            '\"></a></li><li class=\"theme-menu-tab\"><a href=\"#theme-menu\" class=\"ogicon-trophy\" data-toggle=\"tab-tooltip\" title=\"' +ZTX.cl.menuTheming +
            //
            '\"></a></li><li class=\"theme-hud-tab\"><a href=\"#theme-hud\" class=\"ogicon-display\" data-toggle=\"tab-tooltip\" title=\"' +ZTX.cl.hudTheming +
            '\"></a></li><li class=\"theme-chat-tab\"><a href=\"#theme-chat\" class=\"ogicon-bubbles\" data-toggle=\"tab-tooltip\" title=\"' +ZTX.cl.chatTheming +
            '\"></a></li><li class=\"theme-minimap-tab\"><a href=\"#theme-minimap\" class=\"ogicon-location2\" data-toggle=\"tab-tooltip\" title=\"' + ZTX.cl.miniMapTheming +
            '\"></a></li><l6i class=\"theme-images-tab\"><a href=\"#theme-images\" class=\"ogicon-compass\" data-toggle=\"tab-tooltip\" title=\"' + ZTX.cl.imagesTheming +
            '\"></a></l6i></ul><div id=\"theme-main\" class=\"submenu-panel\"></div><div id=\"theme-menu\" class=\"submenu-panel\"></div><div id=\"theme-hud\" class=\"submenu-panel\"></div><div id=\"theme-chat\" class=\"submenu-panel\"></div><div id=\"theme-minimap\" class=\"submenu-panel\"></div><div id=\"theme-images\" class=\"submenu-panel\"></div>');
        this.addPresetBox('#theme-main', 'themePreset', themePresets, 'preset', 'changeThemePreset');
        this.addColorBox('#theme-main', 'bgColor', 'setBgColor');
        this.addColorBox('#theme-main', 'bordersColor');
        this.addColorBox('#theme-main', 'borderGlowColor');
        this.addColorBox('#theme-main', 'gridColor');
        this.addColorBox('#theme-main', 'sectorsColor');
        this.addColorBox('#theme-main', 'namesColor');
        this.addColorBox('#theme-main', 'namesStrokeColor');
        this.addColorBox('#theme-main', 'massColor');
        this.addColorBox('#theme-main', 'massStrokeColor');
        this.addColorBox('#theme-main', 'virusColor');
        this.addColorBox('#theme-main', 'virusStrokeColor');
        this.addColorBox('#theme-main', 'mVirusColor');
        this.addColorBox('#theme-main', 'mVirusStrokeColor');
        this.addColorBox('#theme-main', 'virusGlowColor');
        this.addColorBox('#theme-main', 'foodColor', 'setFoodColor');
        this.addColorBox('#theme-main', 'teammatesIndColor', 'setIndicatorColor');
        this.addColorBox('#theme-main', 'cursorTrackingColor');
        this.addColorBox('#theme-main', 'splitRangeColor');
        this.addColorBox('#theme-main', 'enemyBSTEDColor'); //Sonia2
        this.addColorBox('#theme-main', 'enemyBSTEColor'); //Sonia2
        this.addColorBox('#theme-main', 'enemyBColor'); //Sonia2
        this.addColorBox('#theme-main', 'enemySColor'); //Sonia2
        this.addColorBox('#theme-main', 'enemySSTEColor'); //Sonia2
        this.addColorBox('#theme-main', 'enemySSTEDColor'); //Sonia2
        this.addColorBox('#theme-main', 'safeAreaColor');
        this.addColorBox('#theme-main', 'dangerAreaColor');
        this.addColorBox('#theme-main', 'ghostCellsColor');
        this.addFontBox('#theme-main', 'namesFont');
        this.addFontBox('#theme-main', 'massFont');
        this.addFontBox('#theme-main', 'sectorsFont');
        this.addSliderBox('#theme-main', 'sectorsFontSize', 200, 2000, 10);
        this.addSliderBox('#theme-main', 'namesScale', 0.5, 2, 0.1);
        this.addSliderBox('#theme-main', 'massScale', 1, 5, 1);
        this.addSliderBox('#theme-main', 'virMassScale', 1, 5, 1);
        this.addSliderBox('#theme-main', 'strokeScale', 1, 4, 0.1);
        this.addSliderBox('#theme-main', 'foodSize', 1, 50, 1, 'setFoodColor');
        this.addSliderBox('#theme-main', 'virusStrokeSize', 2, 40, 1);
        this.addSliderBox('#theme-main', 'bordersWidth', 2, 200, 2);
        this.addSliderBox('#theme-main', 'borderGlowSize', 0, 40, 1);
        this.addSliderBox('#theme-main', 'virusGlowSize', 0, 40, 1);
        this.addSliderBox('#theme-main', 'sectorsWidth', 2, 200, 2);
        this.addSliderBox('#theme-main', 'cellsAlpha', 0.01, 0.99, 0.01);
        this.addSliderBox('#theme-main', 'skinsAlpha', 0.01, 0.99, 0.01);
        this.addSliderBox('#theme-main', 'virusAlpha', 0, 1, 0.01);
        this.addSliderBox('#theme-main', 'textAlpha', 0.1, 1, 0.01);
        this.addSliderBox('#theme-main', 'ghostCellsAlpha', 0.01, 0.99, 0.01);
        this.addPresetBox('#theme-menu', 'menuPreset', themeMenus, 'menuPreset', 'changeMenuPreset');
        this.addSliderBox('#theme-menu', 'menuOpacity', 0.1, 1, 0.01, 'setMenuOpacity');
        this.addColorBox('#theme-menu', 'menuMainColor', 'setMenuMainColor');
        this.addColorBox('#theme-menu', 'menuBtnTextColor', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'menuPanelColor', 'setMenuPanelColor');
        this.addColorBox('#theme-menu', 'menuPanelColor2', 'setMenuPanelColor');
        this.addColorBox('#theme-menu', 'menuTextColor', 'setMenuTextColor');
        this.addColorBox('#theme-menu', 'menuTextColor2', 'setMenuTextColor');
        this.addColorBox('#theme-menu', 'btn1Color', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn1Color2', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn2Color', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn2Color2', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn3Color', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn3Color2', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn4Color', 'setMenuButtons');
        this.addColorBox('#theme-menu', 'btn4Color2', 'setMenuButtons');
        this.addInputBox('#theme-menu', 'menuBg', 'Image URL', 'setMenuBg');
        this.addColorBox('#theme-hud', 'hudMainColor', 'setHudColors');
        this.addRgbaColorBox('#theme-hud', 'hudColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'hudTextColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'statsHudColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'timeHudColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'top5MassColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'lbMeColor', 'setHudColors');
        this.addColorBox('#theme-hud', 'lbTeammateColor', 'setHudColors');
        this.addFontBox('#theme-hud', 'hudFont', 'setHudFont');
        this.addSliderBox('#theme-hud', 'hudScale', 1, 2, 0.01, 'setHudScale');
        this.addRgbaColorBox('#theme-chat', 'messageColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'messageTextColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'messageTimeColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'messageNickColor', 'setChatColors');
        this.addRgbaColorBox('#theme-chat', 'commandsColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'commandsTextColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'commandsTimeColor', 'setChatColors');
        this.addColorBox('#theme-chat', 'commandsNickColor', 'setChatColors');
        this.addRgbaColorBox('#theme-chat', 'chatBoxColor', 'setChatColors');
        this.addSliderBox('#theme-chat', 'chatScale', 1, 2, 0.01, 'setChatScale');
        this.addColorBox('#theme-minimap', 'miniMapSectorsColor', 'setMiniMapSectorsColor');
        this.addColorBox('#theme-minimap', 'miniMapSectorColor');
        this.addColorBox('#theme-minimap', 'miniMapNickColor');
        this.addColorBox('#theme-minimap', 'miniMapNickStrokeColor');
        this.addColorBox('#theme-minimap', 'miniMapMyCellColor');
        this.addColorBox('#theme-minimap', 'miniMapMyCellStrokeColor');
        this.addColorBox('#theme-minimap', 'miniMapTeammatesColor');
        this.addColorBox('#theme-minimap', 'miniMapDeathLocationColor');
        this.addColorBox('#theme-minimap', 'miniMapGuidesColor');
        this.addColorBox('#theme-minimap', 'miniMapGhostCellsColor');
        this.addFontBox('#theme-minimap', 'miniMapFont', 'setMiniMapFont');
        this.addFontBox('#theme-minimap', 'miniMapNickFont');
        this.addSliderBox('#theme-minimap', 'miniMapWidth', 200, 400, 2, 'setMiniMapWidth');
        this.addSliderBox('#theme-minimap', 'miniMapSectorsOpacity', 0, 1, 0.01, 'setMiniMapSectorsOpacity');
        this.addSliderBox('#theme-minimap', 'miniMapNickSize', 8, 16, 1);
        this.addSliderBox('#theme-minimap', 'miniMapNickStrokeSize', 0, 6, 1);
        this.addSliderBox('#theme-minimap', 'miniMapMyCellSize', 4, 10, 0.5);
        this.addSliderBox('#theme-minimap', 'miniMapMyCellStrokeSize', 0, 10, 1);
        this.addSliderBox('#theme-minimap', 'miniMapTeammatesSize', 4, 10, 0.5);
        this.addSliderBox('#theme-minimap', 'miniMapGhostCellsAlpha', 0.01, 0.99, 0.01);
        this.addInputBox('#theme-images', 'customBackground', 'Image URL', 'setCustomBackground');
        this.addInputBox('#theme-images', 'customCursor', 'Cursor image URL', 'setCustomCursor');
        for (var e = 'https://jimboy3100.github.io/cursors/cursor_', i = 0; i < 35; i++) i < 9 ? this.addCursorBox('#theme-images', e + '0' + (i + 1) + '.cur') : this.addCursorBox('#theme-images', e + '' + (i + 1) + '.cur');
        $(document).on('click', '#theme-images .cursor-box a', function (e) {
            e.preventDefault();
            var i = $('img', this).attr('src');
            defaultSettings.customCursor = i;
            hudsetter.setCustomCursor();
            $('#customCursor').val(i);
            $('#theme-images .cursor-box a').removeClass('active');
            $(this).addClass('active');
        }),
            $('#theme').append('<button class=\"btn btn-block btn-success btn-save\"\">' + ZTX.cl.saveSett + '</button>'),
            $(document).on('click', '#theme .btn-save', function (e) {
                e.preventDefault();
                var i = $(this);
                ZTX.active.text(h.saved), hudsetter.saveThemeSettings(), setTimeout(function () {
                    ZTX.active.text(h.saveSett);
                }, 500);
            }), $('#theme').append('<div class=\"restore-settings\"><a href=\"#\">' + ZTX.cl.restoreThemeSettings + '</a></div>'),
            $(document).on('click', '#theme .restore-settings a', function (e) {
                e.preventDefault(), hudsetter.restoreThemeSettings();
            }), $('.skin').colorpicker({
            'format': 'hex',
            'input': '#color'
        });
    },
    'changePreset': function (t, e) {
        if (e[t]) {
            defaultSettings[t] = t;
            t = e[t];
            for (var o in t) t.hasOwnProperty(o) && defaultSettings.hasOwnProperty(o) && (defaultSettings[o] = t[o], ZTX.active.hasOwnProperty(o) && (i[o] = defaultSettings[o]), $('#theme .' + o + '-picker') && $('#theme .' + o + '-picker').colorpicker('setValue', defaultSettings[o]), $('#' + o + '-slider') && $('#' + o + '-slider').val(defaultSettings[o]).change(), ($('input[type=text]#' + o) || $('select#' + o)) && $('#' + o).val(defaultSettings[o]));
        }
    },
    'changeThemePreset': function (t) {
        this.changePreset(t, themePresets);
        this.setTheme();
    },
    'setFonts': function () {
        this.setFont('namesFont', defaultSettings.namesFont);
        this.setFont('massFont', defaultSettings.namesFont);
        this.setFont('sectorsFont', defaultSettings.sectorsFont);
    },
    'setBgColor': function () {
        $('body').css('background-color', defaultSettings.bgColor);
    },
    'setFoodColor': function () {
        defaultmapsettings.optimizedFood && ZTX.draw && ZTX.draw.preDrawPellet();
    },
    'setIndicatorColor': function () {
        if (ZTX.draw) {
            ZTX.draw.preDrawIndicator();
        }
    },
    'setCustomBackground': function () {
        defaultSettings.customBackground ? $('body').css('background-image', 'url(' + defaultSettings.customBackground + ')') : $('body').css('background-image', 'none');
    },
    'setCustomCursor': function () {
        if (defaultSettings.customCursor) var t = '*{cursor:url(' + defaultSettings.customCursor + '), auto !important}';
        else t = '*{cursor: auto}';
        this.addCustomCSS('cursorCSS', t);
    },
    'setMenu': function () {
        this.setMenuOpacity();
        this.setMenuMainColor();
        this.setMenuPanelColor();
        this.setMenuTextColor();
        this.setMenuButtons();
        this.setMenuBg();
    },
    'changeMenuPreset': function (t) {
        this.changePreset(t, themeMenus), this.setMenu();
    },
    'setMenuOpacity': function () {
        $('#helloContainer, #hotkeys, #exp-imp').css('opacity', defaultSettings.menuOpacity);
    },
    'setMenuMainColor': function () {
        var t = '::-moz-selection{background-color:' + defaultSettings.menuMainColor + '!important}::selection{background-color:' + defaultSettings.menuMainColor + '!important}.menu-main-color,#quick-menu a:hover,.quick,.quick:focus,.menu-tabs a:hover,.menu-tabs .active,.submenu-tabs a:hover,.submenu-tabs .active,#stats center,#exp-imp h1{color:' + defaultSettings.menuMainColor + '}#exp-bar .progress-bar-striped,.quick:hover,.rangeslider__fill{background-color:' + defaultSettings.menuMainColor + '}#main-menu,.agario-side-panel,#hotkeys,#exp-imp{border-color:' + defaultSettings.menuMainColor + '}.ps-scrollbar-y{background-color:' + defaultSettings.menuMainColor + '!important}';
        this.addCustomCSS('menuMainColorCSS', t);
    },
    'setMenuPanelColor': function () {
        var t = '#main-menu,.agario-side-panel,#hotkeys,#exp-imp{background-color: ' + defaultSettings.menuPanelColor + '}label:hover,.agario-panel input,.agario-panel select,.agario-side-panel input,.agario-side-panel select,.input-group-addon,.nick .input-group-btn,.skin .input-group-btn,#stream-mode,#hide-url,.menu-tabs a:hover,.menu-tabs .active,.submenu-tabs,#exp-bar .progress,#quick-menu a:hover,.quick,.select-wrapper,#hotkeys-cfg div.row:hover,#hotkeys-cfg .command-in,#exp-imp-settings textarea,.restore-settings{background-color: ' + defaultSettings.menuPanelColor2 + '}.agario-panel h5,.agario-side-panel h5,#stats h2,.menu-tabs,.submenu-tabs,#skins a.default,#stats hr,#hotkeys-cfg div.row, #exp-imp h1{border-color: ' + defaultSettings.menuPanelColor2 + '}.quick:hover,#skins a,#profiles{color:' + defaultSettings.menuPanelColor2 + '}input.stream-mode,input.hide-url{color:' + defaultSettings.menuPanelColor2 + '!important}';
        this.addCustomCSS('menuPanelColorCSS', t);
    },
    'setMenuTextColor': function () {
        var t = '.agario-panel,.agario-side-panel,.agario-panel input,.agario-panel select,.agario-side-panel input,.agario-side-panel select,.input-group-addon,.dark .yt-username,#stream-mode,#hide-url,.menu-tabs a,.submenu-tabs a,#skins a.default:hover,#quick-menu a,#prev-profile.default:hover,#next-profile.default:hover,#statsText,#hotkeys,#hotkeys-cfg .command-in,#exp-imp{color:' + defaultSettings['menuTextColor'] + '}#skins a.default:hover{border-color:' + defaultSettings['menuTextColor'] + '}::-webkit-input-placeholder{color:' + defaultSettings.menuTextColor2 + '!important}::-moz-placeholder{color:' + defaultSettings.menuTextColor2 + '!important}#user-id-tag, #version-tag,#statsSubtext,#hotkeys-inst,#exp-imp textarea,.restore-settings a,.restore-settings a:hover{color:' + defaultSettings.menuTextColor2 + '}#hotkeys-cfg .command-in,#theme .color-box{border-color:' + defaultSettings.menuTextColor2 + '}';
        this.addCustomCSS('menuTextColorCSS', t);
    },
    'setMenuButtons': function () {
        var t = 'a,a:hover{color:' + defaultSettings.btn1Color + '}.btn,#hotkeys-cfg .custom-key-in{color:' + defaultSettings.menuBtnTextColor + '}.btn-primary{background-color:' + defaultSettings.btn1Color + '!important}.btn-primary:active,.btn-primary:disabled,.btn-primary:focus,.btn-primary:hover{background-color:' + defaultSettings['btn1Color2'] + '!important}.btn-success{background-color:' + defaultSettings['btn2Color'] + '!important}.btn-success:active,.btn-success:disabled,.btn-success:focus,.btn-success:hover{background-color:' + defaultSettings['btn2Color2'] + '!important}.btn-warning{background-color:' + defaultSettings['btn3Color'] + '!important}.btn-warning:active,.btn-warning:disabled,.btn-warning:focus,.btn-warning:hover{background-color:' + defaultSettings.btn3Color2 + '!important}.btn-danger{background-color:' + defaultSettings.btn4Color + '!important}.btn-danger:active,.btn-danger:disabled,.btn-danger:focus,.btn-danger:hover{background-color:' + defaultSettings.btn4Color2 + '!important}#hotkeys-cfg .custom-key-in{background-color:' + defaultSettings.btn4Color2 + ';border-color:' + defaultSettings.btn4Color2 + '}';
        this.addCustomCSS('menuButtonsCSS', t);
    },
    'setMenuBg': function () {
        $('#menuBg').val(defaultSettings.menuBg), defaultSettings.menuBg ? $('.menu-panel, .agario-side-panel, #hotkeys, #exp-imp').css('background-image', 'url(' + defaultSettings.menuBg + ')') : $('.menu-panel, .agario-side-panel, #hotkeys, #exp-imp').css('background-image', 'none');
    },
    'setHud': function () {
        this.setHudColors();
        this.setHudFont();
        this.setHudScale();
    },
    'setHudColors': function () {
        var t = '.hud-main-color,#top5-hud a,#target-panel-hud a:hover,#target-panel-hud a.active,#message-menu a{color:' + defaultSettings.hudMainColor + '}.hud,.hud-b,#chat-emoticons{background-color:' + defaultSettings.hudColor + '}.hud,.hud-b,#top5-hud a:hover,#target-panel-hud a{color:' + defaultSettings.hudTextColor + '}.stats-hud-color{color:' + defaultSettings.statsHudColor + '}.time-hud-color{color:' + defaultSettings.timeHudColor + '}.top5-mass-color{color:' + defaultSettings.top5MassColor + '}#leaderboard-positions .me{color:' + defaultSettings.lbMeColor + '}#leaderboard-positions .teammate{color:' + defaultSettings.lbTeammateColor + '}';
        this.addCustomCSS('hudCSS', t);
    },
    'setHudFont': function () {
        this.setFont('hudFont', defaultSettings.hudFont),
            $('#overlays-hud').css({
                'font-family': defaultSettings['hudFontFamily'],
                'font-weight': defaultSettings['hudFontWeight']
            });
    },
    'setHudScale': function () {
        var t = Math.round(20 * defaultSettings.hudScale),
            e = Math.round(200 * defaultSettings.hudScale),
            i = Math.floor(55 * defaultSettings.hudScale),
            o = Math.floor(6 * defaultSettings.hudScale),
            a = Math.floor(280 * defaultSettings.hudScale),
            n = Math.floor(85 * defaultSettings.hudScale),
            r = Math.floor(20 * defaultSettings.hudScale);
        $('#overlays-hud').css('font-size', t + 'px');
        $('#leaderboard-hud, #time-hud').width(e);
        $('#top5-hud').width(e + 30).css('top', i + 'px');
        $('#top5-pos').css('padding-left', o + 'px');
        $('#time-hud').css('top', a + 'px');
        $('#pause-hud').css('top', n + 'px');
        $('#target-hud').css('padding-top', r + 'px');
    },
    'setChat': function () {
        this['setChatColors'](), this.setChatScale();
    },
    'setChatColors': function () {
        var t = '#message,#messages li,.toast-success{background-color:' + defaultSettings.messageColor + '}#message,.message-text,.toast-success .message-text{color:' + defaultSettings.messageTextColor + '}.message-nick,.mute-user,.mute-user:hover,.toast-success .message-nick,.toast .mute-user,.toast .mute-user:hover{color:' + defaultSettings.messageNickColor + '}.message-time{color:' + defaultSettings.messageTimeColor + '}.toast-warning{background-color:' + defaultSettings.commandsColor + '}.command-text,.toast-warning .command-text{color:' + defaultSettings.commandsTextColor + '}.command-nick,.toast-warning .command-nick,.toast-warning .mute-user,.toast-warning .mute-user:hover{color:' + defaultSettings.commandsNickColor + '}.command-time{color:' + defaultSettings.commandsTimeColor + '}#chat-box{background-color:' + defaultSettings.chatBoxColor + '}';
        this.addCustomCSS('chatCSS', t);
    },
    'setChatScale': function () {
        var t = Math.round(14 * defaultSettings.chatScale);
        var e = Math.round(280 * defaultSettings.chatScale);
        var i = Math.round(350 * defaultSettings.chatScale);
        var o = Math.round(300 * defaultSettings.chatScale);
        var a = Math.floor(14 * defaultSettings.chatScale);
        $('#message-box, #messages, #toast-container, #chat-box').css('font-size', t + 'px');
        $('#messages, #toast-container, #chat-box').width(e);
        $('#message-box').width(i), $('#chat-box').height(o);
        $('.user-list').css('padding-left', a + 'px');
        var n = '#toast-container{width:' + e + 'px;font-size:' + t + 'px}';
        this.addCustomCSS('chatScaleCSS', n);
    },
    'setMiniMap': function () {
        this.setMiniMapFont();
        this.setMiniMapWidth();
        this.setMiniMapSectorsOpacity();
    },
    'setMiniMapFont': function () {
        this.setFont('miniMapFont', defaultSettings.miniMapFont);
        if (ZTX.ogario) {
            ZTX.ogario.resetMiniMapSectors();
        }
    },
    'setMiniMapWidth': function () {
        var t = defaultSettings.miniMapWidth / 200;
        defaultSettings.miniMapTop = Math.round(20 * t);
        $('#minimap-hud').css({
            'width': defaultSettings.miniMapWidth,
            'height': defaultSettings.miniMapWidth + defaultSettings.miniMapTop
        });
        if (ZTX.ogario) {
            ZTX.ogario.resetMiniMapSectors();
        }
    },
    'setMiniMapSectorsColor': function () {
        if (ZTX.ogario) {
            ZTX.ogario.resetMiniMapSectors();
        }
    },
    'setMiniMapSectorsOpacity': function () {
        $('#minimap-sectors').css('opacity', defaultSettings.miniMapSectorsOpacity);
    },
    'setTheme': function () {
        this.setFonts();
        this.setBgColor();
        this.setCustomBackground();
        this.setCustomCursor();
        this.setMenu();
        this.setHud();
        this.setChat();
        this.setMiniMap();
    },
    'init': function (i) {
        this.loadThemeSettings(i);
    }
}