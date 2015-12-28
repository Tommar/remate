<?php
/**
 * @package 	BT Quick Contact
 * @version		1.1
 * @created		Aug 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support     Forum - http://bowthemes.com/forum/
 * @copyright   Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// No direct access
defined('_JEXEC') or die;

class JFormFieldBtPreview extends JFormField {

    protected $type = 'btpreview';
    public $_name = 'btpreview';

    protected function getLabel() {
        return '';
    }

    protected function getInput() {
        /* @var JDocument $document */
        
        $html = '
                    <div class="btqc-head">'. JText::_('PREVIEW_YOUR_FORM') . '</div>
                
			<div id="btqc-message" class="clearfix"></div>
			<input id="btss-gallery-hidden" type="hidden" name="' . $this->name . '" value="" />
			<ul id="btqc-container" class="clearfix adminformlist"></ul>
			';
        ?>
        <script type="text/javascript">
            jQuery(document).ready(function(){
                
            });           
        </script>
        <?php
        return $html;
    }

}
?>