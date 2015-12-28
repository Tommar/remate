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
defined('_JEXEC') or die('Restricted access');
class JFormFieldBtLayout extends JFormField {
    protected $type = 'btlayout';

    public function getInput() {

        $document = JFactory::getDocument();        
        $options = array(
            (object) array('value' => 'default', 'text' => 'Default'),
        );
        // Prepare HTML code
        // Add a grouped list
        $html = JHtml::_(
                        'select.genericlist', $options, $this->name, '', 'value', 'text', $this->value, $this->id
        );
        return $html;
    }

}

?>