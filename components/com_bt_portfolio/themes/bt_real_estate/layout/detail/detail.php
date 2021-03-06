<?php
/**
 * @package 	bt_portfolio - BT Portfolio Component
 * @version		1.2.6
 * @created		Feb 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */
// no direct access
defined('_JEXEC') or die;
JHtml::_('behavior.keepalive');
JHtml::_('behavior.tooltip');
JHTML::_('behavior.modal');
JHtml::_('behavior.formvalidation');
$document= JFactory::getDocument();
$title = $this->category->title? $this->category->title : $document->getTitle();
$catid_rel = JRequest::getInt('catid_rel');

if($this->params->get('largeimgprocess',-1)==-1){
			$width='100%';
			$height =$this->params->get('crop_height','400').'px';
		}
		else{
		$width =$this->params->get('crop_width','600');
		$width_wrap = ($width + 10).'px';
		$height =$this->params->get('crop_height','400').'px';
		}
?>
<div class='page-heading'>
	<div class="heading-title">
		<div class="title_page btp-detail-title">
			<?php echo $this->item->title;?>
			<span class="btp-direction">
				<a class="preview" href="<?php echo JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&task=portfolio.preview&id='.$this->item->id.':'.$this->item->alias.'&catid_rel='.$this->category->id.':'.$this->category->alias)?>"><span><?php //echo JText::_('COM_BT_PORTFOLIO_PREVIEW') ?></span></a>
				<a class="next" href="<?php echo JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&task=portfolio.next&id='.$this->item->id.':'.$this->item->alias.'&catid_rel='.$this->category->id.':'.$this->category->alias)?>"><span><?php //echo JText::_('COM_BT_PORTFOLIO_NEXT') ?></span></a>
			</span>
			<div class="clr"></div>
		</div>
	</div>
</div>
<div class="btp">
	<div class="btp-detail">

		<!-- Title -->
		<!--<h1 class="btp-cat-title">
			<?php echo $title ?>
			
		</h1>-->

		<!-- Slide show -->
		<?php if(count($this->images )){ ?>
        <div class="btp-slideshow" style="width: <?php echo $width_wrap; ?>">
		<?php 
		switch($this->params->get('enable-slideshow','skiterslide')){
		case'skiterslide':
			echo $this->loadTemplate('slideshow_skitter');
			break;
		case'mediaslide':
			echo $this->loadTemplate('slideshow_media');
			break;
		default:
			echo $this->loadTemplate('slideshow_none');
			break;
		
		}
		
		?>
		</div>
		<?php }?>
		
		<div class="btp-detail-extrafields">
			<?php foreach ($this->item->extra_fields as $field){			
				
				if(count($field) ==0) continue;	?>
				<div class="extrafield-row <?php echo preg_replace("/[^a-zA-Z0-9]/", "", strtolower($field->name)) ?>" >
				<div class="extrafield-row-inner">
				<?php if(strtolower($field->name) != 'price'): ?>
				<span class="extrafield-title"><?php echo $field->name; ?>:</span>
				<?php endif; ?>
				<?php
				switch($field->type){
					case'link':							
						if($field->value[0]){
							$itrolink =$field->value[0];						
						}else{
							$itrolink =$field->value[1];
						}
						?>
							<span class="extrafield-value"><a href="<?php echo $field->value[1]; ?>"target="<?php echo $field->value[2]; ?>"><?php echo $itrolink; ?></a></span>
						<?php
						break;
					case'image':
						?><span class="extrafield-value"><img src="<?php echo JURI::root().$field->value ?>"></span><?php
						break;
					case'measurement':							
						?><span class="extrafield-value"><?php echo $field->value.' '.$field->default_value[1]; ?></span><?php 
						break;
					case'dropdown':
						?><span class="extrafield-value"><?php echo $field->value[0]; ?></span><?php 
						break;
					default:
						?><span class="extrafield-value"><?php echo $field->value; ?></span><?php 
						break;
				}					
				?>
				</div>
				</div>
			<?php } ?>
		</div>
		<div class="clr"></div>

		

		<!-- vote && review -->
		<?php
		if ($this->params->get('allow_voting')): ?>
		<div class="vote-review">
			<div class="btp-detail-voting">
				<span style="float: left; margin-right: 10px;"><?php echo JText::_('COM_BT_PORTFOLIO_VOTE_IT') ?>
				</span>
				<?php echo Bt_portfolioHelper::getRatingPanel($this->item->id, $this->item->vote_sum, $this->item->vote_count);
				?>
				<div class="clr"></div>
			</div>
		</div>
		<div class="clr"></div>
		<?php endif; ?>
		<!-- social share -->
		<div class="social_share">
			<?php
			if ($this->params->get('show_social_share')) {
				Bt_portfolioHelper::getSocialShare($this->params->get('social_share_buttons'));
			}
			?>
			<?php
			if ($this->params->get('show_print')) {
				echo Bt_portfolioHelper::getPrintButton(1,$this->item->id);
			}
			?>
        </div>
        <div class="clr"></div>

		<!-- Description  -->
		<div class="btp-detail-desc">
			<div class="btp-detail-desc-full">
				<div>
				<?php echo $this->item->full_description; ?>
				</div>
			</div>
			
		</div>
		<div class="clr"></div>
		<?php
		if ($this->params->get('show_url') && $this->item->url) {
		?>
		<div class="btp-detail-link">
			<p class="readmore">
				<a class="visit-site" target="_blank" href="<?php  echo $this->item->url; ?>"><?php  echo JText::_('COM_BT_PORTFOLIO_VISIT_SITE'); ?></a>
			</p>
		</div>
		<?php
		}
		?>
		<div class="clr"></div>
		<div class="btp-direction">			
			<a class="back" href="<?php echo JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $this->category->id.':'.$this->category->alias) ?>"><?php  echo JText::_('COM_BT_PORTFOLIO_BACK'); ?></a>
		</div>
		<div class="clr"></div>
		<!-- Comments -->
		<?php
		if ($this->params->get('allow_comment')) {
		echo $this->loadTemplate('comment_form');
		
		}	?>
	</div>
</div>
