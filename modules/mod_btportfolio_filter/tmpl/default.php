<?php
/**
 * @package 	mod_btportfolio_filter
 * @version		1.0
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
 
?>

<div class="bt-portfoliofilter<?php echo $moduleclass_sfx ;?>">
<form action="<?php echo JRoute::_('index.php?option=com_bt_portfolio&view=portfolios'.($Itemid?'&Itemid='.$Itemid:'')); ?>" name="BTFilter" method="get">
	<input type="hidden" name="task" value="filter" />	
	<input type="hidden" name="option" value="com_bt_portfolio" />	
	<input type="hidden" name="view" value="portfolios" />	
<?php
	if($showsearchbox ==1){
		echo '<div class="filter-keyword">'.BTPortfolioFilterHelper::input_text($params,$keysearch).'</div>';
	}	
	if($showcategory ==1){
		echo '<div class="filter-category">'.BTPortfolioFilterHelper::categoryselect($params, 0, 0).'</div>';
	}
	if($extrafield){
		echo '<div class="filter-extrafields">';
		foreach ($extrafield as $id=> $extraoption):		
		
		if(isset($extraoption->checked)){			
			switch($extraoption->type){
				case'dropdown':
					echo BTPortfolioFilterHelper::extrafield_select($params,$id);					
					break;
				case'multiple':
					echo BTPortfolioFilterHelper::extrafield_multiple($params,$id);		
					break;
				case'radio':
					echo BTPortfolioFilterHelper::extrafield_radio($params,$id);		
					break;
				case'checkbox':
					echo BTPortfolioFilterHelper::extrafield_checkbox($params,$id);		
					break;
				case 'select':					
					echo BTPortfolioFilterHelper::extrafield_price($params,$extraoption->value,$id);		
					break;
				case'texrange':				
					echo BTPortfolioFilterHelper::extrafield_textrange($params,$id);		
					break;
			}
		}
		endforeach;	
		echo '</div>';
	}	 
	?>
	<div class="filter-description">
		<?php
		echo $descr;
		?>
	</div>
	
	<div class="filter-button">
		<input type="hidden" name="method" value="<?php echo $method ?>"/>
		<input type="submit" value="<?php echo $buttontext; ?>" class="button" <?php echo $showsearchbox? 'onclick="if(BTFilter.searchword.value==\''.$keysearch.'\'){ BTFilter.searchword.focus();return false;}"':'' ?> />
	</div>
</form>
</div>