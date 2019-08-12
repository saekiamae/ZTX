<div id="fb-root"></div>
<script>
/*
var CutNameConflictwithMessage=false;
(function(){
    var _privateLog = console.log;
    console.log = function (message) {
		if (CutNameConflictwithMessage==false){
		if (~message.indexOf("OGARio by szymy")){
		//console.log = _privateLog;
		}
		else{
			_privateLog.apply(console, arguments);
		}
		}
    };
})();
*/
 </script>
 <script>
  (function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js?ver=<?= getRandomStr() ?>";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
 </script>
 <div id="overlays" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 200;">
  <div id="helloContainer" data-logged-in="0" data-has-account-data="0" data-party-state="0" data-results-state="0" data-gamemode="">
   <div id="leftPanel" class="side-container left-container">
    <div class="agario-panel agario-side-panel agario-profile-panel">
     <div class="clearfix" style="margin-bottom: 16px;">
      <img class="agario-profile-picture" src=""/>
      <div class="agario-profile-name-container">
       <div class="agario-profile-name"></div>
      </div>
     </div>
     <div style="position: relative;" class="clearfix">
      <div class="agario-exp-bar progress">
       <span class="progress-bar-text"></span>
       <div class="progress-bar progress-bar-striped" style="width: 0%;"></div>
      </div>
      <div class="progress-bar-border"></div>
      <div class="progress-bar-star"></div>
     </div>
     <br clear="both"/>
    </div>
   </div>
   <div class="center-container">
    <div id="mainPanel" class="agario-panel">
     <div role="form" novalidate>
      <div class="form-group clearfix"></div>
       <div class="form-group clearfix">
        <input id="nick" class="form-control" placeholder="Nick" maxlength="15" autofocus />
        <select id="gamemode" class="form-control" required>
         <option value=":ffa" data-itr="page_gamemode_ffa"></option>
         <option value=":battleroyale" data-itr="page_gamemode_battle_royale"></option>
         <option value=":teams" data-itr="page_gamemode_teams"></option>
         <option value=":experimental" data-itr="page_gamemode_experimental"></option>
         <option value=":party" data-itr="page_party"></option>
        </select>
       </div>
       <div id="locationUnknown">
        <select id="region" class="form-control" onchange="master.setRegion($('#region').val());" required>
         <option selected value="" data-itr="page_region_select"></option>
         <option value="US-Atlanta" data-itr="page_region_north_america"></option>
         <option value="BR-Brazil" data-itr="page_region_south_america"></option>
         <option value="EU-London" data-itr="page_region_europe"></option>
         <option value="RU-Russia" data-itr="page_region_russia"></option>
         <option value="TK-Turkey" data-itr="page_region_turkey"></option>
         <option value="JP-Tokyo" data-itr="page_region_east_asia"></option>
         <option value="CN-China" data-itr="page_region_china"></option>
         <option value="SG-Singapore" data-itr="page_region_oceania"></option>
        </select>
       </div>
       <div class="form-group" id="agario-main-buttons">
       <div class="row">
        <button type="button" onclick="toggleSettings(); return false;" class="btn btn-info btn-settings"><i class="glyphicon glyphicon-cog"></i></button>
        <button type="submit" class="btn btn-play btn-primary btn-needs-server" data-itr="page_play"></button>
        <button type="submit" class="btn btn-play-guest btn-success btn-needs-server" data-itr="page_play_as_guest"></button>
        <button type="submit" onclick="toggleSocialLogin(); return false" class="btn btn-warning btn-login-play btn-needs-server" data-itr="page_login_and_play"></button>
       </div>
       <div id="socialLoginContainer" style="display:none;">
        <div class="row">
         <button onclick="master.facebookLogin(); return false;" class="btn btn-primary btn-login btn-fb">
          <span class="fa fa-facebook fa-lg" style="position: absolute; left: 15px; top: 12px;"></span>
          <span class="btn-text" data-itr="page_menu_login_facebook"></span>
         </button>
        </div>
        <div class="row">
         <button id="gplusLogin" class="btn btn-primary btn-login btn-gplus">
          <span class="gplus-icon"></span>
          <span class="btn-text" data-itr="page_menu_login_google"></span>
         </button>
        </div>
       </div>
      </div>
      <div id="settings" class="checkbox" style="display:none;">
       <div style="float: left; width: 200px;">
        <div id="locationKnown"></div>
       </div>
       <div style="float: right; width: 120px;">
        <button class="btn btn-warning btn-spectate btn-needs-server" data-itr="page_spectate">Spectate</button>
        <button id="logoutbtn" onclick="logout(); return false;" class="btn btn-danger btn-logout" data-itr="page_logout">Logout</button>
       </div>
       <br clear="both"/>
      </div>
     </div>
    </div>
   </div>
   <div id="rightPanel" class="side-container right-container">
    <div class="agario-panel agario-side-panel agario-party">
     <div class="agario-party-6">
      <h4><center data-itr="page_party"></center></h4>
      <div class="party-text" data-itr="page_party_join_error"></div>
      <div class="clearfix" style="margin: 10px -10px 0px -10px;">
       <button class="btn btn-primary btn-block" data-itr="page_back_button"></button>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
 <canvas id="canvas"></canvas>
 <script src="<?= $srv ?>/LMexpress.sniff.js?ver=<?= getRandomStr() ?>"></script>
 <script src="<?= $srv ?>/ogario/quadtree.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/ogario.v4.js?v=32" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/autoplay.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/mergetimer.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/anti.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/ogario.v4.static.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/LMexpress.js?ver=<?= getRandomStr() ?>"></script>
 <script src="<?= $srv ?>/LMexpress.sniff3.js?ver=<?= getRandomStr() ?>"></script>
 <div style="font-family:'Ubuntu'">&nbsp;</div>
 <div id="captchaWindow" style="display:none; position:absolute; top:0px; left:0px; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); z-index:500">
  <div id="verifyUser" style="position:absolute; top:50%; left:50%; margin-left:-152px; margin-top:-40px;"></div>
 </div>
 <script src="//apis.google.com/js/client:platform.js?onload=gapiAsyncInit" async defer></script>
 <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-92655864-6', 'auto');
  ga('send', 'pageview');

 </script>
 <script>
  function Recaptcha(curtinId, elemId) {
    var self = this;
    this.init = function() {
        this.ready = true;
    }
    this.show = function() {
        document.getElementById(this.curtin).style.display = 'block';
    }
    this.hide = function() {
        document.getElementById(this.curtin).style.display = 'none';
    }
    this.reset = function() {
        grecaptcha.reset();
    }
    this.onRender = function(response) {
        master.notifyToken(response);
        self.hide();
        self.reset();
    }
    this.render = function() {
       if (this.ready) {
            this.show();
            if (this.widget == null)
            	this.widget = grecaptcha.render(this.id, {
                    'sitekey' : '6LfjUBcUAAAAAF6y2yIZHgHIOO5Y3cU5osS2gbMl',
                    'callback' : this.onRender,
                });
           	else
           		this.reset();
       }
       return this.ready;
    }
    this.id = elemId;
    this.curtin = curtinId;
    this.widget = null;
    this.ready = false;
    this.hide();
  }
  function requestCaptcha() {
    return myCaptcha.render();
  }
  var myCaptcha = new Recaptcha('captchaWindow','verifyUser');
  var onloadCallback = function() {
        myCaptcha.init();
  };
 </script>
 <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>