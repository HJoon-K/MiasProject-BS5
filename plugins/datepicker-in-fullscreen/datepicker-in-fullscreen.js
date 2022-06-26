    
/* ======================================================= 
 *
 *      Date Picker In Fullscreen
 *      Version: 1
 *      By castlecode
 *
 *      Contact: http://codecanyon.net/user/castlecode
 *      Created: June 30, 2017
 *
 *      Copyright (c) 2017, castlecode. All rights reserved.
 *      Available only in http://codecanyon.net/
 *      
 *      ---------------------------------
 *      CONTENTS
 *      ---------------------------------
 *
 *      [A] DATE PICKER IN FULL SCREEN CLASS
 *      [B] DEFAULTS
 *      [C] INIT
 *          [1] SETUP
 *          [2] MAKE FAKE INPUT
 *          [3] OPEN MODAL
 *          [4] INIT DATEPICKER
 *          [5] ADD CONTROLS
 *          [6] ADD SWIPE SUPPORT
 *          [7] CLOSE MODAL
 *          [8] CHANGE VALUE
 *          [9] GET SCROLLBAR WIDTH
 *      [D] DATE PICKER IN FULL SCREEN PLUGIN
 *      
 * ======================================================= */

(function( window, $, undefined ){

/* ====================================================================== *
        [A] DATE PICKER IN FULL SCREEN CLASS
 * ====================================================================== */    

    var DatepickerInFullscreen = function(container, options){
        this.init(container, options);
    }

/* ====================================================================== *
        [B] DEFAULTS
 * ====================================================================== */    
    
    DatepickerInFullscreen.DEFAULTS = {

        // Options

        touchSwipe                  :   true,
        effect                      :   '3', // 1 or 2 or 3 or 5 or 6 up to 16
        blockScroll                 :   true,
        closeOnChange               :   true,
        format                      :   'MMMM DD, YYYY', // YYYY-MM-DD
        additionalTarget            :   '',
        additionalTargetFormat      :   'MMMM DD, YYYY',
        fakeInput                   :   true,
        fakeInputFormat             :   'MMMM DD, YYYY',
        todayWord                   :   'Today',
        clearWord                   :   'Clear',
        closeWord                   :   'Close',
        template                    :   ' <div class="datepicker-in-fullscreen-modal"> ' +
                                            ' <div class="datepicker-in-fullscreen-content"> ' +
                                                ' <div class="datepicker-in-fullscreen"></div> ' +
                                                ' <div class="datepicker-in-fullscreen-controls"> ' +
                                                    ' <a class="dpifs-today">{{today}}</a><a class="dpifs-clear">{{clear}}</a><a class="dpifs-close">{{close}}</a> ' +
                                                ' </div> ' +
                                            ' </div> ' +   
                                        ' </div> '+
                                        ' <div class="datepicker-in-fullscreen-background"></div> ',

        // Datepicker options

        datepicker                  :   {
                                            calendarWeeks               :   false,
                                            datesDisabled               :   [],
                                            daysOfWeekDisabled          :   [],
                                            daysOfWeekHighlighted       :   [],
                                            startDate                   :   -Infinity,
                                            endDate                     :   Infinity,
                                            maxViewMode                 :   2, // centuries
                                            minViewMode                 :   0, // days
                                            startView                   :   0, // days
                                            language                    :   'en',
                                            templates                   :   {
                                                                                leftArrow: '&laquo;',
                                                                                rightArrow: '&raquo;'
                                                                            },
                                            title                       :  '',
                                            todayHighlight              :  false,
                                            weekStart                   :  0, // sunday
                                        },

        // Events

        beforeOpen                  : function(modal, settings){},
        beforeClose                 : function(modal, settings){},
        onChange                    : function(modal, settings){},   

    };    

/* ====================================================================== *
        [C] INIT
 * ====================================================================== */    

    DatepickerInFullscreen.prototype.init = function(input, options){   
        
    /* ====================================================================== *
            [1] SETUP
     * ====================================================================== */

        /* SETTINGS */
        
        var settings                    = $.extend(true, {}, DatepickerInFullscreen.DEFAULTS, options);

        /* VARS */
        
        var $input                      = $(input); 
        var input_placeholder           = $input.attr('placeholder') == undefined ? '' : $input.attr('placeholder');
        var $fake_input                 = $('<div class="dpifs-fake-input form-control form-contron-lg"></div>');
        var body                        = $(document.body);
        var modal                       = '';
        var datepicker_instance         = '';
        var changedScroll               = false;

        /* Set initial values */

        change_value_fake_input( $input.val() == '' ? input_placeholder : $input.val() );
        change_value_additional_target( $input.val() == '' ? input_placeholder : $input.val() );
        
        /* update fake-input */
        
        this.updateFakeInput            = function(){
            change_value_fake_input( $input.val() == '' ? input_placeholder : $input.val() );
            change_value_additional_target( $input.val() == '' ? input_placeholder : $input.val() );
        }

        /* Replace words in template */

        settings.template = settings.template.split('{{today}}').join(settings.todayWord);
        settings.template = settings.template.split('{{clear}}').join(settings.clearWord);
        settings.template = settings.template.split('{{close}}').join(settings.closeWord);

    /* ====================================================================== *
            [2] MAKE FAKE INPUT
     * ====================================================================== */         

        if(settings.fakeInput){

            // Add fake input to the DOM

            $fake_input.insertAfter($input);

            // Add click evento to fake input

            $fake_input.on('click', function(){
                $input.trigger('click');
            });
        }

    /* ====================================================================== *
            [3] OPEN MODAL
     * ====================================================================== */    

        $input.on('click', function(){

            // Remove any other modal

            $('.datepicker-in-fullscreen-modal, .datepicker-in-fullscreen-background').remove();

            // New modal template

            modal = $(settings.template);

            // Add effect

            if($input.attr('data-effect') != undefined){
                modal.filter('.datepicker-in-fullscreen-modal').addClass('dpifs-effect-'+$input.attr('data-effect'))
            }else{
                modal.filter('.datepicker-in-fullscreen-modal').addClass('dpifs-effect-'+settings.effect)
            }

            // Add it to the dom

            body.prepend(modal);

            // Add padding-right to body (remove scrollbar)

            if( body.css('padding-right').split('px').join('') <= 0  && body.css('margin-right').split('px').join('') <= 0 && settings.blockScroll){
                body.css('padding-right', getScrollbarWidth()+'px');
                body.addClass('dpifs-hide-scrollbar');
                changedScroll = true;
            }else{
                changedScroll = false;
            }

            // Init datepicker

            init_datepicker();

            // Close on BG click
            
            modal.filter('.datepicker-in-fullscreen-background').on('click', function(){
                close_modal();
            });

            // Block scrolling (so the background/body doesn't move/scroll)

            modal.on('touchmove', function(e) {
                return false;
            });

        });

    /* ====================================================================== *
            [4] INIT DATEPICKER
     * ====================================================================== */            

        function init_datepicker(){

            // Call function beforeOpen

            settings.beforeOpen(modal, settings);

            // Init datepicker plugin

            datepicker_instance = modal.find('.datepicker-in-fullscreen').datepicker(settings.datepicker)
                .datepicker('setDate', moment($input.val(), settings.format).toDate()) 
                .on('changeDate', function(ev){

                    var new_date = moment(ev.date).format(settings.format);

                    change_value( new_date );
                    change_value_fake_input( new_date );
                    change_value_additional_target( new_date );

                    // Close 

                    if(settings.closeOnChange){
                        close_modal();
                    }
                    
                });   

            // Show modal with effect

            modal.addClass('dpifs-show');

            // Add event controls

            add_controls();

            // Add swipe support

            add_swipeSupport();
        }

    /* ====================================================================== *
            [5] ADD CONTROLS
     * ====================================================================== */                

        function add_controls(){

            // Today

            modal.find('.dpifs-today').on('click', function(e){
                e.preventDefault();
                datepicker_instance.datepicker('setDate', moment().toDate());
            });

            // Clear

            modal.find('.dpifs-clear').on('click', function(e){
                e.preventDefault();

                change_value('');
                change_value_fake_input('');
                change_value_additional_target('');

                close_modal();
            });

            // Close

            modal.find('.dpifs-close').on('click', function(e){
                e.preventDefault();
                close_modal();
            });

        }        

    /* ====================================================================== *
            [6] ADD SWIPE SUPPORT
     * ====================================================================== */     

        function add_swipeSupport(){
            if(settings.touchSwipe){
                modal.find('.datepicker-in-fullscreen-content').swipe( {
                    
                    //Generic swipe handler for all directions
                    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                        if(direction == 'right'){
                            modal.find('.datepicker-inline>div:visible thead .prev').trigger('click');
                        }else if(direction == 'left'){
                            modal.find('.datepicker-inline>div:visible thead .next').trigger('click');
                        }
                    }

                });
            }
        }                   

    /* ====================================================================== *
            [7] CLOSE MODAL
     * ====================================================================== */                

        function close_modal(){
            settings.beforeClose(modal, settings);

            modal.removeClass('dpifs-show');

            if(changedScroll){
                setTimeout(function(){
                    body.css('padding-right', '');
                    body.removeClass('dpifs-hide-scrollbar');
                }, 200);
            }

        }

    /* ====================================================================== *
            [8] CHANGE VALUE
     * ====================================================================== */                        

        function change_value(new_date){
            $input.val(new_date).trigger('input');

            settings.onChange(modal, settings);
        }

        function change_value_fake_input(new_date){
            var new_moment  = moment(new_date, settings.format);
            var new_value   = new_moment.isValid() ? new_moment.format(settings.fakeInputFormat) : new_date;

            $fake_input.text( new_value );
        }

        function change_value_additional_target(new_date){
            var new_moment  = moment(new_date, settings.format);
            var new_value   = new_moment.isValid() ? new_moment.format(settings.fakeInputFormat) : new_date;

            $(settings.additionalTarget).val(new_value).text(new_value);
        }

    /* ====================================================================== *
            [9] GET SCROLLBAR WIDTH
     * ====================================================================== */                    

        function getScrollbarWidth() {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);        

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }

        
    };//END OF INIT   

/* ====================================================================== *
        [D] DATE PICKER IN FULL SCREEN PLUGIN
 * ====================================================================== */

    $.fn.datepickerInFullscreen = function(options, content, callback) {

        return this.each(function(key, value){
            var $this   = $(this);
            var data    = $this.data('datepickerInFullscreen')
            
            // Initialize plugin
            if (!data && typeof options != 'string'){
                $this.data('datepickerInFullscreen', new DatepickerInFullscreen(this, options));
            }

            // Call method
            if (data && typeof options == 'string'){
                data[options](content, callback);    
            }
        });

    };      
    
})( window, jQuery );