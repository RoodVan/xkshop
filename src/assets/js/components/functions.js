
// Range slider
(function(){
    if(!$('.cg-range').length) return;

    const rangevalue = document.querySelector(".cg-range__sliderin");
    const rangeInputvalue = document.querySelectorAll(".cg-range__itms input");
    const priceInputvalue = document.querySelectorAll(".cg-range__inputs input");

    let priceGap = 10;

    for (let i = 0; i < priceInputvalue.length; i++) {
        priceInputvalue[i].addEventListener("input", e => {
            // Parse min and max values of the range input
            priceInputvalue[i].value = priceInputvalue[i].value || '0';
            let minp = parseInt(priceInputvalue[0].value);
            let maxp = parseInt(priceInputvalue[1].value);
            let diff = maxp - minp

            if (minp < 0) {
                console.log("minimum price cannot be less than 0");
                priceInputvalue[0].value = 0;
                minp = 0;
            }
    
            // Validate the input values
            if (maxp > 10000) {
                console.log(`maximum price cannot be greater than ${priceInputvalue[1].max}`);
                priceInputvalue[1].value = priceInputvalue[1].max || 10000;
                maxp = priceInputvalue[1].max || 10000;
            }
    
            if (minp > maxp - priceGap) {
                priceInputvalue[0].value = maxp - priceGap;
                minp = maxp - priceGap;
    
                if (minp < 0) {
                    priceInputvalue[0].value = 0;
                    minp = 0;
                }
            }
    
            // Check if the price gap is met 
            // and max price is within the range
            if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
                if (e.target.className.includes("min-input")) {
                    rangeInputvalue[0].value = minp;
                    let value1 = rangeInputvalue[0].max;
                    rangevalue.style.left = `${(minp / value1) * 100}%`;
                }
                else {
                    rangeInputvalue[1].value = maxp;
                    let value2 = rangeInputvalue[1].max;
                    rangevalue.style.right = 
                        `${100 - (maxp / value2) * 100}%`;
                }
            } else {
                rangeInputvalue[0].value = priceInputvalue[0].value;
                rangeInputvalue[1].value = priceInputvalue[1].value;
                rangevalue.style.left = `${(minp / rangeInputvalue[0].max) * 100}%`;
                rangevalue.style.right = `${100 - (maxp / rangeInputvalue[1].max) * 100}%`;
            }
        });
    
        // Add event listeners to range input elements
        for (let i = 0; i < rangeInputvalue.length; i++) {
            rangeInputvalue[i].addEventListener("input", e => {
                let minVal = 
                    parseInt(rangeInputvalue[0].value);
                let maxVal = 
                    parseInt(rangeInputvalue[1].value);
    
                let diff = maxVal - minVal
                // Check if the price gap is exceeded
                if (diff < priceGap) {
                
                    // Check if the input is the min range input
                    if (e.target.className === "min-range") {
                        rangeInputvalue[0].value = maxVal - priceGap;
                    }
                    else {
                        rangeInputvalue[1].value = minVal + priceGap;
                    }
                }
                else {
                
                    // Update price inputs and range progress
                    priceInputvalue[0].value = minVal;
                    priceInputvalue[1].value = maxVal;
                    rangevalue.style.left =
                        `${(minVal / rangeInputvalue[0].max) * 100}%`;
                    rangevalue.style.right =
                        `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`;
                }
            });
        } 
    }

    rangevalue.style.left =
    `${(parseInt(rangeInputvalue[0].value) / rangeInputvalue[0].max) * 100}%`;
    rangevalue.style.right =
    `${100 - (parseInt(rangeInputvalue[1].value) / rangeInputvalue[1].max) * 100}%`;

})();


// Add Card
function addCard(el) {
    let qty = $(el).closest('.bg-cards__foot').find('[data-count]').val();
    if(!qty || qty <= 0) return;

    $('.basket').addClass('basket--show');
    $('.livechat-link').css('bottom', `${$('.basket').outerHeight() + 20}px`);
}
function closeCard() {
    $('.basket').removeClass('basket--show');
    $('.livechat-link').removeAttr('style');
}


// Reset Filters
function filtersReset() {
    // multi selects
    $('.cgfilters').find('.multi-select-selected').trigger('click');

    // stock
    $('.cgfilters__checkbox input').prop('checked', false);

    // range input
    const rangevalue = document.querySelector(".cg-range__sliderin");
    const rangeInputvalue = document.querySelectorAll(".cg-range__itms input");
    const priceInputvalue = document.querySelectorAll(".cg-range__inputs input");
    rangeInputvalue[0].value = rangeInputvalue[0].min || 0;
    rangeInputvalue[1].value = rangeInputvalue[1].max || 10000;
    priceInputvalue[0].value = rangeInputvalue[0].value;
    priceInputvalue[1].value = rangeInputvalue[1].value;

    rangevalue.style.left = `${(parseInt(rangeInputvalue[0].value) / rangeInputvalue[0].max) * 100}%`;
    rangevalue.style.right = `${100 - (parseInt(rangeInputvalue[1].value) / rangeInputvalue[1].max) * 100}%`;
}


// Countdown
function xtimer(id, deadline, cb) {

	const addZero = (num) => num <= 9 ? `0${num}` : num;
	
	function timeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			//hours   = Math.floor( (t/(1000 * 60 * 60))),
			days = Math.floor(t / (1000 * 60 * 60 * 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("[data-days]") || '',
			hours = timer.querySelector("[data-hours]") || '',
			minutes = timer.querySelector("[data-minutes]") || '',
			seconds = timer.querySelector("[data-seconds]") || '',
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = timeRemaining(endtime);

			if (days) {
				days.textContent = addZero(t.days);
			}
			if (hours) {
				hours.textContent = addZero(t.hours);
			}
			if (minutes) {
				minutes.textContent = addZero(t.minutes);
			}
			if (seconds) {
				seconds.textContent = addZero(t.seconds);
			}

			if (t.total <= 0) {
				if (days) {
					days.textContent = "00";
				}
				if (hours) {
					hours.textContent = "00";
				}
				if (minutes) {
					minutes.textContent = "00";
				}
				if (seconds) {
					seconds.textContent = "00";
				}

				clearInterval(timerInterval);

				if (cb && typeof cb === 'function') {
					cb();
				}
			}

		}

	}

	setClock(id, deadline);
}


// Short Countdown
function shortTimer(durationInSeconds, element, cb) {
    let remainingTime = durationInSeconds;
    const wrap = document.querySelector(element);

    const timerInterval = setInterval(() => {
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            (cb && typeof cb === 'function') && cb();
        } else {
            // Вычисляем минуты и секунды
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Форматируем в виде MM:SS
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            wrap.innerHTML = formattedTime;

            remainingTime--;
        }
    }, 1000);
}
