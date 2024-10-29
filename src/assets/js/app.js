/* PLUGINS                                      
--------------------------------------------------------*/
//= components/owl
//= components/imask
//= components/select
//= components/popper
//= components/tippy
//= components/multiselect


/* FUNCTIONS                                      
--------------------------------------------------------*/
//= components/functions


/* Onload DOM                                        
--------------------------------------------------------*/
$(function(){
    // Mobile menu
    $('.mobile-hamburger').on('click', (e) => {
        e.preventDefault();
        $('.menu').toggleClass('menu--open');
        let xlink = $('.menu').hasClass('menu--open') ? 'ic-x' : 'ic-hamburger';
        $('.mobile-hamburger use').attr('xlink:href', `#${xlink}`);
        $('.mobile-hamburger svg').attr('class', xlink);

        if($('.menu').hasClass('menu--open')) {
            $('body').addClass('overflow-hidden');
        } else {
            $('body').removeClass('overflow-hidden');
        }
    });


    // Cards carousel
    $('.sm-card__list').each(function(index, element) {
        const $carousel = $(element);
        const $prevBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__prevbtn');
        const $nextBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__nextbtn');
        const $scrollBar = $carousel.closest('.sm-card__carousel').find('.smc-scroll'); // for mobile
        let prevClicked = false;

        $carousel.on('initialized.owl.carousel', function(e) {
            let perPage = e.page.size;
            let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
            let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
            let barWidth = carouselWidth / itemCount;
            $scrollBar.css('width', barWidth+'px');
        });

        $carousel.on('resized.owl.carousel', function(e) {
            let perPage = e.page.size;
            let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
            let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
            let barWidth = carouselWidth / itemCount;
            $scrollBar.css('width', barWidth+'px');
        });

        $carousel.addClass("owl-carousel").owlCarousel({
            nav: false,
            loop: false,
            dots: false,
            drag: false,
            mouseDrag: false,
            rewind: true,
            responsive: {
                0: {
                    margin: 10,
                    autoWidth: true,
                    rewind: false,
                },
                500: {
                    item: 2,
                    margin: 10,
                    autoWidth: true,
                    rewind: false,
                },
                721: {
                    item: 3,
                    margin: 20
                },
                1200: {
                    items: 3,
                    margin: 20
                },
                1440: {
                    items: 4,
                    margin: 25
                },
                1700: {
                    items: 4,
                    margin: 40
                }
            }
        });

        $nextBtn.on('click', function() {
            $carousel.trigger('next.owl.carousel');
            let currentIndex = $carousel.find('.owl-item.active').index();
            let barPosition = $scrollBar.width() * currentIndex;
            $scrollBar.animate({left: barPosition},200);
        });

        $prevBtn.on('click', function() {
            let currentIndex = $carousel.find('.owl-item.active').index();
            let barPosition = $scrollBar.width() * currentIndex;
            let totalItems = $carousel.find('.owl-item').length;

            if (!prevClicked && currentIndex === 0) {
                $carousel.trigger('to.owl.carousel', [totalItems - 1, 300]);
            } else {
                $carousel.trigger('prev.owl.carousel');
            }

            $scrollBar.animate({left: barPosition},200);
        });

        $carousel.on('dragged.owl.carousel', function(e) {
            let currentIndex = e.item.index;
            let itemCount = e.item.count - 1;
            let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
            let elementWidth = $carousel.find('.owl-item').outerWidth(true);
            let activeItemsLength = $carousel.find('.owl-item.active').length - 1;
            
            let barWidth = carouselWidth / (itemCount + 1); 
        
            let barPosition = barWidth * currentIndex; 
            
            if (currentIndex + activeItemsLength >= itemCount) {
                console.log($carousel.find('.sm-card.cat-link').outerWidth(true));
                barPosition = barPosition + ($carousel.find('.sm-card.cat-link').outerWidth(true) - barWidth);
                barPosition = carouselWidth - barWidth;
            }
        
            $scrollBar.animate({ left: barPosition }, 200);
        });

        $scrollBar.on('touchstart', function(event) {
            var touch = event.originalEvent.touches[0];
            startX = touch.pageX;
            initialLeft = $scrollBar.position().left;
            isDragging = true;
            event.preventDefault();
        });

        $scrollBar.on('touchmove', function(event) {
            if (isDragging) {
                var touch = event.originalEvent.touches[0];
                var deltaX = touch.pageX - startX;
                var newLeft = initialLeft + deltaX;

                var containmentWidth = $scrollBar.parent().width() - $scrollBar.width();
                newLeft = Math.max(0, Math.min(newLeft, containmentWidth));

                $scrollBar.css('left', newLeft + 'px');

                let scrollPos = Math.round(newLeft / $scrollBar.width());
                $carousel.trigger('to.owl.carousel', scrollPos);

                event.preventDefault();
            }
        });

        $scrollBar.on('touchend', function() {
            console.log('touchend');
            isDragging = false;
        });
    });


    // Inputs mask
    if (document.querySelector('[data-isnumber]')) {
        const dataNumber = document.querySelectorAll('[data-isnumber]');
        for (let i = 0; i < dataNumber.length; i++) {
            IMask(dataNumber[i], {
                mask: Number
            });
        }
    }
    if (document.querySelector('[data-isnumber-100]')) {
        const dataNumber100 = document.querySelectorAll('[data-isnumber-100]');
        for (let i = 0; i < dataNumber100.length; i++) {
            IMask(dataNumber100[i], {
                mask: Number,
                min: 1,
                max: 100
            });
        }
    }


    // Cards counter
    $('.bg-cards__counter').each(function(index, element) {
        let $inpVal = $(element).find('[data-count]'),
            $btnMin = $(element).find('[data-minus]'),
            $btnPls = $(element).find('[data-plus]');

        ($inpVal.val() <= 1) && $btnMin.prop('disabled', true);

        $btnMin.on('click', e => {
            e.preventDefault();
            !$inpVal.val() && $inpVal.val(1);
            let val = $inpVal.val();
            if($inpVal.val() <= 1) return;

            $inpVal.val(parseInt(val)-1);
            ($inpVal.val() == 1) && $btnMin.prop('disabled', true);
        });

        $btnPls.on('click', e => {
            e.preventDefault();
            !$inpVal.val() && $inpVal.val(1);
            let val = $inpVal.val();
            if(val >= 100) return;

            $inpVal.val(parseInt(val)+1);
            $btnMin.prop('disabled') && $btnMin.prop('disabled', false);
        });

        $inpVal.on('input', (e) => {
            ($inpVal.val() == 1) && $btnMin.prop('disabled', true);
            ($inpVal.val() > 1 && $btnMin.prop('disabled')) && $btnMin.prop('disabled', false);
        });
    });


    // Select multi
    if(document.querySelectorAll('[data-multi-select]').length) {
        document.querySelectorAll('[data-multi-select]').forEach(select => new MultiSelect(select, {
            selectAll: false,
            search: false
        }));
    }   

    // Tippy tooltip
    tippy('[data-tippy-content]', {
        theme: 'light',
        allowHTML: true,
        animation: 'scale',
        duration: 200
    });

});