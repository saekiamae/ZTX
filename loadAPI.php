<?php

$APIs = array(
"lib/jquery.min",
"lib/bootstrap.min",
"lib/bootstrap-colorpicker.min",
"lib/switchery.min",
"lib/toastr.min",
"lib/rangeslider.min",
"lib/perfect-scrollbar.jquery.min",
"global",
"settings",
"Youtubeiframe_api",
"key-event",
"LanguagePackEnglish",
"LMexpress.sniff2",
"i18n",
"ogario/ogario.v4.master.regionobj",
"ogario/ogario.v4.master");

foreach($APIs as $API){
     echo '<script src="'.$srv.'/'.$API.'.js?ver='.getRandomStr().'"></script>'."\r\n";
}
?>