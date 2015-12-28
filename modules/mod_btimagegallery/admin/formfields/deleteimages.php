<?php
/**
 * @package 	formfields
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
jimport('joomla.form.formfield');
class JFormFieldDeleteImages extends JFormField{
    protected $type = 'deleteimages';
    protected function  getInput() {
        $html  = '<button id="btnDeleteAll">'.JText::_("MOD_BTIMAGEGALLERY_BUTTON_DELETEALL").'</button>';
        return $html;
    }

}