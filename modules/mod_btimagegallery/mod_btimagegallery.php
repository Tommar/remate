<?php

/**
 * @package 	mod_btimagegallery - BT Image Gallery Module
 * @version		2.0.0
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
defined('_JEXEC') or die;

$moduleID = $module->id;
//if($moduleID != 0 && JFolder::exists($saveDir.'/0')){
//            JFolder::move($saveDir.'/0', $saveDir.'/'.$moduleID);
//        }

require_once 'helpers/helper.php';
require_once JPATH_BASE . '/modules/mod_btimagegallery/helpers/images.php';

$moduleURI = JURI::base() . "modules/mod_btimagegallery/";
$originalPath = JPATH_BASE . '/modules/mod_btimagegallery/images/original/';
$managerPath = JPATH_BASE . '/modules/mod_btimagegallery/images/manager/';
//lay cac tham so cai dat
$moduleTitle = $params->get('module_title', '');
$responsive = $params->get('responsive');
$touchscreen = $params->get('touchscreen',0);
if (!$responsive) {
    $moduleWidth = $params->get('module_width', 200) . 'px';
    $moduleHeight = $params->get('module_height', 300) . 'px';
    $columnNumbers = $params->get('number_of_cols', 2);
    if ($columnNumbers <= 0)
        $columnNumbers = 2;
    $itemVisible = $columnNumbers;
} else {
    $moduleWidth = '100%';
    $moduleHeight = 'auto';
}

$rowNumbers = $params->get('number_of_rows', 3);
if ($rowNumbers <= 0)
    $rowNumbers = 3;

$itemPerLi = $rowNumbers;



$imageMargin = $params->get('image_margin', 10);
$showBullet = $params->get('show_bullet', 1);
$showNav = $params->get('show_nav', 1);
$cropImage = $params->get('crop_image', 0);
$cropWidth = $params->get('crop_width', 800);
$cropHeight = $params->get('crop_height', 600);
$autoPlay = $params->get('autoplay', 1);
$slimBoxView = $params->get('slimbox_view', 1);
$btnAutoplay = $params->get('btnAutoplay', -1);
$autofancybox = $params->get('autofancybox', 0);
$playspeed = $params->get('playspeed', 3000);
$animationeffect = $params->get('animationeffect', 'elastic');
$showhelperbutton = $params->get('show_helperbutton',1);
$shownp = $params->get('show_np',0);
$remote = $params->get('remote_image', 0);
//get photos
$photos = BTImageGalleryHelper::getPhotos($params);
//sync
include_once 'sync.php';
/**
 * @since 1.5.2 
 */
$dir = JPATH_BASE . '/modules/mod_btimagegallery/images';
foreach ($photos as $key => $photo) {
    if(isset($photo->remote) && $photo->remote){
		if(!JFile::exists($dir . '/manager/' . $photo->file)){
			if(JFile::exists($dir . '/tmp/manager/' . $photo->file)){
				JFile::move($dir . '/tmp/manager/' . $photo->file, $dir . '/manager/' . $photo->file);
				continue;
			}else{
				 unset($photos[$key]);
			}
		}
		continue;
	}

	if (!JFile::exists($dir . '/original/' . $photo->file)) {
		if (JFile::exists($dir . '/tmp/original/' . $photo->file)) {
			JFile::move($dir . '/tmp/original/' . $photo->file, $dir . '/original/' . $photo->file);
			JFile::move($dir . '/tmp/manager/' . $photo->file, $dir . '/manager/' . $photo->file);
		}else{
			unset($photos[$key]);
		}
	}
}

$numberOfPhotos = count($photos);
//kiem tra crop
if ($cropImage) {
    $cropPath = $dir .'/crop/';
    $folder = $moduleURI . 'images/crop/';
    foreach ($photos as $photo) {
		$originalFile = '';
        $file = $cropPath . $photo->file;
		if($remote){
			if(isset($photo->remote)){
				$originalFile = $photo->remote;
			}else{
				$originalFile = $originalPath.$photo->file;
			}
		}else{
			if(file_exists($originalPath.$photo->file)){
				$originalFile = $originalPath.$photo->file;
			}else if(isset($photo->remote)){
				$originalFile = $photo->remote;
			}
		}
		
        if (file_exists($file) && $cropWidth != 0 && $cropHeight != 0) {
            $imageSize = getimagesize($file);
            if ($imageSize[0] != $cropWidth || $imageSize[1] != $cropHeight) {
                BTImageHelper::resize($originalFile, $file, $cropWidth, $cropHeight);
            }
        } else {
            if ($cropWidth != 0 && $cropHeight != 0) {
                BTImageHelper::resize($originalFile, $file, $cropWidth, $cropHeight);
            } else {
                copy($originalFile, $file);
            }
        }
    }
} else {
    $folder = $moduleURI . 'images/original/';
}
//kiem tra va tinh toan thumnail
if (!$responsive) {
    $thumbWidth = ($moduleWidth - ($columnNumbers - 1) * $imageMargin) / $columnNumbers;
    if ($thumbWidth == 0)
        $thumbWidth = 1;
    $thumbHeight = ($moduleHeight - ($rowNumbers - 1) * $imageMargin) / $rowNumbers;
    if ($thumbHeight == 0)
        $thumbHeight = 1;
}else {
    $thumbWidth = $params->get('thumbnail_width', 100);
    $thumbHeight = $params->get('thumbnail_height', 100);
}
//$liWidth = floor($thumbWidth);
$thumbnailPath = $dir.'/thumbnail/';

if ($numberOfPhotos > 0) {
    foreach ($photos as $photo) {
        $file = $thumbnailPath . $photo->file;
		
		$originalFile = '';
		$file = $thumbnailPath.$photo->file;
		if($remote){
			if(isset($photo->remote)){
				$originalFile = $photo->remote;
			}else{
				$originalFile = $originalPath.$photo->file;
			}
		}else{
			if(file_exists($originalPath.$photo->file)){
				$originalFile = $originalPath.$photo->file;
			}else if(isset($photo->remote)){
				$originalFile = $photo->remote;
			}
		}
		
        if (file_exists($file)) {
            $imageSize = getimagesize($file);
            if ($imageSize[0] != $thumbWidth || $imageSize[1] != $thumbHeight) {
                BTImageHelper::resize($originalFile, $file, $thumbWidth, $thumbHeight);
            }
        } else {
            BTImageHelper::resize($originalFile, $file, $thumbWidth, $thumbHeight);
        }
    }

    $photosList = array_chunk($photos, $itemPerLi);
}
$liWidth = floor($thumbWidth * 0.7);
$liWidth = floor($thumbHeight * 0.7);
BTImageGalleryHelper::fetchHead($params);
$language = JFactory::getLanguage();
$rtl = $language->isRTL();

require JModuleHelper::getLayoutPath('mod_btimagegallery', 'default');
?>
