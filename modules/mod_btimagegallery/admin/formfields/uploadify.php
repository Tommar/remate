<?php

/**
 * @package 	formfields
 * @version		1.5
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
jimport('joomla.form.formfield');

class JFormFieldUploadify extends JFormField {

    protected $type = 'uploadify';

    protected function getInput() {
        $moduleID = intval($this->form->getValue('id'));
        $moduleURL = JURI::root() . 'modules/mod_btimagegallery';
        $document = JFactory::getDocument();
        $header = $document->getHeadData();
        $checkJqueryLoaded = false;
        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/jquery')) {
                $checkJqueryLoaded = true;
            }
        }
        //Add js
        if (!$checkJqueryLoaded)
            $document->addScript($moduleURL . '/admin/js/jquery.min.js');
        $document->addScript($moduleURL . '/admin/js/swfobject.js');
        $document->addScript($moduleURL . '/admin/js/uploadify.v2.1.4.min.js');
        //Add css
        $document->addStyleSheet($moduleURL . '/admin/css/uploadify.css');
        $session = JFactory::getSession();
		$class = $this->element['class'] ? (string) $this->element['class'] : '';
        $html =
        '<script type="text/javascript">
            jQuery(document).ready(function() {
                jQuery("#uploadify-file").uploadify({
                    "uploader"  : "'. $moduleURL .'/admin/images/uploadify.swf",
                    "script"    : "'. JURI::base(). 'index.php",
                    "scriptData" : {"action": "uploadify", "option":"'.JRequest::getVar('option').'", "view":"module","layout":"edit", "id": ' . $moduleID.', "'.$session->getName().'":"'.$session->getId().'", "'. JSession::getFormToken(). '":1},
                    "cancelImg" : "'.$moduleURL .'/admin/images/cancel.png",
                    "buttonImg" : "'.$moduleURL .'/admin/images/browser.png",
                    "fileExt"     : "*.jpg;*.jpeg;*.gif;*.png",
                    "fileDesc"    : "Image Files",
                    "width"     : 110,
                    "height"    : 35,
                    "auto"      : true,
                    "multi"     : true,
                    "method"    : "GET",
                    "onComplete": function(event, ID, fileObj, response, data){
                        var data = jQuery.parseJSON(response);
                        if(data == null){
                            BTImageGallery.showMessage("btig-message", "<b>Loading Failed</b> - Have errors");
                            BTImageGallery.removeLog();
                        }else{
                            var file = data.files;
                            if (!data.success) {
                                BTImageGallery.showMessage("btig-message", "<span style=\"color: red;\"> " + data.message +"</span>");
                            }
                            else {
                                var item = {
                                    file: file.filename,
                                    title: file.title
                                };
                                BTImageGallery.add(item, true);
                                BTImageGallery.showMessage("btig-message", "Loading <b>" + file.filename + "</b><span style=\"color: green;\"> Completed</span>");
                            }
                            BTImageGallery.removeLog();
                        }
                    }
                });
                jQuery("#uploadify-upload").click(function(){
                    jQuery("#uploadify-file").uploadifyUpload();
                    return false;
                });
            });
        </script>
        <input class="bt-ig-ac '.$class.'" id="uploadify-file" type="file" name="uploadify-file" />';
        return $html;
    }

}
?>
