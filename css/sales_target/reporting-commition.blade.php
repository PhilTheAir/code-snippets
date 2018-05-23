@extends('app')

@section('css')
    <link rel="stylesheet" href="{{assetcss('/css/bootstrap.min.css')}}">
    <style>
    .innercon {
        padding: 0 2vw 100px;
        font-size: 1.5em;
    }

    #commition_t1, #commition_t2, #target_t1, #target_t2 {
        display: inline-block;
        margin: 10px;
    }

    .chartGroup {
        text-align: center;
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
        margin: 0 20px;
    }
    </style>
@endsection

@section('content')
    <div class="innercon">
        @include('salestarget/salesheader')

        Current Month Progress
        <hr>
        <div class="btn-group" id='chart1'>
            <button type="button" id='commissionReporting' class="btn btn-primary">Commission</button>
            <button type="button" id='targetsReporting' class="btn btn-success">Targets</button>
        </div>
        <div class='chartGroup' id='chart2'>
            <div id="commition_t1"></div>
            <div id="commition_t2"></div>
        </div>

        <div class='dataTable'>
            <table>
                <tr>
                    <th>TL/MEW</th>
                    <th>Commisstion Agent</th>
                    <th>Commission</th>
                    <th>Total Commisstion</th>
                    <th>Bonus% Deposit</th>
                    <th>Target Bonus%</th>
                    <th>Actual Commisstion</th>
                    <th>Action</th>
                    <th>Admin</th>
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
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>
                        <select data-field='action' class="with-cloudhub-style js-on-change">
                            <option value="1" selected="selected">Pending</option>
                            <option value="2">Approve</option>
                            <option value="3">Reject</option>
                        </select>
                    </td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>

        <div class='dataTable'>
            <table>
                <tr>
                    <th>TL/MEW</th>
                    <th>Commisstion Agent</th>
                    <th>Commission</th>
                    <th>Total Commisstion</th>
                    <th>Bonus% Deposit</th>
                    <th>Target Bonus%</th>
                    <th>Actual Commisstion</th>
                    <th>Action</th>
                    <th>Admin</th>
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
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>
                        <select data-field='action' class="with-cloudhub-style js-on-change">
                            <option value="1" selected="selected">Pending</option>
                            <option value="2">Approve</option>
                            <option value="3">Reject</option>
                        </select>
                    </td>
                    <td>Germany</td>
                </tr>
            </table>
        </div>
    </div>

@endsection

@section('scripts')
    <script src="{{assetjs('/js/lib/tether.min.js')}}"></script>
    <script src="{{assetjs('/js/lib/bootstrap.min.js')}}"></script> 
    <script src="{{assetjs('/js/lib/highstock.js')}}"></script>
    <script>
    $(function () {
        Highcharts.setOptions({
            chart: {
                width: 500,
                spacingTop: 20,
                spacingBottom: 70,
                plotBorderWidth: 1,
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
                categories: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
                label: {
                    enabled: false,
                },
                tickLength: 0,
                title: {
                    text: 'Date - ( Daily Changes )',
                    align: 'middle',
                    offset: 0,
                    rotation: 0,
                    y: 40,
                    style: {
                        color: 'orange',
                        fontSize: 16
                    }
                },
            },

            yAxis: {
                tickInterval: 500,
                max: 3000,
                labels: {
                    formatter: function () {
                        return this.value + '.00';
                    }
                },
                title: {
                    text: 'Amount',
                    align: 'high',
                    offset: 0,
                    rotation: 0,
                    y: -20,
                    style: {
                        color: 'orange',
                        fontSize: 16
                    }
                }
            },

            rangeSelector: {
                enabled: false,
            },

            legend: {
                y: 60,
                borderWidth: 0
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

        Highcharts.chart('commition_t1', {
            title: {
                text: 'Team 1<br>Commition'
            },

            series: [{
                type: 'line',
                name: 'Ginny',
                data: [111, 222, 333, 444, 555, 666, 700, 888, 999, 1111, 1221, 1266, null, null, null, null]
            },
            {
                type: 'line',
                name: 'Jack',
                data: [221, 222, 313, 414, 515, 616, 710, 818, 919, 1211, 1221, 1366, null, null, null, null]
            }]
        });

        Highcharts.chart('commition_t2', {
            title: {
                text: 'Team 2<br>Commition'
            },

            series: [{
                type: 'line',
                name: 'Ginny',
                data: [111, 222, 333, 444, 555, 666, 700, 888, 999, 1111, 1221, 1266, null, null, null, null]
            },
            {
                type: 'line',
                name: 'Jack',
                data: [221, 222, 313, 414, 515, 616, 710, 818, 919, 1211, 1221, 1366, null, null, null, null]
            }]
        });

    });

    $('#commissionReporting').click(function () {
        window.location.href = '//ch.acy.com:3000/en/salestarget/reporting/commition?type=commition';
    });

    $('#targetsReporting').click(function () {
        window.location.href = '//ch.acy.com:3000/en/salestarget/reporting/commition?type=type';
    });
    </script>
@endsection