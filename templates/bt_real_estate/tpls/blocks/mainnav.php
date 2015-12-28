<?php
/**
 * @package   T3 Blank
 * @copyright Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license   GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
?>

<!-- MAIN NAVIGATION -->
<nav id="t3-mainnav" class="wrap t3-mainnav navbar-collapse-fixed-top">
  <div class="container navbar">
    <div class="navbar-inner">
    
      <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">        
      </button>

  	  <div class="nav-collapse collapse<?php echo $this->getParam('navigation_collapse_showsub', 1) ? ' always-show' : '' ?>">
      <?php if ($this->getParam('navigation_type') == 'megamenu') : ?>
        <?php $this->megamenu($this->getParam('mm_type', 'mainmenu')) ?>
      <?php else : ?>
        <jdoc:include type="modules" name="<?php $this->_p('mainnav') ?>" style="raw" />
      <?php endif ?>
  		</div>
    </div>
  </div>
</nav>
<!-- //MAIN NAVIGATION -->

<?php if ($this->countModules('top-content') || $this->countModules('top-content1')) : ?>	
		<?php 
		$app = JFactory::getApplication();
		$menu = $app->getMenu();
		$lang = JFactory::getLanguage();
		if($menu->getActive() == $menu->getDefault($lang->getTag())): ?>
		<div class="top-content">
			<div class="container">
				<jdoc:include type="modules" name="<?php $this->_p('top-content') ?>" style="T3Xhtml" />
			</div>
		</div>
		<?php else: ?>
		<div class="top-content1">
			<jdoc:include type="modules" name="<?php $this->_p('top-content1') ?>" style="T3Xhtml" />
		</div>
		<?php endif; ?>	
<?php endif ?>
<?php if ($this->countModules('mid-content')) : ?>
	<div class="mid-content">
		<div class="container">
			<jdoc:include type="modules" name="<?php $this->_p('mid-content') ?>" style="T3Xhtml" />
		</div>
	</div>
<?php endif ?>