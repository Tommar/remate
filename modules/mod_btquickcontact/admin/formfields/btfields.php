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
// No direct access
defined('_JEXEC') or die;

class JFormFieldBtFields extends JFormField {

    protected $type = 'btfields';
    public $_name = 'btfields';

    protected function getLabel() {
        return null;
    }

    protected function getInput() {
        JHTML::_('behavior.framework',true);
        $checkJqueryLoaded = false;
        $document = &JFactory::getDocument();
        $header = $document->getHeadData();
        foreach ($header['scripts'] as $scriptName => $scriptData) {
            if (substr_count($scriptName, '/jquery')) {
                $checkJqueryLoaded = true;
            }
        }

        //Add js
        if (!$checkJqueryLoaded)
            $document->addScript(JURI::root() . 'modules/mod_btquickcontact/assets/js/jquery.min.js');
		if(!version_compare(JVERSION, '3.0', 'ge')){		
			$document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/chosen.jquery.min.js');
			 $document->addStyleSheet(JURI::root() . 'modules/mod_btquickcontact/admin/css/chosen.css');
		}
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/bt.js');
        
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/btquickcontact.js');
        $document->addScript(JURI::root() . 'modules/mod_btquickcontact/admin/js/btbase64.min.js');
        //Add css         
        $document->addStyleSheet(JURI::root() . "modules/mod_btquickcontact/admin/css/btquickcontact.css");
        $document->addStyleSheet(JURI::root() . "modules/mod_btquickcontact/admin/css/bt.css");
		
        //trick to create li tags 
        if(version_compare(JVERSION, '3.0', 'ge')){
            $html =
                '       <ul id="btqc-warning"></ul>'
                . '</div></div>'
                . '<div class="control-group">'
                . '<div class="controls btqc-buttons isJ30">'    
                . '     <button id="btnAddField" class="btn btn-success">' . JText::_('BUTTON_ADD_FIELD') . '</button>'
                . '     <button id="btnCreateField" class="btn btn-success">' . JText::_('BUTTON_CREATE_FIELD') .'</button>'
                . '     <button id="btnUpdateField" class="btn btn-success">' . JText::_('BUTTON_UPDATE_FIELD') .'</button>'
                . '     <button id="btnCancel" class="btn btn-danger">' . JText::_('BUTTON_CANCEL') .'</button>'
                . '     <button id="btnRemoveAll" class="btn btn-danger">' . JText::_('BUTTON_REMOVE_ALL') . '</button>'
                . '</div></div>'
                . '<div class="control-group">'
                . '<div class= "btqc-messages" id="btqc-messages" class="clearfix"></div>'
                . $this->getAddFieldForm()
                . '<div class="btqc-head isJ30">' . JText::_('PREVIEW_YOUR_FORM') . '</div>
                  <input id="btqc-hidden" type="hidden" name="' . $this->name . '" value="" />
                  <ul id="btqc-container" class="clearfix adminformlist isJ30"></ul>'
                .'<div>';
        }else{
            $html =
                '       <ul id="btqc-warning"></ul>'
                . '</li>'
                . '<li class="btqc-buttons isJ25">'
                . '     <label>&nbsp;</label>'
                . '     <button id="btnAddField" class="btn">' . JText::_('BUTTON_ADD_FIELD') . '</button>'
                . '     <button id="btnCreateField" class="btn">' . JText::_('BUTTON_CREATE_FIELD') .'</button>'
                . '     <button id="btnUpdateField" class="btn">' . JText::_('BUTTON_UPDATE_FIELD') .'</button>'
                . '     <button id="btnCancel" class="btn">' . JText::_('BUTTON_CANCEL') .'</button>'    
                . '     <button id="btnRemoveAll" class="btn">' . JText::_('BUTTON_REMOVE_ALL') . '</button>'
                . '</li>'
                . '<li>'
                . '<div class= "btqc-messages" id="btqc-messages" class="clearfix"></div>'
                . $this->getAddFieldForm()
                . '<div class="btqc-head isJ25">' . JText::_('PREVIEW_YOUR_FORM') . '</div>
                  <input id="btqc-hidden" type="hidden" name="' . $this->name . '" value="" />
                  <ul id="btqc-container" class="clearfix adminformlist isJ25"></ul>';
        }


        $moduleID = $this->form->getValue('id');
        if ($moduleID == '')
            $moduleID = 0;

        //prepair fields when module is initial and when value is empty
        if (!$this->value || empty($this->value)) {
            
            $this->value = array();
            //field name
            $name = array(
                'type' => 'name',
                'title' => 'Name',
                'alias' => 'name',
                'defaultValue' => '',
                'required' => true,
                'size' => 30
            );
            $this->value[] = $name;
            //field mobile
            $mobile = array(
                'type' => 'number',
                'title' => 'Mobile',
                'alias' => 'mobile',
                'defaultValue' => '',
                'required' => false,
                'size' => 12
            );
            $this->value[] = $mobile;
            //field mobile
            $email = array(
                'type' => 'email',
                'title' => 'Email',
                'alias' => 'email',
                'defaultValue' => '',
                'required' => true,
                'size' => 40
            );
            $this->value[] = $email;
            $message = array(
                'type' => 'richedit',
                'title' => 'Message',
                'alias' => 'message',
                'defaultValue' => '',
                'required' => true,
                'cols' => 35,
                'rows' => 10
            );
            $this->value[] = $message;

            $this->value = base64_encode((json_encode($this->value)));
        }
        ?>
        <script type="text/javascript">
            var jQ = jQuery.noConflict();
            jQ(document).ready(function(){
                //init
                jQ('#btqc-warning').parent().hide(); //hide warning first   
                //init form preview
                var preview = new BT.PreviewForm({
                    liveURL : '<?php echo JURI::root() . 'modules/mod_btquickcontact' ?>',
                    warningText: {
                        fieldTitleRequired: '<?php echo JText::_('FIELD_TITLE_REQUIRED') ?>',
                        fieldAliasRequired: '<?php echo JText::_('FIELD_ALIAS_REQUIRED') ?>',
                        fieldAliasExisted: '<?php echo JText::_('FIELD_ALIAS_EXISTED') ?>',
                        addFieldSuccess: '<?php echo JText::_('ADD_FIELD_SUCCESS') ?>',
                        updateFieldSuccess: '<?php echo JText::_('UPDATE_FIELD_SUCCESS') ?>',
                        confirmDeleteAll: '<?php echo JText::_('CONFIRM_DELETE_ALL') ?>',
                        confirmDelete: '<?php echo JText::_('CONFIRM_DELETE') ?>',
                        deleteAllSuccess: '<?php echo JText::_('DELETE_ALL_SUCCESS') ?>',
                        numberInvalid: '<?php echo JText::_('NUMBER_INVALID') ?>'
                    },
                    encodedItems : '<?php echo $this->value ?>',
                    moduleID: '<?php echo $moduleID ?>',
                    container: 'btqc-container',
                    messageContainer: 'btqc-warning',
                    btnCreateID: '#btnCreateField',
                    btnUpdateID: '#btnUpdateField',
                    btnCancelID: '#btnCancel'

                });
                        
                        
                
                jQ('#btqc-add-field-form').hide();
                /**
                 * Hide some  button
                 */
                jQ('#btnCreateField, #btnCancel, #btnUpdateField').hide();
                
                /*
                 * Hide some options and show dropdown list field-type
                 */
                jQ('.btqc-optional').hide(); //hide all options
                jQ('#btqc-field-type').parent().show();
                
                /**
                 *
                 * Open field options when click add field
                 * 
                 */
                jQ("#btnAddField").click(function(){
                    jQ(this).hide();
                    jQ('#btnRemoveAll').hide(),
                    jQ('#btnCreateField, #btnCancel').show();
                    jQ('#btqc-add-field-form').slideDown();
                    return false;
                });
                /**
                 * Close all options when click cancel
                 */
                jQ("#btnCancel").click(function(){
					preview.reset();
					return false;
                });
                
                jQ('#btnCreateField').click(function(){
                    if(preview.create()){
						preview.reset();
					}
                    return false;
                });
            
                //remove all
                jQ('#btnRemoveAll').click(function(){
                    preview.removeAll();
                    return false;
                });
                
               
                    

                //bind event for field type change
                jQ('#btqc-field-type').bind('change', function(){
                    jQ('.btqc-optional').hide();
                    jQ('.btqc-optional.' + jQ(this).val()).show();
                    if(jQ(this).val() == 'dropdown'){
                        jQ('#btqc-field-size').val(''); //danh riêng cho dropdown
                    }
                });
                jQ('#btqc-field-type').change();   
                //bind event create alias
                jQ('#btqc-field-title').change(function(){
                    var str = jQ(this).val();
                    str = str.replace(/^\s+|\s+$/g, '');
                    var from = "ÁÀẠẢÃĂẮẰẶẲẴÂẤẦẬẨẪáàạảãăắằặẳẵâấầậẩẫóòọỏõÓÒỌỎÕôốồộổỗÔỐỒỘỔỖơớờợởỡƠỚỜỢỞỠéèẹẻẽÉÈẸẺẼêếềệểễÊẾỀỆỂỄúùụủũÚÙỤỦŨưứừựửữƯỨỪỰỬỮíìịỉĩÍÌỊỈĨýỳỵỷỹÝỲỴỶỸĐđÑñÇç·/_,:;";
                    var to   = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaooooooooooooooooooooooooooooooooooeeeeeeeeeeeeeeeeeeeeeeuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiyyyyyyyyyyddnncc------";

                    for (var i = 0, l = from.length ; i < l; i++) {
                        str = str.replace(new RegExp(from[i], "g"), to[i]);
                    }
                    str = str.replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-').toLowerCase();
                    jQ('#btqc-field-alias').val(str);
                });
                    
            });
        </script>  

        <?php
        return $html;
    }
    
    protected function getAddFieldForm(){
        $html = '<ul id="btqc-add-field-form" class="btqc-dialog-container ' . (version_compare(JVERSION, '3.0', 'ge') ? 'isJ30' : 'isJ25') . '" >'
                . '     <li class="btqc-optional text number email name richedit dropdown checkbox radio date file separator">'
                . '         <label for="btqc-field-title" class="hasTip" title="'. JText::_('FIELD_TITLE_DESC') .'">' . JText::_('FIELD_TITLE') .' </label>'
                . '         <input type="text" id="btqc-field-title" name="btqc-field-title"/>'
                . '     </li>'
                . '     <li class="btqc-optional text number email name richedit dropdown checkbox radio date file">'
                . '         <label for="btqc-field-alias" class="hasTip" title="'. JText::_('FIELD_ALIAS_DESC') .'">'.JText::_('FIELD_ALIAS') .'</label>'
                . '         <input type="text" id="btqc-field-alias" name="btqc-field-alias"/>'
                . '     </li>'
                . '     <li>'    
                . '         <label for="btqc-field-type" class="hasTip" title="' . JText::_('FIELD_TYPE_DESC') .'">' . JText::_('FIELD_TYPE') .'</label>'
                . '         <select style="width: 150px" name="btqc-field-type" id="btqc-field-type">'
                . '             <option value="text">' . JText::_('FIELD_TYPE_TEXT') . '</option>'
                . '             <option value="number">' . JText::_('FIELD_TYPE_NUMBER') . '</option>'
                . '             <option value="email">' . JText::_('FIELD_TYPE_EMAIL') . '</option>'
                . '             <option value="name">' . JText::_('FIELD_TYPE_NAME') . '</option>'
                . '             <option value="richedit">' . JText::_('FIELD_TYPE_RICHEDIT') . '</option>'
                . '             <option value="dropdown">' . JText::_('FIELD_TYPE_DROPDOWN') . '</option>'
                . '             <option value="checkbox">' . JText::_('FIELD_TYPE_CHECKBOX') . '</option>'
                . '             <option value="radio">' . JText::_('FIELD_TYPE_RADIOBOX') . '</option>'
                . '             <option value="date">' . JText::_('FIELD_TYPE_DATE') . '</option>'
                . '             <option value="file">' . JText::_('FIELD_TYPE_FILE') . '</option>'
                . '             <option value="separator">' . JText::_('FIELD_TYPE_SEPARATOR') . '</option>'
                . '             <option value="pagebreak">' . JText::_('FIELD_TYPE_PAGEBREAK') . '</option>'
                . '         </select>'
                . '     </li>'
                . '     <li class="btqc-optional text number dropdown radio checkbox richedit">'
                . '         <label for="btqc-defaultvalue" class="hasTip" title="' . JText::_('DEFAULT_VALUE_DESC') .'">' . JText::_('DEFAULT_VALUE') . '</label>'
                . '         <input type="text" name="btqc-field-defaultvalue" id="btqc-field-defaultvalue"/>'
                . '     </li>'
                . '     <li class="btqc-optional dropdown radio checkbox">'
                . '         <label for="btqc-field-options" class="hasTip" title="' . JText::_('FIELD_OPTIONS_DESC') .'">' . JText::_('OPTIONS') . '</label>'
                . '         <input type="text" name="btqc-field-options" id="btqc-field-options"/>'
                . '     </li>'
                . '     <li class="btqc-optional text number name email dropdown">'
                . '         <label for="btqc-field-size" class="hasTip" title="' . JText::_('FIELD_SIZE_DESC') .'">' . JText::_('SIZE') . '</label>'
                . '         <input type="text" name="btqc-field-size" id="btqc-field-size" value="20"/>'
                . '     </li>'
                . '     <li class="btqc-optional richedit checkbox radio">'
                . '         <label for="btqc-field-cols" class="hasTip" title="' . JText::_('FIELD_COLS_DESC') .'">' . JText::_('COLS') . '</label>'
                . '         <input type="text" name="btqc-field-cols" id="btqc-field-cols" value="20"/>'
                . '     </li>'
                . '     <li class="btqc-optional richedit">'
                . '         <label for="btqc-field-rows" class="hasTip" title="' . JText::_('FIELD_ROWS_DESC') .'">' . JText::_('ROWS') . '</label>'
                . '         <input type="text" name="btqc-field-rows" id="btqc-field-rows" value="5"/>'
                . '     </li>'
                . '     <li class="btqc-optional file">'
                . '         <label for="btqc-field-maxsize" class="hasTip" title="' . JText::_('FIELD_MAX_SIZE_DESC') .'">' . JText::_('MAX_SIZE') . '</label>'
                . '         <input type="text" name="btqc-field-maxsize" id="btqc-field-maxsize" value="2"/>'
                . '     </li>'
                . '     <li class="btqc-optional file">'
                . '         <label for="btqc-field-ext" class="hasTip" title="' . JText::_('FIELD_EXT_DESC') .'">' . JText::_('EXTENSIONS') . '</label>'
                . '         <input type="text" name="btqc-field-ext" id="btqc-field-ext" value="zip|jpg|jpeg|gif|bmp|png|txt|doc|docx"/>'
                . '     </li>'
                . '     <li class="btqc-optional text number email name richedit dropdown checkbox radio date file">'
                . '         <label for="btqc-required" class="hasTip" title="' . JText::_('FIELD_REQUIRED_DESC') .'">' . JText::_('REQUIRED') . '</label>'
                . '         <input type="checkbox" value="1" id="btqc-field-required"/>'
                . '     </li>'
                . '</ul>';
        return $html;
        
    }
}
?>