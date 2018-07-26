$(document).ready(function () {
    initTimer();
})

//Static Vars
var Consts = {
    stockTime: 0,
    currStatus: 0
};

//Timer Status - Enum
Status = {
    'init': 0,
    'running': 1,
    'stopped': 2,
};


//Sets stock values and initiates refreshes
function initTimer() {
    Consts.stockTime = 0;
    Consts.currStatus = Status.init;
    initRefresh = setInterval(refreshClock, 1);
};

//same as initTimer but with different currStatus
function reset() {
    Consts.stockTime = 0;
    Consts.currStatus = Status.stopped;
    clearInterval(incrementSecondMethod);
    $('#statusToggle').val('Start');
};

//Toggles between Running and Stopped States
function ToggleStatus() {
    if (Consts.currStatus == Status.stopped || (Consts.currStatus == Status.init && Consts.stockTime == 0)) {
        incrementSecondMethod = setInterval(incrementSeconds, 10);
        Consts.currStatus = Status.running;
        $('#statusToggle').val('Pause');
    }
    else if (Consts.currStatus == Status.running) {
        clearInterval(incrementSecondMethod);
        Consts.currStatus = Status.stopped;
        $('#statusToggle').val('Start');
    }
};


//Converts Millis to corresponding parts
var CustomTime = new function () {
    this.getTime = function () {
        hour = isTwoDigit(Math.floor(Consts.stockTime / (100 * 60 * 60) % 24));
        mins = isTwoDigit(Math.floor((Consts.stockTime / (100 * 60)) % 60));
        sec = isTwoDigit(Math.floor(Consts.stockTime / 100) % 60);
        milli = isTwoDigit(Math.floor(Consts.stockTime % 100));

        time = hour + ":" + mins + ":" + sec + ":" + milli;

        return time;
    }
};

//Checks if the value is smaller than 2 for visual representation purpose
function isTwoDigit(val) {
    if (val.toString().length < 2) {
        return "0" + val;
    }
    return val;
}

//Timer core - 1ms unit
function incrementSeconds() {
    Consts.stockTime += 1;
};

//Div refresh logic - refresh rate - 1ms
function refreshClock() {
    $('#timer').html(CustomTime.getTime);
};
