
var level = 1;
var score = 0;
var tof = true;

var distance = 20000;
var x = setInterval(counter, 1000);

function onOverlay() {
    $("#overlay").css("display", "block");
}

function offOverlay() {
    $("#overlay").css("display", "none");
    score = 0;
    level = 1;
    prepareQuestion(level);
}

function counter() {
    // console.log("AC");

    if (distance <= 0) {
        $("#remaining").css("width", "0%");
        onOverlay();
    }
    else {
        var seconds = Math.floor((distance / 1000));
        var percent = Math.floor((seconds / 20) * 100);
        distance -= 1000;
        $("#remaining").css("width", percent + "%");
    }
}

function genRandomInt(level) {
    return Math.floor((Math.random() - 0.5) * 2 * Math.pow(10, Math.ceil((level / 10) <= 3 ? level / 10 : 3)));
}

function genRadomOperator() {
    var ran = Math.random();
    if (ran < (1 / 3)) {
        return "+";
    } else if (ran < (2 / 3)) {
        return "-";
    } else return "*";

}
function genQuestion(level) {
    return genRandomInt(level) + " " + genRadomOperator() + " " + genRandomInt(level);
}
function showTrueOrFalse() {
    return Math.random() > 0.5;
}
function prepareQuestion(level) {
    $("#remaining").css("width", "100%");
    clearInterval(x);
    distance = 20000;
    x = setInterval(counter, 1000);
    var data = genQuestion(level);
    var result = eval(data);
    var ranInt = genRandomInt(10);
    var fakeResult = result + (ranInt == 0 ? 3 : ranInt);
    var tf = showTrueOrFalse();
    tof = tf;
    $("#scr").text(score);
    score = level * 5;
    $("#lvl").text(level);
    $("#question").text(data);
    $("#result").text(tf ? result : fakeResult);
    // console.log(data + " = " + result);
    // return eval(data);
}

function clickTrue() {
    if (tof) {
        prepareQuestion(++level);
    } else {
        clearInterval(x);
        onOverlay();
    }
}

function clickFalse() {
    if (!tof) {
        prepareQuestion(++level);
    } else {
        clearInterval(x);
        onOverlay();
    }
}
$(document).ready(function () {
    score = 0;
    level = 1;
    distance = 20000;
    prepareQuestion(level);
});
