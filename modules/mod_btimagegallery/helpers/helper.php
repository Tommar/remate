<?php

/**
 * @package 	helpers
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
class BTImageGalleryHelper {

    public static function getPhocaPhotos($catid = 0) {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query = 'SELECT pg.filename as filename, pg.title as title, pgc.title as cat_name
                  FROM #__phocagallery as pg LEFT JOIN #__phocagallery_categories as pgc
                  ON pg.catid = pgc.id';
        if ($catid != 0)
            $query .= ' WHERE pg.catid = ' . $catid;
        $db->setQuery($query);
        return $db->loadObjectList();
    }

    public static function getPhocaCategories() {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query = 'SELECT id, title FROM #__phocagallery_categories';
        $db->setQuery($query);
        return $db->loadObjectList();
    }

    public static function checkPhocaComponent() {
        $path = JPATH_ADMINISTRATOR . '/components/com_phocagallery';
        if (is_dir($path) && file_exists(JPATH_ADMINISTRATOR . '/components/com_phocagallery/libraries/loader.php')) {
            return true;
        } else {
            return false;
        }
    }

    public static function checkJGalleryComponent() {
        $path = JPATH_ADMINISTRATOR . '/components/com_joomgallery';
        if (is_dir($path) && file_exists(JPATH_ADMINISTRATOR . '/components/com_joomgallery/includes/defines.php')) {
            return true;
        } else {
            return false;
        }
    }

    public static function getJoomGalleryPhotos($jcatid = 0) {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query = 'SELECT jg.imgtitle as title, jg.imgfilename as filename, jgc.catpath as cat_name';
        $query.= ' FROM #__joomgallery as jg LEFT JOIN #__joomgallery_catg as jgc ON jg.catid = jgc.cid';
        $query.= ($jcatid != 0) ? ' WHERE jg.catid = ' . $jcatid : '';
        $db->setQuery($query);
        return $db->loadObjectList();
    }

    public static function getJoomlaGalleryCategories() {
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);
        $query = 'SELECT cid, name FROM #__joomgallery_catg';
        $db->setQuery($query);
        return $db->loadObjectList();
    }

    public static function getPhotos($params) {
        $photos = $params->get('gallery');
        $photos = json_decode(base64_decode($photos));
        switch ($params->get('display_order', 'ordering')) {
            case 'title_asc':
                for ($i = 0; $i < count($photos) - 1; $i++) {
                    for ($j = $i + 1; $j < count($photos); $j++) {
                        $temp = $photos[$i];
                        if (strcmp($photos[$i]->title, $photos[$j]->title) > 0) {
                            $photos[$i] = $photos[$j];
                            $photos[$j] = $temp;
                        }
                    }
                }

                break;
            case 'title_desc' :
                for ($i = 0; $i < count($photos) - 1; $i++)
                    for ($j = $i + 1; $j < count($photos); $j++) {
                        $temp = $photos[$i];
                        if (strcmp($photos[$i]->title, $photos[$j]->title) < 0) {
                            $photos[$i] = $photos[$j];
                            $photos[$j] = $temp;
                        }
                    }
                break;
            case 'random':
                shuffle($photos);
                break;
            default:
                break;
        }
        return $photos;
    }
    public static function fetchHead($params) {
        $mainframe = JFactory::getApplication();
        $template = $mainframe->getTemplate();
        $templatePath = JPATH_BASE . '/templates/' . $template . '/html/mod_btimagegallery';
        $templateURI = JURI::root() . 'templates/' . $template . '/html/mod_btimagegallery';
        $moduleURI = JURI::root() . 'modules/mod_btimagegallery/tmpl/';
        
        $document = JFactory::getDocument();
        $header = $document->getHeadData();
        $loadJquery = $params->get('load_jquery', 1);
        $loadJcarousel = true;
        $loadLightbox = true;
        $loadHammer = true;
        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/jquery')) {
                $loadJquery = false;
            }
            if (substr_count($scriptName, 'jcarousel'))
                $loadJcarousel = false;
            if (substr_count($scriptName, 'fancybox'))
                $loadLightbox = false;
            if (substr_count($scriptName, 'fancybox'))
                $loadHammer = false;
        }

        //Add js
        if ($loadJquery) {
            $document->addScript($moduleURI .'/js/jquery.min.js');
        }
        if($loadHammer){
        	$document->addScript(JURI::root().'modules/mod_btimagegallery/assets/js/hammer.js');
        }
        
        if ($loadJcarousel)
            $document->addScript($moduleURI . '/js/jcarousel.js');
        if ($loadLightbox){
            $document->addScript($moduleURI . '/js/jquery.fancybox.js');
            $document->addScript($moduleURI . '/js/jquery.fancybox-buttons.js');           			
            $document->addScript($moduleURI . '/js/jquery.fancybox-thumbs.js');           			
		}        

        
        if (file_exists($templatePath . '/css/btimagegallery.css')) {
            $document->addStyleSheet($templateURI .'/css/btimagegallery.css');
        } else {
            $document->addStyleSheet($moduleURI . '/css/btimagegallery.css');
        }
		if (file_exists($templatePath . '/css/jquery.fancybox.css')) {
            $document->addStyleSheet($templateURI .'/css/jquery.fancybox.css');
            $document->addStyleSheet($templateURI .'/css/jquery.fancybox-buttons.css');
            $document->addStyleSheet($templateURI .'/css/jquery.fancybox-thumbs.css');
        } else {
            $document->addStyleSheet($moduleURI . '/css/jquery.fancybox.css');
            $document->addStyleSheet($moduleURI . '/css/jquery.fancybox-buttons.css');
            $document->addStyleSheet($moduleURI . '/css/jquery.fancybox-thumbs.css');
        }
        if (file_exists($templatePath . '/css/jcarousel.css')) {
            $document->addStyleSheet($templateURI .'/css/jcarousel.css');
        } else {
            $document->addStyleSheet($moduleURI . '/css/jcarousel.css');
        }
     	if (file_exists($templatePath . '/js/default.js')) {
            $document->addScript($templateURI .'/js/default.js');
        } else {
            $document->addScript($moduleURI . '/js/default.js');
        }
    }

}

?>