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
class BTPortfolioFilterHelper {
	public static function hasChildren($id) {

		$mainframe = JFactory::getApplication();		
		$id = (int) $id;
		$db = JFactory::getDBO();
		$query = "SELECT * FROM #__bt_portfolio_categories  WHERE parent_id={$id} AND published=1  ";	

		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if ($db->getErrorNum()) {
			$html .= $db->stderr();
			return false;
		}
		if (count($rows)) {
			return true;
		} else {
			return false;
		}
	}
	
	public static function input_text(&$params,$opensearch_title){	
		$html = '';
		$value= JRequest::getVar('searchword');
		$html .='<div class="filter-label">';
		$html .= '<input name="searchword"  class="inputbox" type="text" value="'. ($value ? $value : $opensearch_title).'"  onblur="if (this.value==\'\') this.value=\''.$opensearch_title.'\';" onfocus="if (this.value==\''.$opensearch_title.'\') this.value=\'\';" />';
		$html .= '</div>';
		return $html;
	}
	public static function categoryselect(&$params, $id = 0, $level = 0) {		
		$root_id = "";			
		$category = JRequest::getVar('category_select');								
		$id = (int) $id;		
		$db = JFactory::getDBO();
		
		if (($root_id != 0) && ($level == 0)) {		
			if(!is_array($root_id)) {
				$query = "SELECT * FROM #__bt_portfolio_categories WHERE parent_id={$root_id} AND published=1 AND trash=0 ";
			}
			else {
				$query = "SELECT * FROM #__bt_portfolio_categories WHERE (";
				
				foreach($root_id as $k => $root) {
					$query .= "parent_id={$root}";
					
					if($k+1 != count($root_id))
						$query .= " OR ";
				}
				
				$query .= ") AND published=1 ";
			}
		} else {
			$query = "SELECT * FROM #__bt_portfolio_categories WHERE parent_id={$id} AND published=1  ";
		}
		$query .= " ORDER BY ordering";

		$db->setQuery($query);
		$rows = $db->loadObjectList();
		if ($db->getErrorNum()) {
			echo $db->stderr();
			return false;
		}
		$html = '';
		if($level == 0) {		
		$html .= "<div  class=\"filter-label\">";
		$html .= "<label>".JText::_("FILTER_CATEGORY")."</label>";
		$html .="</div>";
		$html .= "<div class=\"filter-content\">";
		$html .= "<select  name=\"category_select\">";
		$html .= "<option value=\"\">".JText::_("FILTER_SELECT_OPTION")."</option>";
		
		}
		$indent = "";
		for ($i = 0; $i < $level; $i++) {
			$indent .= '&ndash; ';
		}
		
		foreach ($rows as $k => $row) {		
			if (($category == $row->id)) {
				$selected = ' selected';
			} else {
				$selected = '';
			}
			if (BTPortfolioFilterHelper::hasChildren($row->id)) {
				$html .= '<option value="'.$row->id.'"'.$selected.'>'.$indent.$row->title.'</option>';
				BTPortfolioFilterHelper::categoryselect($params, $row->id, $level + 1, $i);
			} else {
				$html .= '<option value="'.$row->id.'"'.$selected.'>'.$indent.$row->title.'</option>';
			}
		}
		if ($level == 0) {
			$html .= "
				</select>
				</div>
			";
		}
		return $html;
	}
	public static function extrafield_select(&$params,$extraid) {
		$db = JFactory::getDBO();			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE id IN ($extraid) AND published=1  ";
		$db->setQuery($query);
		$rows = $db->loadObjectList();
		$html = '';
		$selected= '';
		foreach ($rows as $k => $row) {
		if($row->type == "dropdown"){	
			$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($row->name)).'">';
			$html .= "<div class=\"filter-label\">";
			$html .= "<label>".$row->name."</label>";
			$html .="</div>";
			$html .= "<div class=\"filter-content\">";
			$html .= "<input type=\"hidden\" name=\"extraid[]\" value=\"$row->id\">";
			$html .= "<select  name=\"extraselect[]\">";
			$html .= "<option value=\"\">".JText::_("FILTER_SELECT_OPTION")."</option>";
			$extra_select = JRequest::getVar('extraselect', null);			
			$option =$row->default_value;
			$items = explode("\r\n", $option);
			foreach($items as $item){
				if(is_array($extra_select)==true) {	
					
					foreach($extra_select as $select) {
						
						if ($select == $item) {							
							$selected = ' selected';
							break;
						} else {
							$selected = '';
						}
					}
				}else {				
					if($extra_select == $item)
							$selected = 'selected';
				}
				if($item!=""){
				$html .= '<option value="'.$item.'"'.$selected.'>'.$item.'</option>';
				}
			}
			$html .= "
				</select>
				</div>
				</div>
			";
			}	
		}
		return $html;	
	}
	public static function extrafield_multiple(&$params,$extraid){
		$db = JFactory::getDBO();			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE id IN ($extraid) AND published=1  ";
		$db->setQuery($query);
		$rows = $db->loadObjectList();	
		$html = '';
		foreach ($rows as $k => $row) {	
			$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($row->name)).'">';
			$html .= "<div class=\"filter-label\">";
			$html .= "<label>".$row->name."</label>";
			$html .="</div>";
			$html .= "<div class=\"filter-content\">";
			$html .= "<input type=\"hidden\" name=\"extraarrayid[".$extraid."]\" value=\"$row->id\">";
			$html .= "<select  name=\"extraselect_array[".$extraid."][]\" multiple=\"multiple\">";
			$html .= "<option value=\"\">".JText::_("FILTER_SELECT_OPTION")."</option>";
			$extra_multiple =JRequest::getVar('extraselect_array', null);			
			$option =$row->default_value;
			$items = explode("\r\n", $option);
			foreach($items as $item){
				if(is_array($extra_multiple)==true) {					
					foreach($extra_multiple as $key=> $multi) {
					 if(is_array($multi)){
						foreach($multi as $itemvalue){
						if ($itemvalue == $item) {							
							$selected = ' selected';
							break;
						} else {
							$selected = '';
						}
						}
					}
					}
				}else {				
					if($extra_multiple == $item)
							$selected = 'selected';
				
				}				
				if($item!=""){
				$html .= '<option value="'.$item.'"'.$selected.'>'.$item.'</option>';
				}
			}
			$html .= "
				</select>
				</div>
				</div>
			";
		}
		return $html;		
	}
	public static function extrafield_radio(&$params,$extraid){
		$db = JFactory::getDBO();			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE id IN ($extraid) AND published=1  ";
		$db->setQuery($query);
		$rows = $db->loadObjectList();
		$html = '';
		foreach ($rows as $k => $row) {	
			$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($row->name)).'">';
			$html .= "<div  class=\"filter-label\">";
			$html .= "<input type=\"hidden\" name=\"extraid[]\" value=\"$row->id\">";
			$html .= "<label>".$row->name."</label>";
			$html .="</div>";
			$html .= "<div class=\"filter-content\">";	
			$option =$row->default_value;
			$items = explode("\r\n", $option);
			$items  =BTPortfolioFilterHelper::remove_array_empty_values($items);
			$extra_select = JRequest::getVar('extraselect', null);	
			foreach($items as $item){
			if(is_array($extra_select)==true) {	
					
					foreach($extra_select as $select) {
						
						if ($select == $item) {							
							$selected = ' checked="checked"';
							break;
						} else {
							$selected = '';
						}
					}
				}else {				
					if($extra_select == $item)
							$selected = 'checked="checked"';
				
				}
			$html .= '<input  name="extraselect[]" type="radio" value="'.$item.'"';
			$html .= ''.$selected.'';				
				$html .= ' /><label for="'.$item.'">'.$item.'</label><br />';
			}
			$html .= '</div>';
			$html .= '</div>';
		}
		return $html;
	}
	public static function extrafield_checkbox(&$params,$extraid){
		$db = JFactory::getDBO();			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE id IN ($extraid) AND published=1  ";
		$db->setQuery($query);
		$rows = $db->loadObjectList();	
		$html = '';
		foreach ($rows as $k => $row) {	
			$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($row->name)).'">';
			$html .= "<div  class=\"filter-label\">";
			$html .= "<input type=\"hidden\" name=\"extraarrayid[".$extraid."]\" value=\"$row->id\">";
			$html .= "<label>".$row->name."</label>";
			$html .= "</div>";
			$html .= "<div class=\"filter-content\">";	
			$searchchk = JRequest::getVar('extraselect_array', null);
			$search = array();
			(is_array($searchchk) == false) ?
				$search[] = $searchchk :
				$search = $searchchk ;
			
			$option =$row->default_value;
			$items = explode("\r\n", $option);
			$items  =BTPortfolioFilterHelper::remove_array_empty_values($items);			
			foreach($items as $item){
			$html .= '<input  name="extraselect_array['.$extraid.'][]" type="checkbox" value="'.$item.'"';
				foreach ($search as $arraysearch) {
						if(is_array($arraysearch)){
							foreach($arraysearch as $itemvalue){
								if ($itemvalue == $item) $html .= 'checked="checked"';
							}
						}
					}
				$html .= ' /><label for="'.$item.'">'.$item.'</label><br />';
			}
			$html .="</div>";
			$html .="</div>";
		}
		return $html;
	}
	public static function extrafield_price(&$params,$extravalue,$extratid){	
	
		$db = JFactory::getDBO();		
		$array = array();		
		$arraynumber = explode(",", $extravalue);
		$arraynumber  =BTPortfolioFilterHelper::remove_array_empty_values($arraynumber);
		$arrayunit = array();
			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE  type=\"measurement\" AND id=$extratid AND published=1  ";
			$db->setQuery($query);
			$rows = $db->loadObjectList();		
			foreach ($rows as $value){
				$array[] =$value->default_value;
			}
		
		foreach ($array as $value){
			$number= @unserialize($value);				
			$arrayunit[]= $number[1];			
			
		}	
		$selected = '';
		$html = '';
		sort($arraynumber);
		$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($rows[0]->name)).'">';
		$html .= '<div class="ex-min">';
		$html .= "<div class=\"filter-label\">";
		$html .= "<input type=\"hidden\" name=\"expriceID[]\" value=\"$extratid\">";
			$html .= "<label>".sprintf(JText::_('MEASUREMENT_MIN'),$rows[0]->name)."</label>";
		$html .= "</div>";		
		$extra_select = JRequest::getVar('extra_min', null);	
		$html .= "<div class=\"filter-content\">";	
		$html .= "<select name=\"extra_min[]\">";		
		for ($i= 0;$i< count($arraynumber);$i++){			
			if (($extra_select)){
					foreach ($extra_select as $key => $item){					
						if($item == $arraynumber[$i]){
							$selected = ' selected';	
							break;							
						}
						else{
							$selected ='';
						}
					}
				} else {				
				$minvalue =$arraynumber[0];			
					if($minvalue >$arraynumber[$i]){
						$minvalue= $arraynumber[$i];
						$selected = ' selected';
					}
					else{
					$selected='';
					}
				}			
			
			
		$html .= '<option value="'.($arraynumber[$i]).'"'.$selected.'>'.$arrayunit[0].' '.number_format($arraynumber[$i], 0, '.', ',').'</option>';
		}
		$html .= "</select>";
		$html .= '</div>';
		$html .= '</div>';
		//Max select
		$sl ="";
		$extra_max = JRequest::getVar('extra_max', null);	
		$html .= '<div class="ex-max">';
		$html .= "<div  class=\"filter-label\">";
			$html .= "<label>".sprintf(JText::_('MEASUREMENT_MAX'),$rows[0]->name)."</label>";
		$html .="</div>";
		$html .= "<div class=\"filter-content\">";
		$html .= "<select  name=\"extra_max[]\">";					
		for ($i= 0; $i< count($arraynumber);$i++){
			if(!isset($extra_max)){
				$maxvalue = $arraynumber[0];
				if($maxvalue <$arraynumber[$i]){
					$maxvalue =$arraynumber[$i];
						$sl = 'selected';
						$html .= '<option value="'.($arraynumber[$i]).'"'.$sl.'>'.$arrayunit[0].' '.number_format($arraynumber[$i], 0, '.', ',').'</option>';
				}
			}else{
			foreach ($extra_max as $key => $item){
				if (($item == $arraynumber[$i])) {
						$sl = ' selected';
						break;						
					} else {					
						$sl = '';
						
					}
						
				}
			$html .= '<option value="'.($arraynumber[$i]).'"'.$sl.'>'.$arrayunit[0].' '.number_format($arraynumber[$i], 0, '.', ',').'</option>';
			}
		}
		$html .= "</select>";		
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
		return $html;
	}
	public static function extrafield_textrange(&$params,$extraid){	
		$db = JFactory::getDBO();		
		$db = JFactory::getDBO();			
		$query = "SELECT * FROM #__bt_portfolio_extrafields  WHERE id IN ($extraid) AND published=1  ";
		$db->setQuery($query);
		$row = $db->loadObject();		
		
		$array = array();
		$html = '';				
		$selected = '';	
		$html .= '<div class="ex-'.preg_replace("/[^a-zA-Z0-9]/", "", strtolower($row->name)).'">';	
		$html .= "<div  class=\"filter-label\">";
			$html .= "<label>".sprintf(JText::_('MEASUREMENT_FROM'),$row->name)."</label>";
		$html .="</div>";			
		$extra_from = JRequest::getVar('extra_from', null);			
		$html .='<input type="hidden" name="exTextID[]" value="'.$extraid.'"/><input name="extra_from['.$extraid.']" value="'.($extra_from?$extra_from[$extraid]:'').'" />';					
		$extra_to = JRequest::getVar('extra_to', null);	
		$html .= "<div  class=\"filter-label\">";
			$html .= "<label>".sprintf(JText::_('MEASUREMENT_TO'),$row->name)."</label>";
		$html .="</div>";					
		$html .='<input name="extra_to['.$extraid.']" value="'.($extra_to?$extra_to[$extraid]:'').'" />';	
		$html .="</div>";		
		return $html;
	}
	public static function remove_array_empty_values($array)
	{
			$new_array = array();			 
			$null_exceptions = array();			 
			foreach ($array as $key => $value)
			{
				$value = trim($value);		
			 
				if(!in_array($value, $null_exceptions) && $value != "")
				{
				$new_array[] = $value;
				}
			}
			return $new_array;
	}
}


?>
