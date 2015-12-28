jQ = jQuery.noConflict();
var BT=BT||{};
(function(){
    BT.PreviewForm = new Class({
        Implements:[Options,Events],
        options:{},
        initialize:function(options){
            
            this.setOptions(options);
            var fields =JSON.decode(new BT.Base64().base64Decode(this.options.encodedItems));
            var self=this;
            this.sortables=new Sortables(this.options.container,{
                clone:true,
                revert:true,
                opacity:0.3,
                onStart:function(element, clone){
                    clone.setStyle("z-index",999)
                }
            });
            if(fields!=null){
                fields.each(function(field){
                    self.add(field)
                })
            }
            var submit =null;
            if(typeof document.adminForm.onsubmit=="function"){
                submit = document.adminForm.onsubmit
            }
            document.adminForm.onsubmit=function(){
                var fields=[];
                var i=0;
                $$("#btqc-container li").each(function(li){
                    var field=li.retrieve("data");
                    if(field!=null){
                        fields[i]=field;
                        i++
                    }
                });
                $("btqc-hidden").set("value",new BT.Base64().base64Encode(JSON.encode(fields)));
                if(submit!=null){
                    submit()
                }
            }
        },
        create: function(){
            jQ('#btqc-messages').html('');
            /**
            * Create field
            */
            var valid = true;
            var title = jQ('#btqc-field-title');
            var alias = jQ('#btqc-field-alias');
            var size = jQ('#btqc-field-size');
            var cols = jQ('#btqc-field-cols');
            var rows = jQ('#btqc-field-rows');
            var maxSize = jQ('#btqc-field-maxsize');

            var type = jQ('#btqc-field-type').val();
            var warning = null;
            if(title.parent().is(':visible') && (title.val() == null || title.val() == '')){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldTitleRequired);
                jQ('#btqc-messages').append(warning);
                title.addClass('error');
                valid = false;
            }
            if(alias.parent().is(':visible') && (alias.val() == null || alias.val() == '')){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldAliasRequired);
                jQ('#btqc-messages').append(warning);
                alias.addClass('error');
                valid = false;
            }else{
                if(jQ('#btqc-f-' + alias.val()).length != 0){
                    warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldAliasExisted);
                    jQ('#btqc-messages').append(warning);
                    alias.addClass('error');
                    valid = false;
                }
            }
            if(size.parent().is(':visible') && isNaN(size.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                size.addClass('error');
                valid = false;
            }
            if(cols.parent().is(':visible') && isNaN(cols.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                cols.addClass('error');
                valid = false;
            }
            if(rows.parent().is(':visible') && isNaN(rows.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                rows.addClass('error');
                valid = false;
            }
            if(maxSize.parent().is(':visible') && isNaN(maxSize.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                maxSize.addClass('error');
                valid = false;
            }
            if(!valid){
                jQ('#btqc-messages').show();//.delay(1000).slideUp(500, function(){jQ('#btqc-messages').html('')});
                return false;
            }

            var field = new Object();
            field.type = type;
            if(title.val() != '') field.title = title.val();
            if(title.val() != '') field.alias = alias.val();
            field.defaultValue = jQ('#btqc-field-defaultvalue').val();
            field.required = jQ('#btqc-field-required').is(':checked');
            switch (type){
                case 'text':
                case 'name':
                case 'number':
                case 'email':
                    field.size = jQ('#btqc-field-size').val();
                    break;
                case 'dropdown':
                    field.size = jQ('#btqc-field-size').val();
                    field.options = jQ('#btqc-field-options').val().split('|');
                    break;
                case 'richedit':
                    field.cols = jQ('#btqc-field-cols').val();
                    field.rows = jQ('#btqc-field-rows').val();
                    break;
                case 'checkbox':
                case 'radio':
                    field.options = jQ('#btqc-field-options').val().split('|');
                    field.cols = jQ('#btqc-field-cols').val();
                    break;
                case 'file':
                    field.maxSize = jQ('#btqc-field-maxsize').val();
                    field.ext = jQ('#btqc-field-ext').val();
                    break;
                default:
                    break;    
            }
            this.add(field);
            jQ('#btqc-messages').html('').append(jQ('<div>').addClass('bt-message success').html(this.options.warningText.addFieldSuccess));
			return true;
        },
        add:function(field){
            
            var liHTML = ''
            if(field.type != 'separator' && field.type != 'pagebreak')
                liHTML += '<label>' + field.title + '</label>';
            switch(field.type){
                case 'text':
                case 'number':
                case 'email': 
                case 'name' :
                    liHTML += '<input type="text" class="' + field.type + '" value="' + field.defaultValue +'" name="' + field.alias + '" id="btqc-f-' + field.alias + '" size="' + field.size + '"/>';
                    break;
                case 'richedit':
                    liHTML += '<textarea class="richedit" name="' + field.alias + '" id="btqc-f-' + field.alias + '" rows="' + field.rows + '" cols="' + field.cols + '">' + field.defaultValue +'</textarea>';
                    break;
                case 'dropdown':
                    liHTML += '<select class="dropdown" name="' + field.alias + '" id="btqc-f-' + field.alias + '" size="' + field.size + '">';
                    for(var i = 0; i < field.options.length; i++){
                        liHTML+= '<option value="' + field.options[i] + '">' + field.options[i] + '</option>';
                        
                    }
                    liHTML += '</select>';
                    
                    break;
                case 'checkbox':
                case 'radio':
                    liHTML += '<div class="btqc-field-container">'
                    liHTML += '<div class="btqc-fc-row">';
                    for(i = 0; i < field.options.length; i++){
                        liHTML += '<input type="' + field.type + '" value="' + field.options[i] +'" name="' + field.alias + '" ' + ((field.options[i] == field.defaultValue) ? 'selected = "selected"' : '') + ' /><span>' + field.options[i] + '</span>';    
                        if((i + 1) % field.cols == 0 || i + 1 == field.options.length){
                            liHTML += '<div style="clear: both;"></div></div>';
                            if(i + 1 < field.options.length) liHTML += '<div class="btqc-fc-row">';
                        }
                    }
                    liHTML += '</div>';
                    break;
                case 'file':
                    liHTML += '<div class="btqc-input-file">'
                    +  '    <input size="26" type="file" name="' + field.alias + '" id ="' + field.alias + '"/>'
                    +  '    <div class="btqc-fake-file">'
                    +  '        <input type="text"/>'
                    +  '        <button class="btqc-upload" type="button" onclick="return false;"/>Upload</button>'
                    +  '    </div>'
                    +  '</div>'
                    break;
                case 'separator':
                    liHTML += '<div class="btqc-separator">' + field.title + '</div>'   ;
                    break;
                case 'date':
                    liHTML += '<input type="text" title="" name="' + field.alias + '" id="btqc-f-' + field.alias +'" value="" /><img src="' + this.options.liveURL +'/admin/images/calendar.png" alt="Calendar" class="btqc-calendar-img" id="btqc-f-' + field.alias + '-img" />'
                    break;
                default:
                    break;     
            }
            
            liHTML += '<a href="javascript:void(0)" class="btpreview_remove" title="Remove"></a>';
            if(field.type != 'pagebreak')
                liHTML += '<a href="javascript:void(0)" class="btpreview_edit" title="Edit"></a><div style="clear: both;"></div>'
            else
                liHTML += '<div class="btqc-pagebreak"><span>Break Page</span></div><div style="clear: both;"></div>'
            
            var li = new Element("li",{
                'class' : field.required ? 'required' : '',
                html: liHTML
            });
            var self=this;
            if(field.type != 'pagebreak')
                li.getElement(".btpreview_edit").addEvent("click",function(){
                    self.edit(li)
                });
            li.getElement(".btpreview_remove").addEvent("click",function(){
                self.remove(li)
            });
            li.store("data",field);
            var container=$(this.options.container);
            li.set("opacity",0);
            container.grab(li);
            li.fade("in");
            
            if(field.type == 'dropdown'){
            //jQ('#btqc-f-' + field.alias).chosen();
            }
            if(field.type == 'date'){
                Calendar.setup({
                    // Id of the input field
                    inputField: 'btqc-f-' + field.alias,
                    // Format of the input field
                    ifFormat: "%Y-%m-%d",
                    // Trigger for the calendar (button ID)
                    button: 'btqc-f-' + field.alias + '-img',
                    // Alignment (defaults to "Bl")
                    align: "Tl",
                    singleClick: true,
                    firstDay: 0
                });
            }
            this.sortables.addItems(li);
            return true;
        },
        edit:function(li){
            var field = li.retrieve("data");
            if(field != null){
                jQ(this.options.btnUpdateID).show();
                jQ(this.options.btnCreateID).hide();
                jQ(this.options.btnUpdateID).unbind('click');
                jQ('#btnAddField, #btnRemoveAll').hide();
                jQ('#btnCancel').show();
                jQ('#btqc-add-field-form').slideDown();
                
                jQ('#btqc-field-type').val(field.type).attr('disabled', 'disabled');
                jQ('#btqc-field-type').trigger('liszt:updated');
                jQ('#btqc-field-type').parent().show();
                jQ('.btqc-optional').hide();
                jQ('.btqc-optional.' + jQ('#btqc-field-type').val()).show();
                jQ('#btqc-field-title').val(field.title);
                jQ('#btqc-field-alias').val(field.alias);
                jQ('#btqc-field-required').attr('checked',field.required);




                if(field.type == 'name' || field.type == 'text' || field.type == 'email' || field.type == 'number' || field.type == 'dropdown'){
                    jQ('#btqc-field-size').val(field.size);
                    jQ('#btqc-field-defaultvalue').val(field.defaultValue);    
                }
                if(field.type == 'richedit'){
                    jQ('#btqc-field-defaultvalue').val(field.defaultValue); 
                    jQ('#btqc-field-rows').val(field.rows);
                }
                if(field.type == 'richedit' || field.type == 'checkbox' || field.type == 'radio')
                    jQ('#btqc-field-cols').val(field.cols);
                if (field.type == 'dropdown' || field.type == 'checkbox' || field.type == 'radio'){
                    jQ('#btqc-field-options').val(field.options.join('|'));
                    jQ('#btqc-field-defaultvalue').val(field.defaultValue); 
                }
                if(field.type == 'file'){
                    jQ('#btqc-field-maxsize').val(field.maxSize);
                    jQ('#btqc-field-ext').val(field.ext);
                }
                var self = this;
                jQ(this.options.btnUpdateID).click(function(){
                   
                    if(self.update(li, field)){
						self.reset();
					}
                    return false;
                });
            }
			return true;
        },
        update: function(li, field){
            var valid = true;
            var title = jQ('#btqc-field-title');
            var alias = jQ('#btqc-field-alias');
            var size = jQ('#btqc-field-size');
            var cols = jQ('#btqc-field-cols');
            var rows = jQ('#btqc-field-rows');
            var maxSize = jQ('#btqc-field-maxsize');
            var type = jQ('#btqc-field-type').val();
            var warning = null;
            if(title.parent().is(':visible') && (title.val() == null || title.val() == '')){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldTitleRequired);
                jQ('#btqc-messages').append(warning);
                title.addClass('error');
                valid = false;
            }
            if(alias.parent().is(':visible') && (alias.val() == null || alias.val() == '')){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldAliasRequired);
                jQ('#btqc-messages').append(warning);
                alias.addClass('error');
                valid = false;
            }else{
                if(field.alias != alias.val() && jQ('#btqc-f-' + alias.val()).length != 0){
                    warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.fieldAliasExisted);
                    jQ('#btqc-messages').append(warning);
                    alias.addClass('error');
                    valid = false;
                }
            }
            if(size.parent().is(':visible') && isNaN(size.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                size.addClass('error');
                valid = false;
            }
            if(cols.parent().is(':visible') && isNaN(cols.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                cols.addClass('error');
                valid = false;
            }
            if(rows.parent().is(':visible') && isNaN(rows.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                rows.addClass('error');
                valid = false;
            }
            if(maxSize.parent().is(':visible') && isNaN(maxSize.val())){
                warning = jQ('<div>').addClass('bt-message error').html(this.options.warningText.numberInvalid);
                jQ('#btqc-messages').append(warning);
                maxSize.addClass('error');
                valid = false;
            }
            if(!valid){
                jQ('#btqc-messages').slideDown(300);
                return false;
            }
            //initial HTML field (input tag or orther)
            var htmlField = jQ(li).find('#btqc-f-'+ field.alias);        
            if(title.val() != '' )
            {   
                field.title = title.val();
                if(type == 'separator') jQ(li).find('.btqc-separator').html(title.val());
                else jQ(li).find('label').html(title.val());
                        
            }
            if(alias.val() != ''){
                field.alias = alias.val();
                htmlField.attr('name',alias.val());
            }                
                
            field.required = jQ('#btqc-field-required').is(':checked') ? true : false;
            if(field.required){
                jQ(li).addClass('required');
            }else{
                jQ(li).removeClass('required');
            }
            switch (type){
                case 'text':
                case 'name':
                case 'number':
                case 'email':
                    htmlField.attr('value', field.defaultValue);
                    field.defaultValue = jQ('#btqc-field-defaultvalue').val();
                    field.size = jQ('#btqc-field-size').val();
                    htmlField.attr('size', field.size);
                    break;
                case 'dropdown':
                    htmlField.attr('value', field.defaultValue);
                    field.defaultValue = jQ('#btqc-field-defaultvalue').val();
                    field.size = jQ('#btqc-field-size').val();
                    htmlField.attr('size', field.size);
                    field.options = jQ('#btqc-field-options').val().split('|');
                    htmlField.html('');
                    for(var i = 0; i< field.options.length; i++){
                        htmlField.append(jQ('<option>').attr('value', field.options[i]).html(field.options[i]));
                    }
                    htmlField.trigger('liszt:updated');
                    break;
                case 'richedit':
                    htmlField.attr('value', field.defaultValue);
                    field.defaultValue = jQ('#btqc-field-defaultvalue').val();
                    field.cols = jQ('#btqc-field-cols').val();
                    htmlField.attr('cols', field.cols);
                    field.rows = jQ('#btqc-field-rows').val();
                    htmlField.attr('rows', field.rows);
                    break;
                case 'checkbox':
                case 'radio':
                    htmlField.attr('value', field.defaultValue);
                    field.defaultValue = jQ('#btqc-field-defaultvalue').val();
                    field.options = jQ('#btqc-field-options').val().split('|');
                    field.cols = jQ('#btqc-field-cols').val();
                    jQ(li).find('.btqc-field-container').html('');
                    var liHTML = '<div class="btqc-fc-row">';
                    for(i = 0; i < field.options.length; i++){
                        liHTML += '<input type="' + field.type + '" value="' + field.options[i] +'" name="' + field.alias + '" ' + ((field.options[i] == field.defaultValue) ? 'selected = "selected"' : '') + ' /><span>' + field.options[i] + '</span>';    
                        if((i + 1) % field.cols == 0 || i + 1 == field.options.length){
                            liHTML += '<div style="clear: both;"></div></div>';
                            if(i + 1 < field.options.length) liHTML += '<div class="btqc-fc-row">';

                        }
                    }
                    jQ(li).find('.btqc-field-container').html(liHTML);
                    break;
                        
                case 'file':
                    field.maxSize = jQ('#btqc-field-maxsize').val();
                    field.ext = jQ('#btqc-field-ext').val();
                    break;
                case 'separator':
                        
                default:
                    break;    
            }
            //khởi tạo lại form
            jQ('#btqc-messages').html('').append(jQ('<div>').addClass('bt-message success').html(this.options.warningText.updateFieldSuccess));
            title.removeClass('error');
            alias.removeClass('error');

            return true;
            
        },
        reset: function(){
            
            
            jQ('#btqc-add-field-form').slideUp(500, function(){
				jQ('#btqc-add-field-form input[type=text]').val('');
				jQ('#btqc-add-field-form .error').removeClass('error');
				jQ('#btqc-add-field-form input[type=checkbox]').attr('checked', false);
				jQ('#btqc-field-type option:first-child').attr('selected', 'selected');
				jQ('#btqc-field-type').attr('disabled', false);
				jQ('#btqc-field-type').trigger('liszt:updated');
				jQ('.btqc-optional').hide();
				jQ('.btqc-optional.' + jQ('#btqc-field-type').val()).show();
				jQ('#btnCreateField, #btnUpdateField, #btnCancel').hide();
				jQ('#btnAddField, #btnRemoveAll').show();
			});
			jQ('#btqc-messages .bt-message').delay(2000).slideUp(500, function(){jQ('#btqc-messages').html('');});
        },
        remove:function(li){
            if(confirm(this.options.warningText.confirmDelete)){
                var b=new Fx.Morph(li);
                b.start({
                    height:0,
                    opacity:0
                }).chain(function(){
                    li.dispose()
                });
            }
        //this.showMessage("btqc-messages","<b>Delete field successful</b>")
        },
        removeAll: function(){
            if(confirm(this.options.warningText.confirmDeleteAll)){
                var a = $(this.options.container);
                var b = a.getElements("li");
                b.each(function(c){
                    var d=new Fx.Morph(c);
                    d.start({
                        width:0,
                        height:0,
                        opacity:0
                    }).chain(function(){
                        c.dispose()
                    });
                });
                jQ('#btqc-optional-container').show();
                //this.showMessage(this.options.warningText.deleteAllSuccess);
                setTimeout(function(){
                    jQ('#btqc-optional-container').slideUp(500)
                }, 1500);
            }
            return false;
        },
        showMessage:function(messageText){
            
            var messageContainer = $(this.options.messageContainer);
            var message = new Element("div", {
                'class': 'bt-message'
            });
            message.set("html",messageText);
            message.set("opacity",0);
            messageContainer.grab(message,"top");
            var b=new Fx.Morph(message,{
                link:"chain"
            });
            b.start({
                opacity:1,
                visibility:'visible'
            });
            this.removeLog();
        },
        removeLog:function(){
            $(this.options.messageContainer).getElements("div.bt-message").each(function(d,b,c){
                setTimeout(function(){
                    var e=new Fx.Morph(d,{
                        link:"chain"
                    });
                    e.start({
                        height:0,
                        opacity:0
                    }).chain(function(){
                        d.dispose()
                    })
                },1000)
            })
        }
    })
})();