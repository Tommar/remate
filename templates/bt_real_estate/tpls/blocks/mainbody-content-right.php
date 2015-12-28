<?php
/**
 * @package   T3 Blank
 * @copyright Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license   GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Mainbody 3 columns, content in left, mast-col on top of 2 sidebars: content - sidebar1 - sidebar2
 */
defined('_JEXEC') or die;
$document= JFactory::getDocument();
$app = JFactory::getApplication();
$menu = $app->getMenu();
$lang = JFactory::getLanguage();
$option = JRequest::getVar('option');
$view	= JRequest::getVar('view');
?>

<?php

  // Layout configuration
  $layout_config = json_decode ('{  
    "two_sidebars": {
      "default" : [ "span9"         , "span3"             , "span6"               , "span3"           ],
      "wide"    : [],
      "xtablet" : [ "span12"         , "span4"             , "span8"               , "span12 module33"           ],
      "tablet"  : [ "span12"        , "span4"  , "span8"               , "span12 module33 spanfirst"           ]
    },
    "one_sidebar_1": {
      "default" : [ "span12"         , "span3"             , "span9"             ],
      "wide"    : [],
      "xtablet" : [ "span8"         , "span4"             , "span4"             ],
      "tablet"  : [ "span12"        , "span12 module33"  , "span12"            ]
    },
	"one_sidebar_2": {
      "default" : [ "span9"         , "span9"             , "span3"             ],
      "wide"    : [],
      "xtablet" : [ "span8"         , "span8"             , "span4"             ],
      "tablet"  : [ "span8"        , "span12"  , "span4"            ]
    },
    "no_sidebar": {
      "default" : [ "span12" ]
    }
  }');

  // positions configuration
  $mastcol  = 'mast-col';
  $sidebar1 = 'sidebar-1';
  $sidebar2 = 'sidebar-2';

  // Detect layout
  //if ($this->countModules($mastcol) or $this->countModules("$sidebar1 and $sidebar2")) {
	if($view == 'portfolios'){
		$layout = "no_sidebar";
	}else{
	  if ($this->countModules("$sidebar1 and $sidebar2")) {
		$layout = "two_sidebars";	
	  } elseif ($this->countModules("$sidebar1")) {
		$layout = "one_sidebar_1";
	  } elseif ($this->countModules("$sidebar2")) {
		$layout = "one_sidebar_2";
	  } else {
		$layout = "no_sidebar";
	  }
	}
	
	$layout = $layout_config->$layout;

  $col = 0;
?>

<section id="t3-mainbody" class="container t3-mainbody">
  <div class="row">       
    
    <?php // if ($this->countModules("$sidebar1 or $sidebar2 or $mastcol")) : ?>
    <div class="t3-sidebar <?php echo $this->getClass($layout, $col) ?>" <?php echo $this->getData ($layout, $col++) ?>>
      <?php if ($this->countModules($mastcol)) : ?>
      <!-- MASSCOL 1 -->
      <div class="t3-mastcol t3-mastcol-1<?php $this->_c($mastcol)?>">
        <jdoc:include type="modules" name="<?php $this->_p($mastcol) ?>" style="T3Xhtml" />		
		<div class="icon-t3-mastcol"></div>
      </div>
      <!-- //MASSCOL 1 -->
      <?php endif ?>

      <?php if ($this->countModules("$sidebar1 or $sidebar2") && $view != 'portfolios') : ?>	  
      <div class="row">
	  <?php endif; ?>
		<?php if ($this->countModules($sidebar1) && $view != 'portfolios') : ?>
        <!-- SIDEBAR 1 -->
        <div class="t3-sidebar t3-sidebar-1 <?php echo $this->getClass($layout, $col) ?><?php $this->_c($sidebar1)?>" <?php echo $this->getData ($layout, $col++) ?>>
          <jdoc:include type="modules" name="<?php $this->_p($sidebar1) ?>" style="T3Xhtml" />
        </div>
        <!-- //SIDEBAR 1 -->
		<?php endif ?>
		<!-- MAIN CONTENT -->		
		
		<div id="t3-content" class="t3-content <?php echo $this->getClass($layout, $col) ?>" <?php echo $this->getData ($layout, $col++) ?>>
		
		<!-- title page -->
		<?php 
		
		
		
		if ($menu->getActive() == $menu->getDefault($lang->getTag()) || ($option == 'com_bt_portfolio' && $view == 'portfolio')) { ?>
		<?php 
		}else{ ?>
				<div class='page-heading'>
					<div class="heading-title">
						<div class="title_page">
							<?php 
								$menuItem =	$menu->getActive();
								if($menuItem){
									echo $menuItem->title;
								}else
									echo $document->getTitle();
							?>
						</div>
					</div>
				</div>
		<?php } ?>
		<!-- end title page -->
		<jdoc:include type="message" />
		
		<?php if ($this->countModules('content-mass-top')) : ?>		
		  <div class="content-mass-top">
			<jdoc:include type="modules" name="content-mass-top" style="T3Xhtml" />		
		  </div>
		<?php endif ?>
		
		<jdoc:include type="component" />
		</div>
	
		<!-- //MAIN CONTENT -->               		     
      </div>
      <?php// endif ?>
	<?php if ($this->countModules("$sidebar1 or $sidebar2") && $view != 'portfolios') : ?>  
    </div>
    <?php endif ?>
	
	<?php if ($this->countModules($sidebar2) && $view !='portfolios') : ?>
        <!-- SIDEBAR 2 -->
        <div class="t3-sidebar t3-sidebar-2 <?php echo $this->getClass($layout, $col) ?><?php $this->_c($sidebar2)?>" <?php echo $this->getData ($layout, $col++) ?>>
          <jdoc:include type="modules" name="<?php $this->_p($sidebar2) ?>" style="T3Xhtml" />
        </div>
        <!-- //SIDEBAR 2 -->
        <?php endif ?>
	
  </div>
</section> 