/* PLUGINS                                      
--------------------------------------------------------*/
//= components/owl
//= components/imask
//= components/select
//= components/popper
//= components/tippy


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
        let xlink = $('.menu').hasClass('menu--open') ? '#ic-x' : '#ic-hamburger';
        $('.mobile-hamburger use').attr('xlink:href', xlink);
    });


    // Cards carousel
    $('.sm-card__list').each(function(index, element) {
        const $carousel = $(element);
        const $prevBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__prevbtn');
        const $nextBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__nextbtn');
        // for mobile
        const $scrollBar = $carousel.closest('.sm-card__carousel').find('.smc-scroll');

        $carousel.on('initialized.owl.carousel', function(e) {
            let perPage = e.page.size;
            let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
            let carouselWidth = $carousel.closest('.sm-card__list').width();
            let barWidth = carouselWidth / itemCount;
            $scrollBar.css('width', barWidth+'px');
        });

        $carousel.addClass("owl-carousel").owlCarousel({
            nav: false,
            loop: false,
            dots: false,
            drag: true,
            responsive: {
                0: {
                    margin: 10,
                    autoWidth: true
                },
                768: {
                    item: 2,
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
            },
            onTranslated: function(event) {
                let totalItems = event.item.count;  
                let currentItem = event.item.index;
                let visibleItems = event.page.size;
            
                if (currentItem >= totalItems - visibleItems) {
                    $nextBtn.one('click', function() {
                    $carousel.trigger('to.owl.carousel', [0, 300]);
                  });
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
            $carousel.trigger('prev.owl.carousel');
            let currentIndex = $carousel.find('.owl-item.active').index();
            let barPosition = $scrollBar.width() * currentIndex;
            $scrollBar.animate({left: barPosition},200);
        });

        $carousel.on('dragged.owl.carousel', function(e){
            console.log(e.item.index);
            let barPosition = $scrollBar.width() * e.item.index;
            $scrollBar.animate({left: barPosition},200);
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

                // Вычисляем позицию для карусели
                let scrollPos = Math.round(newLeft / $scrollBar.width());
                $carousel.trigger('to.owl.carousel', scrollPos);

                event.preventDefault(); // Предотвращаем стандартное поведение
            }
        });

        $scrollBar.on('touchend', function() {
            isDragging = false;
        });
    });


    // Big Cards Preview carousel
    $('.bg-cards-carousel').each(function(index, element) {
        const $carousel = $(element);
        $carousel.addClass("owl-carousel").owlCarousel({
            items:1,
            margin:0,
            autoHeight:true,
            loop: false,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
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
    });

    // Tippy tooltip
    tippy('[data-tippy-content]', {
        theme: 'light',
        allowHTML: true,
        animation: 'scale',
        duration: 200
    });

});