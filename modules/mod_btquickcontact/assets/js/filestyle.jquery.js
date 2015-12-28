/*
 * Style File - jQuery plugin for styling file input elements
 *  
 * Copyright (c) 2007-2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Based on work by Shaun Inman
 *   http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom
 *
 * Revision: $Id: jquery.filestyle.js 303 2008-01-30 13:53:24Z tuupola $
 *
 */

(function($) {
    
    $.fn.filestyle = function(options) {
                
        /* TODO: This should not override CSS. */
        var settings = {
            width : 250
        };
                
        if(options) {
            $.extend(settings, options);
        };
                        
        return this.each(function() {
            
            var self = this;
            
            var filename = $('<input type="text" class="file ' + $(this).attr('id') + '">')
                             .addClass($(self).attr("class"))
                             .css({
                                 "display": "inline",
                                 "width": settings.width + "px"
                             });

            $(self).before(filename);
            
            var wrapper = $("<div>")
                            .css({

                                "display": "inline",
                                "position": "absolute",
                                "overflow": "hidden"
                            });
            $(self).wrap(wrapper); 
            var button = $('<button>').addClass('button').html('Upload').bind('click', function(){
                $(self).trigger('click');
                return false;
            });
            $(self).after(button);
            
            

            $(self).css({
                        "position": "relative",
                        "height": settings.height + "px",
                        "width": settings.width + "px",
                        "display": "inline",
                        "cursor": "pointer",
                        "opacity": "0.0"
                    });

           
            $(self).css("margin-left", 0 - settings.width + "px");                
            

            $(self).bind("change", function() {
                $(self).parents('.btqc-field-container').find('.' + $(self).attr('id')).val($(self).val());
            });
      
        });
        

    };
    
})(jQuery);
