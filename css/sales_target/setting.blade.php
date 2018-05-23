@extends('app')

@section('css')
    <link rel="stylesheet" href="{{assetcss('/css/bootstrap.min.css')}}">
    <style>
    body {
        background-color: #F4F8FB;
    }

    .innercon {
        padding: 0 2vw 100px;
        font-size: 1.5em;
    }

    #tl1, #tl2 {
        width: 175px;
        min-height: 30px;
        border: 1px solid #aaaaaa;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        text-align: center;
    }

    #tm1, #tm2 {
        text-align: left;
        width: 1400px;
        min-height: 30px;
        border: 1px solid #aaaaaa;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
    }

    #candidates {
        text-align: left;
        width: 1400px;
        min-height: 30px;
        border: 1px solid #aaaaaa;
        border-radius: 10px;
        margin: 10px 10px 30px;
        padding: 10px;
    }

    .member {
        padding: 5px 15px;
        margin: 10px;
        background-color: lightskyblue;
        border-radius: 10px;
    }

    .h3Title {
        padding: 5px 15px;
        margin: 20px 10px;
        background-color: #ccc;
        border-radius: 10px;
    }

    h3, h4, h5 {
        margin: 15px;
    }

    .targetSettingTitle {
        margin: 50px 15px 15px;
    }

    .bigSize {
        font-size: 1.2em;
    }

    .setBtn {
        position: absolute;
        right: 40px;
        margin-right: 20px;
        padding: 3px 60px;
        border-radius: 6px;
        font-size: 0.8em;
        background-color: #2CC185;
        font-family: Arial;
    }

    hr {
        margin: 15px -40px;
        border: none;
        height: 1px;
        background-color: #aaaaaa;
    }

    .commission {
        margin: 10px;
        padding: 10px;
        font-size: 0.7em;
    }

    a:active { 
        background-color: yellow;
    }

    .input-group {
        z-index: 0;
        margin: 1px;
    }

    label {
        margin: 10px 0 0 0;
    }

    .form-control {
        text-align: center;
    }

    .tl_target1 {
        margin: 50px 15px -10px;
    }

    .tl_target2 {
        margin: 210px 15px -10px;
    }

    input[type='checkbox'] {
        margin: auto 15px;
    }
    </style>
@endsection

@section('content')
    <div class="innercon">
    @include('salestarget/salesheader')

        <h3>&#x265B; Teams</h3>
        <hr>
        <h4 class='h3Title'>Team 1<button class='setBtn' id='set1'>Set</button></h4>
        <h5>Team Leader</h5>
        <div class="droparea" id="tl1"></div>
        <h5>Team Members</h5>
        <div class="droparea" id="tm1"></div>
        <h4 class='h3Title'>Team 2<button class='setBtn' id='set2'>Set</button></h4>
        <h5>Team Leader</h5>
        <div class="droparea" id="tl2"></div>
        <h5>Team Members</h5>
        <div class="droparea" id="tm2"></div>
        <h4>Candidates</h4>
        <div class="droparea" id="candidates">
            <span id="member1" class="member" draggable="true">Jimmey</span>
            <span id="member2" class="member" draggable="true">Renee</span>
            <span id="member3" class="member" draggable="true">Ginny</span>
            <span id="member4" class="member" draggable="true">Kim</span>
            <span id="member5" class="member" draggable="true">Jack</span>
            <span id="member6" class="member" draggable="true">Phil</span>
            <span id="member7" class="member" draggable="true">Stanley</span>
            <span id="member8" class="member" draggable="true">Andy</span>
            <span id="member9" class="member" draggable="true">Vera</span>
            <span id="member10" class="member" draggable="true">Will</span>
        </div>
        <h3 class='targetSettingTitle'><span class='bigSize'>&#x272c;</span> Target Setting</h3>
        <hr>
        <h4 class='h3Title'>Team Leader<button class='setBtn' id='set3'>Set</button></h4>
        <h5>Commission</h5>
        <div class='commission'>
            <p>
                Non Agent - Commission Per Lots :
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Fx</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Metals</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">CFD</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Oil</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
            </p>
            <p>
                <label>Has Agent - Commission Per Lots :</label>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Fx</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Metals</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">CFD</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Oil</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target1'>Target 1: Quality Accounts</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target2'>Target 2: Net Deposits</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target2'>Commission Condition / Target Bonus</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">When only ONE target archieved: <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">% Bonus Commission</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">When only ALL target archieved: <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">% Bonus Commission</span>
                    </div>
                </div>
            </p>
        </div>
        <br>
        <h4 class='h3Title'>Team Member<button class='setBtn' id='set4'>Set</button></h4>
        <h5>Commission</h5>
        <div class='commission'>
            <p>
                Non Agent - Commission Per Lots :
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Fx</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Metals</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">CFD</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Oil</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
            </p>
            <p>
                <label>Has Agent - Commission Per Lots :</label>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Fx</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Metals</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">CFD</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Oil</span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">$</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target1'>Target 1: Quality Accounts</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target2'>Target 2: Net Deposits</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="input-group">
                        <span class="input-group-addon"><input type="checkbox">Tier Setting</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Quality Accounts <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">Traders</span>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="input-group">
                        <span class="input-group-addon">Commission -/+ </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">%</span>
                    </div>
                </div>
            </p>
        </div>
        <h5 class='tl_target2'>Commission Condition / Target Bonus</h5>
        <div class='commission'>
            <p>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">When only ONE target archieved: <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">% Bonus Commission</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">When only ALL target archieved: <= </span>
                        <input type="text" class="form-control">
                        <span class="input-group-addon">% Bonus Commission</span>
                    </div>
                </div>
            </p>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{assetjs('/js/lib/tether.min.js')}}"></script>
    <script src="{{assetjs('/js/lib/bootstrap.min.js')}}"></script> 
    <script>
        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }

        var droparea = document.querySelectorAll('.droparea');
        droparea.forEach(function (el) {
            el.addEventListener("drop", drop);
            el.addEventListener("dragover", allowDrop);
        });

        var member = document.querySelectorAll('.member');
        member.forEach(function (el) {
            el.addEventListener("dragstart", drag);
        });
    </script>
@endsection