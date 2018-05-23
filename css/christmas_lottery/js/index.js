$('#mobileRegForm').attr('src', "https://form.acyfxasia.com/m-promo-open-live-account?btn_font_color=000&input_bkg_color=9F4943&btn_color=fff&btn_text=点击注册&border_color=C18885&font_color=171917&refer=" +
    parent.document.referrer + "&current_page=" + parent.window.location.href);
$('#wideScreenRegForm').attr('src', "https://form.acyfxasia.com/promo-open-live-account?btn_font_color=000&input_bkg_color=9F4943&btn_color=fff&btn_text=点击注册&font_color=171917&input_width=620px&border_color=C18885&refer=" +
    parent.document.referrer + "&current_page=" + parent.window.location.href);

var userName = '';
var userLeftTimes = '';
var email = '';
var password = '';
var captcha = '';
var locked = false;
var prePrize = '';
var token = localStorage.getItem('token');
var winnerListUrl = acy_url + '/getWinnerLists';

if (token !== null && token !== '') {
    showLoginInfo()
}
else {
    hideLoginInfo();
}

var realOffset = document.getElementById('lotteryImg').offsetWidth / 2;
var selfOffset = document.getElementById('lbtn').offsetWidth;
var selfHeight = document.getElementById('lbtn').offsetHeight;
document.getElementById('lbtn').style.width = (realOffset * 2 / 4.5) + 'px';
document.getElementById('lbtn').style.left = (window.innerWidth / 2 - selfOffset / 2) + 'px';
var realTop = selfHeight / 2 + selfHeight / 4.2
if (selfHeight < 215) {
    realTop -= 25;
}
document.getElementById('lbtn').style.top = (realOffset - realTop) + 'px';

var adjustLbtn = function () {
    var realOffset = document.getElementById('lotteryImg').offsetWidth / 2;
    var selfOffset = document.getElementById('lbtn').offsetWidth;
    var selfHeight = document.getElementById('lbtn').offsetHeight;
    document.getElementById('lbtn').style.width = (realOffset * 2 / 4.5) + 'px';
    document.getElementById('lbtn').style.left = (window.innerWidth / 2 - selfOffset / 2) + 'px';
    var realTop = selfHeight / 2 + selfHeight / 4.2
    if (selfHeight < 215) {
        realTop -= 25;
    }
    document.getElementById('lbtn').style.top = (realOffset - realTop) + 'px';
}

adjustLbtn();

window.onresize = function (event) {
    adjustLbtn();
};

window.onscroll = function (event) {
    adjustLbtn();
};

adjustLbtn();

function showLoginInfo() {
    document.getElementById('loginReminder1').style.display = 'none';
    document.getElementById('loginReminder2').style.display = 'none';
    document.getElementById('showUserName1').style.display = 'initial';
    document.getElementById('showUserName2').style.display = 'initial';
    document.getElementById('showLogout1').style.display = 'initial';
    document.getElementById('showLogout2').style.display = 'initial';
    document.getElementById('showLeftTimes1').style.display = 'initial';
    document.getElementById('showLeftTimes2').style.display = 'initial';

    document.getElementById('showUserName1').style.display = 'inline';
    document.getElementById('showUserName2').style.display = 'inline';
    document.getElementById('showLogout1').style.display = 'inline';
    document.getElementById('showLogout2').style.display = 'inline';
    document.getElementById('showLeftTimes1').style.display = 'inline';
    document.getElementById('showLeftTimes2').style.display = 'inline';
}

function hideLoginInfo() {
    document.getElementById('loginReminder1').style.display = 'initial';
    document.getElementById('loginReminder2').style.display = 'initial';

    document.getElementById('loginReminder1').style.display = 'inline';
    document.getElementById('loginReminder2').style.display = 'inline';

    document.getElementById('showUserName1').style.display = 'none';
    document.getElementById('showUserName2').style.display = 'none';
    document.getElementById('showLogout1').style.display = 'none';
    document.getElementById('showLogout2').style.display = 'none';
    document.getElementById('showLeftTimes1').style.display = 'none';
    document.getElementById('showLeftTimes2').style.display = 'none';
}

$.ajax({
    type: 'GET',
    url: winnerListUrl,
    success: function (data) {
        var l = Math.min(data.length, 10);
        var s = '';
        data.slice(-1 * l).forEach(function (value) {
            s = '<div class="textDivLevel5"><span class="text1Level5">' + value.name + ' 抽中了</span><span class="text2Level5">' + value.prize + '</span></div>' + s;
        });
        document.getElementById('winnerlists').innerHTML = s;
    },
    error: function (request, status, error) {
        console.log(request.responseText, status, error);
    }
});

var getTimesLeft = function () {
    var url = acy_url + '/getLeftLucky/';
    return $.ajax({
        type: 'POST',
        url: url,
        headers: { "Authorization": token }
    }).fail(function (xhr, status, error) {
        console.log(xhr, status, error);
        return;
    }).done(function (data) {
        document.getElementById('timesLeft1').innerHTML = data.count;
        document.getElementById('timesLeft2').innerHTML = data.count;
        userLeftTimes = data.count;
    });
}

var getUserInfo = function () {
    var url = acy_url + '/user/me';
    return $.ajax({
        type: 'GET',
        url: url,
        headers: { "Authorization": token }
    }).fail(function (xhr, status, error) {
        console.log(xhr, status, error);
        return;
    }).done(function (data) {
        userName = data.user.name;
        document.getElementById('showUserName1').innerHTML = '您好 ' + data.user.name;
        document.getElementById('showUserName2').innerHTML = '您好 ' + data.user.name;
        getTimesLeft();
    });
}

if (token !== null && token !== '') {
    getUserInfo();
}

var getCaptcha = function () {
    var url = acy_url + '/captcha_img';
    return $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            document.getElementById('codeImg').src = data;
        },
        error: function (request, status, error) {
            console.log(request.responseText, status, error);
        }
    });
};

var checkEmail = function () {
    var emailUrl = acy_url + '/email_check/';
    return $.ajax({
        type: 'GET',
        url: emailUrl + email,
    }).fail(function (request, status, error) {
        document.getElementById('invalidEmail').style.display = 'initial';

        document.getElementById('invalidEmail').style.display = 'inline';

        console.log(request.responseText, status, error);
        return;
    });
}

var login = function () {
    var loginUrl = acy_url + '/login/';
    return $.ajax({
        type: 'POST',
        url: loginUrl,
        xhrFields: {
            withCredentials: true
        },
        data: {
            email: email,
            password: password,
            //captcha: captcha
        },
        dataType: 'json',
    }).fail(function (xhr, status, error) {
        // getCaptcha();
        switch (xhr.statusText) {
            case 'Unprocessable Entity':
                document.getElementById('invalidCode').style.display = 'initial';
                document.getElementById('invalidCode').style.display = 'inline';
                document.getElementById('invalidUsernamePassword').style.display = 'none';
                return;
            case 'Unauthorized':
                document.getElementById('invalidUsernamePassword').style.display = 'initial';
                document.getElementById('invalidUsernamePassword').style.display = 'inline';
                document.getElementById('invalidCode').style.display = 'none';
                return;
            default:
                document.getElementById('invalidUsernamePassword').style.display = 'initial';
                document.getElementById('invalidUsernamePassword').style.display = 'inline';
                return;
        }
    });
}

var drawLottory = function () {
    var url = acy_url + '/run/';
    return $.ajax({
        type: 'POST',
        url: url,
        headers: { "Authorization": token }
    }).fail(function (xhr, status, error) {
        openOverlay('loginDiv');
        console.log(xhr, status, error);
        return;
    });
}

function showFixedHeader() {
    var els = document.getElementsByClassName('navbar-fixed-top');
    [].forEach.call(els, function (el) {
        el.style.display = 'initial';
        el.style.display = 'inline';
    });
}

function hideFixedHeader() {
    var els = document.getElementsByClassName('navbar-fixed-top');
    [].forEach.call(els, function (el) {
        el.style.display = 'none';
    });
}

function openOverlay(name) {
    document.getElementById("myNav").style.width = "100%";
    var div = document.getElementsByClassName(name)[0];
    div.style.display = 'initial';
    div.style.display = 'inline';
    hideFixedHeader();
    if (name === 'loginDiv') {
        // getCaptcha();
    }
    if (name === 'loginDiv' || name === 'noDeposit' || name === 'noTimesLeft' || name === 'noPrizeLeft') {
        document.getElementsByClassName('alertHead')[0].style.display = 'none';
    }
    else {
        document.getElementsByClassName('alertHead')[0].style.display = 'initial';
        document.getElementsByClassName('alertHead')[0].style.display = 'inline';
    }
}

function closeOverlay() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementsByClassName('noDeposit')[0].style.display = 'none';
    document.getElementsByClassName('noTimesLeft')[0].style.display = 'none';
    document.getElementsByClassName('noPrizeLeft')[0].style.display = 'none';
    document.getElementsByClassName('loginDiv')[0].style.display = 'none';
    document.getElementsByClassName('winIphonePrize')[0].style.display = 'none';
    document.getElementsByClassName('win100CouponPrize')[0].style.display = 'none';
    document.getElementsByClassName('winDisneyPrize')[0].style.display = 'none';
    document.getElementsByClassName('win10DollarsPrize')[0].style.display = 'none';
    document.getElementsByClassName('win20DollarsPrize')[0].style.display = 'none';
    document.getElementsByClassName('win30DollarsPrize')[0].style.display = 'none';
    document.getElementsByClassName('win50DollarsPrize')[0].style.display = 'none';
    document.getElementById('invalidEmail').style.display = 'none';
    document.getElementById('invalidUsernamePassword').style.display = 'none';
    document.getElementById('invalidCode').style.display = 'none';
    document.getElementById('emptyLoginInfo').style.display = 'none';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    document.getElementById("captcha").value = '';
    showFixedHeader();
}

function checkToDraw() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    captcha = document.getElementById("captcha").value;
    if (email === null || email.trim() === '' || password === null || password.trim() === '' /*|| captcha === null || captcha.trim() === ''*/) {
        document.getElementById('emptyLoginInfo').style.display = 'inline';
        return;
    }
    else {
        document.getElementById('emptyLoginInfo').style.display = 'none';
    }
    checkEmail().done(function (data) {
        document.getElementById('invalidEmail').style.display = 'none';
        login().done(function (data, status, xhr) {
            token = 'Bearer ' + xhr.responseJSON.token;
            localStorage.setItem('token', token);
            closeOverlay();
            getUserInfo();
            showLoginInfo();
        });
    });
}

function start() {
    if (locked) {
        return;
    }

    var className = '';
    var open = '';

    if (token === null || token === '') {
        openOverlay("loginDiv");
    }
    else {
        drawLottory().done(function (data) {
            if (data.info === '您没有入金1000的记录,快去入金吧!') {
                openOverlay("noDeposit");
                return;
            }
            if (userLeftTimes === 0) {
                openOverlay("noTimesLeft");
                return;
            }
            if (data.info === '奖没了,请参加下次活动吧!') {
                openOverlay("noPrizeLeft");
                return;
            }
            document.getElementById("myNav").style.width = "100%";
            document.getElementById("myNav").style.opacity = 0;
            switch (data.info.prizeid) {
                case 1:
                    className = 'getDisney';
                    open = 'winDisneyPrize';
                    break;
                case 2:
                    className = 'getIphone';
                    open = 'winIphonePrize';
                    break;
                case 3:
                    className = 'get30';
                    open = 'win30DollarsPrize';
                    break;
                case 4:
                    className = 'get100';
                    open = 'win100CouponPrize';
                    break;
                case 5:
                    className = 'get10';
                    open = 'win10DollarsPrize';
                    break;
                case 6:
                    className = 'get20';
                    open = 'win20DollarsPrize';
                    break;
                case 7:
                    className = 'get50';
                    open = 'win50DollarsPrize';
                    break;
            }
            var wheel = document.getElementById('lotteryImg');
            if (prePrize !== '') {
                // wheel.classList.remove(prePrize);
            }
            // console.log(wheel.className)
            wheel.className = 'lottery';
            // console.log(wheel.className)
            locked = true;
            setTimeout(function () {
                // wheel.classList.add(className);
                wheel.className += ' ' + className;
                // console.log(wheel.className)
                hideFixedHeader();
            }, 1);
            prePrize = className;
            setTimeout(function () {
                locked = false;
                getTimesLeft();
                document.getElementById('winnerlists').innerHTML = '<div class="textDivLevel5"><span class="text1Level5">' + userName + ' 抽中了</span><span class="text2Level5">' + data.info.prize + '</span></div>' +
                    document.getElementById('winnerlists').innerHTML;
                document.getElementById("myNav").style.opacity = 1;
                openOverlay(open);
            }, 15001);
        });
    }
}

function goToReg() {
    location.href = '#regDiv';
}

function goToLottery() {
    location.href = '#lotteryDiv';
}

function logout() {
    localStorage.setItem('token', '');
    var url = acy_url + '/logout/';
    return $.ajax({
        type: 'POST',
        url: url,
        headers: { "Authorization": token },
    }).fail(function (request, status, error) {
        document.getElementById('invalidEmail').style.display = 'initial';
        document.getElementById('invalidEmail').style.display = 'inline';
        console.log(request.responseText, status, error);
        return;
    }).done(function (data) {
        hideLoginInfo();
    });
}
