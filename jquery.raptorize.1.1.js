/*
 * jQuery Raptorize Plugin 1.1
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
$(document).ready(function () {
    $("body").raptorize();
});

(function ($) {

    $.fn.raptorize = function (options) {

            //Yo' defaults
            var defaults = {
                enterOn: 'konami-code', //timer, konami-code, click
                delayTime: 5000 //time before raptor attacks on timer mode
            };

            //Extend those options
            var options = $.extend(defaults, options);

            return this.each(function () {

                var _this = $(this);
                var audioSupported = false;
                //Stupid Browser Checking which should be in jQuery Support
                var test_audio = document.createElement("audio");
                if (test_audio.play !== undefined) {
                    audioSupported = true;
                }
                var locked = false;

                // Animating Code
                function init() {
                    locked = true;

                    //Raptor Vars
                    var raptorImageMarkup = '<img id="elRaptor" src="raptor.png" />'
                    var raptorAudioMarkup = '<audio id="elRaptorShriek"><source src="raptor-sound.mp3" /><source src="raptor-sound.ogg" /></audio>';

                    //Append Raptor and Style
                    $('body').append(raptorImageMarkup);
                    if (audioSupported) {
                        $('body').append(raptorAudioMarkup);
                    }
                    var raptor = $('#elRaptor').css({
                        "position": "fixed",
                        "bottom": "-700px",
                        "right": "0",
                        "display": "none",
                        "z-index": "9999999"
                    })

                    var raptor = $('#elRaptor').css({
                        "display": "block"
                    });
                    //Sound Hilarity
                    if (audioSupported) {
                        function playSound() {
                            document.getElementById('elRaptorShriek').addEventListener("ended", function () {
                                $('#elRaptorShriek').remove();
                                $('#elRaptor').remove();
                                bindKonami();
                                locked = false;
                            });
                            document.getElementById('elRaptorShriek').play();
                        }
                        playSound();
                    }

                    // Movement Hilarity
                    raptor.animate({
                        "bottom": "0"
                    }, function () {
                        $(this).animate({
                            "bottom": "-130px"
                        }, 100, function () {
                            var offset = (($(this).position().left) + 400);
                            $(this).delay(300).animate({
                                "right": offset
                            }, 2200)
                        });
                    });
                }

                function bindKonami() {
                    if (options.enterOn == 'konami-code') {
                        var kkeys = [],
                            konami = "38,38,40,40,37,39,37,39,66,65";
                        $(window).bind("keydown.raptorz", function (e) {
                            kkeys.push(e.keyCode);
                            if (kkeys.toString().indexOf(konami) >= 0) {
                                init();
                                $(window).unbind('keydown.raptorz');
                            }
                        });
                    }
                }
                //Determine Entrance
                if (options.enterOn == 'timer') {
                    setTimeout(init, options.delayTime);
                } else if (options.enterOn == 'click') {
                    _this.bind('click', function (e) {
                        e.preventDefault();
                        if (!locked) {
                            init();
                        }
                    })
                } else {
                    bindKonami();
                }

            }); //each call
        } //orbit plugin call
})(jQuery);
