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
// No direct access
defined('_JEXEC') or die;
jimport('joomla.filesystem.folder');
jimport('joomla.filesystem.file');

class JFormFieldGallery extends JFormField {

    protected $type = 'gallery';
    public $_name = 'gallery';

    protected function getLabel() {
        return '';
    }

    protected function _build($moduleID, $name, $value) {
        /* @var JDocument $document */
        $document = JFactory::getDocument();
        $document->addStyleSheet(JURI::root() . "modules/mod_btimagegallery/assets/css/btimagegallery.css");

        if (version_compare(JVERSION, '1.6.0', 'ge')) {
            $document->addScript(JURI::root() . "modules/mod_btimagegallery/assets/js/btimagegallery.min.js");
            $document->addScript(JURI::root() . "modules/mod_btimagegallery/assets/js/btbase64.min.js");
			$document->addScriptDeclaration('jQuery(document).ready(function(){initGallery();})');
        } else {
            $document->addScript(JURI::root() . "modules/mod_btimagegallery/assets/js/btloader.min.js");
            // Hack, replace mootools by newer
            foreach ($document->_scripts as $key => $tmp) {
                if (preg_match('#media/system/js/mootools.js#is', $key)) {
                    unset($document->_scripts[$key]);
                }
            }
            $mootools = array(
                JURI::root() . "modules/mod_btimagegallery/assets/js/mootools-core.js" => 'text/javascript',
                JURI::root() . "modules/mod_btimagegallery/assets/js/mootools-more.js" => 'text/javascript'
            );
            $document->_scripts = $mootools + $document->_scripts;
            ?>
            <script>

                (function(){
                    var libs = [
                        '<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/js/mootools-core.js',
                        '<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/js/mootools-more.js',
                        '<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/js/btimagegallery.min.js',
                        '<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/js/btbase64.min.js',
                        '<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/squeezebox/squeezebox.min.js'
                    ];

                    BT.Loader.js(libs, function(){
                        initGallery();
                    });
                    BT.Loader.css('<?php echo JURI::root(); ?>modules/mod_btimagegallery/assets/squeezebox/assets/squeezebox.css');

                    window.addEvent('load', function() {
                        document.combobox = null;
                        var combobox = new JCombobox();
                        document.combobox = combobox;
                    });

                })();
            </script>
            <?php
        }


        $html = '
                <div id="btig-message" class="clearfix"></div>
                <ul id="btig-upload-list"></ul>
                <div id="btig-file-uploader">
                        <noscript>
                                <p>' . JText::_('MOD_BTIMAGEGALLERY_NOTICE_JAVASCRIPT') . '</p>
                        </noscript>
                </div>
                <input id="btig-gallery-hidden" type="hidden" name="' . $name . '" value="" />
                <ul id="btig-gallery-container" class="clearfix"></ul>
                ';
        ?>
        <script>
            function initGallery() {
                BTImageGallery = new BT.ImageGallery({
                    liveUrl: '<?php echo JURI::root(); ?>',
                    encodedItems: '<?php echo $value; ?>',
                    moduleID: '<?php echo $moduleID; ?>',
                    galleryContainer: 'btig-gallery-container',
                    dialogTemplate:
                        '<fieldset class="adminform">' +
                        '<ul class="adminformlist">' +
                        '<li>' +
                        '<label class="btig-title-lbl" class="hasTip" title="<?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_TITLE_DESC'); ?>" for="btig-title"><?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_TITLE_LABEL'); ?></label>' +
                        '<input class="btig-title" type="text" name="btig-title" size="70" />' +
                        '</li>' +
						'<li>' +
                        '<label class="btig-alt-lbl" class="hasTip" title="<?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_ALT_DESC'); ?>" for="btig-alt"><?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_ALT_LABEL'); ?></label>' +
                        '<input class="btig-alt" type="text" name="btig-alt" size="70" />' +
                        '</li>' +
						'<li>'+
							'<label class="btig-youid-lbl" class="hasTip"  for="btig-youid"><?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_ID_LABEL'); ?></label>'+								
							'<input class="btig-youid" type="text" name="btig-youid" size="40" title="<?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_YOUID_TITLE'); ?>" />' +
						'</li>'+
						'<li>'+
							'<label class="btig-autoplay-lbl" class="hasTip"  for="btig-autoplay"><?php echo JText::_('MOD_BTIMAGEGALLERY_FIELD_AUTOPLAY_LABEL'); ?></label>'+								
							'<select class="btig-autoplay" name="btig-autoplay" style="width:150px;">' +
								'<option value="-1" selected><?php echo JText::_('Global') ?></option>'+
								'<option value="0"><?php echo JText::_('JNO') ?></option>'+
								'<option value="1" ><?php echo JText::_('JYES') ?></option>'+
							'</select>'+
						'</li>'+
                        '</ul>' +
                        '</fieldset>' +
                        '<button class="btig-dialog-ok" style="margin-left: 10px;"><?php echo JText::_('MOD_BTIMAGEGALLERY_BTN_OK'); ?></button><button class="btig-dialog-cancel" style="margin-left: 10px;"><?php echo JText::_('MOD_BTIMAGEGALLERY_BTN_CANCEL'); ?></button>'
                });

                			
            };
        </script>
        <?php
        return $html;
    }

    protected function getInput() {
        JHtml::_('behavior.framework', true);
        JHtml::_('behavior.modal');

        $moduleID = $this->form->getValue('id');
        if ($moduleID == '')
            $moduleID = 0;
        $this->sync($moduleID);
        return $this->_build($moduleID, $this->name, $this->value);
    }

    private function sync($moduleID) {
        if (!JRequest::get('post')) {
            $items = json_decode(base64_decode($this->value));
            $itemNames = array();
            if ($items) {
                foreach ($items as $item) {
                    $itemNames[] = $item->file;
                }
            }
            $saveDir = JPATH_SITE . '/modules/mod_btimagegallery/images';

            //sync with older version
            if (JFolder::exists($saveDir . '/' . $moduleID)) {
                if ($items) {
                    foreach ($items as $olderFile) {
                        @JFile::move($saveDir . '/' . $moduleID . '/original/' . $olderFile->file, $saveDir . '/original/' . $olderFile->file);
                        @JFile::move($saveDir . '/' . $moduleID . '/manager/' . $olderFile->file, $saveDir . '/manager/' . $olderFile->file);
                        @JFile::move($saveDir . '/' . $moduleID . '/thumbnail/' . $olderFile->file, $saveDir . '/thumbnail/' . $olderFile->file);
                        @JFile::move($saveDir . '/' . $moduleID . '/crop/' . $olderFile->file, $saveDir . '/crop/' . $olderFile->file);
                    }
                }
                JFolder::delete($saveDir . '/' . $moduleID);
            } else {

                //move images after save
                if($items){
					foreach ($items as $key => $item) {
						if(isset($item->remote) && $item->remote){
							if(!JFile::exists($saveDir . '/manager/' . $item->file)){
								if(JFile::exists($saveDir . '/tmp/manager/' . $item->file)){
									JFile::move($saveDir . '/tmp/manager/' . $item->file, $saveDir . '/manager/' . $item->file);
									continue;
								}else{
									 unset($items[$key]);
								}
							}
							continue;
						}
					
						if (!JFile::exists($saveDir . '/original/' . $item->file)) {
							if (JFile::exists($saveDir . '/tmp/original/' . $item->file)) {
								JFile::move($saveDir . '/tmp/original/' . $item->file, $saveDir . '/original/' . $item->file);
								JFile::move($saveDir . '/tmp/manager/' . $item->file, $saveDir . '/manager/' . $item->file);
							}else{
								unset($items[$key]);
							}
						}
					}
					$this->value = base64_encode(json_encode(array_values($items)));
                }
                
                //delete images if not save
                $tmpOriginalFiles = JFolder::files($saveDir . '/tmp/original');
                if ($tmpOriginalFiles) {
                    $config = JFactory::getConfig();
                    $cacheTime = $config->get('cachetime') * 60;
                    foreach ($tmpOriginalFiles as $originalFile) {
                        $modifiedTime = filemtime($saveDir . '/tmp/original/' . $originalFile);
                        if (time() - $modifiedTime > $cacheTime && !in_array($originalFile, $itemNames)) {
                            @JFile::delete($saveDir . '/tmp/original/' . $originalFile);
                            @JFile::delete($saveDir . '/tmp/manager/' . $originalFile);
                        }
                    }
                }
            }
        }
    }

}
?>