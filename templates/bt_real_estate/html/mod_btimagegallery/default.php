<?php
/**
 * @package 	mod_btimagegallery - BT Image Gallery Module
 * @version		1.4
 * @created		Dec 2011
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');
$document	= JFactory::getDocument();
if($rtl == 1) {
	$document->addStyleDeclaration(                  
					  "#btimagegallery". $module->id . " .jcarousel-item{padding:0;margin:0;margin-left: {$imageMargin}px;min-width: {$thumbWidth}px;min-height: {$thumbHeight}px;}");
} else {
	$document->addStyleDeclaration(                  
					  "#btimagegallery". $module->id . " .jcarousel-item{padding:0;margin:0;margin-right: {$imageMargin}px;min-width: {$thumbWidth}px;min-height: {$thumbHeight}px;}");
}
$document->addStyleDeclaration(                  
                  "#btimagegallery". $module->id . " .jcarousel-item a{display: block; margin-bottom: {$imageMargin}px;cursor: url('".JURI::base()."modules/mod_btimagegallery/tmpl/images/magnifier.cur'), pointer;}");
if($responsive){
$document->addStyleDeclaration(                  
                  "#btimagegallery". $module->id . " .jcarousel-item a img {min-width: {$thumbWidth}px; min-height: {$thumbHeight}px;}");
}
?>
<?php if ($numberOfPhotos > 0) { ?>
<div  style="width: <?php echo $moduleWidth ?>; padding-top: <?php echo $imageMargin?>px;" id="btimagegallery<?php echo $module->id; ?>" class="mod_btimagegallery <?php echo $params->get('moduleclass_sfx') ? 'mod_btimagegallery'. $params->get('moduleclass_sfx') : '' ?>">
    <?php
    if (trim($moduleTitle) != '') {
        echo '<h3>' . $moduleTitle . '</h3>';
    }
    ?>
    <div class="jcarousel-wrapper">
		<div class="btloading"></div>
        <?php if($showNav){?>
        <div class="next"></div>
        <div class="prev"></div>
        <?php } ?>   
       <?php if($showBullet){?>
        <div class="pagination"></div>
        <?php }?>
        <ul id="btcontentshowcase<?php echo $module->id; ?>_jcarousel" class="jcarousel jcarousel-skin-tango" style="display:none;">
            <?php foreach( $photosList as $key => $list ): ?>
                <?php echo '<li style="width:' . $liWidth. 'px">'?>
                <?php foreach( $list as $i => $photo): ?>                            
                <?php
                if ($slimBoxView) {
					if(isset($photo->youid) && strlen($photo->youid)!=0){
						if($photo->autoplay == -1){
							$autoplay = $btnAutoplay;								
						}
						else{
							$autoplay = $photo->autoplay;
						}						
						$img = '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'.trim($photo->youid).'?autoplay='.$autoplay.'&enablejsapi=1&wmode=opaque" rel="fancybox"><div class="imageicon"><img src="' . $moduleURI . 'images/thumbnail/' . $photo->file . '" alt="'.($photo->alt).'"/><div class="icon"></div></div></a>';
					}else{
						$img = '<a title="' . $photo->title . '" class="fancybox" href="' . ($cropImage ? $folder . $photo->file : ($remote ? (isset($photo->remote) ? $photo->remote : $folder . $photo->file) :  (file_exists($originalPath . $photo->file) ? $moduleURI . 'images/original/'. $photo->file : (isset($photo->remote) ? $photo->remote : '') ))) . '" rel="fancybox"><img src="' . $moduleURI . 'images/thumbnail/' . $photo->file . '" alt=""/></a>';
					}
                } else {
                    if(isset($photo->youid) && strlen($photo->youid)!=0){
						if($photo->autoplay == -1){
							$autoplay = $btnAutoplay;								
						}
						else{
							$autoplay = $photo->autoplay;
						}						
						$img = '<a  href="http://www.youtube.com/embed/'.trim($photo->youid).'?autoplay='.$autoplay.'&enablejsapi=1&wmode=opaque"><div class="imageicon"><img src="' . $moduleURI . 'images/thumbnail/' . $photo->file . '" alt="'.($photo->alt).'"/><div class="icon"></div></div></a>';
					}
					else{
                    $img = '<a href="' . ($remote ? (isset($photo->remote) ? $photo->remote : $folder . $photo->file) :  (file_exists($originalPath . $photo->file) ? $moduleURI . 'images/original/'. $photo->file : (isset($photo->remote) ? $photo->remote : '') )) . '"><img src="' . $moduleURI . 'images/thumbnail/' . $photo->file . '" alt=""/></a>';
					}
                }
                echo $img;

                    if(($i+1) % $rowNumbers == 0 || $i == count($list)-1){	

                        echo '</li>';
                    }
                
                   
                ?>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </ul>
    </div>
</div>

    <script type="text/javascript">
    if(typeof(btiModuleIds)=='undefined'){var btiModuleIds = new Array();var btiModuleOpts = new Array();}
	btiModuleIds.push(<?php echo $module->id; ?>);
	btiModuleOpts.push({
		moduleID : <?php echo $moduleID?>,
		auto: <?php echo ($params->get('autoplay')) ? $params->get('interval', 5000) /1000 : '0' ?>,
        animation: <?php echo (int)$params->get('duration', '1000')?>,
        rtl: <?php echo $rtl ? 'true' : 'false'?>,
        scroll : <?php echo(!$responsive)? $columnNumbers : '""' ?>,
        responsive : <?php echo $responsive ?>,
		showBullet: <?php echo $showBullet ?>,
        itemVisible: <?php echo(!$responsive)? $itemVisible : '""' ?>,
		moduleURI : '<?php echo $moduleURI ?>',
		liWidth : <?php echo $liWidth ?>,
		pauseHover : <?php echo $params->get('pause_hover') ?>,
		numberOfPhotos : <?php echo $numberOfPhotos ?>,
		touchscreen : <?php echo $touchscreen ?>,
		showNav 		: <?php echo $showNav?>,
		autofancybox	: <?php echo $autofancybox ?>,
		playspeed		:<?php echo $playspeed ?>,
		animationeffect	:'<?php echo $animationeffect ?>',
		showhelperbutton:<?php echo $showhelperbutton ?>,
		shownp			:<?php echo $shownp ?>
		
	});
    
       
    </script>

    <?php
} else {
    echo JText::_('MOD_BTIMAGEGALLERY_ERROR_NO_IMAGE');
}
?>