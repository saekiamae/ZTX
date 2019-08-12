<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu:700">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<?php
$styles = array(
"lib/jquery.min",
"lib/bootstrap.min",
"lib/bootstrap-colorpicker.min",
"master",
"bootstrap-colorpicker.min",
"toastr.min",
"switchery.min",
"rangeslider.min",
"perfect-scrollbar.min",
"ogario.v3");

foreach($styles as $css){
     echo '<link rel="stylesheet" href="'.$srv.'/'.$css.'.css?ver='.getRandomStr().'">'."\r\n";
}
?>