@extends('app')

@section('css')
<style>

    body {
        background-color: #F4F8FB;
    }

    circle {
        fill: none;
        stroke-width: 5;
        stroke: #DEDEDE;
    }

    #c1, #c6, #c11 {
        stroke: #FF6347;
        stroke-width: 15;
    }

    #c2, #c3, #c4, #c5, #c7, #c8, #c9, #c10 {
        stroke: #1E90FF;
        stroke-width: 5;
    }

    #c010, #c60, #c110 {
        stroke-width: 15;
    }

    #c12, #c13 {
        stroke-width: 10;
    }

    #c12 {
        stroke: #1E90FF;
    }

    #c5, #c10, #c13 {
        stroke: green;
    }

    #c120, #c130 {
        stroke-width: 10;
    }

    .stroke-rest {
        stroke: #DEDEDE;
        stroke-width: 5;
    }

    .alignRight {
        margin: 10px;
        position: absolute;
        right: 20px;
    }

    #tl_name {
        padding: 20px 20px 10px;
        font-size: 20px;
    }

    select#soflow, select#soflow-color {
        -webkit-appearance: button;
        -webkit-border-radius: 2px;
        -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        -webkit-padding-end: 20px;
        -webkit-padding-start: 2px;
        -webkit-user-select: none;
        background-position: 97% center;
        background-repeat: no-repeat;
        border: 1px solid #AAA;
        color: #555;
        font-size: inherit;
        margin: 20px;
        overflow: hidden;
        padding: 5px 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 300px;
    }

    .inlineDiv {
        display: inline-block;
        text-align: center;
        margin: 10px;
        background-color: white;
    }

    .inlineDivMidCircle {
        background-color: #F4F8FB;
        width: 100%;
    }

    .thirdLastCircle {
        min-width: 500px;
        width: 30%;
    }

    .lastTwoCircle {
        height: 390px;
        vertical-align: top;
        padding-top: 50px;
        margin-right: -20px;
    }

    .center2Div {
        width: 45%;
    }

    .center90Div {
        width: calc(90% + 22px)
    }

    .center4Div {
        width: 20%;
    }

    #tlTargets {
        text-align: center;
    }

    h3 {
        margin: 20px;
        font-weight: bolder;
        font-size: 20px;
        text-align: left;
    }

    .alertLabel {
        background-color: #DEDEDE;
        width: 330px;
        height: 20px;
        margin: 10px;
        padding: 10px;
        text-align: left;
    }

    hr, p {
        margin: 10px 0;
    }

    hr {
        border: none;
        height: 1px;
        background-color: #aaaaaa;
    }

    .noMargin {
        margin: 50px -15px;
    }

    table {
        border-collapse: collapse;
        margin: 0 auto 20px auto;
    }

    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
        max-width: 100px;
        width: 8%;
    }

    tr:hover{
        background-color: #f5f5f5;
    }

    #tlMemberTargets {
        padding-bottom: 100px;
    }

</style>
@endsection

@section('content')
    <div class="innercon">
        <div class='timespan'>
            <p id='tl_name'>
                Member - Stanley
            </p>
            <hr>
            <select class='alignRight' id="soflow">
                    <option value='201701' selected>2017年01月</option>
                    <option value='201702'>2017年02月</option>
                    <option value='201703'>2017年03月</option>
                </select>
                <h3>Current Month Progress</h3>
        </div>

        <div id="tlTargets" class="tabcontent">
            <div class='inlineDiv center2Div'>
                <div>
                    <svg width="400" height="400" viewBox="0 0 400 400">
                        <circle cx="200" cy="200" r="180" class="stroke-rest" id='c010' />
                        <circle cx="200" cy="200" r="180" class="stroke-main" id='c1' />
                        <text x="200" y="200" stroke='#FF6347' text-anchor="middle" stroke-width='4px' letter-spacing='5' font-size='40px' id='t1' id='t1'></text>
                        <text x="200" y="230" stroke='#DEDEDE' text-anchor="middle" font-size='20px'>USD</text>
                    </svg>
                    <p>Agent - Commission This Month</p>
                </div>
                <div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c2' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t2'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Forex</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c3' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t3'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Metals</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c4' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t4'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>CFD</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c5' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t5'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Oil</p>
                    </div>
                </div>
            </div>
            <div class='inlineDiv center2Div'>
                <div>
                    <svg width="400" height="400" viewBox="0 0 400 400">
                        <circle cx="200" cy="200" r="180" class="stroke-rest" id='c60' />
                        <circle cx="200" cy="200" r="180" class="stroke-main" id='c6' />
                        <text x="200" y="200" stroke='#FF6347' text-anchor="middle" stroke-width='4px' letter-spacing='5' font-size='40px' id='t6'></text>
                        <text x="200" y="230" stroke='#DEDEDE' text-anchor="middle" font-size='20px'>USD</text>
                    </svg>
                    <p>NonAgent - Commission This Month</p>
                </div>
                <div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c7' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t7'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Forex</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c8' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t8'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Metals</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c9' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t9'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>CFD</p>
                    </div>
                    <div class='inlineDiv center4Div'>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" class="stroke-rest" />
                        <circle cx="60" cy="60" r="50" class="stroke-main" id='c10' />
                        <text x="60" y="60" stroke='#FF6347' text-anchor="middle" font-size='16px' id='t10'></text>
                        <text x="60" y="75" stroke='#DEDEDE' text-anchor="middle" font-size='12px'>Lots</text>
                    </svg>
                    <p>Oil</p>
                    </div>
                </div>
            </div>
            <hr class='noMargin'>
            <h3>Target</h3>
            <div class='alertLabel' id='alertLabel1'>
            &#x1f4a1 有效客户没有达标，加油！
            </div>
            <div class='alertLabel' id='alertLabel2'>
            &#x1f4a1 净入金已达标！
            </div>

            <div class='inlineDiv inlineDivMidCircle'>
                <div class='inlineDiv thirdLastCircle'>
                    <svg width="400" height="400" viewBox="0 0 400 400">
                        <circle cx="200" cy="200" r="180" class="stroke-rest" id='c110' />
                        <circle cx="200" cy="200" r="180" class="stroke-main" id='c11' />
                        <text x="200" y="200" stroke='#FF6347' text-anchor="middle" stroke-width='4px' letter-spacing='5' font-size='40px' id='t11'></text>
                        <text x="200" y="230" stroke='#DEDEDE' text-anchor="middle" font-size='20px'>USD</text>
                    </svg>
                    <p>Total Commission</p>
                </div>
                <div class='inlineDiv lastTwoCircle'>
                    <svg width="300" height="300" viewBox="0 0 300 300">
                        <circle cx="150" cy="150" r="120" class="stroke-rest" id='c120' />
                        <circle cx="150" cy="150" r="120" class="stroke-main" id='c12' />
                        <text x="150" y="150" stroke='#FF6347' text-anchor="middle" stroke-width='2px' letter-spacing='2' font-size='30px' id='t12'></text>
                    </svg>
                    <p>Qualify Accounts</p>
                </div>
                <div class='inlineDiv lastTwoCircle'>
                    <svg width="300" height="300" viewBox="0 0 300 300">
                        <circle cx="150" cy="150" r="120" class="stroke-rest" id='c130' />
                        <circle cx="150" cy="150" r="120" class="stroke-main" id='c13' />
                        <text x="150" y="150" stroke='#FF6347' text-anchor="middle" stroke-width='2px' letter-spacing='2' font-size='30px' id='t13'></text>
                    </svg>
                    <p>Net Deposits</p>
                </div>
            </div>
            <br><br><br><br><br><br>
        </div>
	</div>
@endsection

@section('scripts')
<script>
    var radiusLarge = 180;
    var radiusMidium = 120;
    var radiusSmall = 50;
    var percent = [0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34];
    var textFigure = [5547, 154, 547, 157, 1542, 517, 47, 27, 247, 347, 447, 647, 444];
    var radius = [radiusLarge, radiusSmall, radiusSmall, radiusSmall, radiusSmall, 
        radiusLarge, radiusSmall, radiusSmall, radiusSmall, radiusSmall, radiusLarge, radiusMidium, radiusMidium];
    var circleId = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13'];
    var textId = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 't13'];
    circleId.forEach(function(value, index) {
        var amount = 2 * radius[index] * Math.PI * percent[index];
        document.getElementById(value).setAttribute('stroke-dasharray', amount.toFixed(2) + ', 99999999');
        document.getElementById(textId[index]).innerHTML = textFigure[index].toFixed(2);
    });
</script>
@endsection