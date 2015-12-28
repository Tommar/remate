<?php

/**
 * @package 	formfields
 * @version	1.1
 * @created	Aug 2011
 * @author	BowThemes
 * @email	support@bowthems.com
 * @website	http://bowthemes.com
 * @support     Forum - http://bowthemes.com/forum/
 * @copyright   Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license     http://bowthemes.com/terms-and-conditions.html
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

class JFormFieldAlbum extends JFormField {

    protected $type = 'album';

    public function getInput() {
       
        // Initialize JavaScript field attributes.
        $class = $this->element['class'] ? (string) $this->element['class'] : '';
        $attr = '';
        $attr .= $this->element['onchange'] ? ' onchange="' . (string) $this->element['onchange'] . '"' : '';
        $attr .= ' class="inputbox ' . $class . '"';
		$options = array();
		if($this->value){
			$options[] = JHtml::_('select.option', $this->value,'');
		}
        return JHTML::_('select.genericlist', $options, $this->name, trim($attr), 'value', 'text', $this->value, $this->id);   
    }
}

?>
