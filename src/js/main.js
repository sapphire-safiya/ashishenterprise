$ = jQuery.noConflict();

$(document).ready(function () {
    $(".dvImgBox").mouseenter(function () { $(".dvImgBox").css("margin-top", "0"); $(this).css("margin-top", "-238px"); });
    $(".dvDetails").mouseleave(function () { $(this).siblings(".dvImgBox").css("margin-top", "0"); });
    $('#mainBody').hide();
    $('.dvsHeader').hide();
    $(function () {
        $('.dvShine').mouseover($.fn.shine = function () {
            $(this).css('background-position', '-245px 0px');
            $(this).animate({ backgroundPositionX: '245px',
                backgroundPositionY: '0px'
            }, 900);
        });
    });

    $("#close").click(function () {
        $(this).animate({ 'right': '-250px' }, 500);
        $(".menu").animate({ 'right': '-250px' }, 500);
    });
    $("#showMenu").click(function () {
        $("#close").animate({ 'right': '250px' }, 500);
        $(".menu").animate({ 'right': '0' }, 500);
    });
    $('.dvsHeader').show();
    $('#mainBody').show();

    $(".serviceNav li a").click(function (e) {
        e.preventDefault();
        scrollTo($(this).attr("href"));
    });

    function scrollTo(selector) {
        if (!($('html,body').is(":animated"))) {
            $('html,body').animate({
                scrollTop: $(selector).offset().top
            }, 1000);
            window.location.hash = $(selector).attr("id");
        }
    }

});

(function ($) {
    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition = $div.css('backgroundPosition') === "3px 5px" ? true : false;
    $.support.backgroundPositionXY = $div.css('backgroundPositionX') === "3px" ? true : false;
    $div = null;

    var xy = ["X", "Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }

    if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
        $.cssHooks.backgroundPosition = {
            get: function (elem, computed, extra) {
                return $.map(xy, function (l, i) {
                    return $.css(elem, "backgroundPosition" + l);
                }).join(" ");
            },
            set: function (elem, value) {
                $.each(xy, function (i, l) {
                    var values = parseBgPos(value);
                    elem.style["backgroundPosition" + l] = values[l];
                });
            }
        };
    }

    if ($.support.backgroundPosition && !$.support.backgroundPositionXY) {
        $.each(xy, function (i, l) {
            $.cssHooks["backgroundPosition" + l] = {
                get: function (elem, computed, extra) {
                    var values = parseBgPos($.css(elem, "backgroundPosition"));
                    return values[l];
                },
                set: function (elem, value) {
                    var values = parseBgPos($.css(elem, "backgroundPosition")),
                        isX = l === "X";
                    elem.style.backgroundPosition = (isX ? value : values["X"]) + " " +
                                                    (isX ? values["Y"] : value);
                }
            };
            $.fx.step["backgroundPosition" + l] = function (fx) {
                $.cssHooks["backgroundPosition" + l].set(fx.elem, fx.now + fx.unit);
            };
        });
    }
})(jQuery);