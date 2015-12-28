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

if (count($fields) == 0) {
    ?>
    <div  id="mod_btquickcontact_<?php echo $moduleID ?>" >
        <?php echo JText::_('Have no field to show'); ?>
    </div>
    <?php
} else {

    /*
     * Initial variable
     */

    $haveFileField = false; //check any field with file type exist or not
////xu ly page break và post
    $helper->doPost($module, $params, $fields);
    $step = 0;
    $pageBreak = 1; //count page
    $count = 0; // count element
    $forms = array();
    
    //xử lý pagebreak cuối cùng
    while(count($fields) > 0 && $fields[count($fields) -1]->type == 'pagebreak'){
        array_pop($fields);
    }
    for($i = 0; $i < count($fields); $i++) {
        if ($step != $pageBreak) {
            $step++;
            $forms['step_' . $step] = array();
        }
        $forms['step_' . $step][] = $fields[$i];
        if ($fields[$i]->type == 'pagebreak'){
            $pageBreak++;
        }
        
    }

//set style for module
    $width = $params->get('width') && $params->get('width') != 'auto' ? $params->get('width') . 'px' : 'auto';
    $height = $params->get('height') && $params->get('height') != 'auto' ? $params->get('height') . 'px' : 'auto';

    $style = 'width: ' . $width . '; height: ' . $height . ';';
    if ($params->get('form_type') == 'popup') {
        $style .= ' display: none;';
        if($params->get('show_feedback', 1)){
        ?>
        <div class="btqc-float-button">
            <a class="bt-quick-contact" href="#" rel="<?php echo $moduleID ?>"><?php echo JText::_('FEED_BACK') ?></a>
        </div>
        <?php
        }
    }
    ?>
    <div  id="mod_btquickcontact_<?php echo $moduleID ?>" 
          class="mod_btquickcontact <?php echo $moduleClassSuffix ? ' mod_btquickcontact_' . $moduleClassSuffix : '' ?> mod_btquickcontact_<?php echo $params->get('form_type')?>"
          style ="<?php echo $style ?>"
          >   

    <?php
    //if ($params->get('form_type') == 'popup') {
        ?>    
            <div class="btqc-title">
                <h3><?php echo $module->title ?></h3>
            </div>
        <?php
    //}


    /**
     * Create message container for each form
     */
    ?>
    <?php 
    if($params->get('progress_bar')){
    ?>
        <div class="btqc-progressbar-container">
            <div class="btqc-progressbar-wrapper"><div class="btqc-progressbar"></div></div>
        </div>
    <?php    
    }
    ?>    
        <ul class="btqc-message-loading" style="display: none"></ul>
        <ul class="btqc-message-container" style="display: none"></ul>
        <form name="frmBTQC_<?php echo $moduleID ?>" action="" method="post" enctype="multipart/form-data">
        <?php
        foreach ($forms as $key => $formFields) {
            $count++;
            ?>
                <div class="step">

                <?php
                /**
                 * Create fields for each form
                 */
                ?>
                    <?php
                    foreach ($formFields as $field) {
                        
                        ?>
                        <div class="btqc-field-container">
                        <?php
                        if ($field->type != 'separator' && $field->type != 'pagebreak') {
                            ?>
                                <!--<label for="btqc_f_<?php echo $field->alias ?>"><?php echo $field->title ?><?php echo $field->required ? '(*)' : '' ?></label>-->
                                <?php
                            }
                            //chia trường hợp cho từng kiểu field
                            switch ($field->type) {
                                case 'name':
                                    $user = JFactory::getUser();
                                    ?>
                                    <input 
                                        class="<?php echo ($field->required) ? 'required' : '' ?>" 
                                        type="text" name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" 
                                        id="btqc_f_<?php echo $field->alias ?>" 
                                        size="<?php echo $field->size ?>" 
                                        value="<?php echo $user ? $user->name : '' ?>"/>
                    <?php
                    break;
                case 'text':
                    ?>
                                    <input 
                                        type="text" 
                                        class="<?php echo ($field->required) ? 'required' : '' ?>" 
                                        name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" 
                                        id="btqc_f_<?php echo $field->alias ?>" 
                                        size="<?php echo $field->size ?>" 
                                        value="<?php echo $field->defaultValue ? $field->defaultValue : '' ?>"/>
                    <?php
                    break;
                case 'number':
                    ?>
                                    <input 
                                        type="text" 
                                        class="number <?php echo ($field->required) ? 'required' : '' ?>" 
                                        name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" 
                                        id="btqc_f_<?php echo $field->alias ?>" 
                                        size="<?php echo $field->size ?>" 
                                        value="<?php echo $field->defaultValue ? $field->defaultValue : '' ?>"
                                        />
                    <?php
                    break;
                case 'email':
                    ?>
                                    <input 
                                        type="text" 
                                        class="email <?php echo ($field->required) ? 'required' : '' ?>" 
                                        name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" 
                                        id="btqc_f_<?php echo $field->alias ?>" size="<?php echo $field->size ?>" 
                                        value="<?php echo $user ? $user->email : '' ?>"
                                        />
                    <?php
                    break;
                case 'richedit':
                    ?>
                                    <textarea class="<?php echo ($field->required) ? 'required' : '' ?>" name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" id="btqc_f_<?php echo $field->alias ?>" cols="<?php echo $field->cols ?>" rows="<?php echo $field->rows ?>"><?php echo $field->defaultValue ? $field->defaultValue : '' ?></textarea>
                    <?php
                    break;
                case 'dropdown':
                                    if(!$field->size || $field->size <= 0){
                                    ?>
                                    <div class="styled-select">
                                        <div class="style-selected-button">
                                    <?php 
                                    }
                                        ?>
                                    
                                            <select name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" id="btqc_f_<?php echo $field->alias ?>" size="<?php echo $field->size ?>">
                                    <?php
                                    if ($field->options) {
                                        foreach ($field->options as $option) {
                                            ?>
                                                <option value="<?php echo $option ?>" <?php if($field->defaultValue && in_array($option, explode('|', $field->defaultValue))) echo ' selected="selected"'?>><?php echo $option ?></option>    
                                                        <?php
                                                    }
                                                }
                                                ?>
                                            </select>
									<?php		
                                        if(!$field->size || $field->size <= 0){
                                    ?>
                                        </div>
                                    </div>
                                    <?php 
                                    }
                                    ?>
                                                <?php
                                                break;
                                            case 'checkbox':
                                            case 'radio':
                                                $html = '<div class="btqc-fc-wrapper">';
                                                
                                                if ($field->cols) {
                                                    $html.= '<table>'    ;
                                                    $html .= '<tr>';
                                                    for ($i = 0; $i < count($field->options); $i++) {
                                                        $classAndId = '';
                                                        if ($i == 0) {
                                                            $classAndId = ' id="btqc_f_' . $field->alias . '" ';
                                                            if ($field->required) {
                                                                $classAndId .= ' class="required" ';
                                                            }
                                                        }
                                                        $html .= '<td><input ' . $classAndId . 'type="' . $field->type . '" value="' . $field->options[$i] . '" name="btqc' . $module->id . '[btqc_f_' . $field->alias . '][]" ' . ($field->defaultValue && in_array($field->options[$i], explode('|',$field->defaultValue)) ? 'checked = "checked"' : '') . ' /></td><td>' . $field->options[$i] . '</td>';
                                                        if ($field->cols > 0) {
                                                            if (($i + 1) % $field->cols == 0 || $i + 1 == count($field->options)) {
                                                                $html .= '</tr>';
                                                                if ($i + 1 < count($field->options))
                                                                    $html .= '<tr>';
                                                            }
                                                        }
                                                    }
                                                    $html .= '</table></div><div style="clear: both;"></div>';
                                                }else {
                                                    for ($i = 0; $i < count($field->options); $i++) {
                                                        $classAndId = '';
                                                        if ($i == 0) {
                                                            $classAndId = ' id="btqc_f_' . $field->alias . '" ';
                                                            if ($field->required) {
                                                                $classAndId .= ' class="required" ';
                                                            }
                                                        }
                                                        $html .= '<input ' . $classAndId . 'type="' . $field->type . '" value="' . $field->options[$i] . '" name="btqc' . $module->id . '[btqc_f_' . $field->alias . '][]" ' . ($field->defaultValue && $field->options[$i] == $field->defaultValue ? 'checked = "checked"' : '') . ' /><span>' . $field->options[$i] . '</span>';
                                                    }
                                                    $html.= '</div>';
                                                }
                                                echo $html;
                                                ?>

                                    <?php
                                    break;
                                case 'date':
                                    JHTML::_('behavior.calendar');
                                    ?>
                                    <input 
                                        type="text" 
                                        class="date <?php echo ($field->required) ? 'required' : '' ?>" 
                                        name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" 
                                        id="btqc_f_<?php echo $field->alias ?>"
                                        />
                                    <img src="<?php echo JURI::root() . 'modules/mod_btquickcontact/tmpl/layouts/' . $layout ?>/images/calendar.png" alt="Calendar" class="btqc-calendar-img" id="btqc_f_<?php echo $field->alias ?>-img" />
                                    <script type="text/javascript">
                                        Calendar.setup({
                                            // Id of the input field
                                            inputField: 'btqc_f_<?php echo $field->alias ?>',
                                            // Format of the input field
                                            ifFormat: "%d-%m-%Y",
                                            // Trigger for the calendar (button ID)
                                            button: 'btqc_f_<?php echo $field->alias ?>-img',
                                            // Alignment (defaults to "Bl")
                                            align: 'Tr',
                                            singleClick: true,
                                            firstDay: 0
                                        });
                                    </script>
                    <?php
                    break;
                case 'file':
                    if (!$haveFileField) {
                        $haveFileField = BTQuickContactHelper::getFileStyleJS();
                    }
                    ?>
                                    <div class="btqc-input-file">
                                        <input 
                                            class="<?php echo ($field->required) ? 'required' : '' ?>" 
                                            size="25" type="file" 
                                            name="btqc<?php echo $module->id ?>[btqc_f_<?php echo $field->alias ?>]" id ="<?php echo $field->alias ?>"
                                            />

                                    </div>
                                    <div style="clear: both;"></div>
                    <?php
                    break;
                case 'separator':
                    ?>
                                    <div class="btqc-separator"><?php echo $field->title ?></div>
                                    <?php
                                    break;
                case 'pagebreak':
                                    ?>
                                    <label for="btqc_f_submit">&nbsp;</label>
                                    <?php if($count > 1 ){
                                    ?>
                                    <input class="button btqc_prev" type="button"  value="<?php echo JText::_('PREV_STEP') ?>"/>
                                    <?php    
                                    }?>
                                    <input class="button btqc_next" type="button"  value="<?php echo JText::_('NEXT_STEP') ?>"/>
                                    <?php
                                    break;
                                default: break;
                            }
                            ?>
                        </div>    
                            <?php
                        }
                        // nếu đã là step cuối cùng
                        if ($count >= count($forms)) {
                            //nếu có chọn send copy
                            if ($params->get('send_copy')) {
                                ?>
                            <div class="btqc-field-container ">
                                <label for="btqc_f_sendcopy"><?php echo JText::_('FIELD_SEND_COPY_LABEL') ?></label>
                                <input type="checkbox" name="btqc<?php echo $module->id ?>[btqc_f_sendcopy]" value="1"/>
                            </div>    
                <?php
            }
            //Check captcha
            if ($params->get('captcha') || ($params->get('captcha') === null && JFactory::getConfig ()->get ( 'captcha' ))) {
                ?>
                            <div class="btqc-field-container btqc-field-captcha">
                                <label for=""><?php echo JText::_('FIELD_CAPTCHA_LABEL') ?></label>

                            <?php
                            echo BTQuickContactHelper::createCaptcha($params, 'btqc_f_captcha', 'btqc_f_captcha', 'btqc-captcha');
                            ?>

                            </div>     
                                <?php
                            }
                            ?>

                        <div class="btqc-field-container">                            
                            <?php if(count($forms) > 1){?>
                            <input class="button btqc_prev" type="button"  value="<?php echo JText::_('PREV_STEP') ?>"/>
                            <?php }?>
                            <input class="btqc_submit button" type="submit" name="btqc<?php echo $module->id ?>[btqc_f_submit]"  value="<?php echo JText::_('SUBMIT') ?>"/>
							<div class="clr"></div>
                        </div>    
            <?php
        }
        ?>    	
                </div>
                    <?php
                }
                ?>    
        </form>
    </div>
    <script type="text/javascript">
        
        BTQC(document).ready(function(){
            var btqcObj = {validator: null, modal: null};
            //var validator = null;
            
            var moduleID ='#mod_btquickcontact_<?php echo $moduleID ?>';
            //style for input file
            if(BTQC(moduleID + ' form input[type=file]').length > 0)
                BTQC(moduleID + ' form input[type=file]').filestyle({width: 150, height: 25});
            //hide form exclude first form
            BTQC(moduleID + ' form .step').hide();
            BTQC(moduleID + ' form .step').eq(0).show();
            

            
            //add class validate
            BTQC.validator.addClassRules({
                email:{email: true},
                number: {digits: true}
            });
            //override message for jquery validator
            BTQC.extend(BTQC.validator.messages, {
                required: "<?php echo JText::_('ERROR_MESSAGE') ?>",
                email: "<?php echo JText::_('ERROR_MESSAGE') ?>",
                date: "<?php echo JText::_('ERROR_MESSAGE') ?>",
                number: "<?php echo JText::_('ERROR_MESSAGE') ?>",
                digits: "<?php echo JText::_('ERROR_MESSAGE') ?>",
                accept: "<?php echo JText::_('ERROR_MESSAGE') ?>"
            });
            
            <?php
            //init for progress bar
            if($params->get('progress_bar')){
            ?>
            BTQC(moduleID + ' .btqc-progressbar').width((100/BTQC(moduleID + ' .step').length) + '%');
            <?php
            
            }
            ?>
            
            <?php 
            //trick css of calendar for popup
            if($params->get('form_type') == 'popup'){
            ?>
            BTQC('.btqc-calendar-img').click(function(){
                BTQC('.calendar').css({position : 'fixed', zIndex: '250'});
            });
            //var modal = null;
            <?php
            if($params->get('html_element_id')){
            ?>
            BTQC('#<?php echo $params->get('html_element_id')?>').click(function(){
                btqcModal(moduleID, btqcObj);                
                return false;
            });                
            <?php        
            }
            ?>
            BTQC('a.bt-quick-contact').click(function(){
                var id = BTQC(this).attr('rel');
                btqcModal('#mod_btquickcontact_' + id, btqcObj);
                return false;
            });        
            <?php 
            } else{
            ?>
                
                //init validator
                btqcObj.validator = BTQC(moduleID + ' form').validate({
                    errorContainer: BTQC(moduleID + ' .btqc-message-container'),
                    errorLabelContainer: BTQC(moduleID + ' .btqc-message-container'),
                    wrapper: "li",
                    onfocusout: false,
                    onkeyup: false,
                    onclick: false,
                    invalidHandler: function(){
                        BTQC(moduleID + ' .btqc-message-container').html('');
                        
                    },
                    showErrors: function(errorMap, errorList) {
                        if(errorList.length)
                        {
                            BTQC(moduleID + ' .btqc-message-container').show();
                            BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').addClass(this.settings.errorClass).html(errorList[0]['message']));
                            for(var i = 0; i< errorList.length ; i++){
                                this.settings.highlight.call(this,errorList[i]['element'], this.settings.errorClass, this.settings.validClass);
                            }
                        }else{
                            BTQC(moduleID + ' .btqc-message-container').hide();
                            BTQC(moduleID + ' .btqc-message-container').html('');
                        }
                        var elements;
                        for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                            this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                        }
                        
                    },
                    highlight: function(element, errorClass, validClass) {
                        BTQC(element).addClass(errorClass).removeClass(validClass);
                        var label = BTQC(element.form).find("label[for=" + element.id + "]");
                        label.addClass(errorClass);
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        BTQC(element).removeClass(errorClass).addClass(validClass);
                        var label = BTQC(element.form).find("label[for=" + element.id + "]");
                        label.removeClass(errorClass);
                    }
                
                });
            <?php } ?>
                
            //validate form when btnNext click
            BTQC(moduleID + ' .btqc_next').click(function(){
                var currentStep = BTQC(this).parents('.step');
                
                if(btqcObj.validator.form()){
                    currentStep.hide();
                    currentStep.next().show();
                    
                    <?php if($params->get('form_type') == 'popup'){?>
                        //btqcObj.modal.close();
                        btqcModal(moduleID, btqcObj);
                
                    <?php }?>
                    <?php
                    //change progress bar
                    if($params->get('progress_bar')){
                    ?>
                                    
                    BTQC(moduleID + ' .btqc-progressbar').animate({width: (100 * (currentStep.index() + 2)/BTQC(moduleID + ' .step').length) + '%'}, 300);     
                    <?php

                    }
                    ?>       
                }
            });
            BTQC(moduleID + ' .btqc_prev').click(function(){
                BTQC(moduleID + ' .btqc-message-container').hide();
                BTQC(moduleID + ' .btqc-message-container').html('');
                var step = BTQC(this).parents('.step');
                step.hide();
                step.prev().show();
                <?php if($params->get('form_type') == 'popup'){?>
                btqcModal(moduleID, btqcObj);
                <?php }?>
                <?php
                //change progress bar
                if($params->get('progress_bar')){
                ?>
                BTQC(moduleID + ' .btqc-progressbar').animate({width: (100 * step.index()/BTQC(moduleID + ' .step').length) + '%'}, 300);     
                <?php

                }
                ?>     
            });
                //send ajax when submit form
                var process = false;
                BTQC(moduleID + ' form').submit(function(){
                    if(!process){
                        var self = this;
                        if(BTQC(this).valid()){
                            BTQC(this).ajaxSubmit({
                                dataType: 'json',
                                resetForm: false,
                                beforeSubmit: function(){
                                    process = true;
                                    BTQC(moduleID + ' .btqc-message-loading').show().html('').append(new BTQC('<li>').addClass('loading').html('<?php echo JText::_('SENDING_MAIL')?>'));
                                },
                                success: function(response, statusText, xhr, wrapper){
                                    BTQC(moduleID + ' .btqc-message-loading').html('').hide();
                                    BTQC(moduleID + ' .btqc-message-container').html('').show();
                                    if(response != null){
                                        var messages = BTQC.parseJSON(response.messages);
                                        if(response.success){
                                            BTQC(moduleID + ' .step').hide();
                                            BTQC(moduleID + ' .step').first().show();
                                            BTQC(self).clearForm();
                                            BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').addClass('success').html(messages[0]));
                                            if(response.redirectUrl){
                                                setTimeout('location.href=\"' + response.redirectUrl + '\"', response.timeOut);
                                            }
                                            <?php if ($params->get('form_type') == 'popup') {?>
                                            if(btqcObj.modal != null) setTimeout(function(){
                                                btqcObj.modal.close();
                                                if(typeof(Recaptcha) != 'undefined')
                                                    Recaptcha.reload();
                                                BTQC(moduleID + ' .btqc-message-container').html('');
                                            }, 1500);
                                            <?php }?>
                                        }else{  
                                            for(var i = 0; i < messages.length; i++){
                                                BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').html(messages[i]));
                                            }
                                            if(response.captchaError){
                                                if(typeof(Recaptcha) != 'undefined')
                                                    Recaptcha.reload();
                                            }
                                        }
                                    }else{
                                        BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').html('<?php echo JText::_('ERROR_AJAX') ?>'));
                                    }
                                    process = false;
                                },
                                error: function(){
                                    process = false;
                                    BTQC(moduleID + ' .btqc-message-container').html('');
                                    BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').html('<?php echo JText::_('ERROR_AJAX') ?>'));
                                }
                            });
                        }

                    }
                    return false;
                });
                       
            
        });
        function btqcModal(moduleID, btqcObj){
            if(btqcObj.modal != null) btqcObj.modal.close();
            btqcObj.modal = BTQC(moduleID).modal({
                    zIndex: 200,
                    overlayClose: true,
                    
                    persist: true,
                    onShow: function (dialog) {
                        dialog.container.width(dialog.container.find('.mod_btquickcontact').width());
                        dialog.container.css("height", "auto");
                        //init validator
                        btqcObj.validator = BTQC(moduleID + ' form').validate({
                            errorContainer: BTQC(moduleID + ' .btqc-message-container'),
                            errorLabelContainer: BTQC(moduleID + ' .btqc-message-container'),
                            wrapper: "li",
                            onfocusout: false,
                            onkeyup: false,
                            onclick: false,
                            showErrors: function(errorMap, errorList) {
                                if(errorList.length)
                                {
                                    BTQC(moduleID + ' .btqc-message-container').show();
                                    BTQC(moduleID + ' .btqc-message-container').append(new BTQC('<li>').addClass(this.settings.errorClass).html(errorList[0]['message']));
                                    for(var i = 0; i< errorList.length ; i++){
                                        this.settings.highlight.call(this,errorList[i]['element'], this.settings.errorClass, this.settings.validClass);
                                    }
                                }else{
                                    BTQC(moduleID + ' .btqc-message-container').hide();
                                    BTQC(moduleID + ' .btqc-message-container').html('');
                                }
                                var elements;
                                for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                                    this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                                }
                                
                            },
                            invalidHandler: function(){
                                BTQC(moduleID + ' .btqc-message-container').html('');

                            },
                            highlight: function(element, errorClass, validClass) {
                                BTQC(element).addClass(errorClass).removeClass(validClass);
                                var label = BTQC(element.form).find("label[for=" + element.id + "]");
                                label.addClass(errorClass);
                            },
                            unhighlight: function(element, errorClass, validClass) {
                                BTQC(element).removeClass(errorClass).addClass(validClass);
                                var label = BTQC(element.form).find("label[for=" + element.id + "]");
                                label.removeClass(errorClass);
                            }
                        });   
                    }
                });
        }
    </script>
    <?php
}?>