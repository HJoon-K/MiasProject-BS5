// 주석
var Notify = {
    load: false,
    active: false,
    visible: false,
    type: null,
    ok: null, // 버튼 클릭 이벤트 확인 메시지
    cancel: null, // 버튼 클릭 이벤트 취소
    timer : null, //
    init: function () {
        this.$wrapper = $('<div class="notify-wrapper"><div class="notify-window"><h6></h6><p></p><div class="buttons"><button class="ok">확인</buton><button class="cancel">Cancel</buton></div></div></div>');
        $('body').append(this.$wrapper);
        this.$window = $('.notify-window', this.$wrapper);
        this.load = true;
        this.bind();
    },
    reset: function () {
        $('h6', this.$window).hide();
        $('p', this.$window).hide();
        $('.buttons', this.$window).hide();
        $('button.ok', this.$window).hide();
        $('button.cancel', this.$window).hide();
    },
    bind: function () {
        var self = this;

        // 다른 부분을 클릭
        this.$wrapper.on('click', function (e) {
            var $target = $(e.target);
            if ($target.is('.notify-window') || $target.closest('.notify-window').length > 0) {

            } else {
                self.hide();
            }
        });

        // 확인을 클릭
        this.$wrapper.on('click', 'button.ok', function () {
            if (!self.active) return;
            self.hide();
            if (self.ok) {
                self.ok();
            }
        });
        // 취소를 클릭
        this.$wrapper.on('click', 'button.cancel', function () {
            if (!self.active) return;
            self.hide();
            if (self.cancel) {
                self.cancel();
            }
        });
    },
    alert: function (param) {
        if (typeof (param) === 'string') {
            this.show({ title: param, type: 'alert' });
        } else {
            param.type = 'alert';
            this.show(param);
        }
    },
    error: function (param) {
        this.alert(param);
    },
    confirm: function (param) {
        if (typeof (param) === 'string') {
            this.show({ title: param, type: 'confirm' });
        } else {
            param.type = 'confirm';
            this.show(param);
        }
    },
    success: function (param) {
        if (typeof (param) === 'string') {
            this.show({ title: param, type: 'success' });
        } else {
            param.type = 'success';
            this.show(param);
        }
    },
    suc: function (param) {
        this.success(param);
    },
    show: function (param) {
        if (!this.load) {
            this.init();
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.reset();
        this.$window.removeClass('alert confirm success').addClass(param.type);
        if (param.title) {
            $('h6', this.$window).text(param.title).show();
            if (param.type == 'alert') {
                $('h6', this.$window).prepend($('<i class="fas fa-exclamation-circle" aria-hidden="true">'));
            } else if (param.type == 'confirm') {
                $('h6', this.$window).prepend($('<i class="fas fa-question-circle" aria-hidden="true">'));
            } if (param.type == 'success') {
                $('h6', this.$window).prepend($('<i class="fas fa-check" aria-hidden="true">'));
            }
        }

        if (param.text) {
            $('p', this.$window).text(param.text).show();
        } else if (param.html) {
            $('p', this.$window).html(param.html).show();
        }

        if (param.type == 'alert' || param.type == 'confirm' || param.type == 'success') {
            $('.buttons .ok', this.$window).show();
            if (param.type == 'confirm') {
                $('.buttons .cancel', this.$window).show();
            }
            $('.buttons', this.$window).show();
        }

        // callback
        this.ok = null;
        // focus callback
        if (param.focus) {
            this.ok = function () {
                param.focus.focus();
            }
        }
        if (param.ok) {
            this.ok = param.ok;
        }
        this.cancel = null;
        if (param.cancel) {
            this.cancel = param.cancel;
        }

        this.$wrapper.show();
        //this.top();
        var self = this;
        setTimeout(function () {
            self.$wrapper.addClass('show');
            self.active = true;
        }, 0);
    },
    hide: function () {
        this.$wrapper.removeClass('show');
        this.active = false;
        var self = this;
        this.timer = setTimeout(function () {
            self.$wrapper.hide();
        }, 300);
    },
    top: function () {
        var top = ($(window).height() - this.$window.outerHeight()) / 2;
        if (top < 0) {
            top = 0;
        }
        this.$window.css('top', top);
    },
    loading: function (msg) {
        if (!msg) return;
        $.ajaxLoadingMsg = msg;
    }
}
