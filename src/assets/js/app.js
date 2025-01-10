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
        $('body').toggleClass('menu--open');
        let xlink = $('body').hasClass('menu--open') ? 'ic-x' : 'ic-hamburger';
        $('.mobile-hamburger use').attr('xlink:href', `#${xlink}`);
        $('.mobile-hamburger svg').attr('class', xlink);
    });

    // Live chat
    $('.livechat-link').on('click', (e) => e.preventDefault());

    // Search input
    const $inputSearch = $('.search__inp');
    $(document).on('click', e => {
        if (!$(e.target).closest('.search').length) {
            $('.search__dropdown').fadeOut(200);
        }
    });
    $inputSearch.on('input click', e => {
        const $searchDropdown = $('.search__dropdown');
        if( $inputSearch.val().length < 3 ) {
            $searchDropdown.is(':visible') && $searchDropdown.fadeOut(200);
            return;
        }
        if( $inputSearch.val().length > 50 ) {
            return;
        }
        
        const $searchList = $('.search__list');
        const $searchTxt = $searchList.find('.search-txt');

        $searchTxt.text($inputSearch.val());    
        $searchDropdown.fadeIn(200, () => $searchList.scrollTop(0));
    });


    // Cards carousel
    function toggleNewItemInCards($carousel, categoryLink) {
        let newEl = $carousel.find('.cat-link');

        if ($(window).width() <= 720 && newEl.length === 0) {
            $carousel.trigger('add.owl.carousel', [
                `<div class="sm-card cat-link">
                    <a href="${categoryLink}" class="abs-link">&nbsp;</a>
                    <svg><use xlink:href="#ic-arr-next"></use></svg>
                </div>`
            ]).trigger('refresh.owl.carousel');
        } else if ($(window).width() > 720 && newEl.length > 0) {
            let itemIndex = $carousel.find('.owl-item:has(.cat-link)').index();

            if (itemIndex !== -1) {
                $carousel.trigger('remove.owl.carousel', itemIndex).trigger('refresh.owl.carousel');
            }
        }
    }

    $('.sm-card__list').each(function(index, element) {
        const $carousel = $(element);
        const $prevBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__prevbtn');
        const $nextBtn = $carousel.closest('.sm-card__carousel').find('.sm-card__nextbtn');
        const $scrollBar = $carousel.closest('.sm-card__carousel').find('.smc-scroll'); // for mobile
        const categoryLink = $carousel.closest('.sm-card__carousel').data('category-link') || '#';
        let prevClicked = false;

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
                    margin: 10,
                    autoWidth: true,
                    rewind: false,
                },
                721: {
                    margin: 20
                },
                1024: {
                    items: 4,
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
            onInitialized: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
            },
            onTranslated: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
            },
            onResized: function(e) {
                toggleNewItemInCards($carousel, categoryLink);
    
                let perPage = e.page.size;
                let itemCount = $carousel.find('.sm-card').length - (perPage - 1);
                let carouselWidth = $carousel.closest('.sm-card__list').outerWidth(true);
                let barWidth = carouselWidth / itemCount;
                $scrollBar.css('width', barWidth + 'px');
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
            event.stopPropagation();
            const touch = event.originalEvent.touches[0];
            startX = touch.pageX;
            initialLeft = $scrollBar.position().left;
            isDragging = true;
            event.preventDefault();
        });

        $scrollBar.on('touchmove', function(event) {
            event.stopPropagation();
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
        const maskOptions = {
            mask: Number,
            lazy: false
        };
        for (let i = 0; i < dataNumber100.length; i++) {
            const maskedInput = IMask(dataNumber100[i], maskOptions);

            maskedInput.on('accept', function () {
                let value = parseInt(maskedInput.value, 10);
                if (value > 99) {
                  maskedInput.value = '99';
                } else if (value < 1 || maskedInput.value == '') {
                  maskedInput.value = '1';
                }
            });

            dataNumber100[i].addEventListener('blur', () => {
                let value = parseInt(dataNumber100[i].value, 10);
                if (value > 99) value = 99;
                else if (value < 1) value = 1;
                dataNumber100[i].value = value;
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
            $btnPls.prop('disabled') && $btnPls.prop('disabled', false);
        });

        $btnPls.on('click', e => {
            e.preventDefault();
            !$inpVal.val() && $inpVal.val(1);
            let val = $inpVal.val();
            if(val >= 99) return;

            $inpVal.val(parseInt(val)+1);
            ($inpVal.val() == 99) && $btnPls.prop('disabled', true);
            $btnMin.prop('disabled') && $btnMin.prop('disabled', false);           
        });

        $inpVal.on('input', (e) => {
            ($inpVal.val() == 1) && $btnMin.prop('disabled', true);
            ($inpVal.val() > 1 && $btnMin.prop('disabled')) && $btnMin.prop('disabled', false);

            ($inpVal.val() >= 99) && $btnPls.prop('disabled', true);
            ($inpVal.val() < 99 && $btnPls.prop('disabled')) && $btnPls.prop('disabled', false);
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


    // Timers
    if($('.js-stimer').length) {
        shortTimer(15, '.js-stimer', () => console.log('Finish timer!'));
    }

    if($('.js-offline-timer').length) {
        const now = new Date();
        now.setHours(now.getHours() + 7);
        xtimer('.js-offline-timer', now.toISOString(), () => console.log("Finish Timer!"));
    }

});