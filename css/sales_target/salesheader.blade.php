<style>
.tabs {
	width: 100%;
	font-size: 1em;
    margin: 0 auto -20px;
}

.tabs nav ul {
	display: -ms-flexbox;
	display: -webkit-flex;
	display: -moz-flex;
	display: -ms-flex;
	display: flex;
}

.tabs nav ul li {
	position: relative;
	text-align: center;
	-webkit-flex: 1;
	-moz-flex: 1;
	-ms-flex: 1;
	flex: 1;
    line-height: 7;
}

.tabs nav li:hover {
    cursor: pointer;
}

.tabs-style-circle nav li::before {
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -60px 0 0 -67px;
	width: 130px;
	height: 130px;
	border: 2px solid #2CC185;
	border-radius: 50%;
	content: '';
	opacity: 0;
	-webkit-transition: opacity 0.5s;
	transition: opacity 0.5s;
}

.tabs-style-circle nav li.tab-current::before {
	opacity: 1;
}

.tabs-style-circle nav li.tab-current {
	color: #2CC185;
    font-size: 1em;
}

.tabs-style-circle nav li.tab-current {
	-webkit-transform: translate3d(0,-10px,0);
	transform: translate3d(0,-10px,0);
}
</style>
<section>
    <div class="tabs tabs-style-circle">
        <nav>
            <ul id='xx'>
                <li>China Pro</li>
                <li>Team 02</li>
                <li>Team 03</li>
                <li>Team 04</li>
                <li>Team 05</li>
                <li>Team 06</li>
                <li>Team 07</li>
                <li>Team 08</li>
                <li>Team 09</li>
                <li>Team 10</li>
            </ul>
        </nav>			
    </div>
</section>
<script>

var currentTab = 0;

function CircleTabs() {
    this.tabs = document.querySelectorAll('nav > ul > li');
    this.current = -1;
    this.show();
    this.init();
};

CircleTabs.prototype.init = function () {
    var self = this;
    this.tabs.forEach(function (tab, idx) {
        tab.addEventListener('click', function (ev) {
            self.show(idx);
        });
        tab.addEventListener('dblclick', function (ev) {
            ev.preventDefault();
            var value = this.innerHTML;
            self.updateVal(this, value);
        });
    });
};

CircleTabs.prototype.show = function (idx) {
    if (this.current >= 0) {
        this.tabs[this.current].className = '';
    }
    this.current = idx != undefined ? idx : 0;
    this.tabs[this.current].className = 'tab-current';
    currentTab = this.current;
};

CircleTabs.prototype.updateVal = function (self, value) {
    $(document).off('click');
    self.innerHTML = '<input class="thVal" style="font-size: 14px; text-align: center;" type="text" value="' + value + '" />';
    $(".thVal").focus();
    $(".thVal").keyup(function (event) {
        if (event.keyCode === 13) {
            $(self).html($(".thVal").val());
        }
    });
    $(document).click(function () {
        $(self).html($(".thVal").val());
    });
}

new CircleTabs();
</script>