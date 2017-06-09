/*--------------------------------------------------
W E B S O L U T E
Website by Websolute
--------------------------------------------------*/


/*--------------------------------------------------
Config
--------------------------------------------------*/
var config = {
    originalScroll: false,
    preload: true
}

//var config = {
//    originalScroll: true,
//    preload: false
//}

/*--------------------------------------------------
Nav Main
--------------------------------------------------*/
function navMain() {
    $('.nav-toggle').on('click', function () {
        $('body').toggleClass('open-nav');
    });
}


/*--------------------------------------------------
Transform Vendor
--------------------------------------------------*/
var cssTransform = (function () {
    var testEl = document.createElement('div');
    if (testEl.style.transform === null) {
        var vendors = ['Webkit', 'Moz', 'ms'];
        for (var vendor in vendors) {
            if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                return vendors[vendor] + 'Transform';
            }
        }
    }
    return 'transform';
})();


/*--------------------------------------------------
Scrollbar Listener
--------------------------------------------------*/
var scrollbar,
    parallax;

function scrollbarInit() {
    if ($(window).width() > 767) {
        scrollbar = Scrollbar.init(document.getElementById('wrapper'), {
            speed: 0.7,
            overscrollEffect: 'bounce'
        });

        parallax = document.querySelectorAll('[data-scroll]');

        scrollbar.addListener(function (status) {
            // parallax
            parallax.forEach(function (el) {
                var delay = el.dataset.scroll;

                if (scrollbar.isVisible(el)) {
                    el.classList.add('in-view');
                } else {
                    // el.classList.remove('in-view');
                }
            });
        });


        if (config.originalScroll) {
            $('body').addClass('scroll');
            Scrollbar.destroyAll();
        }
    } else {
        $('body').addClass('scroll');
    }
}


/*--------------------------------------------------
Barba.js
--------------------------------------------------*/
$(function () {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    barbaTimer = 1000;

    var transition = Barba.BaseTransition.extend({
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },
        fadeOut: function () {
            $('body').addClass('loading');
            return $(this.oldContainer).animate({ opacity: 0 }, barbaTimer).promise();
        },
        fadeIn: function () {
            var _this = this;
            var $el = $(this.newContainer);

            $('body').removeClass('open-nav');

            // $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            $el.animate({ opacity: 1 }, 100, function () {
                _this.done();

                $('body').addClass('loaded').delay(barbaTimer).queue(function (next) {
                    $(this).removeClass('loaded loading');
                    next();
                });

                domReadyAjax();
            });
        }
    });

    Barba.Pjax.getTransition = function () {
        return transition;
    };

    Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
        console.log(currentStatus, oldStatus, container);
    });

});


/*--------------------------------------------------
Page Loaded
--------------------------------------------------*/
function pageLoaded() {
    if (config.preload === true) {
        $('body').addClass('loaded').delay(1000).queue(function (next) {
            $(this).removeClass('loading loaded');
            next();
        });
    } else {
        $('body').addClass('debug').removeClass('loading');
        setTimeout(function () {
            $('body').removeClass('debug');
        }, 500);
    }
}


/*--------------------------------------------------
Scroll To
--------------------------------------------------*/
function scrollTo() {
    $(document).on('click', 'a[href^="#"]', function (e) {
        el = $($(this).attr('href'));
        scrollbar.scrollTo(0, Math.abs($('.scroll-content').offset().top) + el.offset().top, 800);
        e.preventDefault();
    });
}


/*--------------------------------------------------
DOC READY AJAX
--------------------------------------------------*/
function domReadyAjax() {
    navMain();
    scrollbarInit();
}


/*--------------------------------------------------
DOC READY
--------------------------------------------------*/
$(function () {
    domReadyAjax();
    scrollTo();
});


/*--------------------------------------------------
WIN LOAD
--------------------------------------------------*/
$(window).on('load', function () {
    pageLoaded();
});


/*--------------------------------------------------
WIN RESIZE
--------------------------------------------------*/
$(window).on('resize', function () {
    $('body').addClass('resizing');
    setTimeout(function () {
        $('body').removeClass('resizing');
    }, 100);
});