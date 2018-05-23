@extends('app')

@section('css')
    <link rel="stylesheet" href="{{assetcss('/css/bootstrap.min.css')}}">
    <style>
    .innercon {
        padding: 0 2vw 100px;
        font-size: 1.5em;
    }

    .chartGroup {
        text-align: center;
        margin: 0 15vw;
    }

    .dataTable{
        margin: 50px;
        text-align: center;
        width: 95%;
    }

    hr {
        margin: 15px -40px;
        border: none;
        height: 1px;
        background-color: #aaaaaa;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        text-align: center;
        font-size: 0.6em;
    }

    tr:first-child {
        background-color: #4682B4;
        color: white;
    }

    tr:nth-child(2) {
        background-color: #E6E6FA;
    }

    .btn-group {
        margin: 0 auto;
    }
    </style>
@endsection

@section('content')
    <div class="innercon">
        @include('salestarget/salesheader')

        Current Month Progress
        <hr>
        <div class="btn-group" id='chart3'>
            <button type="button" id='commissionReporting' class="btn btn-primary">Commission</button>
            <button type="button" id='targetsReporting' class="btn btn-success">Targets</button>
        </div>
        <div class='chartGroup' id='chart4'>
            <div id="target_t1"></div>
        </div>

        <div class='dataTable'>
            <table>
                <tr>
                    <th>TL/MEW</th>
                    <th>Qualify Accout</th>
                    <th>Net Deposit</th>
                    <th>FX(Agent)</th>
                    <th>Metals(Agent)</th>
                    <th>CFD(Agent)</th>
                    <th>Oil(Agent)</th>
                    <th>FX</th>
                    <th>Metals</th>
                    <th>CFD</th>
                    <th>Oil</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste<br>（&#x265B;队长）</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>

        <div class='chartGroup' id='chart5'>
            <div id="target_t2"></div>
        </div>

        <div class='dataTable'>
            <table>
                <tr>
                    <th>TL/MEW</th>
                    <th>Qualify Accout</th>
                    <th>Net Deposit</th>
                    <th>FX(Agent)</th>
                    <th>Metals(Agent)</th>
                    <th>CFD(Agent)</th>
                    <th>Oil(Agent)</th>
                    <th>FX</th>
                    <th>Metals</th>
                    <th>CFD</th>
                    <th>Oil</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste<br>（&#x265B;队长）</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>

    </div>

@endsection

@section('scripts')
    <script src="{{assetjs('/js/lib/app-main.min.js')}}"></script>
    <script src="{{assetjs('/js/lib/tether.min.js')}}"></script>
    <script src="{{assetjs('/js/lib/bootstrap.min.js')}}"></script> 
    <script src="{{assetjs('/js/lib/highstock.js')}}"></script>
    <script>
    Highcharts.setOptions({
        chart: {
            width: 1000,
            spacingTop: 25,
            spacingBottom: 25,
            plotBorderWidth: 0,
        },

        title: {
            text: 'Top Team'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    symbol: 'square'
                }
            }
        },

        xAxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            label: {
                enabled: false,
            },
            tickLength: 0,
        },

        yAxis: [{
            tickInterval: 20000,
            max: 100000,
            labels: {
                formatter: function () {
                    return this.value + '.00';
                }
            },
            title: {
                text: '入金金额',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -20,
                x: -15,
                style: {
                    color: 'grey',
                    fontSize: 12
                }
            },
            gridLineWidth: 0,
        },
        {
            tickInterval: 10,
            max: 40,
            labels: {
                formatter: function () {
                    return this.value + '位';
                }
            },
            title: {
                text: '客户数',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -20,
                x: 10,
                style: {
                    color: 'grey',
                    fontSize: 12
                }
            },
            gridLineWidth: 0,
            opposite: true,
        }],

        rangeSelector: {
            enabled: false,
        },

        legend: {
            enabled: false,
        },

        navigator: {
            enabled: false,
        },

        scrollbar: {
            enabled: false,
        },

        credits: {
            enabled: false,
        },
    });

    Highcharts.chart('target_t1', {
        series: [{
            data: [29111.9, 71111.5, 10116.4, 11129.2, 14114.0, 17611.0, 13511.6, 14118.5, 21116.4, 11194.1, 11195.6, 51114.4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            type: 'column',
            name: '入金金额',
            color: 'lightskyblue',
        },
        {
            data: [2, 7, 7, 9, 11, 13, 15, 15, 20, 22, 23, 27, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            type: 'line',
            name: '客户数',
            yAxis: 1,
            color: 'orange',
        }]
    });

    Highcharts.chart('target_t2', {
        series: [{
            data: [29111.9, 71111.5, 10116.4, 11129.2, 14114.0, 17611.0, 13511.6, 14118.5, 21116.4, 11194.1, 11195.6, 51114.4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            type: 'column',
            name: '入金金额',
            color: 'lightskyblue',
        },
        {
            data: [2, 7, 7, 9, 11, 13, 15, 15, 20, 22, 23, 27, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            type: 'line',
            name: '客户数',
            yAxis: 1,
            color: 'orange',
        }]
    });

    var chartTarget_t1 = $('#target_t1').highcharts();
    var chartTarget_t2 = $('#target_t2').highcharts();
    chartTarget_t1.series[0].points.forEach(function (p) {
        drawLabel(p, chartTarget_t1, 0);
    });
    chartTarget_t1.series[1].points.forEach(function (p) {
        drawLabel(p, chartTarget_t1, 1);
    });
    chartTarget_t2.series[0].points.forEach(function (p) {
        drawLabel(p, chartTarget_t2, 0);
    });
    chartTarget_t2.series[1].points.forEach(function (p) {
        drawLabel(p, chartTarget_t2, 1);
    });

    function drawLabel(p, chartTarget_t1, token) {
        var text, color, x, y;
        if (token === 0) {
            text = '/$';
            color = 'lightskyblue';
            x = -40;
            y = -35;
        }
        else {
            text = '/位';
            color = 'red';
            x = -25;
            y = -40;
        }
        if (p.y === chartTarget_t1.series[token].dataMax) {
            p.update({
                color: 'red',
            });
            var renderLabel = chartTarget_t1.renderer.label(p.y + text, chartTarget_t1.xAxis[0].toPixels(p.x) + x, chartTarget_t1.yAxis[token].toPixels(p.y) + y, 'callout')
                .css({
                    color: '#000000',
                    align: 'center',
                })
                .attr({
                    fill: '#fff',
                    padding: 8,
                    r: 7,
                    'stroke-width': 1,
                    stroke: color,
                })
                .add();
        };
    }
    </script>
@endsection