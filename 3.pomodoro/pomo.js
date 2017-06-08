window.onload = function(){
    var iWorkTime = document.getElementById("worktime"),
    iRestTime = document.getElementById("resttime"),
    iTrigger = document.getElementById("start");

    var workTime,
    restTime;

    //  When the start button is pressed!
    iTrigger.onclick = function(){
        // User input values
        workTime = iWorkTime.value;
        restTime = iRestTime.value;
        // Sets the stage to work
        var work = true;
        start(work, workTime, restTime);
        iTrigger.disabled = true;
    };
}

function countdown(endTime, interval, work, workTime, restTime){
    var iMins = document.getElementById("minutes");
    var iSecs = document.getElementById("seconds");

    var now = new Date().getTime();
    var difference = endTime - now;
    var remainingMin = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var remainingSec = Math.floor((difference % (1000 * 60)) / 1000) + 1;
    if(remainingMin < 0){
        iMins.innerHTML = "00";
        iSecs.innerHTML = remainingSec;
    }
    else {
        iMins.innerHTML = remainingMin;
        iSecs.innerHTML = remainingSec;
    }
    if(remainingMin < 10){
        iMins.innerHTML = "0" + remainingMin;
    }
    if(remainingSec < 10){
        iSecs.innerHTML = "0" + remainingSec;
    }
    if (difference < 0) {
        clearInterval(interval);
        work = !work;
        if(!work){
            start(work, workTime, restTime);
            console.log(work);
            console.log("EXPIRED");
        }
    }
}

function start(work, workTime, restTime){
    var stageLen = work ? workTime : restTime;

    var mins = document.getElementById("minutes");
    var secs = document.getElementById("seconds");

    mins.innerHTML = stageLen;
    secs.innerHTML = "00";

    var startTime = new Date().getTime();
    var endTime = new Date(startTime + stageLen * 60000).getTime();

    console.log(startTime + " " + endTime);
    var interval = setInterval(function(){
        countdown(endTime, interval, work, workTime, restTime);
    }, 1000);
}
