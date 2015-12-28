jQuery.noConflict();
window.addEvent("domready",function(){
	var parent = 'li:first';
	if(jQuery(".row-fluid").length){
		parent = 'div.control-group:first';
	}
	jQuery('#btig-message').parent().css('margin-left','0px');
	jQuery("#jform_params_asset-lbl").parents(parent).remove();
	jQuery("#jform_params_ajax-lbl").parents(parent).remove();
	jQuery("#jform_params_warning-lbl").parents(parent).remove();
	jQuery('#module-sliders li > .btn-group').each(function(){
		if(jQuery(this).find('input').length != 2 ) return;
		if(this.id.indexOf('advancedparams') ==0) return;
		jQuery(this).hide();
		var group = this;
		var el = jQuery(group).find('input:checked');	
		var switchClass ='';

		if(el.val()=='' || el.val()=='0' || el.val()=='no' || el.val()=='false'){
			switchClass = 'no';
		}else{
			switchClass = 'yes';
		}
		var switcher = new Element('div',{'class' : 'switcher-'+switchClass});
		switcher.inject(group, 'after');
		switcher.addEvent("click", function(){
			var el = jQuery(group).find('input:checked');	
			if(el.val()=='' || el.val()=='0' || el.val()=='no' || el.val()=='false'){
				switcher.setProperty('class','switcher-yes');
			}else {
				switcher.setProperty('class','switcher-no');
			}
			jQuery(group).find('input:not(:checked)').attr('checked',true).trigger('click');
		});
	})
	
	jQuery(".pane-sliders select").each(function(){
		if(this.id.indexOf('advancedparams') ==0) return;
		var width = 0
		if(jQuery(this).is(":visible")) {
		width = parseInt(jQuery(this).width())+40;
		jQuery(this).css("width",width>150? width:150);
		jQuery(this).chosen();
		};
	});	
	
	jQuery(".pane-sliders textarea").parent().css('overflow','hidden');
	jQuery(".chzn-container").click(function(){
		jQuery(".panel .pane-slider,.panel .panelform").css("overflow","visible");	
	})
	jQuery(".panel .title").click(function(){
		jQuery(".panel .pane-slider,.panel .panelform").css("overflow","hidden");		
	});
	
	// Group element
	jQuery(".bt_control").each(function(){ 
		if(jQuery(this).parents(parent).css('display')=='none' ) return;
		var name = this.id.replace('jform_params_','');
		jQuery(this).change(function(){
			var parent = 'li:first';
			if(jQuery(this).parent().hasClass('controls')){
				parent = 'div.control-group:first';
			}
			jQuery(this).find('option').each(function(){
					jQuery('.'+name+'_'+this.value).each(function(){
						jQuery(this).parents(parent).hide();
					})
				})
				
				jQuery('.'+name+'_'+jQuery(this).find('option:selected').val()).each(function(){
					jQuery(this).parents(parent).fadeIn(500);
			})
		});
		jQuery(this).change();
		// radio box
		jQuery(this).find('input').each(function(){
			if(jQuery(this).is(':not(:checked)')){ 
				jQuery('.'+name+'_'+this.value).each(function(){
					jQuery(this).parents(parent).hide();
				});
			}
			jQuery(this).click(function(){
			
				jQuery(this).siblings().each(function(){
					jQuery('.'+name+'_'+this.value).each(function(){
						jQuery(this).parents(parent).fadeOut('fast');
					});
				})
				jQuery('.'+name+'_'+this.value).each(function(){
					jQuery(this).parents(parent).fadeIn(500);
				});
			})
		})
	});
})

