<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_content
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');
JHtml::_('bootstrap.tooltip');
JHtml::_('behavior.framework');

// Create a shortcut for params.
$params  = & $this->item->params;
$images  = json_decode($this->item->images);
$info    = $params->get('info_block_position', 2);
$aInfo1 = ($params->get('show_publish_date') || $params->get('show_category') || $params->get('show_parent_category') || $params->get('show_author'));
$aInfo2 = ($params->get('show_create_date') || $params->get('show_modify_date') || $params->get('show_hits'));
$topInfo = ($aInfo1 && $info != 1) || ($aInfo2 && $info == 0);
$botInfo = ($aInfo1 && $info == 1) || ($aInfo2 && $info != 0);
$icons = $params->get('access-edit') || $params->get('show_print_icon') || $params->get('show_email_icon');

// update catslug if not exists - compatible with 2.5
if (empty ($this->item->catslug)) {
  $this->item->catslug = $this->item->category_alias ? ($this->item->catid.':'.$this->item->category_alias) : $this->item->catid;
}
?>

<?php if ($this->item->state == 0 || strtotime($this->item->publish_up) > strtotime(JFactory::getDate())
|| ((strtotime($this->item->publish_down) < strtotime(JFactory::getDate())) && $this->item->publish_down != '0000-00-00 00:00:00' )) : ?>
<div class="system-unpublished">
<?php endif; ?>

	<!-- Article -->
	<article>
  
    <?php if ($params->get('show_title')) : ?>
			<?php echo JLayoutHelper::render('joomla.content.item_title', array('item' => $this->item, 'params' => $params, 'title-tag'=>'h2')); ?>
    <?php endif; ?>

    <!-- Aside -->
    <?php if ($topInfo || $icons) : ?>
    <aside class="itembasicinfo article-aside clearfix">
      <?php if ($topInfo): ?>
      <?php // echo JLayoutHelper::render('joomla.content.info_block.block', array('item' => $this->item, 'params' => $params, 'position' => 'above')); ?>
		<?php if ($params->get('show_author') && !empty($this->item->author )) : ?>
			<span class="createdby">
				<?php $author =  $this->item->author; ?>
				<?php $author = ($this->item->created_by_alias ? $this->item->created_by_alias : $author);?>
				<?php if (!empty($this->item->contactid ) &&  $params->get('link_author') == true):?>
				<?php 	echo JText::sprintf('COM_CONTENT_WRITTEN_BY_BT' ,
					 '<span>'.JHtml::_('link', JRoute::_('index.php?option=com_contact&view=contact&id='.$this->item->contactid), $author).'</span>'); ?>
				<?php else :?>
				<?php echo JText::sprintf('COM_CONTENT_WRITTEN_BY_BT', '<a>'.$author.'</a>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>		
		
		
			<?php if ($params->get('show_category')) : ?>
			<span class="category-name">
				<?php $title = $this->escape($this->item->category_title);
						$url = '<a href="' . JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->catid)) . '">' . $title . '</a>'; ?>
				<?php if ($params->get('link_category')) : ?>
				<?php echo JText::sprintf('COM_CONTENT_CATEGORY_BT', '<span>'.$url.'</span>'); ?>
				<?php else : ?>
				<?php echo JText::sprintf('COM_CONTENT_CATEGORY_BT', '<span>'.$title.'</span>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>			


			<?php if ($params->get('show_publish_date')) : ?>
			<span class="published">
			 <?php echo JText::sprintf('COM_CONTENT_PUBLISHED_DATE_ON_BT', '<strong>'.JHtml::_('date', $this->item->publish_up, JText::_('DATE_FORMAT_BT')).'</strong>'); ?> 
			</span>
			<?php endif; ?>	


			<?php if ($params->get('show_hits')) : ?>
				<span class="hits"><?php echo JText::sprintf('COM_CONTENT_ARTICLE_HITS', '<strong>'.$this->item->hits.'</strong>'); ?> </span>
			<?php endif; ?>
			
			<?php if ($params->get('show_create_date')) : ?>
			<span class="create"> 
				<?php echo JText::sprintf('COM_CONTENT_CREATED_DATE_ON', '<span>'.JHtml::_('date', $this->item->created, JText::_('DATE_FORMAT_BT')).'</span>'); ?> 
			</span>
			<?php endif; ?>

			<?php if ($params->get('show_parent_category') && $this->item->parent_id != 1) : ?>
			<span class="parent-category-name">
				<?php $title = $this->escape($this->item->parent_title);
					$url = '<a href="' . JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->parent_id)) . '">' . $title . '</a>'; ?>
				<?php if ($params->get('link_parent_category')) : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', '<span>'.$url.'</span>'); ?>
				<?php else : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', '<span>'.$title.'</span>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>

			<?php if ($params->get('show_modify_date')) : ?>
			<span class="modified"><?php echo JText::sprintf('COM_CONTENT_LAST_UPDATED', '<span>'.JHtml::_('date', $this->item->modified, JText::_('DATE_FORMAT_LC3')).'</span>'); ?> </span>
			<?php endif; ?>
		
	  <?php endif; ?>
      
      <?php if ($icons): ?>
      <?php echo JLayoutHelper::render('joomla.content.icons', array('item' => $this->item, 'params' => $params)); ?>
      <?php endif; ?>
    </aside>  
    <?php endif; ?>
    <!-- //Aside -->

		<section class="article-intro clearfix" itemprop="articleBody">
			<?php if (!$params->get('show_intro')) : ?>
				<?php echo $this->item->event->afterDisplayTitle; ?>
			<?php endif; ?>

			<?php echo $this->item->event->beforeDisplayContent; ?>

			<?php echo JLayoutHelper::render('joomla.content.intro_image', $this->item); ?>

			<?php echo $this->item->introtext; ?>
			<?php if ($params->get('show_readmore') && $this->item->readmore) :
			if ($params->get('access-view')) :
				$link = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid));
			else :
				$menu      = JFactory::getApplication()->getMenu();
				$active    = $menu->getActive();
				$itemId    = $active->id;
				$link1     = JRoute::_('index.php?option=com_users&view=login&Itemid=' . $itemId);
				$returnURL = JRoute::_(ContentHelperRoute::getArticleRoute($this->item->slug, $this->item->catid));
				$link      = new JURI($link1);
				$link->setVar('return', base64_encode($returnURL));
			endif;
			?>
			<div class="readmore">
				<a class="btn_bt" href="<?php echo $link; ?>">
					<span>
					<?php if (!$params->get('access-view')) :
						echo JText::_('COM_CONTENT_REGISTER_TO_READ_MORE');
					elseif ($readmore = $this->item->alternative_readmore) :
						echo $readmore;
						if ($params->get('show_readmore_title', 0) != 0) :
							echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
						endif;
					elseif ($params->get('show_readmore_title', 0) == 0) :
						echo JText::sprintf('COM_CONTENT_READ_MORE_TITLE');
					else :
						echo JText::_('COM_CONTENT_READ_MORE');
						echo JHtml::_('string.truncate', ($this->item->title), $params->get('readmore_limit'));
					endif; ?>
					</span>
				</a>
			</div>
		<?php endif; ?>
		</section>

    <!-- footer -->
    <?php if ($botInfo) : ?>
    <footer class="article-footer clearfix">
      <?php //echo JLayoutHelper::render('joomla.content.info_block.block', array('item' => $this->item, 'params' => $params, 'position' => 'below')); ?>
		<?php if ($params->get('show_author') && !empty($this->item->author )) : ?>
			<span class="createdby">
				<?php $author =  $this->item->author; ?>
				<?php $author = ($this->item->created_by_alias ? $this->item->created_by_alias : $author);?>
				<?php if (!empty($this->item->contactid ) &&  $params->get('link_author') == true):?>
				<?php 	echo JText::sprintf('COM_CONTENT_WRITTEN_BY_BT' ,
					 '<span>'.JHtml::_('link', JRoute::_('index.php?option=com_contact&view=contact&id='.$this->item->contactid), $author).'</span>'); ?>
				<?php else :?>
				<?php echo JText::sprintf('COM_CONTENT_WRITTEN_BY_BT', '<a>'.$author.'</a>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>		
		
			<?php if ($params->get('show_category')) : ?>
			<span class="category-name">
				<?php $title = $this->escape($this->item->category_title);
						$url = '<a href="' . JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->catid)) . '">' . $title . '</a>'; ?>
				<?php if ($params->get('link_category')) : ?>
				<?php echo JText::sprintf('COM_CONTENT_CATEGORY_BT', '<span>'.$url.'</span>'); ?>
				<?php else : ?>
				<?php echo JText::sprintf('COM_CONTENT_CATEGORY_BT', '<span>'.$title.'</span>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>			


			<?php if ($params->get('show_publish_date')) : ?>
			<span class="published">
			 <?php echo JText::sprintf('COM_CONTENT_PUBLISHED_DATE_ON_BT', '<strong>'.JHtml::_('date', $this->item->publish_up, JText::_('DATE_FORMAT_BT')).'</strong>'); ?> 
			</span>
			<?php endif; ?>	


			<?php if ($params->get('show_hits')) : ?>
				<span class="hits"><?php echo JText::sprintf('COM_CONTENT_ARTICLE_HITS', '<strong>'.$this->item->hits.'</strong>'); ?> </span>
			<?php endif; ?>
			
			<?php if ($params->get('show_create_date')) : ?>
			<span class="create"> 
				<?php echo JText::sprintf('COM_CONTENT_CREATED_DATE_ON', '<span>'.JHtml::_('date', $this->item->created, JText::_('DATE_FORMAT_BT')).'</span>'); ?> 
			</span>
			<?php endif; ?>

			<?php if ($params->get('show_parent_category') && $this->item->parent_id != 1) : ?>
			<span class="parent-category-name">
				<?php $title = $this->escape($this->item->parent_title);
					$url = '<a href="' . JRoute::_(ContentHelperRoute::getCategoryRoute($this->item->parent_id)) . '">' . $title . '</a>'; ?>
				<?php if ($params->get('link_parent_category')) : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', '<span>'.$url.'</span>'); ?>
				<?php else : ?>
				<?php echo JText::sprintf('COM_CONTENT_PARENT', '<span>'.$title.'</span>'); ?>
				<?php endif; ?>
			</span>
			<?php endif; ?>

			<?php if ($params->get('show_modify_date')) : ?>
			<span class="modified"><?php echo JText::sprintf('COM_CONTENT_LAST_UPDATED', '<span>'.JHtml::_('date', $this->item->modified, JText::_('DATE_FORMAT_LC3')).'</span>'); ?> </span>
			<?php endif; ?>
	</footer>
    <?php endif; ?>
    <!-- //footer -->
	</article>
	<!-- //Article -->

<?php if ($this->item->state == 0 || strtotime($this->item->publish_up) > strtotime(JFactory::getDate())
|| ((strtotime($this->item->publish_down) < strtotime(JFactory::getDate())) && $this->item->publish_down != '0000-00-00 00:00:00' )) : ?>
</div>
<?php endif; ?>

<?php echo $this->item->event->afterDisplayContent; ?> 
