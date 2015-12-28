<?php
/**
 * @package 	mod_btportfolio_filter
 * @version		1.1
 * @created		Apr 2013

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
require_once 'helpers/helper.php';
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
$descr = $params->get('descr','');
if($descr){
	$descr = JHtml::_('content.prepare', $descr);
}
$showsearchbox=$params->get('showsearchbox',1);
$keysearch=$params->get('keysearch','Search...');
$buttontext =$params->get('buttontext','Search');
$showcategory=$params->get('showcategory',1);
$extrafield=$params->get('extrafield','');
$method=$params->get('method','AND');
$Itemid=$params->get('itemid');
require JModuleHelper::getLayoutPath('mod_btportfolio_filter', 'default');

?>