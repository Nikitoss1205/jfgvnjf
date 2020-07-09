$(document).ready(function(){
	
	// slider

	$('.carousel__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.png"></button>',
        responsive: [{
			breakpoint: 992,
			settings: {
			dots: true,
			arrows: false
            }
        }]
	});

	// tabs

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// catalog

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn()
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order-1, #order-2, #order-3').fadeOut()
	});

	$('.button_catalog').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

	$('#consultation-form button').on('click', function() {
		$('.overlay, #thanks').fadeIn()
	})

	$('#consultation button').on('click', function() {
		$('#consultation').fadeOut();
		$('#thanks').fadeIn()
	})
	$('#order button').on('click', function() {
		$('#order').fadeOut();
		$('#thanks').fadeIn()
	});
	// forms

	$('.feed-form').validate({
		rules: {
			name: "required",
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},

		messages: {
			name: "Пожалуйста, введите свое имя",
			phone: "Пожалуйста, введите свой номер телефона",
			email: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен почтовый адрес"
			}
		}
	});
	$('#consultation form').validate({
		rules: {
			name: "required",
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},

		messages: {
			name: "Пожалуйста, введите свое имя",
			phone: "Пожалуйста, введите свой номер телефона",
			email: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен почтовый адрес"
			}
		}
	});
	$('#order form').validate({
		rules: {
			name: "required",
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},

		messages: {
			name: "Пожалуйста, введите свое имя",
			phone: "Пожалуйста, введите свой номер телефона",
			email: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен почтовый адрес"
			}
		}
	});

	$('input[name=phone]').mask("+9 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn();

			$('form').trigger('reset');
		});

		return false;
	});

	//scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1150) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	new WOW().init();
});

  