<?php
/**
 * @package 	bt_portfolio - BT Portfolio Component
 * @version		1.5.0
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
$document= JFactory::getDocument();
$title = $this->category->title? $this->category->title : $document->getTitle();
$column = $this->params->get('cat_column',3);
$itemWidth = round(100/$column,2);
?>
<div class="btp custom-btp-template">

	<!-- Show navigation categories -->
	<?php if($this->params->get('show_cat_navigation')){ ?>
	<div class="btp-categories">
		<?php foreach ($this->listCategories as $category) {
		?>
			<a <?php if ($category->id == JRequest::getInt("catid")) echo 'class="active"';	?>	href="<?php echo JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $category->id.':'.$category->alias) ?>">
				<span><?php echo $category->title ?></span>
			</a>
		<?php
		}
		?>
	</div>
	<?php } ?>
	
	<!-- Show title & description -->
	<?php if($this->params->get('show_titlecat',1)): ?>
	<h1 class="btp-title">
		<?php echo $title ?>
	</h1>
	<?php endif; ?>
	<?php if($this->params->get('show_descat')): ?>
	<div class="btp-catdesc">
		<?php echo $this->category->description; ?>
	</div>
	<?php endif; ?>
	
	<!-- Show list children categories -->
	<?php if($this->params->get('show_childcat')): ?>
		<div class="btp-grid-view">
		<?php 
		$i = 0;
		$total = count($this->gridCategories);
		foreach ($this->gridCategories as $category) {
		$i++;
		if(($i%$column)==1) echo '<div class="btp-grid-row">';
		$img_url = $category->main_image? JURI::base().$category->main_image: COM_BT_PORTFOLIO_THEME_URL . 'images/no-image.jpg';
		?>	
			<div style="width:<?php echo $itemWidth ?>%" class="btp-grid-item">
			<h3>
				<a href="<?php echo JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $category->id.':'.$category->alias) ?>">
					<?php echo $category->title ?>
				</a>
			</h3>
			<a class="img-link-cat" href="<?php echo JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $category->id.':'.$category->alias) ?>">
				<image alt="<?php echo htmlspecialchars($category->title) ?>" src="<?php echo $img_url?>" />
			</a>
			
			</div>
		<?php
		if(($i%$column)==0 || $i==$total) echo '</div>';
		}
		?>
		</div>
		<div class="clr"></div>
	<?php endif; ?>
	
	<!-- Show separation -->
	<?php if($this->params->get('show_childcat') && count($this->gridCategories) && $this->params->get('show_portcat') && count($this->items)): ?>
		<br />
		<h2 class="separate"><?php echo JText::_('COM_BT_PORTFOLIO_ITEMSINCATEGORIES') ?></h2>
	<?php endif; ?>
	
	<!-- Show list portfolios -->
	<?php if($this->params->get('show_portcat',1)): ?>
	<div class="btp-grid-view">
		<?php
		$i=0;
		$total = count($this->items);
		foreach ($this->items as $item) {
			$i++;
			if(($i%$column)==1) echo '<div class="btp-grid-row">';
			$img_url = Bt_portfolioHelper::getPathImage($item->id,'thumb',$item->image,$item->category_id);
			$img_zoom_url = Bt_portfolioHelper::getPathImage($item->id,'original',$item->image,$item->category_id);
			$link = JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&id=' . $item->id.':'.$item->alias.'&catid_rel=' . $item->category_id.':'.$item->category_alias);
		?>
		<div style="width:<?php echo $itemWidth ?>%" class="btp-grid-item">
				<h3 class="btp-item-title">
					<a href="<?php echo $link ?>"><?php echo $item->title; ?> </a>
				</h3>
				<div class="btp-item-image">
				<a class="img-link-custom-btp" href="<?php echo $link ?>"><img alt="<?php echo htmlspecialchars($item->title) ?>" src="<?php echo $img_url ?>"></a>
				 <div class="link-div">
						<?php if ($this->params->get('show_zoom_image',1)):	?>
							<a class="zoom-img-list-custom-btp lightbox" title="<?php echo $item->title ?>" rel="lightbox" href="<?php echo $img_zoom_url; ?>">Link to image</a>
                        <?php endif;  ?>
						<?php if ($this->params->get('show_url') && $item->url): ?>
							&nbsp;
							<a class="visit-site" target="_blank" href="<?php  echo $item->url; ?>"><?php  echo JText::_('COM_BT_PORTFOLIO_VISIT_SITE') ?></a>
						<?php endif;  ?>
                </div>
                </div>
		</div>
	
		<?php
		if(($i%$column)==0 || $i==$total) echo '</div>';
		}
		?>
		
		<!-- Show pagination -->
		<?php if ($this->pagination->get('pages.total') > 1) : ?>
			<div class="pagination">
				<!--  <p class="counter"><?php  echo $this->pagination->getPagesCounter(); ?></p> -->
				<?php echo $this->pagination->getPagesLinks(); ?>
			</div>
		<?php endif; ?>
		<div class="clr"></div>
	</div>
	<?php endif; ?>
</div>
