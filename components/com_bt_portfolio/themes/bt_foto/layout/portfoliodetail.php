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
JHtml::_('behavior.formvalidation');
$document= JFactory::getDocument();
$title = $this->category->title? $this->category->title : $document->getTitle();
?>
<div class="btp">
	<div class="btp-detail">
		<div class="btp-detail-header">
		<span class="btp-direction">
			<a class="preview" href="<?php echo JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&task=portfolio.preview&id='.$this->item->id.':'.$this->item->alias.'&catid_rel='.$this->category->id.':'.$this->category->alias)?>"><span><?php echo JText::_('COM_BT_PORTFOLIO_PREVIEW') ?></span></a>
			<a class="next" href="<?php echo JRoute::_('index.php?option=com_bt_portfolio&view=portfolio&task=portfolio.next&id='.$this->item->id.':'.$this->item->alias.'&catid_rel='.$this->category->id.':'.$this->category->alias)?>"><span><?php echo JText::_('COM_BT_PORTFOLIO_NEXT') ?></span></a>
		</span>
		<!-- Title -->
		<h1 class="btp-cat-title">
			<span>
				<?php echo $this->item->title;?>
			</span>
		</h1>
		</div>

		<!-- Slide show -->
		<?php if(count($this->images )){ ?>
        <div class="btp-slideshow">
			<div class="box_skitter box_skitter_large">
				<ul>
					<?php foreach ($this->images as $image) :
						$src_image_large = Bt_portfolioHelper::getPathImage($image->item_id,'large',$image->filename,$this->category->id);
						$src_image_original = Bt_portfolioHelper::getPathImage($image->item_id,'original',$image->filename,$this->category->id);
						$src_image_thumb = Bt_portfolioHelper::getPathImage($image->item_id,'ssthumb',$image->filename,$this->category->id);
					?>
					<li><img class="block" 	src="<?php echo $src_image_large; ?>" rel="<?php echo $src_image_thumb;?>" alt="<?php echo htmlspecialchars($image->title) ?>" />
                        <div class="label_text">
                        	<?php if ($this->params->get('show_zoom_image',1)):	?>
								<a class="btp-zoom-image lightbox" title="<?php echo JText::_('COM_BT_PORTFOLIO_ZOOM_IN'); ?>" href="<?php echo $src_image_original ; ?>"><?php echo JText::_('COM_BT_PORTFOLIO_ZOOM_IN'); ?></a>
	                        <?php endif; ?>
                        	 <?php if ($this->params->get('show_url') && $this->item->url):	?>
				                <a target="_blank" title="<?php echo JText::_('COM_BT_PORTFOLIO_VISIT_SITE'); ?>" class="visit-site" href="<?php  echo $this->item->url; ?>">
				                	<?php echo JText::_('COM_BT_PORTFOLIO_VISIT_SITE'); ?>
				                </a>
					        <?php endif; ?>
						</div>
					</li>
					<?php endforeach; ?>
				</ul>
		   </div>
		</div>
		<?php }?>

		<!-- vote && review -->
		<?php
		if ($this->params->get('allow_voting')): ?>
		<div class="vote-review">
			<div class="btp-detail-voting">
				<span style="float: left; margin-right: 10px;"><?php echo JText::_('COM_BT_PORTFOLIO_VOTE_IT') ?>
				</span>
				<?php echo Bt_portfolioHelper::getRatingPanel($this->item->id, $this->item->vote_sum, $this->item->vote_count);
				?>
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
			<div class="btp-detail-extrafields">
				<div class="btp-detail-extrafields-inner">
				<div class="btp-detail-extrafields-left">
				<?php foreach ($this->item->extra_fields as $field){

					if(count($field) ==0) continue;	?>
					<?php if(trim($field->name) == 'Summary'): ?>
					</div>
					<div class="btp-detail-extrafields-right">
					<?php endif; ?>
					<div class="extrafield-row <?php echo preg_replace("/[^a-zA-Z0-9]/", "", strtolower($field->name)) ?>" >
					<span class="extrafield-title"><?php echo $field->name; ?>:</span>
					<span class="extrafield-value"><?php echo $field->default_value; ?></span>
					</div>


				<?php } ?>
				</div>
				<div class="clear"></div>
				</div>
			</div>

			<div class="btp-detail-desc-full">
				<div>
				<?php echo $this->item->full_description; ?>
				</div>
			</div>

			<div class="clr"></div>
		</div>
		<div class="btp-direction">			
			<a class="back" href="<?php echo JRoute::_("index.php?option=com_bt_portfolio&view=portfolios&catid=" . $this->category->id.':'.$this->category->alias) ?>"><?php  echo JText::_('COM_BT_PORTFOLIO_BACK'); ?></a>
		</div>
		<div class="clr"></div>
		<!-- Comments -->
		<?php
		if ($this->params->get('allow_comment')) {
		?>
		<div class="btp-comment">
		<a name="reviews"></a>
		<?php
			// Disqus comment
			if ($this->params->get('comment_system') == 'disqus'){
				echo Bt_portfolioHelper::getDisqusComment($this->params->get('disqus_shortname'));
			}
			else
			//Facebook comment
			if ($this->params->get('comment_system') == 'facebook') {
				echo Bt_portfolioHelper::getFacebookComment($this->params->get('facebook_app_id'),$this->params->get('number_comments', 5),$this->params->get('commmentbox_width', 600));
			}
			else
			// JCOMMENT
			if ($this->params->get('comment_system') == 'jcomments')
			{
				if (Bt_portfolioHelper::checkComponent('com_jcomments')) {
					include_once(JPATH_BASE . DS . 'components' . DS . 'com_jcomments' . DS . 'jcomments.php');
					echo JComments::showComments($this->item->id, 'bt_portfolio', $this->item->title);
				}
				else {
					echo "jComments is not installed";
				}
			}
			else{

			// Default comment feature
			$i= 0;
			$total = count($this->comment['data']);
			if ($total){
			?>
			<div class="btp-comments">
			<div class="btp-comments-inner">
			<div class="btp-comment-head">
				<span><?php echo $this->item->review_count.' '; ?><?php echo $this->item->review_count > 1 ? JText::_('COM_BT_PORTFOLIO_REVIEWS') : JText::_('COM_BT_PORTFOLIO_REVIEW') ?></span>
			</div>

			<!-- Comment lits -->
			<div id="btp-comment-list">
            <?php foreach ($this->comment['data'] as $item){
            	$i++;
             ?>
				<div class="btp-comment-item">
					<div class="<?php if($i==0) echo 'comment-first'; else if ($i == $total) echo  'comment-last';?> <?php echo $item->admin? 'comment-admin':''; ?>">
						<div class="btp-comment-item-head">
							<?php if($item->image){?>
								<div class="comment-avatar">
									<a href="<?php echo $item->link;?>"><img src="<?php echo $item->image;?>" /></a>
								</div>
							<?php }?>
	                        <div class="in-content-comment">
	                        	<div class="comment-info">
									<span class="comment-created">
										<?php echo JText::sprintf('COM_BT_PORTFOLIO_CREATED_ON', JHtml::_('date', $item->created, JText::_('F d, Y')), JHTML::_('date',$item->created, JText::_('g:i a'))); ?>
									</span>
	                        		<span class="comment-author"><?php echo $item->name; ?></span>
								</div>
								<?php if ($this->params->get('show_title')) { ?>
								<div class="comment-title"> <?php  echo $item->title ?> </div>
								<?php } ?>
			                     <div class="btp-comment-item-content">
									<?php echo htmlspecialchars($item->content) ?>
								</div>
							</div>
						</div>
					</div>
                </div>
				<div class="clr"></div>
				<?php } ?>

				<?php if ($this->comment['nav']->get('pages.total') > 1) : ?>
				<div class="pagination">
					<!-- <p class="counter">
						<?php echo $this->comment['nav']->getPagesCounter(); ?>
						</p>
					-->
					<?php echo $this->comment['nav']->getPagesLinks(); ?>
				</div>
				<?php endif; ?>
			</div>
			</div>
			</div>
			<?php }?>

		<!-- Comment form -->
		<div class="btp-comment-fom">
			<?php if ($this->params->get('allow_guest_comment') || $this->user->id) { ?>
        	<h3 class="review-form-title"><span><?php echo JText::_('COM_BT_PORTFOLIO_WRITE_A_REVIEW'); ?></span></h3>
			<form id="btp-form-comment"
				action="<?php echo JRoute::_('index.php?option=com_bt_portfolio&task=comment.comment'); ?>" method="post" class="form-validate">

				<?php foreach ($this->comment['form']->getFieldsets() as $fieldset) : ?>
					<?php foreach ($this->comment['form']->getFieldset($fieldset->name) as $name => $field) : ?>
					<div class="table_body <?php echo 'field_'.$name;?>">
						<?php if($name !='jform_content') :?>

						<div class="item-input">
						<?php else: ?>
						<div class="item-full">
						<?php endif; ?>
							<?php echo $field->input; ?>
						</div>
						<?php if($name !='jform_content') :?>
						<div class="item-label">
							<?php echo $field->label; ?>
						</div>
						<?php endif; ?>
						<!--<div class="clr"></div>-->
					</div>
					<?php endforeach; ?>
				<?php endforeach; ?>
					<div class="btp-submit-comment">
						<input type="hidden" name="item_id"
							value="<?php echo $this->item->id ?>">
						<input type="hidden" name="return" value="<?php echo base64_encode($this->uri->toString(array('path', 'query', 'fragment'))) ?>">
						<button type="submit" class="validate">
							<span><?php echo JText::_('COM_BT_PORTFOLIO_SEND_REVIEW'); ?></span>
						</button>
						<?php echo JHtml::_('form.token'); ?>
					</div>
			</form>
			<?php }
					else {
			?>
			<div class="login-first">
				<a href="<?php echo JRoute::_('index.php?option=com_users&view=login&return='.base64_encode($this->uri->toString(array('path', 'query', 'fragment')))); ?>"><?php echo JText::_('COM_BT_PORTFOLIO_LOGIN_FIRST'); ?></a>
			</div>
			<?php }?>
		</div>
		<?php } ?>
		</div>
		<?php }	?>
	</div>
</div>