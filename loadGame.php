 <canvas id="canvas"></canvas>
 <script src="<?= $srv ?>/LMexpress.sniff.js?ver=<?= getRandomStr() ?>"></script>
 <script src="<?= $srv ?>/ogario/quadtree.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
  <script src="<?= $srv ?>/globaltemp.js?ver=<?= getRandomStr() ?>"></script>
 <script src="<?= $srv ?>/ogario.v4.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/autoplay.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/mergetimer.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/anti.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <script src="<?= $srv ?>/ogario/ogario.v4.static.js?ver=<?= getRandomStr() ?>" charset="utf-8"></script>
 <!-- <script src="<?= $srv ?>/LMexpress.js?ver=<?= getRandomStr() ?>"></script> -->
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