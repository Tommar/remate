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

defined('_JEXEC') or die;
require_once 'helpers/helper.php';
//inital params
$moduleID = $module->id;
$layout = $params->get('layout', 'default');
$moduleClassSuffix = $params->get('module_class_suffix');
$fields = json_decode(base64_decode($params->get('fields')));

$helper = new BTQuickContactHelper();
BTQuickContactHelper::fetchHead($params);
require JModuleHelper::getLayoutPath('mod_btquickcontact','/layouts/'.$layout.'/'.$layout);

?>