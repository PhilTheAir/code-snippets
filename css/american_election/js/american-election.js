(function () {
	var triggerBttn = document.getElementById('trigger-overlay'),
		overlay = document.querySelector('div.overlay'),
		closeBttn = overlay.querySelector('button.overlay-close');
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		support = { transitions: Modernizr.csstransitions };

	function toggleOverlay() {
		if (classie.has(overlay, 'open')) {
			classie.remove(overlay, 'open');
			classie.add(overlay, 'close');
			var onEndTransitionFn = function (ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				classie.remove(overlay, 'close');
			};
			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			}
			else {
				onEndTransitionFn();
			}
		}
		else if (!classie.has(overlay, 'close')) {
			classie.add(overlay, 'open');
		}
	}

	triggerBttn.addEventListener('click', toggleOverlay);
	closeBttn.addEventListener('click', toggleOverlay);

	var container = document.querySelector('div.container'),
		triggerBttnContentpush = document.getElementById('trigger-overlay-a'),
		overlayContentpush = document.querySelector('div.overlaybox'),
		closeBttnContentpush = overlayContentpush.querySelector('button.overlay-close-contentpush');

	function toggleOverlayContentpush() {
		if (classie.has(overlayContentpush, 'open')) {
			classie.remove(overlayContentpush, 'open');
			classie.remove(container, 'overlay-open');
			classie.add(overlayContentpush, 'close');
			var onEndTransitionFn = function (ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') return;
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				classie.remove(overlayContentpush, 'close');
			};
			if (support.transitions) {
				overlayContentpush.addEventListener(transEndEventName, onEndTransitionFn);
			}
			else {
				onEndTransitionFn();
			}
		}
		else if (!classie.has(overlayContentpush, 'close')) {
			classie.add(overlayContentpush, 'open');
			classie.add(container, 'overlay-open');
		}
	}

	triggerBttnContentpush.addEventListener('click', toggleOverlayContentpush);
	closeBttnContentpush.addEventListener('click', toggleOverlayContentpush);

	/*
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement ( "script" );
        hm.src = "//hm.baidu.com/hm.js?75ca0e8431b5028e6b255c7f963b2fde";
        var s  = document.getElementsByTagName ( "script" )[ 0 ];
        s.parentNode.insertBefore ( hm, s );
    }) ();
    (function ( i, s, o, g, r, a, m ) {
        i[ 'GoogleAnalyticsObject' ] = r;
        i[ r ] = i[ r ] || function () {
                    (i[ r ].q = i[ r ].q || []).push ( arguments )
                }, i[ r ].l = 1 * new Date ();
        a = s.createElement ( o ),
                m = s.getElementsByTagName ( o )[ 0 ];
        a.async = 1;
        a.src   = g;
        m.parentNode.insertBefore ( a, m )
    }) ( window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga' );
    ga ( 'create', 'UA-53903945-1', 'auto' );
    ga ( 'send', 'pageview' );
    */

	$('#us_election1').attr('src', "https://form.acyfxasia.com/m-promo-open-live-account?btn_font_color=fff&btn_color=095F78&btn_text=点击注册&font_color=171917&refer=" + parent.document.referrer + "&current_page=" + parent.window.location.href);
	$('#us_election2').attr('src', "https://form.acyfxasia.com/promo-open-live-account?btn_font_color=fff&btn_color=095F78&btn_text=点击注册&font_color=171917&input_width=620px&border_color=556868&refer=" + parent.document.referrer + "&current_page=" + parent.window.location.href);
	$('#us_election3').attr('src', "https://form.acyfxasia.com/m-promo-open-live-account?btn_font_color=fff&btn_color=095F78&btn_text=点击注册&font_color=171917&refer=" + parent.document.referrer + "&current_page=" + parent.window.location.href);
	$('#us_election4').attr('src', "https://form.acyfxasia.com/promo-open-live-account?btn_font_color=fff&btn_color=095F78&btn_text=点击注册&font_color=171917&input_width=620px&border_color=556868&refer=" + parent.document.referrer + "&current_page=" + parent.window.location.href);

	var voted = '希拉里';
	var hillary = document.getElementById('hillary');
	var trump = document.getElementById('trump');

	hillary.onclick = function () {
		hillary.src = './img/checked.png';
		trump.src = './img/unchecked.png';
		voted = '希拉里';
	};

	trump.onclick = function () {
		hillary.src = './img/unchecked.png';
		trump.src = './img/checked.png';
		voted = '特朗普';
	};

	var vote = document.getElementById('to_vote');
	vote.onclick = function () {
		var validated = true;
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var phone = document.getElementById('phone').value;
		if (name === null || name.trim() === '') {
			document.getElementById('name_label').style.display = 'inline';
			validated = false;
		}
		else {
			document.getElementById('name_label').style.display = 'none';
		}

		if (email === null || email.trim() === '' || !validateEmail(email)) {
			document.getElementById('email_label').style.display = 'inline';
			validated = false;
		}
		else {
			document.getElementById('email_label').style.display = 'none';
		}

		if (phone === null || phone.trim() === '') {
			document.getElementById('phone_label').style.display = 'inline';
			validated = false;
		}
		else {
			document.getElementById('phone_label').style.display = 'none';
		}

		if (validated) {
			/*
			$.post("http://form.acytest.com/sendemail", {
				name: name,
				phone: phone,
				email: email,
				vote: voted,
			},
				function (data, status) {
					console.log("Data: " + data);
				});
			*/
			$.ajax({
				type: 'POST',
				url: 'http://form.acytest.com/sendemail',
				data: {
					name: name,
					phone: phone,
					email: email,
					vote: voted
				},
				dataType: 'json',
				success: function (data) {
					document.getElementById('voted_label').style.display = 'inline';
					document.getElementById('voted_label').innerHTML = data.msg;
					/*
					if (data.status_code == 0) {
						window.location.reload();
					} else {
						popErrMsg(data.msg);
					}*/
				},
				error: function () {
					console.log('Ajax error!')
				}
			})


			document.getElementById('trigger-overlay').disabled = true;
			document.getElementById('voted_label').style.display = 'inline';
			document.querySelector('div.overlay').querySelector('button.overlay-close').click();
		}
	};

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
})();